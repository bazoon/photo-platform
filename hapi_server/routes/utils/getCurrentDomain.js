const {compose} = require('crocks');
const {nth, split} = require('lodash');

module.exports = {
  getCurrentDomain: function(request) {
    return request.info.referrer.includes('foto.ru') ? 'foto.ru' : compose(nth(2), split('/'))(request.info.referrer);
  }
}
