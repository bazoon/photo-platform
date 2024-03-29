module.exports = [
  {
    method: 'GET',
    path: '/api/admin/awardTypes/meta',
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
          type: 'file',
          width: 100
        },
      ];
      return {
        columns,
        fields: columns
      }
    },
    options: {
      auth: {
        mode: 'required'
      }
    }
  },
];
