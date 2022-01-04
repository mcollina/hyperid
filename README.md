# hyperid

[![Build Status](https://img.shields.io/github/workflow/status/mcollina/hyperid/CI)](https://github.com/mcollina/hyperid/actions)

Uber-fast unique id generation, for Node.js and the browser.
Here are the benchmarks:

```
crypto.randomUUID x 17,421,022 ops/sec ±1.05% (92 runs sampled)
hashids process.hrtime x 381,775 ops/sec ±0.22% (95 runs sampled)
hashids counter x 730,949 ops/sec ±0.23% (97 runs sampled)
shortid x 34,682 ops/sec ±3.82% (83 runs sampled)
crypto.random x 313,547 ops/sec ±2.88% (82 runs sampled)
nid x 1,365,624 ops/sec ±0.07% (96 runs sampled)
uuid.v4 x 1,313,028 ops/sec ±0.10% (97 runs sampled)
napiRsUuid.v4 x 536,390 ops/sec ±0.20% (96 runs sampled)
uuid.v1 x 1,999,272 ops/sec ±0.09% (98 runs sampled)
nanoid x 3,808,014 ops/sec ±0.33% (95 runs sampled)
hyperid - variable length x 20,197,843 ops/sec ±0.74% (94 runs sampled)
hyperid - fixed length x 18,894,869 ops/sec ±0.12% (95 runs sampled)
hyperid - fixed length, url safe x 20,158,778 ops/sec ±0.54% (94 runs sampled)
```

_Note:_ Benchmark run with Intel(R) Core(TM) i7-7700 CPU @ 3.60GHz and Node.js v16.3.0

As you can see the native `crypto.randomUUID` is almost as fast as hyperid
on Node.js v16, but not on v14.

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
