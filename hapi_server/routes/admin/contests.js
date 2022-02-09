const models = require('../../../models');
const R = require('ramda');
const {isEmpty, compose, nth, split} = require('lodash/fp');
const {getCurrentSalone} = require('../utils/getCurrentSalone');
const {getCurrentDomain} = require('../utils/getCurrentDomain');
const fs = require('fs');

const fields = [
  'id',
  'saloneId',
  'subname',
  'years',
  'dateStart',
  'dateStop',
  'dateJuriEnd',
  'dateRateShow',
  'showType',
  'showRateState',
  'democraty',
  'payType',
  'sectionCount',
  'maxrate',
  'maxsize',
  'maxWeight',
  'inworknow'
];

async function getContest(record) {
  const query = `
  select salones.name as salone, salone_id, contests.id, subname, years, date_start, date_stop, date_juri_end, date_rate_show,
  show_type, show_rate_state, democraty, pay_type, section_count, maxrate, max_weight from
  contests, salones
  where contests.salone_id=salones.id and contests.id=:id
  `;
  const [[contest]] = await models.sequelize.query(query, {
    replacements: {
      id: record.id
    }
  });

  return {
    id: contest.id,
    saloneId: contest.salone_id,
    salone: contest.salone,
    subname: contest.subname,
    years: contest.years,
    dateStart: contest.date_start,
    dateStop: contest.date_stop,
    dateJuriEnd: contest.date_juri_end,
    dateRateShow: contest.date_rate_show,
    showType: contest.show_type,
    showRateState: contest.show_rate_state,
    democraty: contest.democraty,
    payType: contest.pay_type,
    sectionCount: contest.section_count,
    maxrate: contest.maxrate,
    maxsize: contest.maxsize,
    maxWeight: contest.max_weight
  }
}


module.exports = [
  {
    method: 'POST',
    path: '/api/admin/contests',
    handler: async function (request, h) {
      const dateStart = new Date(request.payload.dateStart);
      const dateStop = new Date(request.payload.dateStop);
      const dateJuriEnd = new Date(request.payload.dateJuriEnd);
      const dateRateShow = new Date(request.payload.dateRateShow);
      const domain = getCurrentDomain(request);
      const salone= await getCurrentSalone(domain);

      let errors = {};
      
      if (dateStart >= dateStop) {
        errors.dateStart = 'dateStartGtDateStop';
        errors.dateStop = 'dateStopLsDateStart';
      }

      if (dateStop >= dateJuriEnd) {
        errors.dateStop = 'dateStopGtDateJuryEnd';
        errors.dateJuriEnd = 'dateJuryEndLsDateStop';
      }

      if (dateJuriEnd >= dateRateShow) {
        errors.dateJuriEnd = 'dateJuryEndGtDateRateShow';
        errors.dateRateShow = 'dateRateShowLsDateJuryEnd';
      }
      
      if (!isEmpty(errors)) {
        return h.response(errors).code(400);
      }

      const query = `select count(id) from contests where 
                     ((date_start <= :dateStart and date_rate_show >= :dateStart) or (date_start <= :dateRateShow and date_rate_show >= :dateRateShow)) and salone_id = :saloneId
       
      `

      const [[contest]] = await models.sequelize.query(query, {
        replacements: {
          dateStart: dateStart,
          dateRateShow: dateRateShow,
          saloneId: salone.id
        }
      });
      
      if (+contest.count > 0) {
        return h.response({error: 'contestIntersectionError' }).code(400);
      }

      const newContest = await h.models.Contest.create(request.payload);

      const uploadFolder = process.env.UPLOAD_PATH + '/' + salone.slug + '/' + newContest.id;
      
      if (!fs.existsSync(uploadFolder)) {
        fs.mkdirSync(uploadFolder)
      }

      return newContest.toJSON();
    },
    options: {
      tags: ['api'],
      auth: {
        mode: 'required'
      }
    }
  },
  {
    method: 'GET',
    path: '/api/admin/contests',
    handler: async function (request, h) {
      const {referer: host } = request.headers;
      const [domain] = host.split(':');

      const {id} = h.request.auth.credentials;

      const user = await models.User.findOne({
        where: {
          id
        }
      });

      const isAdmin = user.userType == 0;
      const isModer = user.userType === 2;
      let query;

      if (isAdmin) {
        query = `
        select salones.name as salone, salone_id, contests.id, subname, years, date_start, date_stop, date_juri_end, date_rate_show,
          show_type, show_rate_state, democraty, pay_type, section_count, maxrate, max_weight, maxsize, max_count_img, inworknow from
        contests, salones
        where contests.salone_id=salones.id
        `;
      } else if (isModer) {
        query = `
        select salones.name as salone, salone_id, contests.id, subname, years, date_start, date_stop, date_juri_end, date_rate_show,
          show_type, show_rate_state, democraty, pay_type, section_count, maxrate, max_weight, inworknow from
        contests, salones
        where contests.salone_id=salones.id and salones.domain=:domain
        `;
      } else {
        query = `
        select salones.name as salone, salone_id, contests.id, subname, years, date_start, date_stop, date_juri_end, date_rate_show,
          show_type, show_rate_state, democraty, pay_type, section_count, maxrate, max_weight, inworknow 
        from contests, salones, admins, organizers
        where contests.salone_id=salones.id and salones.domain=:domain and salones.organizer_id=organizers.id and
        admins.organizer_id=organizers.id and admins.user_id=:userId
        `;
      }

      const [contests] = await models.sequelize.query(query, {
        replacements: {
          domain,
          userId: user.id
        }
      });

      return contests.map(contest => {
        return {
          id: contest.id,
          saloneId: contest.salone_id,
          salone: contest.salone,
          subname: contest.subname,
          years: contest.years,
          dateStart: contest.date_start,
          dateStop: contest.date_stop,
          dateJuriEnd: contest.date_juri_end,
          dateRateShow: contest.date_rate_show,
          showType: contest.show_type,
          showRateState: contest.show_rate_state,
          democraty: contest.democraty,
          payType: contest.pay_type,
          sectionCount: contest.section_count,
          maxrate: contest.maxrate,
          maxsize: contest.maxsize,
          maxWeight: contest.max_weight,
          inworknow: contest.inworknow,
          maxSize: contest.maxsize,
          maxCountImg: contest.max_count_img
        };
      });
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
    path: '/api/admin/contests/{id}',
    handler: async function (request, h) {
      const { id } = request.params;
      const values = R.pick(fields, request.payload);
      const contest = await h.models.Contest.findOne({
        where: {
          id
        }
      });

      await contest.update(values);
      return R.pick(fields, contest);
    },
    options: {
      tags: ['api'],
      auth: {
        mode: 'required'
      }
    }
  },
  {
    method: 'GET',
    path: '/api/admin/contests/{id}',
    handler: async function (request, h) {
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
    path: '/api/admin/contests/{id}',
    handler: async function (request, h) {
      const { id } = request.params;
      await h.models.Lexicon.destroy({
        where: {
          id
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

];

