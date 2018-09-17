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
            <road-net-map style="width: 65%"></road-net-map>

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
              <el-tabs type="border-card">
                <el-tab-pane label="当前信号灯配时方案">当前信号灯配时方案</el-tab-pane>
                <el-tab-pane label="交叉口饱和度/排队长度数据展示">交叉口饱和度/排队长度数据展示</el-tab-pane>
              </el-tabs>
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
    height: 420px;
    background: #353644;
    top: -1px;
    right: 0
  }


</style>
