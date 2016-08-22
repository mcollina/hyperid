'use strict'

const hyperid = require('.')
const test = require('tape')
const maxInt = Math.pow(2, 31) - 1

test('generating unique ids', function (t) {
  t.plan(1)

  const instance = hyperid()
  const ids = []

  for (var i = 0; i < maxInt * 10; i += Math.ceil(Math.random() * maxInt / 100)) {
    const id = instance()

    if (ids.indexOf(id) >= 0) {
      t.fail('duplicate')
      return
    }

    ids.push(id)
  }

  t.pass(ids.length + ' id generated')
})

test('decode uuids', function (t) {
  t.plan(4)

  const instance = hyperid()

  t.ok(instance.uuid, 'uuid exists')
  t.notEqual(instance.uuid, hyperid().uuid, 'uuid are not equals')

  t.deepEqual(hyperid.decode(instance()), {
    uuid: instance.uuid,
    count: 0
  }, 'decode')

  t.deepEqual(instance.decode(instance()), {
    uuid: instance.uuid,
    count: 1
  }, 'decode from an instance')
})
