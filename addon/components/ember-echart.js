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

  optionChanged: observer('option', 'myChart', function() {
    const myChart = this.get('myChart')
    if (myChart) {
      this.get('myChart').setOption(this.get('option'));
    }
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
