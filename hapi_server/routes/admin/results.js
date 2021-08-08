const getUploadFilePath = require("../utils/getUploadPath");

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
          img: getUploadFilePath(f.filename),
          average: f.average,
          median: f.median
        }
      });
    },
    options: {
      auth: {
        mode: 'required'
      }
    }
  },
];