<template>
  <div style="height: 180px;margin-top: 20px" id="main">
  </div>
</template>

<script>
    export default {
      data(){
          return {

          }
      },
      mounted() {

        let myChart = this.$echarts.init(document.getElementById('main'));

        let option = {
          tooltip: {
            formatter: "{a} <br/>{b} : {c}%"
          },

          series: [
            {
              type: 'gauge',
              name: 'gaugeRoad',
              width: '220px',
              radius: '100%',
              startAngle: '190',
              endAngle: '-10',
              pointer: {
                show: false
              },
              detail: {
                show: false,
              },
              data: [{value: 65, name: '51%'}],
              title: {
                show: true,
                offsetCenter: [0, 0],
                textStyle: {
                  color: '#fff',
                  fontStyle: 'normal',
                  fontWeight: 'normal',
                  fontFamily: '微软雅黑',
                  fontSize: 26
                }
              },
              axisLine: {
                show: true,
                lineStyle: {
                  color: [[0.5, '#d34e80'], [1, '#fff']],
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
      },
    }
</script>

<style scoped>

</style>
