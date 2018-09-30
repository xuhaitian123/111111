<template>
  <div class="trendLine">
    <div :id="id" class="trendLine-canvas"></div>

  </div>

</template>
<style>
  .trendLine{
    height: 100%;
    width: 100%;
    position: relative;
  }

  .trendLine-canvas{
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;

  }
</style>

<script>
  export default {
    props: {
      id: String,
      tranelineInfo: {
        type: Array,
        default: function(){
          return []
        },
      },
      hour_data_picker_node:''
    },
    data() {
      return {
        tranelineData:[],
        max:1000,

      }
    },
    watch:{
      tranelineInfo(){
        this.tranelineData = [];
        this.nodeNameList = [];
        var colorList =['#D54F82','#47AD7E']
        if(this.tranelineInfo.length === 0) return;
        var tranelineInfo = JSON.parse(JSON.stringify(this.tranelineInfo));
        tranelineInfo.forEach((item,index)=>{
            this.nodeNameList.push(item.name);
            if((index+1)%2 === 0){
              this.nodeNameList.push('')
            }
            this.tranelineData.push({name: item.name, type:'line', symbol: 'circle',data: item.data,lineStyle:{color: colorList[index]}})
        })
        this.init()
      }
    },
    methods:{
      init(){
        let myChart = this.$echarts.init(document.getElementById(this.id));

        let options = {
          tooltip: {
            trigger: 'axis',
            showContent: false
          },
          animation: false,
          legend: {
            data: this.nodeNameList ,
            x: 'right',//图例说明文字设置
            y:'50%',
            textStyle: {
              "color": "#7d7d7d",
            },
            // itemGap: 80
            itemWidth: 40,
            itemHeight:15,
            itemGap: 20
            // padding: 10,

          },
          grid: {
            height: '70%',
            width: "65%",
            y: '10%',
            left:'4%',
            top: "15%"
          },
          xAxis: {
            type: 'value',
            boundaryGap: false,
            max:288,
            // data:[1,2,3,4,5,6,7,8,9],
            splitLine:{show:false},
            interval: 71,
            axisLabel: {
              show: true,
              textStyle: {
                fontSize: '10',
                "color": "#fff",
              },
              formatter: function (value, index) {
                console.log(value)
                return Math.round((value)/72)*6+":00" ;
              },
            },

          },
          yAxis: {
            type: 'value',
            show:true,
            min:0,
            max:this.max,
            // data:[1,2,3,4,5,6,7,8,9],
            axisTick:{
              show: true
            },
            axisLabel: {
              show: true,
              textStyle: {
                fontSize: '10',
                "color": "#fff",
              },
              formatter: function (value, index) {
                return value
              },
            }
          },
          series: this.tranelineData,
        };

        myChart.setOption(options, true);
        this.max = undefined
      }

    },
    mounted() {
      setTimeout(()=>{
        var tranelineInfo = [];
        for(var i =0;i <288; i++){
          tranelineInfo.push([i+1,""])
        }
        // this.max = 2000;
        this.tranelineInfo = [{name:'',data:tranelineInfo}]

      },500)

    },
  }
</script>

<style scoped>
  /*47AD7E*/
  D54F82
  .color {
    color: rgb(213, 79, 130);
  }
</style>

