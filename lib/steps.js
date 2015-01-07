var all = require('./step_definitions/all'),
    ext = require('./step_definitions/ext');

// Default import all steps
module.exports = function () {
  all.call(this);
};

module.exports.Ext = ext;
