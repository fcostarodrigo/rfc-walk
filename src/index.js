const fs = require("fs");
const path = require("path");
const util = require("util");

const readdir = util.promisify(fs.readdir);

const walk = async ({ root = ".", includeFolders = false, onPath } = {}) => {
  const paths = [];
  onPath = onPath || paths.push.bind(paths); // eslint-disable-line no-param-reassign

  try {
    const files = await readdir(root);
    const folder = includeFolders ? onPath(root) : Promise.resolve();
    const recurse = file =>
      walk({ root: path.join(root, file), includeFolders, onPath });
    await Promise.all([folder, ...files.map(recurse)]);
  } catch (error) {
    if (error.code === "ENOTDIR") {
      await onPath(root);
    } else {
      throw error;
    }
  }

  return paths;
};

module.exports = walk;
