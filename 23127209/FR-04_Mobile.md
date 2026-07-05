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

## Bước 2: Equivalence Classes

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
  | EC16 | ❌ Invalid | Số điện thoại rỗng (không nhập gì) | Chia nhỏ từ EC7 — hành vi khác biệt (field required vs. format check) |

  ### Biến V1: Họ Tên
  **Nguyên tắc áp dụng:** "Must be" (phải có giá trị) — tuy nhiên đặc tả FR-04 không nói rõ có bắt buộc hay không

  | EC ID | Loại | Phân hoạch | Nguyên tắc |
  |---|---|---|---|
  | EC17 | ✅ Valid | Họ Tên không rỗng, có giá trị hợp lệ | Must be — thỏa mãn |
  | **EC14** | ❌ Invalid | Họ Tên rỗng (không nhập gì) | **Spec ambiguity** — cần test thực tế: hệ thống chấp nhận hay từ chối |

  ### Biến V3: Địa chỉ giao hàng mặc định
  **Nguyên tắc áp dụng:** "Must be" (phải có giá trị) — tuy nhiên đặc tả FR-04 không nói rõ có bắt buộc hay không

  | EC ID | Loại | Phân hoạch | Nguyên tắc |
  |---|---|---|---|
  | EC18 | ✅ Valid | Địa chỉ giao hàng không rỗng, có giá trị hợp lệ | Must be — thỏa mãn |
  | **EC15** | ❌ Invalid | Địa chỉ giao hàng rỗng (không nhập gì) | **Spec ambiguity** — cần test thực tế |

  > FR-04 không đặc tả ràng buộc cụ thể cho Họ Tên và Địa chỉ (không nói bắt buộc, không giới hạn format). EC17 và EC18 (Valid) được verify qua TC-V1 (Happy Path). EC14 và EC15 (Invalid — rỗng) được đánh dấu Spec ambiguity.

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

  ### Bảng tổng hợp

  | Nhóm | Valid ECs | Invalid ECs | Tổng |
  |---|---|---|---|
  | S1 — Trạng thái đăng nhập | EC1 | EC2 | 2 |
  | S2 — Quyền sở hữu | EC3 | EC4 | 2 |
  | V2 — Số điện thoại | EC5 | EC6, EC7, EC8, EC9, EC16 | 6 |
  | O2 — Email read-only | EC10 | EC11 | 2 |
  | O3 — Role protection | EC12 | EC13 | 2 |
  | V1 — Họ Tên | EC17 | EC14 | 2 |
  | V3 — Địa chỉ giao hàng | EC18 | EC15 | 2 |
  | **Tổng** | **7 Valid** | **11 Invalid** | **18 ECs** |

---

  ## Bước 3: Lựa chọn tập Test Cases tối thiểu

  ### A. Valid Test Cases (kết hợp tối đa các Valid ECs)

  | TC ID | Mô tả | Precondition | Input / Thao tác | ECs bao phủ | Expected Output |
  |---|---|---|---|---|---|
  | **TC-V1** | Cập nhật hồ sơ thành công (Happy Path) | Đã đăng nhập, hồ sơ của chính mình | Nhập Họ Tên hợp lệ, SĐT `0912345678` (10 số, bắt đầu bằng 0), Địa chỉ hợp lệ → Bấm Lưu | EC1, EC3, EC5, EC10, EC12, EC17, EC18 | ✅ Cập nhật thành công, dữ liệu lưu đúng. Email hiển thị read-only. Role không đổi |

  > **Ghi chú:** 1 test case bao phủ **7/7 Valid ECs**. EC10, EC12 được verify như output assertions. EC17 (Họ Tên hợp lệ) và EC18 (Địa chỉ hợp lệ) được verify qua input data.

  ### B. Invalid Test Cases (1 Invalid EC mỗi test case)

  | TC ID | Mô tả | Precondition | Input / Thao tác | Invalid EC | Expected Output |
  |---|---|---|---|---|---|
  | **TC-I1** | Cập nhật khi chưa đăng nhập | Chưa đăng nhập | Gửi API cập nhật hồ sơ | **EC2** | Bị từ chối (401/403) |
  | **TC-I2** | Cập nhật hồ sơ người khác | Đã đăng nhập | Gửi API cập nhật hồ sơ user khác (đổi userId) | **EC4** | Bị từ chối, hồ sơ người khác không bị thay đổi |
  | **TC-I3** | SĐT không bắt đầu bằng 0 | Đã đăng nhập, hồ sơ mình | SĐT = `1234567890` | **EC6** | Lỗi validation |
  | **TC-I4** | SĐT quá ngắn (< 10 số) | Đã đăng nhập, hồ sơ mình | SĐT = `012345678` (9 số) | **EC7** | Lỗi validation |
  | **TC-I5** | SĐT quá dài (> 11 số) | Đã đăng nhập, hồ sơ mình | SĐT = `012345678901` (12 số) | **EC8** | Lỗi validation |
  | **TC-I6** | SĐT chứa ký tự không phải số | Đã đăng nhập, hồ sơ mình | SĐT = `0123abc456` | **EC9** | Lỗi validation |
  | **TC-I7** | Email có thể sửa trên UI | Đã đăng nhập | Kiểm tra trường Email trên giao diện | **EC11** | Email phải read-only, không cho sửa *(negative check)* |
  | **TC-I8** | Gửi API thay đổi role | Đã đăng nhập, hồ sơ mình | Gửi payload có `role: "admin"` | **EC13** | API từ chối / bỏ qua, role không đổi *(negative check)* |
  | **TC-I9** | Họ Tên rỗng | Đã đăng nhập, hồ sơ mình | Họ Tên = *(rỗng)*, SĐT hợp lệ, Địa chỉ hợp lệ | **EC14** | ⚠️ Spec ambiguity — cần test thực tế |
  | **TC-I10** | Địa chỉ giao hàng rỗng | Đã đăng nhập, hồ sơ mình | Họ Tên hợp lệ, SĐT hợp lệ, Địa chỉ = *(rỗng)* | **EC15** | ⚠️ Spec ambiguity — cần test thực tế |
  | **TC-I11** | SĐT rỗng | Đã đăng nhập, hồ sơ mình | Họ Tên hợp lệ, SĐT = *(rỗng)*, Địa chỉ hợp lệ | **EC16** | Lỗi validation (field required) |

  ### C. Ma trận bao phủ EC ↔ Test Case

  | EC ID | Loại | Mô tả | Bao phủ bởi TC |
  |---|---|---|---|
  | EC1 | ✅ Valid | Đã đăng nhập | TC-V1 |
  | EC2 | ❌ Invalid | Chưa đăng nhập | TC-I1 |
  | EC3 | ✅ Valid | Hồ sơ của chính mình | TC-V1 |
  | EC4 | ❌ Invalid | Hồ sơ người khác | TC-I2 |
  | EC5 | ✅ Valid | SĐT hợp lệ (0, 10–11 số) | TC-V1 |
  | EC6 | ❌ Invalid | SĐT không bắt đầu bằng 0 | TC-I3 |
  | EC7 | ❌ Invalid | SĐT < 10 số | TC-I4 |
  | EC8 | ❌ Invalid | SĐT > 11 số | TC-I5 |
  | EC9 | ❌ Invalid | SĐT chứa ký tự không phải số | TC-I6 |
  | EC10 | ✅ Valid | Email read-only | TC-V1 *(output assert)* |
  | EC11 | ❌ Invalid | Email editable | TC-I7 *(negative check)* |
  | EC12 | ✅ Valid | Role không đổi | TC-V1 *(output assert)* |
  | EC13 | ❌ Invalid | Role có thể đổi | TC-I8 *(negative check)* |
  | EC14 | ❌ Invalid | Họ Tên rỗng | TC-I9 |
  | EC15 | ❌ Invalid | Địa chỉ rỗng | TC-I10 |
  | EC16 | ❌ Invalid | SĐT rỗng | TC-I11 |
  | EC17 | ✅ Valid | Họ Tên hợp lệ | TC-V1 |
  | EC18 | ✅ Valid | Địa chỉ hợp lệ | TC-V1 |

  ### D. Tổng kết

  | Loại | Số lượng TC | ECs bao phủ |
  |---|---|---|
  | Valid Test Cases | 1 | 7/7 Valid ECs ✅ |
  | Invalid Test Cases | 11 | 11/11 Invalid ECs ✅ |
  | **Tổng** | **12** | **18/18 (100%)** |

---

  ## Bước 4: Boundary Value Analysis (BVA)

  ### 1. Xác định các trường có thứ tự (Ordered Fields)

  | Biến | Kiểu | Có thứ tự? | Lý do |
  |---|---|---|---|
  | V1 — Họ Tên | String | ❌ Không | FR-04 không đặc tả ràng buộc độ dài |
  | **V2 — Số điện thoại** | String (length) | ✅ **Có** | Range rõ ràng: 10–11 chữ số |
  | V3 — Địa chỉ | String | ❌ Không | FR-04 không đặc tả ràng buộc độ dài |
  | S1 — Đăng nhập | Boolean | ❌ Không | Categorical |
  | S2 — Quyền sở hữu | Boolean | ❌ Không | Categorical |

  → **1 trường cần BVA: V2 (độ dài số điện thoại)**

  ### 2. BVA cho V2: Độ dài Số điện thoại (Phone Length)

  **Phân hoạch:**
  - Invalid (dưới): length < 10
  - Valid: 10 ≤ length ≤ 11
  - Invalid (trên): length > 11

  **Ranh giới:** LB = 10, UB = 11

  | # | Điểm biên | Giá trị | Phân hoạch | Kịch bản test | TC ánh xạ |
  |---|---|---|---|---|---|
  | BV1 | **LB - 1** | **length = 9** | ❌ Invalid | SĐT 9 chữ số (VD: `012345678`) | TC-I4 |
  | BV2 | **LB (biên)** | **length = 10** | ✅ Valid | SĐT đúng 10 chữ số (VD: `0912345678`) | TC-V1 |
  | BV3 | **UB (biên)** | **length = 11** | ✅ Valid | SĐT đúng 11 chữ số (VD: `09123456789`) | **TC-BVA1** |
  | BV4 | **UB + 1** | **length = 12** | ❌ Invalid | SĐT 12 chữ số (VD: `012345678901`) | TC-I5 |

  > **Ghi chú:** Range chỉ gồm 2 giá trị (10, 11) nên LB+1 = UB và UB-1 = LB. Tổng cộng 4 điểm biên phân biệt.

  **Bổ sung test case:**

  | TC ID | Mô tả | Precondition | Input | Expected Output | Biên kiểm tra |
  |---|---|---|---|---|---|
  | **TC-BVA1** | Cập nhật SĐT đúng 11 chữ số | Đã đăng nhập, hồ sơ mình | SĐT = `09123456789` (11 chữ số, bắt đầu bằng 0) | ✅ Cập nhật thành công | BV3: UB (length = 11) |

---

  ## Tổng hợp

  ### 1. Tổng hợp toàn bộ Test Cases FR-04 (Bước 3 + Bước 4)

  | TC ID | Mô tả | Loại | ECs / BVs |
  |---|---|---|---|
  | **TC-V1** | Cập nhật hồ sơ thành công (Happy Path) | Valid | EC1, EC3, EC5, EC10, EC12, EC17, EC18 + BV2 |
  | **TC-I1** | Cập nhật khi chưa đăng nhập | Invalid | EC2 |
  | **TC-I2** | Cập nhật hồ sơ người khác | Invalid | EC4 |
  | **TC-I3** | SĐT không bắt đầu bằng 0 | Invalid | EC6 |
  | **TC-I4** | SĐT quá ngắn (9 số) | Invalid | EC7 + BV1 |
  | **TC-I5** | SĐT quá dài (12 số) | Invalid | EC8 + BV4 |
  | **TC-I6** | SĐT chứa ký tự không phải số | Invalid | EC9 |
  | **TC-I7** | Email có thể sửa trên UI | Invalid | EC11 |
  | **TC-I8** | Gửi API thay đổi role | Invalid | EC13 |
  | **TC-I9** | Họ Tên rỗng | Invalid | EC14 |
  | **TC-I10** | Địa chỉ giao hàng rỗng | Invalid | EC15 |
  | **TC-I11** | SĐT rỗng | Invalid | EC16 |
  | **TC-BVA1** | SĐT đúng 11 chữ số | BVA | BV3 |

  ### 2. Tổng kết FR-04

  | Nhóm | Test Cases | Số lượng |
  |---|---|---|
  | Valid (Bước 3) | TC-V1 | 1 |
  | Invalid (Bước 3) | TC-I1 → TC-I11 | 11 |
  | BVA (Bước 4) | TC-BVA1 | 1 |
  | **Tổng FR-04** | | **13 test cases** |
  | **ECs coverage** | | **18/18 (100%)** |
  | **BVs coverage** | | **4/4 (100%)** |