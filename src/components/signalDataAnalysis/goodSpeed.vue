<template>
  <div id="data_five" style="height: 100%;width: 100%"></div>
</template>

<script>
    export default {
      name: "good-speed",
      props: {
        good_speed:Array
      },
      mounted() {
  this.init()
      },
      methods: {
        init() {
          let option_five = {
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: [{
                name: '优化前',
                textStyle: {
                  color: '#c9c9cc',
                  fontSize: 10,
                },

              },
                {
                  name: '优化后',
                  textStyle: {
                    color: '#c9c9cc',
                    fontSize: 10,
                  }
                },]
            },
            xAxis: {
              type: 'category',
              data: ['00：00', '1：00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00',
                '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19：00', '20:00', '21:00', '22:00', '23:00'],
              axisLine: {
                lineStyle: {
                  color: '#595B66'
                },
              },
              axisLabel: {
                color: '#fff',
                margin: 20,
                textStyle: {
                  fontSize: 10,
                }
              },
              axisTick: {
                show: false,
              },
            },
            yAxis:
              {
                type: 'value',
                show: true,
                position: 'left',
                axisLabel: {
                  formatter: '{value}',
                  color: '#c9c9cc'
                },
                splitLine: {
                  show: true,
                  interval: 'auto',//
                  lineStyle: {
                    color: ['#595B66']
                  }
                }
              },
            series: [
              {
                name: '优化前',
                type: 'line',
                color: '#02d1d1',
                symbol: 'circle',
                data: [50.60, 30,60, 45, 66, 44, 33, 66, 88, 33, 22, 11, 1, 2, 4, 6, 8, 9, 10, 23, 23, 45, 43]
              },
              {
                name: '优化后',
                type: 'line',
                color: '#e05f9a',
                symbol: 'circle',
                data: [50.60, 30,60, 20, 66, 44, 33, 88, 88, 33, 11, 11, 1, 2, 4, 8, 8, 9, 10, 23, 23, 45, 43]
              },
            ]
          };
          this.data_processing();
          this.goodSpeed = this.$echarts.init(document.getElementById('data_five'));
          this.goodSpeed.setOption(option_five);
        },
        data_processing(){
          let goodSpeedData = this.good_speed;

        }
      }
    }
</script>

<style scoped>

</style>
