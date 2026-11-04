# 划选批注便签（inline-annotations）

在对话或右侧文档预览里划选一段文字，就地提问或引用进输入框。
「问 AI」的回答显示在浮动卡片里，并自动收进当前对话的折叠便签，**不写入会话日志**：
没有新回合、没有新消息，主对话历史不会变长。

## 使用

1. 划选文字（≤ 1500 字），选区旁浮出「问 AI」与「引用」两个按钮：
   - **问 AI**：弹出浮动卡片，可留空直接解释，也可输入自己的问题，回车提交。
   - **引用**：把选区以 `> 引用原文` 的形式追加进输入框（光标位置），类似 ChatGPT 的引用；
     来自 PDF 时会自动带上「[PDF 第 N 页]」来源标注。
2. 「问 AI」的回答流式显示；结束后自动保存为便签，右下角「便签」按钮上出现计数。
3. 点「便签」展开列表，点卡片头部折叠/展开，可复制或删除；来自 PDF 的便签带页码标签。

便签按会话分别保存在浏览器 `localStorage`（键 `dsh.inline-annotations.v1`），
重开同一会话仍在；清站点数据会一起清除。

## 读论文（PDF / Word）

右侧预览的 PDF 走 PDF.js，文字是可选中的真实文本层；Word（`.doc`/`.docx`）、PowerPoint
先由 Host 转成 PDF 再进同一个渲染器，所以两类文档都能划选。

在文档里划选时，插件会取**当前页的整页文字**作为提问上下文，而不是只有那一行；
提示词里也会标明「这不是对话记录」。因此问术语、问公式、问实验设置都能结合上下文回答。

## 结构

| 文件 | 作用 |
|---|---|
| `index.js` | Host 半：`POST /dsh-inline-annotations/ask`，校验同源/浏览器凭据，读会话最近的对话做上下文，直接调 `ctx.llm.stream` 并以 SSE 返回 |
| `client.js` | 浏览器半：`shell.overlay`（浮层 UI）与 `conversation.composer.dock`（会话身份 + 输入框 `inputActions` 桥）两个 slot |
| `cordis.patch.yml` | 安装时插入的插件行 |
| `locale/*.json` | 插件管理页显示的标题与说明 |

「引用」调用 Composer 自己的 `inputActions.captureInsertion()` / `insertText()`，
不直接改输入框 DOM，所以草稿、撤销历史和引用语法都保持宿主自己的实现。

## 换电脑 / 分发

插件就是一个普通目录，自带全部运行文件，没有第三方依赖、没有构建步骤，
换机器只需要「拷目录 + 装一次」。

### 打包

```powershell
Compress-Archive -Path 'D:\量化研究\dsh-plugins\inline-annotations' `
                 -DestinationPath 'D:\量化研究\dsh-plugins\dist\dsh-inline-annotations-1.0.0.zip'
```

### 在新电脑安装

1. 解压到**稳定的本地路径**（别放临时目录或会被同步工具挪动的目录），
   例如 `D:\dsh-plugins\inline-annotations`；解压后该目录里应直接是 `package.json`、`index.js`、`client.js`。
2. 启动 DSH，在任意会话里让助手安装一次（需要本机目录绝对路径）：

   > 用 plugin_manager 的 install_bundle 安装本机目录 `D:\dsh-plugins\inline-annotations`

3. 打开 设置 → 插件，确认「划选批注便签」处于启用状态。
4. 刷新页面，右下角出现「便签」按钮即完成。

### 兼容性

- 依赖 DSH 的 slot、Composer `inputActions`、`ctx.llm` 三处接口，建议与导出时的 DSH 版本接近
  （本机为 `0.2.1-rc.5`）。版本差异大时，先装上看 slot 是否注册成功再判断。
- **便签内容不随目录迁移**：它存在浏览器 `localStorage` 的 `dsh.inline-annotations.v1` 键里。
  换电脑要带走便签，需在旧机器 DevTools → Application → Local Storage 复制该键的值，
  在新机器同位置粘贴后刷新（想省事可以让插件加「导出 / 导入」按钮）。

### 版本管理

改动插件后，把 `package.json` 的 `version` 加一，重新打包并在文件名里带上版本号，
新旧两版在插件列表里就不会混淆。

### 用 Git 管理（可选）

```powershell
cd D:\量化研究\dsh-plugins
git init
git add inline-annotations
git commit -m "feat: inline annotation notes plugin"
git remote add origin <你的仓库地址>
git push -u origin main
```

新电脑 `git clone` 后，按上面第 2 步安装克隆下来的 `inline-annotations` 目录即可；
之后改插件也自带版本历史和跨机同步。

## 停用 / 卸载

设置 → 插件里停用「划选批注便签」，或让 DSH 执行：

```
plugin_manager set_plugin  @local/dsh-inline-annotations  false
plugin_manager remove_bundle  @local/dsh-inline-annotations
```

改完 `index.js`（Host 半）需要重启 DSH 才加载新模块；`client.js` 的改动由客户端热更新跟进，
若不生效刷新一次页面即可。
