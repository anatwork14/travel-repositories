// Generic trip-readiness checklist: works for every destination, without assuming passport/visa eligibility.
const base=[
{id:"scope",stage:"research",label:"Chọn khu vực lưu trú và phong cách chuyến đi",detail:"Xác định ưu tiên: nghỉ dưỡng, ẩm thực, thiên nhiên hay lịch sử; tránh nhồi quá nhiều điểm."},
{id:"season",stage:"research",label:"Kiểm tra mùa du lịch, thời tiết và ngày lễ",detail:"So sánh với thời gian thực tế; dự phòng mưa/nắng và lịch đông khách."},
{id:"route",stage:"research",label:"Phác thảo những cụm địa điểm gần nhau",detail:"Dành khoảng nghỉ linh hoạt giữa các điểm; không coi thời gian di chuyển ước tính là bảo đảm."},
{id:"cost",stage:"research",label:"Lập ngân sách và khoản dự phòng",detail:"Tính cả phí, thuế, vé, phương tiện, ăn uống, mua quà; nên có quỹ dự phòng."},
{id:"passport",stage:"weeks",label:"Kiểm tra hộ chiếu, điều kiện nhập cảnh và quá cảnh",detail:"Xem yêu cầu chính thức theo quốc tịch/hộ chiếu, thời gian lưu trú và từng điểm qua biên giới.",onlyInternational:true,priority:true},
{id:"visa",stage:"weeks",label:"Kiểm tra visa hoặc giấy phép nhập cảnh",detail:"Xác minh tại cơ quan có thẩm quyền. Không giả định có thể xin khi đến nơi.",onlyInternational:true,priority:true},
{id:"documents",stage:"weeks",label:"Kiểm tra giấy tờ tùy thân và giấy tờ riêng của trẻ em (nếu có)",detail:"Mang giấy tờ phù hợp tuyến nội địa/quốc tế và quy định hãng vận chuyển.",priority:true},
{id:"tickets",stage:"weeks",label:"Đặt phương tiện và chỗ ở có điều kiện hủy rõ ràng",detail:"Đối chiếu tổng tiền và lịch trình; giữ mã đặt phòng trong tài liệu của riêng bạn."},
{id:"insurance",stage:"weeks",label:"Cân nhắc bảo hiểm theo lịch trình và hoạt động",detail:"Đọc phạm vi y tế, hủy chuyến, các hoạt động đặc biệt và loại trừ."},
{id:"health",stage:"weeks",label:"Kiểm tra khuyến nghị y tế theo điểm đến",detail:"Tra hướng dẫn y tế theo quốc gia, cân nhắc khám trước ít nhất 4–6 tuần nếu cần."},
{id:"medicine",stage:"week",label:"Chuẩn bị thuốc cá nhân và kiểm tra quy định mang thuốc",detail:"Ưu tiên bao bì gốc, đơn thuốc phù hợp và số lượng đủ dùng; tránh thuốc bị hạn chế ở điểm đến."},
{id:"currency",stage:"week",label:"Chuẩn bị ít nhất hai phương thức thanh toán",detail:"Tiền mặt hợp lý, thẻ dự phòng và hiểu phí đổi ngoại tệ; không đổi tại người lạ."},
{id:"sim",stage:"week",label:"Kiểm tra SIM/eSIM hoặc roaming",detail:"Xem thiết bị hỗ trợ, ngày kích hoạt và chi phí."},
{id:"maps",stage:"week",label:"Lưu bản đồ và địa chỉ khách sạn",detail:"Kiểm tra có bản đồ offline tại điểm đến; chỉ đường đi bộ/công cộng có thể không hoạt động offline."},
{id:"hours",stage:"week",label:"Xác minh giờ mở cửa và cách đặt vé các điểm quan trọng",detail:"Đặc biệt dịp lễ, ngày đóng cửa, vé theo suất và chương trình biểu diễn."},
{id:"safety",stage:"week",label:"Lưu số hỗ trợ khẩn cấp và phương án thay thế",detail:"Đầu mối địa phương, bệnh viện, bảo hiểm, nơi ở và người thân; lưu trên thiết bị an toàn."},
{id:"backup",stage:"week",label:"Sao lưu thông tin thiết yếu một cách an toàn",detail:"Lưu bản sao giấy tờ/booking ở nơi bảo mật, không tải số hộ chiếu lên website công khai."},
{id:"packing",stage:"day",label:"Sắp xếp hành lý theo thời tiết và cân nặng",detail:"Giày thoải mái, đồ phù hợp, cáp sạc, đầu chuyển điện khi cần."},
{id:"carry",stage:"day",label:"Chuẩn bị hành lý xách tay thiết yếu",detail:"Giấy tờ, thuốc cần dùng, thiết bị, quần áo dự phòng và đồ dễ lấy."},
{id:"flight",stage:"day",label:"Kiểm tra giờ khởi hành, nhà ga, hành lý và check-in",detail:"Xác nhận trực tiếp từ hãng vận chuyển; chừa thời gian dự phòng."},
{id:"weatherlast",stage:"day",label:"Kiểm tra thời tiết/cảnh báo mới nhất",detail:"Có kế hoạch thay thế nếu thời tiết xấu hoặc điểm tham quan tạm đóng."},
{id:"pace",stage:"during",label:"Ưu tiên nhịp đi thoải mái và nghỉ ngơi",detail:"Không cố hoàn thành mọi điểm. Ăn, uống nước và dành khoảng trống để khám phá."},
{id:"location",stage:"during",label:"Kiểm tra đường về chỗ ở và chuyến cuối",detail:"Nhất là buổi tối; xem giá/phương tiện ở kênh chính thức."},
{id:"alerts",stage:"during",label:"Đối chiếu tin tức và cảnh báo tại nguồn",detail:"Review là trải nghiệm chủ quan; không suy diễn một tin thành tình trạng chung."},
{id:"spending",stage:"during",label:"Theo dõi mức chi để tránh vượt ngân sách",detail:"Xem tổng tiền và phí trước khi thanh toán."},
{id:"souvenir",stage:"during",label:"Kiểm tra quy định thực phẩm/hàng hóa trước khi mua quà",detail:"Đặc biệt sản phẩm động vật, cây, chất lỏng và giới hạn hành lý."},
{id:"photos",stage:"after",label:"Sao lưu hình ảnh và ghi chú giá cả hữu ích",detail:"Đừng chia sẻ ảnh chụp thông tin cá nhân hoặc giấy tờ nhạy cảm."},
{id:"feedback",stage:"after",label:"Chia sẻ review cân bằng và có thời điểm",detail:"Nêu điều tốt, điều chưa tốt và bối cảnh thực tế; không đăng thông tin cá nhân của người khác."}
];
const stages=[
{id:"research",name:"Lên ý tưởng",hint:"Trước khi chốt chuyến"},
{id:"weeks",name:"Đặt & giấy tờ",hint:"Càng sớm càng tốt"},
{id:"week",name:"Trước 1–4 tuần",hint:"Liên lạc, sức khỏe, bản đồ"},
{id:"day",name:"24–48 giờ cuối",hint:"Giấy tờ và hành lý"},
{id:"during",name:"Đang du lịch",hint:"Thoải mái & an toàn"},
{id:"after",name:"Sau chuyến đi",hint:"Lưu kỷ niệm & góp ý"}
];
const LS="travel-notebook-global-prep-v2";
let viewStage="all",uncompleted=false,checkState={done:{},custom:[],trip:{destination:"",depart:"",kind:"international"}};
try{const raw=JSON.parse(localStorage.getItem(LS)||"null");if(raw&&typeof raw==="object"){checkState.done=raw.done||{};checkState.custom=Array.isArray(raw.custom)?raw.custom.slice(0,40):[];checkState.trip={...checkState.trip,...(raw.trip||{})};}}catch{}
const html=x=>String(x??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
function persist(){try{localStorage.setItem(LS,JSON.stringify(checkState));}catch{}}
function tasks(){return [...base,...checkState.custom].filter(x=>checkState.trip.kind!=="domestic"||!x.onlyInternational);}
function renderRows(){
 const root=document.querySelector("#prep-tasks");if(!root)return;
 const all=tasks(),shown=all.filter(x=>(viewStage==="all"||x.stage===viewStage)&&(!uncompleted||!checkState.done[x.id]));
 const completed=all.filter(x=>checkState.done[x.id]).length;
 const pct=all.length?Math.round(100*completed/all.length):0;
 const summary=document.querySelector("#prep-summary");
 if(summary)summary.innerHTML='<strong>'+completed+' / '+all.length+' việc hoàn thành</strong><span>'+pct+'%</span>';
 const bar=document.querySelector("#prep-progress");if(bar)bar.style.width=pct+"%";
 root.innerHTML=shown.map(item=>'<label class="prep-row '+(checkState.done[item.id]?"prep-done":"")+'"><input type="checkbox" data-prep-check="'+html(item.id)+'" '+(checkState.done[item.id]?"checked":"")+'><span class="prep-copy"><strong>'+html(item.label)+'</strong><small>'+html(item.detail)+'</small>'+(item.priority?'<em>Quan trọng</em>':"")+'</span>'+(item.custom?'<button type="button" class="prep-remove" aria-label="Xóa công việc" data-prep-remove="'+html(item.id)+'">×</button>':"")+'</label>').join("")||'<div class="prep-empty">Không còn việc nào trong mục này. Bạn có thể chọn giai đoạn khác.</div>';
 document.querySelectorAll("[data-prep-stage]").forEach(b=>{b.classList.toggle("selected",b.dataset.prepStage===viewStage);b.setAttribute("aria-pressed",String(b.dataset.prepStage===viewStage));});
 const pending=document.querySelector("#prep-pending");if(pending)pending.setAttribute("aria-pressed",String(uncompleted));
}
export function renderPrep(){
 return '<section class="prep-section" id="trip-checklist"><div class="container"><div class="prep-top"><div><div class="eyebrow">YOUR TRAVEL WORKSPACE</div><h2>Chuẩn bị tốt.<br><em>Đi thật thoải mái.</em></h2><p class="intro">Checklist dùng được cho mọi điểm đến. Chia theo giai đoạn để bạn không bỏ sót việc quan trọng nhưng vẫn tận hưởng chuyến đi.</p></div><div class="prep-note">✓ Không cần tài khoản<br>✓ Lưu ngay trên thiết bị<br>✓ Không thu thập số hộ chiếu</div></div>'+
 '<div class="prep-box"><div class="prep-fields"><label>Đi đâu? <input id="prep-destination" maxlength="100" placeholder="Ví dụ: Tokyo, Đà Lạt…" value="'+html(checkState.trip.destination)+'"></label><label>Ngày khởi hành <input id="prep-depart" type="date" value="'+html(checkState.trip.depart)+'"></label><label>Loại hành trình <select id="prep-kind"><option value="international" '+(checkState.trip.kind==="international"?"selected":"")+' >Quốc tế</option><option value="domestic" '+(checkState.trip.kind==="domestic"?"selected":"")+' >Nội địa</option></select></label></div>'+
 '<div class="prep-status"><div id="prep-summary" class="prep-summary" aria-live="polite"></div><div class="prep-track"><div id="prep-progress"></div></div></div>'+
 '<div class="prep-filter"><div class="prep-pills" role="group" aria-label="Giai đoạn chuẩn bị"><button class="chip selected" data-prep-stage="all" aria-pressed="true">Tất cả</button>'+stages.map(x=>'<button class="chip" data-prep-stage="'+x.id+'" title="'+x.hint+'">'+x.name+'</button>').join("")+'</div><button type="button" id="prep-pending" class="chip" aria-pressed="false">Chỉ việc chưa xong</button></div>'+
 '<div id="prep-tasks" class="prep-tasks"></div>'+
 '<form id="prep-custom" class="prep-custom"><label for="prep-new">Thêm việc cá nhân</label><div class="prep-add"><input id="prep-new" maxlength="130" required placeholder="Ví dụ: kiểm tra lịch tàu về khách sạn"><button type="submit" class="pill">+ Thêm việc</button></div></form>'+
 '<div class="prep-bottom"><span>Hồ sơ và điều kiện visa phụ thuộc quốc tịch, điểm đến, lịch trình — luôn kiểm tra nguồn chính thức.</span><div><button type="button" class="chip" id="prep-export">↓ Xuất checklist .txt</button><button type="button" class="chip" id="prep-reset">Đặt lại tiến độ</button></div></div></div></div></section>';
}
export function bindPrep(){
 const root=document.querySelector("#trip-checklist");if(!root)return;
 root.addEventListener("change",e=>{
  if(e.target.matches("[data-prep-check]")){checkState.done[e.target.dataset.prepCheck]=e.target.checked;persist();renderRows();}
  if(e.target.id==="prep-kind"){checkState.trip.kind=e.target.value;persist();renderRows();}
  if(e.target.id==="prep-depart"){checkState.trip.depart=e.target.value;persist();}
 });
 root.querySelector("#prep-destination").addEventListener("input",e=>{checkState.trip.destination=e.target.value;persist();});
 root.addEventListener("click",e=>{
  const stage=e.target.closest("[data-prep-stage]");if(stage){viewStage=stage.dataset.prepStage;renderRows();}
  if(e.target.closest("#prep-pending")){uncompleted=!uncompleted;renderRows();}
  const remove=e.target.closest("[data-prep-remove]");if(remove){checkState.custom=checkState.custom.filter(x=>x.id!==remove.dataset.prepRemove);delete checkState.done[remove.dataset.prepRemove];persist();renderRows();}
  if(e.target.closest("#prep-reset")){if(confirm("Đặt lại tất cả dấu đã hoàn thành? Công việc tự thêm vẫn được giữ.")){checkState.done={};persist();renderRows();}}
  if(e.target.closest("#prep-export")){
   const list=tasks().map(x=>(checkState.done[x.id]?"[x] ":"[ ] ")+x.label+"\n    "+x.detail).join("\n");
   const content="TRAVEL NOTEBOOK · CHECKLIST\nĐiểm đến: "+(checkState.trip.destination||"Chưa chọn")+"\nKhởi hành: "+(checkState.trip.depart||"Chưa chọn")+"\nLoại: "+checkState.trip.kind+"\n\n"+list+"\n\nLuôn đối chiếu thông tin nhập cảnh, y tế và phương tiện với nguồn chính thức.";
   const blob=new Blob([content],{type:"text/plain;charset=utf-8"});const link=document.createElement("a");link.href=URL.createObjectURL(blob);link.download="travel-preparation-checklist.txt";link.click();setTimeout(()=>URL.revokeObjectURL(link.href),1000);
  }
 });
 root.querySelector("#prep-custom").addEventListener("submit",e=>{e.preventDefault();const el=root.querySelector("#prep-new");const value=el.value.trim();if(!value||checkState.custom.length>=40)return;checkState.custom.push({id:"c"+Date.now().toString(36),stage:"research",label:value,detail:"Công việc do bạn thêm.",custom:true});el.value="";persist();viewStage="all";uncompleted=false;renderRows();});
 renderRows();
}
