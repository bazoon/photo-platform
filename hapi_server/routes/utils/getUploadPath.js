const {getCurrentSlug, getCurrentContestIdFromRequest} = require('./getCurrentSalone');

const uploadFolder = 'uploads';

const getUploadFilePath = async function getUploadFilePath({name = '', request, contestId}) {
  console.assert(name, 'Name is not defined !!!', name);
  const slug = await getCurrentSlug(request);
  
  if (contestId && slug) {
    const fname = name && name.includes('http') ? name : `/${uploadFolder}/${slug}/${contestId}/${name}`;
    return fname;
  }

  const fname = name && name.includes('http') ? name : `/${uploadFolder}/${name}`;
  return fname;
};

module.exports = getUploadFilePath;
