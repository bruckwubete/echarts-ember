/* eslint-env node */
'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function(defaults) {
  let app = new EmberAddon(defaults, {
    babel: {
      optional: ['es7.decorators']
    },
    sassOptions: {
      includePaths: [
      ]
    },
    snippetSearchPaths: ['tests/dummy/app'],
    // TODO: #43 remove when d3-selection or fast-sourcemaps-concat are fixed
    // to not break the build @jfellman 2018-02-20
    sourcemaps: {enabled: false}
  })

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  return app.toTree();
};
