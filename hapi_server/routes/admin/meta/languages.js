module.exports = [
  {
    method: 'GET',
    path: '/api/admin/languages/meta',
    handler: async function (request, h) {
      const columns = [
        {
          title: 'name',
          dataIndex: 'name',
          key: 'name',
          width: 100
        },
        {
          title: 'dialect',
          dataIndex: 'nameDialect',
          key: 'nameDialect',
          width: 100
        },
        {
          title: 'short',
          dataIndex: 'short',
          key: 'short',
          width: 100
        }
      ];
      return {
        columns,
        fields: columns
      };
    },
    options: {
      auth: {
        mode: 'required'
      }
    }
  },
];
