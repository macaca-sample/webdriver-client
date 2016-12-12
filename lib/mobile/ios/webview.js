'use strict';

module.exports = function() {
  return this
    .contexts()
    .then(arr => {
      return this
        .context(arr[arr.length - 1]);
    });
};
