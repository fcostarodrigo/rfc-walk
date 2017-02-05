const assert = require('assert');
const walk = require('../index.js');
const SegfaultHandler = require('segfault-handler');

SegfaultHandler.registerHandler('crash.log');

describe('walk', function() {

  it('should return the source tree of the project', function() {

    const tree = Array.from(walk('.', true)).filter(file => {
      return !file.includes('node_modules') && !file.includes('.git');
    });

    assert.deepStrictEqual(tree, [
      '.jscsrc',
      'README.md',
      'index.js',
      'package.json',
      'test/test.js',
      'test',
      '.'
    ]);
  });

  it('should skip folders by default', function() {

    const tree = Array.from(walk('.')).filter(file => {
      return !file.includes('node_modules') && !file.includes('.git');
    });

    assert.deepStrictEqual(tree, [
      '.jscsrc',
      'README.md',
      'index.js',
      'package.json',
      'test/test.js'
    ]);
  });

  it('should use the working directory by default', function() {

    const tree = Array.from(walk()).filter(file => {
      return !file.includes('node_modules') && !file.includes('.git');
    });

    assert.deepStrictEqual(tree, [
      '.jscsrc',
      'README.md',
      'index.js',
      'package.json',
      'test/test.js'
    ]);
  });

  it('should be a generator', function() {
    const iterable = walk();
    assert(typeof iterable[Symbol.iterator] === 'function');
  });
});
