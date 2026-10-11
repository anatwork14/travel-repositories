// Registry is the single source for homepage discovery. Planned entries have NO public guide page.
// Register a real folder route only after research, source review and CI tests.
export const destinations = [
  {id:"mo-macau", name:"Macau", locality:"Macau", province:"Đặc khu Macau", country:"Macau", continent:"Đông Á", type:"Đặc khu", status:"published", path:"./macau/", subtitle:"Di sản, ẩm thực Macanese và bản đồ tự dẫn", guideUpdated:"11/10/2026", featured:true, media:"macau"},
  {id:"vn-hanoi", name:"Hà Nội", locality:"Hà Nội", province:"Hà Nội", country:"Việt Nam", continent:"Đông Nam Á", type:"Thành phố", status:"planned"},
  {id:"vn-hcm", name:"TP. Hồ Chí Minh", locality:"TP. Hồ Chí Minh", province:"TP. Hồ Chí Minh", country:"Việt Nam", continent:"Đông Nam Á", type:"Thành phố", status:"planned"},
  {id:"vn-danang", name:"Đà Nẵng", locality:"Đà Nẵng", province:"Đà Nẵng", country:"Việt Nam", continent:"Đông Nam Á", type:"Thành phố", status:"planned"},
  {id:"vn-hoian", name:"Hội An", locality:"Hội An", province:"Đà Nẵng", country:"Việt Nam", continent:"Đông Nam Á", type:"Phường / địa điểm", status:"planned"},
  {id:"vn-dalat", name:"Đà Lạt", locality:"Đà Lạt", province:"Lâm Đồng", country:"Việt Nam", continent:"Đông Nam Á", type:"Thành phố / khu vực", status:"planned"},
  {id:"vn-sapa", name:"Sa Pa", locality:"Sa Pa", province:"Lào Cai", country:"Việt Nam", continent:"Đông Nam Á", type:"Khu vực", status:"planned"},
  {id:"vn-hue", name:"Huế", locality:"Huế", province:"TP. Huế", country:"Việt Nam", continent:"Đông Nam Á", type:"Thành phố", status:"planned"},
  {id:"vn-nhatrang", name:"Nha Trang", locality:"Nha Trang", province:"Khánh Hòa", country:"Việt Nam", continent:"Đông Nam Á", type:"Thành phố / khu vực", status:"planned"},
  {id:"vn-phuquoc", name:"Phú Quốc", locality:"Phú Quốc", province:"An Giang", country:"Việt Nam", continent:"Đông Nam Á", type:"Đảo / khu vực", status:"planned"},
  {id:"jp-tokyo", name:"Tokyo", locality:"Tokyo", province:"Tokyo", country:"Nhật Bản", continent:"Đông Á", type:"Thủ đô", status:"planned"},
  {id:"jp-kyoto", name:"Kyoto", locality:"Kyoto", province:"Kyoto", country:"Nhật Bản", continent:"Đông Á", type:"Thành phố", status:"planned"},
  {id:"jp-osaka", name:"Osaka", locality:"Osaka", province:"Osaka", country:"Nhật Bản", continent:"Đông Á", type:"Thành phố", status:"planned"},
  {id:"th-bangkok", name:"Bangkok", locality:"Bangkok", province:"Bangkok", country:"Thái Lan", continent:"Đông Nam Á", type:"Thủ đô", status:"planned"},
  {id:"th-chiangmai", name:"Chiang Mai", locality:"Chiang Mai", province:"Chiang Mai", country:"Thái Lan", continent:"Đông Nam Á", type:"Thành phố", status:"planned"},
  {id:"th-phuket", name:"Phuket", locality:"Phuket", province:"Phuket", country:"Thái Lan", continent:"Đông Nam Á", type:"Đảo / tỉnh", status:"planned"},
  {id:"sg-singapore", name:"Singapore", locality:"Singapore", province:"Singapore", country:"Singapore", continent:"Đông Nam Á", type:"Thành phố quốc gia", status:"planned"},
  {id:"kr-seoul", name:"Seoul", locality:"Seoul", province:"Seoul", country:"Hàn Quốc", continent:"Đông Á", type:"Thủ đô", status:"planned"},
  {id:"kr-busan", name:"Busan", locality:"Busan", province:"Busan", country:"Hàn Quốc", continent:"Đông Á", type:"Thành phố", status:"planned"},
  {id:"tw-taipei", name:"Taipei", locality:"Taipei", province:"Taipei", country:"Đài Loan", continent:"Đông Á", type:"Thành phố", status:"planned"},
  {id:"hk-hongkong", name:"Hong Kong", locality:"Hong Kong", province:"Hong Kong", country:"Hong Kong", continent:"Đông Á", type:"Đặc khu", status:"planned"},
  {id:"my-kualalumpur", name:"Kuala Lumpur", locality:"Kuala Lumpur", province:"Kuala Lumpur", country:"Malaysia", continent:"Đông Nam Á", type:"Thủ đô", status:"planned"}
];
export const publishedDestinations=destinations.filter(d=>d.status==="published");
export const countryNames=[...new Set(destinations.map(d=>d.country))].sort((a,b)=>a.localeCompare(b,'vi'));
const aliases={"mo-macau":"macao ao mon 澳門","vn-hcm":"sai gon saigon tphcm ho chi minh city","vn-hanoi":"ha noi hanoi","vn-danang":"da nang danang","vn-dalat":"da lat dalat","vn-hoian":"hoi an hoian","vn-phuquoc":"phu quoc phuquoc","jp-tokyo":"dong kinh","th-bangkok":"bang coc","hk-hongkong":"hong kong hkg","sg-singapore":"sing ga po","vn-nhatrang":"nha trang","vn-sapa":"sa pa sapa"};
export function destinationSearchText(d){return [d.name,d.locality,d.province,d.country,d.continent,d.type,aliases[d.id]||"",d.country==="Việt Nam"?"vietnam":"",d.country==="Nhật Bản"?"japan":"",d.country==="Thái Lan"?"thailand":"",d.country==="Hàn Quốc"?"korea":"",d.country==="Đài Loan"?"taiwan":""].join(" ").normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/đ/g,'d');}
