<script setup>
import { ref } from 'vue'
import { enc, dec, bytesToB64, b64ToBytes } from '../utils/codec'
import { copy } from '../utils/clipboard'

const input = ref('')
const output = ref('')
const err = ref('')

function run(fn) {
  err.value = ''
  try { output.value = fn(input.value) } catch (e) { err.value = 'Đầu vào không hợp lệ: ' + e.message }
}
const encode = s => bytesToB64(enc.encode(s))
const urlSafe = s => encode(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
</script>

<template>
  <label>Đầu vào</label>
  <textarea v-model="input" />
  <div class="actions">
    <button class="btn p" @click="run(encode)">Encode Base64</button>
    <button class="btn p" @click="run(s => dec.decode(b64ToBytes(s)))">Decode Base64</button>
    <button class="btn" @click="run(urlSafe)">URL-safe</button>
    <button class="btn" @click="run(encodeURIComponent)">URL encode</button>
    <button class="btn" @click="run(decodeURIComponent)">URL decode</button>
  </div>
  <div class="err">{{ err }}</div>
  <label>Kết quả</label>
  <textarea :value="output" readonly />
  <button class="btn" @click="copy(output)">Copy</button>
</template>
