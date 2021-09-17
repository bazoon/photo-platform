
const imageFormFields = [
  // {
  //   name: 'id',
  //   hidden: true,
  // },
  {
    name: 'name',
    title: 'Наименование',
    type: 'string'
  },
  {
    name: 'description',
    title: 'Описание',
    type: 'string'
  },
  {
    name: 'year',
    title: 'Год съемки',
    type: 'string'
  },
  {
    name: 'place',
    title: 'Место съемки',
    type: 'string'
  }
];



module.exports = [
  {
    method: 'GET',
    path: '/api/admin/applications/meta',
    handler: async function (request, h) {
      const users = await h.query('select first_name, last_name, id from users');
      const {id} = request.query;
      const contest = await h.models.Contest.findOne({where:{id}})


      const regStates = [
        'Подана',
        'Принята',
        'Ожидает оплаты',
        'Отклонена по неуплате',
        'Отклонена по другой причине',
        'Регистрация приостановлена',
        'Бан'
      ];

      const payment = [
        'Не оплачена',
        'Частичная оплата',
        'Оплачена',
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
          title: 'regStateString',
          dataIndex: 'regStateString',
          key: 'regStateString',
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
        // {  
        //   title: 'userId',
        //   dataIndex: 'userId',
        //   key: 'userId',
        //   width: 100,
        //   options: users.map(({firstName, lastName, id}) => ({key: id, dataIndex: id, label: `${firstName} ${lastName}` })),
        // },
        //
        {
          title: 'regState',
          dataIndex: 'regState',
          key: 'regState',
          width: 200,
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
          type: 'selectButton',
          dataIndex: 'payment',
          key: 'payment',
          width: 100,
          options: payment.map((name, id) => ({ key: id, dataIndex: id, label: name }))
        },
        {
          title: 'sectionCount',
          dataIndex: 'sectionCount', 
          type: 'number',
          key: 'sectionCount',
          width: 100,
          max: contest.sectionCount,
        },
        {
          title: 'maxCountImg',
          dataIndex: 'maxCountImg', 
          type: 'number',
          key: 'maxCountImg',
          width: 100,
          max: contest.maxCountImg
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
  {
    method: 'GET',
    path: '/api/applications/imageForm/meta',
    handler: async function (request, h) {
      const scheme = {
        '$id': 'https://example.com/geographical-location.schema.json',
        '$schema': 'https://json-schema.org/draft/2020-12/schema',
        'title': 'Profile config',
        'type': 'object',
        'properties': imageFormFields
      };

      return scheme;
    },
    options: {
      auth: {
        mode: 'required'
      }
    }
  },
];
