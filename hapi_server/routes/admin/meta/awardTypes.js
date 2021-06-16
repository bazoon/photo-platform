module.exports = [
  {
    method: 'GET',
    path: '/api/admin/awardTypes/meta',
    handler: async function (request, h) {

      const columns = [
        {
          title: 'name',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: 'image',
          dataIndex: 'img',
          key: 'image',
          type: 'file'
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
