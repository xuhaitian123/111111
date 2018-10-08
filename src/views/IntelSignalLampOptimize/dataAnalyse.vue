<template>
  <div class="contianer">
    <Area></Area>
    <div class="contianer_body">
      <div class="contianer_body_title">
        <div class="title">
          <img class="toLeft" src="../../../static/map/toLeft.png"@click="jumpPage('/main/dashboard')"/><span class="title_text">智能优化效果分析</span>
        </div>
      </div>
      <div class="contianer_body_layout" v-loading="is_loading">
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
        <div class="flowRate dataAnalyse">
          <el-tabs type="border-card" style="padding: 0;">
            <el-tab-pane label="路网流量、平均车速月变化趋势" >
              <el-row style="padding:0;background: #333643;height: 390px;text-align: center">
                <FlowData :flow_rate_data=flow_rate_data :speed_data=speed_data></FlowData>
            </el-row>
            </el-tab-pane>
            <el-tab-pane label="优先通行系统效果图" >
              <el-row style="padding:0;background:#333643;height:390px;width: 530px;text-align: center">
                <PriorityAccess style="padding: 10px; box-sizing: border-box" :priority_access_data=PriorityAccess></PriorityAccess>
              </el-row>
            </el-tab-pane>
            </el-tabs>
          </div>
        <div class="goodSpeed">
          <div class="goodSpeed_title">
            <div class="goodSpeed_title_text">优化前后交通运行评分日变化趋势</div>
          </div>
          <div class="goodSpeed_body_area" style="padding-top: 35px;box-sizing: border-box;position: relative"
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
  }
  /*.flowRate_title_text{*/
    /*width: 200px;*/
    /*height: 30px;*/
    /*line-height: 30px;*/
    /*padding-left: 20px;*/
    /*background-color:#333643;*/
  /*}*/

  .score_body_area,
  .alarmData_body_area,
  .IntersectionData_body_area,
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
  import  PriorityAccess from '../../components/signalDataAnalysis/priorityAccess'

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
        PriorityAccess:[],
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
        this.loading_alarm=true;
          this.loading_speed=true;
          this.loading_flow=true;
          this.loading_intersection=true;
          this.loading_score=true
        this.$http.get('/optimizationData.json').then((optimizationData)=>{
          let all_data = optimizationData.data;

          this.alarm_data =all_data.alarm_data
          this.intersection_data = all_data.intersection_data
          this.trafficLightOptimizeAlarmTimes=all_data.intersection_alarm_data
          this.flow_rate_data = all_data.flow_speed_data.flow
          this.speed_data = all_data.flow_speed_data.speed
          this.good_speed = all_data.everyday_score_data
          this.RoadCondition= all_data.road_data
          this.data.before = all_data.road_data.before.values
          this.data.after = all_data.road_data.after.values
          this.RoadCondition.after = all_data.score_data.after
          this.RoadCondition.before = all_data.score_data.before
          this.PriorityAccess = all_data.access_system_data

          this.loading_alarm= false;
            this.loading_speed=false;
            this.loading_flow=false;
            this.loading_intersection=false;
            this.loading_score=false;

        })
        },
      jumpPage(key) {
        this.$router.push(key);
      },  


  },
  components: {
    Area,
    TrafficAccounting,
    AlarmData,
    FlowData,
    goodData,
    Intersection,
    RoadCondition,
    PriorityAccess

  }
  ,
  }
</script>

<style>
  .dataAnalyse .el-tabs--border-card>.el-tabs__content{
    padding: 0;
  }
</style>
