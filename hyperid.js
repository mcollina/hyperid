'use strict'

const uuid = require('uuid')
const maxInt = Math.pow(2, 31) - 1

function hyperid () {
  var count = 0

  generate.uuid = uuid.v4()
  var id = baseId(generate.uuid)

  function generate () {
    var result = id + count++

    if (count === maxInt) {
      generate.uuid = uuid.v4()
      id = baseId(generate.uuid) // rebase
      count = 0
    }

    return result
  }

  generate.decode = decode

  return generate
}

function baseId (id) {
  return new Buffer(uuid.parse(id)).toString('base64').replace(/==$/, '/')
}

function decode (id) {
  const a = id.match(/(.*)+\/(\d+)+$/)

  if (!a) {
    return null
  }

  const result = {
    uuid: uuid.unparse(new Buffer(a[1] + '==', 'base64')),
    count: parseInt(a[2])
  }

  return result
}

module.exports = hyperid
module.exports.decode = decode
