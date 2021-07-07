module.exports = [
  {
    method: 'GET',
    path: '/api/admin/admins/meta',
    handler: async function (request, h) {
      const users = await h.query('select first_name, last_name, id from users');
      const organizers = await h.query('select name, id from organizers');

      const columns = [
        {
          title: 'organizer',
          dataIndex: 'organizer',
          key: 'organizer',
          width: 100,
        },
        {
          title: 'user',
          dataIndex: 'user',
          key: 'user',
          options: users.map(({firstName, lastName, id}) => ({key: id, dataIndex: id, label: `${firstName} ${lastName}` })),
          width: 100,
        },
        {
          title: 'admType',
          dataIndex: 'admType',
          key: 'admType',
          width: 100,
        }
      ];

      const fields = [
        {
          title: 'organizerId',
          dataIndex: 'organizerId',
          key: 'organizerId',
          options: organizers.map(({name, id}) => ({key: id, dataIndex: id, label: `${name}` })),
          width: 100,
        },
        {
          title: 'user',
          dataIndex: 'userId',
          key: 'user',
          options: users.map(({firstName, lastName, id}) => ({key: id, dataIndex: id, label: `${firstName} ${lastName}` })),
          width: 100,
        },
        {
          title: 'admType',
          dataIndex: 'admType',
          key: 'admType',
          width: 100,
        }
      ];

      return {
        columns,
        fields
      }
    },
    options: {
      auth: {
        mode: 'required'
      }
    }
  },
];
