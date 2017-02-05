# RFC-WALK

Simple node module to transverse files recursively.

## Installation

    npm install rfc-walk

## Usage

    const walk = require('rfc-walk');

    for (const file of walk()) {
      console.log(file);
    }

## Reference

    string *walk([root = '.'], [folders = false])

Generator of paths recursively found in root.

* `root`: Path of where to start the search.
* `folders`: If paths of folders should be returned.

## Development

    npm test

## License

[MIT License](http://www.opensource.org/licenses/mit-license.php)
