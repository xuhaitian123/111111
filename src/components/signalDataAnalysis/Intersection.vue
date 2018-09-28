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
        return{
          Intersection: undefined,
        }
      },
      mounted(){
this.init()
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
              data: ['仓丰路','仓盛路','槐安路','裕华路','中山路','槐北路'],
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
                data: [[0,10],[1,20],[2,30],[3,40],[4,50],[5,60]]
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
                data: [[0,100],[1,200],[2,300],[3,400],[4,500],[5,600]]
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
          option_one.yAxis[1].interval = Math.max(10,20,30,40,50,60)/6
          option_one.yAxis[0].interval = Math.max(100,200,300,400,500,600)/6
        //   let intersection_data = this.intersection_data;
        //   let item = this.trafficLightOptimizeAlarmTimes;
        //   let road_name = intersection_data.after.map(function (item) {
        //     return item.node_name
        //   });
        //   road_name.forEach(function (data) {
        //     option_one.xAxis.data.push (data)
        //   })
        //   intersection_data.before.forEach(function (data) {
        //     option_one.series[0].data.push(data)
        //   })
        //   intersection_data.after.forEach(function (data) {
        //     option_one.series[1].data.push(data)
        //   })
        //   item.before.forEach(function (data) {
        //     option_one.series[2].data.push(data)
        //   })
        //   item.after.forEach(function (data) {
        //     option_one.series[3].data.push(data)
        //   })
        }
        },

    }
</script>

<style scoped>

</style>
