/* const {compose, map} = require('lodash/fp'); */

/* const camelizeObject = require('../utils/camelizeObject'); */
/* const getUploadPath = require('../utils/getUploadPath'); */
/* const {getContestIdFromSection} = require('../utils/getCurrentSalone'); */
@module("lodash/fp/get") external get: string => 'a = "get"


type tparams = {
  contestId: string
}

type req = {
  params: tparams
}

type treplacements = {
  id: string
}

type queryOptions = {
  replacements: treplacements
}

type tquery = (string, queryOptions) => Promise.t<Js.Json.t>

type tsequelize = {
  query: tquery
}

type tmodels = {
  sequelize: tsequelize
}

type reqh = {
  two: string,
  models: tmodels
}

type tauth = {
  mode: string
}

type toptions = {
  tags: array<string>,
  auth: tauth
}

type route<'t>= {
  method: string,
  path: string,
  handler: (req, reqh) => Promise.t<'t>,
  options: toptions
}

let default = [
  {
    method: "GET",
    path: "/api/admin/menuConfig/{contestId}",
    handler: (request: req, h: reqh) => {
      let { contestId } = request.params

      let query = `
        select *from contest_menus where contest_id = :id
      `;

      h.models.sequelize.query(query, {
        replacements: {
          id: "30"
        }
      });
    },
    options: {
      tags: ["api"],
      auth: {
        mode: "required"
      }
    }
  }
];

