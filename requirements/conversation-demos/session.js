/* Shared conversation page adapter; scripts and artifacts remain separate. */
(() => {
  const base = new URL('.', document.currentScript.src);
  const scenes = window.conversationDemoScenes || [];
  let scene = null, timer = null, revision = 0, pending = false, executed = false, finished = false;
  const get = id => document.getElementById(id);
  function clear() {
    revision++; clearTimeout(timer); scene=null; pending=false; executed=false; finished=false;
    const cleanURL=new URL(location.href); if(cleanURL.searchParams.has('demo')){cleanURL.searchParams.delete('demo');history.replaceState(null,'',cleanURL);}
    get('demoControls')?.remove(); get('demoFollowups')?.remove();
  }
  function reply(text) { get('messages').insertAdjacentHTML('beforeend', aiMsg(`<p>${escapeHtml(text)}</p>`)); scrollToBottom(); }
  function choices() {
    const box=get('demoFollowups'); box.replaceChildren();
    scene.followups.forEach(f => {
      if(f.action==='confirm' && (!pending || executed)) return;
      if(f.action==='rollback' && !executed) return;
      const b=document.createElement('button');b.className='demo-button';b.textContent=f.q;b.onclick=()=>send(f.q);box.append(b);
    });
  }
  function openReport() {
    if(!scene) return;
    // Markdown is downloaded as .md; its authored HTML companion is only the preview.
    setArtifact('html',new URL(scene.report || `reports/${scene.id}.html`,base).href,scene.name,`${scene.format}报告 · Mock数据`);
    if(scene.format==='MD') {
      artifactFile=new URL(`reports/${scene.id}.md`,base).href;
      get('artifactFileIcon').textContent='MD';
    }
    openArtifact();
  }
  function complete(token) {
    if(token!==revision || !scene || finished) return;
    finished=true;
    get('messages').querySelector('[data-demo-progress]')?.remove();
    reply(scene.summary);
    const row=document.createElement('div');row.className='demo-followups';
    const b=document.createElement('button');b.className='demo-button primary';b.textContent=`查看${scene.format}报告`;b.onclick=openReport;row.append(b);get('messages').append(row);
    openReport();choices();scrollToBottom();
  }
  function start(id, prompt) {
    const next=scenes.find(s=>s.id===id);if(!next)return false;
    showWelcome(); const demoURL=new URL(location.href);demoURL.searchParams.set('demo',id);history.replaceState(null,'',demoURL); scene=next; activeScenario='conversation-demo';
    get('welcomeView').classList.add('hidden');get('chatView').classList.remove('hidden');
    get('chatBadge').textContent='Mock 演示';get('chatBadge').style.background='var(--color-accent-subtle)';get('chatBadge').style.color='var(--color-accent)';
    document.querySelector('.chat-topbar-title').textContent=scene.name;
    get('messages').innerHTML=userMsg(prompt||scene.prompt);
    reply(`已带入${scene.context}。${scene.report ? "正在整理品线表现、关键异常及行动建议，将生成HTML报告与总结。" : `本次使用固定Mock数据快照，正在生成${scene.format}报告。`}`);
    const controls=document.createElement('div');controls.id='demoControls';controls.className='demo-controls';
    const label=document.createElement('span');label.className='demo-muted';label.textContent=scene.context;controls.append(label);
    [['重新演示',()=>start(scene.id)],['直接看报告',()=>{clearTimeout(timer);complete(revision);}],['场景库',()=>location.href=new URL('prototype.html',base).href]].forEach(([name,fn])=>{const b=document.createElement('button');b.className='demo-button';b.textContent=name;b.onclick=fn;controls.append(b);});
    document.querySelector('.chat-topbar').after(controls);
    const follow=document.createElement('div');follow.id='demoFollowups';follow.className='demo-followups';get('messages').after(follow);
    const progress=document.createElement('div');progress.dataset.demoProgress='';progress.innerHTML=aiMsg('<div class="demo-progress" role="status" aria-live="polite"></div>');get('messages').append(progress);
    const token=revision;let i=0;
    function step(){if(token!==revision)return;progress.querySelector('.demo-progress').textContent=scene.steps[i++];if(i<scene.steps.length)timer=setTimeout(step,650);else timer=setTimeout(()=>complete(token),650);}
    step();get('chatTextarea').value='';return true;
  }
  function send(text) {
    const trigger=scenes.find(s=>s.prompt===text || (s.id==='yangteng-fm' && /扬腾/i.test(text)&&/FM/i.test(text)&&/报告/.test(text)) || (s.id==='feiyue-acos' && /父\s*asin/i.test(text)&&/ACOS/i.test(text)&&/分析|原因/.test(text)));
    if(trigger) return start(trigger.id,text);
    if(!scene)return false;
    if(get('messages').querySelector('[data-demo-progress]')) {clearTimeout(timer);complete(revision);}
    appendUserMessage(text);
    // Specific confirmation branches take precedence over broad execution intent.
    const branch=scene.followups.find(f=>f.action==='rollback' && new RegExp(f.match,'i').test(text)) || scene.followups.find(f=>f.action==='confirm' && new RegExp(f.match,'i').test(text)) || scene.followups.find(f=>new RegExp(f.match,'i').test(text));
    if(!branch) reply('当前演示脚本还未覆盖这个问题。你可以选择下方追问，继续查看证据、建议或复核条件。');
    else if(branch.action==='confirm') {
      if(executed) reply('这条模拟操作已完成，不重复执行。可继续查看复核条件或确认模拟回滚。');
      else if(!pending) reply('请先查看执行方案，确认活动、参数及影响后，再确认模拟执行。');
      else {executed=true;pending=false;reply(branch.a);}
    } else if(branch.action==='rollback') {
      if(!executed)reply('当前没有待回滚的已执行模拟操作。');
      else {executed=false;pending=false;reply(branch.a);}
    } else {
      reply(branch.a);
      if(branch.action==='prepare' && !executed){pending=true;reply('待确认模拟操作｜活动FY-SP-02｜搜索顶部溢价80%→20%｜基础竞价$1.30保持。仅本地模拟，不调用广告接口。请点击“确认模拟执行”继续。');}
    }
    choices();scrollToBottom();return true;
  }
  window.conversationDemoSession={send,leave:clear,init(){const id=new URLSearchParams(location.search).get('demo');return id?start(id):false;},openReport};
})();
