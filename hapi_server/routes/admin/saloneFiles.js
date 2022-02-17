const getUploadFilePath = require('../utils/getUploadPath');
const uploadFiles = require('../utils/uploadFiles');
const {getCurrentSlug} = require('../utils/getCurrentSalone');
const uploadFileForSalone = require('../utils/uploadFileForSalone');
const fs = require('fs');
const {promisify} = require('util');

module.exports = [
  {
    method: 'POST',
    path: '/api/admin/saloneFiles/{_t}/{slug}',
    handler: async function (request, h) {
      const { file } = request.payload;
      const {slug} = request.params;
      const filePaths = await Promise.all(uploadFileForSalone(file, slug));

      return {
        file: filePaths[0],
        id: filePaths[0]
      }
    },
    options: {
      tags: ['api'],
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
  {
    method: 'GET',
    path: '/api/admin/saloneFiles/{saloneId}/{t}',
    handler: async function (request, h) {
      const {
        saloneId
      } = request.params;

      const salone = await h.models.Salone.findOne({where: {id: saloneId}});
      const slug = salone.slug;
      const uploadPath = process.env.UPLOAD_PATH;
      const targetPath = `${uploadPath}/${slug}`

      return new Promise((resolve, reject) => {
        fs.readdir(targetPath, (err, files) => {
          if (err) {
            reject(err);
            return;
          }
          const r = files.filter(file => {
            const fullPath = `${targetPath}/${file}`;
            return !fs.statSync(fullPath).isDirectory();
          }).map(f => ({file: f, id: f, slug}))
          resolve(r);
        });
      });
    },
    options: {
      tags: ['api'],
      auth: {
        mode: 'required'
      }
    }
  },
  {
    method: 'DELETE',
    path: '/api/admin/saloneFiles/{fileName}/{slug}',
    handler: async function (request, h) {
      const {
        fileName,
        slug
      } = request.params;
      
      const uploadPath = process.env.UPLOAD_PATH;
      const targetPath = `${uploadPath}/${slug}/${fileName}`;
    
      return new Promise((resolve, reject) => {
        fs.unlink(targetPath, (err) => {
          if (err) {
            reject(err)
            return {err};
          }
          resolve({id: fileName});
        });
      })
    },
    options: {
      tags: ['api'],
      auth: {
        mode: 'required'
      }
    }
  }
];

