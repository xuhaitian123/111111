<template>
  <div>
    <area-select></area-select>
    <el-row :gutter="10" class="Dashboard_lineRow">
      <el-col>
        <el-card shadow="never" :body-style="{ padding: '0px' }" class="Dashboard_box_card">
          <div class="Dashboard_clearfix">
            <span><i class="el-icon-arrow-left" style="margin-right: 10px" @click="jumpPage('/main/dashboard')"></i>路段数据展示</span>
            <div style="float: right; padding: 3px 0">
              <i class="iconfont icon-webicon03"></i>
            </div>
          </div>
          <div class="" style="position: relative;background: #1f1f2c">
            <div style="width: 65%;height: 720px"></div>

            <div class="Road_row_link">
              <el-row type="flex" justify="space-around">
                <el-col :span="5">
                  <div class="fs14">交叉口 <span>{{linkData.data.link.link_name}}</span></div>
                </el-col>
                <el-col :span="5">
                  <div class="fs14">总流量 <span>{{linkData.data.link.link_lane_capacity}}vph</span></div>
                </el-col>
                <el-col :span="8">
                  <div class="fs14" style="display: flex">
                    交叉口拥堵水平
                    <ul style="line-height: 30px;margin-left: 30px">
                      <li>
                        <div
                          style="width: 17px;height: 17px;background: green;float: left;border-radius: 50%;margin: 7px 10px 0 10px"></div>
                        <div
                          style="width: 17px;height: 17px;background: #e7c936;float: left;border-radius: 50%;margin: 7px 10px 0 10px"></div>
                        <div
                          style="width: 17px;height: 17px;background: darkorange;float: left;border-radius: 50%;margin: 7px 10px 0 10px"></div>
                        <div
                          style="width: 17px;height: 17px;background: red;float: left;border-radius: 50%;margin: 7px 10px 0 10px"></div>
                      </li>
                    </ul>
                  </div>
                </el-col>
              </el-row>
            </div>

            <div
              style="position: absolute;right: 37%;top: 50px;height: 140px;width: 170px;background:  rgba(41,41,54,0.9);text-align: center">
              <div style="font-size: 14px;margin-top: 10px">路网拥堵评分</div>
              <road-gauge :data="roadNetCongestionScore" class="Dashboard_card_roadGauge"></road-gauge>
            </div>

            <div class="Node_right_top">
              <el-tabs type="border-card" style="height: 420px;background: #353644">
                <el-tab-pane label="当前信号灯配时方案">
                  <el-row style="padding: 40px 20px 0 20px;text-align: center">
                    <el-col :span="3">
                      <div class="" style="margin-bottom: 5px">东</div>
                      <div style="height: 86px;border-radius: 10px;width: 30px;background: #2a2b36;margin: auto">
                        <ul class="Node_signal_lamp">
                          <li></li>
                          <li></li>
                          <li></li>
                        </ul>
                      </div>
                    </el-col>
                    <el-col :span="3">
                      <div class="">西</div>
                    </el-col>
                    <el-col :span="3">
                      <div class="">南</div>
                    </el-col>
                  </el-row>
                </el-tab-pane>
                <el-tab-pane label="交叉口饱和度/排队长度数据展示">
                  <el-row>
                    <el-col :span="6" style="padding: 20px 10px ">
                      <div class="Node_row_list">
                        <div class="Node_row_list_title">排队长度 / 米</div>
                        <ul class="">
                          <li>0-12 <span>--</span></li>
                          <li>12-25 <span>--</span></li>
                          <li>25-37 <span>--</span></li>
                          <li>>50 <span>--</span></li>
                        </ul>

                        <div style="padding: 10px 15px;color: #c9c9cc">
                          <div style="text-align: left;font-size: 12px">
                            饱和度
                          </div>
                          <div class="Node_div_list">
                            <div style="background: #c94343;height: 10px;width: 15px;float: left;margin-top: 4px"></div>
                            <div style="font-size: 12px;">已饱和</div>
                          </div>
                          <div class="Node_div_list">
                            <div style="background: #f98d21;height: 10px;width: 15px;float: left;margin-top: 4px"></div>
                            <div style="font-size: 12px;">50 - 75%</div>
                          </div>
                          <div class="Node_div_list">
                            <div style="background: #eacc36;height: 10px;width: 15px;float: left;margin-top: 4px"></div>
                            <div style="font-size: 12px;">25 - 50%</div>
                          </div>
                          <div class="Node_div_list">
                            <div style="background: #43af7e;height: 10px;width: 15px;float: left;margin-top: 4px"></div>
                            <div style="font-size: 12px;">< 25%</div>
                          </div>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="18">
                      <div class="grid-content bg-purple-light">
                        123
                      </div>
                    </el-col>
                  </el-row>
                </el-tab-pane>
              </el-tabs>

              <el-tabs type="border-card" style="height: 290px;margin-top: 10px;background: #353644">
                <el-tab-pane label="交叉口机动车/非机动车流量">交叉口延误数据</el-tab-pane>
                <el-tab-pane label="交叉口延误数据">
                  <el-row>
                    <el-col :span="16">
                      <div class="grid-content bg-purple">123</div>
                    </el-col>
                    <el-col :span="8" style="padding: 50px 0 0 20px">
                      <div class="">
                        <ul class="Node_delay_time">
                          <li>
                            <span>延误时间 < 30秒</span>
                          </li>
                          <li>
                            <span>延误时间 30-50秒</span>
                          </li>
                          <li>
                            <span>延误时间 50-60秒</span>
                          </li>
                          <li>
                            <span>延误时间 > 60秒</span>
                          </li>
                        </ul>
                      </div>
                    </el-col>
                  </el-row>
                </el-tab-pane>
              </el-tabs>
            </div>
          </div>
          <div style="width: 100%;margin-top: 20px;margin-bottom: 30px">
            <time-line></time-line>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import AreaSelect from '../../components/Area/Area'
  import RoadNetMap from '../../components/Map/Map'
  import TimeLine from '../../components/TimeLine/TimeLine'
  import RoadGauge from '../../components/ECharts/RoadGaugeItem'

  export default {
    components: {
      AreaSelect,
      RoadNetMap,
      TimeLine,
      RoadGauge,
    },
    data() {
      return {
        roadNetCongestionScore: 0,
        linkData: {
          data: {link: {}},
          related_data: {}
        },
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        this.getNodeCongestionSource();
        this.getNodeDataD5ByNodeId();
        this.getNodeDataD12ByNodeId();
        this.getRoadNetCongestionScore();
      },
      getNodeCongestionSource() { //交叉口拥堵评分
        this.$http.get('/trafficCongestion/nodeCongestionSource?current=true&nodeId=1')
          .then((response) => {
            // console.log(response)
          })
      },
      getRoadNetCongestionScore() { //路网拥堵评分
        this.$http
          .get('/TrafficCongestion/roadNetCongestionScore?current=true')
          .then((response) => {
            this.roadNetCongestionScore = response.data.value;
          })
      },
      getNodeDataD5ByNodeId() { //交叉口机动车流量
        this.$http.get('nodeData/getNodeDataD5ByNodeId?nodeId=2&current=true')
          .then((response) => {
            console.log(response)
          })
      },
      getNodeDataD12ByNodeId() { //交叉口延误数据
        this.$http.get('/nodeData/getNodeDataD12ByNodeId?nodeId=2&current=true')
          .then((response) => {
            console.log(response)
          })
      }
    },
  }
</script>

<style scoped>
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

  .Road_row_link {
    width: 63%;
    position: absolute;
    top: 10px;
    left: 1%;
    background: #1f1f2c;
    line-height: 30px;
  }

  .Road_row_link span {
    margin-left: 10px;
  }

  .Dashboard_card_roadGauge {
    height: 180px;
    margin-bottom: -70px
  }

  .Node_right_top {
    position: absolute;
    width: 35%;
    background: #1f1f2c;
    top: -1px;
    right: 0
  }

  .Node_signal_lamp {
    padding-top: 2px;
  }

  .Node_signal_lamp li {
    width: 21px;
    height: 21px;
    margin: 5px auto;
    border-radius: 50%;
    background: #21222b;
  }

  .Node_row_list {
    text-align: center;
  }

  .Node_row_list ul {
    padding-bottom: 10px;
    margin: 0 5px;
    border-bottom: 2px solid #494a56;
  }

  .Node_row_list span {
    position: absolute;
    left: 35px;
    line-height: 10px;
  }

  .Node_row_list li {
    font-size: 12px;
    color: #c9c9cc;
    margin: 10px 0;
  }

  .Node_div_list {
    margin: 20px 0;
  }

  .Node_delay_time li{
    color: #c9c9cc;
    padding: 10px 0;
    font-size: 12px;
  }

</style>
