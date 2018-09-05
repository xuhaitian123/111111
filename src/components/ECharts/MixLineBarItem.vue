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
          grid: {
            top:20,
            bottom:50,
          },
          toolbox: {

          },
          legend: {
            itemGap:5,
            padding:0,
            itemWidth:10,
            itemHeight:10,
            data:[
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
              type: 'category',
              data: ['xx交叉口','xx交叉口','xx交叉口','xx交叉口','xx交叉口','xx交叉口','xx交叉口','xx交叉口'],
              axisPointer: {
                type: 'shadow'
              }
            }
          ],
          yAxis: [
            {
              name: "平    (s)",
              nameTextStyle: {
                color: "#7d7d7d",
                align:'left'
              },
              nameLocation: "center",
              nameGap:'30',
              nameRotate:270,
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
              "name": "报",
              "nameTextStyle": {
                "color": "#7d7d7d"
              },
              nameLocation: "center",
              nameGap:'30',
              nameRotate:270,
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
              name:'优化前延误',
              type:'bar',
              color:'#e05f9a',
              barWidth:'6',
              data:[2.0, 4.9, 7.0, 23.2, 25.6, 7.7, 15.6, 2.2]
            },
            {
              name:'优化后延误',
              type:'bar',
              barWidth:'6',
              color:'#eacc36',
              data:[2.6, 5.9, 9.0, 26.4, 28.7, 7.7, 15.6, 18.2]
            },
            {
              name:'优化前报警次数',
              type:'line',
              color:'#af69c9',
              symbol: 'circle',
              yAxisIndex: 1,
              data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 15.6, 12.2, 32.6, 20.0, 6.4, 3.3]
            },
            {
              name:'优化后报警次数',
              type:'line',
              color:'#02d1d1',
              yAxisIndex: 1,
              symbol: 'circle',
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
