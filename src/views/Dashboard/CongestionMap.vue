<template>
  <div>
    <div class="Dashboard_titleCascader">
      <span>省
        <el-select v-model="currentProvince" placeholder="请选择" class="Dashboard_titleSelect">
          <el-option
            v-for="item in provinceList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </span>

      <span>城市
        <el-select v-model="currentCity" size="mini" placeholder="请选择" class="Dashboard_titleSelect">
          <el-option
            v-for="item in cityList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </span>

      <span>地区
        <el-select v-model="currentArea" size="mini" placeholder="请选择" class="Dashboard_titleSelect">
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
        <el-card shadow="never" :body-style="{ padding: '0px' }" class="Dashboard_box-card">
          <div class="Dashboard_clearfix">
            <span>拥堵地图</span>
            <div style="float: right; padding: 3px 0">
              <i class="iconfont icon-fangda" @click="jumpPage()"></i>
              <i class="iconfont icon-shuxian"></i>
              <i class="iconfont icon-webicon03"></i>
            </div>
          </div>
          <div class="" style="height: 980px;position: relative">
            <div id="bigMap" style="height: 980px"></div>

            <div style="position: absolute;width: 340px;height: 100%;top: 10px;right: 15px">
              <div style="height: 150px;    background: rgba(41,41,54,0.8);">
                <el-row class="Dashboard_card_alarm">
                  <el-col :span="12">
                    <div class="">路网拥堵评分</div>
                  </el-col>
                  <el-col :span="12">
                    <div class="">拥堵里程比例</div>
                  </el-col>
                </el-row>

                <el-row class="">
                  <el-col :span="12">
                    <RoadGauge class="Dashboard_card_roadGauge" :data="congestionPercent"></RoadGauge>
                  </el-col>
                  <el-col :span="12">
                    <div style="border-left: 2px solid #414251">
                    <div class="Dashboard_card_score" style="margin-top: 20%">
                      <b class="Dashboard_score_num">{{roadNetCongestionScore.value}}</b>
                    </div>
                    <el-progress :percentage="roadNetCongestionScore.value" :stroke-width="8" color="#ff8539"
                                 :show-text="false" style="width: 80%;margin: auto;margin-top: 5%"></el-progress>
                    </div>
                  </el-col>
                </el-row>
              </div>

              <div class="Dashboard_card_body" style="margin-top: 10px">
                <el-row class="Dashboard_card_alarm mb10">
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

                <el-row class="Dashboard_alarm_list" v-for="i in allNodeAlarmInfo" :key="i.node_id">
                  <el-col :span="6" :offset="1">
                    <!--#9f172b-->
                    <div class=""
                         :style="{'margin-top': '10%','border-left': '5px solid '+alarmColor(i.value[0].value)}">
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
                      <span :style="{color:alarmColor(i.value[0].value)}">{{i.value[0].link_direction}}进道口右转{{alarmText(i.value[0].value)}}度拥挤</span>
                      <br>
                      <span :style="{color:alarmColor(i.value[1].value)}">{{i.value[1].link_direction}}进道口右转{{alarmText(i.value[1].value)}}度拥挤</span>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import TimeLine from '../../components/TimeLine/TimeLine'
  import RoadGauge from '../../components/ECharts/RoadGaugeItem'
  import MixLineBar from '../../components/ECharts/MixLineBarItem'
  import PieDoughnut from '../../components/ECharts/PieDoughnutItem'
  import SmoothBarLine from '../../components/ECharts/SmoothBarLineItem'

  export default {
    name: "congestion-map",
    components: {
      TimeLine,
      RoadGauge,
      MixLineBar,
      PieDoughnut,
      SmoothBarLine,
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
      }
    },
    mounted() {
      let map = new window.BMap.Map("bigMap");    // 创建Map实例
      map.centerAndZoom(new window.BMap.Point(119.020306, 33.625408), 10);  // 初始化地图,设置中心点坐标和地图级别
      map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
      map.addControl(new window.BMap.NavigationControl());   //缩放按钮
      // let driving = new window.BMap.DrivingRoute(map, {
      //   renderOptions: {
      //     map: map,
      //     autoViewport: true
      //   }
      // });
      // driving.search("中关村", "天安门");
      let b = new window.BMap.Bounds(new window.BMap.Point(117.898377, 34.232956), new BMap.Point(120.414208, 32.657899));
      try {
        BMapLib.AreaRestriction.setBounds(map, b);
      } catch (e) {
        // Window.layer.msg(e);
      }
      // var cr = new window.BMap.CopyrightControl({anchor: BMAP_ANCHOR_TOP_LEFT});   //设置版权控件位置
      // map.addControl(cr); //添加版权控件
      // var bs = map.getBounds();   //返回地图可视区域0.
      this.getTrafficCongestionCongestionPercent();
      this.getTrafficCongestionRoadNetCongestionScore();
      this.getTrafficCongestionAllNodeCongestionAlarm();
    },
    methods: {
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
            this.roadNetCongestionScore = response.data;
          })
      },
      getTrafficCongestionAllNodeCongestionAlarm() {  //交叉口报警信息
        this.$http.get('/trafficCongestion/allNodeCongestionAlarm?current=true')
          .then((response) => {
            this.allNodeAlarmInfo = response.data;
            console.log(response)
          })
      },
    }
  }
</script>

<style lang="css">
  li {
    margin: 5px 0;
  }
  .Dashboard_card_roadGauge {
    height: 180px;
    margin-bottom: -70px
  }
  .el-progress-bar__inner, .el-progress-bar__outer {
    border-radius: 0 !important;
  }

  .el-progress-bar__outer {
    background: #353643 !important;
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

  ul {
    display: block;
    list-style-type: none;
    -webkit-margin-before: 0;
    -webkit-margin-after: 0;
    -webkit-margin-start: 0;
    -webkit-margin-end: 0;
    -webkit-padding-start: 0;
  }

  .Dashboard_card_body {
    background: rgba(41,41,54,0.8);
    height: 380px;
  }

  .Dashboard_card_alarm {
    line-height: 30px;
    text-align: center;
    background: #1f1f2c;
    font-size: 14px;
    color: #a7a7ac;
  }

  .mb10{
    margin-bottom: 10px
  }

  .Dashboard_alarm_list {
    text-align: center;
    background: #353644;
    color: #a7a7ac;
    margin-bottom: 5px
  }

  .el-select-dropdown {
    border: 0;
    text-align: center;
  }

  .el-select-dropdown__list {
    padding: 0 5px 5px 5px;
    background: #353644;
  }

  .el-select-dropdown__list li {
    margin: 0;
    padding: 5px;
    border-bottom: 1px solid #949494;
  }

  .el-popper .popper__arrow, .el-popper .popper__arrow::after {
    border-style: none;
  }

  .el-select-dropdown__item.selected {
    color: white;
    font-weight: 100;
    background: #353644;
  }

  .el-select-dropdown__item.selected span {
    font-size: 12px !important;
  }

  .el-select-dropdown__item {
    height: initial;
    line-height: initial;
  }

  .el-select .el-input, .el-select, .el-select input {
    height: 20px !important;
    font-size: 14px;
    background: #353643;
    border: 1px solid #353643;
  }

  .el-select .el-input__icon {
    line-height: 20px;
  }

  .Dashboard_titleSelect {
    margin: 0 10px;
  }

  .echarts {
    height: 300px;
  }

  .el-radio + .el-radio {
    margin-left: 0 !important;
  }

  .el-radio-group {
    line-height: 16px !important;
  }

  .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner,
  .el-radio__input.is-checked .el-radio__inner {
    background-color: #ef7f3e !important;
    border-color: #ef7f3e;
  }

  .el-radio__label {
    padding-left: 0 !important;
  }

  .video {
    position: relative;
    height: 300px;
    width: 400px;
  }

  img {
    position: absolute;
    height: 100%;
    width: 100%;
  }

  .Dashboard_titleCascader {
    background: #282635;
    color: white;
    font-size: 12px;
    height: 20px;
    padding: 12.5px 20px;
    margin: 0 10px;
    border-radius: 1px;
  }

  .Dashboard_box-card {
    border-radius: 1px;
    color: white;
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

