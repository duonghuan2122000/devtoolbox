import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteSingleFile } from 'vite-plugin-singlefile'

// `bun run build` -> dist/index.html (một file duy nhất, mở trực tiếp hoặc host ở đâu cũng được)
export default defineConfig({ plugins: [vue(), viteSingleFile()] })
