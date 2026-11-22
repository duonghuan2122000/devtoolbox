<script setup>
import { ref, computed } from 'vue'
import qrcode from 'qrcode-generator'
import { enc } from '../utils/codec'
import { copy, toast } from '../utils/clipboard'

qrcode.stringToBytes = s => Array.from(enc.encode(s)) // hỗ trợ UTF-8 / tiếng Việt

const text = ref('https://example.com')
const ec = ref('M')
const size = ref(512)
const fg = ref('#000000')
const bg = ref('#ffffff')

const result = computed(() => {
  if (!text.value) return { svg: '', err: '' }
  try {
    const q = qrcode(0, ec.value)
    q.addData(text.value, 'Byte')
    q.make()
    const n = q.getModuleCount(), m = 4
    let d = ''
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (q.isDark(r, c)) d += `M${c + m} ${r + m}h1v1h-1z`
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${n + 2 * m} ${n + 2 * m}" shape-rendering="crispEdges"><rect width="100%" height="100%" fill="${bg.value}"/><path d="${d}" fill="${fg.value}"/></svg>`
    return { svg, err: '' }
  } catch {
    return { svg: '', err: 'Nội dung quá dài cho mức sửa lỗi này – hãy giảm mức sửa lỗi hoặc rút ngắn nội dung.' }
  }
})

function copyPng() {
  if (!result.value.svg) return
  const px = Math.min(2048, Math.max(64, +size.value || 512))
  const img = new Image()
  img.onload = () => {
    const cv = document.createElement('canvas')
    cv.width = cv.height = px
    const ctx = cv.getContext('2d')
    ctx.imageSmoothingEnabled = false
    ctx.drawImage(img, 0, 0, px, px)
    cv.toBlob(async b => {
      try { await navigator.clipboard.write([new ClipboardItem({ 'image/png': b })]); toast('Đã copy ảnh PNG') }
      catch { toast('Trình duyệt chặn copy ảnh') }
    }, 'image/png')
  }
  img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(result.value.svg)
}

function downloadPng() {
  const px = Math.min(2048, Math.max(64, +size.value || 512))
  const img = new Image()
  img.onload = () => {
    const cv = document.createElement('canvas')
    cv.width = cv.height = px
    const ctx = cv.getContext('2d')
    ctx.imageSmoothingEnabled = false
    ctx.drawImage(img, 0, 0, px, px)
    const a = document.createElement('a')
    a.href = cv.toDataURL('image/png')
    a.download = 'qr.png'
    a.click()
  }
  img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(result.value.svg)
}
</script>

<template>
  <div class="qrwrap">
    <div>
      <label>Nội dung (URL, văn bản, wifi…)</label>
      <textarea v-model="text" style="min-height:90px" />
      <div class="row">
        <div>
          <label>Mức sửa lỗi</label>
          <select v-model="ec">
            <option value="L">L (7%)</option><option value="M">M (15%)</option>
            <option value="Q">Q (25%)</option><option value="H">H (30%)</option>
          </select>
        </div>
        <div><label>Kích thước PNG (px)</label><input type="number" v-model.number="size" min="64" max="2048"></div>
      </div>
      <div class="row">
        <div><label>Màu mã</label><input type="color" v-model="fg" style="width:100%;height:36px"></div>
        <div><label>Màu nền</label><input type="color" v-model="bg" style="width:100%;height:36px"></div>
      </div>
      <div class="err">{{ result.err }}</div>
    </div>
    <div>
      <div class="qrbox" v-html="result.svg" />
      <div class="actions">
        <button class="btn p" @click="downloadPng">Tải PNG</button>
        <button class="btn" @click="copyPng">Copy ảnh PNG</button>
        <button class="btn" @click="copy(result.svg)">Copy mã SVG</button>
      </div>
    </div>
  </div>
</template>
