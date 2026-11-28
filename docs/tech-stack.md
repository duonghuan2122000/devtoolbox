# Tech stack

- Vue 3 (`<script setup>`), không router, không state management lib — mỗi tool tự quản state riêng qua `ref`.
- Vite + `vite-plugin-singlefile` → build ra 1 file HTML duy nhất trong `dist/`.
- Deploy: GitHub Actions (`.github/workflows/pages.yml`) → GitHub Pages.
- Dependency ngoài: `qrcode-generator` (QR), `spark-md5` (MD5 cho HashTool).

## Lệnh

```powershell
bun install
bun run dev      # dev server
bun run build    # build dist/
bun run preview  # preview bản build
```
