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

const _ = require('./helper');

var options = {
  platformName: process.env.MACACA_PLATFORMNAME || 'ios',
  platformVersion: process.env.MACACA_PLATFORMVERSION || '9.3',
  deviceName: process.env.MACACA_UDID ? '' : 'iPhone 5s'
};

if (process.env.MACACA_APP_PATH) {
  options.app = process.env.MACACA_APP_PATH;
}

module.exports = function(opt) {
  options = _.merge(options, opt || {});

  if (options.platformName.toLowerCase() === 'desktop') {
    return require('./desktop')(options);
  } else {
    return require('./mobile')(options);
  }
};
