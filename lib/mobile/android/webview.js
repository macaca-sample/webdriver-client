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

module.exports = function() {
  return this
    .contexts()
    .then(arr => {
      return this
        .context(arr[arr.length - 1]);
    })
    .windowHandles()
    .then(handles => {
      if (handles.length > 1) {
        return this
          .window(handles[handles.length - 1]);
      }
    })
    .sleep(1000);
};
