const flatten = require('ramda/src/flatten');
const {compose, nth, split, get} = require('lodash/fp');
const fs = require('fs');
const path = require('path');
const {getCurrentSaloneFromRequest} = require('./hapi_server/routes/utils/getCurrentSalone')

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
    path: '/api/index',
    handler: async function (request, h) {
      const salone = await getCurrentSaloneFromRequest(request);
      const query = `
        select salon_settings.content from salon_settings, settings
        where salon_settings.setting_id=settings.id and code='yandex_metrika' and salon_settings.salone_id=:saloneId
      `;

      const [{content}] = await h.query(query, {
        replacements: {
          saloneId: salone.id
        }
      });

      const yaCode = `
        <script type="text/javascript" >
           (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
           m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
           (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

           ym("${content}", "init", {
            clickmap:true,
            trackLinks:true,
            accurateTrackBounce:true
           });
        </script>
        <noscript><div><img src="https://mc.yandex.ru/watch/${content}" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
      `;

      const html = fs.readFileSync(path.resolve('./react-client/build/index.html'), 'utf8')
        .replace('__TITLE__', salone.name)
        .replace('__YA__METRICA__', yaCode);

      return html;
    },
    options: {
      auth: {
        mode: 'optional'
      }
    }
  };


const defaultRoute = {
    method: '*',
    path: '/{any*}',
    handler: async function (request, h) {
      const salone = await getCurrentSaloneFromRequest(request);
      const html = fs.readFileSync(path.resolve('./react-client/build/index.html'), 'utf8').replace('__TITLE__', salone.name);
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
  require('./hapi_server/routes/public/jury'),
  require('./hapi_server/routes/admin/contestMenus.js'),
  require('./hapi_server/temp/notmagic'),
  defaultRoute
]);
