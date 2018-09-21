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
          <div class="alarmData_body_area " style="padding-top: 44px;box-sizing: border-box">
            <div id="data" style="height: 100%;width: 100%"></div>
          </div>
        </div>
        <div class="IntersectionData">
          <div class="IntersectionData_title">
            <div class="IntersectionData_title_text">各交叉口平均延误水平与拥堵报警次数</div>
          </div>
          <div class="IntersectionData_body_area" style="padding-top: 44px;box-sizing: border-box">
            <div id="data_three" style="height: 100%;width: 100%"></div>
          </div>
        </div>
        <div class="flowRate">
          <div class="flowRate_title">
            <div class="flowRate_title_text">路网流量、平均车速月变化趋势</div>
          </div>
          <div class="flowRate_body_area" style="padding: 35px 20px 0 30px;box-sizing: border-box">
          <div id="data_four" style="height: 100%;width: 100%"></div>
          </div>
        </div>
        <div class="goodSpeed">
          <div class="goodSpeed_title">
            <div class="goodSpeed_title_text">优化前后平均车速日变化趋势</div>
          </div>
          <div class="goodSpeed_body_area" style="padding-top: 35px;box-sizing: border-box">
            <div id="data_five" style="height: 100%;width: 100%"></div>
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
        Intersection: undefined,
        flowRate: undefined,
        goodSpeed: undefined
      }
    },//
    methods: {
      init() {
        this.myChart = this.$echarts.init(document.getElementById('data'));
        this.Intersection = this.$echarts.init(document.getElementById('data_three'));
        this.flowRate = this.$echarts.init(document.getElementById('data_four'));
        this.goodSpeed = this.$echarts.init(document.getElementById('data_five'));
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
            left: 50
          },
          xAxis: [{
            type: 'category',
            data: ['人民路', '厦门路', '南京路', '沈阳路', '大连路', '普惠路', '外环路', '江苏路'],
            axisLine: {
              lineStyle: {
                color: '#595B66'
              },
            },
            axisLabel: {
              color: '#c9c9cc',
              margin: 15
            },
            axisTick: {
              show: false,
            },

          }],
          yAxis: [
            {
              name: "报警次数",
              nameTextStyle: {
                color: "#c9c9cc"
              },
              nameLocation: "center",
              nameGap: '30',
              nameRotate: 270,
              type: 'value',
              show: true,
              min: 0,
              max: 120,
              color: '#fff',
              axisLabel: {
                formatter: '{value}',
                color: '#c9c9cc'
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
              type: 'value',
              show: true,
              position: 'left',
              axisLabel: {
                formatter: '{value}',
                color: '#c9c9cc'
              },
              splitLine: {
                show: true,
                interval: 'auto',
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
              data: [['人民路', 12], ['厦门路', 11], ['南京路', 15], ['沈阳路', 16], ['大连路', 19], ['普惠路', 10], ['外环路', 11], ['江苏路', 11],]
            },
            {
              name: '优化后延误',
              type: 'bar',
              color: '#eacc36',
              yAxisIndex: 1,//
              data: [['人民路', 30], ['厦门路', 13], ['南京路', 7], ['沈阳路', 8], ['大连路', 9], ['普惠路', 1], ['外环路', 10], ['江苏路', 20],]
            },
            {
              name: '优化前报警',
              type: 'line',
              yAxisIndex: 0,
              symbol: 'circle',
              color: '#af69c9',
              data: [['人民路', 30], ['厦门路', 89], ['南京路', 77], ['沈阳路', 66], ['大连路', 88], ['普惠路', 99], ['外环路', 89], ['江苏路', 78],]
            },
            {
              name: '优化后报警',
              type: 'line',
              yAxisIndex: 0,
              symbol: 'circle',
              color: '#02d1d1',
              data: [['人民路', 100], ['厦门路', 70], ['南京路', 60], ['沈阳路', 100], ['大连路', 60], ['普惠路', 90], ['外环路', 80], ['江苏路', 60],]
            },
          ]
        };
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
            data: ['一月', '二月', '三月', '四月', '五月', '六月'],
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
              data: [20003,20000,23000,24000,25000,23000]
            },
            {
              name: '平均车速',
              type: 'line',
              color: '#eacc36',
              symbol: 'circle',
              yAxisIndex: 0,
              data:[20,40,50,24,45,54]
            },
          ]
          };
        let option_five = {
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: [{
              name: '优化前',
              textStyle: {
                color: '#c9c9cc',
                fontSize: 10,
              },

            },
              {
                name: '优化后',
                textStyle: {
                  color: '#c9c9cc',
                  fontSize: 10,
                }
              },]
          },
          xAxis: {
            type: 'category',
            data: ['00：00', '1：00', '2:00', '3:00', '4:00', '5:00','6:00','7:00','8:00','9:00','10:00','11:00','12:00',
              '13:00','14:00','15:00','16:00','17:00','18:00','19：00','20:00','21:00','22:00','23:00'],
            axisLine: {
              lineStyle: {
                color: '#595B66'
              },
            },
            axisLabel: {
              color: '#fff',
              margin: 20,
              textStyle:{
                fontSize:10,
              }
            },
            axisTick: {
              show: false,
            },
          },
          yAxis:
            {
              type: 'value',
              show: true,
              position:'left',
              axisLabel: {
                formatter: '{value}',
                color: '#c9c9cc'
              },
              splitLine: {
                show: true,
                interval: 'auto',//
                lineStyle: {
                  color: ['#595B66']
                }
              }
            },
          series:[
            {
              name: '优化前',
              type: 'line',
              color: '#02d1d1',
              symbol: 'circle',
              data: ['33','22','30','20','20','30','50','60','20','40','20','20','30','50','60','20','40','20','20','30','50','60','20','40']
            },
            {
              name: '优化后',
              type: 'line',
              color: '#e05f9a',
              symbol: 'circle',
              data:['22','29','22','20','20','30','50','60','20','40','20','20','30','50','60','20','40','20','20','30','50','60','20','40',]
            },
          ]
        };
  this.myChart.setOption(options);
  this.Intersection.setOption(option_one);
  this.flowRate.setOption(option_four);
  this.goodSpeed.setOption(option_five);
  }

  },
  components: {
    Area,
      MixLineBarItem
  }
  ,
  }
</script>
