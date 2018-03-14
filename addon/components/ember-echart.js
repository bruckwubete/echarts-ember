import echarts from 'echarts'
import Ember from 'ember'
const {Component, observer, run} = Ember
import layout from '../templates/components/ember-echart'
import {PropTypes} from 'ember-prop-types'

export default Component.extend({
  // == Dependencies ==========================================================

  // == Keyword Properties ====================================================

  classNameBindings: ['echart'],
  layout,

  // == PropTypes =============================================================

  propTypes: {
    // Required
    id: PropTypes.string.isRequired,
    option: PropTypes.object.isRequired,

    // Optional

    class: PropTypes.string
    // state
  },

  xAxisChanged: observer('option.xAxis', 'myChart', function() {
    updateData(this.get('myChart'), 'xAxis', this.get('option.xAxis'))
  }),

  yAxisChanged: observer('option.yAxis', 'myChart', function() {
    updateData(this.get('myChart'), 'yAxis', this.get('option.yAxis'))
  }),

  seriesChanged: observer('option.series', 'myChart', function() {
    updateData(this.get('myChart'), 'series', this.get('option.series'))
  }),

  getDefaultProps () {
    if (!this.class) {
      this.echart = true
    }
    return {
      class: this.class || 'echart'
    }
  },

  init () {
    this._super(...arguments)
    run.schedule('afterRender', this, function () {
      const myChart = echarts.init(document.getElementById(this.get('id')))
      myChart.setOption(this.get('option'))
      this.set('myChart', myChart)
    })
  }
})

function updateData (chart, name, someOption) {
  if (chart) {
    let partialOption = {}
    if (someOption instanceof Array) {
      let itemsData = []
      someOption.forEach((item) => {
        if(item.data) {
          itemsData.push({data: item.data})
        } else {
          itemsData.push({})
        }
      })
      partialOption[name] = itemsData
    } else if (someOption instanceof Object) {
      if(someOption.data) {
        partialOption[name] = [{data: someOption.data}]
      } else {
        return
      }
    }
    chart.setOption(partialOption)
  }
}
