<template>
    <div id = 'main' style="height: 390px;width: 530px;"></div>
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
      mounted(){
        // this.init()
      },
      methods:{
       init(){
        let option = {
          grid: {
            height: '390px',
            width: "530px",
          },
          legend:{
            show:false,
            data:[
              {
                name:'平均车速'
              }
            ],
            bottom:10,
            itemGap:100
          },
          radar:{
            indicator: [],
            radius: 100,
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
            axisLabel:{
              show:false,
              color:'red'
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
              data:[],
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
         this.data_processing(option)
         console.log(option)
         this.priority = this.$echarts.init(document.getElementById('main'));
         this.priority.setOption(option)
       },
        data_processing(option){
          var sort_out_data = this.priority_access_data;
          var indicator =sort_out_data.map(function (data) {
            return {name:data.name,max:150}
          })
          option.radar.indicator = indicator;
          var sort_out_value = sort_out_data.map(function (data) {
            return data.value
          })
          option.series[0].data.push(sort_out_value)
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
