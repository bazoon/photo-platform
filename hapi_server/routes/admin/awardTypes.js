const api = 'awardTypes';

const uploadFiles = require('../utils/uploadFiles');
const getUploadFilePath = require('../utils/getUploadPath');


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
          img: getUploadFilePath({name: awardType.img, request})
        };
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
    method: 'POST',
    path: `/api/admin/${api}`,
    handler: async function (request, h) {
      const { name, img } = request.payload;
      await uploadFiles(img, request);
      const awardType = await h.models.AwardType.create({
        name,
        img: img.filename
      });
      return {
        name: awardType.name,
        img: getUploadFilePath({name: awardType.img, request})
      };
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
    method: 'PUT',
    path: `/api/admin/${api}/{id}`,
    handler: async function (request, h) {
      const { id } = request.params;
      const { name, img } = request.payload;
      await uploadFiles(img, request);
      
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
        img: getUploadFilePath({name: awardType.img, request}),
        id: awardType.id
      };
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
