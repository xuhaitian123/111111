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
      let option = {};

      let colors = ['#5ebfba','#ff8539','#b14671'];


      option = {
        color: colors,

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
            data: ["19:00", "20:00", "21:00", "23:00", "0:00", "1:00", "3:00", "4:00", "5:00", "10:00", "11:00", "16:12"]
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
            splitLine: {
              show: true,
              interval: 'auto',
              lineStyle: {
                color: ['#353644']
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
