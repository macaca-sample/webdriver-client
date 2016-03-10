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

module.exports = function(username, password) {
  return this
    .waitForElementByXPath('//UIATextField[1]')
    .sendKeys(username)
    .waitForElementByXPath('//UIASecureTextField[1]')
    .sendKeys(password)
    .sleep(1000)
    .sendKeys('\n')
    .waitForElementByName('Login')
    .click()
    .sleep(5000);
};
