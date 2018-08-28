<template>
  <div id="container" style="height: 100%;padding-top: 20px"></div>

</template>

<script>
    export default {
        name: "mix-line-bar",
      data(){
        return {

        }
      },
      mounted() {

        let myChart = this.$echarts.init(document.getElementById('container'));
        let app = {};
        let option = {};
        app.title = '折柱混合';

        option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#fff'
              }
            }
          },
          toolbox: {

          },
          legend: {
            data:[
              {
                "name": "优化前延误",
                "icon": "square",
                "textStyle": {
                  "color": "#fff",

                }
              },
              {
                "name": "优化后延误",
                "icon": "square",
                "textStyle": {
                  "color": "#fff"
                }
              },
              {
                "name": "优化前报警次数",
                // "icon": "line",
                "textStyle": {
                  "color": "#fff"
                }
              },
              {
                "name": "优化后报警次数",
                // "icon": "bar",
                "textStyle": {
                  "color": "#fff"
                }
              }]
          },
          xAxis: [
            {
              axisLine: {
                onZero: false,
                lineStyle: {
                  color: '#fff'
                }
              },
              type: 'category',
              data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
              axisPointer: {
                type: 'shadow'
              }
            }
          ],
          yAxis: [
            {
              name: "平均延误时间",
              nameTextStyle: {
                color: "#fff",
                align:'left'
              },
              nameLocation: "center",
              nameGap:'30',
              nameRotate:270,
              axisLine: {
                show: false,
                lineStyle: {
                  color: '#fff'
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
                "color": "#fff"
              },
              nameLocation: "center",
              nameGap:'30',
              nameRotate:270,
              axisLine: {
                show: false,
                lineStyle: {
                  color: '#fff'
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
              name:'优化前延误',
              type:'bar',
              color:'#e05f9a',
              barWidth:'8',
              data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
            },
            {
              name:'优化后延误',
              type:'bar',
              barWidth:'8',
              color:'#eacc36',
              data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
            },
            {
              name:'优化前报警次数',
              type:'line',
              color:'#af69c9',
              yAxisIndex: 1,
              data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
            },
            {
              name:'优化后报警次数',
              type:'line',
              color:'#02d1d1',
              yAxisIndex: 1,
              data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23, 23.0, 16.5, 12.0, 6.2]
            }
          ]
        };
        myChart.setOption(option);
      },
    }
</script>

<style scoped>

</style>
