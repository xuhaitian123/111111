<template>
  <div :id="id" style="height: 100%"></div>
</template>

<script>
  export default {
    name: "pie-doughnut-item",
    props: {
      id: String,
      data: Object
    },
    data() {
      return {
        myChart: undefined,
      }
    },
    mounted() {
      let chart = this.$echarts.init(document.getElementById(this.id));

      let option = {
        gird: {
          width: 50,
          height: 50,
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '80%'],
            hoverAnimation: false,
            label: {
              normal: {
                show: false,
                position: 'inside'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '12',
                }
              }
            },
            avoidLabelOverlap: false,
            data: [
              {value: this.data.value, name: '', itemStyle: {color: '#47ad7d'}},
              {value: 100-this.data.value, name: '', itemStyle: {color: '#525461'}},
            ]
          }
        ]
      };
      chart.setOption(option, true);
    },
    watch: {
      data: {
        handler(newVal, oldVal) {
          console.log(newVal)
        },
        deep: true //对象内部属性的监听，关键。
      }
    }
  }
</script>


