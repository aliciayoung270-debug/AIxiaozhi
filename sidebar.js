/* Shared navigation for the standalone HTML pages. No server or fetch required. */
(() => {
  const rootURL = new URL('.', document.currentScript.src);
  // A single demo source for execution history and its shared recent-chat entries.
  window.xiaozhiScheduleDemoRuns = [
    {id:'FY-20261020-0900',taskId:'feiyue',name:'飞阅每日商品预警',time:'2026-10-20 09:00',status:'success',push:'推送成功（示例）',prompt:'执行飞阅预警报告生成的定时任务，总结飞阅今天的预警概览，生成商品预警报告。',report:true,channel:'钉钉 · 飞阅运营群',duration:'1 分 42 秒',cutoff:'2026-10-19'},
    {id:'FY-20261019-0900',taskId:'feiyue',name:'飞阅每日商品预警',time:'2026-10-19 09:00',status:'failed',push:'未推送',prompt:'执行飞阅预警报告生成的定时任务，总结飞阅今天的预警概览，生成商品预警报告。',report:false,channel:'钉钉 · 飞阅运营群',duration:'32 秒',error:'数据源连接超时，本次未生成报告。请检查连接器后重试。'}
  ];
  const routes = {
    chat: 'index.html',
    skills: 'skills.html',
    schedules: 'requirements/scheduled-tasks/prototype.html',
    operations: 'alert-operations-center/运营中心.html',
    settings: 'points-admin.html',
    profile: 'profile.html'
  };

  const stateKey = 'xiaozhi-sidebar-collapsed';
  const narrowScreen = window.matchMedia('(max-width: 680px)');
  let savedState = null;
  try { savedState = localStorage.getItem(stateKey); } catch (error) { /* Storage may be disabled. */ }
  const requestedState = new URLSearchParams(location.search).get('sidebar');
  let collapsed = requestedState === 'collapsed' ? true : requestedState === 'expanded' ? false
    : savedState === 'true' ? true : savedState === 'false' ? false : narrowScreen.matches;
  if (document.querySelector('[data-shared-sidebar]')) {
    document.documentElement.dataset.sidebarCollapsed = String(collapsed);
  }

  function initSidebar() {
    const sidebar = document.querySelector('[data-shared-sidebar]');
    if (!sidebar) return;
    sidebar.innerHTML = `
    <div class="sidebar-logo">
      <div class="logo-mark">织</div>
      <span class="logo-text">AI 小织</span>
      <button class="sidebar-toggle" type="button" aria-label="收起侧边栏" aria-expanded="true" aria-controls="sharedSidebarContent">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 3v18"/><path class="sidebar-toggle-chevron" d="m16 9-3 3 3 3"/></svg>
      </button>
    </div>

    <a class="new-chat-btn" id="nav-chat" data-route="chat">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
      新建对话
    </a>

    <div class="sidebar-body" id="sharedSidebarContent">

      <!-- History -->
      <div class="sidebar-section">
        <div class="sidebar-section-heading">
          <div class="sidebar-section-label">最近对话</div>
          <button class="history-refresh-btn" id="historyRefreshBtn" type="button" title="刷新最近对话" aria-label="刷新最近对话">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 11a8.1 8.1 0 0 0-15.5-2M4 5v4h4"/><path d="M4 13a8.1 8.1 0 0 0 15.5 2M20 19v-4h-4"/></svg>
          </button>
        </div>
        <div id="recentChats">
          <a class="history-item" data-chat="suggestion">B0GWTWVWYF 广告诊断</a>
          <a class="history-item" data-chat="analysis">Q2 广告整体复盘</a>
          <a class="history-item" data-chat="analysis">美国站 5月投放分析</a>
          <a class="history-item" data-chat="suggestion">B0CRXXX 建议报告</a>
        </div>
        <div class="history-refresh-status" id="historyRefreshStatus" aria-live="polite"></div>
      </div>

      <div class="sidebar-divider"></div>

      <!-- Nav -->
      <a class="nav-item" id="nav-ops" data-route="operations">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
        运营中心
      </a>
      <a class="nav-item" id="nav-schedules" data-route="schedules">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
        定时任务
      </a>
      <a class="nav-item" id="nav-strategy" data-route="chat">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        策略中心
      </a>
      <a class="nav-item" id="nav-skills" data-route="skills">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg>
        技能库
      </a>
      <a class="nav-item" id="nav-connector" data-route="chat">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
        连接器
      </a>

    </div>

    <!-- Footer -->
    <div class="sidebar-footer">
      <a class="nav-item" id="nav-settings" data-route="settings">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
        设置
      </a>
      <a class="user-card" data-route="profile" data-usage-tip="今日积分：126 / 200 · 点击查看使用情况" aria-label="查看个人使用情况">
        <div class="user-avatar">杨</div>
        <span class="user-name">杨修瑛</span>
        <span class="user-usage-dot" aria-hidden="true"></span>
      </a>
    </div>
  `;
    const toggle = sidebar.querySelector('.sidebar-toggle');
    const backdrop = document.createElement('button');
    backdrop.className = 'sidebar-backdrop';
    backdrop.type = 'button';
    backdrop.setAttribute('aria-label', '收起侧边栏');
    backdrop.tabIndex = -1;
    sidebar.after(backdrop);
    // Preserve accessible link names when the compact rail hides text labels.
    sidebar.querySelectorAll('.nav-item, .new-chat-btn').forEach(link => {
      const label = link.textContent.trim();
      const caption = document.createElement('span');
      caption.className = 'sidebar-link-label';
      caption.textContent = label;
      [...link.childNodes].filter(node => node.nodeType === Node.TEXT_NODE).forEach(node => node.remove());
      link.append(caption);
      link.setAttribute('aria-label', label);
      link.title = label;
    });
    function syncSidebarLinks() {
      sidebar.querySelectorAll('a[href]').forEach(link => {
        const url = new URL(link.href);
        url.searchParams.set('sidebar', collapsed ? 'collapsed' : 'expanded');
        link.href = url.href;
      });
    }
    function applySidebarState(persist = false) {
      document.documentElement.dataset.sidebarCollapsed = String(collapsed);
      toggle.setAttribute('aria-expanded', String(!collapsed));
      toggle.setAttribute('aria-label', collapsed ? '展开侧边栏' : '收起侧边栏');
      toggle.title = collapsed ? '展开侧边栏' : '收起侧边栏';
      backdrop.hidden = collapsed || !narrowScreen.matches;
      if (persist) {
        try { localStorage.setItem(stateKey, String(collapsed)); } catch (error) { /* URL links carry state for local files. */ }
        try {
          const url = new URL(location.href);
          url.searchParams.set('sidebar', collapsed ? 'collapsed' : 'expanded');
          history.replaceState(history.state, '', url);
        } catch (error) { /* Some file viewers restrict history updates. */ }
      }
      syncSidebarLinks();
    }
    toggle.addEventListener('click', () => { collapsed = !collapsed; applySidebarState(true); });
    backdrop.addEventListener('click', () => { collapsed = true; applySidebarState(true); toggle.focus(); });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && narrowScreen.matches && !collapsed) {
        collapsed = true; applySidebarState(true); toggle.focus();
      }
    });
    narrowScreen.addEventListener('change', () => applySidebarState());
    window.addEventListener('storage', event => {
      if (event.key === stateKey) { collapsed = event.newValue === 'true'; applySidebarState(); }
    });
    sidebar.querySelectorAll('[data-route]').forEach(link => {
      link.href = new URL(routes[link.dataset.route], rootURL).href;
    });
    const current = {chat: 'nav-chat', skills: 'nav-skills', operations: 'nav-ops', schedules: 'nav-schedules', settings: 'nav-settings'}[sidebar.dataset.page];
    const active = sidebar.dataset.page === 'profile' ? sidebar.querySelector('.user-card') : current ? sidebar.querySelector(`#${current}`) : null;
    if (active) {
      active.classList.add('active');
      active.setAttribute('aria-current', 'page');
    }
    sidebar.querySelectorAll('[data-chat]').forEach(link => {
      const url = new URL(routes.chat, rootURL);
      url.searchParams.set('chat', link.dataset.chat);
      link.href = url.href;
    });
    function renderScheduleSessions() {
      sidebar.querySelectorAll('[data-schedule-session]').forEach(link => link.remove());
      let recent = [], runs = window.xiaozhiScheduleDemoRuns;
      try {
        const storedRecent = JSON.parse(localStorage.getItem('xiaozhi-schedule-recent') || '[]');
        if (Array.isArray(storedRecent)) recent = storedRecent;
        const saved = JSON.parse(localStorage.getItem('xiaozhi-schedules-v1'));
        if (Array.isArray(saved?.runs)) runs = saved.runs;
      } catch (error) { /* Demo entries remain available without storage. */ }
      const local = new Date(Date.now() + 8 * 3600000), day = local.getUTCDate();
      local.setUTCDate(1);
      local.setUTCMonth(local.getUTCMonth() - 3);
      local.setUTCDate(Math.min(day, new Date(Date.UTC(local.getUTCFullYear(), local.getUTCMonth() + 1, 0)).getUTCDate()));
      const cutoff = local.toISOString().slice(0, 16).replace('T', ' ');
      const currentSession = new URLSearchParams(location.search).get('session');
      const executions = runs.filter(item => item && typeof item.time === 'string' && item.time >= cutoff)
        .sort((a, b) => b.time.localeCompare(a.time));
      const currentRun = executions.find(item => item.id === currentSession);
      const entries = [
        ...(currentRun ? [{...currentRun, execution: true}] : []),
        ...executions.filter(item => item.id !== currentSession).slice(0, currentRun ? 1 : 2).map(item => ({...item, execution: true})),
        ...recent.filter(item => item && typeof item.id === 'string').slice(0, 3)
      ];
      entries.reverse().forEach(item => {
          const link = document.createElement('a');
          link.className = 'history-item';
          link.dataset.scheduleSession = item.id;
          const label = document.createElement('span');
          label.className = 'history-item-label';
          const title = document.createElement('span');
          title.className = 'history-item-title';
          title.textContent = item.name;
          label.append(title);
          link.append(label);
          if (item.execution) {
            const time = document.createElement('span');
            time.className = 'history-item-meta';
            time.textContent = item.time.slice(5);
            label.append(time);
            const badge = document.createElement('span');
            badge.className = 'history-schedule-badge';
            badge.textContent = '定时';
            link.append(badge);
            link.title = `${item.name} · 定时任务 · ${item.time}（北京时间）`;
            link.setAttribute('aria-label', link.title);
          }
          if (item.id === currentSession) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'true');
          }
          const url = new URL(item.execution ? routes.schedules : routes.chat, rootURL);
          url.searchParams.set('session', item.id);
          if (!item.execution) url.searchParams.set('skill', 'scheduled-task-create');
          link.href = url.href;
          sidebar.querySelector('#recentChats').prepend(link);
      });
      syncSidebarLinks();
    }
    renderScheduleSessions();
    applySidebarState();
    window.addEventListener('schedule-sessions-changed', renderScheduleSessions);
    window.addEventListener('storage', event => {
      if (['xiaozhi-schedules-v1', 'xiaozhi-schedule-recent'].includes(event.key)) renderScheduleSessions();
    });
    const button = sidebar.querySelector('#historyRefreshBtn');
    button.addEventListener('click', () => {
      if (button.disabled) return;
      button.disabled = true;
      button.classList.add('is-refreshing');
      sidebar.querySelector('#historyRefreshStatus').textContent = '正在刷新…';
      setTimeout(() => {
        button.disabled = false;
        button.classList.remove('is-refreshing');
        sidebar.querySelector('#historyRefreshStatus').textContent = '刚刚更新';
      }, 350);
    });
    // Match the demo usage displayed by the conversation page.
    try {
      const saved = JSON.parse(localStorage.getItem('xiaozhi-usage-demo'));
      const used = saved && saved.date === new Date().toISOString().slice(0, 10) && Number.isFinite(saved.used) ? saved.used : 74;
      const remaining = Math.max(0, 200 - used);
      sidebar.querySelector('.user-card').dataset.usageTip = `今日积分：${remaining} / 200\n剩余 ${Math.round(remaining / 2)}% · 点击查看使用情况`;
    } catch (error) { /* Local files can have storage disabled. */ }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSidebar);
  } else {
    initSidebar();
  }
})();
