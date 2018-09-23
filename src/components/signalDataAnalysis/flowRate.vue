<template>
  <div id="data_four" style="height: 100%;width: 100%"></div>
</template>

<script>
    export default {
        name: "flow-rate",
      props:{
        flow_rate_data:Array,
      },
      data(){
          return{}
      },
      mounted(){
          this.init()
      },
      methods:{
        init(){
          let option_four = {
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: [{
                name: '流量',
                textStyle: {
                  color: '#c9c9cc',
                  fontSize: 10,
                }
              },
                {
                  name: '平均车速',
                  textStyle: {
                    color: '#c9c9cc',
                    fontSize: 10,
                  }
                },]
            },
            xAxis: [{
              type: 'category',
              data: ['一月', '二月', '三月', '四月', '五月', '六月'],
              axisLine: {
                lineStyle: {
                  color: '#595B66'
                },
              },
              axisLabel: {
                color: '#c9c9cc',
                margin: 30
              },
              axisTick: {
                show: false,
              },
            }],
            yAxis: [
              {
                type: 'value',
                show: true,
                min: 30,
                max: 60,
                axisLabel: {
                  formatter: '{value}',
                  color: '#c9c9cc',
                  margin:10
                },
                position: 'right',
                splitLine: {
                  show: true,
                  interval: 'auto',//
                  lineStyle: {
                    color: ['#595B66']
                  }
                },
              },
              {
                type: 'value',
                show: true,
                min: 20000,
                max: 26000,
                position: 'left',
                axisLabel: {
                  formatter: '{value}',
                  color: '#c9c9cc'//
                },
                splitLine: {
                  show: true,
                  interval: 'auto',//
                  lineStyle: {
                    color: ['#595B66']
                  }
                },
              }],
            series:[
              {
                name: '流量',
                type: 'line',
                color: '#02d1d1',
                symbol: 'circle',
                yAxisIndex: 1,
                data: []
              },
              {
                name: '平均车速',
                type: 'line',
                color: '#eacc36',
                symbol: 'circle',
                yAxisIndex: 0,
                data:[]
              },
            ]
          };
        }
      },
    }
</script>

<style scoped>

</style>
