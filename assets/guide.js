// Self-guided tours and portable reports. No geocoding, bookings or fabricated route ETAs.
const xss=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','>':'&gt',"'":'&#39;'}[c]));
const defaultPlan={1:['senado','stpaul','monte','ama','tower'],2:['taipa','cunha','venetian','londoner','parisian','wynn'],3:['coloane']};
const audioNotes={
  "stpaul": "Bạn đang đứng trước tàn tích Thánh Phaolô, một biểu tượng của khu Di sản Lịch sử Macau. Phần mặt tiền đá là dấu tích của công trình nhà thờ cổ; hãy quan sát các chi tiết trang trí pha trộn ảnh hưởng châu Âu và châu Á.",
  "senado": "Senado Square là không gian công cộng có mặt đường lát đá gợn sóng, các tòa nhà nhiều màu sắc. Đây là một trong những nơi rõ nhất để cảm nhận lịch sử giao thoa văn hóa Macau.",
  "monte": "Pháo đài Monte nằm trên cao trong khu phố cổ. Từ đây, bạn có thể nhìn sự tương phản giữa di sản và các cao ốc hiện đại.",
  "ama": "A-Ma Temple gắn với tín ngưỡng thờ nữ thần biển Mazu, nhắc đến lịch sử hàng hải Macau. Khi tham quan, hãy giữ trật tự vì đây vẫn là nơi sinh hoạt tâm linh.",
  "taipa": "Taipa Houses nổi bật với dãy nhà màu xanh pastel kiểu Bồ Đào Nha. Hãy thử chụp ảnh từ lối đi bên ngoài và quan sát kiến trúc trước khi đến khu ẩm thực.",
  "cunha": "Rua do Cunha là tuyến phố nổi tiếng với bánh, kẹo và đồ ăn nhẹ. Bạn có thể so sánh giá tại nhiều quán và để dành bụng cho món ăn đặc trưng.",
  "venetian": "The Venetian có kênh đào nhân tạo và các khu mua sắm trong nhà lấy cảm hứng từ Venice. Dạo chơi miễn phí ở các khu công cộng, còn gondola thường là hoạt động trả phí.",
  "londoner": "The Londoner tái tạo một số dấu ấn kiến trúc London. Đây là điểm hợp check-in tối, nhưng các lối đi trong resort có thể khác đường phố thực tế.",
  "parisian": "The Parisian nổi bật với phiên bản mô phỏng tháp Eiffel. Nên kiểm tra giá vé nếu muốn lên đài quan sát thay vì chỉ chụp ảnh bên ngoài.",
  "wynn": "Wynn Palace có hồ biểu diễn ánh sáng và nước cùng hệ thống SkyCab. Giờ biểu diễn, bảo trì và hoạt động có thể thay đổi, vì vậy hãy đối chiếu lịch tại resort.",
  "coloane": "Coloane Village mang nhịp sống chậm hơn khu Cotai. Đây là dịp ngắm phố nhỏ ven biển và thưởng thức bánh tart trứng tại các tiệm trong làng.",
  "tower": "Macau Tower là điểm ngắm cảnh từ trên cao, đồng thời có một số trải nghiệm mạo hiểm. Hãy kiểm tra vé, điều kiện tham gia và thời tiết trước khi mua."
};
const localKey='travel-notebook-macau-guide-v1';
let day=1,travelMode='walking',plan=load(),visited=new Set(),map=null,currentPosition=null;
function load(){try{const shared=new URLSearchParams(location.search).get('plan');if(shared&&shared.length<5000){const data=JSON.parse(shared);if([1,2,3].every(k=>Array.isArray(data[k])&&data[k].length<=30&&data[k].every(id=>typeof id==='string'&&id.length<60)))return data;}}catch{}try{const data=JSON.parse(localStorage.getItem(localKey));if(data&&[1,2,3].every(d=>Array.isArray(data[d])))return data;}catch{}return JSON.parse(JSON.stringify(defaultPlan));}
try{visited=new Set(JSON.parse(localStorage.getItem(localKey+'-visited')||'[]'));}catch{}
function persist(){try{localStorage.setItem(localKey,JSON.stringify(plan));localStorage.setItem(localKey+'-visited',JSON.stringify([...visited]));}catch{}try{const u=new URL(location.href);if(u.searchParams.has('plan')){u.searchParams.delete('plan');history.replaceState(null,'',u.pathname+u.search+u.hash);}}catch{}}
function selected(data){return (plan[day]||[]).map(id=>data.spots.find(x=>x.id===id)).filter(Boolean);}
const coords=s=>s.lat+','+s.lng;
const nav=(from,to)=>'https://www.google.com/maps/dir/?api=1&origin='+encodeURIComponent(coords(from))+'&destination='+encodeURIComponent(coords(to))+'&travelmode='+travelMode;
const meters=(a,b)=>{const r=Math.PI/180;const c=2*Math.asin(Math.sqrt(Math.sin((a.lat-b.lat)*r/2)**2+Math.cos(a.lat*r)*Math.cos(b.lat*r)*Math.sin((a.lng-b.lng)*r/2)**2));return Math.round(6371000*c);};
function allDayLink(stops){if(stops.length===0)return '#';if(stops.length===1)return 'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(coords(stops[0]));let s='https://www.google.com/maps/dir/?api=1&origin='+encodeURIComponent(coords(stops[0]))+'&destination='+encodeURIComponent(coords(stops[stops.length-1]))+'&travelmode='+travelMode;if(stops.length>2)s+='&waypoints='+encodeURIComponent(stops.slice(1,-1).map(coords).join('|'));return s;}
const legalSource='https://www.macaotourism.gov.mo/en/events/calendar';
function download(name,content,type){const blob=new Blob([content],{type});const link=document.createElement('a');link.href=URL.createObjectURL(blob);link.download=name;document.body.appendChild(link);link.click();link.remove();setTimeout(()=>URL.revokeObjectURL(link.href),2000);}
function exportText(data){
 let text='MACAU — CẨM NANG TỰ DẪN ĐƯỜNG\nDữ liệu kiểm tra: '+data.updated+'\n\n';
 text+='CHUẨN BỊ: Visa Macau trước khi đi với hộ chiếu Việt Nam; kiểm tra điều kiện nhập cảnh, giá và giờ mở cửa. Không có xác nhận thời gian di chuyển.\n\n';
 [1,2,3].forEach(k=>{text+='NGÀY '+k+'\n';(plan[k]||[]).forEach((id,i)=>{const p=data.spots.find(s=>s.id===id);if(p)text+=(i+1)+'. '+p.name+' — '+p.region+' ('+p.time+')\n'+p.description+'\nNên đến: '+p.best+'\n'+ 'Bản đồ: https://www.openstreetmap.org/?mlat='+p.lat+'&mlon='+p.lng+'\n\n';});});
 text+='NGÂN SÁCH / MOP: dự trù thực phẩm 30–250 mỗi bữa/người tùy loại; buýt 6 MOP/lượt; chưa có giá phòng theo ngày.\n';
 text+='CHÚ Ý: '+data.cautions.map(c=>c.title).join('; ')+'\nNguồn: '+legalSource;
 return text;
}
function reportHTML(data){
 const text=exportText(data);
 let body='<header><p>NOTEBOOK.TRAVEL · PERSONAL GUIDE</p><h1>Macau — Cẩm nang tự dẫn đường</h1><p>Biên soạn từ dữ liệu '+xss(data.updated)+' · Xuất '+new Date().toLocaleDateString('vi-VN')+'</p></header>';
 body+='<section><h2>Trước khi đi</h2><p>Hộ chiếu Việt Nam phổ thông cần visa Macau trước chuyến đi. Xác minh tiền, thời tiết, giờ hoạt động tại nguồn trước khi khởi hành.</p></section>';
 for(let k=1;k<=3;k++){body+='<section><h2>Ngày '+k+'</h2>';const stops=(plan[k]||[]).map(id=>data.spots.find(x=>x.id===id)).filter(Boolean);if(!stops.length)body+='<p>Chưa có điểm dừng.</p>';stops.forEach((s,i)=>{body+='<article><h3>'+ (i+1)+'. '+xss(s.name)+'</h3><p>'+xss(s.region)+' · '+xss(s.time)+' · '+xss(s.cost)+'</p><p>'+xss(s.description)+'</p><p><b>Thời điểm:</b> '+xss(s.best)+'</p><a href="https://www.openstreetmap.org/?mlat='+s.lat+'&mlon='+s.lng+'">Mở điểm trên bản đồ</a></article>';});if(stops.length)body+='<p><a href="'+xss(allDayLink(stops))+'">Điều hướng toàn ngày qua Google Maps ↗</a></p>';body+='</section>';}
 body+='<section><h2>Ẩm thực địa phương</h2>'+data.foods.map(s=>'<p><b>'+xss(s.vi)+'</b> · '+s.low+'–'+s.high+' MOP ('+xss(s.unit)+') · '+xss(s.where)+'</p>').join('')+'</section>';
 body+='<section><h2>Rủi ro và điều cần tránh</h2>'+data.cautions.map(s=>'<p><b>'+xss(s.title)+'</b> — '+xss(s.detail)+'</p>').join('')+'</section>';
 body+='<section><h2>Những nguồn cần kiểm tra lại</h2>'+data.sources.slice(0,8).map(s=>'<p><a href="'+xss(s.url)+'">'+xss(s.name)+'</a></p>').join('')+'</section>';
 body+='<footer><p>Bản báo cáo không có dữ liệu giá trực tiếp hoặc ETA. Các đường dẫn chỉ hoạt động khi có kết nối mạng.</p><p>© OSM contributors · Báo cáo tạo bởi notebook.travel</p></footer>';
 return '<!doctype html><html lang="vi"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Macau — Cẩm nang tự dẫn đường</title><style>body{font:16px/1.65 system-ui,Arial;max-width:850px;margin:auto;padding:34px;color:#1b302d}h1,h2{font-family:Georgia,serif}header{border-bottom:4px solid #1b543e}section{padding:16px 0;border-bottom:1px solid #ddd}article{break-inside:avoid;margin:18px 0;padding:14px;border-left:4px solid #c7a26a;background:#f6f7f4}a{color:#176b55;overflow-wrap:anywhere}@media print{body{padding:0}section{break-inside:auto}a{color:#176b55}header{margin-bottom:20px}}</style>'+body+'<!-- Data text chars: '+text.length+' --></html>';
}
function reportGPX(data){
 const list=[1,2,3].flatMap(k=>(plan[k]||[]).map(id=>({k,s:data.spots.find(s=>s.id===id)})).filter(x=>x.s));
 return '<?xml version="1.0" encoding="utf-8"?>\n<gpx xmlns="http://www.topografix.com/GPX/1/1" version="1.1" creator="notebook.travel"><metadata><name>Macau self-guided waypoints</name></metadata>'+list.map(({k,s})=>'<wpt lat="'+s.lat+'" lon="'+s.lng+'"><name>'+xss('Ngày '+k+': '+s.name)+'</name><desc>'+xss(s.description)+'</desc></wpt>').join('')+'</gpx>';
}
export function renderGuide(data){
 return '<div class="section-header"><div><div class="eyebrow">YOUR SELF-GUIDED EXPERIENCE</div><h2>Tour tự dẫn & xuất cẩm nang</h2><p>Tự chọn từng điểm dừng, đánh dấu đã đến, mở dẫn đường theo chặng và xuất report dùng khi du lịch. Không cần đặt tour.</p></div></div>'+
 '<div class="info-strip"><span>⌖</span><div><strong>Dẫn đường thật, không bịa ETA</strong>Bản đồ nối các điểm bằng nét đứt để chỉ thứ tự; đó <b>không phải tuyến đường giao thông</b>. Nút “Dẫn đường” mở Google Maps để tìm đường thực tế. Kiểm tra điều kiện đi bộ, phương tiện và giờ mở cửa.</div></div>'+
 '<div class="guide-toolbar"><div class="control-bar" id="guide-days">'+[1,2,3].map(k=>'<button class="chip '+(day===k?'selected':'')+'" data-guide-day="'+k+'">Ngày '+k+'</button>').join('')+'</div><label>Phương tiện <select id="guide-mode"><option value="walking" '+(travelMode==='walking'?'selected':'')+'>Đi bộ</option><option value="transit" '+(travelMode==='transit'?'selected':'')+'>Công cộng</option><option value="driving" '+(travelMode==='driving'?'selected':'')+'>Taxi / ôtô</option></select></label></div>'+
 '<div class="guide-layout"><section><div id="guide-stops"></div></section><aside><div class="panel guide-map-container"><div class="eyebrow">LIVE MAP · WAYPOINTS</div><div id="guide-map" class="guide-map"></div><button class="chip" id="guide-locate">⌖ Tìm vị trí của tôi</button><div id="guide-nearby" class="subtle" aria-live="polite" style="margin:9px 0"></div><div id="guide-actions"></div></div><div class="panel guide-export"><div class="eyebrow">EXPORT & SHARE</div><h3>Xuất hành trình cá nhân</h3><p class="subtle">Bạn có thể nghe câu chuyện ngắn tại từng điểm, in PDF hoặc xuất HTML mang theo offline. Thuyết minh cần trình duyệt có tiếng Việt; bản đồ và dẫn đường cần Internet.</p><div class="guide-buttons"><button class="pill" data-guide-export="print">In / lưu PDF ↗</button><button class="chip" data-guide-export="html">Tải báo cáo HTML</button><button class="chip" data-guide-export="gpx">Tải tọa độ GPX</button><button class="chip" data-guide-export="json">Tải lịch trình JSON</button><button class="chip" data-guide-export="copy">Sao chép hướng dẫn</button><button class="chip" data-guide-export="share">Sao chép link chia sẻ</button></div><small id="guide-status" aria-live="polite"></small></div></aside></div>';
}
function repaint(data){
 const spots=selected(data);
 const all=data.spots.filter(x=>!plan[day].includes(x.id));
 const html=spots.map((s,i)=>'<article class="guide-stop"><div class="guide-step">'+(i+1)+'</div><div class="guide-stop-body"><div class="meta">'+xss(s.region)+' · '+xss(s.time)+'</div><h3>'+xss(s.name)+'</h3><p>'+xss(s.description)+'</p><p class="guide-story">✦ '+xss(audioNotes[s.id]||s.description)+'</p><small>⏰ Gợi ý: '+xss(s.best)+' · '+xss(s.cost)+'</small><div class="guide-stop-actions"><button class="chip" data-guide-audio="'+xss(s.id)+'">▶ Nghe thuyết minh</button><button class="chip '+(visited.has(s.id)?'selected':'')+'" data-guide-visit="'+xss(s.id)+'">'+(visited.has(s.id)?'✓ Đã đến':'○ Đánh dấu đã đến')+'</button><a target="_blank" rel="noopener noreferrer" href="https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(coords(s))+'">Đến điểm này ↗</a><button class="chip" data-guide-move="'+s.id+'" data-dir="-1" '+(i===0?'disabled':'')+'>↑</button><button class="chip" data-guide-move="'+s.id+'" data-dir="1" '+(i===spots.length-1?'disabled':'')+'>↓</button><button class="chip" data-guide-remove="'+s.id+'">× Bỏ</button></div></div></article>'+
 (spots[i+1]?'<div class="guide-leg"><span>↓ Chặng '+(i+1)+' → '+(i+2)+'</span><a target="_blank" rel="noopener noreferrer" href="'+nav(s,spots[i+1])+'">Chỉ đường thực tế ↗</a></div>':'')).join('')||'<p class="empty">Chưa có địa điểm. Thêm điểm vào ngày này.</p>';
 document.getElementById('guide-stops').innerHTML='<div class="card-footer"><h3>Lịch trình ngày '+day+' · '+spots.length+' điểm</h3><button class="chip" id="guide-reset">Khôi phục ngày</button></div><div class="guide-stops-list">'+html+'</div><div class="panel"><h3>Thêm điểm dừng</h3><div class="guide-add"><select id="guide-add-select"><option value="">Chọn địa điểm…</option>'+all.map(x=>'<option value="'+xss(x.id)+'">'+xss(x.name)+' ('+xss(x.region)+')</option>').join('')+'</select><button class="pill" id="guide-add">+ Thêm</button></div></div>';
 const near=document.getElementById('guide-nearby');if(near&&currentPosition&&spots.length){const closest=[...spots].sort((a,b)=>meters(currentPosition,a)-meters(currentPosition,b))[0];const km=meters(currentPosition,closest);near.innerHTML='Điểm gần nhất trong ngày: <b>'+xss(closest.name)+'</b> · khoảng '+(km<1000?km+' m':(km/1000).toFixed(1)+' km')+' theo đường chim bay. <a href="https://www.google.com/maps/dir/?api=1&destination='+encodeURIComponent(coords(closest))+'&travelmode='+travelMode+'" target="_blank" rel="noopener noreferrer">Dẫn đường ↗</a>';}
 document.getElementById('guide-actions').innerHTML=spots.length?'<p class="subtle">'+spots.length+' điểm · '+'Đã ghé '+spots.filter(s=>visited.has(s.id)).length+' điểm (đánh dấu trên thiết bị này)</p><a class="pill" target="_blank" rel="noopener noreferrer" href="'+allDayLink(spots)+'">Mở hành trình cả ngày ↗</a>':'<p class="subtle">Hãy chọn ít nhất một điểm.</p>';
 makeMap(spots);
}
function makeMap(stops){
 const el=document.getElementById('guide-map');if(!el)return;
 if(map){map.remove();map=null;}
 if(!window.L){el.innerHTML='<p class="empty">Bản đồ cần Leaflet (mạng Internet). Bạn vẫn có thể mở dẫn đường từng chặng.</p>';if(!document.getElementById('guide-leaflet-script')){const js=document.createElement('script');js.id='guide-leaflet-script';js.src='https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';js.onload=()=>{if(document.getElementById('guide-map'))makeMap(selected(window.__travelCityGuideData));};document.head.append(js);}return;}
 const L=window.L;map=L.map(el,{scrollWheelZoom:false}).setView([22.16,113.55],12);L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'© OpenStreetMap contributors',maxZoom:19}).addTo(map);
 stops.forEach((s,i)=>L.marker([s.lat,s.lng]).addTo(map).bindPopup('<b>'+xss((i+1)+'. '+s.name)+'</b>'));if(currentPosition)L.circleMarker([currentPosition.lat,currentPosition.lng],{radius:9,weight:3,color:'#2766ae',fillColor:'#c5e9ff',fillOpacity:1}).addTo(map).bindPopup('Vị trí gần đúng của bạn trên thiết bị');
 if(stops.length>1){L.polyline(stops.map(s=>[s.lat,s.lng]),{color:'#b78c51',weight:3,dashArray:'4 8'}).addTo(map);map.fitBounds(L.latLngBounds(stops.map(s=>[s.lat,s.lng])).pad(.2),{maxZoom:15});}
 else if(stops.length===1)map.setView([stops[0].lat,stops[0].lng],14);
 setTimeout(()=>map?.invalidateSize(),100);
}
export function activateGuide(data){
 window.__travelCityGuideData=data;
 const root=document.getElementById('tab-content');if(!root)return;
 const rerender=()=>{root.innerHTML=renderGuide(data);activateGuide(data);};
 root.querySelectorAll('[data-guide-day]').forEach(b=>b.addEventListener('click',()=>{day=Number(b.dataset.guideDay);rerender();}));
 document.getElementById('guide-mode').addEventListener('change',e=>{travelMode=e.target.value;repaint(data);});
 root.onclick=e=>{
 if(e.target.closest('#guide-locate')){const info=document.getElementById('guide-nearby');if(!navigator.geolocation){if(info)info.textContent='Trình duyệt không hỗ trợ định vị.';return;}if(info)info.textContent='Đang xin quyền vị trí…';navigator.geolocation.getCurrentPosition(p=>{currentPosition={lat:p.coords.latitude,lng:p.coords.longitude};repaint(data);},()=>{if(info)info.textContent='Không lấy được vị trí; bạn vẫn có thể dùng dẫn đường từng điểm.';},{enableHighAccuracy:false,timeout:10000,maximumAge:60000});return;}
 const target=e.target.closest('[data-guide-audio],[data-guide-visit],[data-guide-move],[data-guide-remove],[data-guide-export],#guide-add,#guide-reset');if(!target)return;
 if(target.hasAttribute('data-guide-audio')){const spot=data.spots.find(s=>s.id===target.dataset.guideAudio);if(!spot)return;if(!('speechSynthesis' in window)){const info=document.getElementById('guide-status');if(info)info.textContent='Thiết bị này không hỗ trợ thuyết minh giọng nói.';return;}window.speechSynthesis.cancel();const message=new SpeechSynthesisUtterance(audioNotes[spot.id]||spot.description);message.lang='vi-VN';message.rate=.93;window.speechSynthesis.speak(message);return;}
 if(target.hasAttribute('data-guide-visit')){const id=target.dataset.guideVisit;if(visited.has(id))visited.delete(id);else visited.add(id);persist();repaint(data);}
 if(target.hasAttribute('data-guide-remove')){plan[day]=plan[day].filter(id=>id!==target.dataset.guideRemove);persist();repaint(data);}
 if(target.hasAttribute('data-guide-move')){let i=plan[day].indexOf(target.dataset.guideMove),j=i+Number(target.dataset.dir);if(i>=0&&j>=0&&j<plan[day].length){[plan[day][i],plan[day][j]]=[plan[day][j],plan[day][i]];persist();repaint(data);}}
 if(target.id==='guide-add'){const id=document.getElementById('guide-add-select').value;if(id&&!plan[day].includes(id)){plan[day].push(id);persist();repaint(data);}}
 if(target.id==='guide-reset'){plan[day]=[...defaultPlan[day]];persist();repaint(data);}
 if(target.hasAttribute('data-guide-export')){const type=target.dataset.guideExport;try{
   if(type==='print'){const p=window.open('','_blank');if(!p){document.getElementById('guide-status').textContent='Trình duyệt chặn popup; hãy dùng Tải báo cáo HTML rồi in PDF.';return;}p.document.write(reportHTML(data));p.document.close();p.focus();setTimeout(()=>p.print(),350);}
   if(type==='share'){const link=new URL(location.href);link.searchParams.set('plan',JSON.stringify(plan));link.hash='guide';if(navigator.clipboard?.writeText)navigator.clipboard.writeText(link.href).then(()=>{const p=document.getElementById('guide-status');if(p)p.textContent='Đã sao chép link hành trình công khai; người có link sẽ thấy điểm dừng bạn chọn.';}).catch(()=>{document.getElementById('guide-status').textContent='Không có quyền sao chép link, hãy thử lại trên HTTPS.';});else window.prompt('Sao chép liên kết:',link.href);}
   if(type==='html')download('macau-self-guided-report.html',reportHTML(data),'text/html;charset=utf-8');
   if(type==='gpx')download('macau-waypoints.gpx',reportGPX(data),'application/gpx+xml;charset=utf-8');
   if(type==='json')download('macau-itinerary.json',JSON.stringify({city:data.name,updated:data.updated,days:plan,waypoints:data.spots.filter(s=>[1,2,3].some(k=>plan[k].includes(s.id)))},null,2),'application/json');
   if(type==='copy'){const content=exportText(data);if(navigator.clipboard?.writeText)navigator.clipboard.writeText(content).then(()=>{const p=document.getElementById('guide-status');if(p)p.textContent='Đã sao chép hành trình.';}).catch(()=>{document.getElementById('guide-status').textContent='Không có quyền clipboard; dùng tải HTML.';});else document.getElementById('guide-status').textContent='Clipboard không được hỗ trợ.';}
 }catch(err){document.getElementById('guide-status').textContent='Xuất dữ liệu không thành công: '+err.message;}}
 };
 repaint(data);
}
