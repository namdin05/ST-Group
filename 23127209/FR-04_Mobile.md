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

## FR-04: Quản lý hồ sơ cá nhân (Mobile) — Bước 2: Equivalence Classes

  ### Biến S1: Trạng thái đăng nhập
  **Nguyên tắc áp dụng:** "Must be" (phải đã đăng nhập mới cập nhật được)

  | EC ID | Loại | Phân hoạch | Nguyên tắc |
  |---|---|---|---|
  | EC1 | ✅ Valid | Người dùng đã đăng nhập | Must be — thỏa mãn |
  | EC2 | ❌ Invalid | Người dùng chưa đăng nhập | Must be — không thỏa mãn |

  ### Biến S2: Quyền sở hữu hồ sơ
  **Nguyên tắc áp dụng:** "Must be" (chỉ cập nhật hồ sơ của chính mình)

  | EC ID | Loại | Phân hoạch | Nguyên tắc |
  |---|---|---|---|
  | EC3 | ✅ Valid | Cập nhật hồ sơ của chính mình | Must be — thỏa mãn |
  | EC4 | ❌ Invalid | Cố gắng cập nhật hồ sơ của người khác (qua API) | Must be — không thỏa mãn |

  ### Biến V2: Số điện thoại
  **Nguyên tắc áp dụng:** "Must be" (bắt đầu bằng 0, toàn chữ số) + Range (10–11 chữ số)

  | EC ID | Loại | Phân hoạch | Nguyên tắc |
  |---|---|---|---|
  | EC5 | ✅ Valid | Số điện thoại hợp lệ — bắt đầu bằng `0`, 10–11 chữ số, toàn bộ là ký tự số | Must be + Range — thỏa mãn |
  | EC6 | ❌ Invalid | Không bắt đầu bằng `0` (VD: `1234567890`) | Must be — không thỏa mãn |
  | EC7 | ❌ Invalid | Ít hơn 10 chữ số (VD: `012345678` — 9 chữ số) | Range — dưới LB |
  | EC8 | ❌ Invalid | Nhiều hơn 11 chữ số (VD: `012345678901` — 12 chữ số) | Range — trên UB |
  | EC9 | ❌ Invalid | Chứa ký tự không phải số (VD: `0123abc456`) | Must be — không thỏa mãn ("chữ số") |

  ### Biến V1: Họ Tên
  **Nguyên tắc:** Spec ambiguity — đặc tả không nói rõ có bắt buộc hay không

  | EC ID | Loại | Phân hoạch | Nguyên tắc |
  |---|---|---|---|
  | **EC14** | ❌ Invalid | Họ Tên rỗng (không nhập gì) | **Spec ambiguity** — cần test thực tế: hệ thống chấp nhận hay từ chối |

  ### Biến V3: Địa chỉ giao hàng mặc định
  **Nguyên tắc:** Spec ambiguity — đặc tả không nói rõ có bắt buộc hay không

  | EC ID | Loại | Phân hoạch | Nguyên tắc |
  |---|---|---|---|
  | **EC15** | ❌ Invalid | Địa chỉ giao hàng rỗng (không nhập gì) | **Spec ambiguity** — cần test thực tế |

  > FR-04 không đặc tả ràng buộc cụ thể cho Họ Tên và Địa chỉ (không nói bắt buộc, không giới hạn format). Hai trường này sẽ được verify như **output assertions** trong test case hợp lệ (kiểm tra giá trị cập nhật có lưu đúng không).

  ### Biến O2: Trạng thái trường Email trên UI
  **Nguyên tắc áp dụng:** "Must be" (Email không được phép thay đổi)

  | EC ID | Loại | Phân hoạch | Nguyên tắc |
  |---|---|---|---|
  | EC10 | ✅ Valid | Trường Email hiển thị dạng read-only, không cho phép sửa | Must be — thỏa mãn |
  | EC11 | ❌ Invalid | Trường Email có thể chỉnh sửa trên giao diện | Must be — không thỏa mãn |

  ### Biến O3: Trạng thái thuộc tính Role qua API
  **Nguyên tắc áp dụng:** "Must be" (không thể tự thay đổi role)

  | EC ID | Loại | Phân hoạch | Nguyên tắc |
  |---|---|---|---|
  | EC12 | ✅ Valid | API từ chối / bỏ qua khi client gửi thay đổi `role` | Must be — thỏa mãn |
  | EC13 | ❌ Invalid | API chấp nhận thay đổi `role` từ client (lỗi bảo mật) | Must be — không thỏa mãn |

  ### Bảng tổng hợp (cập nhật)

  | Nhóm | Valid ECs | Invalid ECs | Tổng |
  |---|---|---|---|
  | S1 — Trạng thái đăng nhập | EC1 | EC2 | 2 |
  | S2 — Quyền sở hữu | EC3 | EC4 | 2 |
  | V2 — Số điện thoại | EC5 | EC6, EC7, EC8, EC9 | 5 |
  | O2 — Email read-only | EC10 | EC11 | 2 |
  | O3 — Role protection | EC12 | EC13 | 2 |
  | V1 — Họ Tên | | EC14 | 1 |
  | V3 — Địa chỉ giao hàng | | EC15 | 1 |
  | **Tổng** | **5 Valid** | **10 Invalid** | **15 ECs** |

---