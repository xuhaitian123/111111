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
            radius: ['60%', '90%'],
            hoverAnimation: false,
            avoidLabelOverlap: false,
            data: [
              {value: this.data.value, name: '', itemStyle: {color: '#47ad7d'}},
              {value: 100-this.data.value, name: '', itemStyle: {color: '#525461'}},
            ]
          }
        ]
      };
      console.log(this.data)
      chart.setOption(option, true);
    },
    watch: {
      data: {
        handler(newVal, oldVal) {
          console.log(newVal)
          // let chart = this.$echarts.getInstanceByDom(document.getElementById(this.id));
          // let option = chart.getOption();
          // option.series[0].data = [
          //   {value: newVal, name: '', itemStyle: {color: '#47ad7d'}},
          //   {value: 100 - newVal, name: '', itemStyle: {color: '#525461'}},
          // ];
          // console.log(option)
          // chart.setOption(option);

        },
        deep: true //对象内部属性的监听，关键。
      }
    }
  }
</script>


