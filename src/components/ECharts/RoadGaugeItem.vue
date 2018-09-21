<template>
  <div id="main">
  </div>
</template>

<script>
  export default {
    props: {
      data: {
        type: String,
        default: 0,
      },
      color: {
        type: String,
        default: '#c94343'
      },
    },
    data() {
      return {}
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        let myChart = this.$echarts.init(document.getElementById('main'));

        let option = {
          tooltip: {
            formatter: "{a} <br/>{b} : {c}%"
          },
          series: [
            {
              type: 'gauge',
              name: 'gaugeRoad',
              radius: '70%',
              startAngle: '180',
              endAngle: '0',
              pointer: {
                show: false
              },
              detail: {
                show: false,
              },
              data: [{value: this.data, name: String(this.data)}],
              title: {
                show: true,
                offsetCenter: [0, -10],
                textStyle: {
                  color: this.color,
                  fontStyle: 'normal',
                  fontWeight: 'normal',
                  fontFamily: '微软雅黑',
                  fontSize: 30
                }
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: [[this.data / 100, this.color], [1, '#fff']],
                  width: 2,
                  shadowBlur: 15,
                  shadowColor: '#e2ea73',
                  shadowOffsetX: 0,
                  shadowOffsetY: 0,
                  opacity: 1
                }
              },
              axisTick: {
                show: false
              },
              splitLine: {
                show: false,
                length: 25,
                lineStyle: {
                  color: '#00377a',
                  width: 2,
                  type: 'solid',
                },
              },
              axisLabel: {
                show: false
              }
            }
          ]
        };
        myChart.setOption(option);
      }
    },
    watch: {
      data() {
        this.init()
      }
    },
  }
</script>

<style scoped>

</style>


