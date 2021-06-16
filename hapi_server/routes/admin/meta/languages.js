module.exports = [
  {
    method: 'GET',
    path: '/api/admin/languages/meta',
    handler: async function (request, h) {
      const columns = [
        {
          title: 'name',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: 'dialect',
          dataIndex: 'nameDialect',
          key: 'nameDialect'
        },
        {
          title: 'short',
          dataIndex: 'short',
          key: 'short'
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
