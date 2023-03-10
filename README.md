[![Build](https://github.com/subbu963/esm-polyfills/actions/workflows/main.yml/badge.svg)](https://github.com/subbu963/esm-polyfills/actions/workflows/main.yml)

# esm-polyfills

[ES module format](https://nodejs.org/api/esm.html#modules-ecmascript-modules) is becoming a norm these days with some of the popular modules published as only ES modules(example [got](https://github.com/sindresorhus/got), [ky](https://github.com/sindresorhus/ky)). It also comes with a lot of useful features like Top-level await, etc.

But, there are a few features that CommonJS supports but ESM doesnt like [these](https://nodejs.org/api/esm.html#differences-between-es-modules-and-commonjs).
It becomes a pain to migrate each of these features to a ESM compatible feature and its a lot of manual work. This polyfill tries to support those commonly used and feasible features in ES modules.

Also, i have a detailed it in my blog [here](https://lordofthethings.xyz/how-to-fix-referenceerror-__dirname/__filename/require-is-not-defined-in-es-module-scope/).

## Available polyfills

-   [x] \_\_filename
-   [x] \_\_dirname
-   [x] require
-   [x] require.resolve

## Installation

### Using npm:

```bash
$ npm install --save @subbu963/esm-polyfills
```

### Using yarn:

```bash
$ yarn add @subbu963/esm-polyfills
```

## Usage

```bash
$ node -r @subbu963/esm-polyfills <your-script>.mjs
```

Then in your `<your-script>.mjs` file, globals like `__filename`, `__dirname`, `require` and `require.resolve` will be automatically available:

```javascript
console.log('__filename', __filename);
console.log('__dirname', __dirname);
console.log(require('lodash'), require.resolve('lodash'), require('../package.json'));
```

If you dont want to auto polyfill, then you can programmatically import them and use it in your code like this:

```bash
$ ESM_POLYFILLS_GLOBAL=false node <your-script>.mjs
```

Then in your `<your-script>.mjs` file, do:

```javascript
import { getFileName, getDirName, getRequire as _require_ } from '@subbu963/esm-polyfills';

const __filename = getFileName();
const __dirname = getDirName();

console.log('__filename', __filename);
console.log('__dirname', __dirname);
console.log(_require_('lodash'), _require_.resolve('lodash'));
```

## Comparision with other libraries

There are other libraries which serve the same purpose like:

-   [@uscreen.de/common-esm](https://www.npmjs.com/package/@uscreen.de/common-esm)
-   [esm-utils](https://www.npmjs.com/package/esm-utils)
-   [desm](https://www.npmjs.com/package/desm)

But these packages arent actually polyfills. They require you to manually import those libraries and use `__dirname`, `__filename`, etc from them.
My polyfill aims to get away with this manual process and use those commonjs functionality directly in a ES module like you are in a commonjs module.
