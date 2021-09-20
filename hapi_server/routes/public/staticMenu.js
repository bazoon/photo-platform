const startOfDay = require('date-fns/startOfDay');
var dayjs = require('dayjs');
const L = require('lodash/fp');

const staticMenu = {
  method: 'GET',
  path: '/api/staticMenu',
  handler: async function (request, h) {
    const { host } = request.info;
    const [domain] = host.split(':');
    const now = startOfDay(new Date());
    const t = dayjs(now).format('YYYY-MM-DD HH:mm:ss');
    const q = `select distinct contest_menus.id, contest_menus.id as key, lexicon_id, position, parent_id, code as title,  domain from
    contests, salones, contest_menus, lexicons, publications where
    contest_menus.lexicon_id=lexicons.id and
    contest_menus.contest_id=contests.id and contests.salone_id=salones.id and 
    contest_menus.id=publications.contest_menu_id and domain=:domain and
    publications.date_show <= :now and
    contests.date_start = (select max(c1.date_start) from contests c1 where c1.salone_id=salones.id)`;

    const contestMenus = await h.query(q, {replacements: { domain, now}});
    const lookup = {};

    contestMenus.forEach(menu => {
      lookup[menu.id] = menu;
    });

    const menu = contestMenus.reduce((acc, menu) => {
      menu.items = menu.items || [];

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
            name: 'organazers',
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

  },
  options: {
    auth: {
      mode: 'optional'
    },
    // plugins: {
    //   role: 'ADMIN'
    // }
  }
};


module.exports = [staticMenu];


