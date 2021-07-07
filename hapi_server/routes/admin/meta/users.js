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
          width: 200

        },
        {
          title: 'lastName',
          dataIndex: 'lastName',
          key: 'lastName',
          width: 200
        },
        {
          title: 'nickName',
          dataIndex: 'nickName',
          key: 'nickName',
          width: 200
        },
        {
          title: 'email',
          dataIndex: 'email',
          key: 'email',
          width: 200
        },
        {
          title: 'phone',
          dataIndex: 'phone',
          key: 'phone',
          width: 200
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
          ],
          width: 200
        },
        {
          title: 'emailState',
          dataIndex: 'emailState',
          key: 'emailState',
          width: 200
        },
        {
          title: 'emailCode',
          dataIndex: 'emailCode',
          key: 'emailCode',
          width: 200
        },
        {
          title: 'biography',
          dataIndex: 'biography',
          key: 'biography',
          width: 200
        },
        {
          title: 'awards',
          dataIndex: 'awards',
          key: 'awards',
          width: 200
        },
        {
          title: 'rowState',
          dataIndex: 'rowState',
          key: 'rowState',
          width: 200
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
