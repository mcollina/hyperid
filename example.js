'use strict'

const hyperid = require('.')
const instance = hyperid()

const id = instance()

console.log(id)
console.log(hyperid.decode(id))
