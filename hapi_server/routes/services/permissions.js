const models = require('../../../models');
const Acl = require('virgen-acl').Acl;
const acl = new Acl();


// acl.addRole("superAdmin");
// acl.addRole("superModer");
// acl.addRole("admin");
// acl.addRole("moder");

// acl.deny();
// acl.allow("superAdmin");

// acl.allow("moder", "publication", "create", function (err, role, resource, action, result, next) {


// });

const roles = {
  superAdmin: {
    name: 'superAdmin',
    level: 0,
  },
  systemAdmin: {
    name: 'systemAdmin',
    level: 1,
  },
  admin: {
    name: 'admin',
    level: 2,
  },
  moder: {
    name: 'moder',
    level: 3,
  },
  user: {
    name: 'user',
    level: 4,
  }
};


module.exports = {
  getRole: async function (u, domain) {
    if (!u || !u.id) {
      return '';
    }

    const user = await models.User.findOne({where: {id: u.id}});
    
    if (user.userType === 0) {
      return roles.superAdmin;
    }

    const query = `
      select admins.adm_type 
      from admins, organizers, salones 
      where admins.organizer_id=organizers.id and salones.organizer_id=organizers.id and
      admins.user_id=:userId and salones.domain=:domain
    `;

    const [role] = await models.sequelize.query(query, {
      replacements: {
        userId: u.id,
        domain
      }
    });

    return {
      0: roles.systemAdmin,
      1: roles.systemModer,
      1000: roles.admin,
      1010: roles.moder
    }[role.adm_type] || roles.user;
  }
};
