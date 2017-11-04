const fs = require("fs");
const path = require("path");
const util = require("util");

const readdir = util.promisify(fs.readdir);

const walk = async ({ root = ".", folders = false, callback } = {}) => {
  const results = [];
  const push = callback || results.push.bind(results);

  try {
    const files = await readdir(root);
    if (folders) await push(root);
    const recurse = async file =>
      walk({ root: path.join(root, file), folders, callback: push });
    await Promise.all(files.map(recurse));
  } catch (error) {
    if (error.code === "ENOTDIR") {
      await push(root);
    } else {
      throw error;
    }
  }

  if (callback) return undefined;

  return results;
};

module.exports = walk;
