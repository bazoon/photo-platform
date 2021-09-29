

module.exports = [
  {
    method: 'GET',
    path: '/api/profile/meta',
    handler: async function (_, h) {
      const query = 'select *from countries order by short asc';
      const [countries] = await h.models.sequelize.query(query);

      const fields = [
        {
          name: 'id',
          hidden: true,
        },
        {
          name: 'firstName',
          title: 'Имя',
          type: 'string'
        },
        {
          name: 'lastName',
          title: 'Фамилия',
          type: 'string'
        },
        {
          name: 'birthday',
          title: 'Дата рождения',
          type: 'date'
        },
        {
          name: 'countryId',
          title: 'Страна',
          type: 'select',
          options: countries.map(c =>({key: c.id, label: c.name}))
        },
        {
          name: 'address',
          title: 'Адрес',
          type: 'string'
        },
        {
          name: 'postIndex',
          title: 'Почтовый индекс',
          type: 'string'
        },
        {
          name: 'biography',
          title: 'Биография',
          type: 'text'
        },
        {
          name: 'awards',
          title: 'Награды',
          type: 'string'
        },
        {
          name: 'memoField',
          title: 'Дополнительная информация',
          type: 'string'
        },
        {
          name: 'email',
          title: 'Почта',
          type: 'string'
        },
        {
          name: 'phone',
          title: 'Телефон',
          type: 'string'
        }
      ];

      const scheme = {
        '$id': 'https://example.com/geographical-location.schema.json',
        '$schema': 'https://json-schema.org/draft/2020-12/schema',
        'title': 'Profile config',
        'type': 'object',
        'properties': fields,
        required: ['firstName', 'lastName', 'countryId', 'address']
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

