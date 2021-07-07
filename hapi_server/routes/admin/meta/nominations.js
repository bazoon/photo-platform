module.exports = [
  {
    method: 'GET',
    path: '/api/admin/nominations/meta',
    handler: async function (request, h) {
      const columns = [
        {
          title: 'maxCountImg',
          dataIndex: 'maxCountImg',
          key: 'maxCountImg',
          width: 100
        },
        {
          title: 'name',
          dataIndex: 'name',
          key: 'name',
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
