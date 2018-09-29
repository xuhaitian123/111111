<template>

    <div class="gaugeContainer">
      <div :id="id" class="gaugeContainer"></div>
    </div>


</template>
<style scoped>
  .gaugeContainer{
    height: 100%;
    width: 100%;
    position: relative;
  }
</style>
<script>
  export default {
    props:{
      id: String,
      gaugeData:{
        type: Object,
        default:{}
      },
      color:{
        type: String,
        default:'#0093ee  '
      },
      bigRadis:{
        type: String,
        default: "80%"
      },
      outsiderWidth:{
        type: Number,
        default: 4
      },
      insiderWidth:{
        type: Number,
        default: 2
      },
      fontSize:{
        type: Number,
        default: 20
      }

    },
    methods:{
      initChart(){
        let myChart = this.$echarts.init(document.getElementById(this.id));
        var option = {
          // backgroundColor: '#f0f2f5',
          title: {
            text: ''
          },
          series: [{
            name: '内圈小',
            type: 'gauge',

            pointer: {
              show: false
            },
            radius: '70%',
            startAngle: 175,
            endAngle: 5,
            splitNumber: 4,
            axisLine: { // 坐标轴线
              lineStyle: { // 属性lineStyle控制线条样式
                color: [
                  [1, '#bfcbd9']
                ],
                width: this.insiderWidth
              }

            },
            splitLine: { //分隔线样式
              show: false,
            },
            axisLabel: { //刻度标签
              show: false,
            },
            axisTick: { //刻度样式
              show: false,
            },
            detail: {
              show: false,
              // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontWeight: 'bolder',
              fontSize: 20,
              offsetCenter: [0, '20%']
            },
            data: [{
              value: 120,
              name: '',
              show: false
            }],

          }, {
            name: '内圈小',
            type: 'gauge',
            title: {
              // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontWeight: 'bolder',
              fontSize: 30,
              fontStyle: 'italic',
              offsetCenter: [0, '33%'],
            },
            pointer: {
              show: false
            },
            radius: '80%',
            startAngle: 176,
            endAngle: 90,
            splitNumber: 4,
            axisLine: { // 坐标轴线
              lineStyle: { // 属性lineStyle控制线条样式
                color: [
                  [1, '#0093ee']
                ],
                width: this.outsiderWidth,
                shadowColor: '#0093ee', //默认透明
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 40,
                opacity: 0.8,
              }

            },
            splitLine: { //分隔线样式
              show: false,
            },
            axisLabel: { //刻度标签
              show: false,
            },
            axisTick: { //刻度样式
              show: false,
            },
            detail: {
              offsetCenter: [0, '-30%'],
              // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              fontWeight: 'bolder',
              fontSize: this.fontSize,

            },
            data: [{
              value: '120',

            }]
          },

          ]
        };
        myChart.setOption(option, true);
      }
    },
    mounted(){
      this.initChart()
    },
    watch:{
      gaugeData(){
        this.initChart()
      }
    }
  }

</script>
