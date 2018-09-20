<template>
  <div :id="id" style="height: 100%"></div>
</template>

<script>
  export default {
    name: "pie-doughnut-item",
    props: {
      id: String,
      title: String,
    },
    data() {
      return {}
    },
    mounted() {
      let myChart = this.$echarts.init(document.getElementById(this.id));
      let option = {};

      option = {
        title: {
          text: this.title,
          x: '28%',
          y: 'center',
          textStyle: {
            color: '#7d7d7d',
            fontSize: 20
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          x: '80%',
          y: 'center',
          itemGap: 5,
          padding: 0,
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            color: "#fff"
          },
          data: [
            {
              "name": "通畅",
              "icon": "circle",
              "textStyle": {
                "color": "#7d7d7d",
              }
            },
            {
              "name": "正常",
              "icon": "circle",
              "textStyle": {
                "color": "#7d7d7d",
              }
            },
            {
              "name": "拥堵",
              "icon": "circle",
              "textStyle": {
                "color": "#7d7d7d",

              }
            }]
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            center: ['40%', '50%'],
            radius: ['60%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position:'inside'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '12',
                }
              }
            },
            data: [
              {value: 335, name: '通畅', itemStyle: {color: '#5ebfba'}},
              {value: 310, name: '正常', itemStyle: {color: '#ff8539'}},
              {value: 234, name: '拥堵', itemStyle: {color: '#b14671'}}
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
