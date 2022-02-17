const fs = require('fs');
const util = require('util');
const {getCurrentSlug} = require('./getCurrentSalone');
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


module.exports = function uploadFileForSalone(f, slug) {
  const files = Array.isArray(f) ? f : [f];

  return files.map(async f => {
    const targetPath = `${uploadPath}/${slug}/${f.filename}`
    try {
      return rename(f.path, targetPath).then(_ => f.filename);
    } catch(e) {
      console.log('EXCEPTION!!!! f', e);
      return {e};
    }
  });
};
