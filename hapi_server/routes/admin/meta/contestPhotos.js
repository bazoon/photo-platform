module.exports = [
  {
    method: 'GET',
    path: '/api/admin/contestPhotos/meta',
    handler: async function (request, h) {
      const columns = [
        {
          title: 'name',
          dataIndex: 'name',
          key: 'name',
          width: 100
        },
        {
          title: 'image',
          dataIndex: 'img',
          key: 'image',
          width: 100,
          type: 'file'
        },
      ];

      const fields = [];


      return {
        columns,
        fields: fields
      }
    },
    options: {
      auth: {
        mode: 'required'
      }
    }
  },

];
