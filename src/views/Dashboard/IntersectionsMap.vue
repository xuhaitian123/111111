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
                  <div class="fs14">交叉口 <span>{{nodeData.node.node_name}}</span></div>
                </el-col>
                <el-col :span="5">
                  <div class="fs14">总流量 <span>{{nodeData.flow}}vph</span></div>
                </el-col>
                <el-col :span="8">
                  <div class="fs14" style="display: flex">
                    交叉口拥堵水平
                    <ul style="line-height: 30px;margin-left: 30px">
                      <li>
                        <div class="Road_border" :style="{border: nodeData.value <30 ? '1px solid green' :'0' }">
                          <div class="Road_circle"
                               style="background: green;"></div>
                        </div>
                        <div class="Road_border"
                             :style="{border: nodeData.value <50&&nodeData.value >30 ? '1px solid #e7c936' :'0' }">
                          <div class="Road_circle"
                               style="background: #e7c936;"></div>
                        </div>
                        <div class="Road_border"
                             :style="{border: nodeData.value <60&&nodeData.value >50 ? '1px solid darkorange' :'0' }">
                          <div class="Road_circle"
                               style="background: darkorange;"></div>
                        </div>
                        <div class="Road_border" :style="{border: nodeData.value >60 ? '1px solid red' :'0' }">
                          <div class="Road_circle"
                               style="background: red;"></div>
                        </div>
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
                  <el-row style="padding: 40px 20px 0;text-align: center">
                    <el-col :span="3" v-for="(value,index) in currentSignal" :key="index" v-if="value.value !== null">
                      <div class="" style="margin-bottom: 5px">{{value.link_direction}}</div>
                      <div style="height: 86px;border-radius: 10px;width: 30px;background: #2a2b36;margin: auto">
                        <ul class="Node_signal_lamp">
                          <li :style="{background : value.value === 'Red' ? 'red':''}"></li>
                          <li :style="{background : value.value === 'Yellow' ? 'yellow':''}"></li>
                          <li :style="{background : value.value === 'Green' ? 'green':''}"></li>
                        </ul>
                      </div>
                    </el-col>
                  </el-row>
                  <div style="margin: 20px 20px 0;">
                    <div @mousemove="changeSignalLine" @mouseup='stopChange' @mouseleave="stopChange"
                      style="border-bottom: 1px solid #c9c9cc;border-top: 1px solid #c9c9cc;font-size: 12px;padding: 0 5px 20px;position: relative">
                        <div class="signal_current_line" id="signal_line" @mousedown="moveSignalLine" :style="{left: lineLeft+'px'}"></div>
                      <el-row>
                        <el-col :span="6">
                          <div v-if="signalPlan['111']!==undefined">
                            <div>{{getRoadFlow(signalPlan['111'].key)}}</div>

                            <div :style="{width: (signalPlan['111'].MaxGreen/ signalPlan['111'].total)*100+'%'}"
                                 style="height: 12px;background: green;float: left">{{signalPlan['111'].MaxGreen}}s
                            </div>
                            <div :style="{width: (signalPlan['111'].Yellow / signalPlan['111'].total)*100+'%'}"
                                 style="height: 12px;background: darkorange;float: left"></div>
                            <div :style="{width: (signalPlan['111'].AllRed / signalPlan['111'].total)*100+'%'}"
                                 style="height: 12px;background: red;float: left"></div>
                          </div>
                        </el-col>
                        <el-col :span="6">
                          <div v-if="signalPlan['112']!==undefined">
                            <div>{{getRoadFlow(signalPlan['112'].key)}}</div>

                            <div :style="{width: (signalPlan['112'].MaxGreen/ signalPlan['112'].total)*100+'%'}"
                                 style="height: 12px;background: green;float: left">{{signalPlan['112'].MaxGreen}}s
                            </div>
                            <div :style="{width: (signalPlan['112'].Yellow / signalPlan['112'].total)*100+'%'}"
                                 style="height: 12px;background: darkorange;float: left"></div>
                            <div :style="{width: (signalPlan['112'].AllRed / signalPlan['112'].total)*100+'%'}"
                                 style="height: 12px;background: red;float: left"></div>
                          </div>
                        </el-col>
                        <el-col :span="6">
                          <div v-if="signalPlan['121']!==undefined">
                            <div>{{getRoadFlow(signalPlan['121'].key)}}</div>

                            <div :style="{width: (signalPlan['121'].MaxGreen/ signalPlan['121'].total)*100+'%'}"
                                 style="height: 12px;background: green;float: left">{{signalPlan['121'].MaxGreen}}s
                            </div>
                            <div :style="{width: (signalPlan['121'].Yellow / signalPlan['121'].total)*100+'%'}"
                                 style="height: 12px;background: darkorange;float: left"></div>
                            <div :style="{width: (signalPlan['121'].AllRed / signalPlan['121'].total)*100+'%'}"
                                 style="height: 12px;background: red;float: left"></div>
                          </div>
                        </el-col>
                        <el-col :span="6">
                          <div v-if="signalPlan['122']!==undefined">
                            <div>{{getRoadFlow(signalPlan['122'].key)}}</div>

                            <div :style="{width: (signalPlan['122'].MaxGreen/ signalPlan['122'].total)*100+'%'}"
                                 style="height: 12px;background: green;float: left">{{signalPlan['122'].MaxGreen}}s
                            </div>
                            <div :style="{width: (signalPlan['122'].Yellow / signalPlan['122'].total)*100+'%'}"
                                 style="height: 12px;background: darkorange;float: left"></div>
                            <div :style="{width: (signalPlan['122'].AllRed / signalPlan['122'].total)*100+'%'}"
                                 style="height: 12px;background: red;float: left"></div>
                          </div>
                        </el-col>
                      </el-row>

                      <el-row>
                        <el-col :span="6">
                          <div v-if="signalPlan['211']!==undefined">
                            <div>{{getRoadFlow(signalPlan['211'].key)}}</div>

                            <div :style="{width: (signalPlan['211'].MaxGreen/ signalPlan['211'].total)*100+'%'}"
                                 style="height: 12px;background: green;float: left">{{signalPlan['211'].MaxGreen}}s
                            </div>
                            <div :style="{width: (signalPlan['211'].Yellow / signalPlan['211'].total)*100+'%'}"
                                 style="height: 12px;background: darkorange;float: left"></div>
                            <div :style="{width: (signalPlan['211'].AllRed / signalPlan['211'].total)*100+'%'}"
                                 style="height: 12px;background: red;float: left"></div>
                          </div>
                        </el-col>
                        <el-col :span="6">
                          <div v-if="signalPlan['212']!==undefined">
                            <div>{{getRoadFlow(signalPlan['212'].key)}}</div>

                            <div :style="{width: (signalPlan['212'].MaxGreen/ signalPlan['212'].total)*100+'%'}"
                                 style="height: 12px;background: green;float: left">{{signalPlan['212'].MaxGreen}}s
                            </div>
                            <div :style="{width: (signalPlan['212'].Yellow / signalPlan['212'].total)*100+'%'}"
                                 style="height: 12px;background: darkorange;float: left"></div>
                            <div :style="{width: (signalPlan['212'].AllRed / signalPlan['212'].total)*100+'%'}"
                                 style="height: 12px;background: red;float: left"></div>
                          </div>
                        </el-col>
                        <el-col :span="6">
                          <div v-if="signalPlan['221']!==undefined">
                            <div>{{getRoadFlow(signalPlan['221'].key)}}</div>

                            <div :style="{width: (signalPlan['221'].MaxGreen/ signalPlan['221'].total)*100+'%'}"
                                 style="height: 12px;background: green;float: left">{{signalPlan['221'].MaxGreen}}s
                            </div>
                            <div :style="{width: (signalPlan['221'].Yellow / signalPlan['221'].total)*100+'%'}"
                                 style="height: 12px;background: darkorange;float: left"></div>
                            <div :style="{width: (signalPlan['221'].AllRed / signalPlan['221'].total)*100+'%'}"
                                 style="height: 12px;background: red;float: left"></div>
                          </div>
                        </el-col>
                        <el-col :span="6">
                          <div v-if="signalPlan['222']!==undefined">
                            <div>{{getRoadFlow(signalPlan['222'].key)}}</div>

                            <div :style="{width: (signalPlan['222'].MaxGreen/ signalPlan['222'].total)*100+'%'}"
                                 style="height: 12px;background: green;float: left">{{signalPlan['222'].MaxGreen}}s
                            </div>
                            <div :style="{width: (signalPlan['222'].Yellow / signalPlan['222'].total)*100+'%'}"
                                 style="height: 12px;background: darkorange;float: left"></div>
                            <div :style="{width: (signalPlan['222'].AllRed / signalPlan['222'].total)*100+'%'}"
                                 style="height: 12px;background: red;float: left"></div>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
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
                            <div style="background: green;height: 10px;width: 15px;float: left;margin-top: 4px"></div>
                            <div style="font-size: 12px;">< 25%</div>
                          </div>
                        </div>
                      </div>
                    </el-col>
                    <el-col :span="2" style="padding-top: 170px;font-size: 12px">
                      南
                      <div style="padding-top: 20px"> →</div>
                    </el-col>
                    <el-col :span="14">
                      <div style="font-size: 12px;padding-left: 38%;">↓ 人民路</div>
                      <div style="display: flex;flex-wrap: wrap;">
                        <div class="block" style="text-align: center">
                          <div style="padding-top: 50%;letter-spacing: 10px"><span>></span> <span>25</span>
                            <span>12</span> <span>0</span>
                          </div>
                          <div style="letter-spacing: 10px"> | | | |</div>
                        </div>
                        <div class="block"
                             style="border-left: 3px solid #c9c9cc;border-right: 3px solid #c9c9cc;position:relative;">
                          <div
                            :style="{height: nodeLength.values[3].value+'px',background: getSaturationColor(nodeLength.values[3].value)}"
                            style="width: 100%;position: absolute;bottom: 0"></div>
                        </div>
                        <div class="block">
                          <div class="Node_length_list Node_length_list_right">
                            <ul class="">
                              <li><span>--</span>>50</li>
                              <li><span>--</span>25-37</li>
                              <li><span>--</span>12-25</li>
                              <li><span>--</span>0-12</li>
                            </ul>
                          </div>
                        </div>
                        <div class="block" style="border-top: 3px solid #c9c9cc;border-bottom: 3px solid #c9c9cc">
                          <div
                            :style="{width: nodeLength.values[2].value+'px',background: getSaturationColor(nodeLength.values[2].value)}"
                            style="height: 100%;float: right"></div>
                        </div>
                        <div class="block" style="border: 3px solid #c9c9cc;"></div>
                        <div class="block" style="border-top: 3px solid #c9c9cc;border-bottom: 3px solid #c9c9cc">
                          <div
                            :style="{width: nodeLength.values[0].value+'px',background: getSaturationColor(nodeLength.values[0].value)}"
                            style="height: 100%;"></div>
                        </div>
                        <div class="block">
                          <div class="Node_length_list Node_length_list_left" style="text-align: right">
                            <ul class="">
                              <li>0-12 <span>--</span></li>
                              <li>12-25 <span>--</span></li>
                              <li>25-37 <span>--</span></li>
                              <li>>50 <span>--</span></li>
                            </ul>
                          </div>
                        </div>
                        <div class="block" style="border-left: 3px solid #c9c9cc;border-right: 3px solid #c9c9cc">
                          <div
                            :style="{height: nodeLength.values[1].value+'px',background: getSaturationColor(nodeLength.values[1].value)}"
                            style="width: 100%;"></div>
                        </div>
                        <div class="block" style="padding-left: 15px">
                          <div style="letter-spacing: 10px"> | | | |</div>
                          <div style="letter-spacing: 10px"><span>0</span> <span>12</span> <span>25</span>
                            <span> > </span></div>
                        </div>
                        <div style="font-size: 12px;padding-left: 38%;">人民路 ↑</div>
                      </div>
                    </el-col>
                    <el-col :span="2" style="font-size: 12px">
                      <div style="font-size: 16px">N</div>
                      <div style="padding-top: 130px;padding-bottom: 20px"> ←</div>
                      南
                    </el-col>
                  </el-row>
                </el-tab-pane>
              </el-tabs>

              <el-tabs type="border-card" style="height: 290px;margin-top: 10px;background: #353644">
                <el-tab-pane label="交叉口机动车/非机动车流量">
                  <el-row>
                    <el-col :span="12">
                      <div class=""></div>
                    </el-col>
                    <el-col :span="12">
                      <div class=""></div>
                    </el-col>
                  </el-row>
                </el-tab-pane>
                <el-tab-pane label="交叉口延误数据">
                  <el-row>
                    <el-col :span="16">
                      <div class="grid-content bg-purple">1</div>
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
        nodeData: {
          node: {}
        },
        currentSignal: [],
        nodeLength: {
          values: [
            {}, {}, {}, {}
          ]
        },
        signalPlan: {},
        lineLeft:0,
        startPosition: 0,
        endPosition: 0,
        isChangeTime: false,
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        this.getNodeCongestionSource();
        this.getRoadNetCongestionScore();
        this.getCurrentSignalByNodeId();
        this.getNodeAllDataD13ByNodeId();
        this.getSignalByNodeId();
        this.changePosition();
      },
      jumpPage(key) {
        this.$router.push(key);
      },
      getNodeDataD5ByNodeId(nodeId) {  //机动车流量 + 非机动车流量
        return new Promise((resolve, reject) => {
          this.$http.get('/nodeData/getNodeDataD5ByNodeId?nodeId=' + nodeId + '&current=true')
            .then((response) => {
              this.$http.get('/nodeData/getNodeDataD6ByNodeId?nodeId=' + nodeId + '&current=true')
                .then((result) => {
                  resolve(response.data.value + result.data.value)
                })
            })
        });
      },
      getNodeCongestionSource() { //交叉口延误数据
        this.$http.get('/nodeData/getNodeDataD12ByNodeId?nodeId=' + this.$route.params.id + '&current=true')
          .then((response) => {
            this.getNodeDataD5ByNodeId(response.data.node_id).then((data) => {
              response.data.flow = data;
              this.nodeData = response.data;
            });
          })
      },
      getRoadNetCongestionScore() { //路网拥堵评分
        this.$http
          .get('/TrafficCongestion/roadNetCongestionScore?current=true')
          .then((response) => {
            this.roadNetCongestionScore = response.data.value;
          })
      },
      getCurrentSignalByNodeId() {  //实时红绿灯
        this.$http.get('/signal/currentSignalByNodeId?nodeId=' + this.$route.params.id)
          .then((response) => {
            this.currentSignal = response.data.values.filter((val) => {
              return val.value !== null
            });
          });

        this.$http.get('/signal/currentSignalByLinkId?linkId=201')
          .then((response) => {
            // console.log(response)
          })

        this.$http.get('/signal/currentSignalByMovementId?movementId=201')
          .then((response) => {
            // console.log(response)
          })
      },
      getNodeAllDataD13ByNodeId() {  //交叉口排队长度
        this.$http.get('/nodeData/getNodeAllDataD13ByNodeId?nodeId=' + this.$route.params.id + '&current=true')
          .then((response) => {
            console.log(response)
            this.nodeLength = response.data;
          })
      },
      getSignalByNodeId() { //信号灯配时方案
        this.$http.get('/signal/signalByNodeId?nodeId=2&current=true')
          .then((response) => {
            let obj = {}
            response.data.forEach((value) => {
              value.total = value.AllRed + value.MaxGreen + value.Yellow;
              obj[value.BRP] = value;
            });
            this.signalPlan = obj;
          })
      },
      getRoadFlow(key) {
        let text = '';
        switch (key) {
          case 'd1':
            text = '← d1';
            break;
          case 'd2':
            text = '↑ d2';
            break;
          case 'd3':
            text='← d3';
            break;
          case 'd4':
            text='→ d4';
            break;
          case 'd5':
            text='← d5';
            break;
          case 'd6':
            text='↓ d6';
            break;
          case 'd7':
            text='→ d7';
            break;
          case 'd8':
            text='→ d8';
            break;
        }
        return text
      },
      getSaturationColor(num) {
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
      moveSignalLine(e){
        this.isChangeTime = true;
        this.startPosition = e.clientX;
      },
      changeSignalLine(e) {
        if (!this.isChangeTime) return;
        this.endPosition = e.clientX;
        if(this.lineLeft + this.endPosition - this.startPosition > 0){
          document.getElementById('signal_line').style.left = this.lineLeft + this.endPosition - this.startPosition + 'px'
        }
      },
      stopChange(){
        if(this.isChangeTime ){
          this.isChangeTime = false;
          this.changePosition();
        }
      },
      changePosition() {
        if (this.endPosition && this.startPosition) {
          this.lineLeft = this.lineLeft + this.endPosition - this.startPosition;
          this.endPosition = 0;
          this.startPosition = 0;
        }
      },
    },
  }
</script>

<style scoped>
  .Road_border {
    width: 19px;
    height: 19px;
    border-radius: 50%;
    float: left;
    margin: 7px 10px 0 10px;
  }

  .Road_circle {
    width: 17px;
    height: 17px;
    border-radius: 50%;
    margin: 1px 0 0 1px
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

  .Node_delay_time li {
    color: #c9c9cc;
    padding: 10px 0;
    font-size: 12px;
  }

  .block {
    height: 110px;
    width: 30%;
    color: #c9c9cc;
    line-height: 25px;
    font-size: 12px;
  }

  .block span {
    letter-spacing: 0;
  }

  .Node_length_list {
    padding: 0 20px;
  }

  .Node_length_list_right span {
    margin-right: 10px;
  }

  .Node_length_list_left span {
    margin-left: 10px;
  }

  .signal_current_line {
    position: absolute;
    top: 0;
    width: 16px;
    height: 100%;
    background-size: cover;
    overflow: visible;
    z-index: 70;
    background: url("../../../static/timeLine/line.png") center;
    background-size: 20px 100%;
  }

  .signal_current_line image {
    position: absolute;
    width: 40px;
    height: 80px;
  }

</style>
