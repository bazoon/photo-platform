const models = require('../../../models');
const startOfDay = require('date-fns/startOfDay');

const staticMenu = {
  method: 'GET',
  path: '/api/staticMenu',
  handler: async function (request, h) {
    const { host } = request.info;
    const [domain] = host.split(':');
    const now = startOfDay(new Date());
    const query = `select distinct contest_menus.id, lexicon_id, position, parent_id, code, domain from
    contests, salones, contest_menus, lexicons, publications where
    contest_menus.lexicon_id=lexicons.id and
    contest_menus.contest_id=contests.id and contests.salone_id=salones.id and 
    contest_menus.id=publications.contest_menu_id and domain=:domain and
    publications.date_show <= :now and
    contests.date_start = (select max(c1.date_start) from contests c1 where c1.salone_id=salones.id)
  `;

    let [contestMenus] = await models.sequelize.query(query, {
      replacements: {
        domain,
        now
      }
    });

    contestMenus = contestMenus.map(m => {
      return {
        id: m.id,
        key: m.id,
        parentId: m.parent_id,
        position: m.position,
        title: m.code,
        lexiconId: m.lexicon_id
      };
    });

    const lookup = {};

    contestMenus.forEach(menu => {
      lookup[menu.id] = menu;
    });

    const menu = contestMenus.reduce((acc, menu) => {
      menu.children = menu.children || [];

      if (menu.parentId && menu.parentId !== -1) {
        const parentMenu = lookup[menu.parentId];
        if (parentMenu) {
          parentMenu.children = parentMenu.children || [];
          parentMenu.children.push(menu);
        }
        return acc;
      }
      return acc.concat([menu]);
    }, []);

    return [
      {
        title: 'photos',
        url: '/photos/sections'
      },
      {
        title: 'about-contest',
        children: [
          {
            title: 'thesis',
            url: '/thesis'
          },
          {
            title: 'rules',
            url: '/rules'
          }
        ]
      },
      {
        title: 'contacts',
        url: '/contacts'
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


