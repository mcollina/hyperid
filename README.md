# hyperid

[![Build
Status](https://travis-ci.org/mcollina/hyperid.svg)](https://travis-ci.org/mcollina/hyperid)

Uber-fast unique id generation, for Node.js and the browser.
Here are the benchmarks:

```
hashids process.hrtime x 30,118 ops/sec ±1.11% (85 runs sampled)
hashids counter x 56,412 ops/sec ±3.93% (81 runs sampled)
shortid x 28,454 ops/sec ±5.49% (68 runs sampled)
nid x 727,875 ops/sec ±1.90% (82 runs sampled)
uuid.v4 x 320,558 ops/sec ±1.48% (81 runs sampled)
uuid.v1 x 1,893,480 ops/sec ±1.27% (87 runs sampled)
hyperid x 9,250,278 ops/sec ±2.53% (82 runs sampled)
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
