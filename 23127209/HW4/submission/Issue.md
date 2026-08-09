# GitHub Issue Descriptions - FR-02, FR-08, FR-14

Các mục dưới đây là nội dung chuẩn bị để sinh viên đăng lên GitHub. File không khẳng định issue đã được đăng và không chứa screenshot do AI tạo.

## BUG-01 - [FR-02] Login counter và lock duration sai

**Severity:** Critical  
**Test cases:** FR02-TC07, FR02-TC08, FR02-TC11, FR02-TC13-TC15

### Steps

1. Tạo user mới ở trạng thái chưa khóa.
2. Gửi password sai liên tiếp.
3. Kiểm tra `login_attempts` và `locked_until`.

### Expected

Mỗi lần sai tăng counter đúng 1; khóa ở lần thứ ba và tự mở sau 30 giây.

### Actual

Counter tăng 2, tài khoản khóa sớm và thời gian khóa khoảng 180 giây.

---

## BUG-02 - [FR-02] Login form dùng sai input type và error UI

**Severity:** High  
**Test cases:** FR02-TC03-TC06

### Expected

Email dùng `type=email`, password dùng `type=password`; lỗi validation xuất hiện phía trên nút submit và không tiết lộ tài khoản có tồn tại hay không.

### Actual

Hai input dùng `type=text`; native validation và vùng thông báo lỗi không đáp ứng đặc tả.

---

## BUG-03 - [FR-08] Tổng checkout có thể chỉnh sửa trực tiếp

**Severity:** High  
**Test case:** FR08-TC02

### Steps

1. Đăng nhập và thêm sản phẩm vào giỏ.
2. Mở checkout.
3. Kiểm tra thuộc tính của input tổng tiền.

### Expected

Tổng tiền được tự tính và không thể sửa.

### Actual

Input tổng tiền không `readonly` hoặc `disabled`.

---

## BUG-04 - [FR-08] Backend tin total_amount từ client

**Severity:** Critical  
**Test cases:** FR08-TC03, FR08-TC07, FR08-TC08

### Steps

1. Checkout một sản phẩm.
2. Chặn request UI và đổi `total_amount` thành `1`, `0` hoặc `-1`.
3. Đọc order vừa tạo.

### Expected

Backend từ chối payload hoặc tự tính lại tổng từ sản phẩm.

### Actual

Order lưu nguyên tổng tiền giả mạo.

---

## BUG-05 - [FR-08] Checkout không chặn guest và giỏ rỗng

**Severity:** High  
**Test cases:** FR08-TC04, FR08-TC05, FR08-TC12

### Expected

Guest bị chuyển tới login; giỏ rỗng không có thao tác xác nhận; sau checkout giỏ và badge trở về 0.

### Actual

Guest có thể mở `/checkout`, giỏ rỗng vẫn có nút xác nhận và header không hiển thị cart badge.

---

## BUG-06 - [FR-14] Category API thiếu validation tên

**Severity:** Medium  
**Test cases:** FR14-TC04, FR14-TC05, FR14-TC06

### Expected

Tên rỗng, whitespace và duplicate bị từ chối bằng mã lỗi phù hợp.

### Actual

API chấp nhận và tạo category cho cả ba trường hợp.

---

## BUG-07 - [FR-14] User thường có thể thêm hoặc xóa category

**Severity:** Critical  
**Test cases:** FR14-TC08, FR14-TC09

### Steps

1. Đăng nhập bằng tài khoản role user.
2. Gửi POST hoặc DELETE `/api/categories` với user token.

### Expected

API trả HTTP 403 và dữ liệu không thay đổi.

### Actual

API trả HTTP 200 và thực hiện thay đổi dữ liệu.

---

## BUG-08 - [FR-14] Xóa category không tồn tại vẫn trả thành công

**Severity:** Medium  
**Test case:** FR14-TC07

### Expected

DELETE ID không tồn tại trả HTTP 404.

### Actual

API trả HTTP 200 với thông báo `Category deleted` dù không có row bị xóa.

---

## Student completion checklist

- Thêm GitHub Issue URL cho từng mục sau khi đăng.
- Đính kèm screenshot GitHub Issue page do sinh viên tự tạo.
- Liên kết Issue URL trở lại `Bug-Report.md`.
