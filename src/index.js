const fs = require("fs");
const path = require("path");
const util = require("util");

const readdir = util.promisify(fs.readdir);

const walk = async ({ root = ".", includeFolders = false, onPath } = {}) => {
  const paths = [];
  onPath = onPath || paths.push.bind(paths); // eslint-disable-line no-param-reassign

  const onError = error =>
    error.code === "ENOTDIR" ? onPath(root) : Promise.reject(error);

  const recurse = file =>
    walk({ root: path.join(root, file), includeFolders, onPath });

  const onFiles = files => {
    const folder = includeFolders ? onPath(root) : null;
    return Promise.all([folder, ...files.map(recurse)]);
  };

  await readdir(root)
    .then(onFiles)
    .catch(onError);

  return paths;
};

module.exports = walk;
