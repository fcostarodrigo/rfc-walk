# RFC-WALK

Simple node module to transverse files recursively.

## Installation

    npm install rfc-walk

## Usage

    const walk = require('rfc-walk');

    for (const file of await walk()) {
      console.log(file);
    }

    await walk({ onPath: console.log });

    walk().then(console.log);

## Documentation

    async function walk({ root = ".", includeFolders = false, onPath } = {})

* `root`: Path of where to start the search.
* `includeFolders`: If paths of folders should be returned.
* `onPath`: Called with each path found.
* Returns a promise that resolves to a list of paths if onPath is not passed.

## Development

    npm test

## License

[MIT License](http://www.opensource.org/licenses/mit-license.php)
