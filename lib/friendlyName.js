var titleCase = require('title-case');

module.exports = function(name) {
  return titleCase(name.replace('-', ' ')).replace(/\s/g, '')
}
