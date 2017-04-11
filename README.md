# hyperid

[![Build
Status](https://travis-ci.org/mcollina/hyperid.svg)](https://travis-ci.org/mcollina/hyperid)

Uber-fast unique id generation, for Node.js and the browser.
Here are the benchmarks:

```
hashids process.hrtime x 32,750 ops/sec ±0.65% (89 runs sampled)
hashids counter x 67,476 ops/sec ±0.66% (90 runs sampled)
shortid x 55,419 ops/sec ±2.09% (87 runs sampled)
nid x 578,914 ops/sec ±0.63% (96 runs sampled)
uuid.v4 x 510,042 ops/sec ±1.85% (91 runs sampled)
uuid.v1 x 2,293,920 ops/sec ±0.53% (95 runs sampled)
hyperid - variable length x 11,888,473 ops/sec ±1.08% (87 runs sampled)
hyperid - fixed length x 11,049,988 ops/sec ±3.78% (83 runs sampled)
```

_Note:_ Benchmark run with Intel i7-4810MQ @ 2.80GHz using Node v7.2.0

## Install

```
npm i hyperid --save
```

## Example

```js
'use strict'

const hyperid = require('hyperid')
const instance = hyperid()

const id = instance()

console.log(id)
console.log(instance())
console.log(hyperid.decode(id))
console.log(hyperid.decode(instance()))
```

## API

### hyperid([fixedLength || options])

Returns a function to generate unique ids.  
The function can accept one of the following parameters:
- `fixedLength: Boolean`  
If *fixedLength* is `true` the function will always generate an id
that is 33 characters in length, by default `fixedLength` is `false`.  
- `options: Object`  
If `{ fixedLength: true }` is passed in, the function will always generate an id
that is 33 characters in length, by default `fixedLength` is `false`.  
If `{ urlSafe: true }` is passed in, the function will generate url safe ids.

### instance()

Returns an unique id.

### instance.uuid

The uuid used to generate the ids, it will change over time.
It is regenerated every `Math.pow(2, 31) - 1` to keep the integer a SMI
(a V8 optimization).

### hyperid.decode(id, [options])

Decode the unique id into its two components, a `uuid` and a counter.  
If you are generating *url safe* ids, you must pass `{ urlSafe: true }` as option.  
It returns:

```js
{
  uuid: '049b7020-c787-41bf-a1d2-a97612c11418',
  count: 1
}
```

This is aliased as `instance.decode`.

## License

MIT
