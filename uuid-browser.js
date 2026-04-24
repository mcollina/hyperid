'use strict'

module.exports = function uuidv4 () {
  const c = globalThis.crypto
  if (c.randomUUID) {
    return c.randomUUID()
  }
  const b = new Uint8Array(16)
  c.getRandomValues(b)
  b[6] = (b[6] & 0x0f) | 0x40
  b[8] = (b[8] & 0x3f) | 0x80
  let hex = ''
  for (let i = 0; i < 16; i++) {
    hex += b[i].toString(16).padStart(2, '0')
  }
  return hex.slice(0, 8) + '-' + hex.slice(8, 12) + '-' + hex.slice(12, 16) + '-' + hex.slice(16, 20) + '-' + hex.slice(20, 32)
}
