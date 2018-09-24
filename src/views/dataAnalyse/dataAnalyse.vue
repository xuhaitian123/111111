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
          <div class="score_body_area" style="padding: 43px 43px 50px 43px;box-sizing: border-box;display: flex;flex-wrap: wrap;">
          <!--<div id="before_road_net_score" style="height: 120px;width: 170px"></div>-->
          <!--<div id="after_road_net_score" style="height: 120px;width: 170px;margin-left: 52px"></div>-->
          <!--<div id="before_road_net_proportion" style="height: 170px;width: 190px">-->
            <!--<PieDoughnutItem :id='"before_road_net_proportion"':title = '"优化前"'></PieDoughnutItem>-->
          <!--</div>-->
          <!--<div id="after_road_net_proportion" style="height: 170px;width: 190px;margin-left: 52px">-->
            <!--<PieDoughnutItem :id='"after_road_net_proportion"':title = '"优化后"' ></PieDoughnutItem>-->
          <!--</div>-->

          </div>
        </div>
        <div class="alarmData">
          <div class="alarmData_title">
            <div class="alarmData_title_text">路网拥堵报警次数月变化趋势</div>
          </div>
          <div class="alarmData_body_area " style="padding-top: 44px;box-sizing: border-box">
            <alarm-data :alarm_data=alarm_data></alarm-data>
          </div>
        </div>
        <div class="IntersectionData">
          <div class="IntersectionData_title">
            <div class="IntersectionData_title_text">各交叉口平均延误水平与拥堵报警次数</div>
          </div>
          <div class="IntersectionData_body_area" style="padding-top: 44px;box-sizing: border-box">
            <intersection :intersection_data=intersection_data :trafficLightOptimizeAlarmTimes=trafficLightOptimizeAlarmTimes></intersection>
          </div>
        </div>
        <div class="flowRate">
          <div class="flowRate_title">
            <div class="flowRate_title_text">路网流量、平均车速月变化趋势</div>
          </div>
          <div class="flowRate_body_area" style="padding: 35px 20px 0 30px;box-sizing: border-box">
         <flow-data :flow_rate_data=flow_rate_data :speed_data=speed_data></flow-data>
          </div>
        </div>
        <div class="goodSpeed">
          <div class="goodSpeed_title">
            <div class="goodSpeed_title_text">优化前后平均车速日变化趋势</div>
          </div>
          <div class="goodSpeed_body_area" style="padding-top: 35px;box-sizing: border-box">
            <good-data></good-data>
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
  import AlarmData from '../../components/signalDataAnalysis/alarmData'
  import  FlowData from '../../components/signalDataAnalysis/flowRate'
  import  goodData from '../../components/signalDataAnalysis/goodSpeed'
  import  Intersection from '../../components/signalDataAnalysis/Intersection'

  export default {
    name: "DataAnalyse",
    mounted() {
      this.init();
      this.init_flowRate();
      this.init_goodSpeed();
      this.init_Intersection();

    },
    data() {
      return {
        myChart: undefined,
        Intersection: undefined,
        flowRate: undefined,
        goodSpeed: undefined,
        alarm_data:[],
        intersection_data:[],
        trafficLightOptimizeAlarmTimes:[],
        flow_rate_data:[],
        speed_data:[]

      }
    },//
    methods: {
      init() {
        var that = this;
        this.$http.get('/history/roadNetAlarmTimesByMonths?months=201807,201808,201809,201810,201811,201812' +
          ''+ '&token=' + this.getHeader().token).then(function (item) {
          that.alarm_data = item.data
        })
      },
      init_Intersection(){
        var that = this;
        this.get_init_Intersection_data().then(function (data) {
          that.$http.get('/history/trafficLightOptimizeAlarmTimes' + '?token=' + that.getHeader().token).then(function (item) {
            this.intersection_data = data;
            this.trafficLightOptimizeAlarmTimes = item.data
          })
        })
      },
      init_flowRate(){
        var that = this;
        this.get_flowRate_data().then(function (data) {
          that.$http.get('/history/roadNetAvgSpeedByMonths?months=201808,201809' + '&token=' + that.getHeader().token).then(function (item) {
            that.flow_rate_data = data
            that.data = item.data
          })
        })
      },
      init_goodSpeed(){
        var that = this;
        that.$http.get('/history/roadNetAvgSpeedByDay?day=20180101' +
          ''+ '?token=' + this.getHeader().token).then(function (item) {
          console.log(item.data)
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
                data: [50.60,30.60,45,66,44,33,66,88,33,22,11,1,2,4,6,8,9,10,23,23,45,43]
              },
              {
                name: '优化后',
                type: 'line',
                color: '#e05f9a',
                symbol: 'circle',
                data:[30.50,60.66,49,66,34,33,66,8,33,2,11,15,26,48,69,81,9,10,2,23,42,49]
              },
            ]
          };
          that.goodSpeed = that.$echarts.init(document.getElementById('data_five'));
          that.goodSpeed.setOption(option_five);
        })

      },
      get_init_Intersection_data(){
          return new Promise((resolve, reject) => {
            this.$http.get('/history/trafficLightOptimizeDelay?' + '&token=' + this.getHeader().token).then(function (item) {
              resolve(item.data)
            })
          })
     },
      get_flowRate_data(){
        return new Promise((resolve, reject) => {
          this.$http.get('/history/roadNetAllFlowByMonths?months=201801,201802,201803,201804,201805,201806' + '&token=' + this.getHeader().token).then(function (item) {
            resolve(item.data)
          })
        })
      }

  },
  components: {
    Area,
    AlarmData,
    FlowData,
    goodData,
    Intersection

  }
  ,
  }
</script>
