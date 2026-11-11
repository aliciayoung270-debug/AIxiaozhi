/* ─── Greeting ───────────────────────────────────────────── */
function getGreeting() {
  const h = new Date().getHours();
  if (h >= 5  && h < 12) return '早上好';
  if (h >= 12 && h < 18) return '下午好';
  return '晚上好';
}

function initGreeting() {
  const eyebrow = document.getElementById('greetingEyebrow');
  const name    = document.getElementById('greetingName');
  if (eyebrow) eyebrow.textContent = getGreeting();
  if (name)    name.textContent    = '杨修瑛';
}

/* ─── Greeting typewriter ─────────────────────────────────── */
function initGreetingTypewriter() {
  const el = document.querySelector('.greeting-sub');
  if (!el) return;

  const fullText = el.textContent;
  const charDelay = 120;     // ms per character
  const pauseDelay = 3000;   // 3s pause after full text shown

  function type() {
    el.textContent = '';
    let i = 0;

    function addChar() {
      if (i < fullText.length) {
        el.textContent += fullText[i];
        i++;
        setTimeout(addChar, charDelay);
      } else {
        setTimeout(type, pauseDelay);
      }
    }

    addChar();
  }

  type();
}

/* ─── Prompt templates ───────────────────────────────────── */
const promptTemplates = {
  featured: {
    title: '精选模板',
    desc: '高频分析场景，一键带入后可继续编辑',
    items: [
      { title: '商品全景诊断', icon: 'spark', desc: '从市场、竞品到广告表现，快速定位增长机会', prompt: '请对【ASIN】做一次全景诊断，站点为【站点】，时间范围为【时间范围】。请从市场趋势、类目竞争、核心竞品、Listing 表现和广告效率五个方面分析，先给出关键结论，再列出问题优先级与未来 30 天可执行行动计划。' },
      { title: '市场机会扫描', icon: 'trend', desc: '判断市场规模、趋势与可切入的细分机会', prompt: '请分析【类目/关键词】在【站点】的市场机会，时间范围为【时间范围】。请覆盖市场规模与增速、季节性、价格带、头部集中度、消费者核心需求及潜在细分机会，并给出进入建议与主要风险。' },
      { title: '广告健康检查', icon: 'chart', desc: '发现预算浪费与可放量的广告机会', prompt: '请诊断【ASIN/广告活动】在【站点】过去【时间范围】的广告健康度。重点分析花费、销售额、ACOS、ROAS、CTR、CVR、预算利用率和搜索词质量，区分需要止损与值得放量的对象，并输出按优先级排序的优化动作。' }
    ]
  },
  market: {
    title: '市场分析',
    desc: '洞察规模、趋势、价格带与消费者需求',
    items: [
      { title: '类目趋势研究', icon: 'trend', desc: '拆解市场规模、增长、季节性和竞争格局', prompt: '请研究【类目】在【站点】过去【时间范围】的市场趋势。分析市场规模、同比与环比变化、季节性、头部品牌集中度及新品进入速度，并判断市场所处阶段，给出未来 3–6 个月趋势判断。' },
      { title: '价格带与产品机会', icon: 'layers', desc: '识别高需求低供给的价格与功能空位', prompt: '请分析【类目/核心关键词】在【站点】的价格带与产品机会。按价格区间比较商品数量、销量、评分、评论门槛和主要卖点，识别高需求低供给区间，并给出建议售价、核心配置与差异化方向。' },
      { title: '消费者需求洞察', icon: 'search', desc: '从搜索与评价中提炼购买动机和痛点', prompt: '请围绕【类目/关键词】分析【站点】消费者需求。结合搜索趋势、购买关注点、好评原因与差评痛点，提炼核心使用场景、购买动机和未满足需求，并转化为产品、Listing 与营销建议。' }
    ]
  },
  competitor: {
    title: '竞品分析',
    desc: '对比产品、流量、内容与市场策略',
    items: [
      { title: '竞品矩阵对比', icon: 'compare', desc: '横向比较产品力、价格、口碑与销量表现', prompt: '请将我的商品【我的 ASIN】与竞品【竞品 ASIN，可多个】在【站点】进行矩阵对比。覆盖价格、规格、核心卖点、评分评论、销量趋势、促销及内容质量，指出我方优势、短板和最值得优先突破的差异化机会。' },
      { title: '竞品流量拆解', icon: 'route', desc: '分析竞品关键词、自然位与广告流量来源', prompt: '请拆解竞品【竞品 ASIN】在【站点】的流量结构。分析核心自然关键词、广告关键词、排名变化、流量集中度及可能的投放策略，并筛选适合【我的 ASIN】争夺的关键词，说明机会与难度。' },
      { title: 'Listing 内容差距', icon: 'document', desc: '对比标题、图片、卖点和评论反馈', prompt: '请对比【我的 ASIN】与【竞品 ASIN】的 Listing 内容表现。逐项审视标题、主图、图片组、五点、A+、视频、问答和评论反馈，指出影响点击与转化的关键差距，并给出可直接执行的内容优化清单。' }
    ]
  },
  ads: {
    title: '广告分析',
    desc: '诊断效率、搜索词、预算与增长空间',
    items: [
      { title: '广告整体复盘', icon: 'chart', desc: '复盘核心指标、结构变化与问题归因', prompt: '请复盘【ASIN/店铺】在【站点】过去【时间范围】的广告表现，并与【对比时间范围】比较。分析花费、销售额、ACOS、ROAS、CTR、CVR、CPC 和广告销售占比，解释主要变化原因，并给出下一周期目标与动作。' },
      { title: '搜索词淘汰与扩量', icon: 'filter', desc: '区分否定词、降价词和潜力词', prompt: '请分析【ASIN/广告活动】在【站点】过去【时间范围】的搜索词表现。将搜索词分为否定止损、降价观察、稳定维持和加价扩量四类，说明判断依据，并输出建议动作、优先级及预期影响。' },
      { title: '预算与竞价优化', icon: 'wallet', desc: '让预算流向高效率且有增长空间的活动', prompt: '请优化【店铺/ASIN】在【站点】的广告预算与竞价。识别预算受限、高效未放量、低效持续消耗和竞价错配的活动或关键词，给出预算迁移、竞价调整与执行顺序，并说明风险控制条件。' }
    ]
  }
};

/* ─── Points usage (front-end demonstration) ─────────────── */
const DAILY_POINTS = 200;
const usageStorageKey = 'xiaozhi-usage-demo';

function getUsageState() {
  const today = new Date().toISOString().slice(0, 10);
  try {
    const saved = JSON.parse(localStorage.getItem(usageStorageKey));
    if (saved && saved.date === today && Number.isFinite(saved.used)) return saved;
  } catch (error) { /* Start with the designed demo state. */ }
  return { date: today, used: 74, conversations: 8 };
}

function saveUsageState(state) {
  localStorage.setItem(usageStorageKey, JSON.stringify(state));
}

function getPointsRemaining() {
  return Math.max(0, DAILY_POINTS - getUsageState().used);
}

function syncUsageUI() {
  const remaining = getPointsRemaining();
  const card = document.querySelector('.user-card[data-usage-tip]');
  if (card) {
    card.dataset.usageTip = `今日积分：${remaining} / ${DAILY_POINTS}\n剩余 ${Math.round((remaining / DAILY_POINTS) * 100)}% · 点击查看使用情况`;
  }
}

function showPointsToast(title, message, includeLink) {
  const toast = document.getElementById('pointsToast');
  if (!toast) return;
  toast.innerHTML = `<span aria-hidden="true">${includeLink ? '◌' : '✓'}</span><span><strong>${title}</strong>${message}${includeLink ? ' <a href="profile.html">查看用量</a>' : ''}</span>`;
  toast.classList.add('visible');
  window.clearTimeout(showPointsToast.timer);
  showPointsToast.timer = window.setTimeout(() => toast.classList.remove('visible'), 4500);
}

function canStartTask() {
  if (getPointsRemaining() > 0) return true;
  showPointsToast('今日积分已用完', '将在明日 00:00 恢复；如需继续使用，请联系管理员。', true);
  return false;
}

function settleTaskPoints(text) {
  const state = getUsageState();
  const deduction = Math.min(getPointsRemaining(), Math.max(4, Math.min(18, Math.ceil(text.length / 8) + 4)));
  state.used += deduction;
  state.conversations += 1;
  saveUsageState(state);
  syncUsageUI();
  showPointsToast(`本次已扣除 ${deduction} 积分`, `今日还可使用 ${getPointsRemaining()} / ${DAILY_POINTS} 积分。`, true);
}

function promptIcon(name) {
  const paths = {
    spark: '<path d="M12 3l1.4 4.1L17.5 8.5l-4.1 1.4L12 14l-1.4-4.1-4.1-1.4 4.1-1.4L12 3z"/><path d="M18.5 14l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2z"/>',
    trend: '<polyline points="3 17 9 11 13 15 21 7"/><polyline points="15 7 21 7 21 13"/>',
    chart: '<line x1="5" y1="20" x2="5" y2="13"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="19" y1="20" x2="19" y2="9"/>',
    layers: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 12 12 17 22 12"/><polyline points="2 17 12 22 22 17"/>',
    search: '<circle cx="10.5" cy="10.5" r="6.5"/><line x1="15.5" y1="15.5" x2="21" y2="21"/>',
    compare: '<path d="M8 3L4 7l4 4"/><path d="M4 7h14"/><path d="M16 13l4 4-4 4"/><path d="M20 17H6"/>',
    route: '<circle cx="6" cy="6" r="2"/><circle cx="18" cy="18" r="2"/><path d="M8 6h5a3 3 0 0 1 3 3v0a3 3 0 0 1-3 3H9a3 3 0 0 0-3 3v1"/>',
    document: '<path d="M6 2h9l4 4v16H6z"/><polyline points="14 2 14 7 19 7"/><line x1="9" y1="12" x2="16" y2="12"/><line x1="9" y1="16" x2="16" y2="16"/>',
    filter: '<polygon points="3 4 21 4 14 12 14 19 10 21 10 12 3 4"/>',
    wallet: '<rect x="3" y="6" width="18" height="14" rx="2"/><path d="M16 10h5v6h-5a3 3 0 0 1 0-6z"/><path d="M6 6V4h11"/>'
  };
  return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.spark}</svg>`;
}

function renderPromptTemplates(category) {
  const group = promptTemplates[category] || promptTemplates.featured;
  const grid = document.getElementById('promptGrid');
  if (!grid) return;
  document.getElementById('promptLibraryTitle').textContent = group.title;
  document.getElementById('promptLibraryDesc').textContent = group.desc;
  document.getElementById('promptCount').textContent = `${group.items.length} 个模板`;
  grid.innerHTML = '';
  group.items.forEach(item => {
    const button = document.createElement('button');
    button.className = 'prompt-template';
    button.type = 'button';
    button.innerHTML = `<span class="prompt-template-top"><span class="prompt-template-icon">${promptIcon(item.icon)}</span><span class="prompt-template-use">使用模板 →</span></span><span class="prompt-template-title">${item.title}</span><span class="prompt-template-desc">${item.desc}</span>`;
    button.addEventListener('click', () => applyPromptTemplate(item.prompt));
    grid.appendChild(button);
  });
}

function applyPromptTemplate(prompt) {
  const textarea = document.getElementById('welcomeInput');
  textarea.value = prompt;
  autoResizeTextarea(textarea);
  textarea.focus();
  textarea.setSelectionRange(textarea.value.length, textarea.value.length);
}

function initPromptLibrary() {
  document.querySelectorAll('.prompt-category').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('.prompt-category').forEach(item => {
        const active = item === button;
        item.classList.toggle('active', active);
        item.setAttribute('aria-selected', String(active));
      });
      renderPromptTemplates(button.dataset.category);
    });
  });
  renderPromptTemplates('featured');
}

/* ─── View State ─────────────────────────────────────────── */
let currentType = null;
let activeScenario = null;
let artifactFile = '客户定制/飞阅定制/prototype.html';
let artifactKind = 'html';
const productAlertReportFile = '客户定制/飞阅定制/prototype.html';
const productAlertWorkbookFile = 'outputs/20260824-parent-asin-alerts/父ASIN预警明细.xlsx';

function showWelcome() {
  window.conversationDemoSession?.leave();
  window.scheduleCreationSession?.leave();
  document.getElementById('welcomeView').classList.remove('hidden');
  document.getElementById('chatView').classList.add('hidden');
  const input = document.getElementById('welcomeInput');
  input.value = '';
  autoResizeTextarea(input);
  setActiveSidebarItem(null);
  currentType = null;
  activeScenario = null;
  closeArtifact();
}

function startChat(type, prefill) {
  window.conversationDemoSession?.leave();
  window.scheduleCreationSession?.leave();
  currentType = type;
  const welcome = document.getElementById('welcomeView');
  const chat    = document.getElementById('chatView');
  welcome.classList.add('hidden');
  chat.classList.remove('hidden');

  const badge = document.getElementById('chatBadge');
  const isProductAlert = type === 'product-alert';
  badge.textContent = isProductAlert ? '飞阅 SOP' : type === 'suggestion' ? '智能建议' : '广告分析';
  badge.style.background = isProductAlert ? '#E6EAF8' : type === 'suggestion' ? 'var(--color-accent-subtle)' : '#E0EAE8';
  badge.style.color = isProductAlert ? '#40538A' : type === 'suggestion' ? 'var(--color-accent)' : '#3D5A6B';
  document.querySelector('.chat-topbar-title').textContent = isProductAlert ? '飞阅商品预警 SOP' : '广告诊断报告';

  renderDemoConversation(type);
  if (type === 'suggestion') {
    openArtifact();
  } else {
    closeArtifact();
  }

  const ta = document.getElementById('chatTextarea');
  if (prefill) { ta.value = prefill; autoResizeTextarea(ta); }
  ta.focus();
}

function startNewChat() {
  showWelcome();
  document.getElementById('welcomeInput').focus();
}

/* ─── Input auto-resize ──────────────────────────────────── */
function autoResizeTextarea(el) {
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 160) + 'px';
}

/* ─── Welcome input send ─────────────────────────────────── */
function handleWelcomeSend() {
  const ta  = document.getElementById('welcomeInput');
  const val = ta.value.trim();
  if (!val) return;
  if (window.conversationDemoSession?.send(val)) {
    ta.value = ''; autoResizeTextarea(ta); return;
  }
  if (!canStartTask()) return;
  if (isProductAlertSop(val)) {
    startProductAlertChat(val);
    settleTaskPoints(val);
    ta.value = '';
    autoResizeTextarea(ta);
    return;
  }
  startChat('suggestion');
  appendUserMessage(val);
  settleTaskPoints(val);
  ta.value = '';
  autoResizeTextarea(ta);
}

/* ─── Chat send ──────────────────────────────────────────── */
function handleChatSend() {
  const ta  = document.getElementById('chatTextarea');
  const val = ta.value.trim();
  if (!val) return;
  if (window.conversationDemoSession?.send(val)) {
    ta.value = ''; autoResizeTextarea(ta); return;
  }
  if (window.scheduleCreationSession?.send(val)) {
    ta.value = '';
    autoResizeTextarea(ta);
    return;
  }
  if (!canStartTask()) return;
  if (activeScenario === 'product-alert' && isExportAlertListRequest(val)) {
    appendUserMessage(val);
    showProductAlertWorkbook();
    settleTaskPoints(val);
    ta.value = '';
    autoResizeTextarea(ta);
    return;
  }
  if (isProductAlertSop(val)) {
    startProductAlertChat(val);
    settleTaskPoints(val);
    ta.value = '';
    autoResizeTextarea(ta);
    return;
  }
  appendUserMessage(val);
  settleTaskPoints(val);
  ta.value = '';
  autoResizeTextarea(ta);
}

function appendUserMessage(text) {
  const container = document.getElementById('messages');
  const row = document.createElement('div');
  row.className = 'message-row user';
  row.innerHTML = `
    <div class="msg-avatar user">杨</div>
    <div class="msg-bubble">${escapeHtml(text)}</div>`;
  container.appendChild(row);
  scrollToBottom();
}

function scrollToBottom() {
  const c = document.getElementById('messages');
  if (c) c.scrollTop = c.scrollHeight;
}

function escapeHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function isProductAlertSop(text) {
  return /飞阅/.test(text) && /商品预警/.test(text);
}

function isExportAlertListRequest(text) {
  return /导出/.test(text) && /(预警|商品|清单)/.test(text);
}

/* ─── Sidebar active state ───────────────────────────────── */
function setActiveSidebarItem(id) {
  document.querySelectorAll('.nav-item, .history-item').forEach(el => el.classList.remove('active'));
  if (id) {
    const el = document.getElementById(id);
    if (el) el.classList.add('active');
  }
}

/* ─── Demo Conversations ─────────────────────────────────── */
function renderDemoConversation(type) {
  const container = document.getElementById('messages');
  container.innerHTML = '';

  if (type === 'suggestion') {
    renderSuggestionDemo(container);
  } else if (type === 'product-alert') {
    renderProductAlertDemo(container, '请执行飞阅商品预警 SOP');
  } else {
    renderAnalysisDemo(container);
  }
  setTimeout(scrollToBottom, 50);
}

function aiMsg(html) {
  return `<div class="message-row assistant">
    <div class="msg-avatar ai">织</div>
    <div class="msg-bubble">${html}</div>
  </div>`;
}

function userMsg(text) {
  return `<div class="message-row user">
    <div class="msg-avatar user">杨</div>
    <div class="msg-bubble">${text}</div>
  </div>`;
}

function renderSuggestionDemo(c) {
  c.innerHTML = `
    ${userMsg('B0GWTWVWYF 有什么广告优化建议？')}

    ${aiMsg(`<div class="confirm-msg">
      <p>收到，正在匹配今日命中建议。先确认一下投放信息：</p>
      <div style="margin-top:12px;display:flex;flex-direction:column;gap:6px;">
        <div class="confirm-field"><span class="confirm-key">ASIN</span><span class="confirm-val">B0GWTWVWYF</span></div>
        <div class="confirm-field"><span class="confirm-key">建议对象</span><span class="confirm-val">全部</span></div>
        <div class="confirm-field"><span class="confirm-key">站点</span><span class="confirm-val">日本站</span></div>
        <div class="confirm-field"><span class="confirm-key">店铺</span><span class="confirm-val">VC-日本1</span></div>
      </div>
      <p style="margin-top:12px;color:var(--color-text-tertiary);font-size:13px;">信息无误吗？确认后我会拉取今日全部建议并生成诊断报告。</p>
    </div>`)}

    ${userMsg('对，帮我出报告')}

    ${aiMsg(`<div style="color:var(--color-text-tertiary);font-size:13px;padding:4px 0;">
      正在获取今日建议数据…
      <div class="loading-dots" style="margin-top:8px;"><span></span><span></span><span></span></div>
    </div>`)}

    ${aiMsg(`<div class="artifact-summary">
      <p><strong>报告已生成。</strong>本次诊断识别到 11 条可执行建议，重点集中在无效流量止损与核心词竞价优化。建议先收紧低效投放，再对高质量入口逐步放量。</p>
      ${buildArtifactCard()}
    </div>`)}`;
}

function buildArtifactCard() {
  return `<div class="artifact-result-card" role="button" tabindex="0" aria-label="打开飞阅商品预警报告" onclick="showProductAlertReport()" onkeydown="openArtifactWithKeyboard(event)">
    <div class="artifact-result-main">
      <span class="artifact-result-icon">${promptIcon('document')}</span>
      <span class="artifact-result-copy">
        <strong>飞阅商品预警报告</strong>
        <span>交互式报告 · Mock 数据 · 点击查看</span>
      </span>
    </div>
    <div class="artifact-result-actions">
      <button class="artifact-action-btn" onclick="event.stopPropagation(); downloadArtifact()">${artifactActionIcon('download')} 下载文件</button>
      <button class="artifact-action-btn" onclick="event.stopPropagation(); openArtifactInBrowser()">${artifactActionIcon('external')} 浏览器打开</button>
    </div>
  </div>`;
}

function startProductAlertChat(request) {
  activeScenario = 'product-alert';
  startChat('product-alert');
  renderProductAlertDemo(document.getElementById('messages'), request);
  showProductAlertReport();
}

function renderProductAlertDemo(c, request) {
  c.innerHTML = `
    ${userMsg(escapeHtml(request))}
    ${aiMsg(`<div class="sop-run-message">
      <div class="sop-run-head"><span class="sop-status-dot"></span><strong>飞阅商品预警 SOP 已执行</strong><span>Mock 数据</span></div>
      <p>已按父 ASIN 完成广告花费、BD 花费、广告效率、动销、库存和售价调整六类巡检；重点关注 TOP 50 按近 30 天总订单量降序展示。</p>
      <div class="sop-run-stats"><span><b>248</b> 个预警父 ASIN</span><span><b>6</b> 个预警维度</span><span>数据截止 2026-08-23</span></div>
    </div>`) }
    ${aiMsg(`<div class="artifact-summary">
      <p><strong>商品预警报告已生成。</strong>右侧已打开飞阅商品预警报告，可查看六个预警维度及父 ASIN 明细。</p>
      ${buildProductAlertReportCard()}
    </div>`)}
    ${aiMsg(`<div class="next-step-hint">需要导出本次预警商品时，直接说“导出这一次预警商品清单”。</div>`)}`;
  setTimeout(scrollToBottom, 50);
}

function buildProductAlertReportCard() {
  return `<div class="artifact-result-card" role="button" tabindex="0" aria-label="打开飞阅商品预警报告" onclick="showProductAlertReport()" onkeydown="openArtifactWithKeyboard(event)">
    <div class="artifact-result-main"><span class="artifact-result-icon">HTML</span><span class="artifact-result-copy"><strong>飞阅商品预警报告</strong><span>交互式报告 · Mock 数据 · 点击查看</span></span></div>
    <div class="artifact-result-actions"><button class="artifact-action-btn" onclick="event.stopPropagation(); downloadArtifact()">${artifactActionIcon('download')} 下载文件</button><button class="artifact-action-btn" onclick="event.stopPropagation(); openArtifactInBrowser()">${artifactActionIcon('external')} 浏览器打开</button></div>
  </div>`;
}

function showProductAlertReport() {
  setArtifact('html', productAlertReportFile, '飞阅商品预警报告', '交互式网页 · Mock 数据已生成');
  openArtifact();
}

function showProductAlertWorkbook() {
  setArtifact('xlsx', productAlertWorkbookFile, '父 ASIN 预警明细', 'Excel 工作簿 · 六个预警维度明细');
  openArtifact();
  const container = document.getElementById('messages');
  container.insertAdjacentHTML('beforeend', aiMsg(`<div class="artifact-summary">
    <p><strong>已生成本次预警商品清单。</strong>右侧展示的是 Excel 预览，包含重点关注 TOP 50 与六个预警维度明细。</p>
    ${buildProductAlertWorkbookCard()}
  </div>`));
  scrollToBottom();
}

function buildProductAlertWorkbookCard() {
  return `<div class="artifact-result-card" role="button" tabindex="0" aria-label="打开父 ASIN 预警明细" onclick="showProductAlertWorkbook()" onkeydown="openArtifactWithKeyboard(event)">
    <div class="artifact-result-main"><span class="artifact-result-icon excel-icon">XLSX</span><span class="artifact-result-copy"><strong>父ASIN预警明细.xlsx</strong><span>重点关注 TOP 50 · 六个预警维度</span></span></div>
    <div class="artifact-result-actions"><button class="artifact-action-btn" onclick="event.stopPropagation(); downloadArtifact()">${artifactActionIcon('download')} 导出 Excel</button></div>
  </div>`;
}

function openArtifactWithKeyboard(event) {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    openArtifact();
  }
}

function artifactActionIcon(name) {
  if (name === 'download') {
    return '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v12"/><polyline points="7 10 12 15 17 10"/><path d="M5 21h14"/></svg>';
  }
  return '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3h7v7"/><path d="M10 14L21 3"/><path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"/></svg>';
}

function openArtifact() {
  const workspace = document.getElementById('chatWorkspace');
  if (!workspace) return;
  workspace.classList.add('artifact-open');
  const frame = document.getElementById('artifactFrame');
  if (frame && artifactKind === 'html' && !frame.getAttribute('src')) frame.setAttribute('src', artifactFile);
}

function setArtifact(kind, file, title, meta) {
  artifactKind = kind;
  artifactFile = file;
  const frame = document.getElementById('artifactFrame');
  const preview = document.getElementById('excelPreview');
  const icon = document.getElementById('artifactFileIcon');
  document.getElementById('artifactTitle').textContent = title;
  document.getElementById('artifactMeta').textContent = meta;
  icon.textContent = kind === 'xlsx' ? 'XLSX' : 'HTML';
  frame.classList.toggle('hidden', kind === 'xlsx');
  preview.classList.toggle('hidden', kind !== 'xlsx');
  if (kind === 'html') frame.src = file;
}

function closeArtifact() {
  const workspace = document.getElementById('chatWorkspace');
  if (workspace) workspace.classList.remove('artifact-open');
}

function refreshArtifact() {
  if (activeScenario === 'conversation-demo') { window.conversationDemoSession.openReport(); return; }
  const frame = document.getElementById('artifactFrame');
  const button = document.getElementById('artifactRefreshBtn');
  if (!frame || !button || button.classList.contains('is-refreshing')) return;

  button.classList.add('is-refreshing');
  button.disabled = true;
  if (artifactKind === 'html') frame.src = artifactFile;

  window.setTimeout(() => {
    button.classList.remove('is-refreshing');
    button.disabled = false;
  }, 350);
}

function downloadArtifact() {
  const link = document.createElement('a');
  link.href = artifactFile;
  link.download = decodeURIComponent(new URL(artifactFile, document.baseURI).pathname.split('/').pop());
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function openArtifactInBrowser() {
  window.open(artifactFile, '_blank', 'noopener,noreferrer');
}

function renderAnalysisDemo(c) {
  c.innerHTML = `
    ${userMsg('B0GWTWVWYF 上周广告数据怎么样？')}

    ${aiMsg(`<div class="confirm-msg">
      <p>好的，正在拉取 <strong>B0GWTWVWYF</strong> 上周（5月26日 – 6月1日）广告数据，稍等片刻。</p>
    </div>`)}

    ${aiMsg(`<div style="line-height:1.8;">
      <p style="font-weight:600;margin-bottom:12px;">B0GWTWVWYF · 上周广告概览（日本站）</p>

      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:16px;">
        ${metricCard('花费', '¥ 12,480', '', '')}
        ${metricCard('销售额', '¥ 58,320', '', '')}
        ${metricCard('ROAS', '4.67', '', 'good')}
        ${metricCard('ACOS', '21.4%', '较上上周 -3.2pp', 'good')}
        ${metricCard('点击', '423', '较上上周 +18%', 'good')}
        ${metricCard('转化率', '8.5%', '较上上周 -0.4pp', 'neutral')}
      </div>

      <p style="color:var(--color-text-secondary);font-size:13px;line-height:1.7;">整体表现良好，ROAS 4.67 高于品类均值 3.8，ACOS 持续改善。主要驱动力来自核心搜索词组，点击量环比增长明显。转化率略有下滑，建议关注 Listing 详情页的优化情况。</p>

      <div style="margin-top:12px;padding:10px 14px;background:var(--color-bg-sunken);border-radius:var(--radius-md);font-size:12px;color:var(--color-text-tertiary);">
        💡 需要进一步拆解哪个活动，或者跑一下竞品对比？
      </div>
    </div>`)}`;
}

function metricCard(label, value, change, trend) {
  const changeColor = trend === 'good' ? 'var(--color-success)' : trend === 'bad' ? 'var(--color-error)' : 'var(--color-text-tertiary)';
  return `<div style="background:var(--color-bg-base);border:1px solid var(--color-border-subtle);border-radius:var(--radius-md);padding:10px 12px;">
    <div style="font-size:11px;color:var(--color-text-disabled);margin-bottom:4px;">${label}</div>
    <div style="font-size:18px;font-weight:700;color:var(--color-text-primary);line-height:1.2;">${value}</div>
    ${change ? `<div style="font-size:11px;color:${changeColor};margin-top:3px;">${change}</div>` : ''}
  </div>`;
}

function buildReport() {
  return `<div class="report">
    <div class="report-header">
      <div class="report-header-title">商品广告诊断报告</div>
      <div class="report-summary">
        本次诊断共识别出 <strong>11 条</strong>可操作建议，涉及「减少损失」「竞价优化」。
        建议<strong>优先止血，再推进竞价放量</strong>。
      </div>
      <div class="report-strategy">
        <strong>操盘思路：</strong>该商品存在多条无效关键词持续消耗预算，同时核心词竞价偏低、排名下滑明显。建议先清理低效流量降低 ACOS，再对高质量词适度加价抢占位置。
      </div>
      <div class="report-stats">
        <div class="stat-chip">站点 <span>日本站</span></div>
        <div class="stat-chip">店铺 <span>VC-日本1</span></div>
        <div class="stat-chip">ASIN <span>B0GWTWVWYF</span></div>
        <div class="stat-chip">日期 <span>2026-06-05</span></div>
      </div>
    </div>

    <div class="report-body">

      <!-- ① 减少损失 -->
      <div class="report-intent">
        <div class="intent-header">
          <div class="intent-number">一</div>
          <div class="intent-label">减少损失</div>
          <div class="intent-desc">识别到 2 类无效流量来源，建议否定或暂停</div>
          <div class="intent-count">共 8 条</div>
        </div>

        <!-- 1.1 关键词否定 -->
        <div class="report-submodule">
          <div class="sub-header">
            <span class="sub-num">1.1</span> 关键词否定（广告组维度）
          </div>
          <p class="advisory-text">
            以下 6 条词近 30 天累计高点击、零出单，且均为非核心词，持续投放只会稀释预算、拉高整体 ACOS。建议在广告组维度精准否定，将流量释放给有转化潜力的入口。
          </p>
          <div class="threshold-bar">
            <span class="threshold-label">筛选条件</span>
            <span class="threshold-chip">点击 &gt; 15</span>
            <span class="threshold-chip">出单 = 0</span>
            <span class="threshold-chip">统计周期 30天</span>
            <span class="threshold-chip">非核心词</span>
          </div>
          <div class="report-table-wrap">
            <table class="report-table">
              <thead>
                <tr>
                  <th style="width:38%">所在位置</th>
                  <th>搜索词</th>
                  <th style="text-align:right">点击</th>
                  <th style="text-align:right">花费</th>
                  <th>调整动作</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                ${negRow('开-LYJ-K331-DST04-ALL-匹配-DF', 'ベランダ テーブル', 17, '¥433')}
                ${negRow('开-LYJ-K331-SP01-核心-EX', '折りたたみ テーブル アウトドア', 24, '¥612')}
                ${negRow('开-LYJ-K331-AUTO-自动-BR', 'テーブル 折りたたみ 小さい', 16, '¥389')}
                ${negRow('开-LYJ-K331-SP01-核心-EX', 'キャンプ テーブル 軽量', 19, '¥521')}
                ${negRow('开-LYJ-K331-DST04-ALL-匹配-DF', 'アウトドア テーブル 折り畳み', 18, '¥445')}
                ${negRow('开-LYJ-K331-AUTO-自动-BR', 'テーブル 屋外 折りたたみ', 15, '¥287')}
              </tbody>
            </table>
          </div>
        </div>

        <!-- 1.2 投放品否定 -->
        <div class="report-submodule" style="padding-top:0">
          <div class="sub-header">
            <span class="sub-num">1.2</span> 投放品否定（活动维度）
          </div>
          <div class="text-suggest-item">
            <p class="suggest-body">
              竞品 <strong>B09MXQ3T2K</strong> 和 <strong>B0B8NFZPQR</strong> 近 45 天带来合计 14,700 次曝光，但总点击仅 7 次，CTR 不足 0.05%，完全没有流量质量，反而拉低了活动整体 CTR、影响系统对广告质量的判断。建议在活动层级否定这两个投放品，将竞价资源集中在优质流量上。
            </p>
            <div class="threshold-bar">
              <span class="threshold-label">筛选条件</span>
              <span class="threshold-chip">曝光 &gt; 5000</span>
              <span class="threshold-chip">CTR &lt; 0.1%</span>
              <span class="threshold-chip">出单 = 0</span>
              <span class="threshold-chip">统计周期 45天</span>
            </div>
            <div class="suggest-action-row">
              <div class="suggest-location">
                <strong>日本站 / VC-日本1</strong>
                活动：开-LYJ-K331-DST04-ALL · 开-LYJ-K331-SP01<br>
                否定对象：B09MXQ3T2K · B0B8NFZPQR
              </div>
              <button class="btn-execute">执行</button>
            </div>
          </div>
        </div>
      </div>

      <!-- ② 竞价优化 -->
      <div class="report-intent">
        <div class="intent-header">
          <div class="intent-number">二</div>
          <div class="intent-label">竞价优化</div>
          <div class="intent-desc">发现 3 条核心词竞价偏低，建议提价放量</div>
          <div class="intent-count">共 3 条</div>
        </div>

        <div class="report-submodule">
          <div class="sub-header">
            <span class="sub-num">2.1</span> 竞价上调（词维度守坑）
          </div>
          <p class="advisory-text">
            以下 3 条均为核心词，近 30 天出单稳定、ACOS 健康，但本周广告排名因竞争对手加价而明显下滑。当前竞价已不足以维持头部位置，建议上调 15–20%，守住优质流量入口。
          </p>
          <div class="threshold-bar">
            <span class="threshold-label">筛选条件</span>
            <span class="threshold-chip">核心词</span>
            <span class="threshold-chip">近30天出单 ≥ 3</span>
            <span class="threshold-chip">排名下滑 &gt; 5位</span>
            <span class="threshold-chip">CPC 低于品类均值</span>
          </div>

          ${bidItem(
            'テーブル アウトドア 折りたたみ',
            '近30天出单8次，ACOS 18.5%，表现优秀，但本周广告排名从 #3 跌至 #9，竞争对手加价明显。建议将竞价上调 +20%，重新抢回头部位置，带动转化进一步增长。',
            '¥45','¥54','+20%',
            '开-LYJ-K331-SP01-核心-EX','核心词-精确组'
          )}
          ${bidItem(
            '折りたたみ テーブル 屋外',
            '近30天出单5次，ROAS 5.2，词质量良好。本周排名从 #5 掉至 #12，预估是竞品加价导致。建议竞价上调 +15%，维持可见位置稳定出单。',
            '¥38','¥44','+15%',
            '开-LYJ-K331-SP01-核心-EX','核心词-精确组'
          )}
          ${bidItem(
            'ガーデン テーブル セット 折りたたみ',
            '近30天出单4次，ACOS 22%略高但仍在目标内，该词搜索量大、竞争激烈。当前竞价已滑出 TOP5，建议上调 +18% 重新进入首屏竞价区间。',
            '¥52','¥61','+18%',
            '开-LYJ-K331-SP01-核心-EX','核心词-精确组'
          )}
        </div>
      </div>

    </div>
  </div>`;
}

function negRow(camp, keyword, clicks, cost) {
  return `<tr>
    <td class="td-location">
      <strong>日本站 / VC-日本1</strong>
      活动：${camp}
    </td>
    <td class="td-keyword">${keyword}</td>
    <td class="td-num bad">${clicks}</td>
    <td class="td-num bad">${cost}</td>
    <td class="td-action">广告组精准否定</td>
    <td><button class="btn-execute">执行</button></td>
  </tr>`;
}

function bidItem(keyword, analysis, currentBid, suggestBid, pct, camp, group) {
  return `<div class="text-suggest-item">
    <p class="suggest-body">${analysis}</p>
    <div class="suggest-action-row">
      <div class="suggest-location">
        <strong>日本站 / VC-日本1</strong>
        活动：${camp}<br>广告组：${group}
      </div>
      <div style="display:flex;align-items:center;gap:10px;">
        <div class="suggest-bid">${currentBid} → <strong>${suggestBid}（${pct}）</strong></div>
        <button class="btn-execute">执行</button>
      </div>
    </div>
  </div>`;
}

/* ─── Init ───────────────────────────────────────────────── */
function initConversationPage() {
  initGreeting();
  initGreetingTypewriter();
  initPromptLibrary();
  syncUsageUI();

  // welcome textarea
  const wta = document.getElementById('welcomeInput');
  if (wta) {
    wta.addEventListener('input', () => autoResizeTextarea(wta));
    wta.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleWelcomeSend(); }
    });
  }

  // chat textarea
  const cta = document.getElementById('chatTextarea');
  if (cta) {
    cta.addEventListener('input', () => autoResizeTextarea(cta));
    cta.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleChatSend(); }
    });
  }
  if (window.conversationDemoSession?.init()) return;
  if (window.scheduleCreationSession?.init()) return;
  const requestedChat = new URLSearchParams(window.location.search).get('chat');
  if (requestedChat === 'suggestion' || requestedChat === 'analysis') startChat(requestedChat);
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initConversationPage);
} else {
  initConversationPage();
}
