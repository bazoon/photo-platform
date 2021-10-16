const flatten = require('ramda/src/flatten');
const {compose, nth, split, get} = require('lodash/fp');
const fs = require('fs');
const path = require('path');

const imgRoute = {
  method: 'GET',
  path: '/uploads/{param*}',
  handler: {
    directory: {
      path: './uploads',
      listing: true
    }
  },
  options: {
    auth: {
      mode: 'optional'
    }
  }
};


const publicRoute = {
  method: 'GET',
  path: '/images/{param*}',
  handler: {
    directory: {
      path: './react-client/public'
    }
  },
  options: {
    auth: {
      mode: 'optional'
    }
  }
};


const indexRoute = {
    method: 'GET',
    path: '/good-index',
    handler: async function (request, h) {
      const userId = get('request.auth.credentials.id', h) || -1;
      const domain = request.headers.host || request.info.host;
      const lang = 'ru';

      if (!domain) {
        return {};
      }

      const query = `
        SELECT
        contests.id AS contest_id,
        contest_abouts.name,
        date_start,
        date_stop,
        salones.name salone,
        sa.name AS saloneName,
        contest_abouts. "name",
        phone_tech,
        email_pub,
        sa.name AS salone_name,
        rc.id as reg_id
      FROM
        contest_abouts
        JOIN languages l ON contest_abouts.language_id = l.id and l.short=:lang
        LEFT JOIN contests ON contests.id = contest_abouts.contest_id
        LEFT JOIN salones ON contests.salone_id = salones.id and salones."domain"=:domain
        LEFT JOIN salone_abouts AS sa ON sa.salone_id = salones.id AND sa.language_id = l.id
        LEFT JOIN organizers AS o on salones.organizer_id=o.id
        LEFT JOIN registration_contests as rc on rc.user_id=1 and rc.contest_id=contests.id and rc.user_id=:userId
        ORDER BY
          date_start DESC
      `;

      const info = await h.query(query, {
        replacements: {
          lang,
          domain,
          userId
        }
      });

      const r = get('[0]', info);
      const html = fs.readFileSync(path.resolve('./react-client/build/index.html'), 'utf8').replace('__OG_TITLE__', r.saloneName);
      return html;
    },
    options: {
      auth: {
        mode: 'optional'
      }
    }
  };

module.exports = flatten([
  indexRoute,
  imgRoute,
  publicRoute,
  require('./hapi_server/routes/public/translation'),
  require('./hapi_server/routes/login'),
  require('./hapi_server/routes/public/staticMenu'),
  require('./hapi_server/routes/public/thesis'),
  require('./hapi_server/routes/admin/users'),
  require('./hapi_server/routes/admin/userTypes'),
  require('./hapi_server/routes/public/roles'),
  require('./hapi_server/routes/admin/admins'),
  require('./hapi_server/routes/admin/organizers'),
  require('./hapi_server/routes/admin/meta/organizers'),
  require('./hapi_server/routes/admin/meta/languages'),
  require('./hapi_server/routes/admin/meta/admins'),
  require('./hapi_server/routes/admin/meta/users'),
  require('./hapi_server/routes/admin/languages'),
  require('./hapi_server/routes/admin/lexicons'),
  require('./hapi_server/routes/admin/meta/lexicons'),
  require('./hapi_server/routes/admin/meta/awardTypes'),
  require('./hapi_server/routes/admin/awardTypes'),
  require('./hapi_server/routes/admin/phrases'),
  require('./hapi_server/routes/admin/meta/phrases'),
  require('./hapi_server/routes/admin/meta/salones'),
  require('./hapi_server/routes/admin/salones'),
  require('./hapi_server/routes/admin/meta/contests'),
  require('./hapi_server/routes/admin/contests'),
  require('./hapi_server/routes/admin/meta/contestsAbout'),
  require('./hapi_server/routes/admin/meta/applications'),
  require('./hapi_server/routes/admin/applications'),
  require('./hapi_server/routes/admin/contestAbouts'),
  require('./hapi_server/routes/upload'),
  require('./hapi_server/routes/admin/results'),
  require('./hapi_server/routes/admin/meta/results'),
  require('./hapi_server/routes/admin/contestSections'),
  require('./hapi_server/routes/admin/contestPhotos'),
  require('./hapi_server/routes/admin/meta/contestPhotos'),
  require('./hapi_server/routes/admin/meta/jury'),
  require('./hapi_server/routes/admin/jury'),
  require('./hapi_server/routes/admin/meta/nominations'),
  require('./hapi_server/routes/admin/nominations'),
  require('./hapi_server/routes/admin/meta/nominationSections'),
  require('./hapi_server/routes/admin/nominationSections'),
  require('./hapi_server/routes/public/applications'),
  require('./hapi_server/routes/public/sections'),
  require('./hapi_server/routes/public/photoworks'),
  require('./hapi_server/routes/admin/config'),
  require('./hapi_server/routes/public/mainPage'),
  require('./hapi_server/routes/public/profile'),
  require('./hapi_server/routes/public/meta/profile'),
  require('./hapi_server/routes/public/apply'),
  require('./hapi_server/routes/public/meta/signupForm'),
  require('./hapi_server/routes/public/salones'),
  require('./hapi_server/routes/admin/settings'),
  require('./hapi_server/routes/admin/meta/settings'),
  require('./hapi_server/routes/admin/saloneSettings'),
  require('./hapi_server/routes/admin/meta/saloneSettings'),
  require('./hapi_server/routes/admin/moder'),
]);
