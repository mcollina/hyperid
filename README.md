# hyperid

[![Build Status](https://img.shields.io/github/workflow/status/mcollina/hyperid/CI)](https://github.com/mcollina/hyperid/actions)

Uber-fast unique id generation, for Node.js and the browser.
Here are the benchmarks:

```
crypto.randomUUID x 36,224,827 ops/sec ±0.96% (89 runs sampled)
hashids process.hrtime x 856,114 ops/sec ±0.34% (98 runs sampled)
hashids counter x 1,693,170 ops/sec ±0.79% (91 runs sampled)
shortid x 1,426,732 ops/sec ±0.54% (95 runs sampled)
crypto.random x 1,392,232 ops/sec ±0.19% (99 runs sampled)
nid x 1,837,497 ops/sec ±0.22% (101 runs sampled)
uuid.v4 x 21,678,972 ops/sec ±0.99% (93 runs sampled)
napiRsUuid.v4 x 9,610,977 ops/sec ±0.63% (91 runs sampled)
uuid.v1 x 1,262,795 ops/sec ±0.57% (96 runs sampled)
nanoid x 6,568,640 ops/sec ±1.22% (95 runs sampled)
hyperid - variable length x 61,131,099 ops/sec ±1.51% (92 runs sampled)
hyperid - fixed length x 61,574,593 ops/sec ±1.16% (91 runs sampled)
hyperid - fixed length, url safe x 60,725,671 ops/sec ±1.86% (94 runs sampled)
hyperid - max int x 96,960,254 ops/sec ±1.73% (87 runs sampled)

Fastest is hyperid - max int
Slowest is hashids process.hrtime
```

_Note:_ Benchmark run with Apple M4 Max and Node.js v24.13.0

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
If `{ urlSafe: true }` is passed in, the function will generate url safe ids according to RFC4648.
If `{ startFrom: <int> }` is passed in, the first counter will start from that
number, which must be between 0 and 2147483647. Fractions are discarded, only the
integer part matters.
If `{ maxInt: <int> }` is passed in, the uuid will be re-generated once the *maxInt* is reached. The lesser the *maxInt*, higher the performance because of SMI (a V8 optimization).

### instance()

Returns an unique id.

### instance.uuid

The uuid used to generate the ids, it will change over time.
If `maxInt` is provided in options, then it will regenerated every `maxInt`, else it will be regenerated every `Math.pow(2, 31) - 1` to keep the integer a SMI (a V8 optimization). 

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
