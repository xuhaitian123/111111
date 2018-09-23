<template>
  <div class="trendLine">
    <div :id="id" class="trendLine-canvas"></div>

  </div>

</template>
<style>
  .trendLine{
    height: 100%;
    width: 100%;
    position: relative;
  }

  .trendLine-canvas{
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;

  }
</style>

<script>
  export default {
    props: {
      id: String,
      data: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {}
    },
    mounted() {


      var data = [
        {
          name: '路口一',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 8,
          data: [[1,2], [2,3], [3,1], [4,4], [5,12], [6,12], [7,1], [8,10], [9,14], [10,3], [11,15], [12,10]],

        },
        {
          name: '路口二',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 8,
          data: [[1,2], [2,3], [3,1], [4,4], [5,12], [6,12], [7,1], [8,10], [9,14], [10,3], [11,15], [12,10]]
        },
        {
          name: '路口三',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 8,
          data: [[1,2], [2,3], [3,1], [4,4], [5,12], [6,12], [7,1], [8,10], [9,14], [10,3], [11,15], [12,10]]
        },
        {
          name: '路口四',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 8,
          data: [[1,2], [2,3], [3,1], [4,4], [5,12], [6,12], [7,1], [8,10], [9,14], [10,3], [11,15], [12,10]]
        },
        {
          name: '路口五',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 8,
          data: [[1,2], [2,3], [3,1], [4,4], [5,12], [6,12], [7,1], [8,10], [9,14], [10,3], [11,15], [12,10]]
        },
        {
          name: '路口六',
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 8,
          data: [[1,2], [2,3], [3,1], [4,4], [5,12], [6,12], [7,1], [8,10], [9,14], [10,3], [11,15], [12,10]]
        },

      ];


      let myChart = this.$echarts.init(document.getElementById(this.id));

      let options = {
        tooltip: {
          trigger: 'axis'
        },
        animation: false,
        legend: {
          data:['路口一','路口二','路口三','','路口四','路口五','路口六'],
          x: 'right',//图例说明文字设置
          y:'50%',
          textStyle: {
            "color": "#7d7d7d",
          },
          // itemGap: 80
          itemWidth: 40,
          itemHeight:15,
          itemGap: 20
          // padding: 10,

        },
        grid: {
          height: '70%',
          width: "65%",
          y: '10%',
          left:'4%',
          top: "15%"
        },
        xAxis: {
          type: 'value',
          boundaryGap: false,
          data:[1,2,3,4,5,6,7,8,9],
          splitLine:{show:false},
          axisLabel: {
            show: true,
            textStyle: {
              fontSize: '10',
              "color": "#fff",
            },
            formatter: function (value, index) {
              return value
            },
          },

        },
        yAxis: {
          type: 'value',
          show:true,
          data:[1,2,3,4,5,6,7,8,9],
          axisTick:{
            show: true
          },
          axisLabel: {
            show: true,
            textStyle: {
              fontSize: '10',
              "color": "#fff",
            },
            formatter: function (value, index) {
              return value
            },
          }
        },
        series: data,
      };

      myChart.setOption(options, true);
    },
  }
</script>

<style scoped>
  .color {
    color: rgb(89, 91, 102);
  }

</style>
