<template>
  <div>
    <area-select></area-select>
    <el-row :gutter="10" class="Dashboard_lineRow">
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
            <road-net-map style="width: 100%"></road-net-map>

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
                    <road-gauge class="Dashboard_card_roadGauge" :data="congestionPercent"></road-gauge>
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

              <div style="height: 190px;width: 160px;background: rgba(41,41,54,0.9);margin-top: 10px;float: right">
                <div style="color: #c9c9cc;font-size: 14px;border-bottom: 2px solid #9c9c9c;text-align: center;line-height: 30px">图例</div>

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

        allNodeAlarmInfo: [],
        congestionPercent: 0,
        roadNetCongestionScore: 0,
        currentRoadNet: false,
        allLinksDelay: [],
        allNodeDelay: [],
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        this.getAllData();
        let handleAllData = setInterval(this.getAllData, 5 * 60 * 1000)
      },
      getAllData() {
        this.getCongestionPercent();
        this.getRoadNetCongestionScore();
        this.getAllNodeCongestionAlarm();
      },
      jumpPage(key) {
        this.$router.push(key);
      },
      getCongestionPercent() { //拥堵里程比例
        this.$http
          .get('/trafficCongestion/congestionPercent?current=true')
          .then((response) => {
            this.congestionPercent = response.data.value;
          })
      },
      getRoadNetCongestionScore() { //路网拥堵评分
        this.$http
          .get('/trafficCongestion/roadNetCongestionScore?current=true')
          .then((response) => {
            this.roadNetCongestionScore = response.data.value;
          })
      },
      getAllNodeCongestionAlarm() {  //交叉口报警信息
        this.$http.get('/trafficCongestion/allNodeCongestionAlarm?current=true')
          .then((response) => {
            this.allNodeAlarmInfo = response.data;
          })
      },
      getTrafficCongestionRoadAvgDelay(cb) {  //所有路段延误
        this.$http.get('/trafficCongestion/roadAllLinksDelay?current=true')
          .then((response) => {
            this.allLinksDelay = response.data.values;
            cb();
          })
      },
      getAllNodeD12s(cb) {  //所有交叉口延误数据
        this.$http.get('/nodeData/getAllNodeD12s?current=true')
          .then((response) => {
            this.allNodeDelay = response.data.values;
            cb();
          })
      },

      setRoadNetStatus(is) {
        this.currentRoadNet = is;

        window.congestionMap.clearOverlays();
        if (is) {
          this.getTrafficCongestionRoadAvgDelay(() => {
            this.addPloyLine();
          });
          this.getAllNodeD12s(() => {
            this.addMarkerAndLabel();
          });
        }
      },
      addMarkerAndLabel() {
        for (let i = 0; i < this.allNodeDelay.length; i++) {
          console.log(this.allNodeDelay[i])
          let pt = new window.BMap.Point(this.allNodeDelay[i].node.long, this.allNodeDelay[i].node.lat);
          let opts = {position: pt, offset: new BMap.Size(-130, -120)};
          let label = new BMap.Label(this.allNodeDelay[i].node.node_name + "<br>交叉口延误时间 " + this.allNodeDelay[i].value.toFixed(0) + "s", opts);  // 创建文本标注对象
          label.setStyle({
            color: "#fff",
            fontSize: "14px",
            background: this.getRoadAvgDelayColor(this.allNodeDelay[i].value),
            height: "40px",
            border: 0,
            boxShadow: "5px 5px 5px #111",
            padding: "5px",
            lineHeight: "20px",
          });

          let myIcon = new window.BMap.Icon(this.getNodeDelayImg(this.allNodeDelay[i].value), new window.BMap.Size(168, 167));
          let marker = new window.BMap.Marker(pt, {icon: myIcon});  // 创建标注

          window.congestionMap.addOverlay(label);
          window.congestionMap.addOverlay(marker);
        }
      },
      addPloyLine() {
        for (let i = 0; i < this.allLinksDelay.length; i++) {
          let pois = this.allLinksDelay[i].link.link_nodes.map((node) => {
            return new window.BMap.Point(node[0], node[1])
          });
          let polyline = new window.BMap.Polyline(pois, {
            enableEditing: false,//是否启用线编辑，默认为false
            enableClicking: true,//是否响应点击事件，默认为true
            strokeWeight: '1',//折线的宽度，以像素为单位
            strokeOpacity: 0.8,//折线的透明度，取值范围0 - 1
            strokeColor: this.getRoadAvgDelayColor(this.allLinksDelay[i].value) //折线颜色
          });
          polyline.id= this.allLinksDelay[i].link_id;
          console.log(this.allLinksDelay[i])
          polyline.addEventListener('click',  (pt)=> {
            console.log(pt.currentTarget.id)
            this.jumpPage('/main/RoadSectionMap/'+pt.currentTarget.id);
          });
          window.congestionMap.addOverlay(polyline);          //增加折线
        }
      },
      getRoadAvgDelayColor(num) {
        if (num < 30) {
          return "#green"
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
      getNodeDelayImg(num) {
        if (num < 30) {
          // return "/static/50.png"
          return "/static/green.jpg"
        } else if (num > 30 && num < 50) {
          // return "/static/53.png"
          return "/static/yellow.jpg"
        } else if (num > 50 && num < 60) {
          // return "/static/52.png"
          return "/static/orange.jpg"
        } else if (num > 60) {
          // return "/static/51.png"
          return "/static/red.jpg"
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

