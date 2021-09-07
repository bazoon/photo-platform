module.exports = [
  {
    method: 'GET',
    path: '/api/admin/organizers/meta',
    handler: async function (request, h) {
      const columns = [
        { 
          title: 'name',
          dataIndex: 'name',
          key: 'name',
          width: 200
        },
        { 
          title: 'emailSys',
          dataIndex: 'emailSys',
          key: 'emailSys',
          width: 200
        },
        {
          title: 'emailPub',
          dataIndex: 'emailPub',
          key: 'emailPub',
          width: 200
        },
        {
          title: 'addressLine1',
          dataIndex: 'addressLine1',
          key: 'addressLine1',
          width: 200
        },
        {
          title: 'addressLine2',
          dataIndex: 'addressLine2',
          key: 'addressLine2',
          width: 200
        },
        {
          title: 'www',
          dataIndex: 'www',
          key: 'www',
          width: 200
        },
        {
          title: 'phone',
          dataIndex: 'phone',
          key: 'phone',
          width: 200
        },
        {
          title: 'phoneTech',
          dataIndex: 'phoneTech',
          key: 'phoneTech',
          width: 200
        },
        {
          title: 'officer',
          dataIndex: 'officer',
          key: 'officer',
          width: 200
        },
        {
          title: 'logo',
          dataIndex: 'logo',
          key: 'logo',
          width: 200
        },
        {
          title: 'virtual',
          dataIndex: 'virtual',
          key: 'virtual',
          width: 200
        },
        {
          title: 'smtp',
          dataIndex: 'smtp',
          key: 'smtp',
          width: 200
        },
        {
          title: 'smtpPsw',
          dataIndex: 'smtpPsw',
          key: 'smtpPsw',
          width: 200
        },
        {
          title: 'stmpUser',
          dataIndex: 'stmpUser',
          key: 'stmpUser',
          width: 200
        },
        {
          title: 'smtpUsePub',
          dataIndex: 'smtpUsePub',
          key: 'smtpUsePub',
          width: 200
        },
        {
          title: 'dateCreate',
          dataIndex: 'dateCreate',
          key: 'dateCreate',
          width: 200
        },
        {
          title: 'rowState',
          dataIndex: 'rowState',
          key: 'rowState',
          width: 200
        },
        {
          title: 'dateStatus',
          dataIndex: 'dateStatus',
          key: 'dateStatus',
          width: 200
        },
      ];
      return {
        columns,
        fields: columns
      };
    },
    options: {
      auth: {
        mode: 'required'
      }
    }
  },
];
