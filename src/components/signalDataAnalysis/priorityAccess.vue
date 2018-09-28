<template>
    <div id = 'main' style="height: 100%;width: 100%"></div>
</template>

<script>
    export default {
        name: "priority-access",
      props:{
        priority_access_data:Array
      },
      data(){
          return{
            priority:undefined
          }
      },
      methods:{
       init(){
        let option = {
          legend:{
            data:{
              name:'平均车速',
              bottom:100
            },
            textStyle:{
              color: '#fff',
              fontSize:14
            }
          },
          radar: {
            indicator: [
              {name: '公交车辆', max:100 },
              {name: '警务车辆', max: 100},
              {name: '救援车辆', max: 100},
              {name: '领导外宾车辆', max:100},
              {name: '社会车辆', max: 200}
            ],
            shape: 'circle',
            splitNumber: 5,
            name:{
              textStyle:{
                color:'#c9c9cc'
              }
            },
            splitLine:{
              lineStyle:{
                color:'#fff'
         }
            },
            splitArea: {
              show: false
            },

          },
          series:[
            {
              name:'平均车速',
              labal:{
                show:true
              },
              type:'radar',
              symbol: 'none',
              data:[[82,63,44,52,94]],
              itemStyle: {
                normal: {
                  color: '#FADE63'
                }
              },
              areaStyle: {
                normal: {
                  opacity: 0.2
                }
              }
            }
          ]
        }
         this.priority = this.$echarts.init(document.getElementById('main'));
         this.priority.setOption(option)
       },
       },

      watch:{
        priority_access_data(){
          this.init()
        }
      }
    }
</script>

<style scoped>

</style>
