const uploadFiles = require('../utils/uploadFiles');
const getUploadFilePath = require('../utils/getUploadPath');
const getHash = require('../utils/getHash');

const {get, split, nth, compose, keys, groupBy} = require('lodash/fp');
const {getCurrentDomain} = require('../utils/getCurrentDomain');
const {getCurrentContestIdFromRequest} = require('../utils/getCurrentSalone');

module.exports = [
  {
    method: 'GET',
    path: '/api/photoworks',
    handler: async function (request, h) {
      const userId = get('request.auth.credentials.id', h);
      if (!userId) return [];

      const domain = getCurrentDomain(request);
      const contestId = await getCurrentContestIdFromRequest(request);
      
      if (!domain) {
        return {error: `domain ${domain} not found`};
      }

      const applicationQuery = `
        SELECT
          photoworks.id,
          photoworks.name,
          photoworks.filename,
          photoworks.tcontent as description,
          section_id,
          sections.name as section_name,
          year_shot as year,
          locate_shot as place
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

      return Promise.all(photoworks.map(async p => ({...p, src: await getUploadFilePath({name: p.filename, request, contestId})})));
    },
    options: {
      tags: ['api'],
      auth: {
        mode: 'optional'
      }
    }
  },
  {
    method: 'DELETE',
    path: '/api/photoworks',
    handler: async function (request, h) {
      const {payload} = request;
      const ids = payload.split(',');

      const userId = get('request.auth.credentials.id', h);
      if (!userId) return [];
      
      await h.models.Photowork.destroy({ where: {id: ids}});
      return {};
    },
    options: {
      tags: ['api'],
      auth: {
        mode: 'required'
      }
    }
  },
  {
    method: 'DELETE',
    path: '/api/photoworks/{id}',
    handler: async function (request, h) {
      const userId = get('request.auth.credentials.id', h);
      if (!userId) return [];

      const id = request.params.id;
      await h.models.Photowork.destroy({ where: {id}})
      return {};
    },
    options: {
      tags: ['api'],
      auth: {
        mode: 'required'
      }
    }
  }
];

