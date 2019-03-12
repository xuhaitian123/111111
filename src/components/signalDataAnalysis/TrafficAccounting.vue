<template>
  <div :id="id" style="height: 100%"></div>
</template>

<script>
  export default {
    name: "pie-doughnut-item",
    props: {
      id: String,
      title: String,
      data: Object,
    },
    data() {
      return {
        myChart: undefined,
      }
    },
    mounted() {
      this.myChart = this.$echarts.init(document.getElementById(this.id));
      let option = {};
      option = {
    backgroundColor: '#2c343c',

    title: {
        text: 'Customized Pie',
        left: 'center',
        top: 20,
        textStyle: {
            color: '#ccc'
        }
    },

    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },

    visualMap: {
        show: false,
        min: 80,
        max: 600,
        inRange: {
            colorLightness: [0, 1]
        }
    },
    series : [
        {
            name:'访问来源',
            type:'pie',
            radius : '55%',
            center: ['50%', '50%'],
            data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:274, name:'联盟广告'},
                {value:235, name:'视频广告'},
                {value:400, name:'搜索引擎'}
            ].sort(function (a, b) { return a.value - b.value; }),
            roseType: 'radius',
            label: {
                normal: {
                    textStyle: {
                        color: 'rgba(255, 255, 255, 0.3)'
                    }
                }
            },
            labelLine: {
                normal: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.3)'
                    },
                    smooth: 0.2,
                    length: 10,
                    length2: 20
                }
            },
            itemStyle: {
                normal: {
                    color: '#c23531',
                    shadowBlur: 200,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },

            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
                return Math.random() * 200;
            }
        }
    ]
};
      this.myChart.setOption(option, true);
    },
    watch: {
      data: {
        handler(newVal, oldVal) {
          if (this.myChart) {
            let option = this.myChart.getOption();
            option.series[0].data = [
              {value: newVal['一级'], name: '通畅', itemStyle: {color: '#43AF7E'}},
              {value: newVal['二级'], name: '正常', itemStyle: {color: '#ff8539'}},
              {value: newVal['三级'], name: '拥堵', itemStyle: {color: '#b14671'}}
            ];
            console.log(option.series[0].data)
            this.myChart.setOption(option);
          }
        },
        deep: true //对象内部属性的监听，关键。
      }
    }
  }
</script>

<style scoped>

</style>
