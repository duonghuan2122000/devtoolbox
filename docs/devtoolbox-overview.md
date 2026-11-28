# DevToolbox — overview

Bộ tool developer chạy client-side, không server. `App.vue` là shell: danh sách tab + router hash đơn giản (`#qr`, `#hash`, ...), mỗi tab render 1 component trong `KeepAlive`.

## Cấu trúc

```
src/
  App.vue            shell: tab list + hash routing
  components/         1 file .vue = 1 tool, độc lập, không phụ thuộc tool khác
  utils/
    clipboard.js       toast + copy clipboard dùng chung
    codec.js           hàm encode/decode dùng chung
```

## Thêm tool mới

1. Tạo `src/components/XxxTool.vue` (tự chứa UI + logic của tool).
2. Thêm 1 dòng vào mảng `tabs` trong `App.vue`.
3. Logic dùng chung với tool khác → đưa vào `src/utils/`, không copy-paste.
