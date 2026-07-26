# Thiết Kế Kịch Bản Kiểm Thử Cho Hệ Thống EShop

Tài liệu này định nghĩa các kịch bản kiểm thử (Test Scenarios) và các trường hợp kiểm thử (Test Cases) chi tiết cho 3 phân hệ chính của EShop: **Đăng nhập & Khóa tài khoản**, **Thêm vào giỏ hàng**, và **Thanh toán & Áp dụng mã giảm giá**.

---

## 1. Phân Hệ Đăng Nhập & Khóa Tài Khoản (Login & Account Lockout)

### Ràng buộc nghiệp vụ (FR-02 & FR-22)
*   Email đăng nhập phải có định dạng hợp lệ (`user@domain.com`).
*   Mật khẩu phải được ẩn đi khi nhập (`type="password"`).
*   Đăng nhập sai tối đa **3 lần** liên tiếp sẽ bị khóa tài khoản trong **30 giây** (trong môi trường thử nghiệm).
*   Thông báo lỗi đăng nhập phải hiển thị **phía trên** nút Submit.
*   Thông báo khóa tài khoản không được để lộ chi tiết nguyên nhân (tránh rò rỉ bảo mật).

### Kịch Bản Kiểm Thử (Test Scenarios)

#### Kịch bản 1.1: Đăng nhập thành công với tài khoản hợp lệ
*   **Mục tiêu**: Kiểm tra luồng đăng nhập chuẩn cho cả User và Admin.
*   **Các trường hợp kiểm thử (Test Cases)**:
    1.  **TC-1.1.1**: Đăng nhập với tài khoản User mặc định (`test@eshop.com` / `Test1234!`).
        *   *Kết quả mong đợi*: Đăng nhập thành công, điều hướng về Trang chủ (`/`), hiển thị lời chào `"Chào, <Tên User>"` trên Navbar và lưu trữ JWT token hợp lệ vào LocalStorage.
    2.  **TC-1.1.2**: Đăng nhập với tài khoản Admin mặc định (`admin@eshop.com` / `Admin123!`).
        *   *Kết quả mong đợi*: Đăng nhập thành công, điều hướng về Trang quản trị hoặc Trang chủ, hiển thị lời chào tương ứng.

#### Kịch bản 1.2: Đăng nhập thất bại do thông tin không chính xác
*   **Mục tiêu**: Xác thực xử lý lỗi khi thông tin không khớp với CSDL.
*   **Các trường hợp kiểm thử (Test Cases)**:
    1.  **TC-1.2.1**: Nhập Email chưa đăng ký trong hệ thống.
        *   *Kết quả mong đợi*: Hiển thị thông báo lỗi đăng nhập thất bại. Thông báo nằm ở vị trí phía trên nút Submit.
    2.  **TC-1.2.2**: Nhập đúng Email nhưng sai Mật khẩu.
        *   *Kết quả mong đợi*: Hiển thị thông báo lỗi đăng nhập thất bại phía trên nút Submit.
    3.  **TC-1.2.3**: Để trống trường Email và nhấn Submit.
        *   *Kết quả mong đợi*: Trình duyệt báo lỗi yêu cầu nhập liệu (HTML5 `required` attribute) hoặc báo lỗi trên giao diện.
    4.  **TC-1.2.4**: Để trống trường Mật khẩu và nhấn Submit.
        *   *Kết quả mong đợi*: Trình duyệt báo lỗi yêu cầu nhập liệu (HTML5 `required` attribute) hoặc báo lỗi trên giao diện.

#### Kịch bản 1.3: Kiểm tra định dạng dữ liệu đầu vào (Validation & GUI)
*   **Mục tiêu**: Xác thực các quy định về mặt giao diện và cấu trúc form.
*   **Các trường hợp kiểm thử (Test Cases)**:
    1.  **TC-1.3.1**: Nhập Email không đúng định dạng chuẩn (ví dụ: `nam@`, `nam@com`, `@domain.com`).
        *   *Kết quả mong đợi*: HTML5 Validation hoặc JavaScript báo lỗi Email không đúng định dạng, không cho phép gửi request lên server.
    2.  **TC-1.3.2**: Nhập mật khẩu và kiểm tra thuộc tính hiển thị.
        *   *Kết quả mong đợi*: Các ký tự mật khẩu phải được hiển thị dưới dạng dấu chấm tròn hoặc dấu sao ẩn danh (`type="password"`).

#### Kịch bản 1.4: Tạm khóa tài khoản sau nhiều lần đăng nhập sai (Account Lockout)
*   **Mục tiêu**: Đảm bảo cơ chế tự động khóa tài khoản sau 3 lần đăng nhập sai liên tiếp để phòng chống brute-force.
*   **Các trường hợp kiểm thử (Test Cases)**:
    1.  **TC-1.4.1**: Đăng nhập sai lần thứ 1 -> Đăng nhập sai lần thứ 2.
        *   *Kết quả mong đợi*: Tài khoản chưa bị khóa, thông báo đăng nhập sai bình thường.
    2.  **TC-1.4.2**: Đăng nhập sai liên tiếp lần thứ 3.
        *   *Kết quả mong đợi*: Hệ thống báo lỗi khóa tài khoản tạm thời trong 30 giây.
    3.  **TC-1.4.3**: Thử đăng nhập lại bằng thông tin **ĐÚNG** khi tài khoản đang trong trạng thái bị khóa (< 30 giây kể từ lúc khóa).
        *   *Kết quả mong đợi*: Đăng nhập thất bại và tiếp tục báo lỗi tài khoản đang bị tạm khóa (không được cho phép đăng nhập thành công).
    4.  **TC-1.4.4**: Thử đăng nhập lại bằng thông tin **ĐÚNG** sau khi hết thời gian khóa (> 30 giây).
        *   *Kết quả mong đợi*: Đăng nhập thành công và bộ đếm số lần đăng nhập sai được reset về 0.

---

## 2. Phân Hệ Thêm Vào Giỏ Hàng (Add To Cart)

### Ràng buộc nghiệp vụ (FR-06, FR-07 & FR-24)
*   Từ trang chủ, nhấn vào sản phẩm phải mở trang Chi tiết sản phẩm.
*   Số lượng thêm vào phải là số nguyên dương và tối thiểu là 1.
*   Khi thêm trùng sản phẩm, hệ thống phải cộng dồn số lượng chứ không tạo dòng mới trong giỏ.
*   Thao tác thêm phải có phản hồi trực quan (toast notification / cập nhật badge trên Navbar).
*   Thao tác xóa sản phẩm khỏi giỏ hàng phải yêu cầu xác nhận qua Dialog/Modal.

### Kịch Bản Kiểm Thử (Test Scenarios)

#### Kịch bản 2.1: Thêm sản phẩm thành công từ trang Chi tiết sản phẩm
*   **Mục tiêu**: Kiểm tra luồng thêm sản phẩm cơ bản.
*   **Các trường hợp kiểm thử (Test Cases)**:
    1.  **TC-2.1.1**: Nhấp "Thêm vào giỏ hàng" với số lượng mặc định bằng 1.
        *   *Kết quả mong đợi*: Hệ thống hiển thị toast thông báo thành công, số lượng badge giỏ hàng trên Navbar tăng từ 0 lên 1.
    2.  **TC-2.1.2**: Thay đổi ô số lượng lên 5 và nhấn "Thêm vào giỏ hàng".
        *   *Kết quả mong đợi*: Thêm sản phẩm thành công với số lượng là 5. Badge giỏ hàng trên Navbar cập nhật chính xác tổng số lượng sản phẩm.

#### Kịch bản 2.2: Ràng buộc số lượng sản phẩm thêm vào
*   **Mục tiêu**: Kiểm tra validate trường số lượng nhập vào trên giao diện chi tiết sản phẩm.
*   **Các trường hợp kiểm thử (Test Cases)**:
    1.  **TC-2.2.1**: Nhập số lượng là số 0 hoặc số âm (ví dụ: `-1`, `-5`).
        *   *Kết quả mong đợi*: Nút "Thêm vào giỏ hàng" bị vô hiệu hóa hoặc hệ thống hiển thị thông báo lỗi yêu cầu số lượng tối thiểu là 1.
    2.  **TC-2.2.2**: Nhập số lượng không phải số nguyên (ví dụ: `2.5`, `abc`, `1e3`).
        *   *Kết quả mong đợi*: Ô nhập liệu tự động chuyển về số nguyên gần nhất, từ chối nhập ký tự chữ hoặc hiển thị lỗi không hợp lệ.

#### Kịch bản 2.3: Thêm sản phẩm trùng lặp (Cộng dồn số lượng)
*   **Mục tiêu**: Xác thực logic xử lý khi người dùng chọn mua một sản phẩm nhiều lần.
*   **Các trường hợp kiểm thử (Test Cases)**:
    1.  **TC-2.3.1**: Thêm sản phẩm A (số lượng 2) vào giỏ hàng -> Quay lại trang chủ -> Vào lại sản phẩm A và thêm tiếp (số lượng 3).
        *   *Kết quả mong đợi*: Khi vào trang Giỏ hàng, chỉ hiển thị đúng 1 dòng sản phẩm A với cột Số lượng hiển thị là **5** (`2 + 3`), cột Thành tiền được cập nhật tương ứng.

#### Kịch bản 2.4: Xóa sản phẩm và cập nhật giỏ hàng
*   **Mục tiêu**: Kiểm tra tính năng sửa/xóa các mặt hàng trong giỏ hàng.
*   **Các trường hợp kiểm thử (Test Cases)**:
    1.  **TC-2.4.1**: Nhấn tăng (+) hoặc giảm (-) số lượng trực tiếp trong trang Giỏ hàng.
        *   *Kết quả mong đợi*: Số lượng sản phẩm thay đổi ngay lập tức, cột Thành tiền của dòng đó và Tổng cộng tiền giỏ hàng cập nhật tự động.
    2.  **TC-2.4.2**: Nhấn nút Xóa sản phẩm.
        *   *Kết quả mong đợi*: Một dialog xác nhận (Confirm Dialog/Modal) xuất hiện hỏi người dùng có chắc chắn muốn xóa không.
    3.  **TC-2.4.3**: Chọn "Hủy" trên dialog xác nhận xóa.
        *   *Kết quả mong đợi*: Hộp thoại đóng lại, sản phẩm vẫn giữ nguyên trong giỏ hàng.
    4.  **TC-2.4.4**: Chọn "Xác nhận/Xóa" trên dialog xác nhận xóa.
        *   *Kết quả mong đợi*: Sản phẩm bị xóa khỏi giỏ hàng, tổng tiền cập nhật giảm đi, hiển thị thông báo xóa thành công.
    5.  **TC-2.4.5**: Xóa toàn bộ sản phẩm khỏi giỏ hàng.
        *   *Kết quả mong đợi*: Trang giỏ hàng hiển thị màn hình giỏ hàng trống (Empty State) kèm icon/hình ảnh và thông báo `"Giỏ hàng của bạn đang trống"`.

---

## 3. Phân Hệ Thanh Toán & Áp Dụng Mã Giảm Giá (Checkout & Coupon)

### Ràng buộc nghiệp vụ (FR-08 & FR-09)
*   Chỉ cho phép người dùng đã đăng nhập thanh toán.
*   Tổng tiền thanh toán phải tự động tính từ giỏ hàng, cấm sửa đổi trực tiếp từ client.
*   Mã giảm giá áp dụng thành công khi thỏa mãn đồng thời **5 điều kiện**:
    1.  Mã tồn tại và hoạt động (`is_active = 1`).
    2.  Mã còn hạn sử dụng (`current_date < expired_at`).
    3.  Đơn hàng đạt giá trị tối thiểu (`min_order_amount`).
    4.  Người dùng đã đăng nhập (JWT hợp lệ).
    5.  Người dùng chưa dùng vượt quá số lượt quy định (`max_uses_per_user`).
*   Backend phải tự động tính toán lại tổng tiền từ danh sách sản phẩm khi tạo đơn hàng (không tin tưởng tổng tiền do client gửi lên).
*   Thanh toán thành công phải làm trống giỏ hàng.

### Kịch Bản Kiểm Thử (Test Scenarios)

#### Kịch bản 3.1: Kiểm soát truy cập trang Thanh toán
*   **Mục tiêu**: Đảm bảo an ninh phân quyền cho trang Checkout.
*   **Các trường hợp kiểm thử (Test Cases)**:
    1.  **TC-3.1.1**: Người dùng chưa đăng nhập cố gắng truy cập trực tiếp URL `/checkout`.
        *   *Kết quả mong đợi*: Hệ thống chặn truy cập và điều hướng người dùng về trang Đăng nhập (`/login`).
    2.  **TC-3.1.2**: Người dùng đã đăng nhập truy cập `/checkout`.
        *   *Kết quả mong đợi*: Hiển thị trang thanh toán bình thường với danh sách sản phẩm và thông tin thanh toán.

#### Kịch bản 3.2: Áp dụng Mã giảm giá (Coupon Validation)
*   **Mục tiêu**: Xác thực đầy đủ 5 điều kiện áp dụng mã giảm giá (C1 đến C5) trên form thanh toán.
*   **Các trường hợp kiểm thử (Test Cases)**:
    1.  **TC-3.2.1 (Kiểm tra C1)**: Nhập một mã giảm giá không tồn tại (ví dụ: `FAKECODE`).
        *   *Kết quả mong đợi*: Hệ thống báo lỗi mã giảm giá không hợp lệ, không giảm trừ tiền.
    2.  **TC-3.2.2 (Kiểm tra C2)**: Nhập mã giảm giá đã hết hạn sử dụng (ví dụ: mã mẫu `EXPIRED`).
        *   *Kết quả mong đợi*: Hệ thống thông báo lỗi mã giảm giá đã hết hạn.
    3.  **TC-3.2.3 (Kiểm tra C3 - Không đủ ngưỡng)**: Giỏ hàng trị giá 200,000 ₫, nhập mã `SAVE10` (yêu cầu đơn tối thiểu 300,000 ₫).
        *   *Kết quả mong đợi*: Hệ thống thông báo đơn hàng chưa đạt giá trị tối thiểu để sử dụng mã.
    4.  **TC-3.2.4 (Kiểm tra C3 - Đủ ngưỡng)**: Giỏ hàng trị giá 350,000 ₫, nhập mã `SAVE10`.
        *   *Kết quả mong đợi*: Mã giảm giá áp dụng thành công. Số tiền giảm được tính đúng là 10% (35,000 ₫) và trừ vào tổng tiền cần thanh toán.
    5.  **TC-3.2.5 (Kiểm tra C5)**: Người dùng nhập mã `SAVE10` ở đơn hàng thứ hai (sau khi đã thanh toán thành công một đơn hàng trước đó sử dụng mã này - giới hạn tối đa 1 lần/người).
        *   *Kết quả mong đợi*: Hệ thống báo lỗi người dùng đã hết lượt sử dụng mã giảm giá này.
    6.  **TC-3.2.6 (Kiểm tra công thức giảm giá cố định)**: Giỏ hàng trị giá 550,000 ₫, nhập mã `BIGBUY` (giảm cố định 50,000 ₫ cho đơn từ 500,000 ₫).
        *   *Kết quả mong đợi*: Áp dụng thành công, tổng tiền cần thanh toán giảm đi đúng 50,000 ₫.

#### Kịch bản 3.3: Tính toàn vẹn dữ liệu đơn hàng (Data Integrity & Security)
*   **Mục tiêu**: Kiểm tra khả năng phòng chống gian lận giá cả trong quá trình gửi request thanh toán lên server.
*   **Các trường hợp kiểm thử (Test Cases)**:
    1.  **TC-3.3.1**: Can thiệp request tạo đơn hàng (POST `/api/orders`), thay đổi tham số `total_amount` thành giá trị nhỏ hơn (ví dụ: đổi từ 300,000 ₫ thành 1,000 ₫) trước khi gửi lên Backend.
        *   *Kết quả mong đợi*: Backend từ chối request hoặc tự động tính toán lại số tiền thực tế dựa trên đơn giá sản phẩm trong CSDL và cập nhật đúng số tiền thực vào đơn hàng. Không lưu số tiền gian lận 1,000 ₫.

#### Kịch bản 3.4: Hoàn thành Thanh toán
*   **Mục tiêu**: Xác thực trạng thái hệ thống sau khi thanh toán thành công.
*   **Các trường hợp kiểm thử (Test Cases)**:
    1.  **TC-3.4.1**: Điền thông tin giao hàng, áp dụng mã giảm giá (nếu có) và nhấn "Đặt hàng".
        *   *Kết quả mong đợi*: Hiển thị màn hình đặt hàng thành công, cung cấp mã đơn hàng.
    2.  **TC-3.4.2**: Kiểm tra giỏ hàng sau khi đặt hàng thành công.
        *   *Kết quả mong đợi*: Giỏ hàng được tự động xóa sạch (trống trơn).
    3.  **TC-3.4.3**: Kiểm tra Lịch sử đơn hàng cá nhân.
        *   *Kết quả mong đợi*: Đơn hàng vừa tạo xuất hiện ở trạng thái đầu tiên là `pending` (chờ xử lý).
