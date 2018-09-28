<template>
  <div>
    <area-select></area-select>
    <el-row :gutter="10" class="Dashboard_lineRow" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.8)">
      <el-col>
        <el-card shadow="never" :body-style="{ padding: '0px' }" class="Dashboard_box_card">
          <div class="Dashboard_clearfix">
            <span><i class="el-icon-arrow-left" style="margin-right: 10px" @click="jumpPage('/main/dashboard')"></i>拥堵地图</span>
            <div style="float: right; padding: 3px 0">
              <i class="iconfont icon-fangda" @click="jumpPage('/main/dashboard')"></i>
              <i class="iconfont icon-shuxian"></i>
              <i class="iconfont icon-webicon03"></i>
            </div>
          </div>
          <div class="" style="height: 980px;position: relative">
            <road-net-map :all-links-delay="allLinksDelay"
                          :all-node-delay="allNodeDelay" :all-links-flow="allLinksFlow" :all-node-flow="allNodeFlow"
                          style="width: 100%"></road-net-map>

            <div style="position: absolute;top: 15px;width: 100%;text-align: center">
              <el-row
                style="width: 250px;height: 40px;background: rgba(41,41,54,0.8);;margin: auto;border-radius: 45px">
                <el-col :span="12">
                  <div @click="setRoadNetStatus(false)" class="CongestionMap_Status"
                       :style="{background : !currentRoadNet?'rgba(31,31,44)':''}">路网流量
                  </div>
                </el-col>
                <el-col style="width: 1px;height: 30px;background: #ccccd0;margin-top: 5px">
                </el-col>
                <el-col :span="11">
                  <div @click="setRoadNetStatus(true)" class="CongestionMap_Status"
                       :style="{background : currentRoadNet?'rgba(31,31,44)':''}">路网延误
                  </div>
                </el-col>
              </el-row>
            </div>

            <div style="position: absolute;width: 340px;height: 100%;top: 10px;right: 15px">
              <div style="height: 150px;background: rgba(41,41,54,0.8);">
                <el-row class="Dashboard_card_alarm">
                  <el-col :span="12">
                    <div class="fs14">路网拥堵评分</div>
                  </el-col>
                  <el-col :span="12">
                    <div class="fs14">拥堵里程比例</div>
                  </el-col>
                </el-row>

                <el-row class="">
                  <el-col :span="12">
                    <road-gauge class="Dashboard_card_roadGauge" :data="congestionPercent.toFixed(0)"></road-gauge>
                  </el-col>
                  <el-col :span="12">
                    <div style="border-left: 2px solid #414251">
                      <div class="Dashboard_card_score" style="margin-top: 20%">
                        <b class="Dashboard_score_num">{{roadNetCongestionScore.toFixed(0)}}</b>
                      </div>
                      <el-progress :percentage="roadNetCongestionScore" :stroke-width="8" color="#ff8539"
                                   :show-text="false" style="width: 80%;margin: auto;margin-top: 5%"></el-progress>
                    </div>
                  </el-col>
                </el-row>
              </div>

              <div class="Dashboard_card_body" style="margin-top: 10px">
                <el-row class="Dashboard_card_alarm mb10">
                  <el-col :span="6" :offset="1">
                    <div class="fs14">时间</div>
                  </el-col>
                  <el-col :span="8">
                    <div class="fs14">交叉口</div>
                  </el-col>
                  <el-col :span="9">
                    <div class="fs14">拥堵报警</div>
                  </el-col>
                </el-row>

                <el-row class="Dashboard_alarm_list" v-for="(i,index) in allNodeAlarmInfo" :key="i.node_id"
                        v-if="index <5&& !i.value[0].isMock">
                  <el-col :span="6" :offset="1">
                    <div class="" style="height: 30px"
                         :style="{'margin-top': '10%','border-left': '5px solid '+alarmColor(i.value[0].value,i.value[0].isMock)}">
                      <span>{{ formatDate(new Date(i.start),'yyyy MM dd')}}</span>
                      <br>
                      <span>{{ formatDate(new Date(i.end),'hh:mm')}}</span>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="" style="line-height: 55px">
                      <span>{{i.node_name}}</span>
                    </div>
                  </el-col>
                  <el-col :span="9">
                    <div class="Dashboard_alarm_info" style="height: 30px">
                      <span :style="{color:alarmColor(i.value[0].value,i.value[0].isMock)}">
                      {{flowText[i.value[0].movement_turning_direction]}}{{alarmText(i.value[0].value)}}度拥挤</span>
                      <br>
                      <span :style="{color:alarmColor(i.value[1].value,i.value[1].isMock)}">
                      {{flowText[i.value[1].movement_turning_direction]}}{{alarmText(i.value[1].value)}}度拥挤</span>
                    </div>
                  </el-col>
                </el-row>
              </div>

              <div v-if="!currentRoadNet" style="height: 190px;width: 160px;background: rgba(41,41,54,0.9);margin-top: 10px;float: right">
                <div style="color: #c9c9cc;font-size: 14px;border-bottom: 2px solid #9c9c9c;text-align: center;line-height: 30px">
                  图例
                </div>

                <ul class="CongestionMap_Legend">
                  <li>
                    <i class="icon-yuan1 iconfont" style="color: green"></i>
                    <span>饱和度 < 0.6</span>
                  </li>
                  <li>
                    <i class="icon-yuan1 iconfont" style="color: #e7c936"></i>
                    <span>饱和度 0.6-0.8</span>
                  </li>
                  <li>
                    <i class="icon-yuan1 iconfont" style="color: darkorange"></i>
                    <span>饱和度 0.8-0.9</span>
                  </li>
                  <li>
                    <i class="icon-yuan1 iconfont" style="color: red"></i>
                    <span>饱和度 > 0.9</span></li>
                  <li>
                    <i class="icon-yuan1 iconfont"></i>
                    <span>未知</span>
                  </li>
                </ul>

              </div>


              <div v-if="currentRoadNet" style="height: 190px;width: 160px;background: rgba(41,41,54,0.9);margin-top: 10px;float: right">
                <div style="color: #c9c9cc;font-size: 14px;border-bottom: 2px solid #9c9c9c;text-align: center;line-height: 30px">
                  图例
                </div>

                <ul class="CongestionMap_Legend">
                  <li>
                    <i class="icon-yuan iconfont" style="color: green"></i>
                    <span>延误时间 < 30秒</span>
                  </li>
                  <li>
                    <i class="icon-yuan iconfont" style="color: #e7c936"></i>
                    <span>延误时间 30-50秒</span>
                  </li>
                  <li>
                    <i class="icon-yuan iconfont" style="color: darkorange"></i>
                    <span>延误时间 50-60秒</span>
                  </li>
                  <li>
                    <i class="icon-yuan iconfont" style="color: red"></i>
                    <span>延误时间 > 60秒</span></li>
                  <li>
                    <i class="icon-yuan iconfont"></i>
                    <span>未知</span>
                  </li>
                </ul>

              </div>
            </div>

            <div style="position:absolute;bottom: 80px;width: 100%">
              <time-line @newTime="getNewTime"></time-line>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import RoadGauge from '../../components/ECharts/RoadGaugeItem'
  import TimeLine from '../../components/TimeLine/TimeLine'
  import AreaSelect from '../../components/Area/Area'
  import RoadNetMap from '../../components/Map/Map'

  export default {
    name: "congestion-map",
    components: {
      AreaSelect,
      RoadGauge,
      TimeLine,
      RoadNetMap,
    },
    data() {
      return {

        flowText: {
          right: '右转',
          left: '左转',
          straight: '直行'
        },

        allNodeAlarmInfo: [],
        congestionPercent: 0,
        roadNetCongestionScore: 0,
        currentRoadNet: false,
        allLinksDelay: [],
        allNodeDelay: [],
        allLinksFlow: [],
        allNodeFlow: [],
        startTime: 0,
        loading:false,
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        this.getAllData();
      },
      getAllData(startTime, endTime) {
        this.loading = true;
        this.getCongestionPercent(startTime, endTime);
        this.getRoadNetCongestionScore(startTime, endTime);
        this.getAllNodeCongestionAlarm(startTime, endTime);
        this.getAllFlow(startTime, endTime);
      },
      jumpPage(key) {
        this.$router.push(key);
      },
      setUrlDate(startTime, endTime) {
        return (startTime && endTime) ? '&start=' + startTime + '&end=' + endTime + '&current=false' : '&current=true';
      },
      getCongestionPercent(startTime, endTime) { //拥堵里程比例
        let url = '/trafficCongestion/congestionPercent?token=' + this.getHeader().token;
        url += this.setUrlDate(startTime, endTime);
        this.$http.get(url).then((response) => {
          this.congestionPercent = response.data.value;
        })
      },
      getRoadNetCongestionScore(startTime, endTime) { //路网拥堵评分
        let url = '/trafficCongestion/roadNetCongestionScore?token=' + this.getHeader().token;
        url += this.setUrlDate(startTime, endTime);
        this.$http.get(url).then((response) => {
          this.roadNetCongestionScore = response.data.value;
        })
      },
      getAllNodeCongestionAlarm(startTime, endTime) {  //交叉口报警信息
        let url = '/trafficCongestion/allNodeCongestionAlarm?token=' + this.getHeader().token;
        url += this.setUrlDate(startTime, endTime);
        this.$http.get(url).then((response) => {
          this.allNodeAlarmInfo = response.data;
        })
      },
      getTrafficCongestionRoadAvgDelay(startTime, endTime, cb) {  //所有路段延误
        let url = '/trafficCongestion/roadAllLinksDelay?token=' + this.getHeader().token;
        url += this.setUrlDate(startTime, endTime);
        this.$http.get(url).then((response) => {
            cb(response.data.values)
          })
      },
      getAllNodeD12s(startTime, endTime, cb) {  //所有交叉口延误数据
        let url = '/nodeData/getAllNodeD12s?token=' + this.getHeader().token;
        url += this.setUrlDate(startTime, endTime);
        this.$http.get(url).then((response) => {
          cb(response.data.values)
        })
      },
      getAllLinksFlow(startTime, endTime, cb) {  //所有进道口流量
        let url = '/nodeData/getAllLinksFlow?token=' + this.getHeader().token;
        url += this.setUrlDate(startTime, endTime);
        this.$http.get(url).then((response) => {
          cb(response)
        })
      },
      getAllNodesFlow(startTime, endTime, cb) {  // 所有交叉口流量
        let url = '/nodeData/getAllNodesFlow?token=' + this.getHeader().token;
        url += this.setUrlDate(startTime, endTime);
        this.$http.get(url).then((response) => {
          cb(response)
        })
      },

      setRoadNetStatus(is, startTime, endTime) {
        this.currentRoadNet = is;

        window.congestionMap.clearOverlays();
        if (is) {
          this.getAllDelay(startTime, endTime);
        } else {
          this.getAllFlow(startTime, endTime);
        }
      },
      getAllDelay(startTime, endTime) {
        this.getTrafficCongestionRoadAvgDelay(startTime, endTime, (lineDelay) => {
          this.getAllNodeD12s(startTime, endTime, (nodeDelay) => {
            this.allNodeDelay = nodeDelay;
            this.allLinksDelay = lineDelay;
          });
        });
      },
      getAllFlow(startTime, endTime) {
        this.getAllLinksFlow(startTime, endTime, (link) => {
          this.getAllNodesFlow(startTime, endTime, (node) => {
            this.allLinksFlow = link.data;
            this.allNodeFlow = node.data;
            this.loading = false;
          });
        });
      },
      getRoadAvgDelayColor(num) {
        if (num <= 30) {
          return "green"
        } else if (num > 30 && num <= 50) {
          return "#e7c936"
        } else if (num > 50 && num <= 60) {
          return "darkorange"
        } else if (num > 60) {
          return "red"
        } else {
          return "#c9c9cc"
        }
      },
      alarmColor (val,is) {
        if (is) {
          return "#9a9bac";
        }
        if (val <= 60) {
          return "#ccccd0";
        } else if (val > 60 && val <= 80) {
          return "#c8772a";
        } else if (val > 80) {
          return "#a43f43";
        }
      },
      alarmText (val) {
        if (val <= 60) {
          return "轻";
        } else if (val > 60 && val <= 80) {
          return "中";
        } else if (val > 80) {
          return "重";
        }
      },
      getNewTime(val) {
        if (this.startTime !== 0 && val > this.startTime) {
          if (val - this.startTime >= 5 * 60 * 1000) {
            console.log(this.formatDate(new Date(val), 'yy-MM-dd hh:mm:ss'))
            this.getAllData(this.startTime, val);
            this.setRoadNetStatus(this.currentRoadNet, this.startTime, val);
            this.startTime = 0;
          }
        } else {
          this.startTime = val;
        }
      },

    }
  }
</script>

<style lang="css">
  .Dashboard_card_roadGauge {
    height: 180px;
    margin-bottom: -70px
  }

  .CongestionMap_Status {
    width: 100px;
    height: 30px;
    margin-top: 5px;
    border-radius: 40px;
    line-height: 30px;
    margin-left: 15px;
  }

  .CongestionMap_Legend i {
    margin-right: 5px;
  }

  .CongestionMap_Legend i, .CongestionMap_Legend span {
    font-size: 12px;
    color: #a7a7ac;
    line-height: 30px;
    text-align: center;
  }

  .CongestionMap_Legend li:last-child {
    border-bottom: 0;
  }

  .CongestionMap_Legend li {
    margin: 0 10px;
    padding-left: 10px;
    border-bottom: 1px solid #a7a7ac;
  }

  .Dashboard_card_score {
    line-height: 30px;
    text-align: right;
    margin-top: 20px;
    width: 75%
  }

  .Dashboard_score_num {
    font-size: 30px;
    color: #ff8539
  }

  .Dashboard_alarm_list span {
    font-size: 12px;
  }

  .Dashboard_alarm_info {
    margin-top: 10px;
    border-left: 1px solid #63646f;
    line-height: 18px
  }

  .Dashboard_card_body {
    background: rgba(41, 41, 54, 0.8);
    height: 380px;
  }

  .Dashboard_card_alarm {
    line-height: 30px;
    text-align: center;
    background: #1f1f2c;
    font-size: 14px;
    color: #fff;
  }

  .mb10 {
    margin-bottom: 10px
  }

  .Dashboard_alarm_list {
    text-align: center;
    background: #353644;
    color: #a7a7ac;
    margin-bottom: 10px
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


</style>

