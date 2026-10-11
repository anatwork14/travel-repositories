// Destination-first public homepage. One registry powers filters, route availability and counts.
import {destinations,countryNames,publishedDestinations,destinationSearchText} from './destinations.js';
import {renderPrep,bindPrep} from './travel-checklist.js';
import {macau} from '../macau/data.js';
const esc=x=>String(x??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const normalize=x=>String(x??"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/đ/g,"d").toLowerCase().trim();
let search="",country="all",continent="all",province="all",status="all";
const countryList=countryNames;
function countryOptions(){return '<option value="all">Mọi quốc gia / vùng lãnh thổ</option>'+countryList.map(x=>'<option value="'+esc(x)+'" '+(country===x?"selected":"")+'>'+esc(x)+'</option>').join("");}
function provinceOptions(){const items=[...new Set(destinations.filter(x=>country==="all"||x.country===country).map(x=>x.province))].sort((a,b)=>a.localeCompare(b,'vi'));return '<option value="all">Mọi tỉnh / thành / khu vực</option>'+items.map(x=>'<option value="'+esc(x)+'" '+(province===x?"selected":"")+'>'+esc(x)+'</option>').join("");}
const feedbackLink=name=>'https://github.com/anatwork14/travel-repositories/issues/new?title='+encodeURIComponent('[Đề xuất điểm đến] '+name);
function tile(x){
 const available=x.status==="published";
 const monogram=x.name.split(/\s+/).map(t=>t[0]).join("").slice(0,2).toUpperCase();
 const art=available?'<div class="directory-photo" style="background-image:url('+esc(macau.images.city)+')"><span class="photo-credit">Macau · Wikimedia Commons</span></div>':
 '<div class="directory-art" aria-hidden="true"><span class="directory-art-mark">'+esc(monogram)+'</span><span class="directory-art-lines"></span></div>';
 return '<article class="directory-card '+(available?"ready":"pending")+'">'+art+
 '<div class="directory-body"><div class="directory-meta"><span>'+esc(x.country)+'</span><span class="directory-dot">·</span><span>'+esc(x.province)+'</span></div><h3>'+esc(x.name)+'</h3><p>'+esc(available?x.subtitle:(x.type+' · Cẩm nang đang lên kế hoạch, chưa có dữ liệu nghiên cứu.'))+'</p>'+
 '<div class="directory-end"><span class="availability '+(available?"is-ready":"is-pending")+'">'+(available?"✓ Có cẩm nang đã nghiên cứu":"◷ Chưa xuất bản")+'</span>'+
 (available?'<a class="directory-link" href="'+esc(x.path)+'">Khám phá ↗</a>':'<a class="directory-link quiet" href="'+feedbackLink(x.name)+'" target="_blank" rel="noopener noreferrer" aria-label="Đề xuất cập nhật cẩm nang '+esc(x.name)+'">Đề xuất ↗</a>')+'</div></div></article>';
}
function results(){
 const root=document.getElementById("destination-results");if(!root)return;
 let list=destinations.filter(x=>{
  return (!search||destinationSearchText(x).includes(normalize(search)))&&
   (country==="all"||x.country===country)&&(continent==="all"||x.continent===continent)&&
   (province==="all"||x.province===province)&&(status==="all"||x.status===status);
 });
 const count=document.querySelector("#directory-count");
 if(count)count.textContent=list.length+" điểm đến · "+list.filter(x=>x.status==="published").length+" cẩm nang có nội dung";
 const empty=list.length===0?'<div class="directory-empty"><div class="empty-symbol">⌕</div><h3>Chưa có điểm đến phù hợp</h3><p>Hãy thử tên khác hoặc xóa bộ lọc. Nếu điểm đến chưa có trong danh mục, bạn có thể đề xuất thêm.</p><button class="chip" id="clear-destination-filters">Xóa bộ lọc</button></div>':"";
 root.innerHTML=list.map(tile).join("")+empty;
 const reset=document.querySelector("#clear-destination-filters");if(reset)reset.addEventListener("click",()=>{search="";country="all";continent="all";province="all";status="all";sync();results();});
 const chips=document.querySelectorAll("[data-directory-status]");chips.forEach(b=>{b.classList.toggle("selected",b.dataset.directoryStatus===status);b.setAttribute("aria-pressed",String(b.dataset.directoryStatus===status));});
 document.querySelectorAll("[data-directory-continent]").forEach(b=>{b.classList.toggle("selected",b.dataset.directoryContinent===continent);b.setAttribute("aria-pressed",String(b.dataset.directoryContinent===continent));});
}
function sync(){
 document.getElementById("destination-query").value=search;
 document.getElementById("destination-country").innerHTML=countryOptions();
 document.getElementById("destination-province").innerHTML=provinceOptions();
}
export function renderHome(){
 return '<header class="global-header"><a class="brand" href="./" aria-label="Travel Notebook · Trang chủ"><span class="brand-icon">✧</span> notebook.travel</a><nav class="nav-right" aria-label="Điều hướng chính"><a href="#explore">Điểm đến</a><a href="#trip-checklist">Checklist du lịch</a><a href="#travel-method">Cách sử dụng</a><a class="pill" href="#explore">Khám phá ↗</a></nav></header>'+
 '<main id="main-content"><section class="discovery-hero"><div class="container hero-editorial"><div class="eyebrow">A TRAVEL RESEARCH LIBRARY · OPEN DESTINATIONS</div><h1>Thế giới rộng lớn.<br><em>Hành trình của bạn,</em><br>nhẹ nhàng hơn.</h1><p>Chọn quốc gia, tỉnh thành hoặc thành phố bạn muốn khám phá. Cẩm nang thực tế, giá có nguồn, cảnh báo cân bằng và những công cụ giúp bạn tự tin đi theo cách của mình.</p><div class="hero-primary"><a class="pill" href="#explore">Tìm điểm đến <span aria-hidden="true">↗</span></a><a class="hero-secondary" href="#trip-checklist">Bắt đầu bằng checklist <span aria-hidden="true">→</span></a></div><div class="hero-trust"><span>◈ Tra cứu theo địa phương</span><span>◎ Dữ liệu có trạng thái rõ ràng</span><span>⌖ Tự lên kế hoạch</span></div></div><div class="hero-aside" aria-hidden="true"><div class="globe-outline"><span>TRAVEL<br>NOTEBOOK</span><small>EXPLORE • PREPARE • GO</small></div><div class="route-lines"><span></span><span></span><span></span></div></div></section>'+
 '<section class="directory-section" id="explore"><div class="container"><div class="section-header directory-head"><div><div class="eyebrow">DESTINATION DISCOVERY</div><h2>Tìm đúng nơi bạn muốn đi.</h2><p>Tìm theo quốc gia, tỉnh, thành phố hoặc khu vực; trang chỉ dẫn đầy đủ chỉ mở với địa điểm đã xuất bản.</p></div><div class="directory-snapshot"><strong>'+countryNames.length+'</strong><span>quốc gia / vùng lãnh thổ trong danh mục</span></div></div>'+
 '<div class="directory-controls"><label class="directory-search-label" for="destination-query">Tìm kiếm địa danh</label><div class="directory-search-wrap"><span aria-hidden="true" class="search-icon">⌕</span><input id="destination-query" type="search" autocomplete="off" placeholder="Tìm Macau, Đà Lạt, Osaka, Bangkok..." aria-describedby="directory-count"><kbd>/</kbd></div>'+
 '<div class="directory-selects"><label>Quốc gia / vùng lãnh thổ<select id="destination-country">'+countryOptions()+'</select></label><label>Tỉnh / thành / khu vực<select id="destination-province">'+provinceOptions()+'</select></label></div>'+
 '<div class="directory-filterbar"><div role="group" aria-label="Lọc theo khu vực thế giới"><button type="button" class="chip selected" data-directory-continent="all" aria-pressed="true">Tất cả khu vực</button><button type="button" class="chip" data-directory-continent="Đông Nam Á">Đông Nam Á</button><button type="button" class="chip" data-directory-continent="Đông Á">Đông Á</button></div><div role="group" aria-label="Tình trạng cẩm nang"><button type="button" class="chip selected" data-directory-status="all" aria-pressed="true">Tất cả</button><button type="button" class="chip" data-directory-status="published">Có cẩm nang</button><button type="button" class="chip" data-directory-status="planned">Sắp nghiên cứu</button></div></div></div>'+
 '<div class="directory-toolbar"><p id="directory-count" aria-live="polite"></p><a href="https://github.com/anatwork14/travel-repositories/issues/new?title=%5BĐề%20xuất%20điểm%20đến%5D" target="_blank" rel="noopener noreferrer">+ Đề xuất địa điểm mới ↗</a></div>'+
 '<div id="destination-results" class="directory-grid" aria-live="polite"></div><p class="directory-disclaimer">Danh mục mở rộng không đồng nghĩa đã có thông tin đáng tin cậy cho mọi nơi. <strong>Chỉ cẩm nang có nhãn “Có cẩm nang” mới có nội dung nghiên cứu.</strong> Không có vé/khách sạn hay đánh giá giả lập.</p></div></section>'+
 '<section class="value-section" id="travel-method"><div class="container"><div class="section-header"><div><div class="eyebrow">TRAVEL SHOULD FEEL LIGHT</div><h2>Đi thoải mái không có nghĩa là phải lên lịch kín.</h2><p>Một trải nghiệm tốt cân bằng khám phá, nghỉ ngơi, chủ động ngân sách và phương án dự phòng.</p></div></div><div class="value-grid"><div><span class="value-number">01</span><h3>Tìm thông tin rõ ràng</h3><p>Có địa điểm, giá ước tính, nguồn, ngày cập nhật và cảnh báo. Không buộc người dùng tự đoán thông tin nào đã kiểm chứng.</p></div><div><span class="value-number">02</span><h3>Chuẩn bị vừa đủ</h3><p>Chia việc theo từng giai đoạn, ưu tiên hộ chiếu/visa, sức khỏe, ngân sách và dự phòng thay vì checklist dài dằng dặc.</p></div><div><span class="value-number">03</span><h3>Tận hưởng hành trình</h3><p>Chọn điểm quan trọng, chừa thời gian trống, luôn có đường quay lại nơi ở và phương án khi kế hoạch thay đổi.</p></div></div></div></section>'+
 renderPrep()+
 '<section class="research-foot"><div class="container"><div><div class="eyebrow">TRUST OVER HYPE</div><h2>Không phải review nào cũng là sự thật.</h2><p>Thông tin chính thức, review khách du lịch và dữ liệu thu thập tự động được tách biệt. Mọi nguồn có thể cũ, sai ngữ cảnh hoặc khác thời điểm bạn đi.</p><a class="pill light" href="./macau/#intelligence">Xem cách Macau hiển thị tin & review ↗</a></div><div class="research-foot-mark" aria-hidden="true">✧</div></div></section></main>'+
 '<footer class="global-footer"><div class="container footrow"><div><a class="brand" href="./"><span class="brand-icon">✧</span> notebook.travel</a><p>Đi đến bất cứ đâu. Chuẩn bị thông minh và giữ quyền quyết định.</p></div><div><p>'+publishedDestinations.length+' cẩm nang đã xuất bản · '+destinations.length+' điểm trong danh mục</p><p>Không đặt tour, không thu thập hồ sơ cá nhân</p><a href="https://github.com/anatwork14/travel-repositories" target="_blank" rel="noopener noreferrer">Mã nguồn & đóng góp ↗</a></div></div></footer>';
}
export function bindHome(){
 const q=document.getElementById("destination-query");if(!q)return;
 q.addEventListener("input",e=>{search=e.target.value;results();});
 document.getElementById("destination-country").addEventListener("change",e=>{country=e.target.value;province="all";document.getElementById("destination-province").innerHTML=provinceOptions();results();});
 document.getElementById("destination-province").addEventListener("change",e=>{province=e.target.value;results();});
 document.querySelectorAll("[data-directory-status]").forEach(x=>x.addEventListener("click",()=>{status=x.dataset.directoryStatus;results();}));
 document.querySelectorAll("[data-directory-continent]").forEach(x=>x.addEventListener("click",()=>{continent=x.dataset.directoryContinent;results();}));
 document.addEventListener("keydown",e=>{if(e.key==="/"&&!e.altKey&&!e.metaKey&&!e.ctrlKey&&document.body.dataset.page==="home"&&!["INPUT","TEXTAREA","SELECT"].includes(document.activeElement?.tagName)){e.preventDefault();q.focus();}});
 results();bindPrep();
}
