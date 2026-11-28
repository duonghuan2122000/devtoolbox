# CLAUDE.md

File này hướng dẫn Claude Code (claude.ai/code) khi làm việc với code trong repo này.

## Dự án

DevToolbox — bộ công cụ developer chạy hoàn toàn trên trình duyệt (QR, Hash/HMAC, Base64/URL, JWT decode, JSON format, UUID/Random). Không server, không gửi dữ liệu đi đâu.

Vue 3 + Vite, build single-file (`vite-plugin-singlefile`), deploy GitHub Pages.

**Đọc trước khi sửa:** `docs/tech-stack.md` (stack, lệnh dev/build) và `docs/devtoolbox-overview.md` (cấu trúc, quy ước thêm tool mới).

## Quy tắc

- Mỗi tool là 1 component độc lập trong `src/components/`, đăng ký trong `tabs` của `src/App.vue`.
- Logic tái dùng (clipboard, codec) đặt ở `src/utils/`, không lặp lại trong từng component.
- Commit message theo Conventional Commits (`feat:`, `fix:`, `docs:`, ...), tiếng Việt có dấu, **không** thêm trailer `Co-Authored-By`.
