import SparkMD5 from 'spark-md5'

export const enc = new TextEncoder()
export const dec = new TextDecoder()

export const toHex = (buf, upper = false) => {
  const s = [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('')
  return upper ? s.toUpperCase() : s
}
export const bytesToB64 = u8 => {
  let s = ''
  new Uint8Array(u8).forEach(b => (s += String.fromCharCode(b)))
  return btoa(s)
}
export function b64ToBytes(s) {
  s = s.trim().replace(/-/g, '+').replace(/_/g, '/')
  while (s.length % 4) s += '='
  return Uint8Array.from(atob(s), c => c.charCodeAt(0))
}

// ---- MD5 (WebCrypto không hỗ trợ) + HMAC-MD5
const md5raw = buf => {
  const h = SparkMD5.ArrayBuffer.hash(buf)
  return Uint8Array.from({ length: 16 }, (_, i) => parseInt(h.substr(i * 2, 2), 16))
}
function md5hmac(key, msg) {
  if (key.length > 64) key = md5raw(key)
  const ip = new Uint8Array(64 + msg.length)
  const op = new Uint8Array(80)
  for (let i = 0; i < 64; i++) {
    const k = key[i] || 0
    ip[i] = k ^ 0x36
    op[i] = k ^ 0x5c
  }
  ip.set(msg, 64)
  op.set(md5raw(ip), 64)
  return md5raw(op)
}

export const ALGOS = ['MD5', 'SHA-1', 'SHA-256', 'SHA-384', 'SHA-512']

/** Trả về ArrayBuffer/Uint8Array của hash (hoặc HMAC nếu có key). */
export async function digest(algo, data, key = '') {
  if (algo === 'MD5') return key ? md5hmac(enc.encode(key), new Uint8Array(data)) : md5raw(data)
  if (key) {
    const k = await crypto.subtle.importKey('raw', enc.encode(key), { name: 'HMAC', hash: algo }, false, ['sign'])
    return crypto.subtle.sign('HMAC', k, data)
  }
  return crypto.subtle.digest(algo, data)
}
