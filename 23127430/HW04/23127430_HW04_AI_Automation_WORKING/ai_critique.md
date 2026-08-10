# AI Critique

- **Student ID:** 23127430
- **Student name:** Đinh Hoàng Nam
- **Required length:** 200-300 English words
- **Status:** Completed

## Critique

During this assignment, AI accelerated the conversion of reviewed test cases into data-driven Playwright tests, but its first outputs were not reliable enough to accept without inspection. For FR-07, the AI selected a button by the fixed accessible name `Thêm vào giỏ hàng`. After the UI changed the label to `Đã thêm`, the locator detached and several tests failed before reaching their business assertions. It also used `page.goto()` between routes, which reloaded React and erased the in-memory cart state. For FR-13, the AI initially hard-coded a Vietnamese thousands separator even though `toLocaleString()` depends on browser locale. Its first money assertion could also read the initial `0 ₫` render before the asynchronous order response updated the dashboard. Some API checks compared only row count and revenue, so incorrect non-delivered rows could still pass. FR-01 revealed another limitation: the AI followed inconsistent test-case notes too literally and did not resolve their conflict with the feature specification, especially around confirmation password behavior.

These mistakes occurred because the model reasoned mainly from static text and plausible patterns. It could not know transient React state, accessible-name changes, locale behavior, or weak postconditions until the real interface and execution evidence were inspected. Prompts that named files and expected results still did not replace runtime observation or domain judgment.

The main lesson is to treat AI output as a hypothesis, not evidence. Effective collaboration requires deterministic external data, semantic selectors checked against the rendered UI, state-based synchronization, isolated tests, strong business assertions, and explicit failure classification. Human review must preserve the approved requirement instead of weakening expectations merely to obtain passing tests.
