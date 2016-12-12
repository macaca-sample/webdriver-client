'use strict';

var login = require('./login');
var native = require('./native');
var webview = require('./webview');

module.exports = {
  addPromiseChainMethod: {
    login: login,
    webview: webview,
    native: native
  }
};
