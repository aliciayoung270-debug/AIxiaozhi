# AI 小织

小织产品的交互原型、共享页面资源、预警字段接口演示，以及需求、研究和历史备份资料。

## 本地预览

在项目根目录运行：

```bash
python3 -m http.server 3456 --bind 127.0.0.1
```

浏览器打开 <http://127.0.0.1:3456/>。页面主要使用 HTML、CSS 和 JavaScript，无需安装前端依赖。对话、定时任务等交互包含本地模拟逻辑，部分状态存储在当前浏览器的 localStorage 中。

## 目录与入口

| 路径 | 内容 |
| --- | --- |
| `index.html` | 首页与对话 |
| `skills.html` | 技能库 |
| `points-admin.html`、`profile.html` | 设置与个人使用情况 |
| `shared.css`、`shared.js`、`sidebar.js` | 共享样式、交互与导航 |
| `alert-operations-center/运营中心.html` | 运营中心 |
| `alert-operations-center/backend/` | 预警字段目录、接口契约与 Node.js 演示服务 |
| `requirements/scheduled-tasks/` | 定时任务原型与说明 |
| `requirements/conversation-demos/` | 对话演示场景、报告与说明 |
| `research/` | 场景研究、会话记录与研究报告 |
| `alert-operations-center/backups/` | 历史原型、需求及变更验证备份 |

## 预警字段接口

运行 `node alert-operations-center/backend/server.mjs` 启动演示接口，默认地址为 <http://127.0.0.1:8787>，健康检查为 `/api/health`。详见 [接口说明](alert-operations-center/backend/README.md)。

当前后端服务的页面入口仍引用缺失的 `alert-operations-center/prototype.html`；现有运营中心入口为上表所列中文文件。部分历史文档和演示链接也引用当前目录中未包含的报告或外部 Excel 源文件。本次托管保留现有项目内容，未补造这些依赖。

## 开发约定

修改产品页面或共享组件前，先阅读 [AGENTS.md](AGENTS.md) 与 [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)。所有产品页面统一复用根目录 `shared.css` 和 `sidebar.js`；修改共享资源或导航后，应验证跨页面切换与已有交互。

本仓库包含项目资料与历史记录。系统缓存、编辑器本地状态、依赖目录和凭据文件由 `.gitignore` 排除。已启用 GitHub Pages，从 `main` 分支根目录发布静态页面（`.nojekyll` 保留原始 HTML/CSS/JavaScript）。

- 项目首页：https://aliciayoung270-debug.github.io/AIxiaozhi/
- 定时任务原型：https://aliciayoung270-debug.github.io/AIxiaozhi/requirements/scheduled-tasks/prototype.html
