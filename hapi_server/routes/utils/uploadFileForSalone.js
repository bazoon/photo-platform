const fs = require('fs');
const util = require('util');
const {getCurrentSlug} = require('./getCurrentSalone');
const renameP = util.promisify(fs.rename);
const uploadPath = process.env.UPLOAD_PATH;

module.exports = async function uploadFileForSalone(f, request) {
  const files = Array.isArray(f) ? f : [f];
  const slug = await getCurrentSlug(request)

  return files.map(async f => {
    const targetPath = `${uploadPath}/${slug}/${f.name}`
    try {
      await renameP(f.path, targetPath);
    } catch(e) {
      console.log('EXCEPTION!!!! f', e);
      return {e};
    }
  });
};
