<template>
  <div id="SmoothBarLine" style="height: 100%"></div>
</template>

<script>
  export default {
    data(){
      return {

      }
    },
    mounted() {

      let myChart = this.$echarts.init(document.getElementById('SmoothBarLine'));

      let app = {};
      let option = null;
      app.title = '多 X 轴示例';

      let colors = ['#5ebfba','#ff8539','#b14671'];


      option = {
        color: colors,

        tooltip: {

        },
        legend: {
          data:[ '']
        },
        grid: {
          top: 30,
          bottom: 40
        },
        xAxis: [
          {
            type: 'category',
            axisLine: {
              lineStyle: {
                color: '7d7d7d'
              }
            },
            data: ["2016-1", "2016-2", "2016-3", "2016-4", "2016-5", "2016-6", "2016-7", "2016-8", "2016-9", "2016-10", "2016-11", "2016-12"]
          }
        ],
        yAxis: [
          {
            type: 'value',
            min: 0,
            max: 5,
            interval: 1,
            axisLine: {
              show: false,
              lineStyle: {
                color: '#7d7d7d'
              }
            },
          }
        ],
        series: [
          {
            name:'通畅',
            type:'line',
            smooth: true,
            symbol: 'circle',
            data: [3, 5, 1, 7, 3, 6,4, 4, 3, 0.7]
          },
          {
            name:'正常',
            type:'line',
            symbol: 'circle',
            smooth: true,
            data: [1,2, 1, 3, 1, 0.2, 12, 4, 4, 3, 0.7]
          },
          {
            name:'拥堵',
            type:'line',
            symbol: 'circle',
            smooth: true,
            data: [12, 3, 1, 0, 4, 1, 5,4, 3, 0.7]
          }
        ]
      };
        myChart.setOption(option);

    },
  }

</script>

<style scoped>

</style>
