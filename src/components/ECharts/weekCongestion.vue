<template>
  <div class="chartContainer">
    <div :id="id" class="chartContainer"></div>

  </div>

</template>
<style>
  .chartContainer{
    height: 100%;
    width: 100%;
    position: relative;
  }


</style>

<script>
  export default {
    props: {
      id: String,
      weekCongestionDate: {
        type: Array,
        default: function(){
          return []
        },
      }
    },
    data() {
      return {
      }
    },
    watch:{
      weekCongestionDate(){
        this.init()
      }
    },
    methods:{
      init() {



        var weekData = [];
        this.weekCongestionDate.left.forEach(function (dayInfo,index) {

          var newIndex = ((index-1) === -1) ? 6  : index-1;

          dayInfo.forEach((item, dayIndex)=>{

            weekData.push( [newIndex, dayIndex+1, Number(item)]);
          })
        });

        this.weekCongestionDate.right.forEach(function (dayInfo,index) {
          var newIndex = ((index-1) === -1) ? 6  : (index-1);

          dayInfo.forEach((item, dayIndex)=>{
            weekData.push( [newIndex+8, dayIndex+1, Number(item)]);
          })
        });
        this.showChart(weekData)


      },
      showChart(weekData){
        var weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六', '', '周日', '周一', '周二', '周三', '周四', '周五', '周六'];
        this.myChart = this.$echarts.init(document.getElementById(this.id));//
        var option = {
          tooltip: {
            position: 'top',
            showContent:false
          },
          animation: false,
          grid: {
            height: '400px',
            width: "370px",
            y: '10%',
            left: "40px",
            top: "23px"
          },
          xAxis: {
            type: 'category',
            data: weeks,
            position: 'top',
            max: '17',
            axisLabel: {
              width: '1px',
              showMinLabel: true,
              interval: 0,
              show: true,
              // rotate:30,
              textStyle: {
                fontSize: '8'
              },
              formatter: function (value, index) {

                return value;
              }
            },
            splitArea: {
              show: true,
              interval: 0,
            }
          },
          yAxis: {
            type: 'category',
            max:288,
            axisLabel: {
              interval: 70,
              show: true,
              formatter: function (value, index) {
                console.log(parseInt((value)/72))
                console.log(value)

                return Math.round((value)/72)*6+":00";

              },
            },
            showMinLabel: true,
            showMaxLabel: true,

            splitArea: {
              show: true
            },
          },
          visualMap: {
            min: 0,
            max: 100,
            itemWidth: 10,
            itemHeight: 370,
            calculable: false,
            orient: 'horizontal',
            inRange: {
              color: ['#B7C3C4', '#C89498', '#C44E83']
            },
            left: '35',
            bottom: '5%',
            symbolSize: '1'
          },
          series: [{
            name: 'Punch Card',
            type: 'heatmap',
            data: weekData,
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
        // 使用刚指定的配置项和数据显示图表。
        // myChart.setOption(option);
        this.myChart.setOption(option);
      },
    },

    mounted() {
      setTimeout(()=>{
        var a = []
        console.log('===')
        this.showChart(a)
      },500)

    },
  }
</script>

<style scoped>
  .color {
    color: rgb(89, 91, 102);
  }

</style>
