const fs = require('fs');
const path = require('path');
const util = require('util');
const sharp = require('sharp');

const renameP = util.promisify(fs.rename);
const uploadPath = process.env.UPLOAD_PATH;

module.exports = async function uploadFiles(f) {
  const files = Array.isArray(f) ? f : [f];
  files.forEach(async f => {
    const targetPath = `${uploadPath}/${f.filename}`;
    const thumbTargetPath = `${uploadPath}/thumb-${f.filename}`;
    await renameP(f.path, targetPath);
    await sharp(targetPath).resize(200, 200).toFile(thumbTargetPath);
  });
};
