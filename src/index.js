const fs = require("fs");
const path = require("path");

const walk = ({ root = ".", includeFolders = false, onPath } = {}) => {
  const paths = [];
  onPath = onPath || paths.push.bind(paths); // eslint-disable-line no-param-reassign

  const recurse = file =>
    walk({ root: path.join(root, file), includeFolders, onPath });

  return new Promise((resolve, reject) => {
    const resolveToPaths = () => resolve(paths);

    fs.readdir(root, (error, files) => {
      if (error && error.code === "ENOTDIR") {
        Promise.resolve(onPath(root)).then(resolveToPaths);
      } else if (error) {
        reject(error);
      } else {
        const folder = includeFolders ? onPath(root) : null;
        Promise.all([folder, ...files.map(recurse)]).then(resolveToPaths);
      }
    });
  });
};

module.exports = walk;
