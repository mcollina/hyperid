'use strict'

const benchmark = require('benchmark')
const Hashids = require('hashids')
const shortid = require('shortid')
const nid = require('nid')
const crypto = require('crypto')
const uuid = require('uuid')
const { nanoid } = require('nanoid')
const hyperid = require('.')

const hyperIdSafeUrlInstance = hyperid({
  urlSafe: true
})
const hyperIdInstance = hyperid()

const suite = new benchmark.Suite()

const hashids = new Hashids('mybench')

if (crypto.randomUUID) {
  suite.add('crypto.randomUUID', function () {
    crypto.randomUUID()
  })
}

suite.add('hashids process.hrtime', function () {
  hashids.encode(process.hrtime())
})

let hashIdCounter = 0

suite.add('hashids counter', function () {
  hashids.encode(hashIdCounter++)
})

suite.add('shortid', function () {
  shortid()
})

suite.add('crypto.random', function () {
  crypto.randomBytes(33).toString('hex')
})

suite.add('nid', function () {
  nid()
})

suite.add('uuid.v4', function () {
  uuid.v4()
})

suite.add('uuid.v1', function () {
  uuid.v1()
})

suite.add('nanoid', function () {
  nanoid()
})

suite.add('hyperid - variable length', function () {
  hyperIdInstance()
})

suite.add('hyperid - fixed length', function () {
  hyperIdInstance(true)
})
suite.add('hyperid - fixed length, url safe', function () {
  hyperIdSafeUrlInstance(true)
})

suite.on('cycle', cycle)

suite.run()

function cycle (e) {
  console.log(e.target.toString())
}
