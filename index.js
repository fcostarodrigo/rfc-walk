const fs = require('fs');
const path = require('path');

function *walk(root = '.', folders = false) {

  try {
    for (const file of fs.readdirSync(root)) {
      yield *walk(path.join(root, file), folders);
    }
    if (folders) {
      yield root;
    }
  } catch (error) {
    if (error.code === 'ENOTDIR') {
      yield root;
    } else {
      throw error;
    }
  }
}

module.exports = walk;
