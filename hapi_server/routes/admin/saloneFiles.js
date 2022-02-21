const getUploadFilePath = require('../utils/getUploadPath');
const uploadFiles = require('../utils/uploadFiles');
const {getCurrentSlug} = require('../utils/getCurrentSalone');
const uploadFileForSalone = require('../utils/uploadFileForSalone');
const fs = require('fs');

const getFileUrl = (name, slug) => {
 return `/uploads/${slug}/${name}`;
};

  const getFileSize = (fileName, slug) => {
    const uploadPath = process.env.UPLOAD_PATH;
    const targetPath = `${uploadPath}/${slug}`
    var stats = fs.statSync(`${targetPath}/${fileName}`);
    return (stats.size / 1024).toFixed(2);
  };

module.exports = [
  {
    method: 'POST',
    path: '/api/admin/saloneFiles/{_t}/{slug}',
    handler: async function (request, h) {
      const { file } = request.payload;
      const {slug} = request.params;
      const filePaths = await Promise.all(uploadFileForSalone(file, slug));

      return filePaths.map(f => ({file: f, id: f, slug, fileSize: getFileSize(f, slug), url: getFileUrl(f, slug)}))
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
          }).map(f => {

            var stats = fs.statSync(`${targetPath}/${f}`);
            var fileSizeInBytes = stats.size;
            return {file: f, id: f, slug, url: getFileUrl(f, slug), fileSize: getFileSize(f, slug)};

          })
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

