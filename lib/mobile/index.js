/* ================================================================
 * webdriver-client by xdf(xudafeng[at]126.com)
 *
 * first created at : Sun Mar 06 2016 18:28:11 GMT+0800 (CST)
 *
 * ================================================================
 * Copyright  xdf
 *
 * Licensed under the MIT License
 * You may not use this file except in compliance with the License.
 *
 * ================================================================ */

'use strict';

const wd = require('wd');
const fs = require('fs');
const path = require('path');

const _ = require('../helper');

var remoteConfig = {
  host: 'localhost',
  port: process.env.MACACA_SERVER_PORT || 3456
};

wd.initPromiseChain = function(remoteCfg) {
  remoteConfig = _.merge(remoteConfig, remoteCfg || {});
  var driver = wd.promiseChainRemote(remoteConfig);
  return driver;
};

module.exports = function(opts) {
  var options = {
    platformName: process.env.MACACA_PLATFORMNAME,
    platformVersion: process.env.MACACA_PLATFORMVERSION,
    deviceName: process.env.MACACA_UDID
  };

  if (process.env.MACACA_APP_PATH) {
    options.app = process.env.MACACA_APP_PATH;
  }

  opts = _.merge(options, opts);

  var commonPath = path.join(__dirname, '..', 'common');
  var list = fs.readdirSync(commonPath);

  list.forEach(file => {
    if (path.extname(file) === '.js') {
      var basename = path.basename(file);
      var name = basename.split('.')[0];
      var mod = require(path.join(commonPath, name))(opts);
      wd.addPromiseChainMethod(name, mod);
    }
  });

  var pluginPath = path.join(__dirname, opts.platformName.toLowerCase());

  if (_.isExistedDir(pluginPath)) {
    var mod = require(pluginPath);
    _.each(mod.addPromiseChainMethod, (method, name) => {
      wd.addPromiseChainMethod(name, method);
    });
  }
  return wd;
};
