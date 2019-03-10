<template>
  <div id="container" style="height: 100%;padding-top: 20px"></div>

</template>

<script>
  export default {
    name: "mix-line-bar",
    props: {
      trafficLightData: Object,
    },
    data() {
      return {
        myChart: undefined,
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        this.myChart = this.$echarts.init(document.getElementById('container'));
        let option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#fff'
              }
            }
          },
          grid: {
            top: 20,
            bottom: '35%',
          },
          toolbox: {},
          legend: {
            itemGap: 5,
            padding: 0,
            itemWidth: 10,
            itemHeight: 10,
            data: [
              {
                "name": "优化前延误",
                "icon": "square",
                "textStyle": {
                  "color": "#7d7d7d",
                }
              },
              {
                "name": "优化后延误",
                "icon": "square",
                "textStyle": {
                  "color": "#7d7d7d"
                }
              },
              {
                "name": "优化前报警次数",
                "textStyle": {
                  "color": "#7d7d7d"
                }
              },
              {
                "name": "优化后报警次数",
                "textStyle": {
                  "color": "#7d7d7d"
                }
              }]
          },
          xAxis: [
            {
              axisLine: {
                onZero: false,
                lineStyle: {
                  color: '#7d7d7d'
                }
              },
              axisLabel: {interval: 0, rotate: 320},
              type: 'category',
              data: [],
              axisPointer: {
                type: 'shadow'
              }
            }
          ],
          yAxis: [
            {
              name: "平均延误时间(s)",
              nameTextStyle: {
                color: "#7d7d7d",
                align: 'left'
              },
              nameLocation: "center",
              nameGap: '30',
              nameRotate: 270,
              axisLine: {
                show: false,
                lineStyle: {
                  color: '#7d7d7d'
                }
              },
              axisTick: {
                show: false
              },
              type: 'value',
              min: 0,
              max: 30,
              interval: 5,
              axisLabel: {
                formatter: '{value}'
              }
            },
            {
              "name": "报警次数",
              "nameTextStyle": {
                "color": "#7d7d7d"
              },
              nameLocation: "center",
              nameGap: '30',
              nameRotate: 270,
              axisLine: {
                show: false,
                lineStyle: {
                  color: '#7d7d7d'
                }
              },
              splitLine: {
                show: true,
                interval: 'auto',
                lineStyle: {
                  color: ['#353644']
                }
              },
              axisTick: {
                show: false
              },
              type: 'value',
              min: 0,
              max: 120,
              interval: 20,
              axisLabel: {
                formatter: '{value}'
              }
            }
          ],
          series: [
            {
              name: '优化前延误',
              type: 'bar',
              color: '#e05f9a',
              barWidth: '6',
              data: []
            },
            {
              name: '优化后延误',
              type: 'bar',
              barWidth: '6',
              color: '#eacc36',
              data: []
            },
            {
              name: '优化前报警次数',
              type: 'line',
              color: '#af69c9',
              symbol: 'circle',
              yAxisIndex: 1,
              data: []
            },
            {
              name: '优化后报警次数',
              type: 'line',
              color: '#02d1d1',
              yAxisIndex: 1,
              symbol: 'circle',
              data: []
            }
          ]
        };
        this.myChart.setOption(option);
      },
    },
    watch: {
      trafficLightData: {
        handler(newVal, oldVal) {
          if (this.myChart) {
            if (newVal) {
              let option = this.myChart.getOption();
              option.xAxis[0].data = newVal.beforeDelay.map((value => {
                return value.node_name
              }));
              option.series[0].data = newVal.beforeDelay.map((value => {
                return value.value
              }));
              option.series[1].data = newVal.afterDelay.map((value => {
                return value.value
              }));

              option.series[2].data = newVal.beforeAlarm.map((value => {
                return value.value
              }));
              option.series[3].data = newVal.afterAlarm.map((value => {
                return value.value
              }));

              let delayMax = Math.max(Math.max.apply(null, option.series[0].data), Math.max.apply(null, option.series[1].data)).toFixed(0);
              let alarmMax = Math.max(Math.max.apply(null, option.series[2].data), Math.max.apply(null, option.series[3].data)).toFixed(0);
              option.yAxis[0].max = delayMax;
              option.yAxis[0].interval = delayMax / 5;

              option.yAxis[1].max = alarmMax;
              option.yAxis[1].interval = alarmMax / 5;

              this.myChart.setOption(option);
            }
          }
        },
        deep: true //对象内部属性的监听，关键。
      }
    },
  }
</script>

<style scoped>

</style>
