## II. QUY TRÌNH KỸ THUẬT BẮT BUỘC (TECHNICAL PROCESS)
AI Agent phải thực hiện thiết kế kiểm thử theo quy trình nghiêm ngặt gồm 4 bước nền tảng, kết hợp với tư duy phân tích rủi ro sâu sắc:

### Bước 1: Xác định các biến Đầu vào (Input) và Đầu ra (Output)
* Quá trình phân tích phải dựa hoàn toàn trên đặc tả yêu cầu của chương trình để nhận diện cả đầu vào hợp lệ và bất hợp lệ.
* Agent phải bóc tách rõ ràng: Các biến nhập liệu trực tiếp qua giao diện, các biến trạng thái ngầm, và các phản hồi đầu ra.

### Bước 2: Xác định các Phân hoạch Tương đương (Equivalence Classes)
* Phân chia miền giá trị thành các phân hoạch hợp lệ (Valid) và bất hợp lệ (Invalid).
* Đánh giá sự tương đương (4 Views of Equivalence): Hai giá trị được xem là tương đương không chỉ dựa trên bề mặt, mà phải thỏa mãn một trong các góc nhìn sau:
    * Trực giác (Intuitive Similarity): Quá giống nhau nên test cả hai là vô nghĩa.
    * Đặc tả (Specified As Equivalent): Tài liệu yêu cầu hệ thống xử lý chúng như nhau.
    * Đường dẫn (Equivalent Paths): Chúng đẩy chương trình đi vào cùng một luồng code/nhánh thực thi.
    * Rủi ro (Risk-Based): Cùng tạo ra một kết quả dựa trên giả thuyết về lỗi có thể xảy ra.
* Các nguyên tắc phân hoạch (Guidelines):
    * Khoảng giá trị (Range): Xác định 1 lớp hợp lệ và 2 lớp bất hợp lệ.
    * Số lượng phần tử (Number of values): Nếu giới hạn số lượng (ví dụ: "có từ 1 đến 6"), phải xác định 1 lớp hợp lệ và 2 lớp bất hợp lệ (không có, hoặc nhiều hơn 6).
    * Tập hợp giá trị (Set): Nếu mỗi phần tử xử lý khác nhau, xác định lớp hợp lệ cho từng giá trị và 1 lớp bất hợp lệ chung.
    * Điều kiện bắt buộc ("Must be"): Xác định 1 lớp hợp lệ (thỏa mãn) và 1 lớp bất hợp lệ (không thỏa mãn).
    * Quy tắc chia nhỏ: Nếu có lý do cho thấy các phần tử trong cùng một lớp không được xử lý giống nhau, phải lập tức chia nhỏ lớp đó.

### Bước 3: Lựa chọn "Đại diện tốt nhất" & Tập Test Cases (Selecting Test Cases)
* Mục tiêu cốt lõi là tìm ra "Đại diện tốt nhất" (Best Representative) cho mỗi phân hoạch. Một thành viên là đại diện tốt nhất nếu không có thành viên nào khác trong lớp đó có khả năng phơi bày lỗi cao hơn nó.
* Quy tắc ghép cặp:
    * Đối với các lớp hợp lệ: Chọn test case bao phủ càng nhiều lớp hợp lệ cùng lúc càng tốt.
    * Đối với các lớp bất hợp lệ: Chọn test case sao cho mỗi kịch bản chỉ bao phủ một và chỉ một lớp bất hợp lệ.

### Bước 4: Phân tích Giá trị Biên (BVA) & Cảnh báo Điểm mù
* Hệ thống thường có xác suất lỗi cao nhất tại các đường ranh giới biên do sai sót dấu toán tử (ví dụ: <= thay vì <) hoặc gõ nhầm số. Do đó, đại diện tốt nhất của các trường có thứ tự thường là các giá trị biên.
* Tuy nhiên, Agent phải mở rộng tư duy kiểm thử để vượt qua các thiên kiến (Blind spots):
    * Không chỉ có giá trị biên: Chúng ta hoàn toàn có thể có những đại diện tốt nhất không phải là giá trị biên, và chúng có thể tồn tại trong các miền dữ liệu không có thứ tự.
    * Lỗi ẩn giấu: Phải thiết kế test case bắt cả những lỗi không nằm ở biên hoặc trong các trường hợp đặc biệt rõ ràng, vì đôi khi các miền giá trị thực tế là không thể biết trước.
    * Cạm bẫy hồi quy (Regression Testing): Không được quá lạm dụng các "đại diện tốt nhất" (như giá trị biên) vì sẽ dẫn đến việc overtest (test thừa) các trường hợp này và undertest (bỏ sót) các giá trị bình thường khác vốn cũng tốt không kém.