# RFC-WALK

Simple node module to transverse files recursively.

## Installation

    npm install rfc-walk

## Usage

    const walk = require('rfc-walk');

    for (const file of await walk()) {
      console.log(file);
    }

    await walk({ callback: console.log });

    walk().then(console.log);

## Documentation

    async function walk({ root = ".", folders = false, callback } = {})

* `root`: Path of where to start the search.
* `folders`: If paths of folders should be returned.
* `callback`: Called with each path found.
* Returns a promise that resolves to a list of paths or undefined if callback is passed.

## Development

    npm test

## License

[MIT License](http://www.opensource.org/licenses/mit-license.php)
