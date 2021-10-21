const Router = require('koa-router');
const router = new Router();
const models = require('../../../models');
const R = require('ramda');
const {pick} = require('lodash/fp');

const expiresIn = 24 * 60 * 60 * 30;
// const fields = [
//   'id',
//   'languageId',
//   'name',
//   'emailSys',
//   'emailPub',
//   'addressLine1',
//   'addressLine2',
//   'www',
//   'phone',
//   'phoneTech',
//   'officer',
//   'logo',
//   'virtual',
//   'smtp',
//   'smtpPassword',
//   'smtpUsePub',
//   'createdA',
//   'rowState',
//   'dateStatus'
// ];

// router.get('/', async ctx => {
// });

// router.put('/:id', async ctx => {
//   const { id } = ctx.params;
//   const organizerValues = R.pick(fields, ctx.request.body);
//   organizerValues.dateStatus = organizerValues.dateStatus || new Date();

//   const organizer = await models.Organizer.findOne({
//     where: {
//       id
//     }
//   });

//   await organizer.update(organizerValues);

//   const language = await models.Language.findOne({
//     where: {
//       id: organizer.languageId
//     }
//   });

//   ctx.body = {
//     ...R.pick(fields, organizer),
//     language: language.name
//   };
// });

// router.post('/', async ctx => {
//   const organizerValues = R.pick(fields, ctx.request.body);
//   delete organizerValues.id;
//   organizerValues.dateStatus = organizerValues.dateStatus || new Date();

//   const organizer = await models.Organizer.create(organizerValues);

//   const language = await models.Language.findOne({
//     where: {
//       id: organizer.languageId
//     }
//   });

//   ctx.body = {
//     ...R.pick(fields, organizer),
//     language: language.name
//   };
// });


// module.exports =  {
//   method: 'GET',
//   path: '/api/admin/organizers',
//   handler: async function (request, h) {
//     const query = `select organizers.id,languages.id as language_id, languages.name as language, organizers.name, email_sys, email_pub,
//     address_line1, address_line2, www, phone, phone_tech,officer,logo,virtual,
//     smtp,smtp_use_pub,date_status from organizers, languages where organizers.language_id=languages.id
//   `;

//     const [organizers] = await models.sequelize.query(query);

//     return organizers.map(o => {
//       return {
//         id: o.id,
//         languageId: o.language_id,
//         language: o.language,
//         name: o.name,
//         emailSys: o.email_sys,
//         emailPub: o.emaul_pub,
//         addressLine1: o.address_line1,
//         addressLine2: o.address_line2,
//         www: o.www,
//         phone: o.phone,
//         phoneTech: o.phone_tech,
//         officer: o.officer,
//         logo: o.logo,
//         virtual: o.virtual,
//         smtp: o.smtp,
//         smtpPassword: '',
//         smtpUsePub: o.smtp_use_pub,
//         createdAt: o.date_create,
//         rowState: o.row_state,
//         dateStatus: o.date_status
//       };
//     });
//   },
//   options: {
//     auth: {
//       mode: 'required'
//     },
//   }
// };

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

