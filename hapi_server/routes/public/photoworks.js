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

      const domain = request.info.referrer.includes('3000') ? 'foto.ru' : compose(nth(2), split('/'))(request.info.referrer);

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
          sections,
          contests
        WHERE
          photoworks.registration_contest_id = registration_contests.id
          AND photoworks.section_id = sections.id
          AND sections.contest_id = contests.id
          AND registration_contests.contest_id = contests.id
          AND user_id = :userId
      `;

      const photoworks = await h.query(applicationQuery, {
        replacements: {
          userId,
        }
      });

      return groupBy(e => e.sectionName, photoworks.map(p => ({...p, src: getUploadFilePath(p.filename)})));
    },
    options: {
      auth: {
        mode: 'optional'
      }
    }
  }
];

