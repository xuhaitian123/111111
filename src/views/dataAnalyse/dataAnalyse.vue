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
          <div class="score_body_area" style="padding: 43px 43px 50px 43px;box-sizing: border-box;display: flex;flex-wrap: wrap;"
               v-loading="loading_score"
               element-loading-background="rgba(51, 54, 67, 1)">
          <div id="before_road_net_score" style="height: 120px;width: 170px;position: relative">
            <RoadCondition :id ='"before"':RoadCondition = RoadCondition.before :color='"#B3424C"'></RoadCondition>
            <div style="position: absolute;top:90px;left: 28px">优化前路网总评分</div>
          </div>
          <div id="after_road_net_score" style="height: 120px;width: 170px;margin-left: 90px;position: relative">
            <RoadCondition :id='"after"':RoadCondition = RoadCondition.after :color='"#3EA579"'></RoadCondition>
            <div style="position: absolute;top:90px;left: 28px">优化后路网总评分</div>
          </div>
          <div id="before_road_net_proportion" style="height: 170px;width: 190px">
            <TrafficAccounting :id='"before_road_net_proportion"':data="data.before" :title = '"优化前"' ></TrafficAccounting>
          </div>
          <div id="after_road_net_proportion" style="height: 170px;width: 190px;margin-left: 52px">
            <TrafficAccounting :id='"after_road_net_proportion"':data="data.after" :title = '"优化后"' ></TrafficAccounting>
          </div>

          </div>
        </div>
        <div class="alarmData">
          <div class="alarmData_title">
            <div class="alarmData_title_text">路网拥堵报警次数月变化趋势</div>
          </div>
          <div class="alarmData_body_area"style="padding-top: 44px;box-sizing: border-box"
               v-loading="loading_alarm"
               element-loading-background="rgba(51, 54, 67, 1)">


            <alarm-data :alarm_data=alarm_data></alarm-data>
          </div>
        </div>
        <div class="IntersectionData">
          <div class="IntersectionData_title">
            <div class="IntersectionData_title_text">各交叉口平均延误水平与拥堵报警次数</div>
          </div>
          <div class="IntersectionData_body_area" style="padding-top: 44px;box-sizing: border-box"
               v-loading="loading_intersection"
               element-loading-background="rgba(51, 54, 67, 1)">
            <intersection :intersection_data=intersection_data :trafficLightOptimizeAlarmTimes=trafficLightOptimizeAlarmTimes></intersection>
          </div>
        </div>
        <div class="flowRate">
          <div class="flowRate_title">
            <div class="flowRate_title_text">路网流量、平均车速月变化趋势</div>
          </div>
          <div class="flowRate_body_area" style="padding: 35px 20px 0 30px;box-sizing: border-box"
               v-loading="loading_flow"
               element-loading-background="rgba(51, 54, 67, 1)">
         <flow-data :flow_rate_data=flow_rate_data :speed_data=speed_data></flow-data>
          </div>
        </div>
        <div class="goodSpeed">
          <div class="goodSpeed_title">
            <div class="goodSpeed_title_text">优化前后平均车速日变化趋势</div>
          </div>
          <div class="goodSpeed_body_area" style="padding-top: 35px;box-sizing: border-box"
               v-loading="loading_speed"
               element-loading-background="rgba(51, 54, 67, 1)">
            <good-data :good_speed=good_speed></good-data>
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
  .goodSpeed_title_text {
    width: 320px;
    margin-left: 20px;
    font-size: 16px;
  }
  .flowRate_title_text{
    width: 320px;
    margin-left: 20px;
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
  import  TrafficAccounting from '../../components/signalDataAnalysis/TrafficAccounting'
  import AlarmData from '../../components/signalDataAnalysis/alarmData'
  import  FlowData from '../../components/signalDataAnalysis/flowRate'
  import  goodData from '../../components/signalDataAnalysis/goodSpeed'
  import  Intersection from '../../components/signalDataAnalysis/Intersection'
  import  RoadCondition from '../../components/signalDataAnalysis/roadCondition'

  export default {
    name: "DataAnalyse",
    mounted() {
      // this.init();
      // this.init_flowRate();
      // this.init_goodSpeed();
      // this.init_Intersection();
      // this.get_PieDoughnutItem();
      // this.get_RoadCondition_data();
      this.get_all_data();

    },
    data() {
      return {
        alarm_data:[],
        intersection_data:[],
        trafficLightOptimizeAlarmTimes:[],
        flow_rate_data:[],
        speed_data:[],
        good_speed:{},
        data:{
          before:{},
          after:{}
        },
        RoadCondition:{
          before:'',
          after:''
        },
        loading_alarm:false,
        loading_speed:false,
        loading_flow:false,
        loading_intersection:false,
        loading_score:false

      }
    },//
    methods: {
     //  init() {
     //    let that = this;
     //    this.$http.get('/history/roadNetAlarmTimesByMonths?months=201806,201807,201808,201809,201810,201811,201812' +
     //      ''+ '&token=' + this.getHeader().token).then(function (item) {
     //      that.alarm_data = item.data;
     //      that.loading_alarm = false;
     //
     //    })
     //  },
     //  init_Intersection(){
     //    let that = this;
     //    this.get_init_Intersection_data().then(function (data) {
     //      that.$http.get('/history/trafficLightOptimizeAlarmTimes' + '?token=' + that.getHeader().token).then(function (item) {
     //        that.intersection_data = data;
     //        that.trafficLightOptimizeAlarmTimes =item.data
     //        that. loading_intersection = false
     //      })
     //    })
     //  },
     //  init_flowRate(){
     //    let that = this;
     //    this.get_flowRate_data().then(function (data) {
     //      that.$http.get('/history/roadNetAvgSpeedByMonths?months=201808,201809' + '&token=' + that.getHeader().token).then(function (item) {
     //        that.flow_rate_data =  data
     //        that.speed_data =  item.data
     //        that.loading_flow = false
     //
     //      })
     //    })
     //  },
     //  init_goodSpeed(){
     //    let that = this;
     //    that.$http.get('history/trafficLightOptimizeDayAvgSpeed?token=?' + ''+ '&token=' + this.getHeader().token).then(function (item) {
     //      that.good_speed = item.data
     //      that.loading_speed = false
     //    })
     //  },
     //  get_init_Intersection_data(){
     //      return new Promise((resolve, reject) => {
     //        this.$http.get('/history/trafficLightOptimizeDelay?' + '&token=' + this.getHeader().token).then(function (item) {
     //          resolve(item.data)
     //        })
     //      })
     // },
     //  get_flowRate_data(){
     //    return new Promise((resolve, reject) => {
     //      this.$http.get('/history/roadNetAllFlowByMonths?months=201808,201809' + '&token=' + this.getHeader().token).then(function (item) {
     //        resolve(item.data)
     //      })
     //    })
     //  },
     //  get_PieDoughnutItem(){
     //    let that = this;
     //    this.$http.get('/history/trafficLightOptimizeD14sl?token=' + this.getHeader().token).then(function (item) {
     //      that.data.before = item.data.before;
     //       that.data.after = item.data.after
     //      console.log(item.data.before)
     //      that.loading_score = false
     //    })
     //  },
     //  get_RoadCondition_data(){
     //    let that = this;
     //    this.$http.get('/trafficCongestion/roadNetCongestionScore?current=true' + this.getHeader().token).then(function (item) {
     //    console.log(item)
     //    })
     //
     //  },
      get_all_data(){
        let all_data = {
           score_data:{
            after:67,
            before:88
          },
         road_data :{
            after:{'三级':5.1,'二级':51.1,'一级':43.7},
            before:{'三级':11.6,'二级':47.7,'一级':40.7}
          },
          alarm_data : {
            after:[{month:'201806',value:10830},{month:'201807',value:10271},{month:'201808',value:9603},{month:'201809',value:10045}],
            before:[{month:'201801',value:15013},{month:'201802',value:14721},{month:'201803',value:14223},{month:'201804',value:13674}]
          },
          intersection_data : {
            after:[{name:'梁红玉路关天培路',value:20.3},{name:'梁红玉路樱桃园路',value:22.3},{name:'沈坤路樱桃园路',value:17.9},{name:'梁红玉路永怀东路',value:17.2},{name:'梁红玉路华西路',value:26.3},{name:'沈坤路华西路',value:20.8},{name:'梁红玉路镇海路',value:32.5},{name:'沈坤路镇海路',value:35.7},{name:'梁红玉路翔宇大道',value:28.6},{name:'沈坤路翔宇大道',value:27.5}],
            before:[{name:'梁红玉路关天培路',value:25.2},{name:'梁红玉路樱桃园路',value:24.2},{name:'沈坤路樱桃园路',value:20.3},{name:'梁红玉路永怀东路',value:21.9},{name:'梁红玉路华西路',value:38.4},{name:'沈坤路华西路',value:23.9},{name:'梁红玉路镇海路',value:30.2},{name:'沈坤路镇海路',value:29.0},{name:'梁红玉路翔宇大道',value:24.4},{name:'沈坤路翔宇大道',value:26.3}]
          },
          intersection_alarm_data :{
            after:[{name:'梁红玉路关天培路',value:42},{name:'梁红玉路樱桃园路',value:58},{name:'沈坤路樱桃园路',value:39},{name:'梁红玉路永怀东路',value:50},{name:'梁红玉路华西路',value:56},{name:'沈坤路华西路',value:39},{name:'梁红玉路镇海路',value:45},{name:'沈坤路镇海路',value:62},{name:'梁红玉路翔宇大道',value:49},{name:'沈坤路翔宇大道',value:54}],
            before:[{name:'梁红玉路关天培路',value:65},{name:'梁红玉路樱桃园路',value:86},{name:'沈坤路樱桃园路',value:57},{name:'梁红玉路永怀东路',value:88},{name:'梁红玉路华西路',value:90},{name:'沈坤路华西路',value:53},{name:'梁红玉路镇海路',value:72},{name:'沈坤路镇海路',value:85},{name:'梁红玉路翔宇大道',value:63},{name:'沈坤路翔宇大道',value:87}]
          },
          flow_speed_data :{
            flow:[{month:'201804',value:248879},{month:'201805',value:251879},{month:'201806',value:249879},{month:'201807',value:252879},{month:'201808',value:250879},{month:'201809',value:251879}],
            speed:[{month:'201804',value:34.4},{month:'201805',value:33.2},{month:'201806',value:36.9},{month:'201807',value:43.2},{month:'201808',value:44.1},{month:'201809',value:42.8}]
          },
          access_system_data :[{type:0,name:'社会车辆',value:45.6},{type:1,name:'警务车辆',value:63.4},{type:2,name:'领导外宾车辆',value:65.6},{type:3,name:'救援车辆',value:78.6},{type:4,name:'公交车辆',value:55.3}],
          everyday_score_data:{
            after:[94,97,96,98,97,96,94,78,70,75,83,92,85,83,84,80,76,73,74,83,86,89,93,95],
            before:[94,96,97,96,98,94,85,66,58,67,70,75,79,75,72,75,70,65,68,71,78,81,86,90]
          }
        }
        this.alarm_data =all_data.alarm_data
        this.intersection_data = all_data.intersection_data
        this.trafficLightOptimizeAlarmTimes=all_data.intersection_alarm_data
        this.flow_rate_data = all_data.flow_speed_data.flow
        this.speed_data = all_data.flow_speed_data.speed
        this.good_speed = all_data.everyday_score_data
        this.RoadCondition= all_data.road_data
        this.data.before = all_data.road_data.before
        this.data.after = all_data.road_data.after
        this.RoadCondition.after = all_data.score_data.after
        this.RoadCondition.before = all_data.score_data.before
        }


  },
  components: {
    Area,
    TrafficAccounting,
    AlarmData,
    FlowData,
    goodData,
    Intersection,
    RoadCondition

  }
  ,
  }
</script>
