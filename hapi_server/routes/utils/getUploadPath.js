const {getCurrentSlug} = require('./getCurrentSalone');

const uploadFolder = 'uploads';

const getUploadFilePath = async function getUploadFilePath(name = '', request) {
  console.assert(name, 'Name is not defined !!!', name);
  const slug = await getCurrentSlug(request);

  if (!name || !slug) return null;

  const fname = name && name.includes('http') ? name : `/${uploadFolder}/${slug}/${name}`;
  return fname;
};

module.exports = getUploadFilePath;
