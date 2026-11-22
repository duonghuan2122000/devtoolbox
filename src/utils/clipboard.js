import { ref } from 'vue'

export const toastMsg = ref('')
let timer
export function toast(msg) {
  toastMsg.value = msg
  clearTimeout(timer)
  timer = setTimeout(() => (toastMsg.value = ''), 1400)
}

export async function copy(text) {
  try {
    await navigator.clipboard.writeText(text)
    toast('Đã copy')
  } catch {
    const ta = document.createElement('textarea')
    ta.value = text
    document.body.appendChild(ta)
    ta.select()
    try { document.execCommand('copy'); toast('Đã copy') } catch { toast('Không copy được') }
    ta.remove()
  }
}
