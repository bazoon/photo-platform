const getUploadFilePath = require('../utils/getUploadPath');

module.exports = [
  {
    method: 'GET',
    path: '/api/admin/results/{sectionId}',
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
          img: getUploadFilePath({name: f.filename, request}),
          average: f.average,
          median: f.median
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
];
