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

var path = require('path');
var wd = require('wd-next');

var _ = require('../../helper');

module.exports = (options) => {
  var binPath = require('macaca-chromedriver').binPath;

  var separator = _.platform.isWindows ? ';' : ':';
  process.env.PATH = `${process.env.PATH}${separator}${path.dirname(binPath)}`;

  return wd;
};
