module.exports = [
  {
    method: 'GET',
    path: '/api/admin/words/meta',
    handler: async function (request, h) {
      const users = await h.query('select first_name, last_name, id from users');

      const columns = [
        {
          title: 'organizer',
          dataIndex: 'organizer',
          key: 'organizer'
        },
        {
          title: 'user',
          dataIndex: 'userId',
          key: 'user',
          options: users.map(({firstName, lastName, id}) => ({key: id, dataIndex: id, label: `${firstName} ${lastName}` }))
        },
        {
          title: 'admType',
          dataIndex: 'admType',
          key: 'admType'
        }
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
