const startOfDay = require('date-fns/startOfDay');
var dayjs = require('dayjs');
const L = require('lodash/fp');
const {getCurrentDomain} = require('../utils/getCurrentDomain');
const {getCurrentContestIdFromRequest} = require('../utils/getCurrentSalone');
const {isDefined} = require('crocks');

const staticMenu = {
  method: 'GET',
  path: '/api/staticMenu',
  handler: async function (request, h) {
    const domain = getCurrentDomain(request);
    const query = `
      select distinct contest_menus.id, contest_menus.id as key, lexicon_id, position, parent_id, code as name, contest_menus.slug as to, domain from
      contests, salones, contest_menus, lexicons where contest_menus.lexicon_id=lexicons.id and
      contest_menus.contest_id=contests.id and contests.salone_id=salones.id and contests.id=:contestId
    `;

    const contestId = await getCurrentContestIdFromRequest(request);

    const contestMenus = isDefined(contestId) && await h.query(query, {replacements: { contestId }}) || [];
    const lookup = {};

    contestMenus.forEach(menu => {
      lookup[menu.id] = menu;
    });

    const menu = contestMenus.reduce((acc, menu) => {
      menu.items = menu.items || [];
      if (!menu.to) {
        delete menu.to;
      }

      if (menu.parentId && menu.parentId !== -1) {
        const parentMenu = lookup[menu.parentId];
        if (parentMenu) {
          parentMenu.items = parentMenu.items || [];
          parentMenu.items.push(menu);
        }
        return acc;
      }
      return acc.concat([menu]);
    }, []);


    if (domain === 'prirodacup.ru') {
      return [
        {
          name: 'photos',
          to: '/photos/sections'
        },
        {
          name: 'politics',
          to: '/politics'
        },
        {
          name: 'about-contest',
          items: [
            {
              name: 'hello',
              to: '/hello'
            },
            {
              name: 'organizers',
              to: '/organizers'
            },
            {
              name: 'thesis',
              to: '/thesis'
            },
            {
              name: 'rules',
              to: '/rules'
            },
            {
              name: 'jury',
              to: '/jury'
            }
          ]
        },
        {
          name: 'contacts',
          to: '/contacts'
        }

      ];
    } else if (domain === 'foto.ru') {

      return [
        {
          name: 'about-notmagic',
          to: '/about-notmagic'
        },
        {
          name: 'tech-notmagic',
          to: '/tech-notmagic'
        },
        {
          name: 'prizes-notmagic',
          to: '/prizes-notmagic'
        },
        {
          name: 'jury-notmagic',
          to: '/jury-notmagic'
        }
      ];

    } else if (domain === 'foto.ru' || domain === 'jstest.space') {
      return menu;
    } else {
      return menu;
    }


  },
  options: {
    tags: ['api'],
    auth: {
      mode: 'optional'
    },
    // plugins: {
    //   role: 'ADMIN'
    // }
  }
};


module.exports = [staticMenu];


