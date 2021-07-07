module.exports = [
  {
    method: 'GET',
    path: '/api/admin/results/meta',
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
        {
          title: 'average',
          dataIndex: 'average',
          key: 'average',
          width: 100
        },
        {
          title: 'median',
          dataIndex: 'median',
          key: 'median',
          width: 100
        }
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
