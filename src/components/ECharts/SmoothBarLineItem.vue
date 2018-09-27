<template>
  <div id="SmoothBarLine" style="height: 90%"></div>
</template>

<script>
  export default {
    props: {
      data: Array
    },
    data() {
      return {
        myChart:undefined,
      }
    },
    mounted() {

      this.myChart = this.$echarts.init(document.getElementById('SmoothBarLine'));
      let option = {};

      let colors = ['#5ebfba', '#ff8539', '#b14671'];
      option = {
        color: colors,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#fff'
            }
          }
        },
        legend: {
          data: ['']
        },
        // grid: {
        //   top: 30,
        //   bottom: 40
        // },
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
            name: '流量',
            type: 'line',
            smooth: true,
            symbol: 'circle',
            data: [3, 5, 1, 7]
          },
        ]
      };
      this.myChart.setOption(option);
    },
    watch: {
      data: {
        handler(newVal, oldVal) {
          if (this.myChart) {
            let option = this.myChart.getOption();
            option.xAxis[0].data = newVal.map((val)=>{return this.formatDate(new Date(val.start),'hh:mm');});
            option.series[0].data = newVal.map((val)=>{return val.total;});
            this.myChart.setOption(option);
          }
        },
        deep: true //对象内部属性的监听，关键。
      }
    }
  }

</script>

<style scoped>

</style>
