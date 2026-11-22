<script setup>
import { ref, watchEffect } from 'vue'
import { ALGOS, digest, enc, toHex, bytesToB64 } from '../utils/codec'
import { copy } from '../utils/clipboard'

const text = ref('hello world')
const file = ref(null)
const key = ref('')
const upper = ref(false)
const asB64 = ref(false)
const rows = ref([])

function onFile(e) { file.value = e.target.files[0] ?? null }
function onText() { file.value = null }

let run = 0
watchEffect(async onCleanup => {
  const id = ++run
  const f = file.value, t = text.value, k = key.value, u = upper.value, b = asB64.value
  const data = f ? await f.arrayBuffer() : enc.encode(t).buffer
  const out = []
  for (const a of ALGOS) {
    let val
    try {
      const r = await digest(a, data, k)
      val = b ? bytesToB64(r) : toHex(r, u)
    } catch { val = '(không hỗ trợ)' }
    out.push({ name: (k ? 'HMAC-' : '') + a, val })
  }
  if (id === run) rows.value = out // bỏ kết quả cũ nếu đã có lần tính mới hơn
})
</script>

<template>
  <label>Văn bản đầu vào</label>
  <textarea v-model="text" @input="onText" />
  <div class="inline">
    <span>hoặc chọn file:</span>
    <input type="file" @change="onFile">
    <label><input type="checkbox" v-model="upper">CHỮ HOA</label>
    <label><input type="checkbox" v-model="asB64">Base64</label>
  </div>
  <label>HMAC secret key (tuỳ chọn – bỏ trống để băm thường)</label>
  <input type="text" v-model="key" placeholder="secret">
  <div style="margin-top:14px">
    <div v-for="r in rows" :key="r.name" class="out">
      <b>{{ r.name }}</b><code>{{ r.val }}</code>
      <button class="btn" @click="copy(r.val)">Copy</button>
    </div>
  </div>
  <p class="hint">MD5 và SHA-1 đã yếu về mặt mật mã, chỉ nên dùng cho checksum/tương thích. Mật khẩu hãy dùng bcrypt/argon2 phía server.</p>
</template>
