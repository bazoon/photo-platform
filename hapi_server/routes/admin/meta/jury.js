module.exports = [
  {
    method: 'GET',
    path: '/api/admin/juries/meta',
    handler: async function (request, h) {
      const users = await h.query('select first_name, last_name, id from users');

      const columns = [
        {
          title: 'name',
          dataIndex: 'name',
          key: 'name',
          width: 100,
        },
        {
          title: 'rank',
          dataIndex: 'rank',
          key: 'rank',
          width: 100,
        },
      ];
 
      const fields = [
        {  
          title: 'userId',
          dataIndex: 'userId',
          key: 'userId',
          width: 100,
          options: users.map(({firstName, lastName, id}) => ({key: id, dataIndex: id, label: `${firstName} ${lastName}` })),
        },
        {
          title: 'rank',
          dataIndex: 'rank',
          key: 'rank',
          width: 100,
        },
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
