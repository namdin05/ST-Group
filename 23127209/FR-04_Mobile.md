# FR-04: Quản lý hồ sơ cá nhân (Mobile)
## Bước 1: Input Variables & Domains

  ### A. Biến đầu vào trực tiếp (UI Input Variables)

  | # | Biến | Kiểu | Miền giá trị (Domain) | Nguồn đặc tả |
  |---|---|---|---|---|
  | V1 | **Họ Tên** | String | Chuỗi ký tự, có thể cập nhật | FR-04: "cập nhật: Họ Tên" |
  | V2 | **Số điện thoại** | String | Bắt đầu bằng số `0`, từ 10–11 chữ số | FR-04: "bắt đầu bằng số 0, từ 10–11 chữ số" |
  | V3 | **Địa chỉ giao hàng mặc định** | String | Chuỗi ký tự, có thể cập nhật | FR-04: "cập nhật: Địa chỉ giao hàng mặc định" |

  ### B. Biến trạng thái hệ thống (System State)

  | # | Biến | Kiểu | Miền giá trị (Domain) | Nguồn đặc tả |
  |---|---|---|---|---|
  | S1 | **Trạng thái đăng nhập** | Boolean | {Đã đăng nhập, Chưa đăng nhập} | FR-04: "Người dùng **đã đăng nhập** có thể cập nhật" |
  | S2 | **Quyền sở hữu hồ sơ** | Boolean | {Hồ sơ của chính mình, Hồ sơ của người khác} | FR-04: "chỉ có thể cập nhật hồ sơ **của chính mình**" |

  ### C. Biến đầu ra (Output Variables)

  | # | Biến | Kiểu | Miền giá trị (Domain) | Nguồn đặc tả |
  |---|---|---|---|---|
  | O1 | **Kết quả cập nhật** | Enum | {Thành công, Thất bại} | FR-04 |
  | O2 | **Trạng thái trường Email trên UI** | UI State | {Read-only (không cho sửa), Editable (cho sửa)} | FR-04: "Email **không được phép** thay đổi qua giao diện" |
  | O3 | **Trạng thái thuộc tính Role qua API** | API Behavior | {Không cho thay đổi từ client, Cho phép thay đổi} | FR-04: "không thể tự thay đổi thuộc tính `role`" |

---