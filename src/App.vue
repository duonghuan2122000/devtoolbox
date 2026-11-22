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
  { id: 'qr', name: 'Tạo QR', comp: QrTool },
  { id: 'hash', name: 'Hash / HMAC', comp: HashTool },
  { id: 'b64', name: 'Base64 / URL', comp: Base64Tool },
  { id: 'jwt', name: 'JWT', comp: JwtTool },
  { id: 'json', name: 'JSON', comp: JsonTool },
  { id: 'uuid', name: 'UUID / Random', comp: UuidTool },
]
const pick = id => tabs.find(t => t.id === id) ?? tabs[0]
const current = ref(pick(location.hash.slice(1)).id)
const select = id => { current.value = id; history.replaceState(null, '', '#' + id) }
addEventListener('hashchange', () => (current.value = pick(location.hash.slice(1)).id))
</script>

<template>
  <header>
    <h1>🧰 DevToolbox</h1>
    <p>Bộ công cụ cho developer – mọi thứ chạy trên trình duyệt, dữ liệu không rời khỏi máy bạn.</p>
  </header>
  <nav>
    <button v-for="t in tabs" :key="t.id" :class="{ on: t.id === current }" @click="select(t.id)">{{ t.name }}</button>
  </nav>
  <main>
    <section class="panel">
      <KeepAlive>
        <component :is="pick(current).comp" />
      </KeepAlive>
    </section>
  </main>
  <div v-if="toastMsg" class="toast">{{ toastMsg }}</div>
</template>
