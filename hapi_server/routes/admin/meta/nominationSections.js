module.exports = [
  {
    method: 'GET',
    path: '/api/admin/nominationSections/meta',
    handler: async function () {
      const columns = [
        {
          title: 'name',
          dataIndex: 'name',
          key: 'name',
          width: 100
        },
        {
          title: 'language',
          dataIndex: 'language',
          key: 'language',
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
