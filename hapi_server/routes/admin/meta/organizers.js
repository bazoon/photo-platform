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
          title: 'email_sys',
          dataIndex: 'email_sys',
          key: 'email_sys',
          width: 200
        },
        {
          title: 'email_pub',
          dataIndex: 'email_pub',
          key: 'email_pub',
          width: 200
        },
        {
          title: 'address_line1',
          dataIndex: 'address_line1',
          key: 'address_line1',
          width: 200
        },
        {
          title: 'address_line2',
          dataIndex: 'address_line2',
          key: 'address_line2',
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
          title: 'phone_tech',
          dataIndex: 'phone_tech',
          key: 'phone_tech',
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
          title: 'smtp_psw',
          dataIndex: 'smtp_psw',
          key: 'smtp_psw',
          width: 200
        },
        {
          title: 'smtp_user',
          dataIndex: 'smtp_user',
          key: 'smtp_user',
          width: 200
        },
        {
          title: 'smtp_use_pub',
          dataIndex: 'smtp_use_pub',
          key: 'smtp_use_pub',
          width: 200
        },
        {
          title: 'date_create',
          dataIndex: 'date_create',
          key: 'date_create',
          width: 200
        },
        {
          title: 'row_state',
          dataIndex: 'row_state',
          key: 'row_state',
          width: 200
        },
        {
          title: 'date_status',
          dataIndex: 'date_status',
          key: 'date_status',
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
