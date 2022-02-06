const {compose} = require('crocks');
const {nth, split} = require('lodash/fp');

module.exports = {
  getCurrentDomain: function(request) {
    return request.info.referrer.includes('foto.ru') ? 'foto.ru' : compose(e => nth(2)(e) || nth(0)(e), split('/'))(request.info.referrer);
  }
}
