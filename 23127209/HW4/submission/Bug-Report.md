# Bug Report

## BUG-01 - Login counter và lock duration sai

**Severity:** Critical  
**Expected:** Mỗi lần sai tăng đúng 1; khóa tại lần thứ 3 trong 30 giây.  
**Actual:** Lần sai đầu đưa counter 0→2; tài khoản khóa ở lần thứ 2 và `locked_until` khoảng 180 giây.  
**Evidence:** `test-results/fr-02/<browser>/...FR02-TC07...`, `...TC08...`, `...TC14...`.

## BUG-02 - Login form sai input type và thiếu error UI

**Severity:** High  
**Expected:** Email `type=email`, password `type=password`, error nằm trên submit.  
**Actual:** Cả hai input là `type=text`; case email không tồn tại không tìm thấy error element phù hợp.  
**Evidence:** FR02-TC04, TC05, TC06 screenshots/traces.

## BUG-03 - Tổng checkout chỉnh sửa được

**Severity:** High  
**Expected:** Tổng tiền tự tính và không cho người dùng sửa.  
**Actual:** Spinbutton không `readonly` và không `disabled`.  
**Evidence:** FR08-TC02.

## BUG-04 - Backend tin `total_amount` của client

**Severity:** Critical  
**Expected:** Backend tự tính lại hoặc từ chối payload sai.  
**Actual:** Các giá trị `1`, `0`, `-1` được lưu nguyên vào order.  
**Evidence:** FR08-TC03, TC07, TC08, kèm `created-order` attachment.

## BUG-05 - Checkout thiếu guard cho guest/empty cart

**Severity:** High  
**Expected:** Guest bị chuyển login; giỏ rỗng không thể checkout.  
**Actual:** Guest ở được `/checkout`; user với giỏ rỗng vẫn thấy nút xác nhận.  
**Evidence:** FR08-TC04, TC05.

## BUG-06 - Category validation thiếu

**Severity:** Medium  
**Expected:** Tên bắt buộc, không được rỗng; duplicate phải có xử lý rõ ràng.  
**Actual:** Empty, whitespace và duplicate đều được tạo.  
**Evidence:** FR14-TC04, TC05, TC06.

## BUG-07 - Category API không kiểm tra role admin

**Severity:** Critical  
**Expected:** User thường nhận 403 khi POST/DELETE category.  
**Actual:** User token nhận 200 và thay đổi dữ liệu.  
**Evidence:** FR14-TC08, TC09.

## BUG-08 - Xóa ID không tồn tại trả thành công

**Severity:** Medium  
**Expected:** HTTP 404.  
**Actual:** HTTP 200 `Category deleted` dù không có row bị xóa.  
**Evidence:** FR14-TC07.

## GitHub Issues

Repository: https://github.com/namdin05/ST-Group. Screenshot tương ứng được lưu trong `evidence/screenshots/`; giữ các liên kết GitHub Issue đã đăng cùng hồ sơ nộp.
