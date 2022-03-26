const fs = require('fs');
const util = require('util');
const {getCurrentSlug} = require('./getCurrentSalone');
const renameP = util.promisify(fs.rename);
const uploadPath = process.env.UPLOAD_PATH;
const {getCurrentContestIdFromRequest} = require('./getCurrentSalone');

const chooseUploadPath = (filename, slug, contestId) => {
  if (slug && contestId) {
    return `${uploadPath}/${slug}/${contestId}/${filename}`;
  }
  return `${uploadPath}/${filename}`;
};

module.exports = async function uploadToRoot(f, request) {
  const files = Array.isArray(f) ? f : [f];
  files.forEach(async f => {
    try {
      console.log(f.path, `uploadPath/${f.filename}`);
      await renameP(f.path, `${uploadPath}/${f.filename}`);
    } catch(e) {
      return {e};
    }
  });



};
