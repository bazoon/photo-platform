const stringField = title => ({ type: 'string', title })

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

const fieldsToProperties = fields => {
  return fields.reduce((a, e) => ({...a, [e]: stringField(e)}) , {});
}

module.exports = [
  {
    method: 'GET',
    path: '/api/profile/meta',
    handler: async function (request, h) {
      const scheme = {
        '$id': 'https://example.com/geographical-location.schema.json',
        '$schema': 'https://json-schema.org/draft/2020-12/schema',
        'title': 'Profile config',
        'type': 'object',
        'properties': fields
      };

      return scheme;
    },
    options: {
      auth: {
        mode: 'optional'
      }
    }
  },
];

