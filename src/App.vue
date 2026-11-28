<script setup>
import { ref, shallowRef } from 'vue'
import QrTool from './components/QrTool.vue'
import HashTool from './components/HashTool.vue'
import Base64Tool from './components/Base64Tool.vue'
import JwtTool from './components/JwtTool.vue'
import JsonTool from './components/JsonTool.vue'
import UuidTool from './components/UuidTool.vue'
import { toastMsg } from './utils/clipboard'

const tabs = [
  { id: 'qr', name: 'Tạo QR', ic: '▣', comp: QrTool, desc: 'Tạo mã QR từ văn bản hoặc đường dẫn, xuất PNG/SVG.' },
  { id: 'hash', name: 'Hash / HMAC', ic: '#', comp: HashTool, desc: 'Tính hash (MD5, SHA…) và HMAC cho văn bản.' },
  { id: 'b64', name: 'Base64 / URL', ic: '≡', comp: Base64Tool, desc: 'Encode/decode Base64 và URL.' },
  { id: 'jwt', name: 'JWT', ic: '⌁', comp: JwtTool, desc: 'Giải mã header/payload của JWT.' },
  { id: 'json', name: 'JSON', ic: '{}', comp: JsonTool, desc: 'Format, minify và kiểm tra JSON.' },
  { id: 'uuid', name: 'UUID / Random', ic: '◆', comp: UuidTool, desc: 'Sinh UUID và chuỗi ngẫu nhiên.' },
]
const pick = id => tabs.find(t => t.id === id) ?? tabs[0]
const current = ref(pick(location.hash.slice(1)).id)
const railOpen = ref(false)
const select = id => { current.value = id; history.replaceState(null, '', '#' + id); railOpen.value = false }
addEventListener('hashchange', () => (current.value = pick(location.hash.slice(1)).id))
</script>

<template>
  <div class="app">
    <nav class="rail" :class="{ open: railOpen }">
      <div class="brand"><span class="dot"></span>DevToolbox</div>
      <button v-for="t in tabs" :key="t.id" :class="{ on: t.id === current }" @click="select(t.id)">
        <span class="ic">{{ t.ic }}</span>{{ t.name }}
      </button>
    </nav>
    <div class="main">
      <div class="topbar">
        <button class="menubtn" @click="railOpen = !railOpen">☰</button>
        <header>
          <h1>{{ pick(current).name }}</h1>
          <p>{{ pick(current).desc }}</p>
        </header>
        <div class="badge"><span class="pulse"></span>Chạy 100% trên trình duyệt</div>
      </div>
      <main>
        <section class="panel">
          <KeepAlive>
            <component :is="pick(current).comp" />
          </KeepAlive>
        </section>
      </main>
    </div>
  </div>
  <div v-if="toastMsg" class="toast">{{ toastMsg }}</div>
</template>
