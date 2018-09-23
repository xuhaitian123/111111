<template>
  <div :id="id" style="height: 100%;width: 100%"></div>
</template>

<script>
  export default {
    name: "pie-doughnut-item",
    props: {
      id: String,
      direction: {
        type: String,
        default: 'left'
      },
      rate: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {}
    },
    mounted() {

      let myChart = this.$echarts.init(document.getElementById(this.id));
      let maxRate = 100;

      let option = {

        gird: {
          width: 50,
          height: 50,
        },
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['70%', '90%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
              },
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: this.rate,
                name: '',
                hoverAnimation: false,
                itemStyle: {
                  normal: {
                    color: "#43AF7E"
                  }
                }
              },
              {value: maxRate - this.rate, name: '', hoverAnimation: false,
                itemStyle: {
                  normal: {
                    color: "#595B66"
                  }
                }}
            ]
          }
        ]
      };

      myChart.setOption(option, true);
    },
  }
</script>

<style scoped>
  .color {
    color: rgb(89,91,102);
  }

</style>
