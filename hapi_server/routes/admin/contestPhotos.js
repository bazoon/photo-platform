const getUploadFilePath = require('../utils/getUploadPath');

module.exports = [
  {
    method: 'GET',
    path: '/api/admin/contestPhotos/{sectionId}',
    handler: async function (request, h) {
      const {
        sectionId
      } = request.params;

      const files = await h.models.Photowork.findAll({
        where: {
          sectionId
        },
        order: [
          ['average', 'desc']
        ]
      });

      return files.map(f => {
        return {
          id: f.id,
          name: f.name,
          img: getUploadFilePath(f.filename),
          approved: f.moder === 1 ? true : (f.moder === 2 ? false : undefined)
        }
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
    method: 'PUT',
    path: '/api/admin/contestPhotos/approve/{id}',
    handler: async function (request, h) {
      console.log('EE');
      const { id } = request.params;
      const query = `
        update photoworks set moder = 1 where id=:id
      `;
      await h.models.sequelize.query(query, { replacements: {id} });
      return {};
    },
    options: {
      tags: ['api'],
      auth: {
        mode: 'required'
      }
    }
  },
  {
    method: 'PUT',
    path: '/api/admin/contestPhotos/decline/{id}',
    handler: async function (request, h) {
      const { id } = request.params;
      const query = `
        update photoworks set moder = 2 where id=:id
      `;
      await h.models.sequelize.query(query, { replacements: {id} });
      return {};
    },
    options: {
      tags: ['api'],
      auth: {
        mode: 'required'
      }
    }
  },

  // {
  //   method: 'PUT',
  //   path: '/api/admin/lexicons/{id}',
  //   handler: async function (request, h) {
  //     const { id } = request.params;
  //     const lexiconValues = R.pick(fields, request.payload);
  //     const lexicon = await h.models.Lexicon.findOne({
  //       where: {
  //         id
  //       }
  //     });

  //     await lexicon.update(lexiconValues);
  //     return R.pick(fields, lexicon);
  //   },
  //   options: {
  //     auth: {
  //       mode: 'required'
  //     }
  //   }
  // },
  // {
  //   method: 'GET',
  //   path: '/api/admin/lexicons/{id}',
  //   handler: async function (request, h) {
  //   },
  //   options: {
  //     auth: {
  //       mode: 'required'
  //     }
  //   }
  // },
  // {
  //   method: 'DELETE',
  //   path: '/api/admin/lexicons/{id}',
  //   handler: async function (request, h) {
  //     const { id } = request.params;
  //     await h.models.Lexicon.destroy({
  //       where: {
  //         id
  //       }
  //     });

  //     return {};
  //   },
  //   options: {
  //     auth: {
  //       mode: 'required'
  //     }
  //   }
  // },

];

