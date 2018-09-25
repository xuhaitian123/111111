<template>
  <div id="data_four" style="height: 100%;width: 100%"></div>
</template>

<script>
    export default {
        name: "flow-rate",
      props:{
        flow_rate_data:Array,
        speed_data:Array
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
              data: [],
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
          this.data_processing();
          this.flowRate = this.$echarts.init(document.getElementById('data_four'));
          this.flowRate.setOption(option_four);
        },
        data_processing(){
          var road_speed_number = this.speed_data.map(function (data) {
            return {month:parseInt(data.month.substring(4,6)),value:data.value}
          })
          var flow_number = this.flow_rate_data.map(function (item) {
            return {month:parseInt(item.month.substring(4,6)),value:item.value}
          })
          var month = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'];

          for( var i = 0;i<road_speed_number.length;i++){
            option_four.xAxis.data.push(month[road_speed_number[i].month-1])
          }
          road_speed_number.forEach(function (data) {
            option_four.series[1].data.push(data)
          })
          flow_number.forEach(function (data) {
            option_four.series[0].data.push(data)
          })
        }
      },
    }
</script>

<style scoped>

</style>
