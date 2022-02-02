const {get} = require('lodash/fp');
const getPath = require('crocks/Maybe/getPath');
const { Op } = require('sequelize');

module.exports = [
  {
    method: 'GET',
    path: '/api/admin/menuConfig/{contestId}',
    handler: async (request, h) => {
      let { contestId } = request.params

      let query = `
        select lexicons.id as lexicon_id, contest_menus.id, code, parent_id, position from contest_menus, lexicons
        where contest_id = :id and contest_menus.contest_id = :id and contest_menus.lexicon_id=lexicons.id
        order by parent_id, position
      `;

      const [a] = await h.models.sequelize.query(query, {
        replacements: {
          id: contestId
        }
      });

      const items = a.map(e => ({...e, lexiconId: e.lexicon_id,  parentId: e.parent_id}));
      return {
        parent: items.find(e => e.parent_id === -1),
        children: items.filter(e => e.parent_id > 0)
      };
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
    path: '/api/admin/menuConfig',
    handler: async function (request, h) {
      const {lexiconId, parentId, contestId} = request.payload;
      

      const positionQuery = 'select max(position) from contest_menus where parent_id=:id';

      const [p] = await h.models.sequelize.query(positionQuery, {
        replacements: {
          id: parentId
        }
      });

      const newItem = await h.models.ContestMenu.create({
        lexiconId,
        parentId,
        contestId,
        position: getPath(['0', 'max'], p).map(e => e + 1).option(0) 
      });

      newItem.reload();

      let query = `
        select lexicons.id as lexicon_id, contest_menus.id, code, parent_id, position from contest_menus, lexicons
        where contest_menus.id=:id and contest_menus.lexicon_id=lexicons.id
      `;


      const [a] = await h.models.sequelize.query(query, {
        replacements: {
          id: newItem.id
        }
      });

      const items = a.map(e => ({...e, lexiconId: e.lexicon_id,  parentId: e.parent_id}));
      return items[0];
    },
    options: {
      tags: ['api'],
      auth: {
        mode: 'required'
      }
    }
  },
  {
    method: 'PUT',
    path: '/api/admin/menuConfig/{id}',
    handler: async function (request, h) {
      const id = request.params.id;
      const {lexiconId} = request.payload;
      
      const p = await h.models.ContestMenu.update(
        {
          lexiconId
        }, {
          where: {
            id
          }
        });
 
      let query = `
        select lexicons.id as lexicon_id, contest_menus.id, code, parent_id, position from contest_menus, lexicons
        where contest_menus.id=:id and contest_menus.lexicon_id=lexicons.id
      `;


      const [a] = await h.models.sequelize.query(query, {
        replacements: {
          id
        }
      });

      const items = a.map(e => ({...e, lexiconId: e.lexicon_id,  parentId: e.parent_id}));
      return items[0];
    
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
    path: '/api/admin/menuConfig/{id}',
    handler: async function (request, h) {
      const id = request.params.id;
      
      await h.models.ContestMenu.destroy({
        where: {
          id
        }
      });

      await h.models.ContestMenu.destroy({
        where: {
          parentId: id
        }
      });

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
    method: 'PUT',
    path: '/api/admin/menuConfig/down/{id}',
    handler: async function (request, h) {
      const id = request.params.id;
      
      const item = await h.models.ContestMenu.findOne({
        where: {
          id
        }
      });

      const downItem = await h.models.ContestMenu.findOne({
        where: {
          [Op.and]: [
            { parentId: item.parentId },
            { position: item.position + 1 }
          ]
        }
      });

      if (downItem) {
        await item.update({
          position: item.position + 1
        });
        
        await downItem.update({
          position: downItem.position - 1
        });
      }

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
    method: 'PUT',
    path: '/api/admin/menuConfig/up/{id}',
    handler: async function (request, h) {
      const id = request.params.id;
      
      const item = await h.models.ContestMenu.findOne({
        where: {
          id
        }
      });

      const upItem = await h.models.ContestMenu.findOne({
        where: {
          [Op.and]: [
            { parentId: item.parentId },
            { position: item.position - 1 }
          ]
        }
      });

      if (upItem) {
        await item.update({
          position: item.position - 1
        });
        
        await upItem.update({
          position: upItem.position + 1
        });
      }

      return {};
    },
    options: {
      tags: ['api'],
      auth: {
        mode: 'required'
      }
    }
  },
];

