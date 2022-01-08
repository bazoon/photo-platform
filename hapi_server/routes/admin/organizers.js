const R = require('ramda');
const {pick} = require('lodash/fp');

const fields = [
  'addressLine1',
  'addressLine2',
  'dateStatus',
  'emailPub',
  'emailSys',
  'id',
  'language',
  'languageId',
  'logo',
  'name',
  'officer',
  'phone',
  'phoneTech',
  'phone_tech',
  'smtp',
  'smtpUsePub',
  'type',
  'virtual',
  'www'
];


module.exports = [
  {
    method: 'GET',
    path: '/api/admin/organizers',
    handler: async function (request, h) {
      const query = `select organizers.id,languages.id as language_id, languages.name as language, organizers.name, email_sys, email_pub,
      address_line1, address_line2, www, phone, phone_tech,officer,logo,virtual,
      smtp,smtp_use_pub,date_status from organizers, languages where organizers.language_id=languages.id
    `;
      return await h.query(query);
    },
    options: {
      tags: ['api'],
      auth: {
        mode: 'optional'
      }
    }
  },
  {
    method: 'PUT',
    path: '/api/admin/organizers/{id}',
    handler: async function (request, h) {
      const { id } = request.params;
      const rec = pick(fields, request.payload);
        
      const organizer = await h.models.Organizer.findOne({
        where: {
          id
        }
      });

      await organizer.update(rec);
      return organizer;
    },
    options: {
      tags: ['api'],
      auth: {
        mode: 'optional'
      }
    }
  },

];

