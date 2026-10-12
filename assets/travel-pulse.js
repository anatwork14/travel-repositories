// Macau Travel Pulse: links and metadata only, not scraped testimonials.
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function href(x){try{const u=new URL(String(x));return ['https:','http:'].includes(u.protocol)?u.href:'#';}catch{return '#';}}
const direct=(url,label,cls='')=>'<a class="'+cls+'" href="'+esc(href(url))+'" target="_blank" rel="noopener noreferrer">'+esc(label)+' ↗</a>';
const base=new URL('../macau/',import.meta.url);
let editorial=null,blogs=null,loading=null,scope='all',expanded=false;
function freshness(value){
 if(!value)return 'Chưa có bản cập nhật thành công';
 const then=Date.parse(value),now=Date.now();
 if(!Number.isFinite(then))return 'Không rõ thời điểm';
 const hours=Math.max(0,Math.floor((now-then)/3600000));
 return hours<1?'Cập nhật gần đây':hours<24?'Dữ liệu từ '+hours+' giờ trước':hours<48?'Dữ liệu từ hôm qua':'Dữ liệu đã '+Math.floor(hours/24)+' ngày · cần kiểm tra nguồn trực tiếp';
}
async function load(force=false){
 if(loading)return loading;
 if(editorial&&!force)return Promise.resolve();
 loading=Promise.allSettled(['travel-hub.json','travel-blogs.json'].map(path=>fetch(new URL(path,base),{cache:'no-store'}).then(r=>{if(!r.ok)throw new Error('HTTP '+r.status);return r.json();})))
 .then(res=>{
  editorial=res[0].status==='fulfilled'?res[0].value:null;
  blogs=res[1].status==='fulfilled'?res[1].value:null;
 }).finally(()=>loading=null);
 return loading;
}
const card=(item,kind,highlight=false)=>{
 const badge=kind==='reddit'?'Reddit · thảo luận':kind==='editorial'?'Bài hướng dẫn đã kiểm tra URL':'RSS · chỉ mục tự động';
 const summary=kind==='feed'?'Đây là tiêu đề từ nguồn tìm kiếm RSS; chưa xác minh nội dung, tác giả hay trải nghiệm thực tế. Mở bài gốc để tự đối chiếu.':item.description||'Bài tham khảo, không phải kết luận đã xác minh.';
 return '<article class="pulse-card '+(highlight?'pulse-featured':'')+'"><div class="pulse-card-meta"><span class="pulse-kind">'+badge+'</span><time datetime="'+esc(item.date||'')+'">'+esc(item.date||'Không rõ ngày')+'</time></div>'+
 '<h3>'+esc(item.title)+'</h3><p>'+esc(summary)+'</p><div class="pulse-card-bottom"><span>'+esc(item.source||'Nguồn chỉ mục')+'</span>'+direct(item.url,kind==='reddit'?'Đọc tại Reddit':'Đọc bài gốc')+'</div></article>';
};
function draw(){
 const root=document.getElementById('pulse-dynamic');if(!root)return;
 if(!editorial){root.innerHTML='<div class="pulse-fallback"><strong>Không tải được danh mục nguồn.</strong><p>Vẫn có thể mở trực tiếp '+direct('https://www.reddit.com/r/Macau/new/','r/Macau bài mới')+' hoặc '+direct('https://www.google.com/search?q=Macau+travel+blog&tbs=qdr:m','tìm blog Macau')+'.</p></div>';return;}
 const picked=editorial.featured||[];
 const recommendedBlogs=picked.filter(x=>x.kind==='guide');
 const reddit=picked.filter(x=>x.kind==='discussion');
 const auto=Array.isArray(blogs?.items)?blogs.items:[];
 const shown=expanded?auto:auto.slice(0,9);
 let content='';
 content+='<div class="pulse-live-status"><div><span class="pulse-status-dot"></span><strong>Khám phá bài viết mới</strong><span>'+esc(freshness(blogs?.updatedAt))+'</span></div><span>'+auto.length+' liên kết RSS · '+(blogs?.sourceCount??0)+' nguồn phản hồi</span></div>';
 if(blogs?.errors?.length)content+='<div class="pulse-hint">Một số nguồn RSS gặp lỗi. Bài cũ có thể còn hiển thị; vui lòng mở link gốc để kiểm tra.</div>';
 if(scope!=='reddit'){
  content+='<section class="pulse-section" data-pulse-group="blog"><div class="pulse-section-title"><div><span class="eyebrow">TRAVEL STORIES · DISCOVERY INDEX</span><h3>Blog, trải nghiệm & cẩm nang mới</h3></div><span class="pulse-count">'+auto.length+' kết quả tự động</span></div>';
  content+='<p class="pulse-disclaimer">Google News RSS là công cụ khám phá liên kết, có thể trộn bài báo và blog. Tiêu đề và ngày đăng là thông tin chỉ mục, <strong>không phải review du khách được xác minh</strong>.</p>';
  content+='<div class="pulse-grid">'+shown.map(x=>card(x,'feed')).join('')+'</div>';
  if(!auto.length)content+='<div class="pulse-empty">Chưa có liên kết mới được RSS trả về. Bạn vẫn có thể đọc các bài đã kiểm tra dưới đây hoặc mở tìm kiếm trực tiếp.</div>';
  if(auto.length>9&&!expanded)content+='<button id="pulse-show-all" type="button" class="pulse-more">Xem thêm '+(auto.length-9)+' bài được tìm thấy ↓</button>';
  content+='<div class="pulse-section-title pulse-secondary"><div><span class="eyebrow">EDITORIAL READING LIST</span><h3>Bài hướng dẫn có URL đã kiểm tra</h3></div></div><div class="pulse-grid">'+recommendedBlogs.map(x=>card(x,'editorial',true)).join('')+'</div></section>';
 }
 if(scope!=='blog'){
  content+='<section class="pulse-section" data-pulse-group="reddit"><div class="pulse-section-title"><div><span class="eyebrow">REDIRECT TO SOURCE · REDDIT</span><h3>Đọc người đi Macau đang bàn gì</h3></div></div>'+
  '<p class="pulse-disclaimer">Các nút dưới đây mở trực tiếp <strong>bài mới nhất / tìm kiếm Reddit</strong>. Người viết có thể chủ quan hoặc cung cấp số liệu sai. Website không sao chép bình luận hay giả lập điểm sao.</p>'+
  '<div class="pulse-topic-grid">'+(editorial.topics||[]).map(topic=>'<a target="_blank" rel="noopener noreferrer" href="'+esc(href(topic.url))+'" class="pulse-topic"><strong>'+esc(topic.title)+'</strong><small>'+esc(topic.subtitle)+'</small><span>Đi tới Reddit ↗</span></a>').join('')+'</div>'+
  '<div class="pulse-section-title pulse-secondary"><div><span class="eyebrow">EXISTING CONVERSATIONS</span><h3>Một số thảo luận để bắt đầu</h3></div></div><div class="pulse-grid">'+reddit.map(x=>card(x,'reddit')).join('')+'</div></section>';
 }
 content+='<section class="pulse-section pulse-resource"><div class="pulse-section-title"><div><span class="eyebrow">SEARCH AT SOURCE</span><h3>Tìm tiếp ở website gốc</h3></div></div><div class="pulse-links">'+(editorial.search||[]).map(x=>'<div><strong>'+esc(x.title)+'</strong><small>'+esc(x.subtitle)+'</small>'+direct(x.url,'Mở tìm kiếm')+'</div>').join('')+'</div></section>';
 content+='<div class="pulse-policy"><strong>Vì sao không crawl Reddit để “live”?</strong> Reddit đã công bố ngừng RSS vào <b>13/11/2026</b>. Website vì vậy liên kết trực tiếp đến các chủ đề và chỉ thu thập siêu dữ liệu từ nguồn RSS công khai khác. Dữ liệu trên trang chỉ được đồng bộ theo lịch; <b>không phải livestream</b>. '+direct(editorial.policy?.announcement,'Chính sách Reddit')+'</div>';
 root.innerHTML=content;
 root.querySelector('#pulse-show-all')?.addEventListener('click',()=>{expanded=true;draw();});
 document.querySelectorAll('[data-pulse-scope]').forEach(b=>{b.classList.toggle('selected',b.dataset.pulseScope===scope);b.setAttribute('aria-pressed',String(b.dataset.pulseScope===scope));});
}
export function renderTravelPulse(){
 return '<div class="pulse-header"><div class="eyebrow">MACAU TRAVEL PULSE · COMMUNITY DISCOVERY</div><h2>Họ đã đi Macau.<br><em>Họ đang kể gì?</em></h2><p>Blog du lịch, bài chia sẻ và thảo luận cộng đồng được gom thành một nơi đọc dễ hiểu. Có ngày, nguồn và link để bạn tự kiểm chứng.</p>'+
 '<div class="pulse-benefits"><span>◎ Nguồn gốc rõ ràng</span><span>⌕ Mở thảo luận trực tiếp</span><span>↻ RSS chạy mỗi 3 giờ (dự kiến)</span></div></div>'+
 '<div class="pulse-toolbar" role="group" aria-label="Chọn loại nội dung"><button type="button" class="chip" data-pulse-scope="all">Tất cả</button><button type="button" class="chip" data-pulse-scope="blog">Blog & hướng dẫn</button><button type="button" class="chip" data-pulse-scope="reddit">Reddit & cộng đồng</button><button type="button" class="chip" id="pulse-reload">↻ Tải dữ liệu đã xuất bản</button></div>'+
 '<div id="pulse-dynamic" aria-live="polite"><div class="pulse-empty">Đang kiểm tra nguồn bài viết…</div></div>';
}
export async function activateTravelPulse(){
 const root=document.getElementById('tab-content');if(!root||!document.getElementById('pulse-dynamic'))return;
 root.querySelectorAll('[data-pulse-scope]').forEach(b=>b.addEventListener('click',()=>{scope=b.dataset.pulseScope;draw();}));
 root.querySelector('#pulse-reload')?.addEventListener('click',async()=>{const live=document.getElementById('pulse-dynamic');if(live)live.innerHTML='<div class="pulse-empty">Đang lấy bản dữ liệu mới nhất từ website…</div>';await load(true);if(document.getElementById('pulse-dynamic'))draw();});
 if(!editorial)await load();
 if(document.getElementById('pulse-dynamic'))draw();
}
