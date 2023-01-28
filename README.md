# esm-polyfills

[ESM modules](https://nodejs.org/api/esm.html#modules-ecmascript-modules) are becoming a norm these days with some of the popular modules published as only ESM modules(example [got](https://github.com/sindresorhus/got), [ky](https://github.com/sindresorhus/ky)). It also comes with a lot of useful features like Top-level await, etc.

But, there are a few features that CommonJS supports but ESM doesnt like [these](https://nodejs.org/api/esm.html#differences-between-es-modules-and-commonjs).
It becomes a pain to migrate each of these features to a ESM compatible feature and its a lot of manual work. This polyfill tries to support those commonly used and feasible features in ESM modules.

## Polyfills

-   [x] \_\_filename
-   [x] \_\_dirname
-   [x] require
-   [x] require.resolve

## Installation

### Using npm:

```bash
$ npm install --save @lordofthethings/esm-polyfills
```

### Using yarn:

```bash
$ yarn add @lordofthethings/esm-polyfills
```

## Usage

```bash
$ node -r @lordofthethings/esm-polyfills <your-script>.mjs
```

Then in your `<your-script>.mjs` file, globals like `__filename`, `__dirname`, `require` and `require.resolve` will be automatically available:

```javascript
console.log('__filename', __filename);
console.log('__dirname', __dirname);
console.log(require('lodash'), require.resolve('lodash'), require('../package.json'));
```

If you dont want to auto polyfill, then you can programmatically import them and use it your code like this:

```bash
$ ESM_POLYFILLS_GLOBAL=false node -r @lordofthethings/esm-polyfills <your-script>.mjs
```

Then in your `<your-script>.mjs` file, do:

```javascript
import { getFileName, getDirName, getRequire as _require_ } from '@lordofthethings/esm-polyfills';

const __filename = getFileName();
const __dirname = getDirName();

console.log('__filename', __filename);
console.log('__dirname', __dirname);
console.log(_require_('lodash'), _require_.resolve('lodash'));
```