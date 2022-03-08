const fs = require('fs');
const util = require('util');
const {getCurrentSlug} = require('./getCurrentSalone');
const {isString} = require('lodash/fp');
const uploadPath = process.env.UPLOAD_PATH;

const rename = (path, targetPath) => {
  return new Promise((resolve, reject) => {
    fs.rename(path, targetPath, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    })
  });
};

const makeupFileName = (path, name) => {
  if (fs.existsSync(path + name)) {
    const fileWithSuffixRe = /(.+)-([0-9])+\.(.+)/

    {
      const [_, partName, n, extension] = name.match(fileWithSuffixRe) || [];
      if (partName && n && extension) {
        return makeupFileName(path, `${partName}-${+n + 1}.${extension}`);
      }
    }

    const fileRe = /(.+)\.(.+)/
    const [, fileName, extension] = name.match(fileRe) || [];
    return makeupFileName(path, `${fileName}-1.${extension}`);
  }

  return [path, name];
};

module.exports = function uploadFileForSalone(f, slug) {
  const files = Array.isArray(f) ? f : [f];

  return files.map(async f => {
    let [path, name] = makeupFileName(`${uploadPath}/${slug}/`, f.filename);
    
    try {
      return rename(f.path, `${path}${name}`).then(_ => name);
    } catch(e) {
      return {e};
    }
  });
};
