'use strict'

const benchmark = require('benchmark')
const Hashids = require('hashids')
const shortid = require('shortid')
const nid = require('nid')
const uuid = require('uuid')
const hyperid = require('.')()

const suite = new benchmark.Suite()

const hashids = new Hashids('mybench')

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

suite.add('nid', function () {
  nid()
})

suite.add('uuid.v4', function () {
  uuid.v4()
})

suite.add('uuid.v1', function () {
  uuid.v1()
})

suite.add('hyperid - variable length', function () {
  hyperid()
})

suite.add('hyperid - fixed length', function () {
  hyperid(true)
})

suite.on('cycle', cycle)

suite.run()

function cycle (e) {
  console.log(e.target.toString())
}
