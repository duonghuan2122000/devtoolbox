<script setup>
import { ref, computed } from 'vue'
import { dec, b64ToBytes } from '../utils/codec'

const token = ref('')
const pretty = s => JSON.stringify(JSON.parse(dec.decode(b64ToBytes(s))), null, 2)

const parsed = computed(() => {
  const t = token.value.trim()
  if (!t) return { header: '', payload: '', err: '' }
  try {
    const p = t.split('.')
    if (p.length < 2) throw new Error('cần ít nhất 2 phần ngăn bởi dấu "."')
    let payload = pretty(p[1])
    const o = JSON.parse(payload)
    for (const k of ['exp', 'iat', 'nbf'])
      if (typeof o[k] === 'number') payload += `\n// ${k}: ${new Date(o[k] * 1000).toISOString()}`
    return { header: pretty(p[0]), payload, err: '' }
  } catch (e) {
    return { header: '', payload: '', err: 'Token không hợp lệ: ' + e.message }
  }
})
</script>

<template>
  <label>JWT token</label>
  <textarea v-model="token" placeholder="eyJhbGciOi..." />
  <div class="err">{{ parsed.err }}</div>
  <label>Header</label><pre>{{ parsed.header }}</pre>
  <label>Payload</label><pre>{{ parsed.payload }}</pre>
  <p class="hint">Chỉ giải mã, không xác minh chữ ký.</p>
</template>
