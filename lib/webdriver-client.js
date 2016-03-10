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

const fs = require('fs');
const wd = require('wd');
const path = require('path');

const _ = require('./helper');

var options = {
  platformName: process.env.MACACA_PLATFORMNAME || 'ios',
  platformVersion: process.env.MACACA_PLATFORMVERSION || '9.2',
  deviceName: process.env.MACACA_UDID ? '' : 'iPhone 5s'
};

if (process.env.MACACA_APP_PATH) {
  options.app = process.env.MACACA_APP_PATH
}

var remoteConfig = {
  host: 'localhost',
  port: process.env.MACACA_SERVER_PORT || 3456
};

wd.initPromiseChain = function(remoteCfg) {
  remoteConfig = _.merge(remoteConfig, remoteCfg || {});
  var driver = wd.promiseChainRemote(remoteConfig);
  return driver;
};

module.exports = function(opt) {

  options = _.merge(options, opt || {});

  var commonPath = path.join(__dirname, 'common');
  var list = fs.readdirSync(commonPath);

  list.forEach(file => {
    if (path.extname(file) === '.js') {
      var basename = path.basename(file);
      var name = file.split('.')[0];
      var mod = require(path.join(commonPath, file))(options);
      wd.addPromiseChainMethod(name, mod);
    }
  });

  var pluginPath = path.join(__dirname, 'mobile', options.platformName.toLowerCase());

  if (_.isExistedDir(pluginPath)) {
    var mod = require(pluginPath);
    _.each(mod.addPromiseChainMethod, (method, name) => {
      wd.addPromiseChainMethod(name, method);
    });
  }

  return wd;
};
