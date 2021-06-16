const api = 'awardTypes';

const uploadFiles = require('../utils/uploadFiles');
const getUploadFilePath = require('../utils/getUploadPath');


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
    method: 'GET',
    path: `/api/admin/${api}`,
    handler: async function (request, h) {
      const awards = await h.models.AwardType.findAll();
      return awards.map(awardType => {
        return {
          id: awardType.id,
          name: awardType.name,
          img: getUploadFilePath(awardType.img)
        };
      });
    },
    options: {
      auth: {
        mode: 'required'
      }
    }
  },
  {
    method: 'POST',
    path: `/api/admin/${api}`,
    handler: async function (request, h) {
      const { name, img } = request.payload;
      await uploadFiles(img);
      const awardType = await h.models.AwardType.create({
        name,
        img: img.filename
      });
      return {
        name: awardType.name,
        img: getUploadFilePath(awardType.img)
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
  {
    method: 'PUT',
    path: `/api/admin/${api}/{id}`,
    handler: async function (request, h) {
      const { id } = request.params;
      const { name, img } = request.payload;
      await uploadFiles(img);
      
      const awardType = await h.models.AwardType.findOne({
        where: {
          id
        }
      });

      await awardType.update({
        name
      });

      if (img) {
        await awardType.update({
          img: img.filename
        });
      }

      return {
        name: awardType.name,
        img: getUploadFilePath(awardType.img),
        id: awardType.id
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
  // {
  //   method: 'GET',
  //   path: `/api/admin/${api}`,
  //   handler: async function (request, h) {

  //   },
  //   options: {
  //     auth: {
  //       mode: 'required'
  //     }
  //   }
  // },
  // {
  //   method: 'GET',
  //   path: `/api/admin/${api}`,
  //   handler: async function (request, h) {

  //   },
  //   options: {
  //     auth: {
  //       mode: 'required'
  //     }
  //   }
  // },
  // {
  //   method: 'GET',
  //   path: `/api/admin/${api}`,
  //   handler: async function (request, h) {

  //   },
  //   options: {
  //     auth: {
  //       mode: 'required'
  //     }
  //   }
  // },
];
