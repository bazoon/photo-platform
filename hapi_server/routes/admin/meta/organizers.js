module.exports = [
  {
    method: 'gET',
    path: '/api/admin/organizers/meta',
    handler: async function (request, h) {
      const columnsSchema = {
        'definitions': {},
        '$schema': 'http://json-schema.org/draft-07/schema#', 
        '$id': 'https://example.com/object1633968532.json', 
        'title': 'root', 
        'type': 'object',
        'required': [
          'id',
          'languageId',
          'name',
          'emailSys',
          'emailPub',
          'addressLine1',
          'addressLine2',
          'www',
          'phone',
          'phoneTech',
          'officer',
          'logo',
          'virtual',
          'smtp',
          'smtpPsw',
          'smtpUser',
          'smtpUsePub',
          'dateCreate',
          'rowState',
          'dateStatus'
        ],
        'properties': {
          'id': {
            '$id': '#root/id', 
            'title': 'id', 
            'type': 'integer',
            'default': 0
          },
          'languageId': {
            '$id': '#root/languageId', 
            'title': 'languageId', 
            'type': 'integer',
            'default': 0
          },
          'name': {
            '$id': '#root/name', 
            'title': 'name', 
            'type': 'string',
            'default': '',
            'pattern': '^.*$'
          },
          'emailSys': {
            '$id': '#root/emailSys', 
            'title': 'emailSys', 
            'type': 'string',
            'default': '',
            'pattern': '^.*$'
          },
          'emailPub': {
            '$id': '#root/emailPub', 
            'title': 'emailPub', 
            'type': 'string',
            'default': '',
            'pattern': '^.*$'
          },
          'addressLine1': {
            '$id': '#root/addressLine1', 
            'title': 'addressLine1', 
            'type': 'string',
            'default': '',
            'pattern': '^.*$'
          },
          'addressLine2': {
            '$id': '#root/addressLine2', 
            'title': 'addressLine2', 
            'type': 'string',
            'default': '',
            'pattern': '^.*$'
          },
          'www': {
            '$id': '#root/www', 
            'title': 'www', 
            'type': 'string',
            'default': '',
            'pattern': '^.*$'
          },
          'phone': {
            '$id': '#root/phone', 
            'title': 'phone', 
            'type': 'string',
            'default': '',
            'pattern': '^.*$'
          },
          'phoneTech': {
            '$id': '#root/phoneTech', 
            'title': 'phoneTech', 
            'type': 'string',
            'default': '',
            'pattern': '^.*$'
          },
          'officer': {
            '$id': '#root/officer', 
            'title': 'officer', 
            'type': 'string',
            'default': '',
            'pattern': '^.*$'
          },
          'logo': {
            '$id': '#root/logo', 
            'title': 'logo', 
            'type': 'string',
            'default': '',
            'pattern': '^.*$'
          },
          'virtual': {
            '$id': '#root/virtual', 
            'title': 'virtual', 
            'type': 'integer',
            'default': 0
          },
          'smtp': {
            '$id': '#root/smtp', 
            'title': 'smtp', 
            'type': 'string',
            'default': '',
            'pattern': '^.*$'
          },
          'smtpPsw': {
            '$id': '#root/smtpPsw', 
            'title': 'smtpPsw', 
            'type': 'string',
            'default': '',
            'pattern': '^.*$'
          },
          'smtpUser': {
            '$id': '#root/smtpUser', 
            'title': 'smtpUser', 
            'type': 'string',
            'default': '',
            'pattern': '^.*$'
          },
          'smtpUsePub': {
            '$id': '#root/smtpUsePub', 
            'title': 'smtpUsePub', 
            'type': 'integer',
            'default': 0
          },
          'dateCreate': {
            '$id': '#root/dateCreate', 
            'title': 'dateCreate', 
            'type': 'string',
            'default': '',
            'pattern': '^.*$'
          },
          'rowState': {
            '$id': '#root/rowState', 
            'title': 'rowState', 
            'type': 'integer',
            'default': 0
          },
          'dateStatus': {
            '$id': '#root/dateStatus', 
            'title': 'dateStatus', 
            'type': 'string',
            'default': '',
            'pattern': '^.*$'
          }
        }
      }

      return {
        fieldsSchema: columnsSchema,
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
