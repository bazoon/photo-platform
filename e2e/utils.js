const { QueryTypes } = require('sequelize');
const db = require('../models/index');
const bcrypt = require('bcryptjs');
const { Pool, Client } = require('pg')
const _ = require('lodash');

const rndString = n => Math.random().toString(36).substring(0, n);

const tableNames = [
  'admin_menus',
  'admins',
  'award_types',
  'awards',
  'awards_stacks',
  'categories_lexics',
  'contest_abouts',
  'contest_menus',
  'contests',
  'countries',
  'currencies',
  'customers',
  'files',
  'invoices',
  'juries',
  'languages',
  'lexicons',
  'lockalposts',
  'organizers',
  'partners',
  'photoworks',
  'phrases',
  'publications',
  'publictxts',
  'rates',
  'registration_contests',
  'registration_sections',
  'salon_settings',
  'salone_abouts',
  'salones',
  'section_names',
  'sections',
  'settings',
  'spr_salone_types',
  'users',
  'versions',
];

const createUser = (userData) => {
  var salt = bcrypt.genSaltSync(10);
  const psw = bcrypt.hashSync(userData.psw, salt);

  return db.User.create({
    ...userData,
    salt,
    psw
  }).then(u => {
    return userData;
  }).catch(e => {
    return e;
  });
};

const createAdmin = ({organizer, user, admType}) => {
  return db.Admin.create({organizerId: organizer.id, userId: user.id, admType})
};

const createOrganizer = ({organizer, lang}) => {
  return db.Language.create(lang).then(l => {
    return db.Organizer.create({...organizer, languageId: l.id}).then(o => {
      console.log('O?', o.toString().toString());

      return { o, l };
    }).catch(e => {
      console.log('catch createOrganizer', e)
      return e;
    });
  });
};


// const createSprSaloneType = ({lexiconId, name}) => {
//   return db.categories_lexics
//   return db.Lexicons.create({})
//   return db.SprSaloneType.create({ lexiconId, name }).then(l => {
//     return db.Organizer.create({...organizer, languageId: l.id}).then(o => {
//       return o;
//     }).catch(e => {
//       return e;
//     });
//   });
// };

const createFromQuery = ({query, replacements}) => {
  return db.sequelize.query(query, {
    replacements,
    type: QueryTypes.INSERT
  });
};

const createSalone = ({organizer, lang, salone}) => {

  return createOrganizer({organizer, lang}).then(p => {
    const {o, l} = p;
    console.log('ORG', p.toString().slice(10))

    return createFromQuery({
      query: 'insert into categories_lexics(name, international_name, slug) values(:name, :internationalName, :slug) returning id',
      replacements: {
        name: 'foo' + rndString(4), 
        internationalName: 'look' + Math.random(),
        slug: 'foo' + rndString(4)
      }
    }).then(a => {
      const id = a[0][0].id;
      return createFromQuery({
        query: 'insert into lexicons(code, categories_lexic_id) values(:code, :categoriesLexicId) returning id',
        replacements: {
          code: 'code' + rndString(4),
          categoriesLexicId: id
        }
      })
    }).then(a => {
      const id = a[0][0].id;
      return createFromQuery({
        query: 'insert into spr_salone_types(lexicon_id, name) values(:lexiconId, :name) returning id',
        replacements: {
          lexiconId: id,
          name: 'SprSaloneType' + rndString(4)
        }
      }).then(a => {
        const id = a[0][0].id;
        return db.Salone.create({
          organizerId: o.id,
          ...salone,
          sprSaloneTypeId: id,
        }).then(salone => {
          return db.SaloneAbout.create({
            saloneId: salone.id,
            languageId: l.id,
            name: 'Foo',
            content: 'create'
          }).then(sa => {

            return {
              salone,
              organizer: o
            }
          });
        })
      });
    }).catch(e => {
      console.log('EE')
      console.log(e);
    });
  });
};

const createContest = ({organizer, lang, salone, contest}) => {
  return createSalone({organizer, lang, salone}).then(({salone, organizer}) => {
    return db.Contest.create({
      ...contest,
      saloneId: salone.id,
    }).then(contest => {
      return {
        salone, organizer, contest 
      }
    })
  });
};

const create = ({model, data}) => {
  console.log('creating', model, data);
  return db[model].create(data).then(r => {
    console.log('returning', model, r);
    return data;
  }).catch(e => {
    return e;
  });
};

const createMany = list => {
  const ms = list.map(({model, data}) => {
    let clone = {...data};

    if (model === 'User') {
      var salt = bcrypt.genSaltSync(10);
      const psw = bcrypt.hashSync(data.psw, salt);
      clone.psw = psw;
    }

    return db[model].create(clone).then(r => {
      return {...r.dataValues, ...data};
    }).catch(e => {
      console.log('CATCH', e);
      return e;
    });
  })
  return Promise.all(ms)
};

module.exports = {
  createUser,
  createOrganizer,
  createAdmin,
  createSalone,
  createContest,
  create,
  createMany,
  dropDb() {
    return db.sequelize.query('TRUNCATE TABLE ' + tableNames.join(', '))
  }
}


// client.release(true);

// // await db.sequelize.authenticate();
// // // await db.sequelize.query(`
// // //   drop database if exists photo_test;
// // // `);

// // await db.sequelize.query(`
// //   create database photo_test with template photo_empty;
// // `);

// return Promise.resolve(true);
