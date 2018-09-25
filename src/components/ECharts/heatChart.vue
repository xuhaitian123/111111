<template>
  <div class="heatChart">
    <div :id="id" class="heatChart-canvas"></div>
    <div class="heatChart-title">
    </div>
  </div>

</template>
<style>
  .heatChart{
    height: 100%;
    width: 100%;
    position: relative;
  }
  .heatChart-title{
    position: relative;
    z-index: 99;
    width: 90px;
    margin: auto;
    top: 20px;
    height: 84%;
    background: #333643;
  }
  .heatChart-canvas{
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;

  }
</style>

<script>
  export default {
    name: "pie-doughnut-item",
    props: {
      id: String,
      direction: {
        type: String,
        default: 'left'
      },
      data: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {}
    },
    mounted() {

      let myChart = this.$echarts.init(document.getElementById(this.id));
      let i = 1;
      let data = [];
      let weeks = [0];
      data.push([0, 1, 0])
      data.push([0, 2, 0])
      data.push([0, 3, 0])
      data.push([0, 4, 0])
      do {
         if(i<=288 || (i >= 430 && i<=718 )){
           // data.push([i, -1, ''])
          data.push([i, 1, ''])
          data.push([i, 2, ''])
          data.push([i, 3, ''])
          data.push([i, 4, ''])
          data.push([i, 5, ''])
        }else{

           data.push([i, 1, 0])
           data.push([i, 2, 0])
           data.push([i, 3, 0])
           data.push([i, 4, 0])
           data.push([i, 5, 0])
         }
        weeks.push(i)
        i++
      } while (i <= 718)
      let options = {
        tooltip: {
          position: 'top',
          showContent: false
        },
        animation: false,
        grid: {
          height: '400px',
          width: "440px",
          y: '10%',
          left: "30px",
          top: "23px"
        },
        xAxis: {
          type: 'category',
          // data: weeks,
          left: "0",
          position: 'top',
          axisLabel: {
            showMinLabel: true,
            showMaxLabel: true,
            interval: 71,
            show: true,
            textStyle: {
              fontSize: '8'
            },
            formatter: function (value, index) {

              if(value<=288 || (value >= 430 && value<=718 )){
                if(value<=288){
                  return  parseInt((value)/72)*6+":00" ;
                }else{
                  console.log(parseInt((value-430)/72)*6+"")
                  return  parseInt((value-430)/72)*6+":00" ;
                }

              }else{
                return ''
              }

            }
          },
          splitArea: {
            show: true,
            interval: 0,
          }
        },
        yAxis: {
          type: 'category',
          startValue:0,
          axisLabel: {
            show: false,
          },
        },
        visualMap: {
          min: 0,
          max: 100,
          calculable: false,
          orient: 'horizontal',
          inRange: {
            color: ['#B7C3C4', '#C89498', '#C44E83']
          },

          symbolSize: '1',
          itemWidth: 10,
          itemHeight: 440,
          left: '5%',
          bottom: '5%',
        },
        series: [{
          name: 'Punch Card',
          type: 'heatmap',
          data: data,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowColor: 'rgba(255,255,255,255)'
            }
          }
        }],
        textStyle: {
          color: '#c9c9cc',
        }
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
