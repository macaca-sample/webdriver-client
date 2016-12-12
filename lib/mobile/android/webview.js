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
