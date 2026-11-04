/* Dadyaran directory UI preview - illustrative data only. No real lawyers or backend. */
const mockLawyers=[
{id:1,name:'وکیل نمونه الف',city:'مشهد',gender:'male',specialties:['کیفری','خانواده','ملکی'],tier:'vip',years:14,remote:true,verified:true},
{id:2,name:'وکیل نمونه ب',city:'مشهد',gender:'female',specialties:['کیفری','مالی'],tier:'vip',years:9,remote:true,verified:true},
{id:3,name:'وکیل نمونه ج',city:'مشهد',gender:'male',specialties:['کیفری','ملکی'],tier:'vip',years:11,remote:false,verified:false},
{id:4,name:'وکیل نمونه د',city:'مشهد',gender:'female',specialties:['کیفری','خانواده'],tier:'star',years:8,remote:true,verified:true},
{id:5,name:'وکیل نمونه هـ',city:'مشهد',gender:'male',specialties:['کیفری','کار'],tier:'star',years:17,remote:false,verified:true},
{id:6,name:'وکیل نمونه و',city:'مشهد',gender:'female',specialties:['کیفری','مالی'],tier:'free',years:7,remote:true,verified:false},
{id:7,name:'وکیل نمونه ز',city:'مشهد',gender:'male',specialties:['کیفری','ملکی'],tier:'free',years:5,remote:false,verified:true},
{id:8,name:'وکیل نمونه ح',city:'مشهد',gender:'female',specialties:['خانواده','ملکی'],tier:'vip',years:16,remote:true,verified:true},
{id:9,name:'وکیل نمونه ط',city:'مشهد',gender:'male',specialties:['مالی','کار'],tier:'star',years:13,remote:true,verified:true}
];
const $=s=>document.querySelector(s);
const fa=n=>Number(n).toLocaleString('fa-IR');
const state={city:'مشهد',specialty:'کیفری',name:'',sort:'default',tiers:[],remote:false,compare:[],saved:new Set()};
const tierText={vip:'✦ ویژه VIP',star:'★ ستاره‌دار',free:''};
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function matches(l){return l.city===state.city&&(state.specialty==='all'||l.specialties.includes(state.specialty))&&(!state.name||l.name.includes(state.name))&&(!state.tiers.length||state.tiers.includes(l.tier))&&(!state.remote||l.remote)}
function avatar(l){return '<div class="avatar '+(l.gender==='female'?'female':'')+'" aria-hidden="true">'+(l.gender==='female'?'♀':'⚖')+'</div>'}
function card(l){return '<article class="lawyer-card '+(l.tier==='vip'?'vip':'')+'">'+
'<div class="card-top">'+avatar(l)+'<div class="card-info"><div class="card-name">'+esc(l.name)+(l.tier!=='free'?'<span class="tier-label '+l.tier+'">'+tierText[l.tier]+'</span>':'')+'</div><div class="card-role">وکیل پایه یک دادگستری · نمونه آزمایشی</div>'+(l.verified?'<div class="verified">✓ پروانه بررسی‌شده (نمایشی)</div>':'<div class="not-verified">وضعیت بررسی پروانه: نامشخص</div>')+'</div></div>'+
'<div class="card-meta"><span>⌖ '+esc(l.city)+'</span><span>◷ '+fa(l.years)+' سال سابقه نمونه</span>'+(l.remote?'<span>◉ مشاوره غیرحضوری</span>':'')+'</div>'+
'<div class="specialty-tags">'+l.specialties.map(s=>'<span class="specialty-tag">'+esc(s)+'</span>').join('')+'</div>'+
'<div class="card-actions"><button type="button" class="card-detail" data-profile="'+l.id+'">مشاهده پروفایل ←</button><div class="card-secondary-actions"><button type="button" class="icon-btn '+(state.saved.has(l.id)?'saved':'')+'" data-save="'+l.id+'" aria-label="ذخیره وکیل" title="ذخیره وکیل">'+(state.saved.has(l.id)?'♥':'♡')+'</button><button type="button" class="icon-btn '+(state.compare.includes(l.id)?'compared':'')+'" data-compare="'+l.id+'" aria-label="مقایسه وکیل" title="افزودن به مقایسه">'+(state.compare.includes(l.id)?'☑':'☐')+'</button></div></div></article>'}
function render(){
const result=mockLawyers.filter(matches);
if(state.sort==='experience')result.sort((a,b)=>b.years-a.years);
if(state.sort==='name')result.sort((a,b)=>a.name.localeCompare(b.name,'fa'));
$('#resultsTitle').textContent='وکلای '+(state.specialty==='all'?'':state.specialty+' ')+'در '+state.city;
$('#crumbCity').textContent=state.city;$('#crumbSpecialty').textContent='وکلای '+(state.specialty==='all'?'همه تخصص‌ها':state.specialty);$('#vipCity').textContent=state.city;
$('#resultCount').textContent=fa(result.length);
$('#resultsGrid').innerHTML=result.map(card).join('');
$('#emptyState').hidden=result.length!==0;
const vip=mockLawyers.filter(l=>l.tier==='vip'&&l.city===state.city&&(state.specialty==='all'||l.specialties.includes(state.specialty)));
$('#vipGrid').innerHTML=vip.length?vip.map(card).join(''):'<div class="filter-info" style="grid-column:1/-1;margin:0">در این پیش‌نمایش، وکیل VIP مرتبطی برای این انتخاب وجود ندارد.</div>';
$('#compareBar').hidden=state.compare.length===0;
$('#compareLabel').textContent=fa(state.compare.length)+' وکیل برای مقایسه انتخاب شده';
$('#compareOpen').disabled=state.compare.length<2;
}
function readFilters() {state.city=$('#citySelect').value;state.specialty=$('#specialtySelect').value;state.name=$('#nameSearch').value.trim();state.tiers=[...document.querySelectorAll('.tier-filter:checked')].map(e=>e.value);state.remote=$('#remoteOnly').checked;state.sort=$('#sortSelect').value;render()}
function reset(){state.tiers=[];state.remote=false;document.querySelectorAll('.tier-filter').forEach(x=>x.checked=false);$('#remoteOnly').checked=false;$('#nameSearch').value='';state.name='';state.sort='default';$('#sortSelect').value='default';render()}
function openModal(html){$('#dialogBody').innerHTML=html;$('#modalOverlay').hidden=false;document.body.style.overflow='hidden';$('#dialogClose').focus()}
function closeModal(){$('#modalOverlay').hidden=true;document.body.style.overflow=''}
function showProfile(id){const l=mockLawyers.find(l=>l.id===id);if(!l)return;openModal('<div class="dialog-profile-head">'+avatar(l)+'<div><h2 id="dialogTitle">'+esc(l.name)+'</h2><p>پروفایل نمایشی وکیل · '+esc(l.city)+'</p>'+(l.tier!=='free'?'<span class="tier-label '+l.tier+'">'+tierText[l.tier]+'</span>':'')+'</div></div><div class="dialog-data"><div><span>شهر فعالیت</span><strong>'+esc(l.city)+'</strong></div><div><span>حوزه‌های فعالیت</span><strong>'+l.specialties.join('، ')+'</strong></div><div><span>سابقه نمونه</span><strong>'+fa(l.years)+' سال</strong></div><div><span>امکان مشاوره غیرحضوری</span><strong>'+(l.remote?'بله':'ثبت نشده')+'</strong></div><div><span>وضعیت بررسی پروانه (نمایشی)</span><strong>'+(l.verified?'بررسی‌شده':'نامشخص')+'</strong></div><div><span>نوع عضویت</span><strong>'+(l.tier==='vip'?'VIP':l.tier==='star'?'ستاره‌دار':'عادی')+'</strong></div></div><p class="dialog-note">این یک پاپ‌آپ آزمایشی است. نام، سابقه و وضعیت بررسی پروانه ساختگی هستند. در محصول نهایی اطلاعات از افزونه دریافت می‌شوند و پروفایل، URL مستقل خواهد داشت.</p>')}
function showCompare(){const chosen=state.compare.map(id=>mockLawyers.find(l=>l.id===id)).filter(Boolean);if(chosen.length<2)return;
const rows=[['سابقه',l=>fa(l.years)+' سال'],['حوزه‌های فعالیت',l=>l.specialties.join('، ')],['مشاوره غیرحضوری',l=>l.remote?'بله':'ثبت نشده'],['پروانه',l=>l.verified?'بررسی‌شده (نمایشی)':'نامشخص'],['عضویت تجاری',l=>l.tier==='vip'?'VIP':l.tier==='star'?'ستاره‌دار':'عادی']];
openModal('<h2 class="modal-title" id="dialogTitle">مقایسه وکلا</h2><div class="compare-scroll"><table class="compare-table"><thead><tr><th>مشخصات</th>'+chosen.map(l=>'<th>'+esc(l.name)+'</th>').join('')+'</tr></thead><tbody>'+rows.map(([label,get])=>'<tr><th>'+label+'</th>'+chosen.map(l=>'<td>'+esc(get(l))+'</td>').join('')+'</tr>').join('')+'</tbody></table></div><p class="modal-footer-note">این مقایسه با داده‌های کاملاً ساختگی انجام شده است و صرفاً برای آزمایش رابط کاربری است.</p>')}
document.addEventListener('click',e=>{const p=e.target.closest('[data-profile]');if(p){showProfile(Number(p.dataset.profile));return}const s=e.target.closest('[data-save]');if(s){const id=Number(s.dataset.save);state.saved.has(id)?state.saved.delete(id):state.saved.add(id);render();return}const c=e.target.closest('[data-compare]');if(c){const id=Number(c.dataset.compare);if(state.compare.includes(id))state.compare=state.compare.filter(x=>x!==id);else if(state.compare.length<3)state.compare.push(id);else{alert('حداکثر سه وکیل را می‌توانید مقایسه کنید.');return}render();return}});
$('#searchForm').addEventListener('submit',e=>{e.preventDefault();readFilters();$('#specialties').scrollIntoView({behavior:'smooth',block:'start'})});
$('#sortSelect').addEventListener('change',readFilters);document.querySelectorAll('.tier-filter').forEach(x=>x.addEventListener('change',readFilters));$('#remoteOnly').addEventListener('change',readFilters);
$('#clearFilters').addEventListener('click',reset);$('#emptyReset').addEventListener('click',reset);
$('#filtersToggle').addEventListener('click',()=>{$('#filtersPanel').classList.toggle('expanded')});
$('#dialogClose').addEventListener('click',closeModal);$('#modalOverlay').addEventListener('click',e=>{if(e.target.id==='modalOverlay')closeModal()});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});
$('#compareOpen').addEventListener('click',showCompare);$('#compareClear').addEventListener('click',()=>{state.compare=[];render()});
render();
