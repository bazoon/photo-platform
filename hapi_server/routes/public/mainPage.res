/* @module("react-i18next") external useTranslation: string => 'a = "useTranslation" */
/* /1* @module("primereact/button") external Button: string => React.element = "Button" *1/ */

/* module Button = { */
/*   @react.component @module("primereact/button") */
/*   external make: (~children: React.element, ~disabled: bool, ~onClick: unit => unit, ~className: string) => React.element = "Button" */
/* } */

/* type asyncErr = unit => unit */
/* type cleanUp = unit => unit */
/* type asyncOk<'t> = 't => unit */
/* type forkT<'t> = (asyncErr, asyncOk<'t>, cleanUp) => unit */

/* type async<'t> = { */
/*   fork: forkT<'t> */
/* } */

/* @module("../../core/api.js") external asyncGetCan: string => async<'a> = "asyncGet" */

/* const {get} = require('lodash/fp'); */
/* const {getCurrentContestIdFromRequest} = require('../utils/getCurrentSalone'); */

open Promise


type req = {
  one: string
}

type reqh = {
  two: string
}

type route<'t>= {
  method: string,
  path: string,
  handler: (req, reqh) => Promise.t<'t>
}

let default = [
  {
    method: "GET",
    path: "/api/mainPage/{lang}",
    handler: (request: req, h: reqh) => {
      /* const contestId = await getCurrentContestIdFromRequest(request); */
      /* const lang = request.params.lang || 'ru'; */

      /* if (!contestId) { */
      /*   return {}; */
      /* } */

      /* const query = ` */
      /*    SELECT */
      /*       c.id AS contest_id, */
      /*       ca.name, */
      /*       date_start, */
      /*       date_stop, */
      /*       s.name salone, */
      /*       sa.name AS salone, */
      /*       ca."name", */
      /*       phone_tech, */
      /*       email_pub */
      /*     FROM */
      /*       contests as c, contest_abouts as ca, salones as s, salone_abouts as sa, organizers as o, languages as l */
      /*       where ca.contest_id=c.id and c.salone_id=s.id and s.organizer_id=o.id and  sa.salone_id=s.id and */ 
      /*       ca.language_id=l.id and sa.language_id=l.id and l.short=:lang and inworknow and c.id=:contestId */
      /* `; */
      /* const info = await h.query(query, { */
      /*   replacements: { */
      /*     lang, */
      /*     contestId */
      /*   } */
      /* }); */
      /* return get('[0]', info) || {}; */
      Promise.resolve(3)
    },
    /* options: { */
    /*   tags: ["api"], */
    /*   auth: { */
    /*     mode: "optional" */
    /*   } */
    /* } */
  }
];

