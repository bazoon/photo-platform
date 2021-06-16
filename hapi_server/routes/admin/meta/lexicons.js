module.exports = [
  {
    method: 'GET',
    path: '/api/admin/lexicons/meta',
    handler: async function (request, h) {
      const columns = [
        {
          title: 'code',
          dataIndex: 'code',
          key: 'code'
        },
        {
          title: 'category',
          dataIndex: 'category',
          key: 'category',
        },
        {
          title: 'commentPhrase',
          dataIndex: 'commentPhrase',
          key: 'commentPhrase',
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
