window.__ModuleLoader__.load({
  id: '@local/dsh-inline-annotations',
  factory(require) {
    const React = require('react');
    const h = React.createElement;

    const NS = 'inline-annotations';
    const STORAGE_KEY = 'dsh.inline-annotations.v1';
    const FAB_POS_KEY = 'dsh.inline-annotations.fab-pos';
    const DOC_KEY = 'dsh.inline-annotations.docs';
    const ASK_ROUTE = '/dsh-inline-annotations/ask';
    const HEALTH_ROUTE = '/dsh-inline-annotations/health';
    const MAX_SELECTION = 1500;
    const MAX_NOTES = 200;
    const ATTRIBUTE = 'data-dsh-inline-annotations';
    const MAX_UPLOAD_BYTES = 25 * 1024 * 1024;

    const TONES = [
      { id: 'amber', dot: '#f59e0b' },
      { id: 'blue', dot: '#3b82f6' },
      { id: 'green', dot: '#10b981' },
      { id: 'rose', dot: '#f43f5e' },
      { id: 'violet', dot: '#8b5cf6' },
      { id: 'slate', dot: '#64748b' },
    ];

    const ZH = {
      'fab': '便签',
      'fab.title': '划选批注便签',
      'tip.ask': '问 AI',
      'tip.quote': '引用',
      'toast.quoted': '已添加到输入框',
      'toast.quoteFailed': '没能写入输入框，请先把光标放进输入框再试',
      'note.pdf': 'PDF 文档',
      'note.pdfPage': 'PDF 第 {n} 页',
      'note.tone': '换配色',
      'fab.image': '截图提问',
      'fab.imageTitle': '粘贴截图提问',
      'ask.image': '图片',
      'ask.imageRemove': '移除',
      'ask.imageHint': 'Ctrl+V 粘贴截图，或选择图片文件',
      'image.failed': '图片读取失败，换一张试试',
      'image.needsRestart': '图片提问需要重启一次 DSH 后可用',
      'panel.title': '划选批注',
      'panel.hint': '划选对话文字提问，回答收进便签',
      'panel.count': '{n} 条',
      'panel.empty': '在对话里划选术语或段落，点「问 AI」，解释会收进这里，不会写进主对话。',
      'panel.emptyFilter': '这个筛选下还没有便签。',
      'panel.clear': '清空全部',
      'panel.clearConfirm': '再点一次确认清空',
      'panel.close': '关闭便签',
      'note.copy': '复制',
      'note.copied': '已复制',
      'note.delete': '删除',
      'note.question': '提问',
      'note.imageOnly': '图片提问',
      'note.openImage': '查看大图',
      'note.interrupted': '回答被中断，已保留部分内容',
      'panel.filter.all': '全部文档',
      'panel.filter.none': '未关联文档',
      'doc.label': '文档',
      'doc.placeholder': '关联文档（可选），如 论文A.pdf',
      'doc.attached': '已关联：',
      'doc.inherited': '已关联（沿用上次）：',
      'doc.clear': '取消关联',
      'fab.drag': '按住可拖动',
      'ask.titleBlank': '提问',
      'ask.screenshot': '截图',
      'capture.title': '框选要提问的区域',
      'capture.use': '使用这块',
      'capture.retake': '重截',
      'capture.cancel': '取消',
      'capture.tooSmall': '选区太小，重新框选',
      'capture.denied': '系统不允许页面截屏，请用系统截图（Win+Shift+S）后粘贴',
      'capture.unsupported': '当前环境不支持内置截图，请用系统截图后粘贴',
      'ask.title': '就划选内容提问',
      'ask.placeholder': '想问什么？留空则直接解释这段内容',
      'ask.placeholderImage': '贴一张截图，问问这张图讲什么…',
      'ask.imageLoading': '正在处理图片…',
      'ask.submit': '提问',
      'ask.cancel': '取消',
      'ask.stop': '停止',
      'ask.close': '关闭',
      'ask.thinking': '正在回答…',
      'ask.saved': '已保存到便签',
      'ask.retry': '重试',
      'ask.error': '回答失败',
      'ask.openNotes': '查看便签',
    };

    const EN = {
      'fab': 'Notes',
      'fab.title': 'Selection notes',
      'tip.ask': 'Ask AI',
      'tip.quote': 'Quote',
      'toast.quoted': 'Added to the composer',
      'toast.quoteFailed': 'Could not write to the composer — click into it once and retry',
      'note.pdf': 'PDF document',
      'note.pdfPage': 'PDF page {n}',
      'note.tone': 'Change color',
      'fab.image': 'Ask with a screenshot',
      'fab.imageTitle': 'Paste a screenshot to ask',
      'ask.image': 'Image',
      'ask.imageRemove': 'Remove',
      'ask.imageHint': 'Paste a screenshot with Ctrl+V, or pick an image file',
      'image.failed': 'Could not read that image',
      'image.needsRestart': 'Image questions need one DSH restart',
      'panel.title': 'Selection notes',
      'panel.hint': 'Ask about selected text; answers stay in notes',
      'panel.count': '{n} notes',
      'panel.empty': 'Select a term or passage in the conversation, choose Ask AI, and the answer lands here — never in the chat.',
      'panel.emptyFilter': 'No notes under this filter.',
      'panel.clear': 'Clear all',
      'panel.clearConfirm': 'Click again to clear',
      'panel.close': 'Close notes',
      'note.copy': 'Copy',
      'note.copied': 'Copied',
      'note.delete': 'Delete',
      'note.question': 'Question',
      'note.imageOnly': 'Image question',
      'note.openImage': 'Open image',
      'note.interrupted': 'Answer was stopped; partial text kept',
      'panel.filter.all': 'All documents',
      'panel.filter.none': 'No document',
      'doc.label': 'Document',
      'doc.placeholder': 'Related document (optional), e.g. paper-a.pdf',
      'doc.attached': 'Attached: ',
      'doc.inherited': 'Attached (kept from last time): ',
      'doc.clear': 'Remove association',
      'fab.drag': 'Drag to move',
      'ask.titleBlank': 'Ask',
      'ask.screenshot': 'Capture',
      'capture.title': 'Drag a box around the area to ask about',
      'capture.use': 'Use this area',
      'capture.retake': 'Retake',
      'capture.cancel': 'Cancel',
      'capture.tooSmall': 'Selection is too small — drag a larger box',
      'capture.denied': 'Screen capture is blocked here; use the system snipping tool and paste',
      'capture.unsupported': 'Built-in capture is unavailable here; use the system snipping tool and paste',
      'ask.title': 'Ask about the selection',
      'ask.placeholder': 'What do you want to ask? Leave empty to explain it.',
      'ask.placeholderImage': 'Paste a screenshot and ask what it shows…',
      'ask.imageLoading': 'Processing image…',
      'ask.submit': 'Ask',
      'ask.cancel': 'Cancel',
      'ask.stop': 'Stop',
      'ask.close': 'Close',
      'ask.thinking': 'Answering…',
      'ask.saved': 'Saved to notes',
      'ask.retry': 'Retry',
      'ask.error': 'Answer failed',
      'ask.openNotes': 'View notes',
    };

    return {
      inject: ['slots', 'locale'],
      apply(ctx) {
        let CSS = '';

        const bound = (() => {
          try {
            return ctx.locale.bind(NS);
          } catch {
            return null;
          }
        })();

        function isZh() {
          try {
            const snapshot = ctx.locale.getLocale();
            return /^zh/i.test(String(snapshot && snapshot.active));
          } catch {
            return true;
          }
        }

        function t(key) {
          if (bound) {
            try {
              const value = bound(key);
              if (typeof value === 'string' && value !== key) return value;
            } catch {
              // fall through to the local dictionary
            }
          }
          const dict = isZh() ? ZH : EN;
          return dict[key] || key;
        }

        for (const [locale, dict] of [['zh', ZH], ['en', EN]]) {
          ctx.effect(() => ctx.locale.register(NS, locale, dict));
        }

        /* ---------------------------------------------------------------- */
        /* Store                                                             */
        /* ---------------------------------------------------------------- */

        let state = {
          sessionId: null,
          notes: [],
          panelOpen: false,
          fabPos: loadFabPos(),
          fabSize: { width: 0, height: 0 },
          fabDragging: false,
          tip: null,
          ask: null,
          capture: null,
          expanded: {},
          copiedId: null,
          confirmingClear: false,
          inputActions: null,
          toast: null,
          hostBuild: 0,
          currentDoc: '',
          docFilter: 'all',
          mathRev: 0,
        };
        const subscribers = new Set();

        function emit() {
          for (const subscriber of subscribers) subscriber();
        }

        function set(patch) {
          state = Object.assign({}, state, patch);
          emit();
        }

        function subscribe(subscriber) {
          subscribers.add(subscriber);
          return () => subscribers.delete(subscriber);
        }

        function snapshot() {
          return state;
        }

        function useStore() {
          return React.useSyncExternalStore(subscribe, snapshot, snapshot);
        }

        /* ---------------------------------------------------------------- */
        /* Math (KaTeX, borrowed from the web shell)                         */
        /* ---------------------------------------------------------------- */

        let katex = null;
        let katexLoading = null;

        /** The shell ships KaTeX inside its hashed vendor chunk; find that chunk by URL. */
        function vendorBundleUrl() {
          const links = Array.from(document.querySelectorAll('link[rel="modulepreload"]'));
          for (const link of links) {
            const href = String(link.href || '');
            if (/\/assets\/vendor-[^/]+\.js$/.test(href)) return href;
          }
          try {
            const entries = performance.getEntriesByType('resource');
            for (const entry of entries) {
              const name = String(entry.name || '');
              if (/\/assets\/vendor-[^/]+\.js$/.test(name)) return name;
            }
          } catch {
            // performance API unavailable
          }
          return null;
        }

        function loadMath() {
          if (katex) return Promise.resolve(katex);
          if (katexLoading) return katexLoading;
          katexLoading = (async () => {
            const url = vendorBundleUrl();
            if (!url) return null;
            const mod = await import(/* @vite-ignore */ url);
            for (const value of Object.values(mod)) {
              if (value
                && typeof value.renderToString === 'function'
                && typeof value.__parse === 'function'
                && typeof value.version === 'string') return value;
            }
            return null;
          })()
            .catch(() => null)
            .then((found) => {
              if (found) {
                katex = found;
                set({ mathRev: state.mathRev + 1 });
              }
              return found;
            });
          return katexLoading;
        }

        function mathNode(tex, display, key) {
          if (katex) {
            try {
              const html = katex.renderToString(tex, {
                displayMode: !!display,
                throwOnError: false,
                strict: 'ignore',
              });
              return h(display ? 'div' : 'span', {
                key,
                className: display ? 'ia-math ia-math--block' : 'ia-math',
                dangerouslySetInnerHTML: { __html: html },
              });
            } catch {
              // fall through to the plain-text form
            }
          }
          return h('code', { key, className: 'ia-math-raw' }, display ? `$$${tex}$$` : `$${tex}$`);
        }

        /** `$5` / `$1,200.` is a price, not a formula. */
        function looksLikeMoney(token) {
          return /^\$[\d][\d,.]*[.,]?$/.test(token);
        }

        void loadMath();

        /* ---------------------------------------------------------------- */
        /* Persistence                                                       */
        /* ---------------------------------------------------------------- */

        function readAll() {
          try {
            const raw = window.localStorage.getItem(STORAGE_KEY);
            const parsed = raw ? JSON.parse(raw) : {};
            return parsed && typeof parsed === 'object' ? parsed : {};
          } catch {
            return {};
          }
        }

        function writeAll(value) {
          try {
            window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
          } catch {
            // storage full or disabled: keep the in-memory notes
          }
        }

        function loadNotes(sessionId) {
          if (!sessionId) return [];
          const stored = readAll()[sessionId];
          if (!Array.isArray(stored)) return [];
          return stored.filter(isNote);
        }

        function persistNotes(sessionId, notes) {
          if (!sessionId) return;
          const all = readAll();
          all[sessionId] = notes.slice(0, MAX_NOTES);
          writeAll(all);
        }

        function isNote(note) {
          return !!note && typeof note.id === 'string' && typeof note.text === 'string' && typeof note.answer === 'string';
        }

        /* ---------------------------------------------------------------- */
        /* Floating button position, document context                        */
        /* ---------------------------------------------------------------- */

        function loadFabPos() {
          try {
            const raw = window.localStorage.getItem(FAB_POS_KEY);
            if (!raw) return null;
            const parsed = JSON.parse(raw);
            if (parsed && Number.isFinite(parsed.x) && Number.isFinite(parsed.y)) {
              return { x: parsed.x, y: parsed.y };
            }
          } catch {
            // ignore a corrupt preference
          }
          return null;
        }

        function saveFabPos(position) {
          try {
            window.localStorage.setItem(FAB_POS_KEY, JSON.stringify(position));
          } catch {
            // storage disabled: keep the position for this page only
          }
        }

        function clampFab(x, y, width, height) {
          const maxX = Math.max(8, window.innerWidth - width - 8);
          const maxY = Math.max(8, window.innerHeight - height - 8);
          return {
            x: Math.min(Math.max(8, Math.round(x)), maxX),
            y: Math.min(Math.max(8, Math.round(y)), maxY),
          };
        }

        let suppressFabClick = false;

        /** Drag the floating button group itself; a small threshold keeps plain clicks working. */
        function startFabDrag(event, element) {
          if (!element || event.button !== 0) return;
          suppressFabClick = false;
          const rect = element.getBoundingClientRect();
          const startX = event.clientX;
          const startY = event.clientY;
          let moved = false;

          const move = (moveEvent) => {
            const dx = moveEvent.clientX - startX;
            const dy = moveEvent.clientY - startY;
            if (!moved) {
              if (Math.abs(dx) + Math.abs(dy) < 6) return;
              moved = true;
              set({ fabDragging: true, fabSize: { width: rect.width, height: rect.height } });
            }
            set({ fabPos: clampFab(rect.left + dx, rect.top + dy, rect.width, rect.height) });
          };
          const finish = () => {
            window.removeEventListener('pointermove', move);
            window.removeEventListener('pointerup', finish);
            window.removeEventListener('pointercancel', finish);
            if (!moved) return;
            set({ fabDragging: false });
            saveFabPos(state.fabPos);
            suppressFabClick = true;
          };
          window.addEventListener('pointermove', move);
          window.addEventListener('pointerup', finish);
          window.addEventListener('pointercancel', finish);
        }

        function readDocMap() {
          try {
            const parsed = JSON.parse(window.localStorage.getItem(DOC_KEY) || '{}');
            return parsed && typeof parsed === 'object' ? parsed : {};
          } catch {
            return {};
          }
        }

        function loadDoc(sessionId) {
          if (!sessionId) return '';
          const value = readDocMap()[sessionId];
          return typeof value === 'string' ? value : '';
        }

        function saveDocFor(sessionId, doc) {
          if (!sessionId) return;
          const map = readDocMap();
          const text = String(doc || '').trim();
          if (text) map[sessionId] = text;
          else delete map[sessionId];
          try {
            window.localStorage.setItem(DOC_KEY, JSON.stringify(map));
          } catch {
            // storage disabled
          }
        }

        /* ---------------------------------------------------------------- */
        /* Session binding                                                   */
        /* ---------------------------------------------------------------- */

        let askController = null;
        let stoppedByUser = false;
        let toastTimer = 0;

        function bindSession(sessionId) {
          if (state.sessionId === sessionId) return;
          closeAsk();
          set({
            sessionId: sessionId || null,
            notes: loadNotes(sessionId),
            tip: null,
            expanded: {},
            panelOpen: false,
            confirmingClear: false,
            currentDoc: loadDoc(sessionId),
            docFilter: 'all',
          });
        }

        /* ---------------------------------------------------------------- */
        /* Selection observation                                             */
        /* ---------------------------------------------------------------- */

        function elementOf(node) {
          if (!node) return null;
          if (node.nodeType === 1) return node;
          return node.parentElement || null;
        }

        function insideOwnUi(element) {
          try {
            return !!(element && element.closest && element.closest(`[${ATTRIBUTE}]`));
          } catch {
            return false;
          }
        }

        function insideEditable(element) {
          try {
            return !!(element && element.closest && element.closest('textarea, input, select, [contenteditable="true"], [contenteditable=""], [role="textbox"]'));
          } catch {
            return false;
          }
        }

        function blockContextOf(range) {
          try {
            const element = elementOf(range.commonAncestorContainer);
            if (!element) return '';
            const block = element.closest('p, li, pre, blockquote, td, th, h1, h2, h3, h4, h5, h6, figcaption') || element;
            const own = String(block.textContent || '').replace(/\s+/g, ' ').trim();
            if (own.length >= 240) return own.slice(0, 1800);
            let node = element;
            for (let depth = 0; depth < 6 && node; depth += 1) {
              const text = String(node.textContent || '').replace(/\s+/g, ' ').trim();
              if (text.length >= 320) return text.slice(0, 1800);
              node = node.parentElement;
            }
            return own.slice(0, 1800);
          } catch {
            return '';
          }
        }

        /**
         * PDF and converted Office pages render through PDF.js: a real text layer in
         * this document, one page container per page. Use the whole page as context
         * so a paper question is answered against its source, not just one line.
         */
        function documentContextOf(element) {
          try {
            if (!element || !element.closest) return null;
            const page = element.closest('[data-page-number]');
            const layer = page || element.closest('.textLayer');
            if (!layer) return null;
            const root = layer.closest('[data-page-number]') || layer;
            const pageNumber = String(root.getAttribute('data-page-number') || '');
            const text = String(root.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 1800);
            if (!text) return null;
            const where = pageNumber ? `第 ${pageNumber} 页` : '当前页';
            return {
              page: pageNumber,
              context: `【用户在阅读 PDF 文档（${where}），划选了下面这段内容，不是对话记录】\n${text}`,
            };
          } catch {
            return null;
          }
        }

        function hideTip() {
          if (state.tip) set({ tip: null });
        }

        function readSelection() {
          try {
            const selection = window.getSelection();
            if (!selection || selection.rangeCount === 0 || selection.isCollapsed) return null;
            const text = String(selection.toString()).replace(/\s+/g, ' ').trim();
            if (!text || text.length > MAX_SELECTION) return null;
            const range = selection.getRangeAt(0);
            const start = elementOf(range.startContainer);
            const end = elementOf(range.endContainer);
            if (!start || !end || insideOwnUi(start) || insideOwnUi(end) || insideEditable(start) || insideEditable(end)) {
              return null;
            }
            const rect = range.getBoundingClientRect();
            if (!rect || (rect.width === 0 && rect.height === 0)) return null;
            const documentContext = documentContextOf(start);
            const below = rect.bottom + 64 < window.innerHeight;
            return {
              text,
              context: documentContext ? documentContext.context : blockContextOf(range),
              source: documentContext ? 'document' : 'conversation',
              page: documentContext ? documentContext.page : '',
              x: Math.max(80, Math.min(rect.left + rect.width / 2, window.innerWidth - 80)),
              y: below ? rect.bottom + 8 : rect.top - 8,
              above: !below,
            };
          } catch {
            return null;
          }
        }

        function evaluateSelection() {
          const info = readSelection();
          if (!info) {
            hideTip();
            return;
          }
          // An open ask card is the live editor: a new selection feeds it instead of the tip.
          if (state.ask && state.ask.phase === 'idle') {
            if (state.ask.text !== info.text) {
              set({ ask: Object.assign({}, state.ask, { text: info.text, context: info.context, source: info.source, page: info.page }) });
            }
            hideTip();
            return;
          }
          set({
            tip: {
              text: info.text,
              context: info.context,
              source: info.source,
              page: info.page,
              x: info.x,
              y: info.y,
              above: info.above,
            },
          });
        }

        /* ---------------------------------------------------------------- */
        /* Ask flow                                                          */
        /* ---------------------------------------------------------------- */

        function abortRunningAsk() {
          if (!askController) return;
          const previous = askController;
          askController = null;
          stoppedByUser = false;
          try {
            previous.abort();
          } catch {
            // already settled
          }
        }

        function openAsk(tip) {
          abortRunningAsk();
          const width = 380;
          const left = Math.max(12, Math.min(tip.x - width / 2, window.innerWidth - width - 12));
          const position = tip.above
            ? { left: `${left}px`, bottom: `${Math.max(12, window.innerHeight - tip.y)}px` }
            : { left: `${left}px`, top: `${tip.y}px` };
          set({
            tip: null,
            capture: null,
            ask: {
              id: uid(),
              text: tip.text,
              context: tip.context || '',
              source: tip.source || 'conversation',
              page: tip.page || '',
              doc: state.currentDoc || '',
              docInherited: Boolean(String(state.currentDoc || '').trim()),
              question: '',
              answer: '',
              image: null,
              imageLoading: false,
              imageError: null,
              phase: 'idle',
              error: null,
              savedId: null,
              position,
            },
          });
          try {
            const selection = window.getSelection();
            if (selection) selection.removeAllRanges();
          } catch {
            // no selection to clear
          }
        }

        /** A blank ask started from the screenshot button: seeded with the live selection, image optional. */
        function openBlankAsk() {
          abortRunningAsk();
          const selectionInfo = readSelection();
          const width = 380;
          const anchor = state.fabPos;
          const size = state.fabSize;
          let position;
          if (anchor && size.width) {
            const left = Math.max(12, Math.min(anchor.x, window.innerWidth - width - 12));
            position = anchor.y < 320
              ? { left: `${left}px`, top: `${anchor.y + size.height + 10}px` }
              : { left: `${left}px`, bottom: `${Math.max(12, window.innerHeight - anchor.y + 10)}px` };
          } else {
            position = {
              left: `${Math.max(12, Math.round((window.innerWidth - width) / 2))}px`,
              top: `${Math.max(72, Math.round(window.innerHeight * 0.22))}px`,
            };
          }
          set({
            tip: null,
            capture: null,
            ask: {
              id: uid(),
              text: selectionInfo ? selectionInfo.text : '',
              context: selectionInfo ? selectionInfo.context : '',
              source: selectionInfo ? selectionInfo.source : 'conversation',
              page: selectionInfo ? selectionInfo.page : '',
              doc: state.currentDoc || '',
              docInherited: Boolean(String(state.currentDoc || '').trim()),
              question: '',
              answer: '',
              image: null,
              imageLoading: false,
              imageError: null,
              phase: 'idle',
              error: null,
              savedId: null,
              position,
            },
          });
        }

        function closeAsk() {
          stoppedByUser = false;
          if (askController) {
            const controller = askController;
            askController = null;
            try {
              controller.abort();
            } catch {
              // already settled
            }
          }
          if (state.ask || state.capture) set({ ask: null, capture: null });
        }

        function stopAsk() {
          stoppedByUser = true;
          if (!askController) return;
          const controller = askController;
          askController = null;
          try {
            controller.abort();
          } catch {
            // already settled
          }
        }

        function startAsk(question) {
          const current = state.ask;
          if (!current || current.phase === 'streaming' || !state.sessionId) return;
          const controller = new AbortController();
          askController = controller;
          stoppedByUser = false;
          const doc = String(current.doc || '').trim();
          saveDocFor(state.sessionId, doc);
          set({
            currentDoc: doc,
            ask: Object.assign({}, current, { doc, question, answer: '', phase: 'streaming', error: null, savedId: null }),
          });
          runAsk(current, question, controller);
        }

        async function runAsk(base, question, controller) {
          let answer = '';
          try {
            const response = await fetch(ASK_ROUTE, {
              method: 'POST',
              headers: { 'content-type': 'application/json' },
              credentials: 'same-origin',
              signal: controller.signal,
              body: JSON.stringify({
                sessionId: state.sessionId,
                selection: base.text,
                question,
                context: [base.context, base.doc ? `【这段内容属于文档：${base.doc}】` : ''].filter(Boolean).join('\n'),
                image: base.image
                  ? {
                    mediaType: base.image.mediaType,
                    dataBase64: stripDataUrl(base.image.dataUrl),
                    name: base.image.mediaType === 'image/png' ? 'screenshot.png' : 'screenshot.jpg',
                  }
                  : undefined,
              }),
            });

            if (!response.ok) {
              let message = `HTTP ${response.status}`;
              try {
                const payload = await response.json();
                if (payload && typeof payload.message === 'string' && payload.message) message = payload.message;
              } catch {
                // keep the status line
              }
              throw new Error(message);
            }
            if (!response.body) throw new Error('当前浏览器不支持流式响应');

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let buffer = '';
            let failure = null;

            for (;;) {
              const { value, done } = await reader.read();
              if (done) break;
              buffer += decoder.decode(value, { stream: true });
              let boundary = buffer.indexOf('\n\n');
              while (boundary >= 0) {
                const frame = buffer.slice(0, boundary);
                buffer = buffer.slice(boundary + 2);
                for (const line of frame.split('\n')) {
                  if (!line.startsWith('data:')) continue;
                  let payload;
                  try {
                    payload = JSON.parse(line.slice(5).trim());
                  } catch {
                    continue;
                  }
                  if (payload.type === 'delta' && payload.text) {
                    answer += payload.text;
                    if (askController === controller && state.ask) {
                      set({ ask: Object.assign({}, state.ask, { answer }) });
                    }
                  } else if (payload.type === 'error') {
                    failure = new Error(payload.message || t('ask.error'));
                  }
                }
                boundary = buffer.indexOf('\n\n');
              }
            }

            if (failure) throw failure;
            if (askController === controller) finishAsk(base, question, answer, false);
          } catch (error) {
            if (error && error.name === 'AbortError') {
              if (stoppedByUser) {
                stoppedByUser = false;
                finishAsk(base, question, answer, true);
              }
              return;
            }
            if (askController === controller && state.ask) {
              set({ ask: Object.assign({}, state.ask, { phase: 'error', error: String((error && error.message) || error) }) });
            }
          } finally {
            if (askController === controller) askController = null;
          }
        }

        function finishAsk(base, question, answer, interrupted) {
          const text = String(answer || '').trim();
          if (!text) {
            if (state.ask) set({ ask: Object.assign({}, state.ask, { phase: 'error', error: t('ask.error') }) });
            return;
          }
          const note = {
            id: uid(),
            text: base.text,
            context: base.context || '',
            question: question || '',
            answer: text,
            createdAt: Date.now(),
            interrupted: !!interrupted,
            sessionId: state.sessionId,
            source: base.source || 'conversation',
            page: base.page || '',
            doc: base.doc || '',
            thumb: base.image ? base.image.thumb : '',
          };
          const notes = [note].concat(state.notes).slice(0, MAX_NOTES);
          const expanded = Object.assign({}, state.expanded, { [note.id]: true });
          const patch = { notes, expanded, confirmingClear: false };
          if (state.ask) {
            patch.ask = Object.assign({}, state.ask, { phase: 'saved', answer: text, savedId: note.id, question });
          }
          set(patch);
          persistNotes(state.sessionId, notes);
        }

        /* ---------------------------------------------------------------- */
        /* Note actions                                                      */
        /* ---------------------------------------------------------------- */

        function toggleNote(id) {
          const expanded = Object.assign({}, state.expanded);
          if (expanded[id]) delete expanded[id];
          else expanded[id] = true;
          set({ expanded });
        }

        function setNoteTone(id, tone) {
          const notes = state.notes.map((note) => (note.id === id ? Object.assign({}, note, { tone }) : note));
          set({ notes });
          persistNotes(state.sessionId, notes);
        }

        function deleteNote(id) {
          const notes = state.notes.filter((note) => note.id !== id);
          const expanded = Object.assign({}, state.expanded);
          delete expanded[id];
          set({ notes, expanded });
          persistNotes(state.sessionId, notes);
        }

        function clearNotes() {
          if (!state.confirmingClear) {
            set({ confirmingClear: true });
            window.setTimeout(() => {
              if (state.confirmingClear) set({ confirmingClear: false });
            }, 3000);
            return;
          }
          set({ notes: [], expanded: {}, confirmingClear: false });
          persistNotes(state.sessionId, []);
        }

        function copyNote(note) {
          const text = note.question ? `${note.question}\n\n${note.answer}` : note.answer;
          const done = () => {
            set({ copiedId: note.id });
            window.setTimeout(() => {
              if (state.copiedId === note.id) set({ copiedId: null });
            }, 1500);
          };
          try {
            const result = navigator.clipboard.writeText(text);
            if (result && typeof result.then === 'function') result.then(done, () => {});
            else done();
          } catch {
            // clipboard unavailable
          }
        }

        /* ---------------------------------------------------------------- */
        /* Image attachments                                                 */
        /* ---------------------------------------------------------------- */

        function drawToDataUrl(image, maxDim, quality) {
          const sourceWidth = image.naturalWidth || image.width || 1;
          const sourceHeight = image.naturalHeight || image.height || 1;
          const scale = Math.min(1, maxDim / Math.max(sourceWidth, sourceHeight));
          const width = Math.max(1, Math.round(sourceWidth * scale));
          const height = Math.max(1, Math.round(sourceHeight * scale));
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const context = canvas.getContext('2d');
          context.drawImage(image, 0, 0, width, height);
          return { dataUrl: canvas.toDataURL('image/jpeg', quality), width, height };
        }

        /** Decode a pasted/picked file into one request image plus a small review thumbnail. */
        function readImageFile(file) {
          return new Promise((resolve, reject) => {
            if (!file || !file.type || file.type.indexOf('image/') !== 0) {
              reject(new Error('not-an-image'));
              return;
            }
            if (file.size > MAX_UPLOAD_BYTES) {
              reject(new Error('too-large'));
              return;
            }
            const url = URL.createObjectURL(file);
            const image = new Image();
            image.onload = () => {
              try {
                const full = drawToDataUrl(image, 1600, 0.85);
                const thumb = drawToDataUrl(image, 320, 0.55);
                resolve({
                  dataUrl: full.dataUrl,
                  thumb: thumb.dataUrl,
                  mediaType: 'image/jpeg',
                  width: full.width,
                  height: full.height,
                });
              } catch (error) {
                reject(error);
              } finally {
                URL.revokeObjectURL(url);
              }
            };
            image.onerror = () => {
              URL.revokeObjectURL(url);
              reject(new Error('decode-failed'));
            };
            image.src = url;
          });
        }

        function stripDataUrl(dataUrl) {
          const text = String(dataUrl || '');
          const comma = text.indexOf(',');
          return comma >= 0 ? text.slice(comma + 1) : text;
        }

        async function addAskImage(file) {
          if (!state.ask) return;
          if (state.hostBuild < 2) {
            showToast(t('image.needsRestart'));
            return;
          }
          set({ ask: Object.assign({}, state.ask, { imageLoading: true, imageError: null }) });
          try {
            const image = await readImageFile(file);
            if (!state.ask) return;
            set({ ask: Object.assign({}, state.ask, { image, imageLoading: false }) });
          } catch {
            if (!state.ask) return;
            set({ ask: Object.assign({}, state.ask, { imageLoading: false, imageError: t('image.failed') }) });
          }
        }

        function removeAskImage() {
          if (!state.ask) return;
          set({ ask: Object.assign({}, state.ask, { image: null, imageError: null }) });
        }

        function imageFromDataUrl(dataUrl) {
          return new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = () => {
              try {
                const full = drawToDataUrl(image, 1600, 0.85);
                const thumb = drawToDataUrl(image, 320, 0.55);
                resolve({
                  dataUrl: full.dataUrl,
                  thumb: thumb.dataUrl,
                  mediaType: 'image/jpeg',
                  width: full.width,
                  height: full.height,
                });
              } catch (error) {
                reject(error);
              }
            };
            image.onerror = () => reject(new Error('decode-failed'));
            image.src = dataUrl;
          });
        }

        function applyCapturedImage(dataUrl) {
          imageFromDataUrl(dataUrl)
            .then((image) => {
              if (!state.ask) return;
              set({ ask: Object.assign({}, state.ask, { image }), capture: null });
            })
            .catch(() => {
              set({ capture: null });
              showToast(t('image.failed'));
            });
        }

        /** One-shot screen capture through getDisplayMedia; the crop happens in CaptureOverlay. */
        async function captureScreen() {
          if (!state.ask) return;
          const media = navigator.mediaDevices;
          if (!media || typeof media.getDisplayMedia !== 'function') {
            showToast(t('capture.unsupported'));
            return;
          }
          let stream = null;
          try {
            stream = await media.getDisplayMedia({ video: { frameRate: 30 }, audio: false });
            const track = stream.getVideoTracks()[0];
            const video = document.createElement('video');
            video.srcObject = stream;
            video.muted = true;
            await new Promise((resolve, reject) => {
              video.onloadedmetadata = () => resolve();
              video.onerror = () => reject(new Error('video-failed'));
              const playing = video.play();
              if (playing && typeof playing.catch === 'function') playing.catch(() => {});
            });
            await new Promise((resolve) => window.setTimeout(resolve, 150));
            const canvas = document.createElement('canvas');
            canvas.width = video.videoWidth || 1280;
            canvas.height = video.videoHeight || 720;
            canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
            const dataUrl = canvas.toDataURL('image/png');
            if (track && typeof track.stop === 'function') track.stop();
            set({ capture: { dataUrl } });
          } catch {
            if (stream) {
              for (const track of stream.getTracks()) {
                try {
                  track.stop();
                } catch {
                  // already stopped
                }
              }
            }
            showToast(t('capture.denied'));
          }
        }

        function togglePanel(next) {
          const open = typeof next === 'boolean' ? next : !state.panelOpen;
          set({ panelOpen: open, confirmingClear: false });
        }

        function showToast(text) {
          if (!text) return;
          const toast = { id: uid(), text };
          set({ toast });
          window.clearTimeout(toastTimer);
          toastTimer = window.setTimeout(() => {
            if (state.toast && state.toast.id === toast.id) set({ toast: null });
          }, 2400);
        }

        /**
         * Quote the selection into the resident composer through the Composer's own
         * input facade (captureInsertion + insertText), never by touching its DOM.
         */
        function quoteToComposer(tip) {
          const actions = state.inputActions;
          if (!actions || typeof actions.captureInsertion !== 'function' || typeof actions.insertText !== 'function') {
            showToast(t('toast.quoteFailed'));
            return false;
          }
          let applied = false;
          try {
            const captured = actions.captureInsertion();
            // Insert at the end of the caret/selection so an existing draft is never replaced.
            const span = { start: captured.end, end: captured.end, draftRev: captured.draftRev };
            const label = tip.source === 'document' && tip.page
              ? `[${t('note.pdfPage').replace('{n}', tip.page)}] `
              : '';
            const payload = `> ${label}${tip.text}\n\n`;
            applied = actions.insertText(payload, span) === true;
            if (applied && typeof actions.persistDraft === 'function') actions.persistDraft();
          } catch {
            applied = false;
          }
          if (applied) {
            set({ tip: null });
            showToast(t('toast.quoted'));
          } else {
            showToast(t('toast.quoteFailed'));
          }
          return applied;
        }

        /* ---------------------------------------------------------------- */
        /* Rendering helpers                                                 */
        /* ---------------------------------------------------------------- */

        function uid() {
          return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
        }

        function formatTime(timestamp) {
          const date = new Date(timestamp);
          const now = new Date();
          const sameDay = date.toDateString() === now.toDateString();
          try {
            if (sameDay) return date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
            return date.toLocaleString(undefined, { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' });
          } catch {
            return '';
          }
        }

        function inlinePlain(text, prefix) {
          const nodes = [];
          const pattern = /(\*\*[^*]+\*\*|`[^`]+`|\*[^*\n]+\*)/g;
          let last = 0;
          let index = 0;
          let match;
          while ((match = pattern.exec(text)) !== null) {
            if (match.index > last) nodes.push(text.slice(last, match.index));
            const token = match[0];
            const key = `${prefix}${index++}`;
            if (token.startsWith('**')) {
              nodes.push(h('strong', { key }, token.slice(2, -2)));
            } else if (token.startsWith('`')) {
              nodes.push(h('code', { key, className: 'ia-md-code' }, token.slice(1, -1)));
            } else {
              nodes.push(h('em', { key }, token.slice(1, -1)));
            }
            last = match.index + token.length;
          }
          if (last < text.length) nodes.push(text.slice(last));
          return nodes;
        }

        function inline(text) {
          const nodes = [];
          const pattern = /(\$\$[\s\S]+?\$\$|\$[^$\n]+\$|\\\([\s\S]*?\\\))/g;
          let last = 0;
          let index = 0;
          let match;
          while ((match = pattern.exec(text)) !== null) {
            if (match.index > last) nodes.push(...inlinePlain(text.slice(last, match.index), `t${index}_`));
            const token = match[0];
            let body;
            let display = false;
            if (token.startsWith('$$')) {
              body = token.slice(2, -2);
              display = true;
            } else if (token.startsWith('$')) {
              body = token.slice(1, -1);
            } else {
              body = token.slice(2, -2);
            }
            const money = token.startsWith('$') && !token.startsWith('$$') && looksLikeMoney(token);
            const padded = /^\s|\s$/.test(body);
            if (money || padded || !body.trim()) {
              nodes.push(...inlinePlain(token, `r${index}_`));
            } else {
              nodes.push(mathNode(body, display, `math${index}`));
            }
            index += 1;
            last = match.index + token.length;
          }
          if (last < text.length) nodes.push(...inlinePlain(text.slice(last), `u${index}_`));
          return nodes.length ? nodes : [''];
        }

        function renderMarkdown(source) {
          const lines = String(source || '').replace(/\r\n?/g, '\n').split('\n');
          const out = [];
          let paragraph = [];
          let list = null;
          let code = null;
          let mathBlock = null;
          let key = 0;

          const flushParagraph = () => {
            if (!paragraph.length) return;
            out.push(h('p', { key: `p${key++}` }, inline(paragraph.join(' '))));
            paragraph = [];
          };
          const flushList = () => {
            if (!list) return;
            const items = list.items.map((item, index) => h('li', { key: `i${index}` }, inline(item)));
            out.push(h(list.ordered ? 'ol' : 'ul', { key: `l${key++}`, className: 'ia-md-list' }, items));
            list = null;
          };
          const flushCode = () => {
            if (!code) return;
            out.push(h('pre', { key: `c${key++}`, className: 'ia-md-pre' }, h('code', null, code.lines.join('\n'))));
            code = null;
          };
          const flushMath = () => {
            if (!mathBlock) return;
            out.push(mathNode(mathBlock.join('\n'), true, `bm${key++}`));
            mathBlock = null;
          };
          const flushAll = () => {
            flushParagraph();
            flushList();
            flushCode();
            flushMath();
          };

          for (const raw of lines) {
            const line = raw.replace(/\s+$/, '');
            if (code) {
              if (/^\s*```/.test(line)) flushCode();
              else code.lines.push(raw);
              continue;
            }
            if (mathBlock) {
              if (/\$\$\s*$/.test(line)) {
                mathBlock.push(line.replace(/\$\$\s*$/, ''));
                flushMath();
              } else {
                mathBlock.push(raw);
              }
              continue;
            }
            if (/^\s*```/.test(line)) {
              flushAll();
              code = { lines: [] };
              continue;
            }
            const displayMath = /^\s*\$\$(.*)$/.exec(line);
            if (displayMath) {
              flushAll();
              const rest = displayMath[1];
              if (/\$\$\s*$/.test(rest)) {
                out.push(mathNode(rest.replace(/\$\$\s*$/, ''), true, `bm${key++}`));
              } else {
                mathBlock = rest.trim() ? [rest] : [];
              }
              continue;
            }
            if (!line.trim()) {
              flushParagraph();
              flushList();
              continue;
            }
            const heading = /^(#{1,4})\s+(.*)$/.exec(line);
            if (heading) {
              flushAll();
              out.push(h('div', { key: `h${key++}`, className: 'ia-md-heading' }, inline(heading[2])));
              continue;
            }
            const bullet = /^\s*[-*+]\s+(.*)$/.exec(line);
            if (bullet) {
              flushParagraph();
              if (!list || list.ordered) {
                flushList();
                list = { ordered: false, items: [] };
              }
              list.items.push(bullet[1]);
              continue;
            }
            const ordered = /^\s*\d+[.)]\s+(.*)$/.exec(line);
            if (ordered) {
              flushParagraph();
              if (!list || !list.ordered) {
                flushList();
                list = { ordered: true, items: [] };
              }
              list.items.push(ordered[1]);
              continue;
            }
            flushList();
            const quote = /^>\s?(.*)$/.exec(line);
            paragraph.push(quote ? quote[1] : line.trim());
          }
          flushAll();
          return out.length ? out : [h('p', { key: 'empty' }, '')];
        }

        /* ---------------------------------------------------------------- */
        /* Icons                                                             */
        /* ---------------------------------------------------------------- */

        function IconNote(props) {
          return h('svg', {
            viewBox: '0 0 24 24', width: 15, height: 15, fill: 'none', 'aria-hidden': true,
            className: props && props.className,
            style: { flex: '0 0 auto', display: 'block' },
          },
            h('path', { d: 'M5 4.5h14a1.5 1.5 0 0 1 1.5 1.5v9a1.5 1.5 0 0 1-1.5 1.5h-7l-4.5 3v-3H5A1.5 1.5 0 0 1 3.5 15V6A1.5 1.5 0 0 1 5 4.5Z', stroke: 'currentColor', strokeWidth: 1.6, strokeLinejoin: 'round' }),
            h('path', { d: 'M7.5 8.5h9M7.5 12h5.5', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round' }),
          );
        }

        function IconSpark(props) {
          return h('svg', {
            viewBox: '0 0 24 24', width: 14, height: 14, fill: 'none', 'aria-hidden': true,
            className: props && props.className,
            style: { flex: '0 0 auto', display: 'block' },
          },
            h('path', { d: 'M12 3.5 13.7 9l5.6 1.7-5.6 1.7L12 18l-1.7-5.6L4.7 10.7 10.3 9 12 3.5Z', stroke: 'currentColor', strokeWidth: 1.5, strokeLinejoin: 'round' }),
            h('path', { d: 'M18.5 15.5l.7 2.3 2.3.7-2.3.7-.7 2.3-.7-2.3-2.3-.7 2.3-.7.7-2.3Z', fill: 'currentColor', opacity: 0.55 }),
          );
        }

        function IconClose(props) {
          return h('svg', {
            viewBox: '0 0 24 24', width: 14, height: 14, fill: 'none', 'aria-hidden': true,
            style: { display: 'block' },
          },
            h('path', { d: 'M6 6l12 12M18 6 6 18', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round' }),
          );
        }

        function IconChevron(props) {
          return h('svg', {
            viewBox: '0 0 24 24', width: 14, height: 14, fill: 'none', 'aria-hidden': true,
            className: props && props.className,
            style: { display: 'block', transition: 'transform .15s ease' },
          },
            h('path', { d: 'M9 6l6 6-6 6', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }),
          );
        }

        function IconCheck() {
          return h('svg', { viewBox: '0 0 24 24', width: 14, height: 14, fill: 'none', 'aria-hidden': true, style: { display: 'block' } },
            h('path', { d: 'M5 12.5l4.5 4.5L19 7.5', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' }),
          );
        }

        function IconQuote() {
          return h('svg', { viewBox: '0 0 24 24', width: 14, height: 14, fill: 'none', 'aria-hidden': true, style: { display: 'block' } },
            h('path', { d: 'M9.5 7.5H6a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h2.5c0 2.2-1 3.6-3 4.3', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }),
            h('path', { d: 'M19.5 7.5H16a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h2.5c0 2.2-1 3.6-3 4.3', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }),
          );
        }

        function IconImage() {
          return h('svg', { viewBox: '0 0 24 24', width: 14, height: 14, fill: 'none', 'aria-hidden': true, style: { display: 'block' } },
            h('rect', { x: 3.5, y: 4.5, width: 17, height: 15, rx: 2.5, stroke: 'currentColor', strokeWidth: 1.6 }),
            h('circle', { cx: 9, cy: 9.5, r: 1.6, fill: 'currentColor' }),
            h('path', { d: 'M4.5 17.5 10 12l4 4 2.5-2.5 3 3', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' }),
          );
        }

        /* ---------------------------------------------------------------- */
        /* Components                                                        */
        /* ---------------------------------------------------------------- */

        function IconCrop() {
          return h('svg', { viewBox: '0 0 24 24', width: 14, height: 14, fill: 'none', 'aria-hidden': true, style: { display: 'block' } },
            h('path', { d: 'M7 3v4M3 7h4M17 3v4M21 7h-4M7 21v-4M3 17h4M17 21v-4M21 17h-4', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round' }),
            h('rect', { x: 7, y: 7, width: 10, height: 10, rx: 1.5, stroke: 'currentColor', strokeWidth: 1.5, strokeDasharray: '2.5 2.5' }),
          );
        }

        /* ---------------------------------------------------------------- */
        /* Screenshot crop overlay                                           */
        /* ---------------------------------------------------------------- */

        function CaptureOverlay() {
          const capture = state.capture;
          const imgRef = React.useRef(null);
          const dragRef = React.useRef(null);
          const [rect, setRect] = React.useState(null);
          const [error, setError] = React.useState(null);

          if (!capture) return null;

          const pointOf = (event) => {
            const image = imgRef.current;
            if (!image) return null;
            const box = image.getBoundingClientRect();
            return {
              x: Math.max(0, Math.min(event.clientX - box.left, box.width)),
              y: Math.max(0, Math.min(event.clientY - box.top, box.height)),
            };
          };

          const onPointerDown = (event) => {
            const point = pointOf(event);
            if (!point) return;
            dragRef.current = point;
            setError(null);
            setRect({ x: point.x, y: point.y, width: 1, height: 1 });
            if (event.currentTarget.setPointerCapture) event.currentTarget.setPointerCapture(event.pointerId);
            event.preventDefault();
          };

          const onPointerMove = (event) => {
            const start = dragRef.current;
            if (!start) return;
            const point = pointOf(event);
            if (!point) return;
            setRect({
              x: Math.min(start.x, point.x),
              y: Math.min(start.y, point.y),
              width: Math.abs(point.x - start.x),
              height: Math.abs(point.y - start.y),
            });
          };

          const onPointerUp = () => {
            dragRef.current = null;
          };

          const apply = () => {
            const image = imgRef.current;
            if (!image || !rect) return;
            if (rect.width < 8 || rect.height < 8) {
              setError(t('capture.tooSmall'));
              return;
            }
            const naturalWidth = image.naturalWidth || image.clientWidth;
            const naturalHeight = image.naturalHeight || image.clientHeight;
            const scaleX = naturalWidth / (image.clientWidth || 1);
            const scaleY = naturalHeight / (image.clientHeight || 1);
            const sx = Math.max(0, rect.x * scaleX);
            const sy = Math.max(0, rect.y * scaleY);
            const sw = Math.max(1, Math.min(naturalWidth - sx, rect.width * scaleX));
            const sh = Math.max(1, Math.min(naturalHeight - sy, rect.height * scaleY));
            const canvas = document.createElement('canvas');
            canvas.width = Math.round(sw);
            canvas.height = Math.round(sh);
            canvas.getContext('2d').drawImage(image, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
            applyCapturedImage(canvas.toDataURL('image/png'));
          };

          return h('div', { className: 'ia-capture', [ATTRIBUTE]: 'capture' },
            h('div', { className: 'ia-capture-box', role: 'dialog', 'aria-label': t('capture.title') },
              h('div', { className: 'ia-capture-head' },
                h('span', { className: 'ia-capture-title' }, t('capture.title')),
                h('button', {
                  type: 'button', className: 'ia-icon-btn', onClick: () => set({ capture: null }),
                  title: t('capture.cancel'), 'aria-label': t('capture.cancel'),
                }, h(IconClose, null)),
              ),
              h('div', {
                className: 'ia-capture-stage',
                onPointerDown,
                onPointerMove,
                onPointerUp,
                onPointerCancel: onPointerUp,
              },
                h('img', { ref: imgRef, src: capture.dataUrl, alt: '', draggable: false }),
                rect
                  ? h('div', {
                    className: 'ia-capture-rect',
                    style: { left: `${rect.x}px`, top: `${rect.y}px`, width: `${rect.width}px`, height: `${rect.height}px` },
                  })
                  : null,
              ),
              h('div', { className: 'ia-capture-foot' },
                error ? h('span', { className: 'ia-capture-error' }, error) : null,
                h('button', { type: 'button', className: 'ia-btn', onClick: () => set({ capture: null }) }, t('capture.cancel')),
                h('button', {
                  type: 'button', className: 'ia-btn',
                  onClick: () => { set({ capture: null }); captureScreen(); },
                }, t('capture.retake')),
                h('button', { type: 'button', className: 'ia-btn ia-btn--primary', onClick: apply }, t('capture.use')),
              ),
            ),
          );
        }

        function AskCard({ ask }) {
          const [question, setQuestion] = React.useState(ask.question || '');
          const inputRef = React.useRef(null);
          const bodyRef = React.useRef(null);
          const fileRef = React.useRef(null);

          React.useEffect(() => {
            if (inputRef.current) inputRef.current.focus();
          }, []);

          React.useEffect(() => {
            const element = bodyRef.current;
            if (element) element.scrollTop = element.scrollHeight;
          }, [ask.answer, ask.phase]);

          const busy = ask.phase === 'streaming';

          const submit = () => {
            if (busy) return;
            startAsk(question.trim());
          };

          const onKeyDown = (event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault();
              submit();
            } else if (event.key === 'Escape') {
              event.preventDefault();
              closeAsk();
            }
          };

          const onPaste = (event) => {
            const items = event.clipboardData && event.clipboardData.items;
            if (!items) return;
            for (const item of items) {
              if (item.type && item.type.indexOf('image/') === 0) {
                const file = item.getAsFile();
                if (file) {
                  event.preventDefault();
                  addAskImage(file);
                  return;
                }
              }
            }
          };

          const canImage = state.hostBuild >= 2;
          const pickImage = () => {
            if (!canImage) {
              showToast(t('image.needsRestart'));
              return;
            }
            if (fileRef.current) fileRef.current.click();
          };

          const head = h('div', { className: 'ia-ask-head' },
            h('span', { className: 'ia-ask-icon' }, h(IconSpark, null)),
            h('span', { className: 'ia-ask-title' }, t(ask.text ? 'ask.title' : 'ask.titleBlank')),
            h('button', {
              type: 'button', className: 'ia-icon-btn', onClick: closeAsk,
              title: t('ask.close'), 'aria-label': t('ask.close'),
            }, h(IconClose, null)),
          );

          const body = h('div', { className: 'ia-ask-body', ref: bodyRef },
            ask.answer ? h('div', { className: 'ia-md' }, renderMarkdown(ask.answer)) : null,
            busy && !ask.answer ? h('div', { className: 'ia-ask-thinking' }, t('ask.thinking')) : null,
            busy && ask.answer ? h('span', { className: 'ia-caret' }) : null,
            ask.phase === 'error' ? h('div', { className: 'ia-ask-error' }, ask.error || t('ask.error')) : null,
          );

          let footer = null;
          if (busy) {
            footer = h('div', { className: 'ia-ask-actions' },
              h('button', { type: 'button', className: 'ia-btn', onClick: stopAsk }, t('ask.stop')),
            );
          } else if (ask.phase === 'error') {
            footer = h('div', { className: 'ia-ask-actions' },
              h('button', { type: 'button', className: 'ia-btn', onClick: closeAsk }, t('ask.cancel')),
              h('button', { type: 'button', className: 'ia-btn ia-btn--primary', onClick: () => startAsk(ask.question || question.trim()) }, t('ask.retry')),
            );
          } else if (ask.phase === 'saved') {
            footer = h('div', { className: 'ia-ask-actions ia-ask-actions--saved' },
              h('button', {
                type: 'button', className: 'ia-link', onClick: () => { togglePanel(true); closeAsk(); },
              }, t('ask.openNotes')),
              h('button', { type: 'button', className: 'ia-btn', onClick: closeAsk }, t('ask.close')),
            );
          } else {
            const docText = String(ask.doc || '').trim();
            footer = h('div', { className: 'ia-ask-compose' },
              h('div', { className: 'ia-ask-doc' },
                h('span', { className: 'ia-ask-doc-label' }, t('doc.label')),
                h('div', { className: 'ia-ask-doc-field' },
                  h('input', {
                    className: 'ia-ask-doc-input',
                    value: ask.doc || '',
                    title: docText,
                    placeholder: t('doc.placeholder'),
                    onChange: (event) => {
                      if (state.ask) set({ ask: Object.assign({}, state.ask, { doc: event.target.value, docInherited: false }) });
                    },
                    onKeyDown: (event) => {
                      if (event.key === 'Enter') event.preventDefault();
                    },
                  }),
                  docText
                    ? h('button', {
                      type: 'button',
                      className: 'ia-ask-doc-clear',
                      title: t('doc.clear'),
                      'aria-label': t('doc.clear'),
                      onClick: () => {
                        if (state.ask) set({ ask: Object.assign({}, state.ask, { doc: '', docInherited: false }) });
                      },
                    }, h(IconClose, null))
                    : null,
                ),
              ),
              docText
                ? h('div', { className: 'ia-ask-doc-state', title: docText },
                  h('span', { className: 'ia-ask-doc-tick' }, h(IconCheck, null)),
                  h('span', { className: 'ia-ask-doc-state-text' },
                    (ask.docInherited ? t('doc.inherited') : t('doc.attached')) + docText),
                )
                : null,
              h('textarea', {
                ref: inputRef,
                className: 'ia-ask-input',
                rows: 2,
                value: question,
                placeholder: ask.text ? t('ask.placeholder') : t('ask.placeholderImage'),
                onChange: (event) => setQuestion(event.target.value),
                onKeyDown,
                onPaste,
              }),
              h('div', { className: 'ia-ask-tools' },
                h('button', {
                  type: 'button',
                  className: 'ia-tool-btn',
                  onClick: () => { captureScreen(); },
                  title: t('ask.screenshot'),
                  'aria-label': t('ask.screenshot'),
                },
                  h(IconCrop, null),
                  h('span', null, t('ask.screenshot')),
                ),
                h('button', {
                  type: 'button',
                  className: `ia-tool-btn${canImage ? '' : ' ia-tool-btn--off'}`,
                  onClick: pickImage,
                  title: canImage ? t('ask.imageHint') : t('image.needsRestart'),
                  'aria-label': t('ask.image'),
                },
                  h(IconImage, null),
                  h('span', null, t('ask.image')),
                ),
                h('span', { className: `ia-ask-hint${ask.imageError ? ' ia-ask-hint--error' : ''}` },
                  ask.imageError
                    ? ask.imageError
                    : (ask.imageLoading ? t('ask.imageLoading') : t('ask.imageHint'))),
              ),
              h('div', { className: 'ia-ask-actions' },
                h('button', { type: 'button', className: 'ia-btn', onClick: closeAsk }, t('ask.cancel')),
                h('button', {
                  type: 'button',
                  className: 'ia-btn ia-btn--primary',
                  onClick: submit,
                  disabled: busy || (!ask.text && !ask.image && !question.trim()),
                }, t('ask.submit')),
              ),
              h('input', {
                ref: fileRef,
                type: 'file',
                accept: 'image/*',
                className: 'ia-file-input',
                onChange: (event) => {
                  const file = event.target.files && event.target.files[0];
                  event.target.value = '';
                  if (file) addAskImage(file);
                },
              }),
            );
          }

          return h('div', {
            className: 'ia-ask ia-surface',
            style: ask.position,
            role: 'dialog',
            'aria-label': t('ask.title'),
            [ATTRIBUTE]: 'ask',
          },
            head,
            ask.text ? h('blockquote', { className: 'ia-ask-quote', title: ask.text }, ask.text) : null,
            ask.image
              ? h('div', { className: 'ia-ask-image' },
                h('img', { src: ask.image.thumb || ask.image.dataUrl, alt: '' }),
                h('div', { className: 'ia-ask-image-meta' },
                  h('span', null, `${ask.image.width}×${ask.image.height}`),
                  h('button', { type: 'button', className: 'ia-link', onClick: removeAskImage }, t('ask.imageRemove')),
                ),
              )
              : null,
            ask.phase === 'saved'
              ? h('div', { className: 'ia-ask-done' }, h('span', { className: 'ia-ask-done-icon' }, h(IconCheck, null)), t('ask.saved'))
              : null,
            body,
            footer,
          );
        }

        function NoteCard({ note }) {
          const open = !!state.expanded[note.id];
          const tone = note.tone || 'amber';
          return h('article', {
            className: `ia-note${open ? ' ia-note--open' : ''}`,
            'data-tone': tone,
          },
            h('button', {
              type: 'button',
              className: 'ia-note-head',
              onClick: () => toggleNote(note.id),
              'aria-expanded': open,
            },
              note.thumb ? h('img', { className: 'ia-note-head-thumb', src: note.thumb, alt: '' }) : null,
              h('span', { className: 'ia-note-quote' }, note.text || (note.thumb ? t('note.imageOnly') : '')),
              note.source === 'document'
                ? h('span', { className: 'ia-note-tag' }, note.page ? t('note.pdfPage').replace('{n}', note.page) : t('note.pdf'))
                : null,
              note.doc
                ? h('span', { className: 'ia-note-tag ia-note-tag--doc', title: note.doc }, note.doc)
                : null,
              h('span', { className: `ia-note-chevron${open ? ' ia-note-chevron--open' : ''}` }, h(IconChevron, null)),
            ),
            open
              ? h('div', { className: 'ia-note-body' },
                note.thumb
                  ? h('button', {
                    type: 'button',
                    className: 'ia-note-thumb',
                    title: t('note.openImage'),
                    onClick: () => window.open(note.thumb, '_blank', 'noopener'),
                  }, h('img', { src: note.thumb, alt: '' }))
                  : null,
                note.question ? h('div', { className: 'ia-note-q' }, h('span', { className: 'ia-note-q-label' }, t('note.question')), note.question) : null,
                h('div', { className: 'ia-md' }, renderMarkdown(note.answer)),
                note.interrupted ? h('div', { className: 'ia-note-stopped' }, t('note.interrupted')) : null,
                h('div', { className: 'ia-note-foot' },
                  h('span', { className: 'ia-note-time' }, formatTime(note.createdAt)),
                  h('div', { className: 'ia-tones' },
                    TONES.map((entry) => h('button', {
                      key: entry.id,
                      type: 'button',
                      className: `ia-tone${tone === entry.id ? ' ia-tone--active' : ''}`,
                      style: { background: entry.dot },
                      title: t('note.tone'),
                      'aria-label': t('note.tone'),
                      onClick: () => setNoteTone(note.id, entry.id),
                    })),
                  ),
                  h('div', { className: 'ia-note-actions' },
                    h('button', { type: 'button', className: 'ia-link', onClick: () => copyNote(note) }, state.copiedId === note.id ? t('note.copied') : t('note.copy')),
                    h('button', { type: 'button', className: 'ia-link ia-link--danger', onClick: () => deleteNote(note.id) }, t('note.delete')),
                  ),
                ),
              )
              : null,
          );
        }

        function panelAnchorStyle() {
          const pos = state.fabPos;
          const size = state.fabSize;
          if (!pos || !size.width) return undefined;
          const panelWidth = 388;
          const right = Math.max(8, Math.min(window.innerWidth - (pos.x + size.width), window.innerWidth - panelWidth - 8));
          const bottom = Math.max(8, window.innerHeight - pos.y + 10);
          return { right: `${right}px`, bottom: `${bottom}px`, left: 'auto', top: 'auto' };
        }

        function NotesPanel() {
          const count = state.notes.length;
          const docs = [];
          let hasUndocumented = false;
          for (const note of state.notes) {
            const doc = String(note.doc || '').trim();
            if (!doc) hasUndocumented = true;
            else if (docs.indexOf(doc) < 0) docs.push(doc);
          }
          const visible = state.docFilter === 'all'
            ? state.notes
            : state.notes.filter((note) => String(note.doc || '').trim() === state.docFilter);
          return h('section', {
            className: 'ia-panel ia-surface',
            style: panelAnchorStyle(),
            role: 'dialog',
            'aria-label': t('panel.title'),
            id: 'ia-notes-panel',
            [ATTRIBUTE]: 'panel',
          },
            h('header', {
              className: 'ia-panel-head',
            },
              h('span', { className: 'ia-panel-icon' }, h(IconNote, null)),
              h('div', { className: 'ia-panel-titles' },
                h('div', { className: 'ia-panel-title' }, t('panel.title')),
                h('div', { className: 'ia-panel-hint' }, t('panel.hint')),
              ),
              count > 0 ? h('span', { className: 'ia-panel-count' }, t('panel.count').replace('{n}', String(count))) : null,
              h('button', {
                type: 'button', className: 'ia-icon-btn', onClick: () => togglePanel(false),
                title: t('panel.close'), 'aria-label': t('panel.close'),
              }, h(IconClose, null)),
            ),
            count > 0 && (docs.length > 0 || hasUndocumented)
              ? h('div', { className: 'ia-panel-filter' },
                h('select', {
                  className: 'ia-select',
                  value: state.docFilter,
                  onChange: (event) => set({ docFilter: event.target.value }),
                },
                  h('option', { value: 'all' }, t('panel.filter.all')),
                  docs.map((doc) => h('option', { key: doc, value: doc }, doc)),
                  hasUndocumented ? h('option', { value: '' }, t('panel.filter.none')) : null,
                ))
              : null,
            h('div', { className: 'ia-panel-list' },
              visible.length === 0
                ? h('div', { className: 'ia-panel-empty' }, count === 0 ? t('panel.empty') : t('panel.emptyFilter'))
                : visible.map((note) => h(NoteCard, { key: note.id, note })),
            ),
            count > 0
              ? h('footer', { className: 'ia-panel-foot' },
                h('button', {
                  type: 'button',
                  className: `ia-link${state.confirmingClear ? ' ia-link--danger' : ''}`,
                  onClick: clearNotes,
                }, state.confirmingClear ? t('panel.clearConfirm') : t('panel.clear')),
              )
              : null,
          );
        }

        function Overlay() {
          useStore();
          const fabRef = React.useRef(null);

          React.useEffect(() => {
            let timer = 0;
            const schedule = () => {
              window.clearTimeout(timer);
              timer = window.setTimeout(evaluateSelection, 170);
            };
            const onPointerDown = (event) => {
              const target = event.target;
              if (target && target.nodeType === 1 && target.closest && target.closest(`[${ATTRIBUTE}]`)) return;
              hideTip();
            };
            const onScroll = () => hideTip();
            const onResize = () => {
              hideTip();
              if (!state.fabPos || !state.fabSize.width) return;
              set({ fabPos: clampFab(state.fabPos.x, state.fabPos.y, state.fabSize.width, state.fabSize.height) });
            };
            const onKeyDown = (event) => {
              if (event.key !== 'Escape' || event.defaultPrevented) return;
              if (state.capture) {
                event.preventDefault();
                set({ capture: null });
                return;
              }
              if (state.ask) {
                event.preventDefault();
                closeAsk();
              } else if (state.tip) {
                hideTip();
              } else if (state.panelOpen) {
                event.preventDefault();
                togglePanel(false);
              }
            };

            document.addEventListener('selectionchange', schedule);
            document.addEventListener('pointerdown', onPointerDown, true);
            document.addEventListener('keydown', onKeyDown);
            window.addEventListener('scroll', onScroll, true);
            window.addEventListener('resize', onResize);

            return () => {
              window.clearTimeout(timer);
              document.removeEventListener('selectionchange', schedule);
              document.removeEventListener('pointerdown', onPointerDown, true);
              document.removeEventListener('keydown', onKeyDown);
              window.removeEventListener('scroll', onScroll, true);
              window.removeEventListener('resize', onResize);
            };
          }, []);

          React.useEffect(() => {
            let cancelled = false;
            fetch(HEALTH_ROUTE, { credentials: 'same-origin' })
              .then((response) => (response.ok ? response.json() : null))
              .then((info) => {
                if (!cancelled && info && info.ok) set({ hostBuild: Number(info.build) || 1 });
              })
              .catch(() => {
                // an older Host half without the health route: image input stays hidden
              });
            return () => {
              cancelled = true;
            };
          }, []);

          // Measure the floating buttons once they exist, so a restored position stays on screen
          // and the panel can anchor to the group even before the first drag.
          React.useEffect(() => {
            const element = fabRef.current;
            if (!element) return;
            const rect = element.getBoundingClientRect();
            const size = { width: rect.width, height: rect.height };
            if (state.fabPos) {
              set({ fabSize: size, fabPos: clampFab(state.fabPos.x, state.fabPos.y, size.width, size.height) });
            } else {
              set({ fabSize: size });
            }
          }, [state.sessionId]);

          React.useEffect(() => {
            let unsubscribe = null;
            try {
              unsubscribe = ctx.locale.subscribe(() => set({}));
            } catch {
              unsubscribe = null;
            }
            return () => {
              if (unsubscribe) unsubscribe();
            };
          }, []);

          React.useEffect(() => () => closeAsk(), []);

          if (!state.sessionId) return null;

          return h('div', { className: 'ia-layer', [ATTRIBUTE]: 'layer' },
            h('style', { key: 'style' }, CSS),
            state.tip
              ? h('div', {
                key: 'tip',
                className: 'ia-tip-anchor',
                style: {
                  left: `${state.tip.x}px`,
                  top: `${state.tip.y}px`,
                  transform: state.tip.above ? 'translate(-50%, -100%)' : 'translate(-50%, 0)',
                },
              },
                h('div', { className: 'ia-tip' },
                  h('button', {
                    type: 'button',
                    className: 'ia-tip-btn',
                    onMouseDown: (event) => event.preventDefault(),
                    onClick: () => { if (state.tip) openAsk(state.tip); },
                    title: state.tip.text.slice(0, 160),
                  },
                    h(IconSpark, null),
                    h('span', null, t('tip.ask')),
                  ),
                  h('span', { className: 'ia-tip-sep' }),
                  h('button', {
                    type: 'button',
                    className: 'ia-tip-btn',
                    onMouseDown: (event) => event.preventDefault(),
                    onClick: () => { if (state.tip) quoteToComposer(state.tip); },
                    title: t('tip.quote'),
                  },
                    h(IconQuote, null),
                    h('span', null, t('tip.quote')),
                  ),
                ),
              )
              : null,
            state.ask ? h(AskCard, { key: state.ask.id || 'ask', ask: state.ask }) : null,
            h('div', {
              key: 'fab-group',
              ref: fabRef,
              className: `ia-fab-group${state.fabDragging ? ' ia-fab-group--dragging' : ''}`,
              style: state.fabPos
                ? { left: `${state.fabPos.x}px`, top: `${state.fabPos.y}px`, right: 'auto', bottom: 'auto' }
                : undefined,
              onPointerDown: (event) => startFabDrag(event, fabRef.current),
              onClickCapture: (event) => {
                if (!suppressFabClick) return;
                suppressFabClick = false;
                event.stopPropagation();
                event.preventDefault();
              },
              title: t('fab.drag'),
            },
              h('button', {
                type: 'button',
                className: 'ia-fab ia-fab--icon',
                onMouseDown: (event) => event.preventDefault(),
                onClick: openBlankAsk,
                title: t('fab.imageTitle'),
                'aria-label': t('fab.image'),
              }, h(IconImage, null)),
              h('button', {
                key: 'fab',
                type: 'button',
                className: `ia-fab${state.panelOpen ? ' ia-fab--active' : ''}`,
                onClick: () => togglePanel(),
                'aria-expanded': state.panelOpen,
                'aria-controls': 'ia-notes-panel',
                title: t('fab.title'),
              },
                h(IconNote, null),
                h('span', { className: 'ia-fab-label' }, t('fab')),
                state.notes.length > 0 ? h('span', { className: 'ia-fab-badge' }, String(state.notes.length)) : null,
              ),
            ),
            state.capture ? h(CaptureOverlay, { key: 'capture' }) : null,
            state.panelOpen ? h(NotesPanel, { key: 'panel' }) : null,
            state.toast
              ? h('div', { key: 'toast', className: 'ia-toast', role: 'status' }, state.toast.text)
              : null,
          );
        }

        function SessionBridge(props) {
          const sessionId = props && props.sessionId ? String(props.sessionId) : null;
          const actions = (props && props.inputActions) || null;
          React.useEffect(() => {
            bindSession(sessionId);
            return () => bindSession(null);
          }, [sessionId]);
          React.useEffect(() => {
            set({ inputActions: actions });
          }, [actions]);
          return null;
        }

        ctx.slots.inject('shell.overlay', () => ctx.slots.register({
          name: 'shell.overlay',
          id: 'inline-annotations',
          order: 40,
        }, Overlay));

        ctx.slots.inject('conversation.composer.dock', () => ctx.slots.register({
          name: 'conversation.composer.dock',
          id: 'inline-annotations.session',
          order: 40,
        }, SessionBridge));

        ctx.effect(() => () => {
          if (askController) {
            try {
              askController.abort();
            } catch {
              // already settled
            }
          }
        });

        /* ---------------------------------------------------------------- */
        /* Styles                                                            */
        /* ---------------------------------------------------------------- */

        CSS = `
.ia-layer {
  position: fixed;
  inset: 0;
  z-index: 60;
  pointer-events: none;
  font-family: inherit;
  font-size: 13px;
  line-height: 1.55;
  color: var(--dsw-alias-label-primary);
  -webkit-font-smoothing: antialiased;
}
.ia-layer *, .ia-layer *::before, .ia-layer *::after { box-sizing: border-box; }
.ia-surface {
  background: var(--dsw-alias-bg-overlay);
  border: 1px solid var(--dsw-alias-border-l1);
  border-radius: 14px;
  box-shadow: 0 18px 44px rgba(0, 0, 0, 0.18), 0 2px 8px rgba(0, 0, 0, 0.08);
  pointer-events: auto;
}
.ia-fab-group {
  position: absolute;
  right: 20px;
  bottom: 104px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: grab;
  user-select: none;
  touch-action: none;
}
.ia-fab-group--dragging { cursor: grabbing; }
.ia-fab {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  height: 34px;
  padding: 0 12px 0 10px;
  border-radius: 999px;
  border: 1px solid var(--dsw-alias-border-l1);
  background: var(--dsw-alias-bg-overlay);
  color: var(--dsw-alias-label-primary);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
  cursor: pointer;
  pointer-events: auto;
  font: inherit;
  transition: border-color .15s ease, color .15s ease, transform .15s ease;
}
.ia-fab--icon { width: 34px; padding: 0; justify-content: center; }
.ia-fab:hover { border-color: var(--dsw-alias-border-l2); transform: translateY(-1px); }
.ia-fab:focus-visible { outline: 2px solid var(--dsw-alias-brand-primary); outline-offset: 2px; }
.ia-fab--active, .ia-fab--active:hover { border-color: var(--dsw-alias-brand-primary); color: var(--dsw-alias-brand-primary); }
.ia-fab-label { font-size: 12.5px; font-weight: 500; }
.ia-fab-badge {
  min-width: 17px;
  height: 17px;
  padding: 0 4px;
  border-radius: 999px;
  background: var(--dsw-alias-brand-primary);
  color: #fff;
  font-size: 10.5px;
  font-weight: 600;
  line-height: 17px;
  text-align: center;
}
.ia-tip-anchor { position: absolute; z-index: 3; pointer-events: auto; }
.ia-tip {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  height: 30px;
  padding: 2px;
  border-radius: 10px;
  border: 1px solid var(--dsw-alias-border-l1);
  background: var(--dsw-alias-bg-overlay);
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.16);
}
.ia-tip-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 24px;
  padding: 0 8px;
  border: 0;
  border-radius: 7px;
  background: transparent;
  color: var(--dsw-alias-label-primary);
  font: inherit;
  font-size: 12px;
  white-space: nowrap;
  cursor: pointer;
}
.ia-tip-btn:hover { background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-brand-primary); }
.ia-tip-btn:focus-visible { outline: 2px solid var(--dsw-alias-brand-primary); outline-offset: 1px; }
.ia-tip-sep { width: 1px; height: 15px; margin: 0 1px; background: var(--dsw-alias-border-l1); }
.ia-toast {
  position: absolute;
  right: 160px;
  bottom: 104px;
  height: 30px;
  padding: 0 12px;
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  border: 1px solid var(--dsw-alias-border-l1);
  background: var(--dsw-alias-bg-overlay);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.14);
  color: var(--dsw-alias-label-primary);
  font-size: 12px;
  white-space: nowrap;
  pointer-events: none;
}
.ia-panel {
  position: absolute;
  z-index: 2;
  right: 20px;
  bottom: 152px;
  width: 388px;
  max-width: calc(100vw - 40px);
  max-height: min(560px, calc(100vh - 200px));
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.ia-panel-head {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 12px 10px 10px 14px;
  border-bottom: 1px solid var(--dsw-alias-border-l1);
}
.ia-panel-icon { color: var(--dsw-alias-brand-primary); display: inline-flex; }
.ia-panel-titles { flex: 1; min-width: 0; }
.ia-panel-title { font-size: 13px; font-weight: 600; }
.ia-panel-hint { font-size: 11.5px; color: var(--dsw-alias-label-secondary); margin-top: 1px; }
.ia-panel-count { font-size: 11.5px; color: var(--dsw-alias-label-secondary); white-space: nowrap; }
.ia-icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  padding: 0;
  border: 0;
  border-radius: 7px;
  background: transparent;
  color: var(--dsw-alias-label-secondary);
  cursor: pointer;
}
.ia-icon-btn:hover { background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-label-primary); }
.ia-icon-btn:focus-visible { outline: 2px solid var(--dsw-alias-brand-primary); outline-offset: 1px; }
.ia-panel-list {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: 9px 10px 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.ia-panel-filter { padding: 8px 10px 0; }
.ia-select {
  width: 100%;
  height: 28px;
  padding: 0 8px;
  border-radius: 7px;
  border: 1px solid var(--dsw-alias-border-l1);
  background: var(--dsw-alias-bg-base);
  color: var(--dsw-alias-label-primary);
  font: inherit;
  font-size: 12px;
}
.ia-select:focus { outline: none; border-color: var(--dsw-alias-brand-primary); }
.ia-panel-empty { padding: 16px 12px 20px; color: var(--dsw-alias-label-secondary); text-align: center; font-size: 12.5px; line-height: 1.75; }
.ia-panel-foot { display: flex; justify-content: flex-end; padding: 6px 14px 10px; }
.ia-note {
  --ia-accent: #f59e0b;
  --ia-tint: rgba(245, 158, 11, 0.10);
  border: 1px solid var(--dsw-alias-border-l1);
  border-left: 3px solid var(--ia-accent);
  border-radius: 10px;
  background-color: var(--dsw-alias-bg-layer-1);
  background-image: linear-gradient(var(--ia-tint), var(--ia-tint));
  overflow: hidden;
}
.ia-note[data-tone="blue"] { --ia-accent: #3b82f6; --ia-tint: rgba(59, 130, 246, 0.10); }
.ia-note[data-tone="green"] { --ia-accent: #10b981; --ia-tint: rgba(16, 185, 129, 0.10); }
.ia-note[data-tone="rose"] { --ia-accent: #f43f5e; --ia-tint: rgba(244, 63, 94, 0.10); }
.ia-note[data-tone="violet"] { --ia-accent: #8b5cf6; --ia-tint: rgba(139, 92, 246, 0.10); }
.ia-note[data-tone="slate"] { --ia-accent: #64748b; --ia-tint: rgba(100, 116, 139, 0.12); }
.ia-note-head {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
  padding: 9px 10px;
  border: 0;
  background: none;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
}
.ia-note-head:hover { background: var(--dsw-alias-bg-layer-2); }
.ia-note-head:focus-visible { outline: 2px solid var(--dsw-alias-brand-primary); outline-offset: -2px; }
.ia-note-quote {
  flex: 1;
  min-width: 0;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  font-size: 12.5px;
  color: var(--dsw-alias-label-secondary);
  word-break: break-word;
}
.ia-note--open .ia-note-quote {
  display: block;
  -webkit-line-clamp: unset;
  -webkit-box-orient: initial;
  overflow: visible;
  white-space: pre-wrap;
  color: var(--dsw-alias-label-primary);
}
.ia-note-tag {
  flex: 0 0 auto;
  margin-top: 1px;
  padding: 1px 6px;
  border-radius: 999px;
  background: var(--dsw-alias-bg-layer-2);
  color: var(--dsw-alias-label-secondary);
  font-size: 10.5px;
  white-space: nowrap;
}
.ia-note-tag--doc {
  max-width: 96px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ia-note-chevron { color: var(--dsw-alias-label-secondary); display: inline-flex; margin-top: 2px; }
.ia-note-chevron--open { transform: rotate(90deg); color: var(--dsw-alias-brand-primary); }
.ia-note-body { padding: 2px 12px 10px; }
.ia-note-q {
  margin: 0 0 7px;
  padding: 5px 9px;
  border-left: 2px solid var(--dsw-alias-brand-primary);
  border-radius: 0 6px 6px 0;
  background: var(--dsw-alias-bg-layer-2);
  font-size: 12.5px;
  word-break: break-word;
}
.ia-note-q-label { color: var(--dsw-alias-label-secondary); margin-right: 6px; font-size: 11px; }
.ia-note-foot { display: flex; align-items: center; gap: 10px; margin-top: 9px; }
.ia-note-head-thumb {
  width: 32px;
  height: 32px;
  flex: 0 0 auto;
  border-radius: 6px;
  border: 1px solid var(--dsw-alias-border-l1);
  object-fit: cover;
}
.ia-note-thumb {
  display: block;
  max-width: 100%;
  margin: 2px 0 8px;
  padding: 0;
  border: 1px solid var(--dsw-alias-border-l1);
  border-radius: 8px;
  background: none;
  cursor: zoom-in;
  overflow: hidden;
}
.ia-note-thumb img { display: block; max-width: 100%; max-height: 220px; object-fit: contain; }
.ia-note-actions { display: flex; align-items: center; gap: 10px; }
.ia-tones { display: flex; align-items: center; gap: 6px; margin-left: auto; }
.ia-tone {
  width: 12px;
  height: 12px;
  padding: 0;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.15);
  cursor: pointer;
}
.ia-tone--active { box-shadow: 0 0 0 2px var(--dsw-alias-bg-overlay), 0 0 0 3px var(--dsw-alias-label-secondary); }
.ia-note-time { font-size: 11px; color: var(--dsw-alias-label-secondary); }
.ia-note-stopped { font-size: 11px; color: var(--dsw-alias-state-warn-primary); }
.ia-link {
  border: 0;
  background: none;
  padding: 0;
  color: var(--dsw-alias-label-secondary);
  font: inherit;
  font-size: 11.5px;
  cursor: pointer;
}
.ia-link:hover { color: var(--dsw-alias-brand-primary); }
.ia-link:focus-visible { outline: 2px solid var(--dsw-alias-brand-primary); outline-offset: 2px; border-radius: 3px; }
.ia-link--danger { color: var(--dsw-alias-state-error-primary); }
.ia-link--danger:hover { color: var(--dsw-alias-state-error-primary); opacity: .8; }
.ia-ask {
  position: absolute;
  z-index: 4;
  width: 380px;
  max-width: calc(100vw - 24px);
  max-height: min(58vh, 520px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.ia-ask-head { display: flex; align-items: center; gap: 8px; padding: 10px 8px 8px 13px; }
.ia-ask-icon { color: var(--dsw-alias-brand-primary); display: inline-flex; }
.ia-ask-title { flex: 1; font-size: 12.5px; font-weight: 600; }
.ia-ask-quote {
  margin: 0 13px 8px;
  padding: 7px 9px;
  border-left: 2px solid var(--dsw-alias-brand-primary);
  border-radius: 0 6px 6px 0;
  background: var(--dsw-alias-bg-layer-2);
  color: var(--dsw-alias-label-secondary);
  font-size: 12px;
  max-height: 72px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  word-break: break-word;
}
.ia-ask-body { flex: 1 1 auto; padding: 0 13px; overflow-y: auto; min-height: 0; }
.ia-ask > *:not(.ia-ask-body) { flex: 0 0 auto; }
.ia-ask-image { display: flex; align-items: center; gap: 9px; margin: 2px 13px 8px; }
.ia-ask-image img {
  width: 58px;
  height: 58px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid var(--dsw-alias-border-l1);
}
.ia-ask-image-meta { display: flex; flex-direction: column; gap: 2px; font-size: 11.5px; color: var(--dsw-alias-label-secondary); }
.ia-ask-tools { display: flex; align-items: center; gap: 8px; margin-top: 7px; min-width: 0; }
.ia-tool-btn {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  height: 26px;
  padding: 0 9px;
  flex: 0 0 auto;
  border: 1px solid var(--dsw-alias-border-l1);
  border-radius: 7px;
  background: transparent;
  color: var(--dsw-alias-label-secondary);
  font: inherit;
  font-size: 11.5px;
  cursor: pointer;
}
.ia-tool-btn:hover { color: var(--dsw-alias-brand-primary); border-color: var(--dsw-alias-brand-primary); }
.ia-tool-btn--off { opacity: 0.55; }
.ia-ask-hint {
  flex: 1;
  min-width: 0;
  font-size: 11px;
  color: var(--dsw-alias-label-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.ia-ask-hint--error { color: var(--dsw-alias-state-error-primary); }
.ia-file-input { display: none; }
.ia-ask-doc { display: flex; align-items: center; gap: 7px; margin-bottom: 7px; }
.ia-ask-doc-label { flex: 0 0 auto; font-size: 11px; color: var(--dsw-alias-label-secondary); }
.ia-ask-doc-field { position: relative; flex: 1; min-width: 0; display: flex; }
.ia-ask-doc-input {
  flex: 1;
  width: 100%;
  min-width: 0;
  height: 26px;
  padding: 0 8px;
  border-radius: 7px;
  border: 1px solid var(--dsw-alias-border-l1);
  background: var(--dsw-alias-bg-base);
  color: var(--dsw-alias-label-primary);
  font: inherit;
  font-size: 11.5px;
}
.ia-ask-doc-input:focus { outline: none; border-color: var(--dsw-alias-brand-primary); }
.ia-ask-doc-input::placeholder { color: var(--dsw-alias-label-secondary); }
.ia-ask-doc-clear {
  position: absolute;
  right: 3px;
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 19px;
  height: 19px;
  padding: 0;
  border: 0;
  border-radius: 5px;
  background: transparent;
  color: var(--dsw-alias-label-secondary);
  cursor: pointer;
}
.ia-ask-doc-clear:hover { background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-label-primary); }
.ia-ask-doc-field .ia-ask-doc-input { padding-right: 24px; }
.ia-ask-doc-state {
  display: flex;
  align-items: flex-start;
  gap: 5px;
  margin: -3px 0 8px;
  font-size: 11px;
  line-height: 1.5;
  color: var(--dsw-alias-label-secondary);
}
.ia-ask-doc-tick { display: inline-flex; margin-top: 2px; color: var(--dsw-alias-state-success-primary); }
.ia-ask-doc-state-text {
  min-width: 0;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  word-break: break-all;
}
.ia-capture {
  position: absolute;
  inset: 0;
  z-index: 8;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.45);
  pointer-events: auto;
}
.ia-capture-box {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 10px;
  border: 1px solid var(--dsw-alias-border-l1);
  border-radius: 14px;
  background: var(--dsw-alias-bg-overlay);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
  max-width: 92vw;
}
.ia-capture-head { display: flex; align-items: center; gap: 8px; }
.ia-capture-title { flex: 1; font-size: 12.5px; font-weight: 600; }
.ia-capture-stage {
  position: relative;
  line-height: 0;
  cursor: crosshair;
  touch-action: none;
  user-select: none;
  overflow: hidden;
  border-radius: 8px;
}
.ia-capture-stage img { display: block; max-width: 86vw; max-height: 68vh; user-select: none; }
.ia-capture-rect {
  position: absolute;
  border: 1px solid var(--dsw-alias-brand-primary);
  background: rgba(77, 107, 254, 0.18);
  box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.35);
  pointer-events: none;
}
.ia-capture-foot { display: flex; align-items: center; gap: 8px; justify-content: flex-end; }
.ia-capture-error { margin-right: auto; color: var(--dsw-alias-state-error-primary); font-size: 11.5px; }
.ia-ask-thinking { color: var(--dsw-alias-label-secondary); font-size: 12.5px; padding: 4px 0 10px; }
.ia-ask-error { margin: 4px 0 10px; padding: 7px 9px; border-radius: 8px; background: var(--dsw-alias-bg-layer-2); color: var(--dsw-alias-state-error-primary); font-size: 12px; word-break: break-word; }
.ia-caret { display: inline-block; width: 7px; height: 13px; margin-left: 1px; vertical-align: text-bottom; background: var(--dsw-alias-brand-primary); animation: ia-blink 1s steps(2, start) infinite; }
@keyframes ia-blink { 50% { opacity: 0; } }
.ia-ask-done { display: flex; align-items: center; gap: 6px; margin: 2px 13px 6px; color: var(--dsw-alias-state-success-primary); font-size: 12px; }
.ia-ask-done-icon { display: inline-flex; }
.ia-ask-compose { padding: 8px 13px 11px; border-top: 1px solid var(--dsw-alias-border-l1); margin-top: 6px; }
.ia-ask-input {
  width: 100%;
  min-height: 52px;
  max-height: 120px;
  resize: vertical;
  padding: 7px 9px;
  border-radius: 8px;
  border: 1px solid var(--dsw-alias-border-l1);
  background: var(--dsw-alias-bg-base);
  color: var(--dsw-alias-label-primary);
  font: inherit;
  font-size: 12.5px;
  line-height: 1.55;
}
.ia-ask-input:focus { outline: none; border-color: var(--dsw-alias-brand-primary); }
.ia-ask-input::placeholder { color: var(--dsw-alias-label-secondary); }
.ia-ask-actions { display: flex; justify-content: flex-end; align-items: center; gap: 8px; padding: 8px 13px 11px; }
.ia-ask-actions--saved { border-top: 1px solid var(--dsw-alias-border-l1); }
.ia-btn {
  height: 28px;
  padding: 0 12px;
  border-radius: 7px;
  border: 1px solid var(--dsw-alias-border-l1);
  background: var(--dsw-alias-bg-layer-1);
  color: var(--dsw-alias-label-primary);
  font: inherit;
  font-size: 12px;
  cursor: pointer;
}
.ia-btn:hover { border-color: var(--dsw-alias-border-l2); }
.ia-btn:focus-visible { outline: 2px solid var(--dsw-alias-brand-primary); outline-offset: 2px; }
.ia-btn--primary { background: var(--dsw-alias-brand-primary); border-color: var(--dsw-alias-brand-primary); color: #fff; }
.ia-btn--primary:hover { opacity: .9; }
.ia-btn:disabled { opacity: .45; cursor: not-allowed; }
.ia-btn:disabled:hover { border-color: var(--dsw-alias-border-l1); }
.ia-md { font-size: 12.8px; line-height: 1.68; padding: 2px 0 4px; }
.ia-md p { margin: 0 0 6px; }
.ia-md p:last-child { margin-bottom: 0; }
.ia-md .katex { font-size: 1.03em; }
.ia-md .katex-display { margin: 0; }
.ia-math--block { margin: 7px 0; padding: 2px 0; overflow-x: auto; overflow-y: hidden; }
.ia-math-raw {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 11.6px;
  padding: 1px 4px;
  border-radius: 4px;
  background: var(--dsw-alias-bg-layer-2);
  word-break: break-all;
}
.ia-md-list { margin: 0 0 6px; padding-left: 18px; }
.ia-md-list li { margin: 2px 0; }
.ia-md-heading { font-weight: 600; margin: 7px 0 4px; }
.ia-md-code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 11.6px;
  padding: 1px 4px;
  border-radius: 4px;
  background: var(--dsw-alias-bg-layer-2);
  word-break: break-word;
}
.ia-md-pre {
  margin: 0 0 8px;
  padding: 8px 10px;
  border-radius: 8px;
  background: var(--dsw-alias-bg-layer-2);
  overflow: auto;
  font-size: 11.6px;
}
.ia-md-pre code { font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
@media (max-width: 720px) {
  .ia-fab-group { right: 12px; bottom: 92px; }
  .ia-fab-label { display: none; }
  .ia-panel { right: 12px; bottom: 140px; width: calc(100vw - 24px); max-height: calc(100vh - 180px); }
}
`;
      },
    };
  },
});
