This file provides guidance to AI coding agents like Claude Code (claude.ai/code), Cursor AI, Codex, Gemini CLI, GitHub Copilot, and other AI coding assistants when working with code in this repository.

# hyperid

Uber-fast unique id generation for Node.js and the browser. CommonJS library; no build step.

## Commands

```bash
npm install
npm test                 # lint + tape suite + TypeScript check
npm run lint             # eslint (neostandard)
npm run lint:fix
npm run typescript       # tsc --project ./test/tsconfig.json (typechecks test/example.ts)
npm run legacy           # tape test/test.js only (used by CI on Node 14–18)
node benchmark.js        # performance comparison vs uuid/nanoid/etc.
node example.js
```

### Running tests selectively

```bash
npx tape test/test.js              # main unit tests
npx tape test/buffer.js            # Buffer fallback via proxyquire
npx tape test/uniqueness.js        # bloom-filter uniqueness (slow / memory-heavy)
npx tape test/test.js -g 'decode'  # single tape test by name substring
```

`npm test` pipes tape through `tap-dot`. Prefer raw `npx tape …` when debugging failures.

## Architecture

IDs are `base64(uuid-bytes) + separator + counter`. A factory creates a closure that reuses one UUID and increments a counter until rollover.

```
hyperid([opts])  →  generate()
                      generate.uuid   // current uuid string
                      generate.decode // same as hyperid.decode
```

### Source layout

| File | Role |
|------|------|
| `hyperid.js` | Factory, encode/decode, counter rollover |
| `uuid-node.js` | Node: `crypto.randomUUID` |
| `uuid-browser.js` | Browser: `crypto.randomUUID` or `getRandomValues` fallback |
| `index.d.ts` | Public TypeScript types (`export = hyperid`) |
| `test/` | tape tests + `example.ts` for typecheck |

`package.json` `"browser"` remaps `./uuid-node.js` → `./uuid-browser.js`. Do not require `crypto` from browser paths.

### Encoding rules (easy to break)

- UUID dashes stripped → hex buffer → base64 with `==` padding.
- Default (not url-safe): trailing `=` padding becomes `/`, which is the **separator** before the decimal counter. Decode finds the **last** `/`.
- `urlSafe: true`: RFC4648 alphabet (`+`→`-`, `/`→`_`), padding becomes `-`. Decode must pass `{ urlSafe: true }` or it returns wrong/null results.
- `fixedLength: true`: counter zero-padded to 10 digits → always 33-char ids.
- Legacy API: `hyperid(true)` is equivalent to `hyperid({ fixedLength: true })`.

### Performance contract

Default `maxInt` is `2^31 - 1` so the counter stays a V8 SMI. On rollover the UUID is regenerated and count resets to 0. Increment uses `(count + 1) | 0`. Lower `maxInt` trades UUID regeneration frequency for speed (see benchmark “max int” case). Changing rollover or encoding without updating decode and fixed-length math will break uniqueness or decode.

### Buffer dependency

`hyperid.js` loads Node `buffer` or falls back to the `buffer` npm package (`require('buffer/')`). `test/buffer.js` forces the fallback with proxyquire. The published `buffer` dependency is required for browser bundlers.

## CI constraints

`.github/workflows/ci.yml`:

- **legacy** (Node 14/16/18): production install + `tape` only → `npm run legacy`. Do not rely on modern syntax or full devDependency graph for core runtime code.
- **test** (Node 20/22/24): full `npm test` (lint + all tape files + typescript).

Keep runtime code compatible with the legacy matrix unless the supported range is intentionally raised.

## Conventions

- `'use strict'` at top of JS files; CommonJS `require` / `module.exports`.
- Lint style is **neostandard** via ESLint 9 flat config (`eslint.config.js`).
- Types live only in `index.d.ts`; validate changes with `npm run typescript` and `test/example.ts`.
- Published files are listed in `package.json` `"files"` — do not rely on unlisted paths at runtime.
