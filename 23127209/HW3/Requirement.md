Dựa vào tài liệu hướng dẫn bài tập về nhà *HW03 - GUI & Usability Testing trên hệ thống EMS*, dưới đây là các công việc bạn cần thực hiện. Bài tập này được thực hiện theo hình thức *nhóm kết hợp cá nhân*.

### I. Giai đoạn chuẩn bị (Theo nhóm)

  * *Thành lập nhóm:* Nhóm từ 3-4 sinh viên.
  * *Phân chia Kịch bản (Scenario):* Có 4 kịch bản từ A đến D. Mỗi thành viên trong nhóm phải chọn *chính xác một kịch bản khác nhau* để thực hiện và không được trùng lặp màn hình kiểm thử trong nhóm.
      * Scenario A: Admin tạo và quản lý sự kiện.
      * Scenario B: Người dùng đăng ký tham gia sự kiện.
      * Scenario C: Admin quản lý người dùng.
      * Scenario D: Người dùng gửi yêu cầu hỗ trợ và Admin giải quyết.
  * *Chọn màn hình kiểm thử:* Với kịch bản đã chọn, bạn phải liệt kê ít nhất *3 màn hình* thuộc nhóm chức năng đó để tiến hành kiểm thử xuyên suốt các task.

-----

### II. Các Nhiệm vụ cụ thể (Tasks)

#### Task 1: GUI Checklist (Kiểm thử giao diện)

  * *Phần A - Thiết kế Checklist chung (Nộp theo nhóm):*
      * Cả nhóm cùng thiết kế một bảng GUI checklist chung gồm *hơn 40 mục*, bao phủ đủ 4 khía cạnh giao diện (Tiêu chuẩn UI chung IA-01, Form IA-02, Điều hướng IA-03, Phản hồi/Trạng thái IA-04) dựa trên các nguyên lý UI/UX đã học.
      * Sử dụng AI để tạo bản nháp ban đầu, sau đó tự đánh giá, bổ sung thủ công và giải thích lý do vì sao AI bỏ sót các mục đó.
      * Tài liệu cần nộp kèm: danh sách nguồn tham khảo và các câu lệnh (prompts) đã dùng với AI.
  * *Phần B - Thực thi trên Kịch bản (Nộp cá nhân):*
      * Áp dụng checklist chung của nhóm vào ít nhất 3 màn hình bạn đã chọn, đánh dấu Đạt (Passed) hoặc Lỗi (Failed) cho từng mục.
      * Ghi rõ lý do lỗi, chụp ảnh minh chứng cho các mục Bị Lỗi (Failed) và báo cáo lỗi.

#### Task 2: User Testing & Usability Report (Kiểm thử độ khả dụng)

  * *Giai đoạn 1: Chuẩn bị:* Thiết kế một kịch bản kiểm thử thực tế định hướng theo mục tiêu cho người dùng (không đưa hướng dẫn từng bước click). Định nghĩa các chỉ số đo lường (tỷ lệ thành công, thời gian thực hiện, số lỗi, điểm SUS hoặc UEQ-S). Tuyển dụng *5 người dùng thật* phù hợp với hồ sơ đối tượng và chạy thử (pilot) với 1 người bổ sung.
  * *Giai đoạn 2: Thực hiện:* Tiến hành 5 phiên kiểm thử riêng biệt với từng người. Quan sát trung lập, ghi âm/ghi hình (nếu được đồng ý) và ghi chú lại các điểm khó khăn của họ. Cuối phiên, yêu cầu họ điền bảng đánh giá SUS/UEQ-S và trả lời câu hỏi khảo sát.
  * *Giai đoạn 3: Phân tích & Báo cáo:* Tính toán điểm số, phân loại các vấn đề giao diện, xếp hạng mức độ nghiêm trọng (từ 0-4) và viết Báo cáo độ khả dụng (Usability Report) kèm đề xuất cải thiện.

#### Task 3: Cross-Browser / Cross-Platform (Kiểm thử đa nền tảng)

  * Xây dựng một ma trận kiểm thử cho 3 màn hình của bạn để đảm bảo kiểm tra đủ ít nhất: *3 hệ điều hành*, *5 trình duyệt* và *3 loại thiết bị* (máy tính, máy tính bảng, điện thoại).
  * Sử dụng các công cụ như BrowserStack hoặc LambdaTest để thực hiện kiểm thử.
  * *Bắt buộc:* Chụp ảnh màn hình cho từng cấu hình kiểm thử trong ma trận, ảnh chụp phải có chèn đè (overlay) email SV dạng MSSV@....edu.vn bên cạnh URL của hệ thống EMS.

-----

### III. Báo cáo Bug & Sử dụng AI, Công cụ

1.  *Kênh nộp Bug (Bắt buộc):* Tất cả các lỗi và đề xuất cải tiến tìm được từ Task 1-3 phải được nộp *2 lần*: một lần qua Google Form của môn học và một lần tổng hợp lại thành file nhật ký lỗi (Bug & Usability Findings Log) để nộp trong file bài làm.
2.  *Xây dựng Agent Skill:* Bạn được khuyến khích xây dựng các Agent Skill tự động hóa việc chạy checklist, đánh giá heuristic hoặc ma trận tương thích và quay video minh họa (đăng YouTube).
3.  *Báo cáo AI Audit & AI Critique (Bắt buộc):* Viết báo cáo nhật ký sử dụng AI (công cụ, thời gian, câu lệnh, kết quả) và một đoạn văn từ 200-300 từ phê bình, đánh giá về những điểm AI làm sai/thiếu cũng như bài học rút ra.
4.  *Nhật ký Git Commit:* Tạo các commit Git tương ứng cho từng bước thực hiện kiểm thử và xuất log ra file văn bản.

-----

### IV. Quy định nộp bài

  * *Hình thức:* Nộp file nén định dạng .zip lên Moodle.
  * *Tên file:* <StudentID>_HW03_AI_GUIUsability_EMS_<SelfAssessedGrade>.zip (Trong đó SelfAssessedGrade là điểm bạn tự đánh giá gồm 3 chữ số từ 000 đến 100).
  * *Thành phần bắt buộc trong file .zip:* Bao gồm Báo cáo chính (PDF + Markdown), minh chứng User-testing (ghi chú, bảng điểm), Log lỗi, Ảnh chụp đa nền tảng (có đè MSSV), Báo cáo AI Audit/Critique, Git log, link Agent Skill và một file README.md tổng hợp thông tin kết quả kiểm thử và bảng tự chấm điểm.