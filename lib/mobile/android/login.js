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
    .waitForElementsByClassName('android.widget.EditText', {}, 120000)
    .then(function(els) {
      return els[0];
    })
    .sendKeys(username)
    .sleep(1000)
    .elementsByClassName('android.widget.EditText')
    .then(function(els) {
      return els[1];
    })
    .sendKeys(password)
    .sleep(1000)
    .waitForElementByName('Login')
    .click()
    .sleep(5000);
};
