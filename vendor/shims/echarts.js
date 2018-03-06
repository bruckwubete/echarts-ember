(function () {
  function vendorModule () {
    'use strict'

    return {'default': self['echarts']}
  }

  define('echarts', [], vendorModule)
})()
