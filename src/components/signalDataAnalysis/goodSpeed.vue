<template>
  <div id="data_five" style="height: 100%;width: 100%"></div>
</template>

<script>
    export default {
      name: "good-speed",
      props: {
        good_speed:Object
      },
      data(){
        return {
          goodSpeed: undefined,
        }
      },
      mounted() {
this.init()
      },
      watch: {
        good_speed() {
          this.init()
        },

      },
      methods: {
        init() {
          let option_five = {
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              itemGap:200,
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
              data: ['1：00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00',
                '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19：00', '20:00', '21:00', '22:00', '23:00','24:00'],
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
                data: [2,1,1,1,4,5,6,7,8,45,67,24,12,45,67,54,67,54,75,87,89,45,24]
              },
              {
                name: '优化后',
                type: 'line',
                color: '#e05f9a',
                symbol: 'circle',
                data: []
              },
            ]
          };
          // this.data_processing(option_five);
          this.goodSpeed = this.$echarts.init(document.getElementById('data_five'));
          this.goodSpeed.setOption(option_five);
        },
        data_processing(option_five){
          let goodSpeedData = this.good_speed;
          goodSpeedData.before.value.forEach(function (data) {
               option_five.series[0].data.push(data)
          })
          goodSpeedData.after.value.forEach(function (data) {
            option_five.series[1].data.push(data)
          })

        }
      }
    }
</script>

<style scoped>

</style>
