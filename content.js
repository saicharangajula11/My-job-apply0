(() => {
 if (window.__myJobApplyInstalled) return; window.__myJobApplyInstalled=true;
 const norm=s=>(s||'').toLowerCase().replace(/[^a-z0-9+@.]+/g,' ').trim();
 function labelFor(el){
  let parts=[el.getAttribute('aria-label'),el.getAttribute('placeholder'),el.name,el.id,el.getAttribute('autocomplete')];
  if(el.id){const l=document.querySelector(`label[for="${CSS.escape(el.id)}"]`);if(l)parts.push(l.innerText);}
  const parent=el.closest('label');if(parent)parts.push(parent.innerText);
  const p=el.parentElement;if(p)parts.push((p.innerText||'').slice(0,160));
  return norm(parts.filter(Boolean).join(' '));
 }
 function valueFor(el,p){
  const s=labelFor(el);
  if(/confirm|password|captcha|cover letter|salary|expected|notice period|linkedin|portfolio|website|gender|disabil|veteran|ethnic|race|birth|date of birth|authorization|work permit|sponsorship|legally authorized|consent|terms|agree/.test(s))return null;
  if(/email|e mail/.test(s)||el.type==='email')return p.email;
  if(/phone|mobile|telephone|contact number/.test(s)||el.type==='tel')return p.phone;
  if(/full name|your name|candidate name|first and last name/.test(s))return p.name;
  if(/first name|given name/.test(s))return p.name.split(/\s+/)[0]||'';
  if(/last name|surname|family name/.test(s))return p.name.split(/\s+/).slice(1).join(' ');
  if(/city|location|current address|current location/.test(s))return p.city;
  if(/skills|technical summary|professional summary|about you/.test(s))return p.skills;
  return null;
 }
 function setNative(el,val){
  const proto=el instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:el instanceof HTMLSelectElement?HTMLSelectElement.prototype:HTMLInputElement.prototype;
  const setter=Object.getOwnPropertyDescriptor(proto,'value')?.set;
  if(setter)setter.call(el,val);else el.value=val;
  el.dispatchEvent(new Event('input',{bubbles:true}));el.dispatchEvent(new Event('change',{bubbles:true}));
 }
 function fill(profile){
  const fields=[...document.querySelectorAll('input:not([type=hidden]):not([type=submit]):not([type=button]):not([type=checkbox]):not([type=radio]),textarea')].filter(el=>!el.disabled&&!el.readOnly&&el.getClientRects().length);
  let filled=0,skipped=0;
  for(const el of fields){const val=valueFor(el,profile);if(val!==null&&val!==undefined&&String(val).trim()&&!el.value){setNative(el,String(val));filled++;}else if(val!==null)skipped++;}
  return {filled,skipped,fields};
 }
 function submitForm(fields){
  const form=fields.find(x=>x.form)?.form||document.querySelector('form');
  if(!form)return {ok:false,message:'Filled the fields, but could not find an application form to submit.'};
  const buttons=[...form.querySelectorAll('button[type=submit],input[type=submit],button:not([type]),input[type=button]')].filter(b=>!b.disabled&&b.getClientRects().length);
  const submit=buttons.find(b=>/submit|apply|send application|complete application|finish/i.test((b.innerText||'')+' '+(b.value||'')+' '+(b.getAttribute('aria-label')||'')));
  if(!submit)return {ok:false,message:'Filled the fields, but no clearly labelled submit button was found. Please review and submit manually.'};
  const required=[...form.querySelectorAll('input[required],textarea[required],select[required]')].filter(el=>!el.disabled);
  const missing=required.filter(el=>{
   if(el.type==='checkbox') return !el.checked;
   if(el.type==='radio') return !form.querySelector(`input[type="radio"][name="${CSS.escape(el.name)}"]:checked`);
   return !String(el.value||'').trim();
  });
  if(missing.length)return {ok:false,message:`Filled ${filledCount} fields, but ${missing.length} required field(s) remain (possibly a resume upload or required choice). Review and complete them manually before submitting.`};
  submit.click();return {ok:true,message:'Submit button clicked. Check the job site for a success message or confirmation; this extension cannot independently verify receipt.'};
 }
 let filledCount=0;
 chrome.runtime.onMessage.addListener((msg,sender,sendResponse)=>{
  if(msg?.type!=='FILL_JOB_FORM')return;
  const r=fill(msg.profile||{});filledCount=r.filled;
  if(!msg.submit){sendResponse({message:`Filled ${r.filled} field(s). Review every field, attach your resume, and answer any required questions.`});return true;}
  // Explicit action from popup plus checkbox. Never auto-submit merely on page load.
  const result=submitForm(r.fields);
  sendResponse({message:result.message});return true;
 });
})();