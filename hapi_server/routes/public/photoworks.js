const uploadFiles = require('../utils/uploadFiles');
const getUploadFilePath = require('../utils/getUploadPath');
const getHash = require('../utils/getHash');

const {get, split, nth, compose, keys, groupBy} = require('lodash/fp');

module.exports = [
  {
    method: 'GET',
    path: '/api/photoworks',
    handler: async function (request, h) {
      const userId = get('request.auth.credentials.id', h);
      if (!userId) return [];

      const domain = request.info.referrer.includes('foto.ru') ? 'foto.ru' : compose(nth(2), split('/'))(request.info.referrer);

      if (!domain) {
        return {};
      }

      const applicationQuery = `
        SELECT
          photoworks.name,
          photoworks.filename,
          section_id,
          sections.name as section_name
        FROM
          photoworks,
          registration_contests,
          sections
        WHERE
          photoworks.registration_contest_id = registration_contests.id
          AND photoworks.section_id = sections.id
          AND sections.contest_id = registration_contests.contest_id
          AND user_id = :userId
          and registration_contests.contest_id = (
            SELECT
              contests.id
            FROM
              contests,
              salones
            where
              salones.id = contests.salone_id
              and salones.domain = :domain
            ORDER BY
              date_start DESC
            LIMIT
              1
          )
      `;

      const photoworks = await h.query(applicationQuery, {
        replacements: {
          userId,
          domain
        }
      });
      return photoworks.map(p => ({...p, src: getUploadFilePath(p.filename)}));
    },
    options: {
      auth: {
        mode: 'optional'
      }
    }
  }
];

