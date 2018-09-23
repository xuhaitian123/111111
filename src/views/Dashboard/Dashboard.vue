<template>

  <div>

    <area-select ></area-select>

    <el-row :gutter="10" class="Dashboard_lineRow">
      <el-col :span="8">
        <el-card shadow="never" :body-style="{ padding: '0px' }" class="Dashboard_box_card">
          <div class="Dashboard_clearfix">
            <span>实时地图</span>
            <div style="float: right; padding: 3px 0">
              <i class="iconfont icon-fangda" @click="jumpPage('/main/congestionMap')"></i>
              <i class="iconfont icon-shuxian"></i>
              <i class="iconfont icon-webicon03"></i>
            </div>
          </div>
          <div class="Dashboard_card_body">
            <div id="map"></div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card shadow="never" :body-style="{ padding: '0px' }" class="Dashboard_box_card">
          <div class="Dashboard_clearfix">
            <span>路网数据展示</span>
            <i class="iconfont icon-webicon03" style="float: right; padding: 3px 0"></i>
          </div>
          <div class="Dashboard_card_body">
            <div class="Dashboard_card_left">
              <div class="Dashboard_card_current">
                <div class="Dashboard_card_title">路网总流量</div>

                <div class="Dashboard_card_progressList Dashboard_card_progressHeight">
                  <div v-for="(item,i) in allRoadFlow" :key="item.node_id" v-if="i <6">
                    <div class="fl Dashboard_card_progress">
                      <div class="Dashboard_card_road">{{item.name}}</div>
                      <el-progress :percentage="item.value /100" :stroke-width="6"
                                   :show-text="false" :color="getRoadFlowColor(item.value /100)"></el-progress>
                    </div>
                    <div class="fr">
                      <span class="Dashboard_card_vph">{{item.value}}vph</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div class="Dashboard_card_title mt10">拥堵里程比例</div>
                  <div class="Dashboard_card_score">
                    <span class="Dashboard_score_num">{{roadNetCongestionScore.toFixed(0)}}</span>
                  </div>
                  <el-progress :percentage="roadNetCongestionScore" :stroke-width="6" color="#ff8539"
                               :show-text="false"></el-progress>
                </div>
              </div>
            </div>

            <div class="Dashboard_card_right">
              <div class="Dashboard_card_current">
                <div class="Dashboard_card_title">路网拥堵评分</div>
                <road-gauge class="Dashboard_card_roadGauge" :data="congestionPercent.toFixed(0)"></road-gauge>

                <div class="Dashboard_card_title">交叉口拥堵评分</div>
                <div class="Dashboard_card_progressList_score" v-for="(item,i) in allNodeScore" :key="item.node_id"
                     v-if="i <5">
                  {{item.road_name}}<span class="fr fs20">{{item.value.toFixed(0)}}</span>
                </div>
              </div>

            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card shadow="never" :body-style="{ padding: '0px' }" class="Dashboard_box_card">
          <div class="Dashboard_clearfix">
            <span>报警信息</span>
            <i class="iconfont icon-webicon03" style="float: right; padding: 3px 0"></i>
          </div>
          <div class="Dashboard_card_body">
            <div class="Dashboard_card_main">

              <el-row class="Dashboard_card_alarm">
                <el-col :span="6" :offset="1">
                  <div class="">时间</div>
                </el-col>
                <el-col :span="7">
                  <div class="">交叉口</div>
                </el-col>
                <el-col :span="10">
                  <div class="">拥堵报警</div>
                </el-col>
              </el-row>

              <el-row class="Dashboard_alarm_list" v-for="(i,index) in allNodeAlarmInfo" :key="i.node_id"
                      v-if="index <5">
                <el-col :span="6" :offset="1">
                  <!--#9f172b-->
                  <div class="" :style="{'margin-top': '10%','border-left': '5px solid '+alarmColor(i.value[0].value)}">
                    <span>{{ formatDate(new Date(i.start),'yyyy MM dd')}}</span>
                    <br>
                    <span>{{ formatDate(new Date(i.end),'hh:mm')}}</span>
                  </div>
                </el-col>
                <el-col :span="7">
                  <div class="" style="line-height: 55px">
                    <span>{{i.node_name}}</span>
                  </div>
                </el-col>
                <el-col :span="10">
                  <div class="Dashboard_alarm_info">
                    <span :style="{color:alarmColor(i.value[0].value)}">
                      {{flowText[i.value[0].movement_turning_direction]}}{{alarmText(i.value[0].value)}}度拥挤</span>
                    <br>
                    <span :style="{color:alarmColor(i.value[1].value)}">
                      {{flowText[i.value[1].movement_turning_direction]}}{{alarmText(i.value[1].value)}}度拥挤</span>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="Dashboard_lineRow">
      <el-col :span="8">
        <el-card shadow="never" :body-style="{ padding: '0px' }" class="Dashboard_box_card">
          <div class="Dashboard_clearfix">
            <span>信号灯优化前后数据展示</span>
            <i class="iconfont icon-webicon03" style="float: right; padding: 3px 0"></i>
          </div>
          <div class="Dashboard_card_body_two">
            <mix-line-bar :trafficLightData="trafficLightData" :nodeName="nodeName"></mix-line-bar>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="never" :body-style="{ padding: '0px' }" class="Dashboard_box_card">
          <div class="Dashboard_clearfix">
            <span>信号灯优化前后数据展示</span>
            <i class="iconfont icon-webicon03" style="float: right; padding: 3px 0"></i>
          </div>
          <div class="Dashboard_card_body_two">
            <div style="width: 50%;height: 80%;display: inline-block">
              <pie-doughnut id="pieDoughnut" title="优化前" :data="trafficLightRatio.before.values" ></pie-doughnut>
            </div>
            <div style="width: 50%;height: 80%;display: inline-block" class="fr">
              <pie-doughnut id="PieDoughnut" title="优化后" :data="trafficLightRatio.after.values"></pie-doughnut>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card shadow="never" :body-style="{ padding: '0px' }" class="Dashboard_box_card">
          <div class="Dashboard_clearfix">
            <span>数据变化趋势对比分析</span>
            <i class="iconfont icon-webicon03" style="float: right; padding: 3px 0"></i>
          </div>
          <div class="Dashboard_card_body_two">
            <smooth-bar-line></smooth-bar-line>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="Dashboard_lineRow">
      <el-col>
        <el-card shadow="never" :body-style="{ padding: '0px' }" class="Dashboard_box_card">
          <div class="Dashboard_clearfix">
            <span>优先通行控制设置</span>
            <i class="iconfont icon-webicon03" style="float: right; padding: 3px 0"></i>
          </div>
          <div class="Dashboard_card_body_two" style="padding: 20px">

            <el-col :span="6" class="">
              <div class="Dashboard_set_col" style="height: 180px;position: relative">
                人民路-珠海路优先通行控制设置

                <div>
                  <div class="fl" style="padding-left: 10px;margin: 10px 0">
                    <span>优先方式</span>
                    <ul>
                      <el-checkbox-group style="margin: 10px 0" v-model="firstMode">
                        <li>
                          <el-checkbox label="绿灯延长"></el-checkbox>
                        </li>
                        <li>
                          <el-checkbox label="红灯提前结束"></el-checkbox>
                        </li>
                        <li>
                          <el-checkbox label="调整相位顺序"></el-checkbox>
                        </li>
                      </el-checkbox-group>
                    </ul>
                  </div>
                  <div class="fr" style="margin: 10px 0">
                    <div class="fl">
                      <span>优先车辆和等级</span>
                      <ul>
                        <el-checkbox-group v-model="firstVehicle" style="margin: 10px 0 10px 10px">
                          <li>
                            <el-checkbox label="警卫车辆">警卫车辆</el-checkbox>
                          </li>
                          <li>
                            <el-checkbox label="警务车辆">警务车辆</el-checkbox>
                          </li>
                          <li>
                            <el-checkbox label="领导车辆">领导车辆</el-checkbox>
                          </li>
                          <li>
                            <el-checkbox label="救护车">救护车</el-checkbox>
                          </li>
                          <li>
                            <el-checkbox label="公交车">公交车</el-checkbox>
                          </li>
                        </el-checkbox-group>
                      </ul>
                    </div>
                    <div class="fr" style="margin-left: 5px;">
                      <span>高 中 低</span>
                      <ul style="margin: 10px 0">
                        <li>
                          <el-radio-group v-model="radio">
                            <el-radio :label="1">&nbsp;</el-radio>
                            <el-radio :label="2">&nbsp;</el-radio>
                            <el-radio :label="3">&nbsp;</el-radio>
                          </el-radio-group>
                        </li>
                        <li>
                          <el-radio-group v-model="radio1">
                            <el-radio :label="1">&nbsp;</el-radio>
                            <el-radio :label="2">&nbsp;</el-radio>
                            <el-radio :label="3">&nbsp;</el-radio>
                          </el-radio-group>
                        </li>
                        <li>
                          <el-radio-group v-model="radio2">
                            <el-radio :label="1">&nbsp;</el-radio>
                            <el-radio :label="2">&nbsp;</el-radio>
                            <el-radio :label="3">&nbsp;</el-radio>
                          </el-radio-group>
                        </li>
                        <li>
                          <el-radio-group v-model="radio3">
                            <el-radio :label="1">&nbsp;</el-radio>
                            <el-radio :label="2">&nbsp;</el-radio>
                            <el-radio :label="3">&nbsp;</el-radio>
                          </el-radio-group>
                        </li>
                        <li>
                          <el-radio-group v-model="radio4">
                            <el-radio :label="1">&nbsp;</el-radio>
                            <el-radio :label="2">&nbsp;</el-radio>
                            <el-radio :label="3">&nbsp;</el-radio>
                          </el-radio-group>
                        </li>
                      </ul>
                    </div>

                    <div style="position: absolute;bottom: 20px;left: 30px">
                      启动优先通行
                      <el-radio v-model="radioLine" :label="1">&nbsp;</el-radio>
                    </div>

                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="6" class="">
              <div class="Dashboard_set_col">123</div>
            </el-col>
            <el-col :span="6" class="">
              <div class="Dashboard_set_col">123</div>
            </el-col>


          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<style scoped>
  #map {
    width: 100%;
    height: 400px;
  }

  li {
    margin: 5px 0;
  }

  .Dashboard_box_card {
    border-radius: 1px;
    color: white !important;
    border: 0;
  }

  .Dashboard_clearfix {
    padding: 10px 30px;
    background: #353644;
    font-size: 15px;
  }

  .Dashboard_lineRow {
    margin: 10px 5px !important;
  }

  .Dashboard_card_body {
    background: #292936;
    height: 380px;
  }

  .Dashboard_card_body_two {
    background: #292936;
    height: 280px;
  }

  .Dashboard_card_main {
    padding: 20px 30px;
  }

  .Dashboard_card_left {
    width: 50%;
    padding: 10px 0;
    float: left;
  }

  .Dashboard_card_title {
    font-size: 14px;
    padding: 8px 20px;
    background: #1f1f2c;
    color: #a7a7ac;
  }

  .Dashboard_card_roadGauge {
    height: 180px;
    margin-bottom: -70px
  }

  .Dashboard_card_score {
    line-height: 30px;
    text-align: right;
    margin-top: 20px;
    margin-bottom: 5px;
    width: 75%
  }

  .Dashboard_score_num {
    font-size: 24px;
    color: #ff8539
  }

  .Dashboard_card_current {
    margin: auto;
    width: 85%;
  }

  .Dashboard_card_right {
    padding: 10px 0;
    float: right;
    width: 50%;
  }

  .Dashboard_card_progressList_score {
    background: #353644;
    color: #a7a7ac;
    font-size: 12px;
    margin-top: 10px;
    padding: 3px;
    line-height: 18px;
  }

  .Dashboard_card_progressHeight {
    height: 170px
  }

  .Dashboard_card_progressList {
    margin-top: 10px;
    background: #353644;
    padding: 8px;
    color: #a7a7ac;
    font-size: 12px;
  }

  .mt10 {
    margin-top: 10px
  }

  .fs20 {
    font-size: 20px
  }

  .Dashboard_card_road {
    padding-bottom: 2px;
    font-size: 12px;
  }

  .Dashboard_card_progress {
    width: 70%;
    margin-bottom: 5px;
  }

  .Dashboard_card_alarm {
    line-height: 30px;
    text-align: center;
    background: #1f1f2c;
    font-size: 14px;
    color: #a7a7ac;
    margin-bottom: 10px
  }

  .Dashboard_alarm_list span {
    font-size: 14px;
  }

  .Dashboard_alarm_list {
    text-align: center;
    background: #353644;
    color: #a7a7ac;
    margin-bottom: 5px
  }

  .Dashboard_alarm_info {
    margin-top: 10px;
    border-left: 1px solid #63646f;
    line-height: 18px
  }

  .Dashboard_card_vph {
    font-size: 15px;
    line-height: 20px;
  }

  .Dashboard_set_col {
    background: #353644;
    padding: 10px 30px;
    font-size: x-small;
    color: #b9b9b9;
  }
</style>
<script>
  import RoadGauge from '../../components/ECharts/RoadGaugeItem'
  import MixLineBar from '../../components/ECharts/MixLineBarItem'
  import PieDoughnut from '../../components/ECharts/PieDoughnutItem'
  import SmoothBarLine from '../../components/ECharts/SmoothBarLineItem'
  import AreaSelect from '../../components/Area/Area'

  export default {
    components: {
      AreaSelect,
      RoadGauge,
      MixLineBar,
      PieDoughnut,
      SmoothBarLine,
    },
    data() {
      let data = []

      for (let i = 0; i <= 360; i++) {
        let t = i / 180 * Math.PI
        let r = Math.sin(2 * t) * Math.cos(2 * t)
        data.push([r, i])
      }

      return {
        alarmColor: function (val) {
          if (val < 60) {
            return "#ccccd0";
          } else if (val > 60 && val < 80) {
            return "#c8772a";
          } else if (val > 80) {
            return "#a43f43";
          }
        },
        alarmText: function (val) {
          if (val < 60) {
            return "轻";
          } else if (val > 60 && val < 80) {
            return "中";
          } else if (val > 80) {
            return "重";
          }
        },
        flowText: {
          right: '右转',
          left: '左转',
          straight: '直行'
        },

        allRoadFlow: [],
        roadNetCongestionScore: 0,
        nodeCongestionScore: 0,
        congestionPercent: 0,
        firstMode: [],
        firstVehicle: [],
        allNodeScore: [],
        allNodeAlarmInfo: [],
        trafficLightData: {
          afterDelay: [],
          beforeDelay: [],
          afterAlarm: [],
          beforeAlarm: [],
        },
        radio: 3,
        radio1: 3,
        radio2: 3,
        radio3: 3,
        radio4: 2,
        radioLine: 1,
        nodeName: [],
        trafficLightRatio:{
          before:{},
          after:{}
        },


        polar: {
          title: {
            text: '极坐标双数值轴'
          },
          legend: {
            data: ['line']
          },
          polar: {
            center: ['50%', '54%']
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          angleAxis: {
            type: 'value',
            startAngle: 0
          },
          radiusAxis: {
            min: 0
          },
          series: [
            {
              coordinateSystem: 'polar',
              name: 'line',
              type: 'line',
              showSymbol: false,
              data: data
            }
          ],
          animationDuration: 2000,
        }
      }
    },
    mounted() {
      let map = new window.BMap.Map("map");    // 创建Map实例
      map.centerAndZoom(new window.BMap.Point(119.170574, 33.513026), 14);  // 初始化地图,设置中心点坐标和地图级别
      map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
      map.setMinZoom(12);
      map.setMaxZoom(18);
      map.addControl(new window.BMap.NavigationControl({
        offset: new BMap.Size(10, 60)
      }));   //缩放按钮
      let b = new window.BMap.Bounds(new window.BMap.Point(118.19214, 32.717855), new window.BMap.Point(119.648976, 34.184862));
      try {
        BMapLib.AreaRestriction.setBounds(map, b);
      } catch (e) {
      }

      this.init()
    },
    methods: {
      init() {
        this.getAllData();
        let handleAllData = setInterval(this.getAllData, 5 * 60 * 1000)
      },
      getAllData() {
        this.getRoadNetAllFlow();
        this.getRoadNetCongestionScore();
        this.getCongestionPercent();
        this.getNodes();
        this.getNodeCongestionSource();
        this.getAllNodeCongestionAlarm();
        this.getTrafficLightData();
        this.getTrafficLightOptimizeCongestionStatus();
      },
      getCongestionPercent() { //拥堵里程比例
        this.$http.get('/TrafficCongestion/congestionPercent?current=true' + '&token=' + this.getHeader().token)
          .then((response) => {
            this.congestionPercent = response.data.value;
          })
      },
      getRoadNetAllFlow() { //路网总流量
        this.$http
          .get('/TrafficCongestion/roadNetAllFlow?&current=true' + '&token=' + this.getHeader().token,)
          .then((response) => {
            this.allRoadFlow = response.data;
          })
      },
      getRoadNetCongestionScore() { //路网拥堵评分
        this.$http
          .get('/TrafficCongestion/roadNetCongestionScore?current=true' + '&token=' + this.getHeader().token)
          .then((response) => {
            this.roadNetCongestionScore = response.data.value;
          })
      },
      getNodeCongestionSource() {  //所有交叉口拥堵评分
        this.$http.get('/TrafficCongestion/allNodeCongestionSource?current=true' + '&token=' + this.getHeader().token)
          .then((response) => {
            this.allNodeScore = response.data;
          })
      },
      getAllNodeCongestionAlarm() {  //交叉口报警信息
        this.$http.get('/TrafficCongestion/allNodeCongestionAlarm?current=true' + '&token=' + this.getHeader().token)
          .then((response) => {
            this.allNodeAlarmInfo = response.data;
          })
      },
      getNodes() {
        this.$http.get('/nodeData/getNodes' + '?token=' + this.getHeader().token).then((response) => {
            this.nodeName = response.data.map((node) => {
              if (node.name) return node.name;
            }).filter((val) => {
              return val !== undefined
            });
          })
      },
      getTrafficLightData() {
        this.getHistoryTrafficLightOptimizeDelay().then((delayData) => {
          this.getHistoryTrafficLightOptimizeAlarmTimes().then((alarmData) => {
            this.trafficLightData.afterDelay = delayData.data.after;
            this.trafficLightData.beforeDelay = delayData.data.before;
            this.trafficLightData.afterAlarm = alarmData.data.after;
            this.trafficLightData.beforeAlarm = alarmData.data.before;
          })
        })
      },
      getHistoryTrafficLightOptimizeDelay() {  //信号灯优化前后平均延误
        return new Promise((resolve, reject) => {
          this.$http.get('/history/trafficLightOptimizeDelay?[\'\']' + '&token=' + this.getHeader().token)
            .then((response) => {
              resolve(response);
            })
        })
      },
      getHistoryTrafficLightOptimizeAlarmTimes() {  //信号灯优化前后报警次数
        return new Promise((resolve, reject) => {
          this.$http.get('/history/trafficLightOptimizeAlarmTimes' + '?token=' + this.getHeader().token)
            .then((response) => {
              resolve(response);
            })
        });
      },
      getTrafficLightOptimizeCongestionStatus() {  //优化前后流量饱和度
        this.$http.get('/history/trafficLightOptimizeD14sl?token=' + this.getHeader().token)
          .then((response) => {
            this.trafficLightRatio = response.data;
          })
      },
      getRoadFlowColor(num) {
        if (num < 30) {
          return "green"
        } else if (num > 30 && num < 50) {
          return "#e7c936"
        } else if (num > 50 && num < 60) {
          return "darkorange"
        } else if (num > 60) {
          return "red"
        } else {
          return "#c9c9cc"
        }
      },
      jumpPage(key) {
        this.$router.push(key);
      },
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表

        // app.title = '笛卡尔坐标系上的热力图';

        var hours = ['12a', '1a', '2a', '3a', '4a', '5a', '6a',
          '7a', '8a', '9a', '10a', '11a',
          '12p', '1p', '2p', '3p', '4p', '5p',
          '6p', '7p', '8p', '9p', '10p', '11p'];
        var days = ['Saturday', 'Friday', 'Thursday',
          'Wednesday', 'Tuesday', 'Monday', 'Sunday'];

        var data = [[0, 0, 10], [0, 1, 1], [0, 2, 0], [0, 3, 0], [0, 4, 0], [0, 5, 0], [0, 6, 0], [0, 7, 0], [0, 8, 0], [0, 9, 0], [0, 10, 0], [0, 11, 2], [0, 12, 4], [0, 13, 1], [0, 14, 1], [0, 15, 3], [0, 16, 4], [0, 17, 6], [0, 18, 4], [0, 19, 4], [0, 20, 3], [0, 21, 3], [0, 22, 2], [0, 23, 5], [1, 0, 7], [1, 1, 0], [1, 2, 0], [1, 3, 0], [1, 4, 0], [1, 5, 0], [1, 6, 0], [1, 7, 0], [1, 8, 0], [1, 9, 0], [1, 10, 5], [1, 11, 2], [1, 12, 2], [1, 13, 6], [1, 14, 9], [1, 15, 11], [1, 16, 6], [1, 17, 7], [1, 18, 8], [1, 19, 12], [1, 20, 5], [1, 21, 5], [1, 22, 7], [1, 23, 2], [2, 0, 1], [2, 1, 1], [2, 2, 0], [2, 3, 0], [2, 4, 0], [2, 5, 0], [2, 6, 0], [2, 7, 0], [2, 8, 0], [2, 9, 0], [2, 10, 3], [2, 11, 2], [2, 12, 1], [2, 13, 9], [2, 14, 8], [2, 15, 10], [2, 16, 6], [2, 17, 5], [2, 18, 5], [2, 19, 5], [2, 20, 7], [2, 21, 4], [2, 22, 2], [2, 23, 4], [3, 0, 7], [3, 1, 3], [3, 2, 0], [3, 3, 0], [3, 4, 0], [3, 5, 0], [3, 6, 0], [3, 7, 0], [3, 8, 1], [3, 9, 0], [3, 10, 5], [3, 11, 4], [3, 12, 7], [3, 13, 14], [3, 14, 13], [3, 15, 12], [3, 16, 9], [3, 17, 5], [3, 18, 5], [3, 19, 10], [3, 20, 6], [3, 21, 4], [3, 22, 4], [3, 23, 1], [4, 0, 1], [4, 1, 3], [4, 2, 0], [4, 3, 0], [4, 4, 0], [4, 5, 1], [4, 6, 0], [4, 7, 0], [4, 8, 0], [4, 9, 2], [4, 10, 4], [4, 11, 4], [4, 12, 2], [4, 13, 4], [4, 14, 4], [4, 15, 14], [4, 16, 12], [4, 17, 1], [4, 18, 8], [4, 19, 5], [4, 20, 3], [4, 21, 7], [4, 22, 3], [4, 23, 0], [5, 0, 2], [5, 1, 1], [5, 2, 0], [5, 3, 3], [5, 4, 0], [5, 5, 0], [5, 6, 0], [5, 7, 0], [5, 8, 2], [5, 9, 0], [5, 10, 4], [5, 11, 1], [5, 12, 5], [5, 13, 10], [5, 14, 5], [5, 15, 7], [5, 16, 11], [5, 17, 6], [5, 18, 0], [5, 19, 5], [5, 20, 3], [5, 21, 4], [5, 22, 2], [5, 23, 0], [6, 0, 1], [6, 1, 0], [6, 2, 0], [6, 3, 0], [6, 4, 0], [6, 5, 0], [6, 6, 0], [6, 7, 0], [6, 8, 0], [6, 9, 0], [6, 10, 1], [6, 11, 0], [6, 12, 2], [6, 13, 1], [6, 14, 3], [6, 15, 4], [6, 16, 0], [6, 17, 0], [6, 18, 0], [6, 19, 0], [6, 20, 1], [6, 21, 2], [6, 22, 2], [6, 23, 6]];

        data = data.map(function (item) {
          return [item[0], item[1], item[2] || '-'];
        });

        var option = {
          tooltip: {
            position: 'top'
          },
          animation: false,
          grid: {
            height: '50%',
            y: '10%'
          },
          xAxis: {
            type: 'category',
            data: days,
            splitArea: {
              show: false
            }
          },
          yAxis: {
            type: 'category',
            data: hours,
            splitArea: {
              show: false
            }
          },
          visualMap: {
            min: 0,
            max: 10,
            calculable: true,
            orient: 'horizontal',
            left: 'center',
            bottom: '15%'
          },
          series: [{
            name: 'Punch Card',
            type: 'heatmap',
            data: data,
            label: {
              normal: {
                show: true
              }
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }]
        }

        myChart.setOption(option);
      },

    },

  }
</script>
