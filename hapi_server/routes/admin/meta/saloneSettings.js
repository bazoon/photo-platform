module.exports = [
  {
    method: 'GET',
    path: '/api/admin/saloneSettings/meta',
    handler: async function (_, h) {
      const settings = await h.query('select code as label, id as value from settings');
      const salones = await h.query('select id as value, name as label from salones');

      const fieldsSchema = {
        'definitions': {},
        '$schema': 'http://json-schema.org/draft-07/schema#', 
        '$id': 'https://example.com/object1633844187.json', 
        'title': 'Root', 
        'type': 'array',
        'default': [],
        'required': [],
        'properties': {
          'id': {
            '$id': '#root/items/id', 
            'title': 'Id', 
            'type': 'integer',
            'examples': [
              1
            ],
            'default': 0
          },
          'settingId': {
            '$id': '#root/items/setting_id', 
            'title': 'SettingId', 
            'type': 'array',
            items: {
              type: 'object',
              enum: settings
            }
          },
          'saloneId': {
            '$id': '#root/items/salone_id', 
            'title': 'SaloneId', 
            'type': 'array',
            items: {
              type: 'object',
              enum: salones
            }
          },
          'content': {
            '$id': '#root/items/content', 
            'title': 'Content', 
            'type': 'memo',
            'default': '',
            'examples': [
              '33'
            ],
            'pattern': '^.*$'
          },
          'keycheck': {
            '$id': '#root/items/keycheck', 
            'title': 'Keycheck', 
            'type': 'boolean',
            'examples': [
              true
            ],
            'default': true
          }
        }
      }


      const columnsSchema = {
        'definitions': {},
        '$schema': 'http://json-schema.org/draft-07/schema#', 
        '$id': 'https://example.com/object1633844187.json', 
        'title': 'Root', 
        'type': 'array',
        'default': [],
        'properties': {
          'id': {
            '$id': '#root/items/id', 
            'title': 'Id', 
            'type': 'integer',
            'examples': [
              1
            ],
            'default': 0
          },
          'setting': {
            '$id': '#root/items/setting', 
            'title': 'Setting', 
            'type': 'string',
          },
          'salone': {
            '$id': '#root/items/salone', 
            'title': 'Salone', 
            'type': 'string',
          },
          'content': {
            '$id': '#root/items/content', 
            'title': 'Content', 
            'type': 'string',
            'default': '',
            'examples': [
              '33'
            ],
            'pattern': '^.*$'
          },
          'keycheck': {
            '$id': '#root/items/keycheck', 
            'title': 'Keycheck', 
            'type': 'boolean',
            'examples': [
              true
            ],
            'default': true
          }
        }
      }
      
      return {
        fieldsSchema,
        columnsSchema
      };
    },
    options: {
      auth: {
        mode: 'required'
      }
    }
  },
];

