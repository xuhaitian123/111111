<template>
  <div :id="id" style="height: 100%"></div>
</template>

<script>
  export default {
    name: "pie-doughnut-item",
    props: {
      id: String,
      direction: {
        type: String,
        default: 'left'
      }
    },
    data() {
      return {}
    },
    mounted() {

      let myChart = this.$echarts.init(document.getElementById(this.id));

      let option = {
        // tooltip: {
        //   trigger: 'item',
        //   formatter: "{a} <br/>{b}: {c} ({d}%)"
        // },
        gird: {
          width: 50,
          height: 50,
        },
        // title: {
        //   text: '57%',
        //   textStyle: {
        //     fontSize: 12,
        //     color: '#fff'
        //   },
        //   x: this.direction,
        //   y: 'center'
        // },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['70%', '90%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {value: 335, name: '直接访问'},
              {value: 310, name: '邮件营销'},
              {value: 234, name: '联盟广告'},
            ]
          }
        ]
      };

      myChart.setOption(option, true);
    },
  }
</script>

<style scoped>

</style>
