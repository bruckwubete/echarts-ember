/* eslint-env node */
'use strict'

const path = require('path')
const Funnel = require('broccoli-funnel')
const MergeTrees = require('broccoli-merge-trees')

module.exports = {
  name: 'echarts-ember',

  /* eslint-disable complexity */
  init: function (app) {
    this.options = this.options || {}
    this.options.babel = this.options.babel || {}
    this.options.babel.optional = this.options.babel.optional || []

    if (this.options.babel.optional.indexOf('es7.decorators') === -1) {
      this.options.babel.optional.push('es7.decorators')
    }
    // eslint-disable-next-line no-unused-expressions
    this._super.init && this._super.init.apply(this, arguments)
  },
  /* eslint-enable complexity */

  included () {
    this._super.included.apply(this, arguments)
    this.import('vendor/echarts-en.min.js')
    this.import('vendor/shims/echarts.js')
  },

  treeForVendor (vendorTree) {
    const echartTree = new Funnel(path.join(this.project.root, 'node_modules', 'echarts', 'dist'), {
      files: ['echarts-en.min.js']
    })

    return new MergeTrees([vendorTree, echartTree])
  }
}

