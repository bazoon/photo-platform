
const imageFormFields = [
  // {
  //   name: 'id',
  //   hidden: true,
  // },
  {
    name: 'name',
    title: 'наименование',
    type: 'string'
  },
  {
    name: 'description',
    title: 'описание',
    type: 'string'
  },
  {
    name: 'year',
    title: 'год съемки',
    type: 'string'
  },
  {
    name: 'place',
    title: 'место съемки',
    type: 'string'
  }
];



module.exports = [
  {
    method: 'gET',
    path: '/api/admin/applications/meta',
    handler: async function (request, h) {
      const {id} = request.query;
      const users = await h.query('select CONCAT("first_name", \' \', "last_name") as label, id as value from users');
      const contest = await h.models.Contest.findOne({where:{ id }})

      const regStates = [
        'подана',
        'принята',
        'ожидает оплаты',
        'отклонена по неуплате',
        'отклонена по другой причине',
        'регистрация приостановлена',
        'бан'
      ];

      const payment = [
        'не оплачена',
        'частичная оплата',
        'оплачена',
      ];

      const fieldsSchema = {
        'definitions': {},
        '$schema': 'http://json-schema.org/draft-07/schema#', 
        '$id': 'https://example.com/object1634052471.json', 
        'title': 'root', 
        'type': 'object',
        'required': [
          'id',
          'userId',
          'contestId',
          'dateReg',
          'sectionCount',
          'regState',
          'rejectionReason',
          'payment',
          'maxCountImg'
        ],
        'properties': {
          'id': {
            '$id': '#root/id', 
            'title': 'id', 
            'type': 'integer',
            'examples': [
              105
            ],
            'default': 0
          },
          'dateReg': {
            '$id': '#root/dateReg', 
            'title': 'dateReg', 
            'type': 'date',
            'default': '',
            'examples': [
              '2021-09-28'
            ],
            'pattern': '^.*$'
          },
          'sectionCount': {
            '$id': '#root/sectionCount', 
            'title': 'sectionCount', 
            'type': 'integer',
            'examples': [
              4
            ],
            'default': 0,
            max: contest.sectionCount
          },
          'regState': {
            '$id': '#root/regState', 
            'title': 'regState', 
            'type': 'array',
            items: {
              type: 'object',
              enum: regStates.map((name, id) => ({ value: id, label: name }))
            }
          },
          'rejectionReason': {
            '$id': '#root/rejectionReason', 
            'title': 'rejectionReason', 
            'type': 'string',
            'default': '',
            'examples': [
              'some'
            ],
            'pattern': '^.*$'
          },
          'payment': {
            '$id': '#root/payment', 
            'title': 'payment', 
            'type': 'array',
            items: {
              type: 'object',
              enum: payment.map((name, id) => ({ value: id, label: name }))
            }
          },
          'maxCountImg': {
            '$id': '#root/maxCountImg', 
            'title': 'maxCountImg', 
            'type': 'integer',
            'examples': [
              0
            ],
            'default': 0,
            max: contest.maxCountImg
          }
        }
      };

      const columnsSchema = {
        'definitions': {},
        '$schema': 'http://json-schema.org/draft-07/schema#', 
        '$id': 'https://example.com/object1634052471.json', 
        'title': 'root', 
        'type': 'object',
        'required': [
          'id',
          'userId',
          'contestId',
          'dateReg',
          'sectionCount',
          'regState',
          'rejectionReason',
          'payment',
          'maxCountImg'
        ],
        'properties': {
          'id': {
            '$id': '#root/id', 
            'title': 'id', 
            'type': 'integer',
            'examples': [
              105
            ],
            'default': 0
          },
          'userName': {
            '$id': '#root/userName', 
            'title': 'userName', 
            'type': 'string',
          },
          'dateReg': {
            '$id': '#root/dateReg', 
            'title': 'dateReg', 
            'type': 'string',
            'default': '',
            'examples': [
              '2021-09-28'
            ],
            'pattern': '^.*$'
          },
          'sectionCount': {
            '$id': '#root/sectionCount', 
            'title': 'sectionCount', 
            'type': 'integer',
            'examples': [
              4
            ],
            'default': 0,
            max: contest.sectionCount
          },
          'regState': {
            '$id': '#root/regState', 
            'title': 'regState', 
            'type': 'array',
            items: {
              type: 'object',
              enum: regStates.map((name, id) => ({ value: id, label: name }))
            }
          },
          'regStateString': {
            '$id': '#root/regState', 
            'title': 'regState', 
            'type': 'string',
          },
          'rejectionReason': {
            '$id': '#root/rejectionReason', 
            'title': 'rejectionReason', 
            'type': 'string',
            'pattern': '^.*$'
          },
          'payment': {
            '$id': '#root/payment', 
            'title': 'payment', 
            'type': 'array',
            items: {
              type: 'object',
              enum: payment.map((name, id) => ({ value: id, label: name }))
            }
          },
          'maxCountImg': {
            '$id': '#root/maxCountImg', 
            'title': 'maxCountImg', 
            'type': 'integer',
            'examples': [
              0
            ],
            'default': 0,
            max: contest.maxCountImg
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
  {
    method: 'gET',
    path: '/api/applications/imageForm/meta',
    handler: async function (request, h) {
      const scheme = {
        '$id': 'https://example.com/geographical-location.schema.json',
        '$schema': 'https://json-schema.org/draft/2020-12/schema',
        'title': 'profile config',
        'type': 'object',
        'properties': imageFormFields,
        required: ['name', 'filename']
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
