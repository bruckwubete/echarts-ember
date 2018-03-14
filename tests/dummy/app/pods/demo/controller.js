import Ember from 'ember'
const {Controller, computed} = Ember

export default Controller.extend({

  init() {
    this.set('data', genData(50))
    this.set('data2', Array.from({length: 12}, () => Math.floor(Math.random() * 17)))
    this.set('data3', Array.from({length: 12}, () => Math.floor(Math.random() * 17)))
    this.set('data4', Array.from({length: 12}, () => Math.floor(Math.random() * 17)))

    setInterval(() => {
      this.set('data', genData(50))
      this.set('data2', Array.from({length: 12}, () => Math.floor(Math.random() * 17)))
      this.set('data3', Array.from({length: 12}, () => Math.floor(Math.random() * 17)))
      this.set('data4', Array.from({length: 12}, () => Math.floor(Math.random() * 17)))
    }, 5000)
  },

  // == Computed Properties ===================================================


  option2: computed('', function () {
    let data = []

    for (let i = 0; i <= 360; i++) {
      let t = i / 180 * Math.PI
      let r = Math.sin(2 * t) * Math.cos(2 * t)
      data.push([r, i])
    }

    return {
      title: {
        text: 'Polar'
      },
      legend: {
        data: ['line']
      },
      polar: {
        center: ['50%', '54%']
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      angleAxis: {
        type: 'value',
        startAngle: 0
      },
      radiusAxis: {
        min: 0
      },
      series: [{
        coordinateSystem: 'polar',
        name: 'line',
        type: 'line',
        showSymbol: false,
        data: data
      }],
      animationDuration: 2000
    }
  }).readOnly(),

  option3: computed('data2', 'data3', 'data4', function () {
    let data2 = this.get('data2')
    let data3 = this.get('data3')
    let data4 = this.get('data4')

    return {
      title: {
        text: 'Temp-humidity Bar chart'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        }
      },
      toolbox: {
        feature: {
          dataView: {show: true, readOnly: false},
          magicType: {show: true, type: ['line', 'bar']},
          restore: {show: true},
          saveAsImage: {show: true}
        }
      },
      legend: {
        data: ['average', 'volume', 'temperature']
      },
      xAxis: [
        {
          type: 'category',
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
          axisPointer: {
            type: 'shadow'
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: 'volume',
          min: 0,
          max: 250,
          interval: 50,
          axisLabel: {
            formatter: '{value} ml'
          }
        },
        {
          type: 'value',
          name: 'temperature',
          min: 0,
          max: 25,
          interval: 5,
          axisLabel: {
            formatter: '{value} °C'
          }
        }
      ],
      series: [
        {
          name: 'average',
          type: 'bar',
          data: data2
        },
        {
          name: 'volume',
          type: 'bar',
          data: data3
        },
        {
          name: 'temperature',
          type: 'line',
          yAxisIndex: 1,
          data: data4
        }
      ]
    }
  }).readOnly(),

  option4: computed('data', function () {
    const data = this.get('data')

    return {
      title: {
        text: 'Pie Chart ',
        subtext: 'subtext'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        data: data.legendData,

        selected: data.selected
      },
      series: [
        {
          name: 'Seires name',
          type: 'pie',
          radius: '55%',
          data: data.seriesData,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
  }).readOnly()
})

function genData () {
  let nameList = [
    'Ethiopia ', 'Canada ', 'USA '
  ]
  let legendData = []
  let seriesData = []
  let selected = {}
  for (let i = 0; i <= 2; i++) {
    let name = nameList[i]
    legendData.push(name)
    seriesData.push({
      name: name,
      value: Math.round(Math.random() * 100000)
    })
  }

  return {
    legendData: legendData,
    seriesData: seriesData,
    selected: selected
  }
}
