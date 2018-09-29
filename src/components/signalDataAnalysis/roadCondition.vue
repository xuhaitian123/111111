<template>
    <div :id = "id" style="width: 100%;height: 100%"></div>
</template>

<script>
    export default {
        name: "road-condition",
      props:{
        RoadCondition: Number,
        color:String ,
        id:String
      },
      data(){
          return {
            myChart:undefined
          }
      },
      mounted(){
          this.init()
      },
      methods:{
        init() {
          this.myChart = this.$echarts.init(document.getElementById(this.id));
          let option = {
            tooltip: {
              formatter: "{a} <br/>{b} : {c}%"
            },
            series: [
              {
                type: 'gauge',
                center: ['50%', '70%'],//调位置
                name: 'gaugeRoad',
                radius: 70,//调大小
                startAngle: '180',
                endAngle: '0',
                pointer: {
                  show: false
                },
                detail: {
                  show: false,
                },
                data: [{value:this.RoadCondition, name: this.RoadCondition.toString()}],
                title: {
                  show: true,
                  offsetCenter: [0, -20],
                  textStyle: {
                    color: '#fff',
                    fontStyle: 'normal',
                    fontWeight: 'normal',
                    fontFamily: '微软雅黑',
                    fontSize: 30
                  }
                },
                axisLine: {
                  show: true,
                  lineStyle: {
                    color: [[this.RoadCondition/100, this.color], [1, '#fff']],
                    width: 2,
                    shadowBlur: 15,
                    shadowColor: '#e2ea73',
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    opacity: 1
                  }
                },
                axisTick: {
                  show: false
                },
                splitLine: {
                  show: false,
                  length: 25,
                  lineStyle: {
                    color: '#00377a',
                    width: 2,
                    type: 'solid',
                  },
                },
                axisLabel: {
                  show: false
                }
              }
            ]

          };
          this.myChart.setOption(option);
          console.log(option.series[0].data)
          console.log(option.series[0].axisLine.lineStyle.color)
        }

      },
      watch:{
        RoadCondition() {
          this.init()
        }
      },
    }
</script>

<style scoped>

</style>
