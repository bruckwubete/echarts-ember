import echarts from 'echarts'
import Ember from 'ember'
const {Component, run} = Ember
import layout from '../templates/components/ember-echart'
import {PropTypes} from 'ember-prop-types'

export default Component.extend({
  // == Dependencies ==========================================================

  // == Keyword Properties ====================================================

  attributeBindings: ['style'],
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

  getDefaultProps () {
    return {
      class: this.get('class') || 'ember-echart'
    }
  },

  init () {
    this._super(...arguments)
    run.schedule('afterRender', this, function () {
      echarts.init(document.getElementById(this.get('id'))).setOption(this.get('option'))
    })
  }
})
