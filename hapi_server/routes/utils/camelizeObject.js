const humps = require('humps');

const camelizeObject = function(o) {
  const keys = Object.keys(o);
  const camelizedObject = {};
  keys.forEach(key => {
    camelizedObject[humps.camelize(key)] = o[key];
  });
    
  return camelizedObject;
};

module.exports = camelizeObject;
