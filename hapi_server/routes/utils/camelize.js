const camelize = str => str.split('_').map((v, i) => i > 0 ? v[0].toUpperCase() + v.slice(1) : v).join('');
module.exports = camelize;

