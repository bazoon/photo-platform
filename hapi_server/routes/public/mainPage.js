const {get} = require('lodash/fp');
const {getCurrentContestIdFromRequest, getCurrentSlug} = require('../utils/getCurrentSalone');


module.exports = [
  {
    method: 'GET',
    path: '/api/mainPage/{lang}',
    handler: async function (request, h) {
      const contestId = await getCurrentContestIdFromRequest(request);
      const lang = request.params.lang || 'ru';

      if (!contestId) {
        return {};
      }

      const query = `
         SELECT
            c.id AS contest_id,
            ca.name,
            date_start,
            date_stop,
            s.name salone,
            sa.name AS salone,
            s.id as salone_id,
            ca."name",
            phone_tech,
            email_pub
          FROM
            contests as c, contest_abouts as ca, salones as s, salone_abouts as sa, organizers as o, languages as l
            where ca.contest_id=c.id and c.salone_id=s.id and s.organizer_id=o.id and  sa.salone_id=s.id and 
            ca.language_id=l.id and sa.language_id=l.id and l.short=:lang and inworknow and c.id=:contestId
      `;

      const logoQuery = `
        select content from salon_settings, settings where salon_settings.setting_id=settings.id and settings.code='contestLogoFileName' and salon_settings.salone_id=:saloneId
      `;

      const bgQuery = `
        select content from salon_settings, settings where salon_settings.setting_id=settings.id and settings.code='backGroundImages' salon_settings.salone_id=:saloneId
      `;

      const info = get('[0]', 
        await h.query(query, {
          replacements: {
            lang,
            contestId
          }
        })
      );

      console.log(info);
      const logo = get('[0].content', await h.query(logoQuery, {replacements: { saloneId: info.saloneId}}));
      const bg = get('[0].content', await h.query(bgQuery, {replacements: {saloneId: info.saloneId}}));
      const slug = await getCurrentSlug(request);
      const logoPath = slug && logo ? `/uploads/${slug}/${logo}` : '';
      const bgPath = slug && logo ? `/uploads/${slug}/${bg}` : '';

      return {...info || {}, logo: logoPath, bg: bgPath || ''};
    },
    options: {
      tags: ['api'],
      auth: {
        mode: 'optional'
      }
    }
  },
];

