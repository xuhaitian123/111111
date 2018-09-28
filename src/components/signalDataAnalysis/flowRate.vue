<template>
  <div id="data_four" style="height: 100%;width: 100%"></div>
</template>

<script>
    export default {
        name: "flow-rate",
      props:{
        flow_rate_data:Object,
        speed_data:Object
      },
      data(){
          return{
            flowRate: undefined,
          }
      },
      mounted(){
// this.init()
      },
      watch: {
        speed_data(){
          this.init()
        }
      },
      methods:{
        init(){
          let option_four =  {
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              itemGap:70,
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
                axisLabel: {
                  formatter: '{value}',
                  color: '#c9c9cc',
                  margin:10
                },
                position: 'right',
                interval:'',
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
                position: 'left',
                interval:'',
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
          this.data_processing(option_four);
          this.flowRate = this.$echarts.init(document.getElementById('data_four'));
          this.flowRate.setOption(option_four);
        },
        data_processing(option_four){
          let road_speed_number = this.speed_data.map(function (item) {
            return {month:parseInt(item.month.substring(4,6)),value:item.value}
          })
          let flow_number = this.flow_rate_data.map(function (item) {
            return {month:parseInt(item.month.substring(4,6)),value:item.value}
          })
          let month = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'];
          for( let i = 0;i<flow_number.length;i++){
            option_four.xAxis[0].data.push(month[flow_number[i].month-1])
          }
          road_speed_number.forEach(function (data,index) {
            option_four.series[1].data.push([index,data.value])
          })
          flow_number.forEach(function (data,index) {
            option_four.series[0].data.push([index,data.value])
          })
          option_four.yAxis[1].interval =this.get_max_value(flow_number,100000)/6;
          option_four.yAxis[0].interval =this.get_max_value(road_speed_number,100)/6

        },
        get_max_value(number, test){
          let y_value = [];
          number.forEach(function (data) {
            y_value.push(data.value)
          })
          var max_value = Math.max.apply(null,y_value)
          console.log(max_value)
          var max_value_int = Math.ceil(max_value/test)
          console.log(max_value_int)
          var max_value_val = max_value_int*test
          return max_value_val
        }
      },
    }
</script>

<style scoped>

</style>
