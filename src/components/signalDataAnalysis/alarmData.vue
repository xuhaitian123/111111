  <template>
  <div id="data" style="height: 100%;width: 100%"></div>
</template>

<script>
  export default {
    name: "alarm-data",
    props:
      {
        alarm_data: Object
      },
    data() {
      return {
        myChart: undefined,
      }
    },
    mounted() {
    },
    watch: {
      alarm_data() {
        this.init()
      }
    },
    methods: {
      init() {
        let options = {
          legend: {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross'
              }
            },
            data: [{
              name: '优化前',
              icon: 'square',
              textStyle: {
                color: '#c9c9cc',
                fontSize: 10,
              },
            },
              {
                name: '优化后',
                icon: 'square',
                textStyle: {
                  color: '#c9c9cc',
                  fontSize: 10,
                }
              },
            ],

          },
          grid: {
            left: 100
          },
          xAxis: {
            type: 'value',
            color: '#c9c9cc',
            splitLine: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#595B66'
              },

            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: "true",
              color: '#c9c9cc',
              margin: 20

            }
          },
          yAxis: {
            type: 'category',
            data: [],
            margin: 30,
            axisLine: {
              lineStyle: {
                color: '#595B66'
              },
            },
            axisLabel: {
              color: '#c9c9cc',
              margin: 20
            },
            axisTick: {
              show: false,
            },



          },
          series: [
            {
              name: '优化前',
              type: 'bar',
              color: '#e05f9a',
              barWidth: '12',
              data: []
            },
            {
              name: '优化后',
              type: 'bar',
              barGap: '-100%',
              color: '#43AF7E',
              barWidth: '12',
              data: []
            }
          ]
        };
        options = this.data_processing(options);
        this.myChart = this.$echarts.init(document.getElementById('data'));
        this.myChart.setOption(options);
      },
      data_processing(options) {
        var data = this.alarm_data;

        var month = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
        for (var i = 0; i < data.after.length; i++) {
          options.yAxis.data.push(month[data.after[i].month % 100 - 1])
        }
        for (var i = 0; i < data.before.length; i++){
          options.yAxis.data.push(month[data.before[i].month % 100 - 1])
        }
        var length = data.before.length
        console.log(length)
        data.after.forEach(function (data, index) {
          options.series[1].data.push([data.value, index])

        })
        data.before.forEach(function (data, index) {
          options.series[0].data.push([data.value, index+length])
        })
        return options
      }
    },


  }
</script>

<style scoped>

</style>
