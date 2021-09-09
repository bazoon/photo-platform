module.exports = [
  {
    method: 'GET',
    path: '/api/admin/applications/meta',
    handler: async function (request, h) {
      const users = await h.query('select first_name, last_name, id from users');

      const regStates = [
        'Подана',
        'Принята',
        'Ожидает оплаты',
        'Отклонена по неуплате',
        'Отклонена по другой причине',
        'Регистрация приостановлена',
        'Бан'
      ];


      const columns = [
        {
          title: 'userName',
          dataIndex: 'userName',
          key: 'userName',
          width: 100,
        },
        {
          title: 'dateReg',
          dataIndex: 'dateReg',
          key: 'dateReg',
          width: 100,
        },
        {
          title: 'sectionCount',
          dataIndex: 'sectionCount',
          key: 'sectionCount',
          width: 100,
        },
        {
          title: 'regState',
          dataIndex: 'regState',
          key: 'regState',
          width: 100,
        },
        {
          title: 'rejectionReason',
          dataIndex: 'rejectionReason',
          key: 'rejectionReason',
          width: 100,
        },
        {
          title: 'payment',
          dataIndex: 'payment',
          key: 'payment',
          width: 100,
        },
        {
          title: 'maxCountImg',
          dataIndex: 'maxCountImg',
          key: 'maxCountImg',
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
          title: 'regState',
          dataIndex: 'regState',
          key: 'regState',
          width: 100,
          options: regStates.map((name, id) => ({ key: id, dataIndex: id, label: name }))
        },
        {
          title: 'rejectionReason',
          dataIndex: 'rejectionReason',
          key: 'rejectionReason',
          width: 100,
        },
        {
          title: 'payment',
          dataIndex: 'payment',
          key: 'payment',
          width: 100,
        },
        {
          title: 'maxCountImg',
          dataIndex: 'maxCountImg', 
          key: 'maxCountImg',
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
