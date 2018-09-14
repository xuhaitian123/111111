<template>
  <div>
    <div class="Dashboard_title_cascader">
      <span>省
        <el-select v-model="currentProvince" placeholder="请选择" class="Dashboard_title_select">
          <el-option
            v-for="item in provinceList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </span>

      <span>城市
        <el-select v-model="currentCity" size="mini" placeholder="请选择" class="Dashboard_title_select">
          <el-option
            v-for="item in cityList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </span>

      <span>地区
        <el-select v-model="currentArea" size="mini" placeholder="请选择" class="Dashboard_title_select">
          <el-option class="selectColor"
                     v-for="item in areaList"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </span>
    </div>
    <el-row :gutter="10" class="Dashboard_lineRow">
      <el-col>
        <el-card shadow="never" :body-style="{ padding: '0px' }" class="Dashboard_box_card">
          <div class="Dashboard_clearfix">
            <span>拥堵地图</span>
            <div style="float: right; padding: 3px 0">
              <i class="iconfont icon-fangda" @click="jumpPage('/main/dashboard')"></i>
              <i class="iconfont icon-shuxian"></i>
              <i class="iconfont icon-webicon03"></i>
            </div>
          </div>
          <div class="" style="height: 980px;position: relative">
            <div id="bigMap" style="height: 980px"></div>

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
                    <RoadGauge class="Dashboard_card_roadGauge" :data="congestionPercent"></RoadGauge>
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

                <el-row class="Dashboard_alarm_list" v-for="i in allNodeAlarmInfo" :key="i.node_id">
                  <el-col :span="6" :offset="1">
                    <div class=""
                         :style="{'margin-top': '10%','border-left': '5px solid '+alarmColor(i.value[0].value)}">
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

              <div style="height: 190px;width: 160px;background: rgba(41,41,54,0.8);margin-top: 10px;float: right">
                <div
                  style="color: #c9c9cc;font-size: 14px;border-bottom: 2px solid #9c9c9c;text-align: center;line-height: 30px">
                  图例
                </div>

                <ul class="CongestionMap_Legend">
                  <li>
                    <i class="icon-yuan iconfont" style="color: green"></i>
                    <span>延误时间 < 30秒</span>
                  </li>
                  <li>
                    <i class="icon-yuan iconfont" style="color: #f7ff84"></i>
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
              <time-line></time-line>
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

  export default {
    name: "congestion-map",
    components: {
      RoadGauge,
      TimeLine,
    },
    data() {
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
        provinceList: [{
          value: '1',
          label: '江苏'
        }],
        cityList: [{
          value: '1',
          label: '淮安'
        }],
        areaList: [{
          value: '1',
          label: '盱眙'
        }],
        currentProvince: '1',
        currentCity: '1',
        currentArea: '1',
        allNodeAlarmInfo: [],
        congestionPercent: 0,
        roadNetCongestionScore: 0,
        currentRoadNet: false,
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        this.initMap();
        this.getAllData();
        let handleAllData = setInterval(this.getAllData, 5 * 60 * 1000)
      },
      initMap(){
        let map = new window.BMap.Map("bigMap");    // 创建Map实例
        map.centerAndZoom(new window.BMap.Point(119.014269, 33.613864), 12);  // 初始化地图,设置中心点坐标和地图级别
        map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
        map.setMinZoom(12);
        map.setMaxZoom(16);
        map.addControl(new window.BMap.NavigationControl());   //缩放按钮
        let b = new window.BMap.Bounds(new window.BMap.Point(117.763253, 34.418181), new BMap.Point(120.0793, 32.47694));
        try {
          BMapLib.AreaRestriction.setBounds(map, b);
        } catch (e) {
        }


      },
      getAllData() {
        this.getTrafficCongestionCongestionPercent();
        this.getTrafficCongestionRoadNetCongestionScore();
        this.getTrafficCongestionAllNodeCongestionAlarm();
      },
      jumpPage(key) {
        this.$router.push(key);
      },
      getTrafficCongestionCongestionPercent() { //拥堵里程比例
        this.$http
          .get('/trafficCongestion/congestionPercent?current=true')
          .then((response) => {
            this.congestionPercent = response.data.value;
          })
      },
      getTrafficCongestionRoadNetCongestionScore() { //路网拥堵评分
        this.$http
          .get('/trafficCongestion/roadNetCongestionScore?current=true')
          .then((response) => {
            this.roadNetCongestionScore = response.data.value;
          })
      },
      getTrafficCongestionAllNodeCongestionAlarm() {  //交叉口报警信息
        this.$http.get('/trafficCongestion/allNodeCongestionAlarm?current=true')
          .then((response) => {
            this.allNodeAlarmInfo = response.data;
          })
      },
      getTrafficCongestionRoadAvgDelay() {
        this.$http.get('/trafficCongestion/roadAvgDelay?linkId=201&current=true')
          .then((response) => {
            console.log(response)
          })
      },
      setRoadNetStatus(is) {
        this.currentRoadNet = is;
        this.getTrafficCongestionRoadAvgDelay();
      }
    }
  }
</script>

<style lang="css">
  .Dashboard_card_roadGauge {
    height: 180px;
    margin-bottom: -70px
  }

  .CongestionMap_Legend i {
    margin-right: 5px;
  }

  .CongestionMap_Status {
    width: 100px;
    height: 30px;
    margin-top: 5px;
    border-radius: 40px;
    line-height: 30px;
    margin-left: 15px;
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
    margin-bottom: 5px
  }

  .Dashboard_title_select {
    margin: 0 10px;
  }

  .Dashboard_title_cascader {
    background: #282635;
    color: white;
    font-size: 12px;
    height: 20px;
    padding: 12.5px 20px;
    margin: 0 10px;
    border-radius: 1px;
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

