<script setup>
import { ref } from 'vue'
import { copy } from '../utils/clipboard'

const text = ref('{"name":"example","ok":true}')
const err = ref('')
function run(indent) {
  err.value = ''
  try { text.value = JSON.stringify(JSON.parse(text.value), null, indent) } catch (e) { err.value = e.message }
}
</script>

<template>
  <label>JSON</label>
  <textarea v-model="text" style="min-height:160px" />
  <div class="actions">
    <button class="btn p" @click="run(2)">Format</button>
    <button class="btn" @click="run(0)">Minify</button>
    <button class="btn" @click="copy(text)">Copy</button>
  </div>
  <div class="err">{{ err }}</div>
</template>
