<template>
  <div id="data_three" style="height: 100%;width: 100%"></div>
</template>

<script>
    export default {
        name: "intersection",
      props:{
        intersection_data:Object,
        trafficLightOptimizeAlarmTimes:Object
      },
      data(){
        return{
          Intersection: undefined,
        }
      },
      mounted(){
// this.init()
      },
      watch: {
        intersection_data() {
          this.init()
        },
        trafficLightOptimizeAlarmTimes(){
          this.init()
        }
      },
      methods:{
        init()
        {
          let option_one = {
            tooltip: {
              trigger: 'axis'
            },
            legend: {

              data: [{
                name: '优化前延误',
                icon: 'square',
                textStyle: {
                  color: '#c9c9cc',
                  fontSize: 10,
                },
              },
                {
                  name: '优化后延误',
                  icon: 'square',
                  textStyle: {
                    color: '#c9c9cc',
                    fontSize: 10,
                  }
                },
                {
                  name: '优化前报警',
                  textStyle: {
                    color: '#c9c9cc',
                    fontSize: 10,
                  },
                },
                {
                  name: '优化后报警',
                  textStyle: {
                    color: '#c9c9cc',
                    fontSize: 10,
                  }
                },
              ],
            },
            grid: {
              left: 70,
              bottom:80,
              width:380,

            },
            xAxis: {
              type: 'category',
              data: [],
              axisLine: {
                lineStyle: {
                  color: '#595B66'
                },
              },
              axisLabel: {
                color: '#c9c9cc',
                margin: 15,
                rotate:-40
              },
              axisTick: {
                show: false,
              },

            },
            yAxis: [
              {
                name: "报警次数",
                nameTextStyle: {
                  color: "#c9c9cc"
                },
                nameLocation: "center",
                nameGap: '45',
                nameRotate: 270,
                type: 'value',
                interval:'',
                show: true,
                color: '#fff',
                axisLabel: {
                  formatter: '{value}',
                  color: '#c9c9cc'
                },
                splitLine: {
                  show: true,
                  lineStyle: {
                    color: ['#c9c9cc']
                  }
                },
                position: 'right',

              },
              {
                name: '平均延误时间(s)',
                nameTextStyle: {
                  color: "#c9c9cc",
                  align: 'left'
                },
                nameLocation: "center",
                nameGap: '35',
                nameRotate: 270,
                interval:'',
                type: 'value',
                show: true,
                position: 'left',
                axisLabel: {
                  formatter: '{value}',
                  color: '#c9c9cc'
                },
                splitLine: {
                  show: true,
                  lineStyle: {
                    color: ['#c9c9cc']
                  }
                },

              }],
            series: [
              {
                name: '优化前延误',
                type: 'bar',
                color: '#e05f9a',
                yAxisIndex: 1,
                data: []
              },
              {
                name: '优化后延误',
                type: 'bar',
                color: '#eacc36',
                barWidth:10,
                yAxisIndex: 1,//
                data: []
              },
              {
                name: '优化前报警',
                type: 'line',
                yAxisIndex: 0,
                symbol: 'circle',
                color: '#af69c9',
                data: []
              },
              {
                name: '优化后报警',
                type: 'line',
                yAxisIndex: 0,
                symbol: 'circle',
                color: '#02d1d1',
                data: []
              },
            ]
          };
          this.data_processing(option_one);
          this.Intersection = this.$echarts.init(document.getElementById('data_three'));
          this.Intersection.setOption(option_one);
        },
        data_processing(option_one){
          let intersection_data = this.intersection_data;
          let item = this.trafficLightOptimizeAlarmTimes;
          let road_name = intersection_data.after.map(function (item) {
            return item.name
          });
          road_name.forEach(function (data) {
            option_one.xAxis.data.push (data)
          })
          intersection_data.before.forEach(function (data,index) {
            option_one.series[0].data.push([index,data.value])
          })
          intersection_data.after.forEach(function (data,index) {
            option_one.series[1].data.push([index,data.value])
          })
          item.before.forEach(function (data,index) {
            option_one.series[2].data.push([index,data.value])
          })
          item.after.forEach(function (data,index) {
            option_one.series[3].data.push([index,data.value])
          });

          option_one.yAxis[1].interval = Math.max.apply(null,y_value)/6
          option_one.yAxis[0].interval = Math.max.apply(null,y_y_value)/6
        },
        get_max_value(number, test){
          let y_value = [];
          let y_y_value = [];
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
