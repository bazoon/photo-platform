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


module.exports = {
  getRole: async function (u, domain) {
    if (!u) {
      return '';
    }

    console.log(3, u)
    const user = await models.User.findOne({
      where: {
        id: u.id
      }
    });
    console.log(4, user)



    if (user.userType === 0) {
      return 'superAdmin';
    }

    if (user.userType === 2) {
      return 'moder';
    }

    const query = `
      select admins.adm_type 
      from admins, organizers, salones 
      where admins.organizer_id=organizers.id and salones.organizer_id=organizers.id and
      admins.user_id=:userId
    `;

    const [roles] = await models.sequelize.query(query, {
      replacements: {
        userId: user.id
      }
    });


    if (roles.length > 0) {
      let role = roles[0];
      if (role.adm_type === 0) {
        return 'admin';
      } else if (role.adm_type === 1) {
        return 'moder';
      }
    } else if (user.id) {
      return 'user';
    } else {
      return ''
    }


  }


};
