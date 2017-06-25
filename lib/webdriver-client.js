'use strict';

const fs = require('fs');
const path = require('path');
const EOL = require('os').EOL;

const _ = require('./helper');

console.log(EOL);
console.log('/////////////////////////////////////');
console.log(EOL);
console.log('please use `macaca-wd` instead');
console.log(EOL);
console.log('https://macacajs.github.io/nodejs');
console.log(EOL);
console.log('/////////////////////////////////////');
console.log(EOL);

var remoteConfig = {
  host: 'localhost',
  port: process.env.MACACA_SERVER_PORT || 3456
};

module.exports = function(opts) {
  const wd = require('macaca-wd');

  wd.initPromiseChain = function(remoteCfg) {
    remoteConfig = _.merge(remoteConfig, remoteCfg || {});
    var driver = wd.promiseChainRemote(remoteConfig);
    return driver;
  };

  var options = null;

  if (opts.platformName === 'desktop') {
    options = {
      browserName: process.env.MACACA_BROWSERNAME
    };
  } else {
    options = {
      platformName: process.env.MACACA_PLATFORMNAME,
      platformVersion: process.env.MACACA_PLATFORMVERSION,
      deviceName: process.env.MACACA_UDID,
      udid: process.env.MACACA_UDID
    };
  }

  if (process.env.MACACA_APP_PATH) {
    options.app = process.env.MACACA_APP_PATH;
  }

  var macaca_app_name = process.env.MACACA_APP_NAME;
  if (macaca_app_name) {
    if (opts.platformName.toLowerCase() === 'ios') {
      options.bundleId = macaca_app_name;
    } else if (opts.platformName.toLowerCase() === 'android') {
      options.package = macaca_app_name;
    }
  }

  opts = _.merge(options, opts);

  var commonPath = path.join(__dirname, 'common');
  var list = fs.readdirSync(commonPath);

  list.forEach(file => {
    if (path.extname(file) === '.js') {
      var basename = path.basename(file);
      var name = basename.split('.')[0];
      var mod = require(path.join(commonPath, name))(opts);
      wd.addPromiseChainMethod(name, mod);
    }
  });

  var pluginPath = null;

  if (opts.platformName === 'desktop') {
    pluginPath = path.join(__dirname, 'desktop', opts.browserName.toLowerCase());
  } else {
    pluginPath = path.join(__dirname, 'mobile', opts.platformName.toLowerCase());
  }

  if (opts.platformName !== 'desktop') {
    const scrollToElementByName = function(name, flag) {
      console.log(`scroll to ${name}`);// driver

      const promise = () => {
        return new Promise(resolve => {
          var width, height, startX, endX, startY, endY;
          this
            .getWindowSize()
            .then(function(size) {
              size = JSON.parse(size);
              width = size['width'];
              height = size['height'];
              startX = parseInt(width / 2, 10);
              endX = parseInt(width / 2, 10);
              startY = parseInt(height * 4 / 5, 10);
              endY = parseInt(height / 5, 10);
            })
            .elementByNameOrNull(name)
            .then(d => {
              if (d == null) {
                if (flag < 0 || flag === 'undefined') {
                  this.swipe(startX, endY, endX, startY, 100)
                  .elementByNameOrNull(name)
                  .then(d => {
                    resolve(d || promise());
                  });
                } else {
                  this.swipe(startX, startY, endX, endY, 100)
                  .elementByNameOrNull(name)
                  .then(d => {
                    resolve(d || promise());
                  });
                }
              }
              else {
                this
                  .takeScreenshot2Cdn();
                resolve(d || promise());
              }
            });
        });
      };
      return promise();
    };

    wd.addPromiseChainMethod('scrollToElementByName', scrollToElementByName);
  }
  if (_.isExistedDir(pluginPath)) {
    var mod = require(pluginPath);
    _.each(mod.addPromiseChainMethod, (method, name) => {
      wd.addPromiseChainMethod(name, method);
    });
  }
  return wd;
};
