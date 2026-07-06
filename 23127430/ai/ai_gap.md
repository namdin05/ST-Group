# AI GAP

## FR-01: Đăng ký tài khoản

- Lỗ hổng trong Phân vùng tương đương (Domain Testing Gaps)
    - Thiếu kiểm tra chuẩn hóa dữ liệu: AI chỉ sử dụng dữ liệu ASCII thông thường và bỏ sót các trường hợp tiếng Việt có dấu, Unicode, khoảng trắng đầu/cuối hoặc khoảng trắng kép.
    - Thiếu kiểm tra bảo mật: Không có test case cho XSS, SQL Injection hoặc kiểm tra rò rỉ thông tin tài khoản qua thông báo lỗi.
    - Thiếu kiểm tra lạm dụng luồng: Bỏ sót các kịch bản spam nhiều lần nút Đăng ký hoặc đăng ký khi người dùng đã đăng nhập.

- Lỗ hổng trong Phân tích giá trị biên (Boundary Value Analysis Gaps)
    - Biên Password chưa thực tế: Chỉ tập trung vào số lượng ký tự mà chưa kiểm tra các trường hợp gần đạt yêu cầu như thiếu đúng một loại ký tự hoặc chứa khoảng trắng.
    - Bỏ sót biên trên: Không xem xét giới hạn độ dài thực tế của Email và các trường dữ liệu theo giới hạn hệ thống hoặc cơ sở dữ liệu.

- Nguyên nhân AI bỏ sót: Tư duy bám sát đặc tả (Spec-driven bias): AI tối ưu hóa để không vi phạm tài liệu sẵn có, dẫn đến việc thiết kế các kịch bản "Happy-path" (đường hạnh phúc) mà thiếu đi tư duy nghịch phá (Adversarial thinking) của một kiểm thử viên con người nhằm phá vỡ hệ thống.

| **TC ID** | **Platform** | **Layer** | **Technique** | **Objective** | **Test Data** | **Expected Result** | **Source** |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **TC-FR01-ADD-01** | Web | UI/API | Domain | Kiểm tra chuẩn hóa tên tiếng Việt có dấu | Name:  `Nguyễn   Văn Á` | Hệ thống tự động trim khoảng trắng thừa ở đầu/cuối và lưu đúng font Unicode tiếng Việt. | **Human Added** |
| **TC-FR01-ADD-02** | Web | API | Security | Kiểm tra lỗ hổng XSS tại trường Họ Tên | Name: `<script>alert(1)</script>` | Backend reject payload hoặc xử lý sanitize chuỗi, không thực thi script bậy. | **Human Added** |
| **TC-FR01-ADD-03** | Web | API | BVA | Kiểm tra biên ngầm lưu trữ tối đa của DB | Name: Chuỗi 256 ký tự 'A' | Hệ thống chặn báo lỗi quá độ dài, không gây lỗi sập Database (500 Internal Server Error). | **Human Added** |

---

## FR-07: Giỏ hàng (Shopping Cart)

- **Sai logic nghiệp vụ khi giảm số lượng về 0**
    - AI cho rằng số lượng sản phẩm không thể giảm dưới 1.
    - Thực tế, khi số lượng đang là 1 và người dùng bấm -, hệ thống thường hiển thị xác nhận xóa hoặc tự động xóa sản phẩm khỏi giỏ hàng.

- **Phân tích giá trị biên chưa đầy đủ**
    - AI chỉ kiểm tra các giá trị 0, 1, 2.
    - Bỏ sót các giá trị lỗi quan trọng ở tầng API như -1, giá trị rỗng hoặc số thập phân (1.5).

- **Bỏ sót rủi ro nhận diện sản phẩm**
    - AI chỉ kiểm tra việc thêm cùng một sản phẩm nhiều lần.
    - Chưa kiểm tra trường hợp hai sản phẩm khác ID nhưng trùng tên, có thể dẫn đến lỗi gộp nhầm sản phẩm trong giỏ hàng.

- **Nguyên nhân AI bỏ sót**: AI tập trung vào luồng UI cơ bản và các biên đơn giản, nên bỏ sót các quy tắc nghiệp vụ thực tế và các rủi ro ở tầng dữ liệu/API.

---

## FR-13: Dashboard (Admin)

- **Gaps in Domain Testing & Business Logic**
    - Thiếu kiểm tra dữ liệu thời gian thực: Không kiểm tra việc Dashboard tự động cập nhật khi dữ liệu thay đổi trong Supabase.

- **Gaps in Boundary Value Analysis**
    - Thiếu biên xử lý tiền tệ: Chưa xem xét sai số tính toán hoặc các trường hợp dữ liệu tiền tệ lớn.
    - Thiếu biên khối lượng dữ liệu: Chỉ kiểm tra số lượng đơn hàng nhỏ, chưa đánh giá cách Dashboard hiển thị số lượng lớn.

- **Nguyên nhân AI bỏ sót**
AI tập trung vào yêu cầu chức năng cơ bản và công thức tính toán, nên bỏ sót các quy tắc nghiệp vụ kế toán và cơ chế đồng bộ dữ liệu thời gian thực.

---

## FR-06: Xem chi tiết sản phẩm

- Lỗ hổng trong Phân vùng tương đương (Domain Testing Gaps)
Thiếu kiểm tra ngữ cảnh Mobile: AI bỏ sót các trường hợp thay đổi mạng (WiFi, 4G, mất mạng), tải dữ liệu chậm và hiển thị trên các độ phân giải màn hình khác nhau.
Thiếu kiểm tra vòng đời ứng dụng: Không xem xét các tình huống gián đoạn như cuộc gọi đến, thông báo hệ thống, ứng dụng chạy nền rồi quay lại.

- Lỗ hổng trong Phân tích giá trị biên (Boundary Value Analysis Gaps)
Thiếu biên của bàn phím Mobile: Chưa kiểm tra các ký tự đặc biệt trên bàn phím số (-, ., ,) hoặc hành vi của nút Done/Submit khi nhập số lượng.
Thiếu biên hiển thị giao diện: Bỏ sót trường hợp tên hoặc mô tả sản phẩm quá dài gây lỗi hiển thị, tràn chữ hoặc che khuất nút chức năng.

- Nguyên nhân AI bỏ sót: AI thiên về mô hình kiểm thử ứng dụng Web, nên tập trung vào dữ liệu nhập liệu và luồng chức năng cơ bản, đồng thời chưa suy luận đầy đủ các yếu tố đặc thù của Mobile như phần cứng, mạng và vòng đời ứng dụng.

| **TC ID** | **Feature** | **Platform** | **Layer** | **Technique** | **Objective** | **Test Data** | **Steps** | **Expected Result** | **Source** |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **FR06-UI-09** | Product Detail | Mobile | UI | Exploratory | Xác minh tính ổn định của UI khi gặp sự kiện gián đoạn vòng đời ứng dụng | Sản phẩm ID `1` | 1. Mở xem chi tiết sản phẩm ID 1. <br> 2. Giả lập một cuộc gọi đến (hoặc ẩn app xuống nền).<br> 3. Quay lại ứng dụng sau 10 giây. | Ứng dụng không bị crash, giao diện chi tiết sản phẩm giữ nguyên trạng thái và nút "Thêm vào giỏ hàng" vẫn hoạt động bình thường. | **Human Added** |
| **FR06-UI-10** | Product Detail | Mobile | UI | BVA | Kiểm tra biên hiển thị (Text Overflow) với tên sản phẩm cực dài | Sản phẩm có tên dài 200 ký tự | 1. Chọn mở sản phẩm có tên siêu dài từ danh sách. <br> 2. Quan sát màn hình chi tiết. | Tên sản phẩm được hiển thị khéo léo (xuống dòng hoặc elip `...`), không làm che khuất hoặc đẩy nút "Thêm vào giỏ hàng" ra khỏi màn hình. | **Human Added** |