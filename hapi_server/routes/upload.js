const uploadFiles = require('./utils/uploadFiles');
const getUploadFilePath = require('./utils/getUploadPath');
const {getCurrentDomain} = require('./utils/getCurrentDomain');
const getCurrentSalone = require('./utils/getCurrentSalone');
const {getCurrentSlug} = require('./utils/getCurrentSalone');

module.exports = [
  {
    method: 'POST',
    path: '/api/upload',
    handler: async function (request, h) {
      const { file } = request.payload;
      await uploadFiles(file, request);
      return {
        file: await getUploadFilePath({name: file.filename, request})
      };
    },
    options: {
      auth: {
        mode: 'required'
      },
      payload: {
        parse: true,
        output: 'file',
        multipart: true
      }
    }
  },
];
