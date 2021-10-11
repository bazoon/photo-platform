const omit = require('lodash/fp/omit');
const map = require('lodash/fp/map');


module.exports = [
  {
    method: 'GET',
    path: '/api/admin/users/meta',
    handler: async function (request, h) {
      const fieldsSchema = {
        'definitions': {},
        '$schema': 'http://json-schema.org/draft-07/schema#', 
        '$id': 'https://example.com/object1633959700.json', 
        'title': 'Root', 
        'type': 'object',
        'required': [
          'id',
          'firstName',
          'lastName',
          'nickName',
          'psw',
          'salt',
          'avatar',
          'email',
          'phone',
          'userType',
          'emailState',
          'emailCode',
          'biography',
          'awards',
          'dateCreate',
          'rowState',
          'firstDomainRegistration'
        ],
        'properties': {
          'id': {
            '$id': '#root/id', 
            'title': 'Id', 
            'type': 'integer',
            'default': 0
          },
          'firstName': {
            '$id': '#root/first_name', 
            'title': 'firstFame', 
            'type': 'string',
            'default': '',
            'pattern': '^.*$'
          },
          'lastName': {
            '$id': '#root/last_name', 
            'title': 'lastName', 
            'type': 'string',
            'default': '',
            'pattern': '^.*$'
          },
          'nickName': {
            '$id': '#root/nick_name', 
            'title': 'nickName', 
            'type': 'string',
            'default': '',
            'pattern': '^.*$'
          },
          'psw': {
            '$id': '#root/psw', 
            'title': 'Psw', 
            'type': 'string',
            'default': '',
            'pattern': '^.*$'
          },
          'salt': {
            '$id': '#root/salt', 
            'title': 'Salt', 
            'type': 'string',
            'default': '',
            'pattern': '^.*$'
          },
          'avatar': {
            '$id': '#root/avatar', 
            'title': 'Avatar', 
            'type': 'string',
            'default': '',
            'pattern': '^.*$'
          },
          'email': {
            '$id': '#root/email', 
            'title': 'Email', 
            'type': 'string',
            'default': '',
            'pattern': '^.*$'
          },
          'phone': {
            '$id': '#root/phone', 
            'title': 'Phone', 
            'type': 'string',
            'default': '',
            'pattern': '^.*$'
          },
          'userType': {
            '$id': '#root/user_type', 
            'title': 'User_type', 
            'type': 'integer',
            'default': 0
          },
          'emailState': {
            '$id': '#root/email_state', 
            'title': 'Email_state', 
            'type': 'integer',
            'default': 0
          },
          'emailCode': {
            '$id': '#root/email_code', 
            'title': 'Email_code', 
            'type': 'null',
            'default': null
          },
          'biography': {
            '$id': '#root/biography', 
            'title': 'Biography', 
            'type': 'string',
            'default': '',
            'pattern': '^.*$'
          },
          'awards': {
            '$id': '#root/awards', 
            'title': 'Awards', 
            'type': 'string',
            'default': '',
            'pattern': '^.*$'
          },
          'dateCreate': {
            '$id': '#root/date_create', 
            'title': 'Date_create', 
            'type': 'string',
            'default': '',
            'pattern': '^.*$'
          },
          'rowState': {
            '$id': '#root/row_state', 
            'title': 'Row_state', 
            'type': 'integer',
            'default': 0
          },
          'firstDomainRegistration': {
            '$id': '#root/first_domain_registration', 
            'title': 'firstDomainRegistration', 
            'type': 'string',
            'default': '',
            'pattern': '^.*$'
          }
        }
}





      return {
        fieldsSchema,
        columnsSchema: fieldsSchema
      };

    },
    options: {
      auth: {
        mode: 'required'
      }
    }
  },
];
