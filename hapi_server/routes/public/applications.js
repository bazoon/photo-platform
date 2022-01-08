const uploadFiles = require('../utils/uploadFiles');
const getUploadFilePath = require('../utils/getUploadPath');
const getHash = require('../utils/getHash');

const {get, split, nth, compose, keys} = require('lodash/fp');
const {getCurrentDomain} = require('../utils/getCurrentDomain');
const {getCurrentContestIdFromRequest, getCurrentContestFromRequest} = require('../utils/getCurrentSalone');

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
    path: '/api/applications/can',
    handler: async function (request, h) {
      const userId = get('request.auth.credentials.id', h);
      if (!userId) return [];

      const domain = getCurrentDomain(request);

      if (!domain) {
        return {};
      }

      const contest = await getCurrentContestFromRequest(request);
      return (new Date(contest.dateStop)) > (new Date())
    },
    options: {
      tags: ['api'],
      auth: {
        mode: 'required'
      }
    }
  },
  {
    method: 'GET',
    path: '/api/applications',
    handler: async function (request, h) {
      const userId = get('request.auth.credentials.id', h);
      if (!userId) return [];

      const contestId = await getCurrentContestIdFromRequest(request);

      const applicationQuery = `
        SELECT
          registration_contests.reg_state,
          registration_contests.id,
          registration_contests.date_reg,
          registration_contests.max_count_img,
          contests.max_count_img as contest_max_count_img,
          registration_contests.section_count,
          rejection_reason, 
          payment
        FROM
          contests,
          registration_contests
        WHERE
          contests.id = :contestId
          AND registration_contests.user_id=:userId
          and registration_contests.contest_id=:contestId
      `;

      const applications = await h.query(applicationQuery, {
        replacements: {
          userId,
          contestId
        }
      });
      console.log(applications, 111)
      return applications && applications[0] || {};
    },
    options: {
      tags: ['api'],
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
      const domain = getCurrentDomain(request);
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
        await uploadFiles(files, request);
        
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
      tags: ['api'],
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

