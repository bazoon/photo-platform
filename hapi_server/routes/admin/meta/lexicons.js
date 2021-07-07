module.exports = [
  {
    method: 'GET',
    path: '/api/admin/lexicons/meta',
    handler: async function (request, h) {
      const columns = [
        {
          title: 'code',
          dataIndex: 'code',
          key: 'code',
          width: 100
        },
        {
          title: 'category',
          dataIndex: 'category',
          key: 'category',
          width: 100
        },
        {
          title: 'commentPhrase',
          dataIndex: 'commentPhrase',
          key: 'commentPhrase',
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
