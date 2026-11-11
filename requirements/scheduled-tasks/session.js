/* Local prototype adapter for a session with the task-creation skill selected. */
window.scheduleCreationSession = (() => {
  let session = null;
  const storagePrefix = 'xiaozhi-schedule-session:';
  const taskPage = 'requirements/scheduled-tasks/prototype.html';
  const escape = text => String(text ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  function persist() {
    try {
      localStorage.setItem(storagePrefix + session.id, JSON.stringify(session));
      const previous = JSON.parse(localStorage.getItem('xiaozhi-schedule-recent') || '[]');
      const recent = [{id: session.id, name: session.draft?.name || '创建定时任务'}, ...previous.filter(item => item.id !== session.id)].slice(0, 5);
      localStorage.setItem('xiaozhi-schedule-recent', JSON.stringify(recent));
      window.dispatchEvent(new Event('schedule-sessions-changed'));
    } catch (error) { /* A session remains usable when browser storage is disabled. */ }
  }
  function reply(text) { session.messages.push({role: 'assistant', text}); }
  function render() {
    const container = document.getElementById('messages');
    container.innerHTML = session.messages.map(message => message.role === 'user'
      ? userMsg(escape(message.text))
      : aiMsg('<div class="confirm-msg">' + escape(message.text).replace(/\n/g, '<br>') + '</div>')).join('');
    if (session.draft) {
      const link = document.createElement('a');
      link.className = 'schedule-session-confirm';
      const url = new URL(taskPage, location.href);
      url.searchParams.set('sessionDraft', session.id);
      link.href = url.href;
      link.textContent = '核对配置并创建 →';
      container.appendChild(link);
    }
    scrollToBottom();
  }
  function init() {
    const params = new URLSearchParams(location.search);
    if (params.get('skill') !== 'scheduled-task-create' || !params.get('session')) return false;
    const id = params.get('session');
    try { session = JSON.parse(localStorage.getItem(storagePrefix + id)); } catch (error) { session = null; }
    if (!session || session.id !== id || !Array.isArray(session.messages)) {
      session = {id, skill: 'scheduled-task-create', skillName: '定时任务创建', messages: [], draft: null};
      reply('你希望小织定时完成什么工作？告诉我任务内容和执行时间，我会帮你补全配置。');
    }
    document.getElementById('welcomeView').classList.add('hidden');
    document.getElementById('chatView').classList.remove('hidden');
    document.getElementById('chatView').dataset.pageId = 'P004';
    document.getElementById('chatView').dataset.featureId = 'F003';
    closeArtifact();
    const badge = document.getElementById('chatBadge');
    badge.textContent = '新会话';
    document.querySelector('.chat-topbar-title').textContent = '创建定时任务';
    document.querySelector('.artifact-show-btn').classList.add('hidden');
    const composer = document.querySelector('#chatView .input-wrap');
    if (!document.getElementById('scheduleSkillContext')) {
      const context = document.createElement('div');
      context.id = 'scheduleSkillContext';
      context.className = 'schedule-skill-context';
      context.dataset.skillId = 'scheduled-task-create';
      context.innerHTML = '<span class="schedule-skill-chip">✦ 定时任务创建</span><span>已引用 Skill</span>';
      composer.prepend(context);
    }
    const textarea = document.getElementById('chatTextarea');
    textarea.placeholder = '描述你想定时完成的工作…';
    persist();
    render();
    textarea.focus();
    return true;
  }
  function send(text) {
    if (!session) return false;
    session.messages.push({role:'user', text});
    const userText = session.messages.filter(message => message.role === 'user').map(message => message.text).join('\n');
    const matches = pattern => [...userText.matchAll(pattern)].at(-1);
    const frequency = matches(/每(天|日|周|月)/g);
    const hourMatch = matches(/(早上|上午|中午|下午|晚上)?\s*(\d{1,2})(?:点|时)(半|[一二三四五六七八九十\d]+分)?/g);
    let hour = hourMatch ? +hourMatch[2] : null;
    if (hour !== null && /下午|晚上/.test(hourMatch[1] || '') && hour < 12) hour += 12;
    if (hourMatch?.[1] === '中午' && hour < 11) hour += 12;
    const freq = !frequency ? null : frequency[1] === '周' ? 'weekly' : frequency[1] === '月' ? 'monthly' : 'daily';
    const weekday = matches(/(?:周|星期)([一二三四五六日天])/g);
    const monthday = matches(/(?:每月)?\s*(\d{1,2})[号日]/g);
    const named = matches(/(?:任务名称|任务名|名称|叫做|叫)[：:\s“「]*([^\n”」，,。]+)/g);
    const name = named ? named[1].trim() : userText.includes('飞阅') ? '飞阅商品预警报告' : '';
    const missing = [];
    if (!name) missing.push('任务名称（50 字以内）');
    if (!freq) missing.push('执行频率（每天、每周或每月）');
    if (hour === null || hour > 23 || hourMatch?.[3]) missing.push('整点执行时间，例如早上 9 点');
    if (freq === 'weekly' && !weekday) missing.push('每周几执行');
    if (freq === 'monthly' && (!monthday || +monthday[1] < 1 || +monthday[1] > 31)) missing.push('每月几号执行（1–31 日）');
    if (name && Array.from(name).length > 50) missing.push('50 字以内的任务名称');
    if (missing.length) {
      session.draft = null;
      reply('收到，还需要补充：' + missing.join('、') + '。');
    } else {
      session.draft = {name, prompt:userText, freq, day:freq === 'weekly' ? String(weekday[1] === '天' ? 7 : '一二三四五六日'.indexOf(weekday[1]) + 1) : freq === 'monthly' ? monthday[1] : '1', hour:String(hour), channel:'不推送', recipient:'自己', target:'', robot:false, expiry:''};
      const cadence = freq === 'daily' ? '每天' : freq === 'weekly' ? '每周' + weekday[1] : '每月' + monthday[1] + '日';
      reply('已整理任务「' + name + '」：' + cadence + ' ' + String(hour).padStart(2,'0') + ':00（北京时间）。\n点击下方核对配置，可设置过期时间和消息推送；确认后才会创建任务。');
    }
    persist();
    render();
    return true;
  }
  function leave() {
    if (!session) return;
    session = null;
    document.getElementById('scheduleSkillContext')?.remove();
    document.querySelector('.artifact-show-btn')?.classList.remove('hidden');
    const view = document.getElementById('chatView');
    delete view.dataset.pageId;
    delete view.dataset.featureId;
    document.getElementById('chatTextarea').placeholder = '继续提问…';
    history.replaceState(null, '', location.pathname);
  }
  return {init, send, leave};
})();
