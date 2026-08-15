# AI Audit Report

## AI Interaction 01

**Name of the AI tool:** Codex

**Date and time:** 2026-08-14T13:59:02.2564857+07:00

**Your prompt:**

> Tôi đã có sẵn skill [SKILL.md](audit-skill/SKILL.md) cho audit rồi, bạn chỉ cần điều chỉnh đường dẫn cho phù hợp, còn lại cứ làm theo yêu cầu

**The AI output:**

> Mình sẽ dùng skill audit bạn đã cung cấp, chỉ điều chỉnh các đường dẫn cho khớp workspace hiện tại rồi thực hiện nguyên vẹn quy trình trong đó. Trước hết mình đang đọc đầy đủ yêu cầu đính kèm và `audit-skill/SKILL.md`.
> 
> Khảo sát ban đầu cho thấy thư mục `HW05` hiện chỉ có đề bài Version 2.0 và skill audit; chưa có source SUT, API spec, cấu hình JMeter/k6 hay report. Mình đang kiểm tra convention của repository cha và bài trước để tái sử dụng cách tổ chức phù hợp, đồng thời sẽ giữ nguyên mọi thay đổi sẵn có ngoài phạm vi `HW05`.
> 
> Các endpoint WF01 có thể xác định từ tài liệu và source SUT nằm ở `HW04/src` trong cùng repository cha: login, search, product detail, cart và checkout đều có route rõ ràng. Mình sẽ ghi chúng vào workflow kèm nguồn và vẫn để base URL/cấu hình chạy là `TODO`, vì bản SUT dùng cho HW05 chưa được đặt trong thư mục này và cần được xác nhận trước khi chạy. Skill audit cũng buộc mình đổi đích ghi sang `ai-audit/AI_Audit.md`; ngoài thay đổi đường dẫn đó, mình giữ nguyên logic của skill.
> 
> Đã hoàn tất scaffold HW05: tạo 29 thư mục và 42 tệp mới, cập nhật 1 tệp skill có sẵn. Không chạy performance test, không tạo `.jtl`/HTML/screenshot/số liệu giả và không commit Git.
> 
> ## A. Structure Created
> 
> ```text
> C:\Code\SoftwareTesting\ST-Group\23127430\HW05\
> ├── .gitignore
> ├── README.md
> ├── main_report.md
> ├── 2026.HW05.Performance Testing_En_2.0_HTThanh.md
> ├── audit-skill/SKILL.md
> ├── agent-skill/
> │   ├── SKILL.md
> │   └── README.md
> ├── ai-audit/
> │   ├── AI_Audit.md
> │   └── prompts/README.md
> ├── ai-critique/AI_Critique.md
> ├── docs/
> │   ├── workflow/WF01_workflow.md
> │   ├── test-design/{load,stress,spike,endurance}_test_design.md
> │   ├── human-review/ai_test_plan_review.md
> │   ├── ai-analysis/result_analysis.md
> │   ├── continuous-performance/continuous_performance_testing.md
> │   └── bug-reports/README.md
> ├── test-plans/
> │   ├── README.md
> │   └── {load,stress,spike,endurance}/.gitkeep
> ├── test-data/
> │   ├── users.csv
> │   ├── products.csv
> │   └── README.md
> ├── results/
> │   ├── README.md
> │   ├── raw/{load,stress,spike,endurance}/.gitkeep
> │   └── html/{load,stress,spike,endurance}/.gitkeep
> ├── evidence/
> │   ├── README.md
> │   └── {hardware,load,stress,spike,endurance}/.gitkeep
> ├── video/README.md
> └── git/git_commit_log.txt
> ```
> 
> ## B. Files Created
> 
> - Root: [.gitignore](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/.gitignore), [README.md](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/README.md), [main_report.md](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/main_report.md).
> - Workflow/test design/review: [WF01_workflow.md](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/docs/workflow/WF01_workflow.md), [load](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/docs/test-design/load_test_design.md), [stress](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/docs/test-design/stress_test_design.md), [spike](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/docs/test-design/spike_test_design.md), [endurance](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/docs/test-design/endurance_test_design.md), [human review](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/docs/human-review/ai_test_plan_review.md), [result analysis](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/docs/ai-analysis/result_analysis.md), [continuous performance](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/docs/continuous-performance/continuous_performance_testing.md), [bug-report guide](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/docs/bug-reports/README.md).
> - Test-plan/data: [test-plans/README.md](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/test-plans/README.md), bốn placeholder scenario, [users.csv](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/test-data/users.csv), [products.csv](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/test-data/products.csv), [test-data/README.md](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/test-data/README.md).
> - Results/evidence: [results/README.md](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/results/README.md), tám placeholder raw/HTML, [evidence/README.md](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/evidence/README.md), năm placeholder evidence.
> - AI/support: [AI_Audit.md](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/ai-audit/AI_Audit.md), [prompts/README.md](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/ai-audit/prompts/README.md), [AI_Critique.md](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/ai-critique/AI_Critique.md), [agent-skill/SKILL.md](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/agent-skill/SKILL.md), [agent-skill/README.md](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/agent-skill/README.md), [video/README.md](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/video/README.md), [git_commit_log.txt](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/git/git_commit_log.txt).
> 
> ## C. Files Modified
> 
> - [audit-skill/SKILL.md](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/audit-skill/SKILL.md): chỉ đổi hai tham chiếu đích từ `../ai_audit_report.md` sang `../ai-audit/AI_Audit.md`; các quy tắc còn lại được giữ nguyên.
> 
> ## D. Existing Files Reused
> 
> - [Đề bài Version 2.0](<C:/Code/SoftwareTesting/ST-Group/23127430/HW05/2026.HW05.Performance Testing_En_2.0_HTThanh.md>) được dùng làm nguồn yêu cầu; không chỉnh sửa.
> - Skill audit có sẵn được tái sử dụng sau khi điều chỉnh đường dẫn.
> - Convention HW04 (`README`, `main_report`, audit, critique, agent skill, Git log) được tham khảo; không sao chép kết quả hay evidence cũ.
> - Source và API spec HW04 trong cùng Git repository được đọc làm evidence sơ bộ cho WF01; không chỉnh sửa.
> 
> ## E. TODOs Requiring Human Input
> 
> - Student ID và student name.
> - Chọn JMeter hoặc k6.
> - Xác nhận phiên bản SUT và base URL thực tế.
> - Xác nhận lại API endpoints/payloads với đúng bản SUT dùng cho HW05.
> - Cung cấp test accounts/credentials an toàn, quy trình unlock/reset và cách quản lý secret.
> - Chuẩn bị keywords, product IDs, shipping data và chiến lược cô lập cart/session.
> - Hardware, hostname và môi trường chạy.
> - VUs/threads, ramp-up, hold, ramp-down, think time.
> - Assertions, acceptance thresholds, endurance threshold và report/listener tương ứng.
> - Demo video link và self-assessment.
> 
> ## F. Repository Findings
> 
> - `HW05` ban đầu chỉ là homework repository: có đề bài và audit skill; không có source SUT, report, JMeter/k6 config hay test result.
> - [API specification](C:/Code/SoftwareTesting/ST-Group/23127430/HW04/src/api_specification.md) và [backend routes](C:/Code/SoftwareTesting/ST-Group/23127430/HW04/src/backend/server.js) xác định sơ bộ: `POST /api/login`, `GET /api/products?search=...`, `GET /api/products/:id`, `POST /api/cart`, `POST /api/checkout`.
> - [AuthContext.jsx](C:/Code/SoftwareTesting/ST-Group/23127430/HW04/src/frontend-web/src/context/AuthContext.jsx) xác nhận JWT bearer token; [Home.jsx](C:/Code/SoftwareTesting/ST-Group/23127430/HW04/src/frontend-web/src/pages/Home.jsx), [ProductDetail.jsx](C:/Code/SoftwareTesting/ST-Group/23127430/HW04/src/frontend-web/src/pages/ProductDetail.jsx) và [Checkout.jsx](C:/Code/SoftwareTesting/ST-Group/23127430/HW04/src/frontend-web/src/pages/Checkout.jsx) xác nhận search/detail/checkout phía frontend.
> - Một điểm cần human review: frontend cũ thêm sản phẩm vào cart bằng state phía client, trong khi backend/API spec vẫn có `POST /api/cart`. Vì vậy mapping đã được ghi kèm yêu cầu xác nhận lại đúng build HW05 trước khi implement.
> - `AI Interaction 01` của phiên làm việc này đã được ghi nguyên văn và xác minh trong [AI_Audit.md](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/ai-audit/AI_Audit.md).
> 
> ## G. Next Recommended Step
> 
> Xác nhận đúng SUT build/base URL và chọn JMeter hoặc k6, sau đó human-review mapping WF01 trước khi điền workload hay tạo test plan thực thi.

## AI Interaction 02

**Name of the AI tool:** Codex

**Date and time:** 2026-08-14T14:24:31.5165474+07:00

**Your prompt:**

> Source code nằm ở [src](src/)

**The AI output:**

> Mình sẽ khảo sát lại trực tiếp `src/`, đối chiếu các endpoint WF01 với source hiện tại, rồi cập nhật những chỗ đang ghi “chưa có SUT source” hoặc đang dựa vào `HW04/src`. Mình vẫn giữ nguyên phạm vi scaffold: không chạy performance test và không tạo kết quả giả.
> 
> Yêu cầu đính kèm cũng yêu cầu thêm interaction hiện tại vào AI Audit, nên mình sẽ dùng lại `audit-skill` và ghi đúng định dạng/nguyên văn theo skill; entry mới sẽ được thêm sau khi phân tích và xác minh xong. Trước khi làm tiếp, mình đang đọc lại toàn bộ skill và lập checklist source → workflow → functional verification → CSV → audit.
> 
> Source hiện tại xác nhận backend là Express/SQLite tại port 3000 và frontend web là React/Vite tại 5173. Có hai điểm state rất quan trọng cho 50 VU: cart backend nằm trong RAM và được khóa theo `userId`, còn frontend lại giữ cart riêng trong React state; checkout không đọc cart backend. Mình đang kiểm tra database hiện có và điều kiện khởi động vì `database.js` có lệnh drop/reseed bảng, nên chưa thể chạy server trực tiếp trước khi bảo đảm không làm thay đổi dữ liệu của bạn.
> 
> Database hiện tại có 119 user, trong khi khởi động backend sẽ chạy `DROP TABLE` rồi seed lại chỉ 2 user. Vì vậy mình sẽ không khởi động trực tiếp trên `src/backend/database.sqlite`. Để vẫn đáp ứng functional verification, mình sẽ chạy đúng `server.js`/`database.js` trong một thư mục tạm cô lập, gọi WF01 đúng một lần, dừng server, xóa bản tạm và đối chiếu hash để bảo đảm database gốc không đổi. Đây chỉ là functional check tuần tự, không phải load test.
> 
> Functional verification đã hoàn tất cả 5 bước với business assertions (không chỉ kiểm tra HTTP 200), và bản `database.sqlite` gốc không thay đổi. Tài liệu hiện phản ánh đúng các lệch quan trọng của source: lockout thực tế xảy ra sau 2 lần sai trong khoảng 3 phút, cart theo `userId` nằm trong RAM, và checkout tạo order độc lập với cart. Mình đang làm lượt kiểm tra cuối để loại bỏ mô tả cũ/stale và bảo đảm không lộ credential/token trong deliverables.
> 
> Đã phân tích trực tiếp `src/`, hoàn thiện tài liệu WF01 và chạy đúng một functional API verification trong môi trường tạm cô lập. Cả 5 bước đều được xác minh; database gốc vẫn giữ nguyên. Không chạy performance test, không tạo `.jmx`, `.jtl`, HTML report hay số liệu hiệu năng.
> 
> ## A. WF01 API Mapping
> 
> | Step | Method / Endpoint | Auth | Input | Output | Correlation |
> |---|---|---|---|---|---|
> | Login | `POST /api/login` | Không | `email`, `password` | 200: `message`, JWT `token`, `user` | Extract token; JWT chứa `user.id` |
> | Search | `GET /api/products?search={keyword}` | Không | Query `search` | JSON array sản phẩm | Extract `id`, `name`, `price` |
> | Product Detail | `GET /api/products/{productId}` | Không | `productId` từ Search | Product JSON; ID không tồn tại trả 200 `{}` | Assert response `id` khớp ID đã extract |
> | Add to Cart | `POST /api/cart` | Bearer JWT | `id`, `name`, `price`, `quantity` | `Added to cart` | JWT `user.id` chọn cart trong RAM; không có `cartId` |
> | Checkout | `POST /api/checkout` | Bearer JWT | Handler đọc `total_amount`, `shipping_address` | `message`, integer `orderId` | JWT `user.id` → `orders.user_id`; extract `orderId` |
> 
> ## B. Source Evidence
> 
> - [server.js](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/src/backend/server.js:32): login, JWT middleware, product, cart, checkout và order handlers.
> - [database.js](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/src/backend/database.js:13): destructive initialization, schema `users`/`products`/`orders` và seed logic.
> - [AuthContext.jsx](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/src/frontend-web/src/context/AuthContext.jsx:8): frontend login, localStorage và Bearer header.
> - [Home.jsx](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/src/frontend-web/src/pages/Home.jsx:12) và [ProductDetail.jsx](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/src/frontend-web/src/pages/ProductDetail.jsx:14): Search → product ID → Detail.
> - [CartContext.jsx](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/src/frontend-web/src/context/CartContext.jsx:5) và [Checkout.jsx](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/src/frontend-web/src/pages/Checkout.jsx:40): cart frontend-only và payload checkout thực tế.
> - [API specification](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/src/api_specification.md:24), [requirements](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/src/README.md:39) và [setup guide](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/src/setup_guide.md:12) được dùng để cross-check.
> 
> ## C. Authentication Model
> 
> EShop dùng stateless JWT, không dùng cookie hay server session. Performance tool phải extract `token` từ Login và gửi `Authorization: Bearer <token>` cho Cart, Checkout và order read-back. Frontend lưu token trong `localStorage`; source không cấu hình thời hạn JWT. Cart backend được phân vùng bằng `user.id` trong token, không phải bằng token string hay cart ID.
> 
> ## D. Correlation Map
> 
> ```text
> users.csv: email/password/shipping_address
>   → Login: token + user.id
>   → Search: product.id + name + price
>   → Detail: product.id phải khớp
>   → Cart: token user.id + product fields + quantity
>   → Checkout: token user.id + total_amount + shipping_address
>   → orderId
> ```
> 
> Không có cookie, session ID hoặc cart ID. Checkout hiện không đọc cart backend.
> 
> ## E. Functional Verification
> 
> | Step | Status | Business check |
> |---|---|---|
> | Login | VERIFIED | Nhận token hợp lệ |
> | Search | VERIFIED | Có kết quả và extract được product ID |
> | Product Detail | VERIFIED | ID response khớp Search |
> | Add to Cart | VERIFIED | `GET /api/cart` xác nhận item/quantity đã thay đổi |
> | Checkout | VERIFIED | Có integer `orderId`; order tồn tại trong `my-orders` |
> 
> Verification chạy tuần tự trên bản sao tạm của backend với SQLite tạm. Backend đã được dừng, thư mục tạm đã xóa, port 3000 không còn listener, và database gốc vẫn có 119 users/0 orders với hash không đổi.
> 
> ## F. CSV Strategy
> 
> - [users.csv](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/test-data/users.csv): `email,password,shipping_address`; khuyến nghị một account cho mỗi VU đang active hoặc pool không chồng lấn. Email cần unique theo concurrent VU; credential được provision ngoài Git.
> - [products.csv](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/test-data/products.csv): chỉ `keyword`. Không hard-code `product_id`; ID phải được extract từ Search để giữ đúng business flow.
> - Keyword có thể dùng chung nhưng nên trả về một sản phẩm ổn định; nếu có nhiều kết quả, test design phải quy định cách chọn deterministic.
> 
> ## G. State / Cleanup Risks
> 
> - Lockout implementation tăng counter thêm 2 và khóa sau lần sai thứ hai trong khoảng 3 phút, khác requirement 3 lần/30 giây; không có unlock endpoint.
> - Nhiều VU dùng chung account sẽ ghi vào cùng `userCarts[userId]`; mỗi lần add chỉ append, nên cart collision và tăng bộ nhớ.
> - Frontend dùng React cart riêng, không gọi backend Cart API; Checkout backend cũng không đọc hoặc clear cart.
> - Mỗi Checkout thêm một order; không có cleanup endpoint nên repeated runs làm database tăng.
> - Source không có stock field/order items và không giảm tồn kho; stock depletion không xảy ra trong implementation hiện tại.
> - Backend cart chỉ tồn tại trong một process; restart làm mất cart, nhưng khởi động backend cũng drop/reseed database.
> - JWT không có expiry do ứng dụng cấu hình; account isolation và lifecycle token phải được test design quản lý.
> 
> ## H. Files Created
> 
> - [WF01_verification.md](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/docs/workflow/WF01_verification.md).
> 
> ## I. Files Modified
> 
> - [WF01_workflow.md](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/docs/workflow/WF01_workflow.md).
> - [users.csv](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/test-data/users.csv), [products.csv](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/test-data/products.csv), [test-data/README.md](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/test-data/README.md).
> - [.gitignore](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/.gitignore), [README.md](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/README.md), [main_report.md](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/main_report.md).
> - [AI_Audit.md](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/ai-audit/AI_Audit.md): thêm `AI Interaction 02`; purpose là WF01 API analysis/functional verification, human review status là **Pending**.
> 
> Không chỉnh sửa file nào trong `src/`.
> 
> ## J. Open Questions / TODO
> 
> - Human phải quyết định benchmark backend `POST /api/cart` hay mô phỏng cart frontend-only.
> - Xác định `shipping_address` có phải field bắt buộc hay script sẽ mirror payload frontend đang bỏ qua field này.
> - Phê duyệt disposable database/reset strategy cho cart và orders.
> - Xác nhận môi trường performance dùng một hay nhiều backend process.
> - Provision đủ account riêng cho concurrent VUs mà không commit secrets.
> - Chọn JMeter/k6, hardware, workload, assertions threshold và acceptance criteria ở bước kế tiếp.
> 
> ## K. Readiness Assessment
> 
> **READY FOR LOAD TEST DESIGN**
> 
> Mapping, auth, correlation, state model, assertions và functional flow đã được xác minh. Chưa sẵn sàng chạy Load Test cho đến khi human duyệt cart scope, account pool, cleanup/isolation, tool, hardware, workload và threshold.

## AI Interaction 03

**Name of the AI tool:** Codex

**Date and time:** 2026-08-14T15:15:49.4109187+07:00

**Your prompt:**

> [SKILL.md](audit-skill/SKILL.md)

**The AI output:**

> Mình sẽ dùng `audit-skill` cho interaction này: thực hiện đầy đủ bước tiếp theo trong yêu cầu đính kèm, sau đó ghi nguyên văn prompt và toàn bộ output vào entry audit kế tiếp. Trước hết mình đang đọc toàn bộ prompt và đọc lại `audit-skill/SKILL.md` để xác định đúng phạm vi.
> 
> Source-of-truth cho thấy một iteration nghiệp vụ có 5 request; để xác minh cart/order thực sự thay đổi, thiết kế nên thêm `GET /api/cart` và `GET /api/orders/my-orders`, thành 7 request/iteration. Repository vẫn chưa chọn JMeter/k6 và chưa có hardware evidence, nên mình sẽ ghi rõ blocker, đưa hai workload candidate chứ không chốt cấu hình cuối; AI recommendation sẽ là Option A để human review trước.
> 
> Thiết kế đã qua kiểm tra: đủ 17 section, hai options, 7 request/iteration, tool/hardware blocker, human-review items và không chứa credential. Database vẫn 0 order, hash không đổi, port 3000 không chạy và không có `.jmx`/`.jtl`/result HTML. Bước cuối là ghi `AI Interaction 03` theo đúng bốn field của audit-skill rồi đối chiếu nguyên văn.
> 
> Đã hoàn thiện proposal Load Test cho WF01 và Human Review entry. Không tạo test script, không chạy Load Test và không sinh kết quả.
> 
> ## A. Load Test Objective
> 
> Đánh giá WF01 dưới tải sustained bình thường ở mức thận trọng, đồng thời theo dõi latency theo endpoint/end-to-end, p90/p95, throughput, error rate, functional assertion failures và tài nguyên Windows/Node.js. Mục tiêu không phải tìm breaking point.
> 
> **Hardware context: NOT YET AVAILABLE**  
> **BLOCKER: Performance testing tool has not been selected.**
> 
> ## B. Workload Option A
> 
> ```text
> Initial VUs: 1
> Target VUs: 5
> Ramp-up: 2 minutes
> Hold: 5 minutes
> Ramp-down: 1 minute
> Think-time: 1–2s / 2–4s / 2–5s / 1–3s theo transition
> Inter-iteration pause: 3–6s
> Iteration: full WF01 + GET cart + GET my-orders = 7 requests
> ```
> 
> Option A chỉ dùng 10% pool 50 account, giới hạn cart/order growth và phù hợp lần đo đầu trên hardware chưa biết.
> 
> ## C. Workload Option B
> 
> ```text
> Initial VUs: 2
> Target VUs: 10
> Ramp-up: 3 minutes
> Hold: 10 minutes
> Ramp-down: 2 minutes
> Think-time: giống Option A
> Inter-iteration pause: 3–6s
> Iteration: full WF01 + 2 state read-backs = 7 requests
> ```
> 
> Option B tăng concurrency và sustained window nhưng tạo nhiều cart entries/orders hơn; chỉ cân nhắc sau khi review evidence của Option A.
> 
> ## D. AI Recommended Option
> 
> AI đề xuất **Option A** cho lần chạy đo đầu tiên, nhưng chưa chọn làm final. Lý do: chưa có hardware/baseline, chưa chọn tool, mỗi iteration tạo order và làm cart trong RAM tăng, còn Option A vẫn cover đầy đủ Auth-heavy + Read-heavy + Transactional.
> 
> ## E. CSV Strategy
> 
> - Một account cố định, unique cho mỗi VU; cấp tuần tự theo VU index.
> - Không recycle account sang VU concurrent khác; fail preflight nếu concurrency vượt 50.
> - Reuse account của chính VU giữa các iteration và Login lại mỗi iteration để giữ auth-heavy coverage.
> - Năm product keywords được phân phối deterministic theo VU/iteration và có thể recycle.
> - Không lấy `productId` từ CSV; luôn extract từ Search.
> - Provision pool sau lần backend start cuối cùng, chỉ trên disposable database đã được duyệt.
> 
> ## F. Correlation Strategy
> 
> | Data | Produced by | Consumed by | Method |
> |---|---|---|---|
> | JWT token | Login | Cart, Checkout, read-backs | Extract `$.token`, assert non-empty |
> | user ID | Login | Ownership diagnostics | Extract `$.user.id` |
> | Product ID/name/price | Search | Detail, Cart, Checkout total | Extract `$[0].id/name/price`; cross-check Detail |
> | Shipping address | Users CSV | Checkout | Row assigned to that VU |
> | Cart confirmation | POST/GET Cart | Assertion only | Find correlated product/quantity; không có cart ID |
> | Order ID | Checkout | Order validation | Extract `$.orderId`, find in `my-orders` |
> 
> Checkout không consume cart backend, nên không tạo correlation giả giữa cart và checkout.
> 
> ## G. Assertions
> 
> - Login: HTTP 200, exact success message, token non-empty, `user.id` tồn tại, không có `error`.
> - Search: JSON array không rỗng; selected row có ID/name/price hợp lệ.
> - Detail: response không phải `{}`, ID khớp Search, price numeric-coercible.
> - Cart: exact success message; GET cart xác nhận product ID và quantity 1.
> - Checkout: exact success message, positive integer `orderId`; `my-orders` chứa order đó.
> - HTTP 200 nhưng assertion sai được phân loại functional/correlation failure, không tính là business success.
> 
> ## H. Side-effect Risks
> 
> - Shared account gây cart collision và chung order owner.
> - Mỗi Add to Cart append vào RAM; cart không được clear và tăng theo iteration.
> - Mỗi Checkout thêm một SQLite order; database tăng theo thời gian.
> - Backend restart xóa cart nhưng đồng thời drop/reseed database và xóa account đã provision.
> - Sai credential có thể khóa account sau lần sai thứ hai khoảng 3 phút.
> - Frontend dùng cart riêng, còn backend Cart API không được Checkout consume.
> - Không có stock field/order items; không được invent stock-depletion behavior.
> - Mitigation: unique accounts, disposable DB, cap workload, start backend rồi provision, ghi before/after order count/database size và recreate environment khi rerun.
> 
> ## I. Resource Monitoring Plan
> 
> - Trước run: capture hardware/hostname thật.
> - Measured run: tool ở non-GUI/CLI mode nếu hỗ trợ; Task Manager theo dõi total CPU/RAM và riêng Node backend process.
> - SQLite embedded trong Node nên không có DB process riêng.
> - Capture evidence có timestamp/load phase gần cuối ramp và giữa hold.
> - Retain backend logs và raw tool output để correlate timeout/5xx/latency.
> - Không capture screenshot ở bước thiết kế này.
> 
> ## J. Report View Selected
> 
> **PENDING TOOL SELECTION.** Nếu human chọn JMeter, proposal tạm giữ **Summary Report** cho Load Test; measured run vẫn chạy non-GUI và tạo raw/HTML artifacts sau đó. View Results Tree chỉ được dùng cho debug 1 VU, không phải final Load report. Stress/Spike không được reuse Summary Report nếu lựa chọn này được duyệt. Nếu chọn k6, cần duyệt output tương đương trước khi implement.
> 
> ## K. Files Modified
> 
> - [load_test_design.md](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/docs/test-design/load_test_design.md)
> - [ai_test_plan_review.md](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/docs/human-review/ai_test_plan_review.md)
> - [AI_Audit.md](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/ai-audit/AI_Audit.md): thêm `AI Interaction 03`, purpose là Design WF01 Load Test, human review **Pending**.
> 
> ## L. Human Review Items
> 
> - Chọn/revise Option A hoặc B.
> - Duyệt VUs, ramp/hold/down, think-time và inter-iteration pacing.
> - Duyệt iteration 7 requests với Cart/Order read-backs.
> - Duyệt one-account-per-VU và trần 50 VUs.
> - Quyết định backend Cart API có đúng scope dù frontend dùng cart riêng.
> - Duyệt checkout payload, disposable DB, side-effect budget và rerun strategy.
> - Chọn JMeter/k6 và report view/output riêng cho Load.
> - Duyệt candidate `<1%` server/transport errors, `0%` functional failures; p95/throughput sẽ derive sau baseline.
> - Cung cấp hardware evidence/context.
> 
> ## M. Readiness
> 
> **READY FOR HUMAN REVIEW**
> 
> Proposal đủ để review, nhưng chưa sẵn sàng generate script hoặc execute cho đến khi các quyết định trên được duyệt.

## AI Interaction 04

**Name of the AI tool:** Codex

**Date and time:** 2026-08-14T15:39:39.9865552+07:00

**Your prompt:**

> [SKILL.md](audit-skill/SKILL.md)

**The AI output:**

> Mình sẽ tiếp tục dùng `audit-skill`: đọc toàn bộ yêu cầu mới, thực hiện đúng giai đoạn được chỉ định, rồi thêm một interaction audit mới mà không sửa ba interaction trước. Mình đang đọc prompt đính kèm và toàn bộ skill trước khi thay đổi repository.
>
> Yêu cầu mới đã chốt Human Review và chọn đúng Option A. Mình sẽ áp dụng các quyết định đó, document hardware/topology và final configuration trước; sau đó phải dừng ở tool-selection gate nếu repository vẫn không có bằng chứng JMeter/k6. Trong trường hợp đó mình sẽ không tạo script hay dry-run, đúng quy tắc `STOP / BLOCKER`.
>
> Mình đã xác nhận gate quan trọng: repository chưa chọn JMeter hay k6, nên lần này chỉ chốt thiết kế/hardware/Human Review và ghi rõ blocker; sẽ không tạo nhầm script hoặc chạy dry-run. Bây giờ mình đang cập nhật các tài liệu và checklist bằng đúng thông số Option A đã được duyệt.
>
> Phần thiết kế và Human Review đã được chốt: Option A là cấu hình initial chính thức, Option B chỉ được giữ như ứng viên sau này; checklist phần cứng và kế hoạch theo dõi tài nguyên cũng đã có. Mình đang kiểm tra tính nhất quán, bảo đảm không xuất hiện script/kết quả performance giả khi tool vẫn chưa được chọn.
>
> Kiểm tra nhất quán đã đạt: 50 user, 5 keyword, không có artifact JMeter/k6/Load nào được tạo, port 3000 không lắng nghe và không còn marker Human Review đang chờ. Theo `audit-skill`, mình sẽ ghi nguyên văn interaction mới vào mục 04 và xác minh ba interaction trước không đổi; đây là bước cuối.
>
> Đã chốt Human Review và cấu hình Option A, nhưng chưa được phép chạy Load Test vì repository vẫn chưa chọn JMeter hay k6.
>
> ## A. Human Review
>
> `COMPLETED` ngày 2026-08-14. Option A được chọn làm cấu hình initial chính thức; Option B chỉ là ứng viên tương lai, không bị đánh giá là sai và không được tự động thay thế Option A.
>
> ## B. Hardware
>
> - MSI Thin GF63 12VE, Windows.
> - CPU: 12th Gen Intel(R) Core(TM) i5-12450H; Windows hiển thị 2.00 GHz.
> - RAM: 16.0 GB, 3200 MT/s; storage capacity hiển thị 477 GB; graphics memory 6 GB.
> - Nguồn: Windows Settings → System → About.
> - Không suy diễn GPU model, core/thread count, disk model/type hoặc Windows edition/version. Screenshot evidence vẫn cần được bổ sung.
>
> ## C. Deployment Topology
>
> - Backend: local mặc định tại port `3000`, hiện không chạy.
> - Database: SQLite embedded, local tại `src/backend/database.sqlite`.
> - Load generator: `TODO / NOT VERIFIED` vì tool chưa được chọn.
> - Việc cả ba thành phần cùng chạy trên máy MSI mới chỉ được xác minh một phần; kết quả local sau này không đại diện capacity production.
>
> ## D. Final Option A
>
> - Initial/target: `1 → 5 VUs`.
> - Ramp-up/hold/ramp-down: `2m / 5m / 1m`.
> - Mỗi iteration chạy đủ 7 request WF01, gồm Cart và Order read-back.
> - Think-time: `1–2s`, `2–4s`, `2–5s`, `1–3s`; inter-iteration `3–6s`.
>
> ## E. Load Script
>
> `NOT CREATED`. Tool chưa được chọn, vì vậy chưa có filename `23127430_Load_<YYYYMMDD>`, report configuration hoặc artifact JMeter/k6. Không chạy full Option A.
>
> ## F. CSV Configuration
>
> `users.csv` có 50 account synthetic, cấp một account cố định/duy nhất cho mỗi VU và không recycle khi thiếu row. `products.csv` có 5 keyword, xoay vòng deterministic theo VU/iteration; `productId` luôn lấy từ Search response.
>
> ## G. Authentication and Correlation
>
> Login lại đầu mỗi iteration; extract JWT rồi gửi `Authorization: Bearer <token>`. Correlate `userId`, `productId`, `productName`, `productPrice`, `shippingAddress` và `orderId`; không tạo `cartId` giả vì backend không trả field này.
>
> ## H. Assertions
>
> Đã duyệt kiểm tra HTTP 200, message/body hợp lệ, JWT không rỗng, Search có product, Detail khớp product, Cart read-back có đúng item/quantity, Checkout trả positive `orderId`, và Order read-back chứa order tương ứng. Functional/assertion failure được tách khỏi transport/5xx error.
>
> ## I. Technical Dry Run
>
> `NOT RUN`. Kế hoạch sau khi chọn tool là đúng `1 VU / 1 iteration`; request count, pass/fail và latency hiện là `N/A`, không phải kết quả đo.
>
> ## J. Problems and Required Actions
>
> Blocker duy nhất để tạo script là phải chọn rõ `JMeter` hoặc `k6`. Sau đó cần tạo script, xác nhận base URL/topology, khởi động disposable SUT, provision data sau lần start cuối, chạy technical dry run, và bổ sung hardware/resource screenshots thật.
>
> ## K. File Created
>
> - [Hardware evidence checklist](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/evidence/hardware/README.md)
>
> ## L. Files Modified
>
> - [Load test design](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/docs/test-design/load_test_design.md)
> - [Human review](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/docs/human-review/ai_test_plan_review.md)
> - [Main report](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/main_report.md)
> - [AI audit](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/ai-audit/AI_Audit.md)
>
> ## M. Readiness
>
> **NOT READY FOR OPTION A LOAD TEST EXECUTION.** Human Review và thiết kế đã hoàn tất; còn thiếu tool selection, tool-specific script, xác nhận load-generator topology, hardware screenshots và technical dry run đạt yêu cầu.

## AI Interaction 05

**Name of the AI tool:** Codex

**Date and time:** 2026-08-15T20:20:11.1845950+07:00

**Your prompt:**

> [SKILL.md](audit-skill/SKILL.md) 
> Bạn hãy kiểm tra xem còn phần nào tôi chưa hoàn thiện và cần bổ sung

**The AI output:**

> Tôi sẽ dùng trực tiếp `audit-skill/SKILL.md` như bạn yêu cầu. Trước hết tôi sẽ đọc đầy đủ quy trình audit, sau đó đối chiếu repository với đề bài, validator và trạng thái artifact thực tế để chỉ ra chính xác phần còn thiếu, phần chỉ mới có placeholder và phần cần xác minh thủ công.
>
> Theo skill, toàn bộ prompt và các thông báo hiển thị trong lượt này phải được ghi nguyên văn vào `ai-audit/AI_Audit.md` bằng timestamp thật sau khi việc kiểm tra hoàn tất. Tôi sẽ chỉ ghi một interaction mới, không sửa các interaction lịch sử; nếu phát hiện dữ liệu nhạy cảm hoặc số thứ tự audit mâu thuẫn, tôi sẽ dừng trước khi ghi.
>
> Audit hiện hợp lệ, có bốn interaction tuần tự và không có mẫu `TBD`; lượt này sẽ là Interaction 05. Tôi đang đối chiếu ba lớp bằng chứng: yêu cầu gốc của HW05, các tuyên bố trong README/main report, và file thực tế trên đĩa—đặc biệt là PDF, video, Git history, ảnh evidence và phạm vi AI Audit.
>
> Kết quả sơ bộ cho thấy ba blocker chắc chắn trước khi nộp: chưa có các PDF bắt buộc, chưa có video/YouTube link, và Git history mới chỉ có hai commit HW05 trong khi phần lớn Stress/Spike/Endurance/report hiện vẫn chưa commit. Ngoài ra tôi đang kiểm tra hai rủi ro dễ bị trừ điểm dù validator không bắt được: bằng chứng “k6 + resource monitor trong cùng frame” và ba loại report view k6 thực sự khác nhau.
>
> Tôi vừa phát hiện một điểm cần sửa trong `bug_report.md`: ba lỗi không phải chưa có GitHub Issue. Repository công khai đã có đúng các issue tương ứng (#50, #32, #31), đều đang mở và có tham chiếu ảnh. Vì vậy bạn không cần tạo issue mới; chỉ cần liên kết ba issue hiện có vào bug report/main report và bỏ câu “No GitHub issue was created”.
>
> Chưa sẵn sàng để nộp. Phần performance cốt lõi đã khá đầy đủ, nhưng còn 6 hạng mục bắt buộc và 3 rủi ro cần xử lý. Validator hiện đạt **24 PASS / 3 FAIL / 1 WARN**.
>
> ### Bắt buộc hoàn thiện
>
> 1. **Xuất ba PDF:** `main_report.pdf`, `AI_Critique.pdf` và `AI_Audit.pdf`. Hiện repository không có file PDF nào; đề bài cảnh báo thiếu tài liệu bắt buộc có thể bị 0 điểm.
> 2. **Quay và tải video:** [video/README.md](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/video/README.md) vẫn ghi chưa quay/upload. Video cần ít nhất 6 phút, thuyết minh tiếng Việt, k6 và resource monitor trong cùng frame, đồng thời demo `$run-api-performance-tests` end-to-end. Một video được thiết kế đầy đủ có thể đáp ứng cả demo bài và demo Agent Skill.
> 3. **Hoàn thiện AI Audit:** sau lượt này audit có 5 interaction, nhưng vẫn thiếu các interaction Load/Stress/Spike/Endurance/reporting trước đó. Chỉ bổ sung từ transcript gốc trong lịch sử Codex; không được tái dựng từ trí nhớ. Sau đó cập nhật số lượng trong [main_report.md](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/main_report.md:293) và xuất PDF.
> 4. **Commit và push:** hiện chỉ có 2 commit HW05, trong khi còn **22 file modified, 13 deleted và 50 untracked entry**. Branch GitHub truy cập công khai được nhưng vẫn dừng ở commit `4a2ac40`, nên chưa chứa phần lớn Stress/Spike/Endurance/report. Hãy tạo các commit logic theo từng bước, cập nhật [git_commit_log.txt](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/git/git_commit_log.txt), push rồi kiểm tra lại bằng cửa sổ không đăng nhập.
> 5. **Liên kết bug với GitHub Issues:** [bug_report.md](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/docs/bug-reports/bug_report.md:107) đang nói chưa tạo issue, nhưng ba issue tương ứng đã tồn tại và có ảnh: [#50 duplicate cart](https://github.com/namdin05/ST-Group/issues/50), [#32 client-controlled total](https://github.com/namdin05/ST-Group/issues/32), [#31 cart not cleared](https://github.com/namdin05/ST-Group/issues/31). Không tạo issue trùng; hãy link chúng và bổ sung screenshot trang issue vào evidence/report.
> 6. **Tạo file ZIP cuối:** chưa có `23127430_HW05_AI_Performance_090.zip`. Chỉ đóng gói sau khi hoàn tất các mục trên. Không đưa `src/node_modules` vào ZIP—`src` hiện khoảng 420 MB. `results` khoảng 100 MB và có các bản raw Stress/Spike/Endurance trùng hash giữa canonical và evidence-rerun, nên nên lập manifest gói nộp để tránh nhân đôi không cần thiết.
>
> ### Rủi ro cần xử lý hoặc xác nhận với giảng viên
>
> - **Evidence cùng frame:** ảnh Load hiện Task Manager che gần hết k6; Stress/Spike tách ảnh resource và ảnh k6 progress. Để an toàn, nên có ảnh side-by-side k6 + backend resource monitor cho từng scenario; video bắt buộc phải thể hiện rõ cùng frame.
> - **Ba report view khác nhau:** [results/views/README.md](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/results/views/README.md:3) thừa nhận cả ba dùng cùng HTML shell và chỉ khác “analytical perspective”. Đây vẫn là grading risk. Nên chỉ định ba output thực sự khác loại cho Load/Stress/Spike hoặc xin xác nhận cách diễn giải k6 từ giảng viên.
> - **Human Review Endurance:** [main_report.md](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/main_report.md:24) vẫn ghi Endurance đang chờ final student acceptance. Sau khi bạn tự xem raw metrics và evidence, hãy ghi rõ quyết định chấp nhận và ngày review trong README/main report.
>
> Các phần đã hoàn tất tốt gồm bốn test plan và raw/HTML result, test data CSV, screenshot/hardware evidence, Endurance 12 phút, AI analysis/misinterpretation hunt, Continuous Performance Testing proposal, AI Critique 290 từ và Agent Skill. Ưu tiên nên là: **Human Review Endurance → video → bổ sung audit/PDF → sửa liên kết bug → xử lý report-view/evidence risk → commit/push/log → tạo ZIP → chạy validator lần cuối**.
>
> Lượt kiểm tra này đã được ghi nguyên văn và xác minh trong [AI_Audit.md](C:/Code/SoftwareTesting/ST-Group/23127430/HW05/ai-audit/AI_Audit.md).
