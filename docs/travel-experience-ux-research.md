# Travel Notebook — Nghiên cứu trải nghiệm du lịch & kiến trúc UX

Cập nhật: 12/10/2026 · Phạm vi: trang chủ đa điểm đến, chuẩn bị trước chuyến đi và hướng dẫn tự túc.

## 1. Điều gì tạo nên một trải nghiệm du lịch dễ chịu và đáng nhớ?

Các bằng chứng khoa học không cho một "công thức chung" áp dụng cho mọi người. Thang đo Memorable Tourism Experiences (Kim, Ritchie & McCormick, Journal of Travel Research 2012, DOI: 10.1177/0047287510385467) gồm **7 thành phần**: (1) cảm giác thích thú, (2) thư giãn/phục hồi, (3) văn hóa địa phương, (4) ý nghĩa cá nhân, (5) học hỏi, (6) tham gia trải nghiệm, và (7) điều mới lạ. Đây là framework định hướng nội dung, không phải lời hứa mức độ hài lòng.

Chen, Petrick & Shahvali (2016) mô tả vai trò của thư giãn, tách khỏi công việc, trải nghiệm làm chủ và quyền kiểm soát trong phục hồi sau căng thẳng. Nghiên cứu về autonomy trong du lịch cho thấy khả năng tự điều chỉnh lịch trình có liên quan đến trải nghiệm phục hồi — không nên ép tất cả du khách đi đủ số điểm do hệ thống định sẵn.

**Suy ra nguyên tắc sản phẩm (giả thuyết cần đo qua user testing):**

1. Tạo cảm giác kiểm soát: người đi tự chọn ưu tiên, điều chỉnh thứ tự và nghỉ bất cứ lúc nào.
2. Tránh lịch trình ngột ngạt: phân biệt "nên đi" với "phải đi", cho phép chừa khoảng trống.
3. Hiểu bối cảnh trước khi đến: chi phí, thời gian hoạt động, tuyến đường, hạn chế và nguồn.
4. Khuyến khích trải nghiệm đa giác quan: món ăn địa phương, câu chuyện, văn hóa, phong cảnh.
5. Loại bỏ nỗi lo lớn sớm: visa, hộ chiếu, sức khỏe, tiền, bảo hiểm, an toàn, phương án dự phòng.
6. Phân biệt bằng chứng: dữ liệu chính thức / số liệu thị trường / giá ước tính / review chưa xác minh.
7. Chuẩn bị phục hồi: phương án B khi mưa, đổi lịch, hết pin, mất mạng, đi lạc.

## 2. Customer journeys & jobs to be done

| Giai đoạn | Câu hỏi người dùng | Thiết kế hữu ích | Failure mode |
|---|---|---|---|
| Khám phá | Có những nơi nào đáng tìm hiểu? | Tìm kiếm quốc gia → tỉnh/vùng → thành phố; trạng thái có/không có guide | Bị đẩy thẳng vào Macau dù muốn tìm Đà Lạt |
| Nghiên cứu | Tôi có thể đến đó không, cần chi bao nhiêu? | Visa theo quốc tịch, chi phí rõ loại, bản đồ POI, nguồn và thời điểm | Nhầm giá dự trù với giá thật, review với thống kê |
| Lên kế hoạch | Có nên ghé và theo thứ tự nào? | Lịch trình tự chọn, điểm ưa thích, không ép theo tour | Quá nhiều điểm, thời gian di chuyển giả |
| Trước chuyến | Việc nào cấp bách? | Checklist theo giai đoạn, progress, filter chưa xong, local save, export | Checklist 30 mục xuất hiện ngập màn hình |
| Khi đi | Tôi đang ở đâu? Đi tiếp đâu? | Định vị với sự đồng ý, bản đồ, Google Maps routes, thông tin offline-readable | Không có mạng, hết pin, sai giờ đóng cửa |
| Sau chuyến | Tôi ghi lại gì, chia sẻ gì? | Review cân bằng có ngày, ảnh và giá tự ghi nhận | Review vô căn cứ, lộ dữ liệu riêng tư |

## 3. Nghiên cứu thông tin và an toàn

Các checklist chính thức từ FCDO (cập nhật 05/06/2026) và CDC tập trung vào điều kiện nhập cảnh/địa phương, bảo hiểm, y tế, giấy tờ, tiền dự phòng, bản sao liên hệ và phương án khi xảy ra sự cố. CDC khuyến nghị liên hệ chuyên gia y tế du lịch trước tối thiểu 4–6 tuần khi phù hợp. Những gợi ý này không thay thế tư vấn bác sĩ hoặc luật nhập cảnh.

Google Maps có thể tải các khu vực offline ở những nơi được hỗ trợ, nhưng **đi bộ, xe đạp, giao thông công cộng và traffic live không khả dụng khi offline**. Không được viết "chạy tour hoàn toàn offline" nếu bản đồ vẫn phải tải tile trực tuyến.

## 4. Nguyên tắc UI/UX

- **Tìm thấy thông tin trước khi bị mời mua/tour:** link và nút có nhãn cụ thể. Nielsen Norman Group gọi đây là *information scent*.
- **Progressive disclosure:** trên trang chủ chỉ cần search, country/province filter, danh sách cẩm nang và checklist; những tác vụ phức tạp nằm trên trang thành phố; checklist có lọc giai đoạn.
- **Phân cấp địa lý thật:** country/territory -> state/province/region -> locality/city; địa điểm nổi tiếng có thể là khu vực du lịch, không phải đơn vị hành chính hiện hành. Khai báo `type` để tránh nói sai.
- **Trạng thái rõ:** published (có cẩm nang thật) vs planned (chỉ có tên); không bấm vào placeholder hoặc dùng số liệu chưa nghiên cứu như đã xác minh.
- **WCAG 2.2:** mục tiêu bấm từ 24×24 CSS px tối thiểu hoặc đủ spacing (ưu tiên 44px trên mobile), focus visible, không bị che bởi sticky header, nhãn rõ ràng, phản hồi công việc qua aria-live, hỗ trợ bàn phím, reduced motion.
- **Bảo mật:** no login, checklist stored localStorage, không hỏi số hộ chiếu, thẻ ngân hàng hoặc tình trạng bệnh.
- **Transparency by default:** hiển thị ngày cập nhật, nguồn, phân loại giá; review cá nhân tách nguồn chính thức.
- **Không quá tải:** tránh carousel tự chạy, đếm ngược cưỡng ép, popup xin permission khi mới tải. Chỉ định vị khi người dùng bấm.
- **Mobile primary:** thao tác 1 tay, font > 12px trên nội dung chính, tránh tab ngang không có chỉ dẫn, CTA dẫn đường dễ tìm.

## 5. Trạng thái triển khai (2026-10-12)

- Homepage không còn hero Macau, thay bằng generic editorial travel library và bộ tìm kiếm theo tên/địa phương có bỏ dấu.
- Central registry: `assets/destinations.js` (country, province, locality, type, continent, status, route).
- Ghi rõ **cẩm nang đã nghiên cứu** và **dự kiến nghiên cứu**. Không dựng city detail giả, ảnh giả, giá hay review chưa kiểm chứng.
- Chọn theo quốc gia, tỉnh/khu vực, Đông Á/Đông Nam Á, tình trạng có cẩm nang; tìm theo dấu/không dấu.
- Global travel checklist: nghiên cứu, giấy tờ/booking, 1–4 tuần, 24–48h, đang đi, sau chuyến; conditional international visa; progress, custom task, trạng thái lưu localStorage, xuất TXT.
- Cấu trúc source registry mở rộng thêm thành phố bằng một record. City page thật chỉ có sau khi thêm folder, nghiên cứu và đăng ký `path`.
- Macau tiếp tục sử dụng independent city guide; không thay đổi nội dung nguồn của Macau trong giai đoạn nâng cấp homepage.

## 6. Giai đoạn tiếp theo nên ưu tiên

**P1 (đo khả dụng):** test với ít nhất 5 người: tìm một thành phố bằng tên có dấu/không dấu, nhận ra city nào thật sự có guide, làm checklist quốc tế/nội địa, quay lại thấy vẫn lưu. Đo: tỉ lệ hoàn thành, thời gian tìm điểm đến, misclick, tỷ lệ hiểu sai badge.

**P1 (data schema):** phân quyền content vs registry, schema validation country/province/locality route, source URL, updated date, type of price; guard against fabricated content and broken links; URL changes history handling.

**P2 (di chuyển):** trip workspace per destination, lịch và timezone, map/itinerary constraints, offline text and emergency card, roundtrip check.

**P2 (reviews):** một luồng cập nhật (provenance, freshness, duplicate, editorial review), nút report nguồn sai, giới hạn và độ tin cậy.

**P3 (đo hiệu quả):** opt-in anonymized funnel metrics `search_submit`, `destination_open`, `checklist_started`, `checklist_progress`, `guide_exported`; A/B test khi đã có dữ liệu. Không thêm tracking mặc định.

## 7. Sources

1. Kim, Ritchie & McCormick (2012). Memorable Tourism Experiences scale. https://journals.sagepub.com/doi/10.1177/0047287510385467
2. Chen, Petrick & Shahvali (2016). Tourism recovery, relaxation and control. https://journals.sagepub.com/doi/full/10.1177/0047287514546223
3. Autonomy and recovery in short/long leisure trips. https://www.tandfonline.com/doi/abs/10.1080/10548408.2018.1525469
4. Nielsen Norman Group. Information scent. https://www.nngroup.com/articles/information-scent/
5. Nielsen Norman Group. Progressive disclosure. https://www.nngroup.com/articles/progressive-disclosure/
6. W3C. WCAG 2.2 new success criteria. https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/
7. UK FCDO. Foreign Travel Checklist (2026). https://www.gov.uk/guidance/foreign-travel-checklist
8. US CDC. Before You Travel. https://wwwnc.cdc.gov/travel/page/before-travel
9. US CDC. Pack Smart. https://wwwnc.cdc.gov/travel/page/pack-smart
10. Google Maps Help. Offline maps limits. https://support.google.com/maps/answer/6291838
11. Vietnam administrative province changes 2025 (province names require future revalidation): https://sav.gov.vn/vi/bai-viet/quoc-hoi-thong-qua-nghi-quyet-ve-viec-sap-xep-don-vi-hanh-chinh-cap-tinh-nam-2025-ca-nuoc-con-34-tinh-thanh-pho-2025-06-12-16-27-06
