<template>
  <div class="contianer">
    <Area></Area>
    <div class="contianer_body">
      <div class="contianer_body_title">
        <div class="title">
          <img class="toLeft" src="../../../static/map/toLeft.png"/><span class="title_text">信号灯优化前后数据</span>
        </div>
      </div>
      <div class="contianer_body_layout">
        <div class="score">
          <div class="score_title">
            <div class="score_title_text">优化前后路网总评分/路网各类路况占比</div>
          </div>
          <div class="score_body_area"></div>
        </div>
        <div class="alarmData">
          <div class="alarmData_title">
            <div class="alarmData_title_text">路网拥堵报警次数月变化趋势</div>
          </div>
          <div class="alarmData_body_area ">
            <div id="data" style="height: 100%;width: 100%"></div>
          </div>
        </div>
        <div class="IntersectionData">
          <div class="IntersectionData_title">
            <div class="IntersectionData_title_text">各交叉口平均延误水平与拥堵报警次数</div>
          </div>
          <div class="IntersectionData_body_area">
            <div id="data_three" style="height: 100%;width: 100%"></div>
          </div>
        </div>
        <div class="flowRate">
          <div class="flowRate_title">
            <div class="flowRate_title_text">路网流量、平均车速月变化趋势</div>
          </div>
          <div class="flowRate_body_area"></div>
        </div>
        <div class="goodSpeed">
          <div class="goodSpeed_title">
            <div class="goodSpeed_title_text">优化前后平均车速日变化趋势</div>
          </div>
          <div class="goodSpeed_body_area">

          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<style scoped>
  .contianer_body {
    padding: 10px 10px;
    height: 935px;
    width: 1640px;
  }

  .contianer_body_title {
    background: #333643;
    height: 40px;
  }

  .title {
    line-height: 40px;
    width: 250px;
    display: flex;
    align-items: center;
  }

  .title_text {
    font-size: 19px;
    display: block;
    margin-left: 20px;
  }

  .toLeft {
    height: 19px;
    margin-left: 30px;
  }

  .contianer_body_layout {
    background: #272836;
    padding: 10px 10px;
    display: flex;
    flex-wrap: wrap;
  }

  .score,
  .alarmData,
  .IntersectionData {
    height: 420px;
    width: 530px;
    margin-right: 10px;
  }

  .flowRate {
    height: 420px;
    width: 530px;
    margin-right: 10px;
    margin-top: 10px;
  }

  .goodSpeed {
    height: 420px;
    width: 1070px;
    margin-right: 10px;
    margin-top: 10px;
  }

  .score_title,
  .alarmData_title,
  .IntersectionData_title,
  .flowRate_title,
  .goodSpeed_title {
    background: #1D1D2C;
    height: 30px;
    display: flex;
    align-items: center;
  }

  .score_title_text,
  .alarmData_title_text,
  .IntersectionData_title_text,
  .flowRate_title_text,
  .goodSpeed_title_text {
    width: 320px;
    margin-left: 20px;
    font-size: 16px;
  }

  .score_body_area,
  .alarmData_body_area,
  .IntersectionData_body_area,
  .flowRate_body_area,
  .goodSpeed_body_area {
    height: 390px;
    background: #333643;
  }

</style>

<script>
  import Area from '../../components/Area/Area'
  import MixLineBarItem from '../../components/ECharts/MixLineBarItem'

  export default {
    name: "DataAnalyse",
    mounted() {
      this.init();
    },
    data() {
      return {
        myChart: undefined,
        Intersection:undefined,
      }
    },//
    methods: {
      init() {
        this.myChart = this.$echarts.init(document.getElementById('data'));
        this.Intersection = this.$echarts.init(document.getElementById('data_three'));
        let options = {
          legend: {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross'
              }
            },
            data: [{
              name: '优化前',
              icon: 'square',
              textStyle: {
                color: '#c9c9cc',
                fontSize: 10,
              },
            },
              {
                name: '优化后',
                icon: 'square',
                textStyle: {
                  color: '#c9c9cc',
                  fontSize: 10,
                }
              },
            ],
            top: 30
          },
          grid: {
            left: 100
          },
          xAxis: {
            type: 'value',
            color: '#c9c9cc',
            splitLine: {
              show: false
            },
            axisLine: {
              lineStyle: {
                color: '#595B66'
              },
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: "true",
              color: '#c9c9cc',
              margin: 20

            }
          },
          yAxis: {
            type: 'category',
            data: ['五月', '四月', '三月', '二月', '一月', '八月', '九月', '十月', '十一月', '十二月'],
            margin: 30,
            axisLine: {
              lineStyle: {
                color: '#595B66'
              },
            },
            axisLabel: {
              color: '#c9c9cc',
              margin: 20
            },
            axisTick: {
              show: false,
            },


          },
          series: [
            {
              name: '优化前',
              type: 'bar',
              color: '#e05f9a',
              barWidth: '12',
              data: [[1000, '八月'], [800, '九月'], [700, '十月'], [600, '十一月'], [2000, '十二月']]
            },
            {
              name: '优化后',
              type: 'bar',
              barGap: '-100%',
              color: '#02d1d1',
              barWidth: '12',
              data: [[500, '一月'], [100, '二月'], [200, '三月'], [500, '四月'], [300, '五月']]
            }
          ]

        };
        let option_one = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          legend: {
            data:['优化前延误', '优化后延误', '优化前报警', '优化后报警'],
          },
          grid: {
            left: 50
          },
          xAxis:[{
            type:'category',
            data:['人民路','厦门路','南京路','沈阳路','大连路','普惠路','外环路','江苏路'],
            axisLine: {
              lineStyle: {
                color: '#595B66'
              },
            },
            axisLabel: {
              color: '#c9c9cc',
              margin:15
            },
            axisTick: {
              show: false,
            },

          }],
          yAxis: [{
            type: 'value',
            show:true,
            min:0,
            max:120,
            position:'right',
          },
            {
              type: 'value',
              show:true,
              min:0,
              max:30,
              interval: 5,
              position:'left',
              // nameTextStyle: {
              //   color: '#c9c9cc',
              //   align: 'center',
              // },
            }],
          series:[
            {
              type:'bar',
              color: '#e05f9a',
              yAxisIndex: 1,
              data:[['人民路',12],['厦门路',11],['南京路',15],['沈阳路',16],['大连路',19],['普惠路',10],['外环路',11],['江苏路',11],]
            },
            {
              type:'bar',
              color: '#eacc36',
              yAxisIndex: 1,//
              data:[['人民路',30],['厦门路',13],['南京路',7],['沈阳路',8],['大连路',9],['普惠路',1],['外环路',10],['江苏路',20],]
            },
            {
              type:'line',
              yAxisIndex: 0,
              symbol: 'circle',
              color: '#af69c9',
              data:[['人民路',30],['厦门路',89],['南京路',77],['沈阳路',66],['大连路',88],['普惠路',99],['外环路',89],['江苏路',78],]
            },
            {
              type:'line',
              yAxisIndex: 0,
              symbol: 'circle',
              color: '#02d1d1',
              data:[['人民路',100],['厦门路',70],['南京路',60],['沈阳路',100],['大连路',60],['普惠路',90],['外环路',80],['江苏路',60],]
            },
          ]


        };
        this.myChart.setOption(options);
        this.Intersection.setOption(option_one);
      }

    },
    components: {
      Area,
      MixLineBarItem
    },
  }
</script>
