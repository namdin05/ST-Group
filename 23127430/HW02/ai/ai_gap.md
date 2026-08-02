# AI GAP

## FR-01: Đăng ký tài khoản

- **Lỗ hổng trong Phân vùng tương đương**
    - Thiếu kiểm tra bảo mật: Không có test case cho XSS, SQL Injection hoặc kiểm tra rò rỉ thông tin tài khoản qua thông báo lỗi.
    - Thiếu kiểm tra lạm dụng luồng: Bỏ sót các kịch bản spam nhiều lần nút Đăng ký hoặc đăng ký khi người dùng đã đăng nhập.

- **Lỗ hổng trong Phân tích giá trị biên**
    - Biên Password chưa thực tế: Chỉ tập trung vào số lượng ký tự mà chưa kiểm tra các trường hợp gần đạt yêu cầu như thiếu đúng một loại ký tự hoặc chứa khoảng trắng.

- **Nguyên nhân AI bỏ sót**: Tư duy bám sát đặc tả (Spec-driven bias): AI tối ưu hóa để không vi phạm tài liệu sẵn có, dẫn đến việc thiết kế các kịch bản "Happy-path" mà thiếu đi tư duy nghịch phá (Adversarial thinking) của một kiểm thử viên con người nhằm phá vỡ hệ thống.

---

## FR-07: Giỏ hàng (Shopping Cart)

- **Sai logic nghiệp vụ khi giảm số lượng về 0**
    - AI cho rằng số lượng sản phẩm không thể giảm dưới 1.
    - Thực tế, khi số lượng đang là 1 và người dùng bấm -, hệ thống thường hiển thị xác nhận xóa hoặc tự động xóa sản phẩm khỏi giỏ hàng nhưng do không có trong mô tả của đồ án nên sẽ không có TCs để cover cho tính năng này.

- **Phân tích giá trị biên chưa đầy đủ**
    - AI chỉ kiểm tra các giá trị 0, 1, 2.
    - Bỏ sót các giá trị lỗi quan trọng ở tầng API như -1, giá trị rỗng hoặc số thập phân (1.5).

- **Bỏ sót rủi ro nhận diện sản phẩm**
    - AI chỉ kiểm tra việc thêm cùng một sản phẩm nhiều lần.
    - Chưa kiểm tra trường hợp hai sản phẩm khác ID nhưng trùng tên, có thể dẫn đến lỗi gộp nhầm sản phẩm trong giỏ hàng.

- **Nguyên nhân AI bỏ sót**: AI tập trung vào luồng UI cơ bản và các biên đơn giản, nên bỏ sót các quy tắc nghiệp vụ thực tế và các rủi ro ở tầng dữ liệu/API.

---

## FR-06: Xem chi tiết sản phẩm

- **Lỗ hổng trong Phân vùng tương đương**
    - Thiếu kiểm tra ngữ cảnh Mobile: AI bỏ sót các trường hợp thay đổi mạng (WiFi, 4G, mất mạng), tải dữ liệu chậm và hiển thị trên các độ phân giải màn hình khác nhau.
    - Thiếu kiểm tra vòng đời ứng dụng: Không xem xét các tình huống gián đoạn như cuộc gọi đến, thông báo hệ thống, ứng dụng chạy nền rồi quay lại.

- **Lỗ hổng trong Phân tích giá trị biên**
    - Thiếu biên hiển thị giao diện: Bỏ sót trường hợp tên hoặc mô tả sản phẩm quá dài gây lỗi hiển thị, tràn chữ hoặc che khuất nút chức năng.

- **Nguyên nhân AI bỏ sót:** AI thiên về mô hình kiểm thử ứng dụng Web, nên tập trung vào dữ liệu nhập liệu và luồng chức năng cơ bản, đồng thời chưa suy luận đầy đủ các yếu tố đặc thù của Mobile như phần cứng, mạng và vòng đời ứng dụng.