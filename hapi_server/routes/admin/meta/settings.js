module.exports = [
  {
    method: 'GET',
    path: '/api/admin/settings/meta',
    handler: async function (_, h) {
      const fields = [
        {
          name: 'id',
          hidden: true,
        },
        {
          name: 'code',
          title: 'Код',
          type: 'string'
        },
        {
          name: 'levelable',
          title: 'Уровень доступа',
          type: 'number'
        },
        {
          name: 'enable',
          title: 'Активна',
          type: 'boolean'
        },
        {
          name: 'typeSet',
          title: 'Тип',
          options: ['string', 'check', 'list', 'json', 'file', 'fileName', 'fileNameList'].map(c =>({value: c, label: c}))
        }
      ];

      const scheme = {
        '$id': 'https://example.com/geographical-location.schema.json',
        '$schema': 'https://json-schema.org/draft/2020-12/schema',
        'title': 'Profile config',
        'type': 'object',
        'properties': fields,
        required: ['firstName', 'lastName', 'countryId', 'address', 'birthday']
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

