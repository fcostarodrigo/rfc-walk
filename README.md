# RFC-WALK

[![Travis](https://img.shields.io/travis/fcostarodrigo/rfc-walk.svg)](https://travis-ci.org/fcostarodrigo/rfc-walk)
[![Codecov](https://img.shields.io/codecov/c/github/fcostarodrigo/rfc-walk.svg)](https://codecov.io/gh/fcostarodrigo/rfc-walk/)

Simple node module to transverse files recursively.

## Installation

```bash
npm install rfc-walk
```

## Usage

```javascript
const walk = require('rfc-walk');

for (const file of await walk()) {
  console.log(file);
}

await walk({ onPath: console.log });

walk().then(console.log);
```

## Documentation

```typescript
function walk({ root = ".", includeFolders = false, onPath: (path: string) => void } = {}): Promise<string[]>
```

* `root`: Path to where start the search.
* `includeFolders`: If paths of folders should be returned.
* `onPath`: Called with each path found.
* Returns a promise that resolves after the search is finished and it is resolved with a list of paths if onPath is not passed.

## Development

Full tests with coverage

```bash
npm test
```

Unit tests and watch for changes

```bash
npm run unit-test
```

## License

[MIT License](http://www.opensource.org/licenses/mit-license.php)
