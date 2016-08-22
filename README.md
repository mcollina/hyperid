# hyperid

[![Build
Status](https://travis-ci.org/mcollina/hyperid.svg)](https://travis-ci.org/mcollina/hyperid)

Uber-fast unique id generation, for Node.js and the browser.
Here are the benchmarks:

```
hashids process.hrtime x 27,255 ops/sec ±0.71% (91 runs sampled)
hashids counter x 55,038 ops/sec ±1.32% (88 runs sampled)
shortid x 33,322 ops/sec ±2.77% (75 runs sampled)
nid x 1,027,557 ops/sec ±1.08% (86 runs sampled)
uuid.v4 x 342,969 ops/sec ±1.37% (89 runs sampled)
uuid.v1 x 316,735 ops/sec ±3.56% (83 runs sampled)
hyperid x 9,131,590 ops/sec ±4.83% (73 runs sampled)
```

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

### hyperid()

Returns a function to generate unique ids.

### instance()

Returns an unique id.

### instance.uuid

The uuid used to generate the ids, it will change over time.
It is regenerated every `Math.pow(2, 31) - 1` to keep the integer a SMI
(a V8 optimization).

### hyperid.decode(id)

Decode the unique id into its two components, a `uuid` and a counter.
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
