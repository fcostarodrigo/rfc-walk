# RFC-WALK

[![Build Status](https://travis-ci.org/fcostarodrigo/rfc-walk.svg?branch=travis)](https://travis-ci.org/fcostarodrigo/rfc-walk)
[![Maintainability](https://api.codeclimate.com/v1/badges/913749fe929e7b001441/maintainability)](https://codeclimate.com/github/fcostarodrigo/rfc-walk/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/913749fe929e7b001441/test_coverage)](https://codeclimate.com/github/fcostarodrigo/rfc-walk/test_coverage)

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
function walk(options?: {
  root?: string;
  includeFolders?: boolean;
  onPath?: (path: string) => Promise<void> | undefined;
}): Promise<string[]>;
```

* `root`: Path to where start the search.
* `includeFolders`: If paths of folders should be returned.
* `onPath`: Called with each path found. If it returns a promise, walk will wait for it to resolve.
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
