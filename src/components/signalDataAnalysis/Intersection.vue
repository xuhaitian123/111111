<template>
  <div id="data_three" style="height: 100%;width: 100%"></div>
</template>

<script>
    export default {
        name: "intersection",
      props:{
        intersection_data:Array,
        trafficLightOptimizeAlarmTimes:Array
      },
      data(){
        return{}
      },
      mounted(){
        this.init()
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
              left: 50,
              bottom:100
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
                nameGap: '35',
                nameRotate: 270,
                type: 'value',
                show: true,
                min: 0,
                max: 1000,
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
                nameGap: '30',
                nameRotate: 270,
                min:0,
                max:100,
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
          this.data_processing();
          this.Intersection = this.$echarts.init(document.getElementById('data_three'));
          this.Intersection.setOption(option_one);
        }
        },
      data_processing(){
        var data = intersection_data;
        var item = trafficLightOptimizeAlarmTimes;
        var road_name = data.after.map(function (data) {
          return data.node_name
        });
        road_name.forEach(function (data) {
          option_one.xAxis.data.push (data)
        })
        data.before.forEach(function (data) {
          option_one.series[0].data.push(data)
        })
        data.after.forEach(function (data) {
          option_one.series[1].data.push(data)
        })
        item.data.before.forEach(function (data) {
          option_one.series[2].data.push(data)
        })
        item.data.after.forEach(function (data) {
          option_one.series[3].data.push(data)
        })

      }
    }
</script>

<style scoped>

</style>
