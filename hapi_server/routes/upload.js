const uploadFiles = require("./utils/uploadFiles");
const getUploadFilePath = require("./utils/getUploadPath");


// router.put('/:id', koaBody({ multipart: true }), async ctx => {
//   const { id } = ctx.params;
//   const { name } = ctx.request.body;
//   const img = ctx.request.files && ctx.request.files.img;

//   if (img) {
//     const files = img ? (Array.isArray(img) ? img : [img]) : [];
//     await uploadFiles(files);
//   }

//   const awardType = await models.AwardType.findOne({
//     where: {
//       id
//     }
//   });

//   await awardType.update({
//     name
//   });

//   if (img) {
//     await awardType.update({
//       img: img.name
//     });
//   }

//   ctx.body = {
//     id: awardType.id,
//     name: awardType.name,
//     img: getUploadFilePath(awardType.img)
//   };
// });

// router.get('/', async ctx => {
// });

// router.get('/:id', async ctx => {
//   const { id } = ctx.params;

//   const awardType = await models.AwardType.findOne({
//     where: {
//       id
//     }
//   });

//   ctx.body = {
//     id: awardType.id,
//     name: awardType.name,
//     img: getUploadFilePath(awardType.img)
//   };
// });

// router.delete('/:id', async ctx => {
//   const { id } = ctx.params;

//   await models.AwardType.destroy({
//     where: {
//       id
//     }
//   });

//   ctx.body = {};
// });

module.exports = [
  {
    method: 'POST',
    path: `/api/upload`,
    handler: async function (request, h) {
      const { file } = request.payload;
      await uploadFiles(file);
      return {
        file: getUploadFilePath(file.filename)
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
