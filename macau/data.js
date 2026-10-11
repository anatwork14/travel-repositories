// Destination dataset: Macau. Copy this folder as a template for new countries/cities.
// Prices are planning ranges in MOP unless stated otherwise; not real-time offers.
export const macau = {
  slug:"macau",name:"Macau",region:"Đặc khu Hành chính Macau · Trung Quốc",season:"Tháng 12/2026",updated:"11/10/2026",
  tagline:"Một thành phố, hai nền văn hoá. Từ những con phố di sản đến ánh đèn Cotai Strip.",
  description:"Ẩm thực Macanese, dấu ấn Bồ Đào Nha, phố cổ UNESCO và những resort lộng lẫy bên bờ biển phía Nam Trung Quốc.",
  currency:{code:"MOP",vnd:3207.18,hkdVnd:3300.10,assumption:"Tỷ giá tham khảo ngày 11/10/2026, không phải giá đổi tiền tại quầy và không tự cập nhật."},
  weather:{avg:"16,8°C",range:"14–20°C",note:"Mát và tương đối khô. Mang áo khoác, giày đi bộ êm."},
  images:{
    city:"https://commons.wikimedia.org/wiki/Special:FilePath/Macau_-_Senado_Square.jpg?width=1400",
    ruins:"https://commons.wikimedia.org/wiki/Special:FilePath/The_Ruins_of_St._Paul%27s_in_Macau.jpg?width=900",
    venetian:"https://commons.wikimedia.org/wiki/Special:FilePath/The_Venetian_Macao_Night_View_201104.jpg?width=900",
    taipa:"https://commons.wikimedia.org/wiki/Special:FilePath/Taipa_Houses%E2%80%93Museum_1.jpg?width=900",
    tart:"https://commons.wikimedia.org/wiki/Special:FilePath/Macau_Eggtart.jpg?width=900",
    pork:"https://commons.wikimedia.org/wiki/Special:FilePath/PorkChopBun.jpg?width=900"
  },
  geography:[
    {name:"Macau Peninsula",description:"Phố cổ · di sản UNESCO · miếu A-Ma",lat:22.194,lng:113.541},
    {name:"Taipa",description:"Phố ăn vặt Rua do Cunha · kiến trúc pastel",lat:22.153,lng:113.557},
    {name:"Cotai Strip",description:"Resort lớn · check-in khi lên đèn",lat:22.146,lng:113.564},
    {name:"Coloane",description:"Làng biển yên bình · bánh tart trứng",lat:22.118,lng:113.558}
  ],
  spots:[
    {id:"stpaul",name:"Ruins of St. Paul's",region:"Macau Peninsula",tag:"Biểu tượng",cost:"Ngoài trời miễn phí",time:"45–60 phút",best:"7–9 giờ sáng",image:"ruins",lat:22.19784,lng:113.54084,description:"Mặt tiền nhà thờ thế kỷ 17, bậc thang đá và những góc phố di sản xung quanh."},
    {id:"senado",name:"Senado Square",region:"Macau Peninsula",tag:"Di sản & Giáng sinh",cost:"Miễn phí",time:"45–60 phút",best:"Sáng / buổi tối",image:"city",lat:22.19344,lng:113.53972,description:"Quảng trường với gạch lát lượn sóng và nhà pastel kiểu Bồ Đào Nha."},
    {id:"monte",name:"Monte Fort",region:"Macau Peninsula",tag:"Ngắm toàn cảnh",cost:"Khuôn viên miễn phí",time:"40–70 phút",best:"Cuối chiều",image:"ruins",lat:22.1972,lng:113.5424,description:"Pháo đài nằm trên cao, nhìn xuống Grand Lisboa và phố cổ."},
    {id:"ama",name:"A-Ma Temple",region:"Macau Peninsula",tag:"Văn hóa tâm linh",cost:"Tham quan cơ bản miễn phí",time:"30–45 phút",best:"Buổi sáng",image:null,lat:22.18576,lng:113.53147,description:"Ngôi miếu cổ gắn với tín ngưỡng hàng hải và lịch sử Macau."},
    {id:"taipa",name:"Taipa Houses",region:"Taipa",tag:"Ảnh pastel",cost:"Ngoài trời miễn phí",time:"40–60 phút",best:"Ban ngày",image:"taipa",lat:22.15458,lng:113.55952,description:"Dãy nhà xanh ngọc cổ kính có nét kiến trúc Bồ Đào Nha."},
    {id:"cunha",name:"Rua do Cunha",region:"Taipa",tag:"Ẩm thực đường phố",cost:"Dạo phố miễn phí",time:"1–2 giờ",best:"Trưa – chiều",image:"pork",lat:22.15334,lng:113.5563,description:"Phố ẩm thực với bánh hạnh nhân, bánh quy, thịt khô và hàng lưu niệm."},
    {id:"venetian",name:"The Venetian Macao",region:"Cotai",tag:"Kênh đào Venice",cost:"Khu chung miễn phí",time:"1–2 giờ",best:"Chiều",image:"venetian",lat:22.14801,lng:113.56036,description:"Những con kênh nhân tạo, nội thất Venice, gondola trả phí."},
    {id:"londoner",name:"The Londoner Macao",region:"Cotai",tag:"Đèn thành phố",cost:"Khu ngoài trời miễn phí",time:"45–75 phút",best:"Sau 18 giờ",image:"venetian",lat:22.14614,lng:113.5634,description:"Mặt tiền kiểu Westminster, tháp đồng hồ và hàng loạt góc ảnh ban đêm."},
    {id:"parisian",name:"The Parisian Macao",region:"Cotai",tag:"Tháp Eiffel",cost:"Ngoài trời miễn phí",time:"45–75 phút",best:"Hoàng hôn / tối",image:"venetian",lat:22.14271,lng:113.56278,description:"Tháp Eiffel thu nhỏ; đài quan sát có thể cần vé."},
    {id:"wynn",name:"Wynn Palace",region:"Cotai",tag:"Nhạc nước",cost:"Ngắm bên ngoài miễn phí",time:"45–90 phút",best:"Buổi tối",image:"venetian",lat:22.14967,lng:113.57074,description:"Hồ nhạc nước Performance Lake và SkyCab (kiểm tra lịch vận hành)."},
    {id:"coloane",name:"Coloane Village",region:"Coloane",tag:"Slow travel",cost:"Miễn phí",time:"1–2 giờ",best:"Buổi sáng",image:"taipa",lat:22.1175,lng:113.5581,description:"Làng ven biển với nhà màu sắc ấm áp, ngõ nhỏ và nhịp sống yên bình."},
    {id:"tower",name:"Macau Tower",region:"Macau Peninsula",tag:"Panorama",cost:"Đài quan sát trả phí",time:"1–2 giờ",best:"Cuối chiều",image:"city",lat:22.17981,lng:113.53661,description:"Đài quan sát và hoạt động mạo hiểm, kiểm tra giá và giới hạn tuổi."}
  ],
  foods:[
    {name:"Portuguese egg tart",vi:"Bánh tart trứng Bồ Đào Nha",low:12,high:20,unit:"cái",image:"tart",where:"Lord Stow’s Bakery · Coloane",description:"Vỏ giòn xốp, nhân custard béo, mặt caramel hơi cháy. Ăn nóng là ngon nhất."},
    {name:"Pork chop bun",vi:"Bánh mì kẹp sườn heo",low:40,high:70,unit:"phần",image:"pork",where:"Tai Lei Loi Kei · Taipa",description:"Bánh mì giòn kẹp sườn heo đậm vị. Đặc sản ăn nhanh rất nổi tiếng."},
    {name:"African chicken",vi:"Gà Phi châu kiểu Macanese",low:120,high:220,unit:"phần",image:null,where:"Nhà hàng Macanese",description:"Thịt gà nướng cùng sốt gia vị phức hợp, có thể chứa dừa, lạc hoặc ớt."},
    {name:"Cantonese dim sum",vi:"Há cảo, xíu mại, dimsum",low:60,high:140,unit:"người",image:null,where:"Quán dimsum địa phương",description:"Đi đông chia nhiều xửng, hợp ăn sáng hoặc brunch."},
    {name:"Serradura",vi:"Kem vụn bánh quy",low:25,high:50,unit:"cốc",image:null,where:"Tiệm dessert khu Taipa",description:"Kem lạnh xếp lớp với vụn bánh quy kiểu Bồ Đào Nha."},
    {name:"Shrimp roe noodles",vi:"Mì trứng tôm / hoành thánh",low:40,high:85,unit:"tô",image:null,where:"Quán mì Quảng Đông",description:"Sợi mì dai, nước súp thanh hoặc mì khô với trứng tôm."},
    {name:"Almond cookies",vi:"Bánh hạnh nhân",low:35,high:85,unit:"gói",image:null,where:"Koi Kei Bakery · phố cổ",description:"Bánh nướng vụn hạnh nhân, hợp mua làm quà."}
  ],
  hotels:[
    {name:"Morpheus at City of Dreams",district:"Cotai",tier:"Luxury",keys:"3 MICHELIN Keys (2026)",price:"Giá động · kiểm tra ngày cụ thể",why:"Thiết kế kiến trúc ấn tượng, trải nghiệm nghỉ dưỡng xa xỉ.",url:"https://www.cityofdreamsmacau.com"},
    {name:"Banyan Tree Macau",district:"Cotai",tier:"Luxury",keys:"2 MICHELIN Keys (2026)",price:"Giá động · kiểm tra ngày cụ thể",why:"Không gian nghỉ dưỡng riêng tư và spa cao cấp.",url:"https://www.banyantree.com"},
    {name:"Grand Lisboa Palace Resort",district:"Cotai",tier:"Luxury",keys:"2 MICHELIN Keys (2026)",price:"Giá động · kiểm tra ngày cụ thể",why:"Resort lớn có nhiều trải nghiệm mua sắm và ẩm thực.",url:"https://www.grandlisboapalace.com"},
    {name:"The Londoner Macao",district:"Cotai",tier:"Upscale",keys:"1 MICHELIN Key (2026)",price:"Giá động · kiểm tra ngày cụ thể",why:"Nằm giữa cụm điểm check-in Cotai.",url:"https://www.sandsresortsmacao.com"},
    {name:"Four Seasons Hotel Macao",district:"Cotai",tier:"Luxury",keys:"1 MICHELIN Key (2026)",price:"Giá động · kiểm tra ngày cụ thể",why:"Phù hợp du khách ưu tiên dịch vụ cá nhân và nghỉ dưỡng.",url:"https://www.fourseasons.com/macau/"},
    {name:"The Venetian Macao",district:"Cotai",tier:"Upscale",keys:"Không gán Michelin Key",price:"Giá động · kiểm tra ngày cụ thể",why:"Vị trí tiện tham quan kênh đào và shopping.",url:"https://www.venetianmacao.com"},
    {name:"Hotel Lisboa",district:"Macau Peninsula",tier:"City",keys:"Không gán Michelin Key",price:"Giá động · kiểm tra ngày cụ thể",why:"Lựa chọn khám phá phố cổ, thuận tiện khu trung tâm.",url:"https://www.hotelisboa.com.mo"}
  ],
  benchmark:[{category:"Khách sạn 3 sao",value:929.4},{category:"Khách sạn 4 sao",value:1119.3},{category:"Khách sạn 5 sao",value:1477.6}],
  expenses:[
    {item:"Bữa sáng bình dân",low:30,high:60,note:"Khoảng dự trù"},
    {item:"Mì / cơm / món nhanh",low:45,high:90,note:"Khoảng dự trù"},
    {item:"Trà sữa / cà phê",low:25,high:55,note:"Khoảng dự trù"},
    {item:"Nhà hàng tầm trung / người",low:120,high:250,note:"Khoảng dự trù"},
    {item:"Nhà hàng cao cấp / người",low:300,high:600,note:"Có thể cao hơn"},
    {item:"Xe buýt công cộng / lượt",low:6,high:6,note:"Giá niêm yết; tiền mặt không thối"},
    {item:"LRT / lượt",low:6,high:12,note:"Tùy khoảng cách"},
    {item:"Taxi mở cửa (1,6km đầu)",low:21,high:21,note:"Chưa gồm phụ thu"}
  ],
  souvenirs:[
    {name:"Bánh hạnh nhân",price:"45–110 MOP/hộp",where:"Koi Kei / Rua de São Paulo",note:"Dễ mang, hợp chia quà."},
    {name:"Bánh trứng cuộn",price:"45–120 MOP/hộp",where:"Rua do Cunha",note:"Chọn hộp kín, xem hạn dùng."},
    {name:"Kẹo đậu phộng, kẹo mè",price:"25–75 MOP",where:"Taipa / phố cổ",note:"Quà nhỏ, giá dễ chịu."},
    {name:"Gạch men azulejo / nam châm",price:"15–250 MOP",where:"Phố cổ / hàng lưu niệm",note:"Nhiều mẫu lấy cảm hứng từ Bồ Đào Nha."},
    {name:"Trà đóng hộp",price:"50–180 MOP",where:"Các tiệm trà",note:"Phù hợp tặng người lớn tuổi."},
    {name:"Thịt khô kiểu Macau",price:"70–160 MOP",where:"Rua do Cunha",note:"Không tự mang về Việt Nam khi chưa kiểm tra kiểm dịch."}
  ],
  cautions:[
    {title:"Visa cho hộ chiếu Việt Nam",detail:"Hộ chiếu Việt Nam phổ thông phải xin visa Macau trước khi đi; không dựa vào visa-on-arrival. Xác minh tại website Chính phủ Macau và cơ quan đại diện Trung Quốc."},
    {title:"Yêu cầu tài chính khi nhập cảnh",detail:"Lưu trú tối đa 7 ngày: ngưỡng chứng minh phương tiện sinh sống tối thiểu 5.000 MOP, không đồng nghĩa phải chi tiêu hoặc xách toàn bộ số tiền mặt."},
    {title:"Đổi tiền từ người lạ",detail:"Không đổi HKD/MOP không chính thức gần casino hoặc trên phố; cảnh giác tiền giả. Kiểm tra tiền thối nếu thanh toán HKD nhưng nhận MOP."},
    {title:"Khu casino",detail:"Người dưới 21 tuổi không được vào casino; không cần chơi casino để trải nghiệm Macau. Đặt giới hạn chi tiêu nếu tham gia."},
    {title:"Giáng sinh và cuối năm đông khách",detail:"Giá phòng, vé dịch vụ và hàng chờ có thể tăng đáng kể dịp 20–25/12 và cuối năm. Nên đặt phòng hoàn huỷ linh hoạt."},
    {title:"Macau, Hong Kong và đại lục khác nhau",detail:"Kiểm tra riêng visa và điều kiện nhập cảnh mỗi điểm nếu bay qua Hong Kong hoặc đi Trung Quốc đại lục."},
    {title:"Giá resort và phí phục vụ",detail:"Xem giá cuối cùng (thuế/phí) khi đặt phòng hoặc ăn buffet. Giá bình quân thị trường không phải báo giá cho tháng 12."},
    {title:"Quà thực phẩm mang về Việt Nam",detail:"Kiểm tra yêu cầu hải quan/kiểm dịch đối với sản phẩm động vật; ưu tiên bánh kẹo có bao bì, nhãn và hạn sử dụng."}
  ],
  days:[
    {day:"01",name:"Di sản & phố cổ",plan:"Sáng Senado Square → Ruins of St. Paul’s → Monte Fort. Chiều A-Ma Temple hoặc Macau Tower. Tối săn ánh đèn khu trung tâm, mua bánh ở Rua de São Paulo.",tip:"Đến St. Paul’s trước 9h nếu muốn ảnh ít người."},
    {day:"02",name:"Taipa & Cotai về đêm",plan:"Sáng Taipa Houses → Rua do Cunha (ăn trưa). Chiều Venetian → Londoner → Parisian. Tối nhạc nước Wynn Palace.",tip:"Dành nhiều thời gian cho Cotai sau hoàng hôn."},
    {day:"03",name:"Coloane & mua quà",plan:"Sáng Coloane Village → Chapel of St. Francis Xavier → Lord Stow’s Bakery. Chiều lấy hành lý, chuẩn bị chuyến bay/xe.",tip:"Nếu về sớm, chuyển Coloane sang ngày đầu."}
  ],
  event:{name:"Light Up Macao 2026–2027",date:"05/12/2026 – 10/01/2027",note:"Lịch đã công bố; giờ và từng điểm trình diễn cần xác nhận gần ngày đi."},
  sources:[
    {name:"Chính phủ Macau — visa nhập cảnh",url:"https://www.gov.mo/en/services/ps-1474/ps-1474b/"},
    {name:"Sở Du lịch Macau — lịch lễ hội",url:"https://www.macaotourism.gov.mo/en/events/calendar"},
    {name:"Cơ quan Khí tượng Macau — số liệu khí hậu",url:"https://www.smg.gov.mo/webdiss/e_climate.htm"},
    {name:"MICHELIN Guide — Macau Hotels Keys 2026",url:"https://guide.michelin.com/mo/en/article/travel/all-the-key-hotels-macau-michelin-guide"},
    {name:"Hiệp hội khách sạn Macau — bình quân 8/2026",url:"https://www.ggrasia.com/macaus-5-star-room-rate-for-august-fell-6-6pct-y-o-y-to-us183-hotel-association"},
    {name:"Sở Du lịch Macau — vận tải",url:"https://www.macaotourism.gov.mo/en/travelessential/before-you-travel/local-transportation"},
    {name:"UNESCO — Historic Centre of Macao",url:"https://whc.unesco.org/en/list/1110/"},
    {name:"Wynn Palace — SkyCab",url:"https://www.wynnresortsmacau.com/en/wynn-palace/experiences/entertainment/sky-cab"},
    {name:"Wikimedia Commons — ảnh Senado Square",url:"https://commons.wikimedia.org/wiki/File:Macau_-_Senado_Square.jpg"},
    {name:"Wikimedia Commons — ảnh St. Paul's",url:"https://commons.wikimedia.org/wiki/File:The_Ruins_of_St._Paul%27s_in_Macau.jpg"},
    {name:"Wikimedia Commons — ảnh Venetian",url:"https://commons.wikimedia.org/wiki/File:The_Venetian_Macao_Night_View_201104.jpg"},
    {name:"Wikimedia Commons — ảnh Taipa Houses",url:"https://commons.wikimedia.org/wiki/File:Taipa_Houses%E2%80%93Museum_1.jpg"}
  ]
};
