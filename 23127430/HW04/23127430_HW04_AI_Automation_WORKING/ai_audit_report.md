# AI Audit Report

## Student Information

- **Student ID:** 23127430
- **Student name:** Đinh Hoàng Nam
- **Assignment:** HW04 – AI Automation Testing

## AI Interaction 01

**Name of the AI tool:** Codex

**Date and time:** 2026-08-09T21:08:02.2066538+07:00

**Your prompt:**

> [SKILL.md](23127430_HW04_AI_Automation_WORKING/audit-skill/SKILL.md)
>
> Bạn hãy dựa vào [test-cases](23127430_HW04_AI_Automation_WORKING/automation/test-cases/) để tạo ra các [test-data](23127430_HW04_AI_Automation_WORKING/automation/test-data/) nhưng trước hết, bạn có thể review qua bộ test case xem có gì cần chỉnh sửa hay không

**The AI output:**

> Mình sẽ dùng skill `audit-skill` mà bạn đính kèm: trước hết đọc đầy đủ hướng dẫn của skill, rà soát toàn bộ test case và cấu trúc automation, rồi mới quyết định phần nào cần chỉnh trước khi tạo test data. Nếu phát hiện điểm mơ hồ có thể làm sai dữ liệu, mình sẽ nêu rõ thay vì tự suy diễn.
>
> Skill yêu cầu lưu nguyên văn toàn bộ phần trao đổi hiển thị trong lần làm việc này vào báo cáo audit sau khi hoàn tất. Mình đã kiểm tra nội dung yêu cầu hiện tại không chứa thông tin nhạy cảm; tiếp theo mình sẽ xác nhận file audit, đọc các test case và các quy ước dự án trước khi sửa hay sinh dữ liệu.
>
> Mình đã thấy một lỗi cấu trúc quan trọng trước khi tạo dữ liệu: `fr07.md` hiện chứa test case Dashboard (FR-13), còn `fr13.md` lại chứa Mobile Product Detail (FR-06), trong khi tên JSON/spec đang kỳ vọng FR-07 Shopping Cart và FR-13 Dashboard. Ngoài ra `fr13.md` có TC ID trùng `TC004`, và một số chuỗi bị lỗi mã hóa. Mình đang đối chiếu với requirement và mã nguồn để xác định cách sửa đúng, không chỉ đổi tên theo phỏng đoán.
>
> Kết quả đối chiếu requirement/mã nguồn cho thấy cần sửa test case trước: FR-01 không hề yêu cầu trường xác nhận mật khẩu nên case mismatch là sai requirement; mật khẩu “8 ký tự” đang dùng thực tế dài 9 ký tự; FR-07 đang thiếu hoàn toàn bộ Shopping Cart; còn bộ Dashboard cần chuyển về đúng `fr13.md`. Mình sẽ chuẩn hóa ba file theo đúng FR được chọn, giữ các kết quả chạy đã có khi còn hợp lệ, rồi tạo JSON có ánh xạ 1–1 theo TC ID.
>
> Ba bộ test case và test data đã được đồng bộ theo đúng FR. Mình đang chạy kiểm tra chéo tự động: JSON phải parse được, số lượng/TC ID giữa Markdown và JSON phải khớp tuyệt đối, không còn ID trùng, và Playwright phải nạp được các file dữ liệu TypeScript mà không lỗi.
>
> Đã hoàn tất review và tạo test data cho 46 test case (FR-01: 18, FR-07: 14, FR-13: 14).
>
> Các chỉnh sửa chính:
>
> - FR-01: bỏ case xác nhận mật khẩu vì requirement không yêu cầu; sửa dữ liệu biên 8 ký tự thành `Passw0d!`; hoàn thiện case XSS và mass assignment.
> - FR-07: thay bộ Dashboard bị đặt nhầm bằng bộ Shopping Cart đúng requirement.
> - FR-13: thay bộ FR-06 Mobile Product Detail bị đặt nhầm bằng bộ Dashboard; chuẩn hóa ID, header và UTF-8.
>
> File đã cập nhật: [fr01.md](C:/Code/SoftwareTesting/ST-Group/23127430/HW04/23127430_HW04_AI_Automation_WORKING/automation/test-cases/fr01.md), [fr07.md](C:/Code/SoftwareTesting/ST-Group/23127430/HW04/23127430_HW04_AI_Automation_WORKING/automation/test-cases/fr07.md), [fr13.md](C:/Code/SoftwareTesting/ST-Group/23127430/HW04/23127430_HW04_AI_Automation_WORKING/automation/test-cases/fr13.md), [fr01-registration.json](C:/Code/SoftwareTesting/ST-Group/23127430/HW04/23127430_HW04_AI_Automation_WORKING/automation/test-data/fr01-registration.json), [fr07-shopping-cart.json](C:/Code/SoftwareTesting/ST-Group/23127430/HW04/23127430_HW04_AI_Automation_WORKING/automation/test-data/fr07-shopping-cart.json), và [fr13-dashboard.json](C:/Code/SoftwareTesting/ST-Group/23127430/HW04/23127430_HW04_AI_Automation_WORKING/automation/test-data/fr13-dashboard.json).
>
> Đã kiểm tra: JSON parse hợp lệ; 46/46 TC ID ánh xạ 1–1; không có ID trùng, data thừa/thiếu hay lỗi mojibake; TypeScript nạp được cả ba JSON. Chưa chạy SUT vì các spec hiện vẫn là TODO và chưa có test thực thi.
>
> Review mã nguồn cũng cho thấy bộ test sẽ bắt được các lỗi tiềm năng: regex FR-01 đang yêu cầu khoảng trắng thay vì ký tự đặc biệt và API thiếu validation; FR-07 thiếu nút `+/-`, gộp sản phẩm trùng, dialog xác nhận, illustration và nhãn `Tổng cộng`; FR-13 đang nhân đôi doanh thu delivered và API Admin chưa kiểm tra role.
>
> Interaction này đã được ghi và xác minh trong [ai_audit_report.md](C:/Code/SoftwareTesting/ST-Group/23127430/HW04/23127430_HW04_AI_Automation_WORKING/ai_audit_report.md).

## AI Interaction 02

**Name of the AI tool:** Codex

**Date and time:** 2026-08-09T21:51:38.2647908+07:00

**Your prompt:**

> [SKILL.md](23127430_HW04_AI_Automation_WORKING/agent-skill/SKILL.md)
>
> Hãy tạo automation Playwright TypeScript cho FR-01 – Account Registration.
>
> Nguồn đầu vào:
> - Feature specification: [README.md](23127430_HW04_AI_Automation_WORKING/src/README.md)
> - Selected test cases: [fr01.md](23127430_HW04_AI_Automation_WORKING/automation/test-cases/fr01.md)
> - Test data: [fr01-registration.json](23127430_HW04_AI_Automation_WORKING/automation/test-data/fr01-registration.json)
> - Test file cần tạo hoặc cập nhật:  [fr01-registration.spec.ts](23127430_HW04_AI_Automation_WORKING/automation/tests/fr01-registration.spec.ts)
> - SUT URL: [http://localhost:5173/](http://localhost:5173/)
>
> Trong bước này:
> 1. Chỉ tạo hoặc review script và test data.
> 2. Kiểm tra selectors, assertions, synchronization và test isolation.
> 3. Đối chiếu selector với giao diện thật nếu môi trường cho phép.
> 4. Liệt kê mọi giả định hoặc yêu cầu chưa rõ để tôi review.
> 5. Chạy test và tạo kết quả PASS/FAIL.

**The AI output:**

> Mình sẽ dùng `agent-skill` được đính kèm để triển khai FR-01. Trước tiên mình đọc đầy đủ workflow của skill và kiểm tra trạng thái hiện tại, sau đó đối chiếu selector với UI thật, cập nhật script/test data trong đúng phạm vi, rồi chạy Playwright để báo PASS/FAIL thực tế.
>
> `agent-skill` yêu cầu selector phải được kiểm tra trên giao diện render thật và không được kết luận lỗi SUT khi chưa phân loại nguyên nhân. Vì vậy mình sẽ dùng thêm skill điều khiển trình duyệt trong app để kiểm tra DOM/accessible roles tại `localhost:5173`; việc này chỉ phục vụ xác minh selector và hành vi, không chỉnh sửa mã nguồn SUT.
>
> Đối chiếu UI thật xác nhận trang đăng ký đang chạy, nhưng ba `<input>` không có `id`, `name`, `placeholder`, `aria-label` hoặc liên kết `label`, nên chưa thể dùng `getByLabel()` ổn định. Script sẽ dùng heading/button theo role và định vị input trong đúng form theo loại/vị trí, đồng thời ghi rõ đây là giả định cần review. Specification cũng yêu cầu “Xác nhận mật khẩu” nhưng UI và bộ test data hiện thiếu trường này; mình sẽ bổ sung dữ liệu xác nhận cho các case UI và để assertion về trường bắt lỗi đúng theo requirement, không làm yếu expected result.
>
> Script đã map đủ 18 case và dùng dữ liệu ngoài JSON; email được tạo riêng theo browser/worker/test để tránh phụ thuộc thứ tự. Mình cũng đã sửa selector đăng nhập của TC018 sau khi kiểm tra UI thật (`Username`, `Mật khẩu`, nút `Sign In`). Tiếp theo mình chạy từng browser riêng để mỗi browser có HTML report độc lập; bắt đầu với Chromium nhằm phát hiện lỗi automation trước khi mở rộng sang Firefox/WebKit.
>
> Chromium đang thực thi đủ 18 case; thời gian chủ yếu nằm ở các assertion cố ý chờ UI validation/selector còn thiếu. Mình chưa coi các timeout này là lỗi SUT cho đến khi xem trace/screenshot và loại trừ selector hoặc synchronization.
>
> Quyền ghi artifact đã được cấp và Chromium đang chạy lại bình thường; lần chạy trước chưa tạo bằng chứng hợp lệ vì bị sandbox chặn ghi file, nên mình loại nó khỏi kết quả. Sau khi Chromium xong, mình sẽ kiểm tra từng failure trước khi chạy hai browser còn lại.
>
> Chromium hoàn tất với 7 PASS và 11 FAIL. Trace/screenshot cho thấy selector đã trỏ đúng: các failure khớp hành vi SUT (thiếu confirm-password, email dùng `type=text`, mật khẩu hợp lệ bị báo yếu, API trả 200 cho payload sai/duplicate, và tên XSS trở thành thẻ `<script>`). Mình giữ nguyên expected result và sẽ chạy Firefox/WebKit song song; mọi kết luận “SUT bug” vẫn được ghi là chưa xác nhận cho đến khi bạn review theo yêu cầu của skill.
>
> Firefox và WebKit vẫn đang ở pha cuối; hai run dùng email/fixture khác nhau nên không tranh chấp dữ liệu dù chạy song song. Sau khi nhận kết quả, mình sẽ kiểm tra report metadata (`Run by: 23127430` và timestamp thật), đếm PASS/FAIL từ artifact, rồi rà soát diff cuối.
>
> WebKit hoàn tất 7 PASS / 11 FAIL giống Chromium. Firefox tạo được một phần artifact nhưng thiếu `.last-run.json` và HTML report, nên run đó không đủ bằng chứng và không được tính. Mình sẽ chạy lại Firefox riêng; đây là vấn đề thực thi/report của môi trường, không phải kết quả test FR-01.
>
> Firefox rerun đang hoàn tất các case cuối; không có hardcoded wait, mọi chờ đợi đều là Playwright auto-wait hoặc assertion theo trạng thái. Nếu report được ghi đầy đủ, mình sẽ dùng run này thay thế hoàn toàn lần Firefox dang dở.
>
> Ba report và kết quả đều tồn tại, nhưng chuỗi metadata không xuất hiện dạng plain text trong `index.html` vì Playwright đóng gói report JSON vào archive nhúng. Mình đang giải nén phần nhúng để xác minh tiêu đề/timestamp thật thay vì suy luận từ config. Nếu metadata không có trong dữ liệu report, mình sẽ sửa config và chạy lại—không tuyên bố đạt chỉ vì code có đặt `title`.
>
> Đã hoàn tất automation FR-01 với 18 test case data-driven trên Chromium, Firefox và WebKit.
>
> ### Kết quả thực thi
>
> | Browser | PASS | FAIL | Tổng |
> | --- | ---: | ---: | ---: |
> | Chromium | 7 | 11 | 18 |
> | Firefox | 7 | 11 | 18 |
> | WebKit | 7 | 11 | 18 |
> | **Tổng** | **21** | **33** | **54** |
>
> PASS: `TC002`, `TC004`, `TC006`, `TC008`, `TC009`, `TC015`, `TC017`.
>
> FAIL: `TC001`, `TC003`, `TC005`, `TC007`, `TC010–TC014`, `TC016`, `TC018`.
>
> Các failure đều lặp lại trên ba browser. Phân loại chính hiện tại là **SUT bug – chưa xác nhận, chờ human review**:
>
> - UI thiếu trường xác nhận mật khẩu.
> - Email dùng `type="text"` và không báo sai định dạng.
> - Regex từ chối mật khẩu hợp lệ có ký tự đặc biệt.
> - API trả `200` và tạo tài khoản cho payload thiếu trường, email sai, mật khẩu ngắn và email trùng.
> - Tên XSS trở thành phần tử `<script>` thay vì bị từ chối hoặc escape.
>
> Không phát hiện automation script bug, authentication issue hay browser-specific issue trong các failure đã điều tra.
>
> ### File và report
>
> - [Playwright spec](C:/Code/SoftwareTesting/ST-Group/23127430/HW04/23127430_HW04_AI_Automation_WORKING/automation/tests/fr01-registration.spec.ts)
> - [Test data](C:/Code/SoftwareTesting/ST-Group/23127430/HW04/23127430_HW04_AI_Automation_WORKING/automation/test-data/fr01-registration.json)
> - [Chromium report](C:/Code/SoftwareTesting/ST-Group/23127430/HW04/23127430_HW04_AI_Automation_WORKING/html-reports/fr01/chromium/index.html)
> - [Firefox report](C:/Code/SoftwareTesting/ST-Group/23127430/HW04/23127430_HW04_AI_Automation_WORKING/html-reports/fr01/firefox/index.html)
> - [WebKit report](C:/Code/SoftwareTesting/ST-Group/23127430/HW04/23127430_HW04_AI_Automation_WORKING/html-reports/fr01/webkit/index.html)
>
> Đã xác minh từng report chứa `Run by: 23127430`, timestamp ISO thực, screenshot và trace cho failure. TypeScript compile thành công và không có hardcoded wait.
>
> ### Điểm cần bạn review
>
> - `README.md` yêu cầu trường xác nhận mật khẩu, nhưng ghi chú trong `fr01.md` lại nói FR-01 không yêu cầu. Automation ưu tiên feature specification; nên khôi phục test case confirm-password mismatch.
> - Input đăng ký không có accessible name, `id`, `name`, placeholder hoặc liên kết label. Script phải dùng selector theo loại/vị trí trong form; nên bổ sung `htmlFor/id` hoặc `data-testid`.
> - Không có API cleanup, nên test dùng email riêng theo browser/worker/test nhưng vẫn để lại tài khoản thử nghiệm trong database.
> - Việc chạy cả ba browser được suy ra từ cấu hình Playwright hiện có và yêu cầu chạy test của bạn.
> - Cần bạn xác nhận 11 case FAIL là lỗi SUT trước khi lập bug report/GitHub Issue.

## AI Interaction 03

**Name of the AI tool:** Codex

**Date and time:** 2026-08-09T23:11:51.5440959+07:00

**Your prompt:**

> Hiện tại tôi đang chạy backend và frontend rồi, bạn hãy chạy và review với code Playwright cho FR-01
> [SKILL.md](23127430_HW04_AI_Automation_WORKING/audit-skill/SKILL.md) 

**The AI output:**

> Mình sẽ dùng `audit-skill` theo yêu cầu để ghi nhận đầy đủ lượt làm việc này. Đồng thời mình sẽ kiểm tra lại script và dữ liệu FR-01, xác nhận frontend/backend đang phản hồi, chạy Playwright, rồi đối chiếu lỗi với code và báo cáo HTML.
>
> `audit-skill` yêu cầu giữ nguyên từng thông điệp hiển thị cho người dùng và chỉ ghi audit sau khi công việc hoàn tất. Mình đã bắt đầu transcript; tiếp theo mình đang kiểm tra cấu hình Playwright, test case/test data/spec FR-01 và trạng thái hai dịch vụ trước khi chạy.
>
> Frontend trả `200`. Backend không có route `/` nên phép kiểm tra root nhận lỗi HTTP; mình sẽ xác minh trực tiếp qua API thay vì xem đó là backend “down”. Sau đó mình chạy trọn bộ 18 case trên Chromium, Firefox và WebKit vào một report mới để không ghi đè report cũ.
>
> API `/api/products` trả `200`, nên cả hai dịch vụ đều đang hoạt động. Playwright hiện đang chạy 54 lượt kiểm thử (18 case × 3 browser); mình sẽ dùng trace/screenshot của các case thất bại để phân biệt lỗi test script với hành vi sai của SUT.
>
> Lần chạy đầu bị sandbox chặn quyền tạo thư mục artifact; sau khi được cấp quyền phù hợp, test đã chạy bình thường. Bộ test vẫn đang xử lý các case có assertion timeout; đây thường là các case đang chờ thông báo validation mà giao diện không hiển thị.
>
> Lệnh tổng hợp bị giới hạn thời gian ở mức 124 giây trước khi hoàn tất, nên kết quả đó không hợp lệ. Mình sẽ chạy lại đủ ba browser với 3 worker (script đã tạo email theo browser/worker/test nên vẫn giữ isolation) và giới hạn assertion/test ở 15 giây, phù hợp với SUT local để tránh chờ 30 giây cho mỗi thông báo không tồn tại.
>
> Lần chạy lại đang tiến triển bình thường và ghi artifact vào thư mục `review-20260809-v2`. Sau khi hoàn tất, mình sẽ kiểm tra trực tiếp `report.json`/artifact thay vì chỉ dựa vào dòng tổng kết console, rồi review những điểm có thể gây false positive hoặc false negative trong spec.
>
> Các case timeout tập trung ở nhóm validation UI/API, đúng với mẫu lỗi đã thấy trước đây chứ không phải browser bị treo. Mình vẫn để cả ba browser hoàn tất để xác nhận tính nhất quán chéo trình duyệt.
>
> Kết quả chính đã có: **20 PASS / 34 FAIL** trong 54 lượt. Mẫu ổn định là Chromium 7/11, WebKit 7/11; Firefox có thêm một lỗi timeout ở TC002 khi chạy song song nên mình đang xem đó là khả năng flake của cách chạy 3 worker, không vội quy thành lỗi SUT. Mình đang review sâu các assertion có thể tạo false result, đặc biệt TC017/TC018 và cleanup dữ liệu.
>
> Mình đã xác nhận TC002/Firefox thất bại ngay trong `page.goto` vì giới hạn 15 giây khi chạy 3 browser song song; assertion của TC002 chưa hề chạy. Mình sẽ chạy riêng case này với timeout mặc định và 1 worker để xác nhận flake, sau đó chốt review mà không sửa SUT hay test code ngoài phạm vi yêu cầu.
>
> TC002 chạy riêng trên Firefox đã **PASS**, xác nhận đây là flake do lần chạy song song bị giới hạn 15 giây, không phải lỗi chức năng. Mình đã hoàn tất review; bước cuối theo `audit-skill` là ghi nguyên văn toàn bộ lượt tương tác này vào audit report và kiểm tra không làm thay đổi hai interaction cũ.
>
> Đã chạy và review xong. Kết quả chức năng ổn định của FR-01 là **7 PASS / 11 FAIL trên mỗi browser**, tương đương **21 PASS / 33 FAIL** sau khi loại một lỗi hạ tầng TC002/Firefox.
>
> - PASS: `TC002`, `TC004`, `TC006`, `TC008`, `TC009`, `TC015`, `TC017`.
> - FAIL: `TC001`, `TC003`, `TC005`, `TC007`, `TC010–TC014`, `TC016`, `TC018`.
> - Report tổng hợp ban đầu ghi `20 PASS / 34 FAIL`; TC002/Firefox timeout trong `page.goto` do mình chạy 3 worker với `--timeout=15000`. Chạy riêng bằng timeout mặc định đã PASS.
> - TypeScript type-check PASS. Không sửa test code hoặc SUT trong lượt này.
>
> ### Nhận định về lỗi SUT
>
> - UI thiếu trường xác nhận mật khẩu; email vẫn là `type="text"`; regex mật khẩu yêu cầu khoảng trắng và không cho ký tự đặc biệt. Điều này giải thích TC001, TC003, TC005 và việc TC007 chưa đi tới kiểm tra duplicate trong [Register.jsx](C:/Code/SoftwareTesting/ST-Group/23127430/HW04/23127430_HW04_AI_Automation_WORKING/src/frontend-web/src/pages/Register.jsx:15).
> - API đăng ký không validate trường bắt buộc, email, độ mạnh mật khẩu hoặc duplicate theo 4xx; các payload sai vẫn tạo tài khoản. Xem [server.js](C:/Code/SoftwareTesting/ST-Group/23127430/HW04/23127430_HW04_AI_Automation_WORKING/src/backend/server.js:20).
> - Tên người dùng được render bằng `dangerouslySetInnerHTML`, nên TC018 phát hiện thẻ `<script>` thực sự xuất hiện trong header. Xem [App.jsx](C:/Code/SoftwareTesting/ST-Group/23127430/HW04/23127430_HW04_AI_Automation_WORKING/src/frontend-web/src/App.jsx:27).
>
> ### Review code Playwright
>
> 1. **P1 – TC018 không khớp test data:** data cho phép `rejected` hoặc `escaped-text`, nhưng script bắt buộc API phải trả `200/201`. Một SUT từ chối payload bằng 4xx đúng cách vẫn bị FAIL tại [fr01-registration.spec.ts](C:/Code/SoftwareTesting/ST-Group/23127430/HW04/23127430_HW04_AI_Automation_WORKING/automation/tests/fr01-registration.spec.ts:371).
> 2. **P2 – HTTP method trong data bị bỏ qua:** `postRegister()` luôn gọi `request.post`, dù JSON có trường `request.method`. Nên dùng `request.fetch(..., { method })` hoặc validate method chỉ được là POST tại [fr01-registration.spec.ts](C:/Code/SoftwareTesting/ST-Group/23127430/HW04/23127430_HW04_AI_Automation_WORKING/automation/tests/fr01-registration.spec.ts:130).
> 3. **P2 – Isolation chưa có cleanup:** email động ngăn va chạm giữa browser/worker/lần chạy, nhưng mọi tài khoản test vẫn được lưu trong database. Cần reset DB, cleanup API hoặc fixture database riêng nếu yêu cầu isolation nghiêm ngặt.
> 4. **P2 – Selector còn phụ thuộc vị trí:** `nth(0)/nth(1)` là fallback hợp lý với UI hiện tại nhưng dễ gãy khi đổi thứ tự input. SUT nên liên kết `label`–`id` hoặc thêm `data-testid`, sau đó dùng `getByLabel`.
> 5. **P3 – Assertion đăng nhập quá cứng:** `expectCannotLogin()` bắt buộc đúng `401`; một API hợp lệ trả 400/404/422 cũng gây false failure. Nên assert nhóm 4xx và không có token tại [fr01-registration.spec.ts](C:/Code/SoftwareTesting/ST-Group/23127430/HW04/23127430_HW04_AI_Automation_WORKING/automation/tests/fr01-registration.spec.ts:150).
> 6. **P3 – Thư mục report mặc định gây hiểu nhầm:** chạy cả ba project nhưng mặc định ghi vào `html-reports/fr01/chromium`. Nên dùng tên `all-browsers` hoặc script riêng cho từng project trong [playwright.config.ts](C:/Code/SoftwareTesting/ST-Group/23127430/HW04/23127430_HW04_AI_Automation_WORKING/automation/playwright.config.ts:4).
>
> [Mở HTML report tổng hợp](C:/Code/SoftwareTesting/ST-Group/23127430/HW04/23127430_HW04_AI_Automation_WORKING/html-reports/fr01/review-20260809-v2/index.html) · [Report rerun TC002/Firefox](C:/Code/SoftwareTesting/ST-Group/23127430/HW04/23127430_HW04_AI_Automation_WORKING/html-reports/fr01/review-20260809-tc002-firefox/index.html)
>
> Giả định cần bạn xác nhận: `README.md` là nguồn chuẩn nên confirm password là bắt buộc; và nếu API chủ động từ chối field `role` bằng 4xx thì TC017 có nên được coi là PASS hay không. Audit interaction này đã được ghi và kiểm tra trong [ai_audit_report.md](C:/Code/SoftwareTesting/ST-Group/23127430/HW04/23127430_HW04_AI_Automation_WORKING/ai_audit_report.md).

## AI Interaction 04

**Name of the AI tool:** Codex

**Date and time:** 2026-08-10T12:19:58.1042016+07:00

**Your prompt:**

> [SKILL.md](23127430_HW04_AI_Automation_WORKING/agent-skill/SKILL.md) 
> [SKILL.md](23127430_HW04_AI_Automation_WORKING/audit-skill/SKILL.md) 
> Hãy tạo automation Playwright TypeScript cho FR-01 – Account Registration.
> Nguồn đầu vào:
> Feature specification: [README.md](23127430_HW04_AI_Automation_WORKING/src/README.md) 
> Selected test cases: [fr07.md](23127430_HW04_AI_Automation_WORKING/automation/test-cases/fr07.md) 
> Test data: [fr07-shopping-cart.json](23127430_HW04_AI_Automation_WORKING/automation/test-data/fr07-shopping-cart.json) 
> Test file cần tạo hoặc cập nhật:  [fr07-shopping-cart.spec.ts](23127430_HW04_AI_Automation_WORKING/automation/tests/fr07-shopping-cart.spec.ts) 
> SUT URL: http://localhost:5173/
> Trong bước này:
> Chỉ tạo hoặc review script và test data.
> Kiểm tra selectors, assertions, synchronization và test isolation.
> Đối chiếu selector với giao diện thật nếu môi trường cho phép.
> Liệt kê mọi giả định hoặc yêu cầu chưa rõ để tôi review.
> Sau đó, chạy script Playwright cho FR07 và xuất report
>
> Ghi nhận lại vào file [main_report.md](23127430_HW04_AI_Automation_WORKING/main_report.md) 

**The AI output:**

> Mình sẽ dùng `agent-skill` để xây dựng/review automation FR-07 và `audit-skill` để lưu nguyên văn toàn bộ lượt tương tác này. Vì toàn bộ nguồn đầu vào, tên file và yêu cầu chạy đều là FR-07 Shopping Cart, mình sẽ xem cụm “FR-01 – Account Registration” là lỗi ghi nhầm và thực hiện theo FR-07; giả định này sẽ được ghi rõ trong `main_report.md`.
>
> `agent-skill` yêu cầu đối chiếu selector với UI thật và chỉ báo cáo kết quả thực thi hoàn tất. Mình sẽ dùng thêm kỹ năng Browser để kiểm tra DOM/accessible roles trên SUT đang chạy; kỹ năng này chỉ phục vụ kiểm chứng selector, không sửa SUT. `audit-skill` sẽ khiến bước cuối tạm dừng để ghi và xác minh transcript trước khi mình gửi kết quả.
>
> Nguồn kiểm thử FR-07 đã được đánh dấu `Reviewed`, nên đáp ứng điều kiện review của `agent-skill`. Mình cũng phát hiện đặc tả có sẵn credential/token mẫu; mình sẽ không dùng hoặc sao chép chúng vì FR-07 không cần đăng nhập—test sẽ tạo trạng thái giỏ hàng bằng chính UI để giữ isolation.
>
> Đối chiếu UI thật cho thấy dữ liệu sản phẩm hiện hành (30.000.000₫, 28.000.000₫, …) không khớp fixture đã được human-review (100.000₫, 50.000₫, 125.000₫). Để giữ nguyên expected result đã duyệt và không phụ thuộc database SUT, các test UI sẽ mock riêng API sản phẩm bằng fixture JSON; các hành vi giỏ hàng vẫn chạy trên React UI thật. Mình đang kiểm tra DOM của trạng thái giỏ có hàng trước khi viết selector.
>
> Selector được chốt theo DOM thật: role cho `table`, `row`, `columnheader`, `button`, `link`; chỉ ô số lượng và các cell giá trị phải dùng selector theo type/vị trí vì SUT chưa cung cấp accessible name/control tương ứng. Script sẽ dùng auto-wait/state assertion, không có `waitForTimeout`, và mỗi test API sẽ tạo user riêng để không phụ thuộc thứ tự chạy.
>
> JSON và TypeScript đều hợp lệ; Playwright nhận đủ 14 case × 3 browser. `--list` trả mã lỗi chỉ vì HTML reporter mặc định cố ghi vào thư mục FR-01 cũ trong sandbox, không phải lỗi discovery. Khi chạy thật mình sẽ đặt riêng `html-reports/fr07/{browser}` và `playwright-results/fr07/{browser}`, bắt đầu với Chromium để phát hiện lỗi automation trước khi nhân sang Firefox/WebKit.
>
> Chromium đang chạy bình thường. Các case thiếu control/dialog đang dùng assertion theo trạng thái nên sẽ chờ tối đa assertion timeout và lưu trace; không có sleep cố định. Sau run này mình sẽ phân biệt failure do SUT với lỗi setup/mock trước khi tiếp tục hai browser còn lại.
>
> Chromium đã phát hiện một lỗi automation thật trong setup UI: locator của nút thêm dùng accessible name cố định `Thêm vào giỏ hàng`, nên sau khi SUT đổi nhãn thành `Đã thêm`, chính locator không còn resolve và làm 9 case fail trước assertion nghiệp vụ. Đây được phân loại **Automation script bug**, mình sẽ sửa locator thành regex gồm cả hai trạng thái rồi rerun Chromium; kết quả 2 PASS / 12 FAIL vừa rồi sẽ không được dùng làm kết quả FR-07.
>
> Locator sửa đã qua type-check và Chromium rerun đang đi qua được bước seed cart. Mình sẽ chỉ giữ report rerun này; report cũ tại cùng thư mục sẽ được Playwright thay thế, tránh nhầm bằng chứng giữa bản script lỗi và bản đã sửa.
>
> Chromium rerun đã đi qua locator trạng thái nhưng phát hiện lỗi isolation/setup thứ hai: helper dùng `page.goto('/cart')` và `page.goto('/product/...')`, mỗi lần đều reload toàn bộ React app nên `CartProvider` mất state; vì vậy các case UI thấy giỏ trống. Đây cũng là **Automation script bug**, không phải lỗi SUT. Mình sẽ chuyển setup sang điều hướng SPA qua link thật (`EShop`, `/product/:id`, `Giỏ hàng`) để giữ state, rồi rerun; kết quả 3 PASS / 11 FAIL này tiếp tục bị loại.
>
> Rerun thứ ba đang giữ được state qua các route và đi tới assertion nghiệp vụ. Mình đang chờ report hoàn tất; nếu chỉ còn các failure khớp DOM/API đã quan sát thì Chromium sẽ được coi là run hợp lệ để làm mẫu cho Firefox/WebKit.
>
> Chromium run thứ ba hợp lệ: **3 PASS / 11 FAIL**. PASS là `TC006`, `TC011`, `TC013`; các failure giờ đều chạm đúng assertion nghiệp vụ (sai nhãn cột, thiếu illustration/+/−/dialog, không merge duplicate, sai nhãn tổng, sai link, API nhận quantity ≤ 0). Mình sẽ chạy Firefox và WebKit song song với report tách riêng; kết luận SUT bug vẫn để **chưa xác nhận** cho tới khi bạn review.
>
> Firefox và WebKit đang chạy ổn định trên cùng spec đã sửa; user/API fixture của mỗi project mang `runId` riêng nên không tranh chấp cart state. Sau khi cả hai hoàn tất, mình sẽ kiểm tra file report, metadata `Run by: 23127430`, PASS/FAIL và trace trước khi cập nhật `main_report.md`.
>
> Hai browser hoàn tất với cùng tổng **3 PASS / 11 FAIL**. WebKit khớp Chromium hoàn toàn; Firefox có một lần `page.goto` crash riêng ở TC008, nên bằng chứng failure TC008 trong full Firefox run chưa đủ sạch. Mình sẽ rerun riêng TC008/Firefox vào report phụ để phân loại flake này, không ghi đè full report.
>
> TC008/Firefox rerun không còn crash và tái hiện đúng hành vi: không có confirm dialog, item bị xóa ngay. Vì vậy page crash được phân loại **Browser-specific issue của lần chạy**, còn failure nghiệp vụ TC008 được xác nhận tái lập qua rerun. Mình đang kiểm tra metadata và thống kê trực tiếp từ các HTML report trước khi ghi `main_report.md`.
>
> Ba HTML report chính đã được xác minh từ archive nhúng: mỗi browser có tiêu đề `Run by: 23127430`, timestamp thực và thống kê **3 expected / 11 unexpected**; report phụ Firefox TC008 có **1 unexpected**. `agent-skill` ảnh hưởng trực tiếp tới báo cáo: hai lỗi automation tự phát hiện sẽ được ghi riêng, còn 11 failure nghiệp vụ chỉ ghi là **SUT bug candidates – unconfirmed**, chờ bạn xác nhận.
>
> `main_report.md` đã được cập nhật bằng kết quả thật, hai lỗi automation tự sửa, giới hạn fixture/cleanup và 11 candidate chưa xác nhận. Mình đang làm kiểm tra cuối (`tsc`, JSON, diff, report files); sau đó `audit-skill` sẽ ghi Interaction 04 nguyên văn và xác minh ba interaction cũ không thay đổi.
>
> Đã hoàn tất automation Playwright TypeScript cho **FR-07 – Shopping Cart**. Không sửa SUT hoặc file test case; cụm “FR-01” trong prompt được ghi nhận là lỗi tên vì toàn bộ artifact và yêu cầu chạy đều chỉ tới FR-07.
>
> ### Kết quả thực thi
>
> | Browser | PASS | FAIL | Tổng |
> | --- | ---: | ---: | ---: |
> | Chromium | 3 | 11 | 14 |
> | Firefox | 3 | 11 | 14 |
> | WebKit | 3 | 11 | 14 |
> | **Tổng** | **9** | **33** | **42** |
>
> PASS trên cả ba browser: `TC006`, `TC011`, `TC013`.
>
> FAIL trên cả ba browser: `TC001–TC005`, `TC007–TC010`, `TC012`, `TC014`.
>
> 11 failure được phân loại **SUT bug candidates – chưa xác nhận**, gồm: sai nhãn `Đơn giá`; thiếu illustration; không merge sản phẩm trùng; thiếu nút `+/-`; dùng `Tổng tạm tính`; không có confirm dialog khi xóa; sai nhãn `Tiếp tục mua sắm`; API tạo dòng trùng và chấp nhận quantity `0/-1`. Cần bạn xác nhận trước khi coi là bug thật hoặc tạo GitHub Issue.
>
> Firefox từng crash ở bước setup TC008 trong full run; rerun riêng không crash và tái hiện đúng failure thiếu dialog. Lần crash được phân loại browser-specific execution issue, không thay đổi kết quả nghiệp vụ.
>
> ### File đã cập nhật
>
> - [Playwright spec](C:/Code/SoftwareTesting/ST-Group/23127430/HW04/23127430_HW04_AI_Automation_WORKING/automation/tests/fr07-shopping-cart.spec.ts)
> - [Test data](C:/Code/SoftwareTesting/ST-Group/23127430/HW04/23127430_HW04_AI_Automation_WORKING/automation/test-data/fr07-shopping-cart.json)
> - [Main report](C:/Code/SoftwareTesting/ST-Group/23127430/HW04/23127430_HW04_AI_Automation_WORKING/main_report.md)
>
> ### HTML reports
>
> - [Chromium](C:/Code/SoftwareTesting/ST-Group/23127430/HW04/23127430_HW04_AI_Automation_WORKING/html-reports/fr07/chromium/index.html)
> - [Firefox](C:/Code/SoftwareTesting/ST-Group/23127430/HW04/23127430_HW04_AI_Automation_WORKING/html-reports/fr07/firefox/index.html)
> - [WebKit](C:/Code/SoftwareTesting/ST-Group/23127430/HW04/23127430_HW04_AI_Automation_WORKING/html-reports/fr07/webkit/index.html)
> - [Firefox TC008 diagnostic rerun](C:/Code/SoftwareTesting/ST-Group/23127430/HW04/23127430_HW04_AI_Automation_WORKING/html-reports/fr07/firefox-tc008-rerun/index.html)
>
> Đã xác minh report có `Run by: 23127430`, timestamp thực, screenshot/trace cho failure. TypeScript và JSON đều hợp lệ; script không có hardcoded wait.
>
> ### Giả định cần bạn review
>
> - Chấp nhận mock `/api/products*` trong UI tests bằng fixture đã duyệt vì database hiện tại có tên/giá khác test case; logic cart vẫn là SUT thật.
> - Input quantity chưa có label liên kết nên script dùng fallback scoped `main input[type="number"]`.
> - API không có cleanup; email động bảo đảm không va chạm nhưng tài khoản test vẫn còn trong SQLite.
> - TC011 xác minh token hợp lệ, status `200` và array cho user mới; empty array chưa đủ để chứng minh ownership một cách độc lập.
>
> Audit Interaction 04 đã được ghi và xác minh trong [ai_audit_report.md](C:/Code/SoftwareTesting/ST-Group/23127430/HW04/23127430_HW04_AI_Automation_WORKING/ai_audit_report.md).
