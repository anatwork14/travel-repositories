// Modern Travel Editorial — researched imagery and a genuine multi-destination index.
import {destinations,countryNames,publishedDestinations,destinationSearchText} from './destinations.js';
import {renderPrep,bindPrep} from './travel-checklist.js';
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const norm=x=>String(x??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').toLowerCase().trim();
const commons=(file,width)=>'https://commons.wikimedia.org/wiki/Special:FilePath/'+encodeURIComponent(file)+'?width='+width;
const photos={
 hanoi:{url:commons('Hoan Kiem Lake photo.jpg',1400),credit:'Hà Nội · Wikimedia Commons'},
 tokyo:{url:commons('Rainbow Bridge as seen from Shiodome Tokyo.jpg',1200),credit:'Tokyo · Wikimedia Commons'},
 bangkok:{url:commons('WatArunAtSunset.jpg',1100),credit:'Bangkok · Wikimedia Commons'},
 macau:{url:commons('Macau - Senado Square.jpg',1300),credit:'Macau · Wikimedia Commons'},
 halong:{url:commons('Ha Long Bay, Vietnam, Boats.jpg',1100),credit:'Vịnh Hạ Long · Wikimedia Commons'}
};
const images={'mo-macau':'macau','vn-hanoi':'hanoi','jp-tokyo':'tokyo','th-bangkok':'bangkok'};
let query='',country='all',province='all',continent='all',status='all',expanded=false;
const option=(title,value,selected)=>'<option value="'+esc(value)+'"'+(value===selected?' selected':'')+'>'+esc(title)+'</option>';
const countries=()=>option('Mọi quốc gia / vùng lãnh thổ','all',country)+countryNames.map(x=>option(x,x,country)).join('');
const provinces=()=>option('Mọi tỉnh / khu vực','all',province)+[...new Set(destinations.filter(x=>country==='all'||x.country===country).map(x=>x.province))].sort((a,b)=>a.localeCompare(b,'vi')).map(x=>option(x,x,province)).join('');
const issue=x=>'https://github.com/anatwork14/travel-repositories/issues/new?title='+encodeURIComponent('[Đề xuất điểm đến] '+x);
const image=(name,label,cls='')=>photos[name]?'<img class="'+cls+'" src="'+esc(photos[name].url)+'" alt="'+esc(label)+'" loading="lazy" decoding="async" onerror="this.style.display=\'none\'">':'';
function tile(x){
 const live=x.status==='published',key=images[x.id],p=photos[key];
 const art=p?'<div class="v3-card-photo">'+image(key,'Khung cảnh '+x.name)+'<span class="v3-photo-credit">'+esc(p.credit)+'</span></div>':
 '<div class="v3-card-abstract" aria-hidden="true"><span>'+esc(x.name.charAt(0))+'</span></div>';
 return '<article class="v3-place-card">'+art+'<div class="v3-place-body"><div class="v3-place-meta">'+esc(x.country)+' <span>·</span> '+esc(x.province)+'</div><h3>'+esc(x.name)+'</h3><p>'+esc(live?(x.subtitle||'Cẩm nang đã xuất bản'):x.type+' · Đang xây dựng cẩm nang chuyên sâu.')+'</p>'+
 '<div class="v3-place-bottom"><span class="v3-status '+(live?'v3-published':'v3-planned')+'">'+(live?'● CÓ CẨM NANG':'○ SẮP NGHIÊN CỨU')+'</span>'+
 (live?'<a href="'+esc(x.path)+'" aria-label="Mở cẩm nang '+esc(x.name)+'">Khám phá ↗</a>':'<a target="_blank" rel="noopener noreferrer" href="'+esc(issue(x.name))+'" aria-label="Đề xuất nghiên cứu '+esc(x.name)+'">Đề xuất ↗</a>')+'</div></div></article>';
}
function poster(name,key,region){
 return '<button type="button" class="v3-poster" data-spotlight="'+esc(name)+'" aria-label="Tìm điểm đến '+esc(name)+'">'+image(key,'Hình ảnh địa điểm '+name)+'<span class="v3-poster-shade"></span><span class="v3-poster-region">'+esc(region)+'</span><span class="v3-poster-title"><b>'+esc(name)+'</b><span>Khám phá ↗</span></span><span class="v3-photo-credit">'+esc(photos[key].credit)+'</span></button>';
}
export function renderHome(){
 return '<header class="v3-header"><a class="v3-logo" href="./" aria-label="Trang chủ Travel Notebook"><span class="v3-mark">✳</span> notebook<span class="v3-dot">.</span>travel</a><nav aria-label="Điều hướng chính"><a href="#inspiration">Khám phá</a><a href="#explore">Điểm đến</a><a href="#trip-checklist">Checklist</a></nav><a class="v3-nav-cta" href="#explore">Tìm nơi muốn đi ↗</a></header>'+
 '<main id="main-content"><section class="v3-hero"><div class="v3-hero-content"><div class="v3-eyebrow"><span class="v3-beacon"></span> THE WORLD IS WAITING</div><h1>Đi xa một chút.<br><em>Thấy thế giới</em><br>khác đi.</h1><p>Những hành trình đáng nhớ bắt đầu từ một chút tò mò. Khám phá nhiều quốc gia, tỉnh thành và thành phố theo nhịp riêng của bạn.</p>'+
 '<form class="v3-hero-search" id="v3-search-form"><label class="sr-only" for="destination-query">Tìm quốc gia, tỉnh, thành phố</label><span aria-hidden="true">⌕</span><input id="destination-query" type="search" autocomplete="off" placeholder="Bạn muốn đi đâu?" aria-describedby="directory-count"><button type="submit">Tìm kiếm ↗</button></form>'+
 '<div class="v3-suggest"><span>Thử tìm:</span><button data-spotlight="Macau">Macau</button><button data-spotlight="Hà Nội">Hà Nội</button><button data-spotlight="Tokyo">Tokyo</button><button data-spotlight="Đà Lạt">Đà Lạt</button></div>'+
 '<div class="v3-hero-stats"><span><b>'+publishedDestinations.length+'</b> <small>CẨM NANG ĐÃ XUẤT BẢN</small></span><span><b>'+destinations.length+'</b> <small>ĐIỂM ĐẾN TRONG DANH MỤC</small></span><span><b>'+countryNames.length+'</b> <small>QUỐC GIA / VÙNG LÃNH THỔ</small></span></div></div>'+
 '<div class="v3-hero-visual">'+image('hanoi','Hồ Hoàn Kiếm, Hà Nội','v3-hero-photo')+'<div class="v3-hero-shade"></div><span class="v3-hero-coord">21°01′N / 105°51′E</span><div class="v3-hero-caption"><small>POSTCARD 01 / VIETNAM</small><strong>Hà Nội</strong><span>Ảnh cảm hứng · cẩm nang đang nghiên cứu</span></div><div class="v3-floating-postcard">'+image('tokyo','Tokyo, Nhật Bản')+'<span>TOKYO, JAPAN ↗</span></div></div></section>'+
 '<div class="v3-marquee"><span>COLLECT MOMENTS, NOT CHECKLISTS</span><b>✳</b><span>GO SLOW · SEE MORE</span><a href="#inspiration">CUỘN ĐỂ KHÁM PHÁ ↓</a></div>'+
 '<section id="inspiration" class="v3-inspiration"><div class="container"><div class="v3-section-heading"><div><span class="v3-eyebrow">THE CURATED ATLAS / VOL. 01</span><h2>Mỗi nơi chốn,<br><em>một câu chuyện.</em></h2></div><p>Từ những con phố cũ đến đường chân trời mới. Đây là những điểm đến gợi cảm hứng; chỉ những nơi được đánh dấu sẵn sàng mới có cẩm nang.</p></div>'+
 '<div class="v3-posters">'+poster('Macau','macau','EAST ASIA')+poster('Hà Nội','hanoi','VIETNAM')+poster('Tokyo','tokyo','JAPAN')+poster('Bangkok','bangkok','THAILAND')+'</div><p class="v3-image-note">Nguồn hình ảnh và giấy phép tại <a href="https://github.com/anatwork14/travel-repositories/blob/main/docs/design-system-v3.md" target="_blank" rel="noopener noreferrer">ghi chú thiết kế</a>. Ảnh không đồng nghĩa đã có cẩm nang.</p></div></section>'+
 '<section id="explore" class="v3-directory"><div class="container"><div class="v3-section-heading"><div><span class="v3-eyebrow">FIND YOUR NEXT PLACE</span><h2>Điểm đến trong<br><em>tầm tay.</em></h2></div><p>Tra theo quốc gia, tỉnh và thành phố. Nơi chưa có dữ liệu được đánh dấu rõ, không tạo review hay giá giả.</p></div>'+
 '<div class="v3-filters"><div class="v3-filter-selects"><label>Quốc gia / vùng lãnh thổ<select id="destination-country">'+countries()+'</select></label><label>Tỉnh / thành / khu vực<select id="destination-province">'+provinces()+'</select></label><button type="button" id="v3-clear" class="v3-clear">↻ Xóa bộ lọc</button></div>'+
 '<div class="v3-filter-chips"><div role="group" aria-label="Vùng địa lý"><button type="button" class="chip selected" data-directory-continent="all">Tất cả khu vực</button><button type="button" class="chip" data-directory-continent="Đông Nam Á">Đông Nam Á</button><button type="button" class="chip" data-directory-continent="Đông Á">Đông Á</button></div><div role="group" aria-label="Trạng thái cẩm nang"><button type="button" class="chip selected" data-directory-status="all">Tất cả</button><button type="button" class="chip" data-directory-status="published">Có cẩm nang</button><button type="button" class="chip" data-directory-status="planned">Sắp nghiên cứu</button></div></div></div>'+
 '<div class="v3-results-top"><p id="directory-count" aria-live="polite"></p><a target="_blank" rel="noopener noreferrer" href="'+issue('')+'">+ Đề xuất địa điểm mới ↗</a></div><div id="destination-results" class="v3-destination-grid" aria-live="polite"></div><div class="v3-results-more" id="directory-more"></div><p class="v3-legend">Cẩm nang đã xuất bản và danh mục dự kiến được phân biệt rõ. Chỉ nhãn <strong>CÓ CẨM NANG</strong> mới mở được bài nghiên cứu chuyên sâu.</p></div></section>'+
 '<section class="v3-how"><div class="container"><div class="v3-section-heading"><div><span class="v3-eyebrow">NOT JUST WHERE, BUT HOW</span><h2>Đi theo cách<br><em>của bạn.</em></h2></div><p>Lên kế hoạch vừa đủ, giữ thời gian cho trải nghiệm tự nhiên và biết những lưu ý thực tế trước khi đi.</p></div><div class="v3-how-grid"><a href="#trip-checklist" class="v3-how-card first"><span>01 / PREPARE</span><b>◷</b><h3>Sẵn sàng lên đường</h3><p>Giấy tờ, thời tiết, hành lý, ngân sách và thông tin thiết yếu.</p><strong>Mở checklist ↗</strong></a><a href="./macau/#guide" class="v3-how-card second"><span>02 / EXPLORE</span><b>⌖</b><h3>Tự dẫn đường</h3><p>Bản đồ, lịch trình theo ngày, điểm dừng và hướng dẫn theo chặng.</p><strong>Thử ở Macau ↗</strong></a><a href="./macau/#intelligence" class="v3-how-card third"><span>03 / UNDERSTAND</span><b>✧</b><h3>Hiểu trước khi đi</h3><p>Thông tin đáng tin cậy, dữ liệu có nguồn và cả điều tiêu cực.</p><strong>Xem dữ liệu ↗</strong></a></div></div></section>'+
 renderPrep()+
 '<section class="v3-closing"><div class="container"><span class="v3-eyebrow">BUILT FOR CURIOUS TRAVELERS</span><h2>Đi để thấy.<br><em>Không chỉ để đến.</em></h2><p>Thông tin rõ ràng. Cảm hứng vừa đủ. Quyết định luôn là của bạn.</p><a class="pill" href="#explore">Khám phá ngay ↗</a></div></section></main>'+
 '<footer class="v3-footer"><div class="container v3-footer-columns"><div><a class="v3-logo" href="./"><span class="v3-mark">✳</span> notebook<span class="v3-dot">.</span>travel</a><p>Discover a place. Make it yours.</p></div><div><b>KHÁM PHÁ</b><a href="#inspiration">Cảm hứng</a><a href="#explore">Điểm đến</a><a href="#trip-checklist">Checklist</a></div><div><b>MINH BẠCH</b><a href="https://github.com/anatwork14/travel-repositories">GitHub repository ↗</a><a href="./macau/#sources">Nguồn dữ liệu Macau ↗</a><span>Không thu thập thông tin cá nhân</span></div></div><div class="container v3-footer-bottom">© 2026 Travel Notebook. Independent travel research. <span>MADE TO WANDER ✳</span></div></footer>';
}
function renderResults(){
 const target=document.getElementById('destination-results');if(!target)return;
 const results=destinations.filter(x=>(!query||destinationSearchText(x).includes(norm(query)))&&(country==='all'||x.country===country)&&(province==='all'||x.province===province)&&(continent==='all'||x.continent===continent)&&(status==='all'||x.status===status));
 const simple=!query&&country==='all'&&province==='all'&&continent==='all'&&status==='all';
 const subset=simple&&!expanded?results.slice(0,9):results;
 document.getElementById('directory-count').textContent=results.length+' địa điểm tìm thấy · '+results.filter(x=>x.status==='published').length+' cẩm nang đã xuất bản';
 target.innerHTML=subset.map(tile).join('')||'<div class="v3-empty"><h3>Chưa thấy nơi bạn tìm.</h3><p>Thử tên khác hoặc xóa bộ lọc.</p><button id="v3-empty-clear" type="button">Xóa bộ lọc</button></div>';
 document.getElementById('directory-more').innerHTML=simple&&!expanded&&results.length>9?'<button id="v3-show-all" type="button">Xem toàn bộ '+results.length+' địa điểm ↓</button>':'';
 document.querySelectorAll('[data-directory-continent]').forEach(b=>{b.classList.toggle('selected',b.dataset.directoryContinent===continent);b.setAttribute('aria-pressed',String(b.dataset.directoryContinent===continent));});
 document.querySelectorAll('[data-directory-status]').forEach(b=>{b.classList.toggle('selected',b.dataset.directoryStatus===status);b.setAttribute('aria-pressed',String(b.dataset.directoryStatus===status));});
 document.getElementById('v3-empty-clear')?.addEventListener('click',clear);
 document.getElementById('v3-show-all')?.addEventListener('click',()=>{expanded=true;renderResults();});
}
function synchronize(){document.getElementById('destination-query').value=query;document.getElementById('destination-country').innerHTML=countries();document.getElementById('destination-province').innerHTML=provinces();}
function clear(){query='';country='all';province='all';continent='all';status='all';expanded=false;synchronize();renderResults();}
function spotlight(place){query=place;country='all';province='all';continent='all';status='all';synchronize();renderResults();document.getElementById('explore').scrollIntoView({behavior:'smooth',block:'start'});}
export function bindHome(){
 const input=document.getElementById('destination-query');if(!input)return;
 input.addEventListener('input',e=>{query=e.target.value;renderResults();});
 document.getElementById('v3-search-form').addEventListener('submit',e=>{e.preventDefault();document.getElementById('explore').scrollIntoView({behavior:'smooth',block:'start'});});
 document.getElementById('destination-country').addEventListener('change',e=>{country=e.target.value;province='all';synchronize();renderResults();});
 document.getElementById('destination-province').addEventListener('change',e=>{province=e.target.value;renderResults();});
 document.getElementById('v3-clear').addEventListener('click',clear);
 document.querySelectorAll('[data-directory-continent]').forEach(b=>b.addEventListener('click',()=>{continent=b.dataset.directoryContinent;renderResults();}));
 document.querySelectorAll('[data-directory-status]').forEach(b=>b.addEventListener('click',()=>{status=b.dataset.directoryStatus;renderResults();}));
 document.querySelectorAll('[data-spotlight]').forEach(b=>b.addEventListener('click',()=>spotlight(b.dataset.spotlight)));
 document.addEventListener('keydown',e=>{if(e.key==='/'&&!e.ctrlKey&&!e.metaKey&&!e.altKey&&!['INPUT','SELECT','TEXTAREA'].includes(document.activeElement?.tagName)){e.preventDefault();input.focus();}});
 renderResults();bindPrep();
}
