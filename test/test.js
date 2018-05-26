'use strict'

const hyperid = require('..')
const test = require('tape')

test('generating unique ids', function (t) {
  t.plan(1)

  const instance = hyperid()
  const ids = []

  for (var i = 0; i < 2048; i++) {
    const id = instance()

    if (ids.indexOf(id) >= 0) {
      t.fail('duplicate')
      return
    }

    ids.push(id)
  }

  t.pass(ids.length + ' id generated')
})

test('generating unique ids are correct length when fixedLength set to true', function (t) {
  t.plan(1)

  const instance = hyperid(true)

  for (var i = 0; i < 1000000; i++) {
    const id = instance()

    if (id.length !== 33) {
      t.fail('incorrect length')
      return
    }
  }

  t.pass('1000000 id of 33 characters generated')
})

test('generating unique ids are correct length when fixedLength set to true (as option object)', function (t) {
  t.plan(1)

  const instance = hyperid({ fixedLength: true })

  for (var i = 0; i < 1000000; i++) {
    const id = instance()

    if (id.length !== 33) {
      t.fail('incorrect length')
      return
    }
  }

  t.pass('1000000 id of 33 characters generated')
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

test('generate url safe ids', function (t) {
  t.plan(1)

  const instance = hyperid({ urlSafe: true })
  const id = instance()

  t.equal(encodeURIComponent(id), id)
})

test('decode url safe ids', function (t) {
  t.plan(1)

  const instance = hyperid({ urlSafe: true })

  t.deepEqual(hyperid.decode(instance(), { urlSafe: true }), {
    uuid: instance.uuid,
    count: 0
  }, 'decode')
})
