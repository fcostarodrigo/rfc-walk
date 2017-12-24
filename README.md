# RFC-WALK

[![Travis](https://img.shields.io/travis/fcostarodrigo/rfc-walk.svg)](https://travis-ci.org/fcostarodrigo/rfc-walk)
[![Code Climate](https://img.shields.io/codeclimate/coverage/github/fcostarodrigo/rfc-walk.svg)]()
[![Code Climate](https://img.shields.io/codeclimate/maintainability/fcostarodrigo/rfc-walk.svg)](https://codeclimate.com/github/fcostarodrigo/rfc-walk)

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
