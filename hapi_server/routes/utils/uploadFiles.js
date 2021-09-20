const fs = require('fs');
const path = require('path');
const util = require('util');
const sharp = require('sharp');
const getHash = require('./getHash');
const Jimp = require('jimp');
const renameP = util.promisify(fs.rename);
const uploadPath = process.env.UPLOAD_PATH;

module.exports = async function uploadFiles(f) {
  const files = (Array.isArray(f) ? f : [f]);//.map(f => ({...f, oldName: f.filename, filename: getHash()}))
  files.forEach(async f => {
    const targetPath = `${uploadPath}/${f.filename}`;
    try {
      await renameP(f.path, targetPath);
    } catch(e) {
      console.log('EXCEPTION!!!! f', e);
      return {e};
    }

  });
};
