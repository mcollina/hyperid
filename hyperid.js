'use strict'

const uuidv4 = require('./uuid')
const parser = require('uuid-parse')
const maxInt = Math.pow(2, 31) - 1
const Buffer = require('buffer').Buffer

function hyperid (opts) {
  let fixedLength = false
  let urlSafe = false
  if (typeof opts === 'boolean') {
    fixedLength = opts
  } else {
    opts = opts || {}
    urlSafe = !!opts.urlSafe
    fixedLength = !!opts.fixedLength
  }

  generate.uuid = uuidv4()
  generate.decode = decode

  let id = baseId(generate.uuid, urlSafe)
  let count = Math.floor(opts.startFrom || 0)

  if (isNaN(count) || !(maxInt > count && count >= 0)) {
    throw new Error([
      `when passed, opts.startFrom must be a number between 0 and ${maxInt}.`,
      'Only the integer part matters.',
      `- got: ${opts.startFrom}`
    ].join('\n'))
  }

  return generate

  function generate () {
    const result = fixedLength
      ? id + pad(count++)
      : id + count++

    if (count === maxInt) {
      generate.uuid = uuidv4()
      id = baseId(generate.uuid, urlSafe) // rebase
      count = 0
    }

    return result
  }
}

function pad (count) {
  if (count < 10) return '000000000' + count
  if (count < 100) return '00000000' + count
  if (count < 1000) return '0000000' + count
  if (count < 10000) return '000000' + count
  if (count < 100000) return '00000' + count
  if (count < 1000000) return '0000' + count
  if (count < 10000000) return '000' + count
  if (count < 100000000) return '00' + count
  if (count < 1000000000) return '0' + count
  return count
}

function baseId (id, urlSafe) {
  let base64Id = Buffer.from(parser.parse(id)).toString('base64')
  const l = base64Id.length
  if (urlSafe) {
    if (base64Id[l - 2] === '=' && base64Id[l - 1] === '=') {
      base64Id = base64Id.substr(0, l - 2) + '-'
    }
    return base64Id.replace(/\+/g, '-').replace(/\//g, '_')
  }
  if (base64Id[l - 2] === '=' && base64Id[l - 1] === '=') {
    return base64Id.substr(0, l - 2) + '/'
  }
  return base64Id
}

function decode (id, opts) {
  opts = opts || {}
  const urlSafe = !!opts.urlSafe

  if (urlSafe) {
    // need to first convert the last minus to slash,
    // then the remaining to plus
    id = id.replace(/-([^-]*)$/, '/' + '$1')
      .replace(/-/g, '+')
      .replace(/_/g, '/')
  }

  const lastSlashIndex = id.lastIndexOf('/')
  if (lastSlashIndex === -1) {
    return null
  }
  const uuidPart = id.substring(0, lastSlashIndex)
  const countPart = Number(id.substring(lastSlashIndex + 1))
  if (!uuidPart || isNaN(countPart)) {
    return null
  }

  const result = {
    uuid: parser.unparse(Buffer.from(uuidPart + '==', 'base64')),
    count: countPart
  }

  return result
}

module.exports = hyperid
module.exports.decode = decode
