const { Model } = require('objection');
const Knex = require('knex');
const env = process.env.NODE_ENV || 'development';
const { knexSnakeCaseMappers } = require('objection');

const knex = Knex({
  client: 'pg',
  version: '7.2',
  connection: {
    host : process.env.HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database: env === 'development' ? process.env.DB : process.env.TESTDB,
  },
  ...knexSnakeCaseMappers()
});

const {createPool, sql} = require('slonik');
const {createFieldNameTransformationInterceptor} = require('slonik-interceptor-field-name-transformation');

const db = env === 'development' ? process.env.DB : process.env.TESTDB;
const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.HOST}:5432/${db}`;
const interceptors = [
  createFieldNameTransformationInterceptor({
    format: 'CAMEL_CASE'
  })
];

const pool = createPool(connectionString, {interceptors});

Model.knex(knex);

module.exports = pool;


// class Admin extends Model {
//   static get tableName () {
//     return 'admins';
//   }
// }

// class Award extends Model {
//   static get tableName () {
//     return 'awards';
//   }
// }

// class AwardStack extends Model {
//   static get tableName () {
//     return 'awards_stacks';
//   }
// }

// class Awardtype extends Model {
//   static get tableName () {
//     return 'award_types';
//   }
// }

// class Contest extends Model {
//   static get tableName () {
//     return 'contests';
//   }
// }

// class ContestAbout extends Model {
//   static get tableName () {
//     return 'contest_abouts';
//   }
// }

// class ContestMenu extends Model {
//   static get tableName () {
//     return 'contest_menus';
//   }
// }

// class Jury extends Model {
//   static get tableName () {
//     return 'juries';
//   }
// }

// class Language extends Model {
//   static get tableName () {
//     return 'languages';
//   }
// }

// class Lexicon extends Model {
//   static get tableName () {
//     return 'lexicons';
//   }
// }

// class Organizer extends Model {
//   static get tableName () {
//     return 'organizers';
//   }
// }

// class Photowork extends Model {
//   static get tableName () {
//     return 'photoworks';
//   }
// }

// class Phrase extends Model {
//   static get tableName () {
//     return 'phrases';
//   }
// }

// class Publication extends Model {
//   static get tableName () {
//     return 'publications';
//   }
// }

// class PublicationText extends Model {
//   static get tableName () {
//     return 'publictxt';
//   }
// }
 
// class Rate extends Model {
//   static get tableName () {
//     return 'rates';
//   }
// }

// class RegistrationContest extends Model {

//   static get tableName () {
//     return 'registation_contests';
//   }
// }

// class Salone extends Model {
//   static get tableName () {
//     return 'salones';
//   }
// }

// class Saloneabout extends Model {
//   static get tableName () {
//     return 'salone_abouts';
//   }
// }

// class Section extends Model {
//   static get tableName () {
//     return 'sections';
//   }
// }

// class SectionName extends Model {
//   static get tableName () {
//     return 'section_names';
//   }
// }

// class SprSaloneType extends Model {
//   static get tableName () {
//     return 'spr_salone_types';
//   }
// }

// class User extends Model {
//   static get tableName () {
//     return 'users';
//   }
// }

// module.exports = {
//   Admin,
//   Award,
//   AwardStack,
//   Awardtype,
//   Contest,
//   ContestAbout,
//   ContestMenu,
//   Jury,
//   Language,
//   Lexicon,
//   Organizer,
//   Photowork,
//   Phrase,
//   Publication,
//   PublicationText,
//   Rate,
//   RegistrationContest,
//   Salone,
//   Saloneabout,
//   Section,
//   SectionName,
//   SprSaloneType,
//   User,
// };
