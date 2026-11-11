# Codex 新建会话发送按钮禁用排障记录

记录日期：2026-10-10（北京时间）

## 现象与已尝试操作

- 新建会话输入“你好”后，发送按钮保持禁用。
- 多个项目均出现相同问题。
- 切换到其他可选模型后仍然禁用。
- 悬停发送按钮没有提示文字。
- 应用重启后问题仍然存在；重启已由新进程日志确认。
- 同一应用、同一网络下，已有会话可以继续发送和接收消息。
- 是否完成退出账号再登录：尚未确认。

## 环境

- macOS。
- 应用名称：ChatGPT（包含 Codex）。
- 应用版本：26.1007.21159，构建号 20052。
- 随应用提供的 Codex CLI：0.162.0-alpha.17.2。

## 最新启动日志中的证据

最新应用启动时间为北京时间 2026-10-10 17:03:20。

- 本地 app-server 初始化成功：`initialize_handshake_result outcome=success`。
- 已有会话恢复成功：`thread/resume errorCode=null`。
- 已有会话发送成功：`turn/start errorCode=null`。
- 该启动进程日志中未观察到 `thread/start` 请求；这与新建会话在发送前被阻塞的现象相符。
- 账号检查 `/accounts/check/{version}`、`/accounts/optimized/check`，用户设置 `/settings/user`，订阅信息 `/subscriptions` 等接口持续记录 `cloudflare_challenge`、HTTP 403。
- 另有远程服务 WebSocket 建立失败日志。

## 当前判断与限制

在正常本机权限下运行官方 `codex doctor --summary --no-color --ascii`，结果为 20 项正常、0 项失败、3 项警告：安装一致、配置已加载、登录信息已配置、本地 app-server 初始化成功、模型服务 HTTP 地址可访问；Responses WebSocket 超时，工具指出 HTTPS 回退仍可能可用。另有会话记录索引缺失和非交互终端显示模式警告，尚无证据将它们关联到本问题。诊断通过不等同于桌面首页全部账号/权限接口成功。

- 现象跨项目、跨模型，并在重启后持续，优先排查应用全局的新建会话初始化、账号信息加载和界面禁用状态。
- 不能仅因已有会话正常就排除所有其他服务请求失败；也不能仅凭上述 403 日志就认定它直接触发了发送按钮禁用。
- 尚未获得按钮实时禁用状态与具体前置条件的对应关系。
- 本地执行服务正常启动，未发现需要修改业务项目原型才能解决此问题的证据。

## 建议反馈的核心描述

> 应用版本 26.1007.21159（20052），macOS。所有项目的新建会话输入文本后发送按钮保持禁用，切换其他模型仍无效，悬停无提示，应用完全重启后仍然复现。但已有会话仍能正常通信。重启后本地 app-server 初始化、thread/resume、turn/start 均成功，新建流程没有观察到 thread/start；账号检查、用户设置和订阅信息接口反复出现 cloudflare_challenge / HTTP 403。请检查首页 composer 的全局 submitDisabled 状态，以及新建会话前置账号/权限查询错误时是否无法恢复或缺少提示。

本记录仅包含排障摘要，不包含账号凭证、原始会话内容或完整日志。尚未向外部服务提交。

## 临时入口

当前会话的工具终端能找到 `codex`，但用户自己的 zsh 返回 `zsh: command not found: codex`，说明不能假定工具终端和用户终端使用相同的 PATH。已验证应用内完整路径可以执行并返回版本。可以尝试执行下列命令，从终端启动新会话；尚未测试实际模型对话是否成功。

```bash
"/Applications/ChatGPT.app/Contents/Resources/codex-cli/CodexCLI.app/Contents/MacOS/codex" -C "/Users/alicia/AI xiaozhi/alert-operations-center"
```
