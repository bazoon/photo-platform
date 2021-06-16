const omit = require('lodash/fp/omit');
const map = require('lodash/fp/map');


module.exports = [
  {
    method: 'GET',
    path: '/api/admin/users/meta',
    handler: async function (request, h) {
      const columns = [
        {
          title: 'firstName',
          dataIndex: 'firstName',
          key: 'firstName',
        },
        {
          title: 'lastName',
          dataIndex: 'lastName',
          key: 'lastName',
        },
        {
          title: 'nickName',
          dataIndex: 'nickName',
          key: 'nickName',
        },
        {
          title: 'email',
          dataIndex: 'email',
          key: 'email',
        },
        {
          title: 'phone',
          dataIndex: 'phone',
          key: 'phone',
        },
        {
          title: 'userType',
          dataIndex: 'userType',
          key: 'userType',
          options: [
            {
              key: 0,
              dataIndex: 0,
              label: 'admin'
            },
            {
              key: 1,
              dataIndex: 1,
              label: 'user'
            }
          ]
        },
        {
          title: 'emailState',
          dataIndex: 'emailState',
          key: 'emailState',
        },
        {
          title: 'emailCode',
          dataIndex: 'emailCode',
          key: 'emailCode',
        },
        {
          title: 'biography',
          dataIndex: 'biography',
          key: 'biography',
        },
        {
          title: 'awards',
          dataIndex: 'awards',
          key: 'awards',
        },
        {
          title: 'rowState',
          dataIndex: 'rowState',
          key: 'rowState'
        },
      ];

      return {
        columns,
        fields: map(omit('key'), columns)
      }
    },
    options: {
      auth: {
        mode: 'required'
      }
    }
  },
];
