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

const path = require('path');
const wd = require('wd-next');
const installer = require('node-installer');

const _ = require('../../helper');

module.exports = (options) => {
  const ChromeDriver = installer('macaca-chromedriver');
  const separator = _.platform.isWindows ? ';' : ':';
  process.env.PATH = `${process.env.PATH}${separator}${path.dirname(ChromeDriver.binPath)}`;

  return wd;
};
