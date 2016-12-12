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
