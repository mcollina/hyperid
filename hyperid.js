'use strict'

const uuid = require('uuid/v4')
const parser = require('uuid-parse')
const maxInt = Math.pow(2, 31) - 1
const Buffer = require('buffer').Buffer

function hyperid (opts) {
  var fixedLength = false
  var urlSafe = false
  if (typeof opts === 'boolean') {
    fixedLength = opts
  } else {
    opts = opts || {}
    urlSafe = !!opts.urlSafe
    fixedLength = !!opts.fixedLength
  }

  var count = 0

  generate.uuid = uuid()
  var id = baseId(generate.uuid, urlSafe)

  function generate () {
    var result = fixedLength
      ? id + pad(count++)
      : id + count++

    if (count === maxInt) {
      generate.uuid = uuid()
      id = baseId(generate.uuid, urlSafe) // rebase
      count = 0
    }

    return result
  }

  generate.decode = decode

  return generate
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
}

function baseId (id, urlSafe) {
  var base64Id = Buffer.from(parser.parse(id)).toString('base64')
  if (urlSafe) {
    return base64Id.replace(/\+/g, '_').replace(/\//g, '-').replace(/==$/, '-')
  }
  return base64Id.replace(/==$/, '/')
}

function decode (id, opts) {
  opts = opts || {}
  var urlSafe = !!opts.urlSafe

  if (urlSafe) {
    id = id.replace(/-/g, '/').replace(/_/g, '+')
  }

  const a = id.match(/(.*)+\/(\d+)+$/)

  if (!a) {
    return null
  }

  const result = {
    uuid: parser.unparse(Buffer.from(a[1] + '==', 'base64')),
    count: parseInt(a[2])
  }

  return result
}

module.exports = hyperid
module.exports.decode = decode
