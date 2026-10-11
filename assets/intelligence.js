// Travel intelligence: editorial facts, source-linked automated RSS, and community discovery.
// Automatically ingested feed titles are not reviews and are not editorially classified.
const escapeText=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','>':'&gt',"'":'&#39;'}[c]));
const safeHref=x=>{try{const u=new URL(x);return ['https:','http:'].includes(u.protocol)?u.href:'#';}catch{return '#';}};
let mode='all',dataset=null,automatic=null,loading=null;
const base=new URL('../macau/',import.meta.url);
async function pull(){
  if(!loading)loading=Promise.allSettled(['intelligence.json','live-news.json'].map(n=>fetch(new URL(n,base),{cache:'no-store'}).then(r=>{if(!r.ok)throw Error('HTTP '+r.status);return r.json();}))).then(results=>{
    dataset=results[0].status==='fulfilled'?results[0].value:null;
    automatic=results[1].status==='fulfilled'?results[1].value:null;
  }).finally(()=>{loading=null;});
  await loading;
}
const anchor=(url,label)=>'<a href="'+escapeText(safeHref(url))+'" target="_blank" rel="noopener noreferrer">'+escapeText(label)+' ↗</a>';
function story(x,automated=false){
  const impact=automated?'neutral':(x.impact==='risk'?'risk':'positive');
  const name={positive:'Cơ hội trải nghiệm',risk:'Cần lưu ý',neutral:'Tin tự động · chưa phân loại'}[impact];
  return '<article class="intel-card intel-'+impact+'"><div class="intel-meta"><span class="intel-label">'+name+'</span><span>'+escapeText(x.date||'Không rõ ngày')+'</span><span>'+escapeText(x.kind||x.source||'Tin tức')+'</span></div><h3>'+escapeText(x.title)+'</h3><p>'+escapeText(x.summary||'Đây là tiêu đề nguồn. Mở bài gốc để kiểm chứng trước khi quyết định.')+'</p><div class="intel-footer"><span>'+escapeText(x.source||'Nguồn chưa rõ')+'</span>'+anchor(x.url,'Bài gốc')+'</div></article>';
}
function draw(){
  const host=document.getElementById('intel-dynamic');
  if(!host)return;
  if(!dataset){host.innerHTML='<div class="info-strip warning"><span>ⓘ</span><div>Chưa tải được dữ liệu; hãy thử lại khi có Internet. '+anchor('https://www.macaotourism.gov.mo/en/events/calendar','Lịch sự kiện chính thức')+'</div></div>';return;}
  const manual=Array.isArray(dataset.stories)?dataset.stories:[];
  const news=Array.isArray(automatic?.items)?automatic.items:[];
  const available=[...manual.map(x=>({...x,automated:false})),...news.map(x=>({...x,automated:true,impact:'neutral'}))].filter(x=>mode==='all'||x.impact===mode).sort((a,b)=>(b.date||'').localeCompare(a.date||'')).slice(0,38);
  const itemList=available.map(x=>story(x,x.automated)).join('')||'<div class="empty">Không có bài phù hợp. Không tự thêm tin giả để đủ số lượng tích cực/tiêu cực.</div>';
  host.innerHTML='<div class="intel-status"><strong>'+manual.length+' tin biên tập · '+news.length+' tin RSS tự động</strong><span>RSS cập nhật: '+escapeText(automatic?.updatedAt?new Date(automatic.updatedAt).toLocaleString('vi-VN'):'chưa chạy hoặc không có kết quả')+'</span></div><div class="intel-feed">'+itemList+'</div>'+
  '<div class="panel" style="margin-top:25px"><h3>Ý kiến và review người đi thực tế</h3><p class="subtle">Không gán điểm sao giả. Link mở nội dung gốc, không xác minh người viết thực sự đã đến Macau; review mang tính chủ quan và có thể thiên lệch.</p><div class="intel-community">'+(dataset.community||[]).map(x=>'<div class="review-source"><div><strong>'+escapeText(x.title)+'</strong><small>'+escapeText(x.platform)+' · '+escapeText(x.date)+' · Chưa xác minh người viết</small><p>'+escapeText(x.context)+'</p></div>'+anchor(x.url,'Đọc thảo luận')+'</div>').join('')+'</div><h3 style="margin-top:22px">Khám phá nhận xét mới tại nguồn</h3><div class="intel-links">'+(dataset.discovery||[]).map(x=>anchor(x.url,x.title)).join('')+'</div></div>'+
  '<p class="subtle" style="margin-top:17px">Minh bạch: tin chính thức có thể chưa phản ánh cảm nhận du khách; tin RSS được thu thập tự động, không phải kiểm chứng thực tế hoặc review; một số bài có thể quá hạn hoặc thiếu bối cảnh. Đối chiếu ngày xảy ra sự kiện với ngày đăng.</p>';
  document.querySelectorAll('[data-intel-filter]').forEach(x=>{x.classList.toggle('selected',x.dataset.intelFilter===mode);x.setAttribute('aria-pressed',String(x.dataset.intelFilter===mode));});
}
export function renderInsights(){
  return '<div class="section-header"><div><div class="eyebrow">TRAVEL INTELLIGENCE · BALANCED COVERAGE</div><h2>Sự kiện mới & góc nhìn đa chiều</h2><p>Có cả cơ hội trải nghiệm lẫn vấn đề cần đề phòng. Không chọn lọc chỉ những tin “đẹp”; tất cả bài đều có nguồn và ngày.</p></div></div>'+
  '<div class="info-strip"><span>◎</span><div><strong>Tiêu chuẩn trung tính</strong>“Tích cực” và “cần lưu ý” là nhãn về tác động với chuyến đi, không phải chấm điểm thành phố. Tin RSS chưa kiểm chứng được để trung tính; ý kiến cộng đồng hiển thị tách riêng với tin chính thức.</div></div>'+
  '<div class="control-bar" role="group" aria-label="Lọc tin tức"><button class="chip '+(mode==='all'?'selected':'')+'" data-intel-filter="all">Tất cả</button><button class="chip '+(mode==='positive'?'selected':'')+'" data-intel-filter="positive">Trải nghiệm tích cực</button><button class="chip '+(mode==='risk'?'selected':'')+'" data-intel-filter="risk">Cảnh báo / tiêu cực</button><button class="chip '+(mode==='neutral'?'selected':'')+'" data-intel-filter="neutral">Tin RSS chưa phân loại</button><button class="chip" id="intel-refresh">↻ Tải lại</button></div>'+
  '<div id="intel-dynamic"><div class="empty">Đang tải nguồn tin…</div></div>';
}
export async function activateInsights(){
  const root=document.getElementById('tab-content');
  if(!root||!document.getElementById('intel-dynamic'))return;
  root.querySelectorAll('[data-intel-filter]').forEach(el=>el.addEventListener('click',()=>{mode=el.dataset.intelFilter;draw();}));
  const reload=document.getElementById('intel-refresh');
  if(reload)reload.addEventListener('click',async()=>{dataset=null;automatic=null;document.getElementById('intel-dynamic').innerHTML='<div class="empty">Đang cập nhật dữ liệu…</div>';await pull();draw();});
  if(!dataset)await pull();
  draw();
}
