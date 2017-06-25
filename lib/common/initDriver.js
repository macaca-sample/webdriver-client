'use strict';

const _ = require('../helper');

module.exports = options => {
  return function(opt) {
    opt = _.merge(opt || {}, options || {});

    var driverCfg = _.merge({
      autoAcceptAlerts: false
    }, opt);
    return this.init(driverCfg);
  };
};
