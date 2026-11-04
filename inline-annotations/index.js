/**
 * Host half of the selection-annotation plugin.
 *
 * One same-origin POST route answers a划选 question through the raw `llm`
 * service, so the exchange never enters a Session log: no turn, no message,
 * no history growth. The Browser UI keeps the answer as a local sticky note.
 */

const ROUTE_PATH = '/dsh-inline-annotations/ask';
const MAX_BODY_BYTES = 64 * 1024;
const MAX_SELECTION = 2000;
const MAX_QUESTION = 2000;
const MAX_CONTEXT = 4000;
const MAX_TRANSCRIPT = 6000;
const MAX_MESSAGE_TEXT = 1400;
const MAX_TOKENS = 1400;

const SYSTEM_PROMPT = [
  '你是 DeepSeek Harness 对话页里的「划选批注助手」。',
  '用户正在阅读自己与另一名助手的历史对话，划选了其中一段内容——通常是专业术语、结论、代码或数字——并可能附带一个问题。',
  '你的回答会保存在用户本地的折叠便签里，供日后回看，不会进入主对话。',
  '',
  '要求：',
  '1. 直接作答。不要寒暄，不要说明你是独立窗口、批注助手或子对话，也不要复述划选内容。',
  '2. 使用用户提问所用的语言；用户没有提问时使用简体中文。',
  '3. 先用一句话给出结论或定义，再给 2 到 4 个要点；必要时补一个最小例子。默认不超过 250 字。',
  '4. 只依据提供的对话上下文和公认知识作答，不要编造对话中并不存在的结论；上下文不足以判断时，直接说明。',
  '5. 使用 Markdown：短段落、`-` 列表、行内 `代码`；不要使用一级标题，不要输出表格。',
].join('\n');

export const inject = ['webServer', 'llm', 'sessions'];

export function apply(ctx) {
  ctx.effect(() => ctx.webServer.register({
    kind: 'exact',
    path: ROUTE_PATH,
    handler: (req, res) => {
      handleAsk(ctx, req, res).catch((error) => {
        if (!res.headersSent) {
          sendJson(res, 500, { error: 'internal', message: messageOf(error) });
        } else if (!res.writableEnded) {
          writeEvent(res, { type: 'error', message: messageOf(error) });
          res.end();
        }
      });
    },
  }));
}

async function handleAsk(ctx, req, res) {
  if (req.method !== 'POST') {
    req.resume();
    sendJson(res, 405, { error: 'method-not-allowed', message: '仅支持 POST' });
    return;
  }
  const denied = denialOf(ctx, req);
  if (denied) {
    req.resume();
    sendJson(res, denied, { error: 'unauthorized', message: '请求未通过本机连接校验' });
    return;
  }

  let body;
  try {
    body = await readJson(req);
  } catch {
    sendJson(res, 400, { error: 'bad-request', message: '请求体读取失败或不是合法 JSON' });
    return;
  }

  const selection = clip(asText(body && body.selection), MAX_SELECTION);
  const question = clip(asText(body && body.question), MAX_QUESTION);
  const selectionContext = clip(asText(body && body.context), MAX_CONTEXT);
  const sessionId = asText(body && body.sessionId);

  if (!selection) {
    sendJson(res, 400, { error: 'empty-selection', message: '没有可提问的划选内容' });
    return;
  }

  const session = sessionId ? ctx.sessions.get(sessionId) : undefined;
  const target = resolveModel(ctx, session);
  if (!target) {
    sendJson(res, 409, { error: 'no-model', message: '当前没有可用的模型，请先在设置里选择模型' });
    return;
  }

  const prompt = buildPrompt({
    selection,
    question,
    selectionContext,
    transcript: transcriptOf(session),
  });

  res.writeHead(200, {
    'content-type': 'text/event-stream; charset=utf-8',
    'cache-control': 'no-cache, no-transform',
    'connection': 'keep-alive',
    'x-accel-buffering': 'no',
  });
  res.write(': open\n\n');

  const controller = new AbortController();
  res.on('close', () => {
    if (!res.writableEnded) controller.abort();
  });

  let answer = '';
  try {
    const stream = ctx.llm.stream({
      provider: target.provider,
      model: target.model,
      reasoningEffort: target.reasoningEffort,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: [{ type: 'text', text: prompt }] }],
      temperature: 0.3,
      maxTokens: MAX_TOKENS,
      signal: controller.signal,
    });

    for await (const chunk of stream) {
      if (!chunk || typeof chunk !== 'object') continue;
      if (chunk.type === 'text-delta') {
        if (!chunk.text) continue;
        answer += chunk.text;
        writeEvent(res, { type: 'delta', text: chunk.text });
        continue;
      }
      if (chunk.type !== 'finish') continue;
      const reason = chunk.reason || {};
      if (reason.kind === 'error' || reason.kind === 'aborted') {
        writeEvent(res, {
          type: 'error',
          message: (reason.failure && reason.failure.message) || '模型调用中断',
          code: (reason.failure && reason.failure.code) || reason.kind,
        });
      } else {
        writeEvent(res, { type: 'done', finish: reason.kind || 'stop' });
      }
    }
  } catch (error) {
    writeEvent(res, { type: 'error', message: messageOf(error) });
  } finally {
    if (!res.writableEnded) res.end();
  }
}

/* ------------------------------------------------------------------ */
/* Request guards                                                      */
/* ------------------------------------------------------------------ */

/**
 * Apply the Harness connection's own Host/Origin + browser-cookie check to this
 * plain Web route. The page's same-origin fetch carries the signed cookie, so it
 * passes; anything else is refused. When no Connection is mounted the route falls
 * back to the equivalent same-origin-only check.
 */
function denialOf(ctx, req) {
  const connection = ctx.get('connection');
  if (connection && typeof connection.requestRejection === 'function') {
    try {
      const status = connection.requestRejection({ headers: req.headers });
      return status || undefined;
    } catch {
      return 403;
    }
  }
  return sameOriginOnly(ctx, req);
}

function sameOriginOnly(ctx, req) {
  const headers = req.headers || {};
  const origin = asText(headers.origin);
  const host = asText(headers.host);
  const site = asText(headers['sec-fetch-site']);

  if (site && site !== 'same-origin' && site !== 'none') return 403;
  if (!origin && !host) return 403;

  if (origin) {
    let expected = '';
    try {
      expected = ctx.webServer.getOrigin();
    } catch {
      expected = '';
    }
    if (expected) {
      if (origin !== expected) return 403;
    } else if (!/^https?:\/\/(127\.0\.0\.1|localhost|\[::1\])(:\d+)?$/.test(origin)) {
      return 403;
    }
  }
  return undefined;
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        reject(new Error('too-large'));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => {
      try {
        const text = Buffer.concat(chunks).toString('utf8').trim();
        resolve(text ? JSON.parse(text) : {});
      } catch (error) {
        reject(error);
      }
    });
    req.on('error', reject);
  });
}

/* ------------------------------------------------------------------ */
/* Model + context                                                     */
/* ------------------------------------------------------------------ */

function resolveModel(ctx, session) {
  try {
    const header = session && typeof session.requestHeader === 'function' ? session.requestHeader() : undefined;
    const config = header && header.config;
    if (config && asText(config.provider) && asText(config.model)) {
      return { provider: config.provider, model: config.model, reasoningEffort: config.reasoningEffort };
    }
  } catch {
    // fall through to the profile default
  }
  try {
    const service = ctx.get('agentDefaultModel');
    if (service && typeof service.currentSelection === 'function') {
      const selection = service.currentSelection();
      if (selection && asText(selection.provider) && asText(selection.model)) {
        return { provider: selection.provider, model: selection.model, reasoningEffort: selection.reasoningEffort };
      }
    }
  } catch {
    // no default model either
  }
  return undefined;
}

function transcriptOf(session) {
  if (!session || typeof session.deriveMessages !== 'function') return '';
  let messages;
  try {
    messages = session.deriveMessages();
  } catch {
    return '';
  }
  if (!Array.isArray(messages) || messages.length === 0) return '';

  const lines = [];
  let budget = MAX_TRANSCRIPT;
  for (let index = messages.length - 1; index >= 0 && budget > 0; index -= 1) {
    const message = messages[index];
    if (!message || (message.role !== 'user' && message.role !== 'assistant')) continue;
    const text = textOf(message);
    if (!text) continue;
    const clipped = text.length > MAX_MESSAGE_TEXT ? `${text.slice(0, MAX_MESSAGE_TEXT)}…` : text;
    budget -= clipped.length;
    if (budget < 0) break;
    lines.unshift(`${message.role === 'user' ? '用户' : '助手'}：${clipped}`);
  }
  return lines.join('\n\n');
}

function textOf(message) {
  const content = message && message.content;
  if (typeof content === 'string') return content.trim();
  if (!Array.isArray(content)) return '';
  const parts = [];
  for (const block of content) {
    if (!block || block.type !== 'text' || typeof block.text !== 'string') continue;
    const text = block.text.trim();
    if (text) parts.push(text);
  }
  return parts.join('\n');
}

function buildPrompt({ selection, question, selectionContext, transcript }) {
  const parts = [];
  if (transcript) parts.push(`对话上下文（节选）：\n${transcript}`);
  if (selectionContext && selectionContext !== selection) {
    parts.push(`划选内容所在的段落：\n${selectionContext}`);
  }
  parts.push(`划选内容：\n"""\n${selection}\n"""`);
  parts.push(question ? `用户的问题：\n${question}` : '用户的问题：\n（没有额外问题，请直接解释这段内容）');
  return parts.join('\n\n');
}

/* ------------------------------------------------------------------ */
/* Small helpers                                                       */
/* ------------------------------------------------------------------ */

function writeEvent(res, payload) {
  if (res.writableEnded) return;
  res.write(`data: ${JSON.stringify(payload)}\n\n`);
}

function sendJson(res, status, payload) {
  if (res.writableEnded) return;
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    'content-type': 'application/json; charset=utf-8',
    'cache-control': 'no-store',
    'content-length': Buffer.byteLength(body),
  });
  res.end(body);
}

function asText(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function clip(text, limit) {
  return text.length > limit ? text.slice(0, limit) : text;
}

function messageOf(error) {
  if (!error) return '未知错误';
  if (typeof error === 'string') return error;
  if (typeof error.message === 'string' && error.message) return error.message;
  return String(error);
}
