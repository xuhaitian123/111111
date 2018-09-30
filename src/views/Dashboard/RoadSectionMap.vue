<template>
  <div>
    <area-select></area-select>
    <el-row :gutter="10" class="Dashboard_lineRow">
      <el-col>
        <el-card shadow="never" :body-style="{ padding: '0px' }" class="Dashboard_box_card">
          <div class="Dashboard_clearfix">
            <span><i class="el-icon-arrow-left" style="margin-right: 10px" @click="jumpPage('/main/dashboard')"></i>交通走廊数据</span>
            <div style="float: right; padding: 3px 0">
              <i class="iconfont icon-webicon03"></i>
            </div>
          </div>
          <div class="" style="position: relative;background: #282a37;">
            <road-net-map style="width: 65%;height: 935px;" :all-node-delay="allNodeDelay"
                          :all-links-delay="allLinksDelay"></road-net-map>

            <div class="Road_row_link">
              <el-row type="flex" justify="space-around">
                <el-col :span="5">
                  <div class="">交通走廊 <span>{{linkData.data.link.link_name}}</span></div>
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
                        <div class="Road_border" :style="{border: linkData.data.value <=30 ? '1px solid green' :'0' }">
                          <div class="Road_circle"
                               style="background: green;"></div>
                        </div>
                        <div class="Road_border">
                          <div class="Road_circle"
                               :style="{border: linkData.data.value <=50&&linkData.data.value >30 ? '1px solid #e7c936' :'0' }"
                               style="background: #e7c936;"></div>
                        </div>
                        <div class="Road_border"
                             :style="{border: linkData.data.value <=60&&linkData.data.value >50 ? '1px solid darkorange' :'0' }">
                          <div class="Road_circle"
                               style="background: darkorange;"></div>
                        </div>
                        <div class="Road_border" :style="{border: linkData.data.value >60 ? '1px solid red' :'0' }">
                          <div class="Road_circle"
                               style="background: red;"></div>
                        </div>
                        <div style="float: left;">←</div>
                      </li>
                      <li>
                        <div style="float: left;">→</div>
                        <div class="Road_border"
                             :style="{border: linkData.related_data.value <= 30 ? '1px solid green' :'0' }">
                          <div class="Road_circle"
                               style="background: green;"></div>
                        </div>
                        <div class="Road_border">
                          <div class="Road_circle"
                               :style="{border: linkData.related_data.value <=50&&linkData.related_data.value >30 ? '1px solid #e7c936' :'0' }"
                               style="background: #e7c936;"></div>
                        </div>
                        <div class="Road_border"
                             :style="{border: linkData.related_data.value <=60&&linkData.related_data.value >50 ? '1px solid darkorange' :'0' }">
                          <div class="Road_circle"
                               style="background: darkorange;"></div>
                        </div>
                        <div class="Road_border"
                             :style="{border: linkData.related_data.value >60 ? '1px solid red' :'0' }">
                          <div class="Road_circle"
                               style="background: red;"></div>
                        </div>
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

            <div class="Road_right_top" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.8)">
              <div class="Road_row_title">交通走廊流量/排队长度/饱和度数据展示</div>

              <el-row class="Road_right_link">
                <el-col :span="8">
                  <div class="">
                    <div class="" style="width: 50%;float: left;color: #c9c9cc;">
                      <div> > 150 100 50 <</div>
                      <div class="Road_chart_line">| | | | |</div>

                      <div v-for="(link,i) in linksInfo[0]"
                           style="border-bottom: 1px solid;width: 100%;float: right;overflow: hidden">
                        <div
                          :style="{width: getFlowNum(link.flow)+'%',background: getFlowColor(link.flow),height: 250 / linksInfo[0].length +'px'}"
                          style="float: right;"></div>
                      </div>

                    </div>
                    <div
                      style="float: left;width: 1%;background: #c9c9cc;margin-top: 20px;padding-top: 40px;height: 250px"></div>
                    <!--:style="{height: 65 * (linksInfo[0].length > 4 ? 4 : linksInfo[0].length ) +'px'}"-->

                    <div class="" style="width: 49%;float: right;color: #c9c9cc;">
                      <div> < 50 100 150 ></div>
                      <div class="Road_chart_line">| | | | |</div>

                      <div style="border-bottom: 1px solid;overflow: hidden" v-for="(link ,i) in linksInfo[1]">
                        <div
                          :style="{width: getFlowNum(link.flow)+'%',background: getFlowColor(link.flow),height: 250 / linksInfo[0].length +'px'}"
                          style="width: 30px;"></div>
                      </div>

                    </div>

                    <div class="Road_chart_bottom"><span>↑</span> {{allLinkId.link_name}} <span>↓</span></div>
                  </div>
                </el-col>
                <el-col :span="3">
                  <div class="" style="margin-top: 20px">
                    <div v-for="(name,i) in scoreName" :key="name"
                         :style="{lineHeight: (250 / scoreName.length) +  'px'}">
                      {{name}}
                    </div>
                  </div>
                </el-col>
                <el-col :span="7">
                  <div class="">
                    <div class="" style="width: 50%;float: left;color: #c9c9cc;">
                      <div> > 25 12 0</div>
                      <div class="Road_chart_line">| | | | |</div>

                      <div v-for="(link,i) in linksInfo[0]" style="border-bottom: 1px solid;width: 100%;float: right;">
                        <div
                          :style="{width: getFlowNum(link.lineLength)+'px',background: getFlowColor(link.lineLength),height: 250 / linksInfo[0].length +'px'}"
                          style="float: right;"></div>
                      </div>

                    </div>
                    <div
                      style="float: left;width: 1%;background: #c9c9cc;margin-top: 20px;padding-top: 40px;height: 250px"></div>
                    <div class="" style="width: 49%;float: right;color: #c9c9cc;">
                      <div> 0 12 25 ></div>
                      <div class="Road_chart_line">| | | |</div>

                      <div style="border-bottom: 1px solid" v-for="(link ,i) in linksInfo[1]">
                        <div
                          :style="{width: getFlowNum(link.lineLength)+'px',background: getFlowColor(link.lineLength),height: 250 / linksInfo[0].length +'px'}"
                          style="width: 30px;"></div>
                      </div>

                    </div>

                    <div class="Road_chart_bottom"><span>↑</span> {{allLinkId.link_name}} <span>↓</span></div>
                  </div>
                </el-col>
                <el-col :span="4" :offset="1">
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

                    <div style="padding: 10px 8px;color: #c9c9cc">
                      <div style="margin: 10px 0">
                        <div
                          style="background: #c94343;height: 10px;width: 15px;float: left;margin-top: 4px;margin-right: 5px;"></div>
                        <div style="font-size: 12px;">已饱和</div>
                      </div>
                      <div style="margin: 10px 0">
                        <div
                          style="background: #f98d21;height: 10px;width: 15px;float: left;margin-top: 4px;margin-right: 5px;"></div>
                        <div style="font-size: 12px;">50 - 75%</div>
                      </div>
                      <div style="margin: 10px 0">
                        <div
                          style="background: #eacc36;height: 10px;width: 15px;float: left;margin-top: 4px;margin-right: 5px;"></div>
                        <div style="font-size: 12px;">25 - 50%</div>
                      </div>
                      <div style="margin: 10px 0">
                        <div
                          style="background: green;height: 10px;width: 15px;float: left;margin-top: 4px;margin-right: 5px;"></div>
                        <div style="font-size: 12px;">< 25%</div>
                      </div>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>

            <div class="Road_right_bottom" v-loading="loadingNode" element-loading-background="rgba(0, 0, 0, 0.8)">
              <div class="Road_row_title">交通运行评分</div>

              <el-row>
                <el-col :span="10">
                  <div class="">
                    <div class="Road_row_subtitle">
                      交通走廊
                    </div>

                    <road-gauge :data="corridorScore.toFixed(0)" style="height: 180px;padding-top: 80px"
                                :color="scoreColor(corridorScore)"></road-gauge>
                  </div>
                </el-col>
                <el-col :span="14">
                  <div class="Road_row_subtitle">
                    交叉口
                  </div>

                  <el-row style="margin: 0 20px">
                    <div v-if="!allScore[0]"
                         style="position: absolute;top: 40px;text-align: center;width: 100%;font-size: 20px;color: #7c7c7c">
                      暂无数据
                    </div>
                    <el-col :span="10">
                      <div class="" v-for="(item,i) in allScore" style="margin-bottom: 10px;padding: 0 10px">
                        <div style="float: left;line-height: 40px;font-size: 12px">{{item[0].value.toFixed(0)}}</div>
                        <concise-pie :id="'pie_left_'+item[0].link.link_id" :data="item[0]"
                                     style="width: 40px;height: 40px;margin: auto"></concise-pie>
                      </div>
                    </el-col>
                    <el-col :span="4" style="padding-top: 15px">
                      <div class="" v-for="(item,i) in scoreName" style="position: relative;">
                        <div
                          style="width: 14px;height: 14px;border-radius: 50%;border: 1px solid #f98d21;margin: auto;"></div>
                        <div style="font-size: 12px;position: absolute;top: -5px;margin-left: 35px;width: 60px">
                          {{item}}
                        </div>
                        <div v-if="i < scoreName.length -1 "
                             style="height: 33px;width: 1px;background: #f98d21;margin: auto"></div>
                      </div>
                    </el-col>
                    <el-col :span="10">
                      <div class="" v-for="(item,i) in allScore" style="margin-bottom: 10px;padding: 0 10px">
                        <div style="float: right;line-height: 40px;font-size: 12px">{{item[1].value.toFixed(0)}}</div>
                        <concise-pie :id="'pie_right_'+item[1].link.link_id" :data="item[1]"
                                     style="width: 40px;height: 40px;margin: auto"></concise-pie>
                      </div>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </div>

            <div style="position:absolute;bottom: 30px;width: 100%">
              <time-line @newTime="getNewTime"></time-line>
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
        allLinkId: {},
        linksInfo: [
          [], []
        ],
        allNodeDelay: [],
        allLinksDelay: [],
        startTime: 0,
        loading: false,
        loadingNode: false,
        allScore: [],
        scoreName: [],
        corridorScore: 0,
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        this.getAllData();
        window.congestionMap.centerAndZoom(new window.BMap.Point(this.$route.query.lng || 119.173971, this.$route.query.lat || 33.51613), 18);
      },
      getAllData(startTime, endTime) {
        this.getAllLinkId();
        this.getLinkDelayDoubleDirection(startTime, endTime);
        this.getAllDelay(startTime, endTime);
        this.getLinkByNodeScore(startTime, endTime);
      },
      setUrlDate(startTime, endTime) {
        return (startTime && endTime) ? '&start=' + startTime + '&end=' + endTime + '&current=false' : '&current=true';
      },
      getLinkByNodeScore() {
        this.loadingNode = true;
        this.$http.get('trafficCongestion/roadAvgDelay?linkId=' + this.$route.params.id + '&current=true&token=' + this.getHeader().token)
          .then((response) => {
            let linkName = response.data.link.link_name;
            let url = '/roadDataAnalysis/getCorridorCongestionSourceByRoadName?token=' + this.getHeader().token +
              '&roadName=' + linkName + '&current=true';
            this.$http.get(url).then((result) => {
              if (result.data.value[linkName]) {
                this.allScore = Object.values(result.data.value[linkName]);
                this.scoreName = Object.keys(result.data.value[linkName]);

                let num = 0;
                this.allScore.forEach((val) => {
                  num += (val[0].value + val[1].value);
                });
                this.corridorScore = num / (this.allScore.length * 2);
              }
              this.loadingNode = false;
            });
          });
      },
      getAllDelay(startTime, endTime) {
        this.getTrafficCongestionRoadAvgDelay(startTime, endTime, (lineDelay) => {
          this.getAllNodeD12s(startTime, endTime, (nodeDelay) => {
            this.allNodeDelay = nodeDelay;
            this.allLinksDelay = lineDelay;
          });
        });
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
      getLinkDelayDoubleDirection(startTime, endTime) {  //路段双向延误(双向)
        let url = '/nodeData/getLinkDelayDoubleDirection?linkId=' + this.$route.params.id + '&token=' + this.getHeader().token;
        url += this.setUrlDate(startTime, endTime);
        this.$http.get(url).then((response) => {
          if (response.data.related_data) {
            this.linkData = response.data
          }
        })
      },
      getAllLinkId(startTime, endTime) {  //获取全部linkid
        this.loading = true;
        let url = '/index/roadAllLinksBySomeLinkId?linkId=' + this.$route.params.id + '&token=' + this.getHeader().token;
        this.$http.get(url).then((response) => {
          this.allLinkId = response.data;
          let links = Object.values(response.data.links);

          if (links.length === 2) {
            this.getLinksData(links, 0, startTime, endTime);
          }
        })
      },
      getLinksData(links, num, startTime, endTime) {
        this.getLinkFlowAndLength(links[num], startTime, endTime).then((data) => {
          if (num === links.length - 1) {
            this.linksInfo = links;
            this.loading = false;
          } else {
            num += 1;
            this.getLinksData(links, num)
          }
        })
      },
      getLinkFlowAndLength(direction, startTime, endTime) {
        return new Promise((resolve, reject) => {
          let num = 0;
          this.getLink(direction, num, resolve, startTime, endTime);
        })
      },
      getLink(direction, i, resolve, startTime, endTime) {
        this.getNodeDataD3ByLinkId(direction[i].link_id, startTime, endTime, (result) => {
          direction[i].flow = result;

          this.getNodeDataD13ByLinkId(direction[i].link_id, startTime, endTime, (result) => {
            direction[i].lineLength = result;
            if (i === direction.length - 1) {
              resolve(direction);
            } else {
              i += 1;
              this.getLink(direction, i, resolve);
            }
          })
        });
      },
      getNodeDataD3ByLinkId(linkId, startTime, endTime, cb) {  //进道口机动车流量 + 非机动车流量
        let url = '/nodeData/getNodeDataD3ByLinkId?linkId=' + linkId + '&token=' + this.getHeader().token;
        let secondUrl = '/nodeData/getNodeDataD4ByLinkId?linkId=' + linkId + '&token=' + this.getHeader().token;
        url += this.setUrlDate(startTime, endTime);
        secondUrl += this.setUrlDate(startTime, endTime);

        this.$http.get(url).then((response) => {
          this.$http.get(secondUrl).then((result) => {
            cb(response.data.value + result.data.value)
          })
        })
      },
      getNodeDataD13ByLinkId(linkId, startTime, endTime, cb) {   //获取进道口排队长度(双向)
        let url = '/nodeData/getLinkQueueLengthDoubleDirection?' + linkId + '&token=' + this.getHeader().token;
        url += this.setUrlDate(startTime, endTime);
        this.$http.get(url).then((response) => {
          cb(response.data.total)
        })
      },
      jumpPage(key) {
        this.$router.push(key);
      },
      getFlowNum(link) {
        // console.log(link.flow);
        return (link / 200) * 100
      },
      getFlowColor(num) {
        if (num <= 30) {
          return "#green"
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
      scoreColor(val) {
        if (val <= 60) {
          return "red";
        } else if (val > 60 && val <= 80) {
          return "#c8772a";
        } else if (val > 80) {
          return "green";
        }
      },
      getRoadAvgDelayColor(num) {
        if (num <= 30) {
          return "#green"
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
      getNewTime(val) {
        if (this.startTime !== 0 && val > this.startTime) {
          if (val - this.startTime >= 5 * 60 * 1000) {
            console.log(this.formatDate(new Date(val), 'yy-MM-dd hh:mm:ss'))
            this.getAllData(this.startTime, val);
            this.startTime = 0;
          }
        } else if (val < this.startTime) {
          this.getAllData(val, val + 5 * 60 * 1000);
          this.startTime = 0;
        } else {
          this.startTime = val;
        }
      },
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
    width: 63%;
    position: absolute;
    top: 10px;
    left: 1%;
    background: #1f1f2c;
    line-height: 60px;
  }

  .Road_right_bottom {
    position: absolute;
    width: 34%;
    height: 350px;
    background: #353644;
    top: 440px;
    right: 10px;
  }

  .Road_right_top {
    position: absolute;
    width: 34%;
    height: 420px;
    background: #353644;
    top: 10px;
    right: 10px
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
    right: 40px;
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
    margin-top: 10px;
    text-align: center;
    font-size: 14px;
    color: #c9c9cc
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

  .Road_fl {
    width: 50%;
    float: left;
    color: #c9c9cc;
  }

  .Road_fr {
    width: 49%;
    float: right;
    color: #c9c9cc;
  }

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
</style>
