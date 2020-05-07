# hyperid

[![Build
Status](https://travis-ci.org/mcollina/hyperid.svg)](https://travis-ci.org/mcollina/hyperid)

Uber-fast unique id generation, for Node.js and the browser.
Here are the benchmarks:

```
hashids process.hrtime x 282,674 ops/sec ±0.87% (95 runs sampled)
hashids counter x 561,497 ops/sec ±0.30% (98 runs sampled)
shortid x 44,641 ops/sec ±0.45% (93 runs sampled)
nid x 1,438,733 ops/sec ±0.50% (96 runs sampled)
uuid.v4 x 390,607 ops/sec ±0.24% (92 runs sampled)
uuid.v1 x 1,725,443 ops/sec ±0.11% (98 runs sampled)
hyperid - variable length x 14,534,944 ops/sec ±0.80% (93 runs sampled)
hyperid - fixed length x 14,452,901 ops/sec ±0.48% (94 runs sampled)
```

_Note:_ Benchmark run with Intel(R) Core(TM) i7-7700 CPU @ 3.60GHz and Node.js v12.14.2

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
