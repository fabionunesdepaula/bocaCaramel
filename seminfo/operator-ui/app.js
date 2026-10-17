'use strict';
let state, csrf, dirty = false, activeCheck, seenJob;
const $ = id => document.getElementById(id);
const labels = {start:'Iniciar mesa',stop:'Parar mesa',prepare:'Preparar prova',verify:'Verificar instalação',backup:'Criar e testar backup','restore-check':'Conferir backup',restore:'Restaurar backup',activate:'Ativar prova','publish-score':'Publicar resultado final','install-autostart':'Instalar início automático',initialize:'Conferir pasta privada',attest:'Registrar ensaio',pair:'Adicionar sala','pair-local':'Adicionar esta sala','open-hub':'Preparar central de salas'};
const confirmations = {
 stop:['PARAR','O BOCA e o juiz serão parados. Os computadores das equipes perderão o acesso até que a mesa seja iniciada novamente.'],
 prepare:['PREPARAR','Aplica horários e contas em uma prova inativa. Só é permitido antes de receber submissões. Confira as configurações salvas antes de continuar.'],
 activate:['ATIVAR','Ativa somente a prova desta categoria, com seus horários e questões. A central conferirá as seis homologações, rede, compiladores, serviços e presença de questões. A outra banca é independente.'],
 'publish-score':['PUBLICAR','Libera os resultados desta categoria que estavam ocultos pelo congelamento. Exige fim desta prova, nenhum julgamento pendente e conferência com seu BOCA. Não aguarda a publicação da outra categoria.'],
 restore:['RESTAURAR','Recupera o backup selecionado em uma instalação vazia. Não substitui uma prova existente. Peça apoio técnico para retomar em outro computador.'],
 'install-autostart':['INSTALAR','Instala o firewall da mesa e o início da banca no logon deste organizador. A banca será parada e reiniciada; faça antes da prova. O Docker Desktop precisa estar instalado e aberto.']
};
function node(tag, text, className) { const n = document.createElement(tag); if(text !== undefined) n.textContent=text; if(className) n.className=className; return n; }
function notice(message,error=false) { $('notice').hidden=false; $('notice').textContent=message; $('notice').className='notice'+(error?' error':''); }
async function api(path,data) {
 const response = await fetch(path,data === undefined ? {cache:'no-store'} : {method:'POST',headers:{'Content-Type':'application/json','X-SEMINFO-CSRF':csrf},body:JSON.stringify(data)});
 let result; try {result=await response.json();} catch {throw new Error('A central não respondeu. Abra novamente o atalho Central SEMINFO.');}
 if(!response.ok) throw new Error(result.error || 'Não foi possível concluir a tarefa.');
 return result;
}
function readable(date) { return date ? new Date(date).toLocaleString('pt-BR',{timeZone:'America/Sao_Paulo'}) : 'Data não informada'; }
function setConfig(c) {
 const f=$('config-form');
 for(const key of ['server_ip','subnet','duration_minutes','freeze_minutes_before_end']) f.elements[key].value=c[key] ?? '';
 f.elements.control_ips.value=(c.control_ips || []).join(', ');
 f.elements.start.value=c.start.slice(0,16);
 f.elements.timing_confirmed.checked=c.timing_confirmed === true;
 dirty=false; $('dirty').hidden=true;
}
function render() {
 const c=state.config,r=state.runtime,db=r.database;
 $('profile').value=state.profile; $('room-label').textContent=state.label;
 $('admission-status').textContent=r.admission ? 'Banca funcionando' : r.checking ? 'Conferindo…' : 'Equipes sem acesso';
 $('network-status').textContent=c.server_ip ? `IP da banca: ${c.server_ip}` : 'IP e sub-rede ainda pendentes';
 $('contest-status').textContent=db ? db.active ? 'Prova ativada' : db.prepared ? 'Prova ainda inativa' : 'Prova não preparada' : 'Estado não confirmado';
 $('counts').textContent=db ? `${db.problems} questões · ${db.runs} submissões` : 'Confira o diagnóstico abaixo.';
 $('time-status').textContent=c.timing_confirmed ? `29/10 · ${c.start.slice(11,16)} · ${c.duration_minutes} min` : 'Horários a confirmar';
 $('freeze-status').textContent=c.timing_confirmed ? `Congelamento: ${c.freeze_minutes_before_end} min antes do fim` : 'Início proposto: 13h · duração e congelamento pendentes';
 const blocks=[];
 if(!c.server_ip || !c.subnet) blocks.push('A TI precisa confirmar o IP e a sub-rede da mesa em Preparação da sala.');
 if(!c.timing_confirmed) blocks.push('Confirme os horários antes de ativar a prova.');
 if(r.error) blocks.push('O diagnóstico encontrou uma pendência. Abra os detalhes dos serviços abaixo.');
 if(db && db.active) blocks.push('Prova ativada. A edição de rede e horários permanece bloqueada para preservar o evento.');
 if(!blocks.length && !r.admission) blocks.push('Clique em Iniciar mesa e aguarde a confirmação de funcionamento.');
 $('blocking').textContent=blocks.join(' ');
 $('start').disabled=!!state.job && state.job.status==='running' || !c.server_ip || !c.subnet;
 $('approval-link').setAttribute('aria-disabled',String(!r.admission));
 $('verification').textContent=state.verification_current ? 'Verificação automática aprovada para a configuração atual.' : 'Verificação automática pendente ou desatualizada.';
 const diagnostic=$('diagnostics'); diagnostic.replaceChildren();
 const dl=node('dl');
 for(const [label,value] of [['Docker Desktop',r.docker ? 'Respondendo' : 'Não confirmado'],['Banco de dados',r.services?.['boca-db'] || 'Não confirmado'],['BOCA web',r.services?.['boca-web'] || 'Não confirmado'],['Juiz',r.services?.['boca-jail'] || 'Não confirmado'],['Última consulta',readable(r.checked_at)]]) {dl.append(node('dt',label),node('dd',value));}
 diagnostic.append(dl); if(r.error) diagnostic.append(node('p',r.error,'notice error'));
 const checks=$('checklist'); checks.replaceChildren();
 for(const check of state.checklist) {
  const row=node('div',undefined,'check-row'), info=node('div');
  info.append(node('strong',check.label),node('p',check.instructions));
  info.append(node('span',check.current ? `Aprovado por ${check.operator} · ${readable(check.at)}` : 'Ensaio pendente para esta configuração', 'badge'+(check.current?' ok':'')));
  const b=node('button',check.current ? 'Registrar novo ensaio…' : 'Registrar ensaio executado…','secondary'); b.onclick=()=>openAttest(check); b.disabled=state.job?.status==='running';
  row.append(info,b); checks.append(row);
 }
 const desks=$('desks'); desks.replaceChildren();
 if(!state.desks.length) desks.append(node('li','Nenhuma banca adicionada à central.'));
 for(const d of state.desks) desks.append(node('li',`${d.label} · ${d.can_approve ? 'Aprovações e placar' : 'Somente placar'}`));
 const backups=$('backups'); backups.replaceChildren();
 if(!state.backups.length) backups.append(node('p','Nenhum backup desta sala foi encontrado na pasta do kit.'));
 for(const b of state.backups) {
  const row=node('div',undefined,'backup-row'), info=node('div'), buttons=node('div',undefined,'row');
  info.append(node('strong',readable(b.created)),node('p',b.id),node('span',b.verified?'Restauração isolada já conferida':'Conferência de restauração pendente','badge'+(b.verified?' ok':'')));
  for(const [action,label] of [['restore-check','Verificar novamente'],['restore','Restaurar em destino vazio…']]) {const button=node('button',label,'secondary'); button.onclick=()=>job(action,{backup:b.id}); button.disabled=state.job?.status==='running'; buttons.append(button);}
  row.append(info,buttons); backups.append(row);
 }
 if(!dirty) setConfig(c);
 $('config-form').querySelectorAll('input,textarea,button').forEach(e=>e.disabled=state.job?.status==='running' || !!db?.active || !!db?.runs || !!r.admission);
 $('profile').disabled=state.job?.status==='running';
 document.querySelectorAll('[data-action]').forEach(b=>{b.disabled=state.job?.status==='running' || b.id==='start' && (!c.server_ip || !c.subnet);});
 const j=state.job; $('job').hidden=!j;
 if(j) {
  $('job').className='job '+j.status;
  $('job-title').textContent=`${labels[j.action] || 'Tarefa'} · Lab ${j.profile==='si'?'3 / SI':'4 / TII'} · ${j.status==='running'?'Em andamento':j.status==='done'?'Concluído':'Não concluído'}`;
  $('job-message').textContent=j.message; $('job-recovery').textContent=j.recovery || '';
  if(seenJob!==j.id+':'+j.status) {seenJob=j.id+':'+j.status; if(j.status!=='running') $('job').scrollIntoView({behavior:'smooth',block:'nearest'});}
 }
}
async function refresh() {try {const next=await api('/api/state'); if(state && next.profile!==state.profile) dirty=false; state=next; csrf=state.csrf; render();} catch(e) {notice(e.message,true);}}
function confirmAction(title,description,word) {
 return new Promise(resolve=>{
  const dialog=$('confirmation'); $('confirm-title').textContent=title; $('confirm-description').textContent=description; $('confirm-lab').textContent=`Mesa selecionada: ${state.label}`;
  $('confirm-word').textContent=word; $('confirm-input').value=''; $('confirm-button').disabled=true;
  $('confirm-input').oninput=()=>{$('confirm-button').disabled=$('confirm-input').value!==word;};
  dialog.returnValue=''; dialog.onclose=()=>resolve(dialog.returnValue==='ok' && $('confirm-input').value===word); dialog.showModal(); $('confirm-input').focus();
 });
}
async function job(action,extra={}) {
 try {
  if(dirty && ['start','prepare','activate'].includes(action)) {notice('Há alterações não salvas. Salve ou recarregue a configuração antes de continuar.',true); return;}
  const rule=confirmations[action];
  if(rule) {const word=`${rule[0]} LAB ${state.config.lab}`; let details=rule[1]+(extra.backup ? ` Backup: ${extra.backup}.` : ''); if(action==='activate') {const pending=state.checklist.filter(c=>!c.current).map(c=>c.label); if(pending.length)details+=' Ensaios ainda pendentes: '+pending.join('; ')+'.';} if(!await confirmAction(labels[action],details,word)) return; extra.confirmation=word;}
  const result=await api('/api/job',{action,...extra}); notice(result.message); await refresh();
 } catch(e) {notice(e.message,true);}
}
function openAttest(check) {activeCheck=check.id; $('attest-title').textContent=check.label; $('attest-instructions').textContent=check.instructions; $('attest-form').reset(); $('attest-dialog').showModal();}
document.querySelectorAll('[data-action]').forEach(b=>b.addEventListener('click',()=>job(b.dataset.action)));
document.querySelectorAll('[data-tab]').forEach(b=>b.addEventListener('click',()=>{
 document.querySelectorAll('.tab-panel').forEach(p=>p.hidden=p.id!==b.dataset.tab);
 document.querySelectorAll('[data-tab]').forEach(t=>{t.classList.toggle('active',t===b);t.setAttribute('aria-selected',String(t===b));});
}));
$('profile').onchange=async e=>{try {if(dirty && !await confirmAction('Trocar a mesa selecionada','As alterações não salvas no formulário serão descartadas. A troca de seleção não inicia nem para serviços.','TROCAR MESA')) {e.target.value=state.profile; return;} await api('/api/select',{profile:e.target.value}); dirty=false; await refresh();} catch(err) {notice(err.message,true); e.target.value=state.profile;}};
$('refresh').onclick=async()=>{try {notice((await api('/api/refresh',{})).message);} catch(e) {notice(e.message,true);}};
$('config-form').oninput=()=>{dirty=true;$('dirty').hidden=false;};
$('config-form').onsubmit=async e=>{e.preventDefault();try {const f=e.target; const data=Object.fromEntries(new FormData(f)); data.timing_confirmed=f.elements.timing_confirmed.checked; const result=await api('/api/config',data); dirty=false; notice(result.message); await refresh();} catch(err) {notice(err.message,true);}};
$('attest-cancel').onclick=()=>$('attest-dialog').close();
$('attest-form').onsubmit=async e=>{e.preventDefault();const data=Object.fromEntries(new FormData(e.target)); data.performed=e.target.elements.performed.checked; $('attest-dialog').close(); await job('attest',{...data,check:activeCheck});};
$('pair-file').onchange=async e=>{try {const f=e.target.files[0]; if(!f)return; if(f.size>16000)throw new Error('Selecione o arquivo JSON de pareamento exportado pela banca.'); await job('pair',{descriptor:await f.text()});} catch(err) {notice(err.message,true);} finally {e.target.value='';}};
$('export-pair').onclick=async()=>{try {if(!await confirmAction('Exportar arquivo privado de pareamento','O arquivo permite somente consultar o placar desta categoria. A outra banca não receberá poderes para aprovar equipes. Compartilhe somente com a organização.','EXPORTAR PAREAMENTO'))return; const result=await api('/api/descriptor',{confirmation:'EXPORTAR PAREAMENTO'}); const url=URL.createObjectURL(new Blob([result.content],{type:'application/json'})); const a=node('a'); a.href=url; a.download=state.profile+'-'+result.filename; a.click(); setTimeout(()=>URL.revokeObjectURL(url),1000); notice('Arquivo privado exportado. Adicione-o na central que acompanhará as salas.');} catch(e) {notice(e.message,true);}};
$('credentials').onclick=async()=>{try {if(!await confirmAction('Consultar contas privadas','Desligue a projeção desta tela antes de continuar. A janela será ocultada automaticamente após um minuto.','MOSTRAR SENHAS'))return; const result=await api('/api/credentials',{confirmation:'MOSTRAR SENHAS'}); const table=node('table'), tr=node('tr'); tr.append(node('th','Conta'),node('th','Senha')); table.append(tr); for(const account of result.accounts) {const row=node('tr'); row.append(node('td',account.user),node('td',account.password)); table.append(row);} $('accounts').replaceChildren(table); $('secrets-dialog').showModal(); setTimeout(hideSecrets,60000);} catch(e) {notice(e.message,true);}};
function hideSecrets() {$('accounts').replaceChildren();$('secrets-dialog').close();}
$('hide-secrets').onclick=hideSecrets;
$('secrets-dialog').addEventListener('close',()=>$('accounts').replaceChildren());
document.addEventListener('visibilitychange',()=>{if(document.hidden)hideSecrets();});
window.addEventListener('beforeunload',e=>{if(dirty){e.preventDefault();e.returnValue='';}});
refresh(); setInterval(refresh,4000);
