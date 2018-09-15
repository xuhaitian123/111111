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
                  <div class="">路段 <span>{{linkData.data.link.link_name}}</span></div>
                </el-col>
                <el-col :span="5">
                  <div class="">总流量 <span>{{linkData.data.link.link_lane_capacity}}vph</span></div>
                </el-col>
                <el-col :span="8">
                  <div class="" style="display: flex">
                    路段拥堵水平
                    <ul style="line-height: 30px;margin-left: 30px">
                      <li>
                        <div style="float: left;">←</div>
                        <div
                          style="width: 17px;height: 17px;background: green;float: left;border-radius: 50%;margin: 7px 10px 0 10px"></div>
                        <div
                          style="width: 17px;height: 17px;background: #e7c936;float: left;border-radius: 50%;margin: 7px 10px 0 10px"></div>
                        <div
                          style="width: 17px;height: 17px;background: darkorange;float: left;border-radius: 50%;margin: 7px 10px 0 10px"></div>
                        <div
                          style="width: 17px;height: 17px;background: red;float: left;border-radius: 50%;margin: 7px 10px 0 10px"></div>
                        <div style="float: left;">←</div>
                      </li>
                      <li>
                        <div style="float: left;">→</div>
                        <div
                          style="width: 17px;height: 17px;background: green;float: left;border-radius: 50%;margin: 7px 10px 0 10px"></div>
                        <div
                          style="width: 17px;height: 17px;background: #e7c936;float: left;border-radius: 50%;margin: 7px 10px 0 10px"></div>
                        <div
                          style="width: 17px;height: 17px;background: darkorange;float: left;border-radius: 50%;margin: 7px 10px 0 10px"></div>
                        <div
                          style="width: 17px;height: 17px;background: red;float: left;border-radius: 50%;margin: 7px 10px 0 10px"></div>
                        <div style="float: left;">→</div>
                      </li>
                    </ul>
                  </div>
                </el-col>
              </el-row>
            </div>

            <div class="Road_legend_location">
              <div class="Road_legend_title">
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

            <div class="Road_right_top">
              <div class="Road_row_title">道路流量/排队长度/饱和度数据展示</div>

              <el-row class="Road_right_link">
                <el-col :span="8">
                  <div class="" style="width: 50%;float: left;color: #c9c9cc;">
                    <div> > 150 100 50 <</div>
                    <div>
                      <div class="Road_chart_line">| | | | |</div>

                      <div style="border-bottom: 1px solid;width: 100%;float: right;">
                        <div style="width: 10px;height: 65px;background: #43af7e;float: right;"></div>
                      </div>
                    </div>
                  </div>

                  <div class="" style="width: 50%;float: right;color: #c9c9cc;">
                    <div> < 150 100 50 ></div>
                    <div style="border-left: 2px solid #c9c9cc;padding-bottom: 20px">
                      <div class="Road_chart_line">| | | | |</div>

                      <div style="border-bottom: 1px solid">
                        <div style="width: 30px;height: 65px;background: #f98d21;"></div>
                      </div>
                    </div>
                  </div>

                  <div class="Road_chart_bottom"><span>↑</span> 人民路 <span>↓</span></div>

                </el-col>
                <el-col :span="3">
                  <div class="" style="margin-top: 35px">
                    <div style="padding-bottom: 48px">南京路</div>
                    <div style="padding-bottom: 48px">南京路</div>
                  </div>
                </el-col>
                <el-col :span="7">
                  <div class="">
                    <div class="" style="width: 50%;float: left;color: #c9c9cc;">
                      <div> > 25 12 0</div>
                      <div>
                        <div class="Road_chart_line">| | | |</div>

                        <div style="border-bottom: 1px solid;width: 100%;float: right;">
                          <div style="width: 10px;height: 65px;background: #43af7e;float: right;"></div>
                        </div>
                      </div>
                    </div>

                    <div class="" style="width: 50%;float: right;color: #c9c9cc;">
                      <div> 0 12 25 ></div>
                      <div style="border-left: 2px solid #c9c9cc;padding-bottom: 20px">
                        <div class="Road_chart_line">| | | |</div>

                        <div style="border-bottom: 1px solid">
                          <div style="width: 30px;height: 65px;background: #f98d21;"></div>
                        </div>
                      </div>
                    </div>

                    <div class="Road_chart_bottom"><span>↑</span> 人民路 <span>↓</span></div>
                  </div>
                </el-col>
                <el-col :span="5">
                  <div class="Road_row_list">
                    <div>流量(vph/min)</div>
                    <ul class="">
                      <li><50 <span>--</span></li>
                      <li>50-100 <span>--</span></li>
                      <li>100-150 <span>--</span></li>
                      <li>>200 <span>--</span></li>
                    </ul>

                    <div class="Road_row_list_last">排队长度(米)</div>
                    <ul class="">
                      <li>0-12 <span>--</span></li>
                      <li>12-25 <span>--</span></li>
                      <li>25-37 <span>--</span></li>
                      <li>>50 <span>--</span></li>
                    </ul>

                    <div style="padding: 10px 15px;color: #c9c9cc">
                      <div style="margin: 10px 0">
                        <div style="background: #c94343;height: 10px;width: 15px;float: left;margin-top: 4px"></div>
                        <div style="font-size: 12px;">已饱和</div>
                      </div>
                      <div style="margin: 10px 0">
                        <div style="background: #f98d21;height: 10px;width: 15px;float: left;margin-top: 4px"></div>
                        <div style="font-size: 12px;">50 - 75%</div>
                      </div>
                      <div style="margin: 10px 0">
                        <div style="background: #eacc36;height: 10px;width: 15px;float: left;margin-top: 4px"></div>
                        <div style="font-size: 12px;">25 - 50%</div>
                      </div>
                      <div style="margin: 10px 0">
                        <div style="background: #43af7e;height: 10px;width: 15px;float: left;margin-top: 4px"></div>
                        <div style="font-size: 12px;">< 25%</div>
                      </div>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>

            <div class="Road_right_bottom">
              <div class="Road_row_title">道路协同评分/道路绿灯到达比率</div>

              <el-row>
                <el-col :span="10">
                  <div class="">
                    <div class="Road_row_subtitle">
                      道路协同评分
                    </div>

                    <road-gauge style="height: 180px;padding-top: 80px" color="#c57426"></road-gauge>
                  </div>
                </el-col>
                <el-col :span="14">
                  <div class="Road_row_subtitle">
                    道路绿灯到达比率
                  </div>

                  <el-row style="padding: 20px">
                    <el-col :span="10">
                      <div class="">
                        <div style="float: left;line-height: 50px;font-size: 12px">57.4%</div>
                        <concise-pie id="test" direction="left" style="width: 50px;height: 50px;margin: auto"></concise-pie>
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="">
                        <div style="width: 14px;height: 14px;border-radius: 50%;border: 1px solid #f98d21;margin: auto"></div>
                        <div style="height: 20px;width: 1px;background: #f98d21;margin: auto"></div>
                      </div>
                    </el-col>
                    <el-col :span="10">
                      <div class="">
                        <div style="float: right;line-height: 50px;font-size: 12px">57.4%</div>
                        <concise-pie id="test1" direction="left" style="width: 50px;height: 50px;margin: auto"></concise-pie>
                      </div>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
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
  import ConcisePie from '../../components/ECharts/ConcisePieItem'

  export default {
    components: {
      AreaSelect,
      RoadNetMap,
      TimeLine,
      RoadGauge,
      ConcisePie,
    },
    data() {
      return {
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
        this.getLinkDelayDoubleDirection();
        this.getNodeDataD3ByLinkId();
        this.getNodeDataD13ByLinkId();
        this.getNodeDataD18ByLinkId();
      },
      getLinkDelayDoubleDirection() {  //路段双向延误(双向)
        this.$http.get('/nodeData/getLinkDelayDoubleDirection?linkId=201&current=true')
          .then((response) => {
            // console.log(response)
            this.linkData = response.data
          })
      },
      getNodeDataD3ByLinkId() {  //进道口机动车流量
        this.$http.get('/nodeData/getNodeDataD3ByLinkId?linkId=201&current=true')
          .then((response) => {
            console.log(response)
          })
      },
      getNodeDataD13ByLinkId() {  //进道口排队长度
        this.$http.get('/nodeData/getNodeDataD13ByLinkId?linkId=201&current=true')
          .then((response) => {
            console.log(response)
          })
      },
      getNodeDataD18ByLinkId() {
        this.$http.get('/nodeData/getNodeDataD18ByLinkId?linkId=201&current=true')
          .then((response) => {
            console.log(response)
          })
      }
    }
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

  .Road_legend_location {
    height: 190px;
    width: 160px;
    background: rgba(41, 41, 54, 0.9);
    margin-top: 10px;
    position: absolute;
    top: 520px;
    right: 36%
  }

  .Road_legend_title {
    color: #c9c9cc;
    font-size: 14px;
    border-bottom: 2px solid #9c9c9c;
    text-align: center;
    line-height: 30px
  }

  .Road_row_link {
    width: 65%;
    position: absolute;
    top: 0;
    background: #1f1f2c;
    line-height: 60px;
  }

  .Road_right_bottom {
    position: absolute;
    width: 35%;
    height: 360px;
    background: #353644;
    top: 420px;
    right: 0;
    margin-top: 10px
  }

  .Road_right_top {
    position: absolute;
    width: 35%;
    height: 420px;
    background: #353644;
    top: -1px;
    right: 0
  }

  .Road_row_list {
    text-align: center;
  }

  .Road_row_list_last {
    padding-top: 10px;
    font-size: 14px;
  }

  .Road_row_list ul {
    padding-bottom: 10px;
    margin: 0 5px;
    border-bottom: 2px solid #494a56;
  }

  .Road_row_list div:first-child {
    font-size: 14px;
  }

  .Road_row_list span {
    position: absolute;
    right: 15px;
    line-height: 10px;
  }

  .Road_row_list li {
    font-size: 12px;
    color: #c9c9cc;
    margin: 5px 0;
  }

  .Road_row_link span {
    margin-left: 10px;
  }

  .Road_row_title {
    font-size: 14px;
    background: #1f1f2c;
    line-height: 30px;
    padding-left: 20px
  }

  .Road_row_subtitle {
    margin-top: 25px;
    text-align: center;
    font-size: 14px;
    color: #c9c9c9
  }

  .Road_right_link {
    padding: 20px 5px;
    text-align: center;
  }

  .Road_right_link div {
    font-size: 12px;
  }

  .Road_chart_line {
    padding-top: 10px;
    letter-spacing: 5px;
    padding-bottom: 3px;
    border-bottom: 1px solid;
  }

  .Road_chart_bottom {
    padding: 10px;
    clear: both
  }

  .Road_chart_bottom span {
    font-size: 20px;
    margin: 0 10px;
  }
</style>
