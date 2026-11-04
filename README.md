# dsh-plugins

个人 [DSH（DeepSeek Harness）](https://github.com/deepseek-ai/deepseek-harness) 插件集合。
每个子目录是一个独立插件，无第三方运行时依赖、无构建步骤，克隆后用 `plugin_manager` 装一次即可。

## 插件

| 目录 | 插件 | 作用 |
|---|---|---|
| [`inline-annotations`](inline-annotations/README.md) | 划选批注便签 | 在对话或 PDF/Word 预览里划选文字：**问 AI**（回答收进可折叠便签，不写入对话历史）或 **引用** 到输入框 |

## 安装

在装有 DSH 的机器上克隆本仓库，然后在任意 DSH 会话里让助手执行：

> 用 plugin_manager 的 install_bundle 安装本机目录 `<本仓库绝对路径>/inline-annotations`

装好后打开 **设置 → 插件** 确认已启用，刷新页面生效。
安装使用的是 pnpm link，**装完后不要移动或删除该目录**；确实要挪，就在新位置重新安装一次。

## 兼容性

插件依赖 DSH 的 slot、Composer `inputActions`、`ctx.llm` 等接口，DSH 版本差异较大时请先确认插件能否正常注册。

## 说明

- 本仓库只存放插件源码；`dist/` 下的打包产物不入库。
- 便签数据保存在浏览器 `localStorage`，不随仓库迁移。
