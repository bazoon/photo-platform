module.exports = [
  {
    method: 'GET',
    path: '/api/admin/saloneSettings/meta',
    handler: async function (_, h) {
      const settings = await h.models.Setting.findAll();
      const salones = await h.models.Salone.findAll();

      const fields = [
        {
          name: 'id',
          hidden: true,
        },
        {
          name: 'settingId',
          title: 'Настройка',
          options: settings.map(({code, id}) => ({value: id, dataIndex: id, label: code }))
        },
        {
          name: 'saloneId',
          title: 'Салон',
          options: salones.map(({name, id}) => ({value: id, dataIndex: id, label: name }))
        },
        {
          name: 'content',
          title: 'Значение',
          type: 'string'
        },
        {
          name: 'keycheck',
          title: 'keycheck',
          type: 'boolean'
        }
      ];

      const columns = [
        {
          name: 'id',
          hidden: true,
        },
        {
          name: 'setting',
          title: 'Настройка',
        },
        {
          name: 'salone',
          title: 'Салон',
        },
        {
          name: 'content',
          title: 'Значение',
          type: 'string'
        },
        {
          name: 'keycheck',
          title: 'keycheck',
          type: 'boolean'
        }
      ];

      const scheme = {
        '$id': 'https://example.com/geographical-location.schema.json',
        '$schema': 'https://json-schema.org/draft/2020-12/schema',
        'title': 'Profile config',
        'type': 'object',
        definitions: {
          fields: {
            type: 'object',
            enum: fields
          },
          columns: {
            type: 'object',
            enum: columns
          }
        },
        'properties': {
          fields: {
            type: 'object',
            enum: fields
          },
          columns: {
            type: 'object',
            enum: columns
          }
        },
        required: ['settingId', 'saloneId']
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

