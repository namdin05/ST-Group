

| FR | Test case | Description | Note |
| :---: | ----- | ----- | ----- |
| FR-02 | **TC-I2** | Email format sai | Nhập tên đăng nhập không phải định dạng email vẫn có thể gửi đăng nhập được mà không bị chặn bằng validation của HTML5 |
|  | **TC-I6** | Sai lần thứ 3 → Kích hoạt khóa | Bị khóa sau lần thứ 2 |
|  | **TC-BVA1** | Sai lần thứ 2 (counter 1→2, chưa khóa) | Nhập sai 2 lần đã bị khóa |
|  | **TC-BVA5** | Login tại 31s sau khóa → đã mở khóa | Sau 30 giây vẫn không đăng nhập được. Thời gian thật sự là 3 phút |
| FR-04 (Mobile) | **TC-V1** | Cập nhật hồ sơ thành công (Happy Path) | Validate số điện thoại lỗi dù nhập đúng (không nhận số 0 ở đầu) |
|  | **TC-I3** | SĐT không bắt đầu bằng 0 | Vẫn cập nhật được miễn đủ độ dài |
|  | **TC-I4** | SĐT quá ngắn (\< 10 số) | Có thể cập nhật qua API |
|  | **TC-I5** | SĐT quá dài (\> 11 số) | Có thể cập nhật qua API |
|  | **TC-I6** | SĐT chứa ký tự không phải số | Có thể cập nhật qua API |
|  | **TC-I8** | Gửi API thay đổi role | Có thể đổi role qua API bằng cách gửi payload chứa {role: "admin"} |
|  | **TC-I9** | Họ Tên rỗng | Có thể xóa họ tên (Dù mô tả chức năng không nói rõ nhưng thực tế để tên rỗng là vô lý) |
|  | **TC-I10** | Địa chỉ giao hàng rỗng | Có thể xóa địa chỉ giao hàng (Yêu cầu không nói rõ nhưng vô lý) |
|  | **TC-I11** | SĐT rỗng | Có thể cập nhật qua API |
|  | **TC-BVA1** | Cập nhật SĐT đúng 11 chữ số | Không thành công do chứa số 0 ở đầu. Nếu bỏ số 0 ở đầu đi và đúng 11 chữ số thì thành công |
| FR-08 | **TC-V1** | Thanh toán thành công (Happy Path) | Đơn hàng đã được tạo nhưng giỏ hàng không được xóa |
|  | **TC-I2** | Giả mạo payload API total\_amount | Gửi payload giả chứa total amount thì đơn hàng sẽ được tạo với total amount được gửi lên |
|  | **TC-I4** | Thanh toán khi giỏ hàng trống | Khi đến trang thanh toán và reload trang thì sẽ mất thông tin các sản phẩm cần được thanh toán nhưng vẫn có thể tiến hành thanh toán được. Đơn được tạo có giá 0đ và không có sản phẩm |
|  | **TC-BVA2** | Giả mạo payload total\_amount âm | Có thể gửi payload total amount âm được. Đơn hàng được tạo thành công với giá âm |
|  | **TC-BVA3** | Giả mạo payload total\_amount \= 0 | Tương tự, có thể giả mạo payload với bất kì total amount nào |
| FR-14 | **TC-I1** | Thêm danh mục với tên rỗng | Có thể thêm thành công |
|  | **TC-I2** | Non-admin thử thao tác danh mục | Non-admin có thể xóa danh mục qua API, chỉ cần authenticated là được |
|  | **TC-I3** | Xóa danh mục không tồn tại | Gửi API xóa danh mục không tồn tại nhưng vẫn thông báo xóa thành công (mặc dù không có danh mục nào bị ảnh hưởng) |
|  | **TC-I4** | Thêm danh mục trùng tên | Vẫn có thể thêm được (dù không có ràng buộc trong yêu cầu nhưng vô lý) |
|  | **TC-I5** | Thêm danh mục tên chỉ có khoảng trắng | Vẫn có thể thêm được thành công |

