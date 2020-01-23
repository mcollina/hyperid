# hyperid

[![Build
Status](https://travis-ci.org/mcollina/hyperid.svg)](https://travis-ci.org/mcollina/hyperid)

Uber-fast unique id generation, for Node.js and the browser.
Here are the benchmarks:

```
hashids process.hrtime x 111,334 ops/sec ±12.05% (68 runs sampled)
hashids counter x 267,594 ops/sec ±7.22% (74 runs sampled)
shortid x 27,396 ops/sec ±2.59% (82 runs sampled)
nid x 890,727 ops/sec ±2.52% (85 runs sampled)
uuid.v4 x 217,132 ops/sec ±3.13% (75 runs sampled)
uuid.v1 x 941,868 ops/sec ±1.69% (89 runs sampled)
hyperid - variable length x 7,944,465 ops/sec ±2.70% (87 runs sampled)
hyperid - fixed length x 9,175,561 ops/sec ±1.42% (80 runs sampled)
```

_Note:_ Benchmark run with 1,3 GHz Intel Core i5 using Node v12.13.0

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
