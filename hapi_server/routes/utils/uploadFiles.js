const fs = require('fs');
const path = require('path');
const util = require('util');
const sharp = require('sharp');
const getHash = require('./getHash');
const Jimp = require('jimp');

const renameP = util.promisify(fs.rename);
const uploadPath = process.env.UPLOAD_PATH;

module.exports = async function uploadFiles(f) {
  // rename to hash name
  const files = (Array.isArray(f) ? f : [f]).map(f => ({...f, oldName: f.filename, filename: getHash()}))

  files.forEach(async f => {
    const targetPath = `${uploadPath}/${f.filename}`;
    // const thumbTargetPath = `${uploadPath}/thumb-${f.filename}`;
    try {
      // const image = await Jimp.read(f.path);
      // await image.resize(200, 200);
      // await image.quality(90);
      // await image.writeAsync(thumbTargetPath);
      await renameP(f.path, targetPath);
    } catch(e) {
      console.log(e, f.oldName);
    }

  });
};
