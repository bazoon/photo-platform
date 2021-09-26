const uploadFiles = require('../utils/uploadFiles');
const getUploadFilePath = require('../utils/getUploadPath');
const getHash = require('../utils/getHash');

const {get, split, nth, compose, keys} = require('lodash/fp');

const fields = [
  'id',
  'saloneId',
  'subname',
  'years',
  'dateStart',
  'dateStop',
  'dateJuriEnd',
  'dateRateShow',
  'showType',
  'showRateState',
  'democraty',
  'payType',
  'sectionCount',
  'maxrate',
  'maxsize',
  'maxWeight'
];

module.exports = [
  {
    method: 'GET',
    path: '/api/applications',
    handler: async function (request, h) {
      const userId = get('request.auth.credentials.id', h);
      if (!userId) return [];

      const domain = request.info.referrer.includes('foto.ru') ? 'foto.ru' : compose(nth(2), split('/'))(request.info.referrer);

      if (!domain) {
        return {};
      }

      const applicationQuery = `
        SELECT
          registration_contests.reg_state,
          registration_contests.id,
          registration_contests.date_reg,
          registration_contests.max_count_img,
          contests.max_count_img as contest_max_count_img,
          registration_contests.section_count,
          payment
        FROM
          contests,
          salones,
          registration_contests
        WHERE
          contests.salone_id = salones.id
          AND salones. "domain" = :domain
          AND registration_contests.contest_id = contests.id
          AND registration_contests.user_id=:userId
          and registration_contests.contest_id = (select id from contests order by date_start desc limit 1 )
      `;

      const applications = await h.query(applicationQuery, {
        replacements: {
          userId,
          domain
        }
      });

      return applications && applications[0] || {};
    },
    options: {
      auth: {
        mode: 'required'
      }
    }
  },
  {
    method: 'POST',
    path: '/api/applications',
    handler: async function (request, h) {
      const userId = h.request.auth.credentials.id;
      const domain = request.info.referrer.includes('foto.ru') ? 'foto.ru' : compose(nth(2), split('/'))(request.info.referrer);
      const sectionIds = keys(request.payload);

      if (!domain) {
        return {};
      }

      const applicationQuery = `
        SELECT
          registration_contests.id
        FROM
          contests,
          salones,
          registration_contests
        WHERE
          contests.salone_id = salones.id
          AND salones."domain" = :domain
          AND registration_contests.contest_id = contests.id
          AND registration_contests.user_id=:userId
      `;

      const application = nth(0, await h.query(applicationQuery, {
        replacements: {
          userId,
          domain
        }
      }));

      sectionIds.forEach(async sectionId => {
        let files = request.payload[sectionId];
        files = Array.isArray(files) ? files : [files];
        await uploadFiles(files);
        
        await h.models.Photowork.bulkCreate(
          files.map(f => {
            return {
              registrationContestId: application.id,
              sectionId,
              name: f.filename,
              filename: f.filename,
              moder: 0
            };
          })
        );
      });

      return {};
    },
    options: {
      payload: {
        parse: true,
        output: 'file',
        allow: 'multipart/form-data',
        multipart: true
      },
      auth: {
        mode: 'required'
      }
    }
  },
];

