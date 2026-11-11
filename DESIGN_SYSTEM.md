# AI 小织 · 统一设计与开发规范

> 风格基调：温暖有机 · 高端克制 · 去科技感  
> 参考来源：Reflow (reflow.ai)  
> 最后更新：2026-10-23
> 本文件合并原 DESIGN_SYSTEM.md、design.md、DEV_CONSTRAINTS.md，是项目设计与页面开发的唯一规范入口。

---


## 0. Agent 必须遵守的工作规则

- 每次设计、新建、修改页面或共享组件前，必须先阅读本文件，再检查根目录 `shared.css`、`sidebar.js` 和相关现有页面，沿用已有视觉与交互模式。
- 所有小织产品页面必须保持同一风格：温暖有机、高端克制、去科技感。不得自行引入另一套配色、字体、图标、组件库或布局语言；不得以“优化”之名单独重做某个页面的视觉体系。
- 色彩、字号、字重、行高、间距、圆角、阴影和动效参数必须使用共享变量。所有页面引用根目录 `shared.css`，页面样式只负责业务独有布局，不得覆盖共享侧边栏或制造同名组件的不同外观。
- 本文数值是设计目标，不代表 `shared.css` 已全部实现。使用变量前必须确认定义存在；缺少时先在 `shared.css` 的 `:root` 中补充语义明确的共享变量，再引用，不得在页面中写死或使用未定义变量。
- 新组件先查找可复用实现；确需新增时，先确定共享样式和交互，再接入页面。同类按钮、输入框、筛选器、卡片、表格和弹层在不同页面必须一致。
- 所有带主导航的产品页面必须复用根目录 `sidebar.js`，保持页面切换时导航、品牌和布局的连续性，具体要求见第 11 节。
- 修改共享资源后必须回看首页、技能库、运营中心及本次涉及的页面，验证没有视觉或交互回归。交付说明列出实际验证范围；未验证项必须如实说明。
- 用户明确要求调整全局设计时，同步更新本文件、共享资源和受影响页面；页面业务差异不应演变成另一套设计规范。

---

## 1. 色彩系统

### 1.1 基础调色板

```css
:root {
  /* --- 背景层 --- */
  --color-bg-base:      #F0EDE6;   /* 页面底色，暖奶白 */
  --color-bg-surface:   #F7F4EF;   /* 卡片、面板背景 */
  --color-bg-sunken:    #E8E3DA;   /* 内嵌区域、输入框底色 */
  --color-bg-sidebar:   #EDEAE3;   /* 侧边栏背景 */

  /* --- 文字层 --- */
  --color-text-primary:   #2E2B28;   /* 标题、正文主色 */
  --color-text-secondary: #4A4A46;   /* 次级说明文字 */
  --color-text-tertiary:  #7A7872;   /* 弱文字、占位符 */
  --color-text-disabled:  #B0ABA4;   /* 禁用态文字 */
  --color-text-inverse:   #F0EDE6;   /* 深色背景上的文字 */

  /* --- 强调色 (Accent) --- */
  --color-accent:         #B07860;   /* 赭铜，主要强调色 */
  --color-accent-hover:   #9A6752;   /* hover 加深 */
  --color-accent-subtle:  #E8D5CA;   /* 浅色强调背景 */

  /* --- 边框 & 分隔线 --- */
  --color-border-default: #D4CFC8;   /* 默认边框 */
  --color-border-subtle:  #E5E1DB;   /* 轻边框 */
  --color-border-strong:  #B0ABA4;   /* 强边框 */

  /* --- 功能色 --- */
  --color-navy:    #0D1B2E;   /* 深海军蓝，用于深色区块/强调 */
  --color-charcoal:#2E2B28;   /* 深炭色，深色按钮 */

  /* --- 语义色 --- */
  --color-success: #5C7A5F;   /* 暖绿，成功 */
  --color-warning: #B07428;   /* 暖琥珀，警告 */
  --color-error:   #A0443A;   /* 暖红，错误 */
  --color-info:    #3D5A6B;   /* 深石板蓝，信息 */
}
```

### 1.2 色彩使用规则

| 场景 | 使用色值 |
|------|---------|
| 页面背景 | `--color-bg-base` |
| 卡片/面板 | `--color-bg-surface` |
| 侧边栏 | `--color-bg-sidebar` |
| 主要文字 | `--color-text-primary` |
| 主要按钮背景 | `--color-charcoal` |
| 主要按钮文字 | `--color-text-inverse` |
| 强调色/链接 | `--color-accent` |
| 图标默认色 | `--color-text-secondary` |

---

## 2. 字体系统

### 2.1 字体族

```css
:root {
  /* 标题：衬线字体，营造高端感 */
  --font-serif: 'Playfair Display', 'Noto Serif SC', Georgia, serif;

  /* 正文 & UI：无衬线，清晰易读 */
  --font-sans: 'Hanken Grotesk', 'Noto Sans SC', -apple-system, sans-serif;

  /* 代码/数据 */
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
}
```

> 规则：**大标题用衬线**，正文、按钮、标签、导航一律用无衬线。

### 2.2 字号梯度

```css
:root {
  --text-xs:   12px;   /* 辅助说明、角标 */
  --text-sm:   14px;   /* 次级文字、标签 */
  --text-base: 16px;   /* 正文基准 */
  --text-lg:   18px;   /* 次级标题 */
  --text-xl:   20px;   /* 模块标题 */
  --text-2xl:  24px;   /* 页面标题 */
  --text-3xl:  32px;   /* Hero 副标题 */
  --text-4xl:  40px;   /* Hero 主标题 */
  --text-5xl:  52px;   /* 超大展示标题（衬线） */
}
```

### 2.3 字重 & 行高

```css
:root {
  --font-regular: 400;
  --font-medium:  500;
  --font-semibold:600;
  --font-bold:    700;

  --leading-tight:  1.3;   /* 大标题 */
  --leading-normal: 1.5;   /* UI 元素 */
  --leading-relaxed:1.7;   /* 正文段落 */
}
```

---

## 3. 间距系统

基于 **4px 基准网格**：

```css
:root {
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  20px;
  --space-6:  24px;
  --space-8:  32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;
}
```

---

## 4. 圆角系统

```css
:root {
  --radius-sm:   6px;    /* 标签、徽章 */
  --radius-md:   10px;   /* 按钮、输入框 */
  --radius-lg:   16px;   /* 卡片 */
  --radius-xl:   24px;   /* 大卡片、模态框 */
  --radius-full: 9999px; /* 圆形按钮、头像 */
}
```

---

## 5. 阴影系统

克制的阴影，使用暖色调（非冷灰）：

```css
:root {
  --shadow-xs: 0 1px 2px rgba(46, 43, 40, 0.06);
  --shadow-sm: 0 2px 8px rgba(46, 43, 40, 0.08);
  --shadow-md: 0 4px 16px rgba(46, 43, 40, 0.10);
  --shadow-lg: 0 8px 32px rgba(46, 43, 40, 0.12);
  --shadow-xl: 0 16px 48px rgba(46, 43, 40, 0.16);
}
```

---

## 6. 布局规范

```css
:root {
  --sidebar-width: 256px;
  --topbar-height: 56px;
  --content-padding: var(--space-8);   /* 主内容区内边距 32px */
  --content-max-width: 1200px;
}
```

**栅格**：主内容区使用 12 列栅格，列间距 24px。

---

## 7. 组件规范

### 7.1 按钮

| 类型 | 背景 | 文字 | 边框 | 用途 |
|------|------|------|------|------|
| Primary | `--color-charcoal` | `--color-text-inverse` | 无 | 主操作 |
| Secondary | transparent | `--color-text-primary` | `--color-border-default` | 次要操作 |
| Accent | `--color-accent` | `--color-text-inverse` | 无 | 强调操作 |
| Ghost | transparent | `--color-text-secondary` | 无 | 轻量操作 |
| Danger | `--color-error` | `--color-text-inverse` | 无 | 危险操作 |

- 高度：大 `44px` / 默认 `36px` / 小 `28px`
- 圆角：`--radius-md`（10px）
- 过渡：`all 150ms ease`

### 7.2 输入框

- 背景：`--color-bg-sunken`
- 边框：`--color-border-subtle`，focus 时 `--color-border-strong`
- 圆角：`--radius-md`（10px）
- 高度：`44px`
- 内边距：`12px 16px`

### 7.3 卡片

- 背景：`--color-bg-surface`
- 边框：`1px solid var(--color-border-subtle)`
- 圆角：`--radius-lg`（16px）
- 阴影：`--shadow-sm`
- hover：`--shadow-md` + `transform: translateY(-2px)`，过渡 `200ms ease`

### 7.4 侧边栏

- 背景：`--color-bg-sidebar`
- 宽度：`256px`
- 右边框：`1px solid var(--color-border-subtle)`
- 导航项高度：`40px`，圆角 `--radius-md`
- 激活态：背景 `--color-bg-sunken`，文字 `--color-text-primary`

### 7.5 对话气泡

- 用户消息：右对齐，背景 `--color-charcoal`，文字 `--color-text-inverse`
- AI 消息：左对齐，背景 `--color-bg-surface`，边框 `--color-border-subtle`
- 圆角：`--radius-xl`（24px）
- 内边距：`12px 16px`

---

## 8. 动效规范

```css
:root {
  --duration-fast:   100ms;
  --duration-normal: 200ms;
  --duration-slow:   350ms;

  --ease-default:    ease;
  --ease-in-out:     cubic-bezier(0.4, 0, 0.2, 1);
  --ease-spring:     cubic-bezier(0.34, 1.56, 0.64, 1);   /* 弹性，用于出现动画 */
}
```

- hover 状态：`150ms ease`
- 面板展开/收起：`250ms ease-in-out`
- 模态框出现：`300ms ease-spring`
- 页面切换淡入：`200ms ease`

---

## 9. 图标规范

- 使用 **Lucide Icons**（via CDN 或本地 SVG）
- 默认尺寸：`16px`（行内）/ `20px`（按钮内）/ `24px`（导航图标）
- 颜色：继承文字色，使用 `currentColor`
- 线宽：`1.5px`（Lucide 默认）

---

## 10. 筛选项交互规范


### 强制要求

- 筛选项必须使用产品统一设计的自定义触发器和浮层，不得直接使用浏览器或操作系统原生筛选组件。
- 禁止直接展示原生 `<select>`、`<datalist>` 或未经设计的系统下拉菜单。
- 即使筛选浮层内部是单选，也应使用自定义选项列表；原生表单控件只能作为隐藏的语义或状态载体。
- 新增页面必须复用本规范，不得因开发便捷而退回系统组件。

### 通用交互

- 点击筛选触发器打开浮层；再次点击同一触发器关闭。
- 同一时间只允许打开一个筛选浮层。打开新筛选时，自动关闭已打开的筛选。
- 点击浮层外区域或按 `Esc` 关闭浮层，不改变已生效的筛选条件。
- 打开状态使用强调色边框和焦点光晕；已生效但未打开时保留强调色边框。
- 筛选结果变化后立即刷新列表、结果数量和相关汇总信息。
- 不同筛选项之间使用“且”关系；同一多选筛选项中的选项使用“或”关系。

### 搜索框

- 输入内容时即时筛选，不额外设置“搜索”按钮。
- 清空输入后立即恢复对应结果。
- 占位文案必须明确搜索对象，例如“搜索规则名称”。

### 多选筛选

适用于站点／店铺、对象类型、规则类型、级别、状态等。

- 点击选项后立即生效，浮层保持打开，支持连续选择。
- 选项使用统一设计的复选状态，不使用系统默认视觉样式。
- 未选择时，触发器显示筛选项名称。
- 已选择时，触发器显示“筛选项名称 · 数量”，例如“状态 · 2”。
- 全部选项取消后，恢复为未筛选状态。

### 单选筛选

适用于规则分类等互斥条件。

- 选择选项后立即生效并关闭浮层。
- 默认项使用“全部”语义，例如“全部规则分类”。
- 选择具体条件后，触发器直接显示所选名称。
- 单选选项同样使用自定义视觉，不展示系统原生下拉框。

### 复合条件筛选

适用于“对象／统计维度”等需要多个字段共同配置的筛选。

- 使用自定义面板承载输入框、单选项或下拉选项。
- 面板内填写内容时先保留为草稿，不即时影响列表。
- 点击“应用”或在输入框中按 `Enter` 后，统一提交并关闭面板。
- 点击“清空”立即清除该面板全部条件并刷新结果。
- 已生效时，触发器显示“对象条件 · 数量”等摘要，不直接堆叠完整筛选值。
- 必须说明匹配规则，例如对象值支持模糊匹配、维度值按完整值精确匹配。

### 重置

- “重置”一次清除搜索词和全部筛选条件，并恢复页面定义的默认筛选状态。
- 预警事件页重置后，状态恢复为“待确认＋已确认”。
- 重置后同步关闭所有筛选浮层、取消汇总卡片联动状态，并刷新列表及结果数量。

### 样式基准

- 筛选触发器高度：34px。
- 圆角：9px。
- 浮层与触发器间距：5px。
- 浮层圆角：11–12px。
- 浮层必须具有边框和阴影，并覆盖列表内容显示。
- 长选项列表设置最大高度并允许内部滚动。
- 筛选区域允许换行，但同一触发器内部文案不得压缩换行。

### 验收检查

- 页面中不存在可见的原生系统下拉控件。
- 多选、单选、复合筛选的生效时机符合上述规范。
- 触发器能够正确反馈未选、已选、打开三种状态。
- 点击外部、切换筛选项、按 `Esc` 和重置操作均能正确关闭浮层。
- 筛选结果、结果数量及汇总信息始终同步。

### 筛选组件变量

34px 触发器高度、9px 触发器圆角、5px 浮层间距及 11–12px 浮层圆角是组件专用规格。实现时统一在 `shared.css` 中定义 `--filter-trigger-height`、`--filter-trigger-radius`、`--filter-popover-gap`、`--filter-popover-radius` 等变量（浮层圆角统一取 12px），禁止各页面各自写死。

“预警事件页重置后恢复待确认＋已确认”是该页面专属默认值，其他页面使用自己的业务默认状态，不能照搬。

---

## 11. 共享侧边栏与页面切换

### 11.1 唯一实现入口

- 侧边栏结构、导航顺序、文案、图标、品牌区、最近对话和用户区统一由根目录 `sidebar.js` 生成；视觉统一由根目录 `shared.css` 管理。
- 页面只保留 `<aside class="sidebar" data-shared-sidebar data-page="..." aria-label="主导航"></aside>` 挂载节点，不复制侧边栏 HTML，不另建页面专用侧边栏，不用页面样式覆盖其宽度、颜色或位置。
- `shared.js` 当前负责对话页行为，不是侧边栏注入入口。其他公共组件应复用项目已有实现，不得假设 `shared.js` 自动生成 topbar。
- 新增或调整导航统一修改 `sidebar.js` 的路由和当前页映射，不逐页注册导航。新增页面标识时同步扩展映射；现有标识是 `chat`、`skills`、`operations`、`schedules`，不得假设其他标识已支持。

### 11.2 导航与当前页

| 导航项 | 目标页面 |
|------|------|
| 新建对话 | `index.html` |
| 运营中心 | `alert-operations-center/运营中心.html` |
| 策略中心 | `index.html`（尚未独立时） |
| 技能库 | `skills.html` |
| 定时任务 | `requirements/scheduled-tasks/prototype.html` |
| 连接器 | `index.html`（尚未独立时） |
| 设置 | `points-admin.html` |
| 用户信息 | `profile.html` |

- 导航项必须具有真实 `href`；禁止空链接、`javascript:` 链接或只切换样式不跳转。未开发入口按上表回到首页。
- 当前页面对应项由共享脚本统一添加 `active` 和 `aria-current="page"`，同一时刻只有一个当前页入口。新增设置等页面接入时，须同时补齐其映射。
- 路由基于 `sidebar.js` 自身位置解析，支持根目录、子目录、直接打开本地 HTML 和 HTTP 预览。页面引用共享资源时使用正确的相对路径。

### 11.3 侧边栏收起与展开

- 品牌区右侧提供统一收起按钮；收起后保留 64px 图标栏，顶部同一按钮用于展开。展开宽度仍为 256px。
- 收起时隐藏品牌文字、最近对话及导航文字，保留新建对话、主导航、设置与用户入口；图标链接提供可访问名称与悬停提示。
- 状态统一由 `sidebar.js` 管理，保存在 `xiaozhi-sidebar-collapsed`；共享导航链接带 `sidebar=collapsed/expanded`，兼容本地文件跨页存储限制。URL中的显式状态优先。
- 窄屏（≤680px）首次默认收起；展开为覆盖内容的侧栏，不压缩正文。点击遮罩或按 Esc 收起，焦点返回切换按钮。
- 布局、图标与遮罩参数统一定义在 `shared.css`；不得逐页实现另一套收起逻辑。

### 11.4 页面切换连贯性

- 页面间保持相同的侧边栏宽度、位置、背景、导航顺序、用户区及主内容区起点；内容多寡不得挤压侧边栏或造成横向跳动。
- 共享样式在页面头部加载，侧边栏脚本使用 `defer`；为导航区域保留布局空间，避免切换时先显示另一版导航或明显闪跳。
- 同一账号的用户信息、最近对话及积分等共享数据必须读取同一数据源，不得逐页维护相互矛盾的副本。
- 页面存在侧边栏展开状态、侧边栏滚动位置或业务筛选等需保留的状态时，使用明确的共享存储或 URL 参数恢复；不得在导航切换时无故清空。首次进入和显式重置仍使用业务默认值。
- 浏览器后退、前进、刷新和深链接进入后，页面内容、URL 与导航高亮必须一致；支持新标签页打开真实链接。
- 子页面或编辑页应保留所属主导航高亮，并提供明确返回入口；返回列表时按业务需要恢复筛选、分页与滚动位置。

---

## 12. 开发接入约定

- 字体统一通过 `shared.css` 的 Google Fonts 引入 Playfair Display、Hanken Grotesk、Noto Sans SC、Noto Serif SC，避免逐页重复加载。
- 沿用项目已有组件实现；使用 Element Plus 时统一主题为共享强调色，不能泄露默认主题。不得仅为新增页面另行引入组件库。
- 仅本地开发，不推送 GitHub，除非用户明确要求。
- 初始化必须兼容脚本在 DOM 就绪前后加载；涉及侧边栏节点的逻辑必须在共享侧边栏完成挂载后执行，不得依赖偶然的加载时序。
- 外部字体样式表可能影响加载时序，不应依靠字体加载完成来触发页面初始化。

### 新页面标准结构（根目录示例）

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[页面名] · AI 小织</title>
  <link rel="stylesheet" href="shared.css">
  <script src="sidebar.js" defer></script>
  <style>
    /* 仅业务独有布局，设计参数引用共享变量 */
  </style>
</head>
<body>
  <div class="app">
    <!-- 替换成已在 sidebar.js 路由与高亮映射中注册的页面标识 -->
    <aside class="sidebar" data-shared-sidebar data-page="your-page" aria-label="主导航"></aside>
    <main><!-- 页面内容 --></main>
  </div>
  <script>
    function init() {
      // 页面初始化逻辑
    }
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  </script>
</body>
</html>
```

子目录页面须将共享资源路径改为对应的 `../shared.css`、`../sidebar.js` 等正确路径。

---

## 13. Agent 交付前检查清单

- [ ] 已阅读本规范，并对照现有页面确认视觉与交互一致。
- [ ] 引用共享样式，新增设计参数已集中定义，无页面内硬编码设计值或未定义变量。
- [ ] 同类组件外观和操作一致，没有新增另一套主题或系统原生筛选控件。
- [ ] 侧边栏仅保留挂载节点，使用同一 `sidebar.js`，没有复制 HTML 或页面专属覆盖样式。
- [ ] 导航目标真实可访问，当前页高亮与 `aria-current` 正确，子目录路径正确。
- [ ] 已实际走通“首页 → 技能库 → 运营中心 → 首页”及本次新增入口，检查宽度、位置、内容起点和用户信息一致，无明显闪跳。
- [ ] 已检查刷新、直接打开目标页、后退和前进；需保留的状态能够恢复。
- [ ] 搜索、单选、多选、复合筛选的生效时机正确，列表、计数、汇总同步。
- [ ] 外部点击、Esc、切换筛选及重置均按规则关闭浮层。
- [ ] 初始化使用 DOM 就绪保护，共享组件相关逻辑在挂载后执行，无控制台错误。
- [ ] 修改共享资源时已复查受影响页面，交付时说明实际检查结果和未验证项。
