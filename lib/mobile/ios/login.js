'use strict';

module.exports = function(username, password) {
  return this
    .waitForElementByXPath('//XCUIElementTypeTextField[1]')
    .sendKeys(username)
    .waitForElementByXPath('//XCUIElementTypeSecureTextField[1]')
    .sendKeys(password)
    .sleep(1000)
    .sendKeys('\n')
    .waitForElementByName('Login')
    .click()
    .sleep(5000);
};
