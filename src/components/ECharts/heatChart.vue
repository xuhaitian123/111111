<template>
  <div class="heatChart">
    <div :id="id" class="heatChart-canvas"></div>
    <div class="heatChart-title" >
      <div v-for="name in linksName"  :style="{height: (100/linksName.length)+'%'}">
        {{name}}
      </div>
    </div>
  </div>

</template>
<style>
  .heatChart{
    height: 100%;
    width: 100%;
    position: relative;
  }
  .heatChart-title{
    position: relative;
    z-index: 99;
    width: 90px;
    margin: auto;
    top: 20px;
    height: 84%;
    background: #333643;
    text-align: center;
    line-height: 40px;
  }
  .heatChart-canvas{
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;

  }
</style>

<script>
  export default {
    name: "pie-doughnut-item",
    props: {
      id: String,
      direction: {
        type: String,
        default: 'left'
      },
      heat_data: {
        type: Array,
        default: []
      },
      linksName:{
        type:Array,
        default:[]

      },
    },
    data() {
      return {}
    },
    watch:{
      heat_data(){
        this.init()
      }
    },
    mounted(){
      this.initDate()
    },

    methods:{
      initDate(){
        setTimeout(()=>{
          var i = 0;
          var data  = []
          for(var i=0;i<1;i++){
            data.push([i,''])
          }
          this.heat_data =  [data,data.map(item=>item)]
        },200)


      },
      init(){
        if(this.heat_data.length ===0) return
        let myChart = this.$echarts.init(document.getElementById(this.id));
        let i = 1;
        let data = [];
        var linkNumber = this.heat_data[0].map(()=>1) ;
        let weeks = [0];

        linkNumber.forEach((item,index)=>{

          data.push([0, index+1, 0])
        })
        do {
          if(i<=288 ){

            linkNumber.forEach((item,index)=>{
              // console.log(index)
              data.push([i, index+1, this.heat_data[0][index][i]])
            })
            // data.push([i, -1, ''])
            // data.push([i, 1, ''])
            // data.push([i, 2, ''])
            // data.push([i, 3, ''])
            // data.push([i, 4, ''])
            // data.push([i, 5, ''])
          }else  if((i >= 430 && i<=718 )){
            linkNumber.forEach((item,index)=>{
              data.push([i, index+1, this.heat_data[1][index][i-430]])
            })
          }else{
            linkNumber.forEach((item,index)=>{
              data.push([i, index+1, 0])
            })
          }
          weeks.push(i)
          i++
        } while (i <= 718)
        let options = {
          tooltip: {
            position: 'top',
            showContent: false
          },
          animation: false,
          grid: {
            height: '400px',
            width: "440px",
            y: '10%',
            left: "30px",
            top: "23px"
          },
          xAxis: {
            type: 'category',
            // data: weeks,
            left: "0",
            position: 'top',
            axisLabel: {
              showMinLabel: true,
              showMaxLabel: true,
              interval: 71,
              show: true,
              textStyle: {
                fontSize: '8'
              },
              formatter: function (value, index) {

                if(value<=288 || (value >= 430 && value<=718 )){
                  if(value<=288){
                    return  parseInt((value)/72)*6+":00" ;
                  }else{
                    return  parseInt((value-430)/72)*6+":00" ;
                  }

                }else{
                  return ''
                }

              }
            },
            splitArea: {
              show: true,
              interval: 0,
            }
          },
          yAxis: {
            type: 'category',
            startValue:0,
            axisLabel: {
              show: false,
            },
          },
          visualMap: {
            min: 0,
            max: 5 ,
            calculable: false,
            orient: 'horizontal',
            inRange: {
              color: ['#B7C3C4', '#C89498', '#C44E83']
            },

            symbolSize: '1',
            itemWidth: 10,
            itemHeight: 440,
            left: '5%',
            bottom: '5%',
          },
          series: [{
            name: 'Punch Card',
            type: 'heatmap',
            data: data,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowColor: 'rgba(255,255,255,255)'
              }
            }
          }],
          textStyle: {
            color: '#c9c9cc',
          }
        };

        myChart.setOption(options, true);
      }


    },
  }
</script>

<style scoped>
  .color {
    color: rgb(89, 91, 102);
  }

</style>
