const uploadFiles = require('../utils/uploadFiles');
const {get, split, nth, compose} = require('lodash/fp');
const {getCurrentDomain} = require('../utils/getCurrentDomain');
const {getCurrentContestIdFromRequest} = require('../utils/getCurrentSalone');

module.exports = [
  {
    method: 'POST',
    path: '/api/apply',
    handler: async function (request, h) {
      const userId = get('request.auth.credentials.id', h);
      if (!userId) return [];

      const domain = getCurrentDomain(request);

      if (!domain) {
        return {};
      }

      const {sections} = request.payload;

      const contestId = await getCurrentContestIdFromRequest(request);
      const registrationContest = await h.models.RegistrationContest.create({userId, contestId, sectionCount: sections.length, regState: 0 });
      return registrationContest;
    },
    options: {
      tags: ['api'],
      auth: {
        mode: 'required'
      }
    }
  },
];

