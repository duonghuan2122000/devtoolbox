<script setup>
import { ref } from 'vue'
import { toHex } from '../utils/codec'
import { copy } from '../utils/clipboard'

const n = ref(5)
const len = ref(32)
const out = ref('')

const clamp = (v, lo, hi, d) => Math.min(hi, Math.max(lo, +v || d))
const uuid = () => crypto.randomUUID?.() ?? (() => {
  const b = crypto.getRandomValues(new Uint8Array(16))
  b[6] = (b[6] & 15) | 64; b[8] = (b[8] & 63) | 128
  const h = toHex(b)
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`
})()
const genUuid = () => (out.value = Array.from({ length: clamp(n.value, 1, 100, 1) }, uuid).join('\n'))
const genHex = () => {
  const L = clamp(len.value, 4, 256, 32)
  out.value = Array.from({ length: clamp(n.value, 1, 100, 1) },
    () => toHex(crypto.getRandomValues(new Uint8Array(Math.ceil(L / 2)))).slice(0, L)).join('\n')
}
genUuid()
</script>

<template>
  <div class="row">
    <div><label>Số lượng</label><input type="number" v-model.number="n" min="1" max="100"></div>
    <div><label>Độ dài chuỗi ngẫu nhiên (hex)</label><input type="number" v-model.number="len" min="4" max="256"></div>
  </div>
  <div class="actions">
    <button class="btn p" @click="genUuid">Tạo UUID v4</button>
    <button class="btn" @click="genHex">Tạo chuỗi hex ngẫu nhiên</button>
    <button class="btn" @click="copy(out)">Copy</button>
  </div>
  <label>Kết quả</label>
  <textarea :value="out" readonly />
  <p class="hint">Dùng crypto.getRandomValues – an toàn về mặt mật mã.</p>
</template>
