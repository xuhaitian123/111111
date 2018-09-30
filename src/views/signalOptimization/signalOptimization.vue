<template>
  <div>
    <Area></Area>
    <div class="main">
      <div class="header">
        <img src="../../../static/map/toLeft.png" class="header_img">
        <span class="header-span">拥堵情况变化趋势分析</span>
      </div>
      <div class="main_up">
        <div class="main_up_left" v-loading="week_loading" element-loading-background="rgba(0, 0, 0, 0.8)">
          <div class="main_up_child_head">
            <span>周拥堵情况查看，对比</span>
          </div>
          <div class="main_up_left_middle">
            <div class="show_time_left big-item range-data">
              <div class="range-time-title">
                <div class="selected_road">开始时间</div>
                <div class="selected_road">结束时间</div>
              </div>
              <el-date-picker
                v-model="week_data_picker_1"
                type="daterange"
                size="mini"
                format="yyyy/MM/dd"
                value-format="yyyyMMdd"
                range-separator="至"
                placeholder="选择日期">
              </el-date-picker>
            </div>
            <div class="show-filter-item_road default-select">
              <div class="main-search-title">选择路口</div>
              <el-select v-model="week_date_picker_node" size="mini" class="area_titleSelect min" placeholder="请选择"
                         :popper-append-to-body="false">
                <el-option
                  v-for="item in nodes"
                  :key="item.node_id"
                  :label="item.node_name"
                  :value="item.node_id">
                </el-option>
              </el-select>
            </div>
            <div class="show_time_left big-item range-data">
              <div class="range-time-title">
                <div class="selected_road">开始时间</div>
                <div class="selected_road">结束时间</div>
              </div>

              <el-date-picker
                v-model="week_data_picker_2"
                type="daterange"
                size="mini"
                format="yyyy/MM/dd"
                value-format="yyyyMMdd"
                range-separator="至"
                placeholder="选择日期">
              </el-date-picker>
            </div>


          </div>

          <div class="hot_map">
            <div class="hot_map_view">
              <div class="hot_map_view_date"
                   style="width: 95%;height: 62px;display: flex;align-items: center;justify-content: center;">
                <el-button class="search-button" v-on:click="getWeekCongestionDate">确定</el-button>
              </div>
              <!--<div class="hot_map"></div>-->
              <week-congestion id="'hot_map'" :weekCongestionDate="weekCongestionDate"
                               class="hot_map_canvas"></week-congestion>
              <div class="keep_up_div"></div>
            </div>
          </div>
        </div>


        <div class="main_up_middle" v-loading="road_24h_loading" element-loading-background="rgba(0, 0, 0, 0.8)">
          <div class="main_up_child_head">
            <span>交通走廊天（24hr）拥堵变化趋势分析</span>
          </div>

          <div class="main_up_left_middle min-header">
            <div class="show_time_left big-item range-data">
              <div class="range-time-title">
                <div class="selected_road">开始时间</div>
                <div class="selected_road">结束时间</div>
              </div>

              <el-date-picker
                v-model="road_24h_date"
                type="daterange"
                size="mini"
                format="yyyy/MM/dd"
                value-format="yyyy/MM/dd"
                range-separator="至"
                placeholder="选择日期">
              </el-date-picker>
            </div>
            <div class="show-filter-item_road default-select">
              <div class="main-search-title">选择走廊</div>
              <el-select v-model="road_24h_picker_node" size="mini" class="area_titleSelect min" placeholder="请选择"
                         :popper-append-to-body="false">
                <el-option
                  v-for="item in roadList"
                  :key="item.road_name"
                  :label="item.road_name"
                  :value="item.road_name"
                >
                </el-option>
              </el-select>
            </div>
            <div class="show_time_left  range-data">
              <div class="range-time-title">
              </div>
              <el-button class="search-button" v-on:click="heatChart_map_right_select">确定</el-button>
            </div>
          </div>
          <div class="main-search-action">
            <div class="main-search-item">
            </div>
          </div>
          <div>
            <div style="width: 500px; height: 493px;margin: auto">
              <heat-chart :id="'heatChart'" :heat_data="road_head_data" :linksName="linksName"></heat-chart>
            </div>
          </div>

        </div>


        <div class="main_up_right" v-loading="road_ratio_loading" element-loading-background="rgba(0, 0, 0, 0.8)">
          <div class="main_up_child_head">
            <span>交通走廊交通运行指数评分</span>
          </div>
          <div class="main_up_left_middle min-header">
            <div class="show_time_left big-item range-data">
              <div class="range-time-title">
                <div class="selected_road">开始时间</div>
                <div class="selected_road">结束时间</div>
              </div>
              <el-date-picker
                v-model="road_ratio_date"
                type="daterange"
                size="mini"
                format="yyyy/MM/dd"
                value-format="yyyy/MM/dd"
                range-separator="至"
                placeholder="选择日期">
              </el-date-picker>
            </div>
            <div class="show-filter-item_road default-select">
              <div class="main-search-title">选择路口</div>
              <el-select v-model="road_ratio_node" size="mini" class="area_titleSelect min" placeholder="请选择"
                         :popper-append-to-body="false">
                <el-option
                  v-for="item in roadList"
                  :key="item.road_name"
                  :label="item.road_name"
                  :value="item.road_name">
                </el-option>
              </el-select>
            </div>
            <div class="show_time_left  range-data">
              <div class="range-time-title">

              </div>
              <el-button class="search-button" v-on:click="pie_map_select">确定</el-button>
            </div>
          </div>
          <div class="road-direction">
          </div>

          <div v-for="(intersections, index) in Object.keys(intersectionsList)"
               class="rate-container">
            <div class="rate-container-item">
              <div class="rate-container-item-title"> {{intersectionsList[intersections][0].value.toFixed(2) }}</div>
              <div class="rate-container-cavans-container">
                <rate :id="'rate_'+index+'_left'" :rate="intersectionsList[intersections][0].value "></rate>
              </div>
            </div>
            <div class="rate-container-action-contaienr">
              <div class="rate-item-top" :class="{'hide': index === 0}"></div>
              <div class="rate-container-action">
                <div class="rate-container-action-line"></div>
                <div class="rate-container-action-option">
                  <div class="rate-container-action-title">{{intersections}}</div>
                  <div class="rate-container-action-selected"></div>

                </div>
                <div class="rate-container-action-line"></div>

              </div>
              <div class="rate-item-bottom" :class="{'hide': index+1 === Object.keys(intersectionsList).length}"></div>

            </div>
            <div class="rate-container-item">
              <div class="rate-container-cavans-container">
                <rate :id="'rate_'+index+'_right'"
                      :rate="intersectionsList[intersections][1].value"></rate>
              </div>

              <div class="rate-container-item-title"> {{intersectionsList[intersections][1].value.toFixed(2) }}
              </div>
            </div>
          </div>
        </div>
      </div>


      <div class="main_down" v-loading="flow_hour_loading" element-loading-background="rgba(0, 0, 0, 0.8)">
        <div class="main_down_head">
          <span>路口流量天（24hr）趋势分析</span>
        </div>
        <div class="main_down_down">
          <!--<div id="line_map" style="width: 100%;height: 100%;position: absolute;z-index: 10"></div>-->
          <trendLine :tranelineInfo="trendLineData"
                     style="width:90%;height: 100%;position: absolute;z-index: 10" :id="'trendLine'"></trendLine>
          <div
            style="z-index: 20;position: absolute;width: 600px;height: 92px;margin: 0 0 120px 1018px ;display: flex;align-items: center;justify-content: space-around">
            <div class="default">
              <div class="time_right">选择时间</div>

              <el-date-picker
                v-model="flow_hour_date"
                size="mini"
                format="yyyy/MM/dd"
                value-format="yyyy/MM/dd"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
              <!--<input class="time_left_show" placeholder="选择日期" v-model="hour_data_picker"-->
              <!--id="line_map_top_right_date_picker_start" type="text"/>-->
            </div>
            <div class="show-filter-item_road default-select">
              <div class="time_right">选择路口</div>
              <el-select v-model="flow_hour_node_1" size="mini" class="area_titleSelect min"
                         collapse-tags placeholder="请选择" :popper-append-to-body="false">
                <el-option
                  v-for="item in nodes"
                  :key="item.node_id"
                  :label="item.node_name"
                  :value="item.node_id">
                </el-option>
              </el-select>
            </div>
            <div class="show-filter-item_road default-select">
              <div class="time_right">选择路口</div>
              <el-select v-model="flow_hour_node_2" size="mini" class="area_titleSelect min"
                         collapse-tags placeholder="请选择" :popper-append-to-body="false">
                <el-option
                  v-for="item in nodes"
                  :key="item.node_id"
                  :label="item.node_name"
                  :value="item.node_id">
                </el-option>
              </el-select>
            </div>
            <div class="">
              <div class="time_right"></div>
              <el-button class="search-button"
                         v-on:click="line_map_select">确定
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Area from '../../components/Area/Area'
  import rate from '../../components/ECharts/rate'
  import heatChart from '../../components/ECharts/heatChart'
  import trendLine from '../../components/ECharts/trendLine'
  import weekCongestion from '../../components/ECharts/weekCongestion'

  export default {
    name: "signal-optimization",
    data() {
      return {

        week_loading: false,
        road_24h_loading: false,
        road_ratio_loading: false,
        flow_hour_loading: false,
        nodes: [],
        linksName: [],
        trendLineData: [],
        left_date_picker_start: "",
        week_data_picker_2: [this.formatDate(new Date(new Date().getTime() - 1000 * 60 * 60 * 24), 'yyyyMMdd'), this.formatDate(new Date(), 'yyyyMMdd')],
        week_data_picker_1: [this.formatDate(new Date(new Date().getTime() - 1000 * 60 * 60 * 24), 'yyyyMMdd'), this.formatDate(new Date(), 'yyyyMMdd')],
        week_date_picker_node: '',


        road_24h_picker_node: '梁红玉路',
        road_24h_date: [this.formatDate(new Date(new Date().getTime() - 1000 * 60 * 60 * 24), 'yyyyMMdd'), this.formatDate(new Date(), 'yyyyMMdd')],

        road_ratio_node: '梁红玉路',
        road_ratio_date: [this.formatDate(new Date(new Date().getTime() - 1000 * 60 * 60 * 24), 'yyyyMMdd'), this.formatDate(new Date(), 'yyyyMMdd')],

        map: {
          '梁红玉路': {
            linksLeftInfo: [102, 202, 402, 502, 702, 902],
            linksRightInfo: [104, 204, 404, 504, 704, 904],
            linksName: ['翔宇大道', '镇海路', '华西路', '永怀东路', '樱桃园路', '关天培路'],
            allInfo: {
              '翔宇大道': [902, 904],
              '镇海路': [702, 704],
              '华西路': [502, 504],
              '永怀东路': [402, 404],
              '樱桃园路': [202, 204],
              '关天培路': [102, 104]
            }
          },
          '沈坤路': {
            linksLeftInfo: [302, 602, 802, 1002],
            linksRightInfo: [304, 604, 804, 1004],
            linksName: ['翔宇大道', '镇海路', '华西路', '樱桃园路'],
            allInfo: {'翔宇大道': [1002, 1004], '镇海路': [802, 804], '华西路': [602, 604], '樱桃园路': [302, 304]}
          }
        },


        flow_hour_node_1: '',
        flow_hour_node_2: '',
        flow_hour_date: this.formatDate(new Date(), 'yyyy/MM/dd'),
        roadList: [{id: 1, road_name: '梁红玉路'}, {id: 2, road_name: '沈坤路'}],
        intersectionsList: {
          "": [{"link_id": 1, "value": 0, "isMock": 1}, {"link_id": 11, "value": 0, "isMock": 1}],
          " ": [{"link_id": 2, "value": 0, "isMock": 1}, {"link_id": 22, "value": 0, "isMock": 1}],
          "  ": [{"link_id": 3, "value": 0, "isMock": 1}, {"link_id": 33, "value": 0, "isMock": 1}],
          "   ": [{"link_id": 4, "value": 0, "isMock": 1}, {"link_id": 44, "value": 0, "isMock": 1}]
        },

        weekCongestionDate: [],
        road_head_data: [],
      }
    },
    components: {
      Area,
      rate,
      heatChart,
      trendLine,
      weekCongestion
    },
    mounted: function () {
      this.$http.get('/index/nodes' +
        '' + '?token=' + this.getHeader().token).then(nodes => {
        this.nodes = nodes.data.nodes;
        this.week_date_picker_node = this.nodes[0].node_id;
        this.flow_hour_node_1 = this.nodes[0].node_id;
        this.flow_hour_node_2 = this.nodes[1].node_id
      })
      this.init()
    },
    methods: {
      init() {

      },
      heatChart_map_right_select() {
        this.road_24h_loading = true;
        var time = new Date(this.road_24h_date[0])
        var end = new Date(this.road_24h_date[1]);

        var startTime = this.formatDate(new Date(time.getTime()), 'yyyyMMdd')
        var endTime = this.formatDate(new Date(end.getTime()), 'yyyyMMdd')

        // var endTime = this.formatDate(new Date(time.getTime() + 1000 * 60 * 60 * 24), 'yyyyMMdd')


        this.$http.get('/roadDataAnalysis/24HourCorridorCongestionOfDayByRoadName?roadName=' + this.road_24h_picker_node + '&beginDay=' + startTime + '&endDay=' + endTime + '&token=' + this.getHeader().token).then((result) => {
          var linksLeftInfo = this.map[this.road_24h_picker_node].linksLeftInfo;
          var linksRightInfo = this.map[this.road_24h_picker_node].linksRightInfo;
          var linksName = this.map[this.road_24h_picker_node].linksName

          result.data.value.forEach(linkInfo => {
            var leftIndex = linksLeftInfo.indexOf(linkInfo.link_id)
            var rightIndex = linksRightInfo.indexOf(linkInfo.link_id)

            if (leftIndex > -1) {
              linksLeftInfo[leftIndex] = linkInfo.values.map(item => item.value)
            }
            if (rightIndex > -1) {
              linksRightInfo[rightIndex] = linkInfo.values.map(item => item.value)
            }
            this.road_head_data = [linksLeftInfo, linksRightInfo]
            this.linksName = linksName
            this.road_24h_loading = false;

          })
        })
      },
      pie_map_select() {
        this.road_ratio_loading = true;



        var time = new Date(this.road_ratio_date[0])
        var end = new Date(this.road_ratio_date[1]);

        var startTime = this.formatDate(new Date(time.getTime()), 'yyyyMMdd')
        var endTime = this.formatDate(new Date(end.getTime()), 'yyyyMMdd')

        // var endTime = this.formatDate(new Date(time.getTime() + 1000 * 60 * 60 * 24), 'yyyyMMdd')
        // var beginTime =this.formatDate(flow_hour_data, 'yyyyMMdd');

        this.$http.get('roadDataAnalysis/getAvgCorridorCongestionOfDaysByRoadName?current=false&beginDay=' + startTime + '&endDay=' + endTime + '&roadName=' + this.road_ratio_node + '&token=' + this.getHeader().token)
          .then((result) => {
            console.log(result)

            var intersection = JSON.parse(JSON.stringify(this.map[this.road_ratio_node].allInfo))
            console.log(result.data)
            result.data.value.forEach(item => {

              var index = intersection[item.link_name].indexOf(item.link_id);
              console.log(intersection[item.link_name])
              console.log(item.link_id)
              console.log(index)
              if (index > -1) {
                console.log(item)
                intersection[item.link_name][index] = item;
              }
            })
            console.log(intersection)
            this.intersectionsList = intersection
            this.road_ratio_loading = false;
          }).catch(function (data) {
          console.log(data);
        });
      },
      line_map_select() {
        this.flow_hour_loading = true;

        var flow_hour_data = new Date(this.flow_hour_date);
        var endTime = this.formatDate(new Date(flow_hour_data.getTime() + 1000 * 60 * 60 * 24), 'yyyyMMdd')
        var beginTime = this.formatDate(flow_hour_data, 'yyyyMMdd');
        var line_1_promise = new Promise(resolve => {
          this.$http.get('/roadDataAnalysis/someHourFlowByNodeId?nodeId=' + this.flow_hour_node_1 + '&beginTime=' + beginTime + '&endTime=' + endTime
            + '&token=' + this.getHeader().token).then((result) => {
            console.log(result)
            resolve({
              data: result.data.map((item, index) => [index + 1, item.total]),
              name: this.getNodeName(this.flow_hour_node_1)
            })
          }).catch(function (data) {
            console.log(data);
          });
        })
        var line_2_promise = new Promise(resolve => {
          this.$http.get('/roadDataAnalysis/someHourFlowByNodeId?nodeId=' + this.flow_hour_node_2 + '&beginTime=' + beginTime + '&endTime=' + endTime
            + '&token=' + this.getHeader().token).then((result) => {
            resolve({
              data: result.data.map((item, index) => [index + 1, item.total]),
              name: this.getNodeName(this.flow_hour_node_2)
            })
          }).catch(function (data) {
            console.log(data);
          });
        })

        Promise.all([line_1_promise, line_2_promise]).then((lineList) => {
          this.trendLineData = lineList;
          this.flow_hour_loading = false;
        })

      },

      getNodeName(id) {
        return this.nodes.find(item => item.node_id == id).node_name
      },

      getWeekCongestionDate() {
        this.week_loading =  true;
        this.$http.get('/static/week.json').then((weekInfo)=>{
         this.weekCongestionDate = weekInfo.data
          this.week_loading = false;
        })

      },
    },
  }
</script>

<style scoped>
  .main {
    width: 1638px;
    height: 935px;
    background-color: #252531;
    margin: 10px 10px
  }

  .header {
    width: 1638px;
    height: 40px;
    background-color: #353644;
    display: flex;
    align-items: center;
  }

  .header-span {
    line-height: 19px;
    color: #ffffff;
    margin-left: 20px;
  }

  .header_img {
    height: 18px;
    margin-left: 30px;
  }

  .main_up {
    width: 1618px;
    height: 650px;
    display: flex;
    padding: 10px 10px;
  }

  .main_up_left {
    width: 530px;
    height: 650px;
    background-color: #333643
  }

  .main_up_middle {
    width: 560px;
    height: 650px;
    background-color: #333643;
    margin: 0 15px
  }

  .main_up_right {
    width: 528px;
    height: 650px;
    background-color: #333643;
  }

  .main_up_child_head {
    height: 30px;
    background-color: #1D1D2C;
    padding: 0 20px;
    display: flex;
    align-items: center;
  }

  .main_up_child_head span {
    line-height: 19px;
    color: #ffffff;
  }

  .main_down {
    width: 1620px;
    height: 215px;
    padding: 0 10px;
  }

  .main_down_head {
    height: 35px;
    background-color: #1D1D2C;
    display: flex;
    align-items: center;
    padding: 0 20px;
  }

  .main_down_head span {
    line-height: 19px;
    color: #ffffff;
  }

  .main_down_down {
    height: 180px;
    background-color: #333643;
    position: relative;
  }

  .main_up_left_left_head {
    height: 30px;
    padding-top: 25px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 37px;
  }

  .main_up_left_right_head {
    height: 30px;
    padding-top: 25px;
    display: flex;
    align-items: center;
    padding-right: 37px;
    margin-left: 26px;
  }

  .show_time_right {
    width: 60px;
    height: 30px;
    margin-left: 10px;
    align-items: center;
  }

  .contrast_right {
    width: 60px;
    height: 30px;
    /*margin: 0 auto;*/
  }

  .contrast_left {
    width: 60px;
    height: 30px;
    margin-left: 90px
  }

  .show_time_left {
    width: 60px;
    /*margin-right: 10px;*/
    align-items: center;
  }

  .big-item {
    width: 150px;
    text-align: center;
  }

  .show-filter-item_road {
    width: 150px;
    /*height: 30px;*/
    align-items: center;
  }

  .filter-condition :last-child {
    margin-right: 0;
  }

  .selected_road {
    text-align: center;
    color: #fff;
    line-height: 10px;
    font-size: 10px;
    width: 50%;
  }

  .time_left,
  .time_right {
    text-align: center;
    color: #fff;
    line-height: 10px;
    font-size: 10px;
    padding-bottom: 10px;
    box-sizing: border-box;
    height: 20px;
  }

  .time_left_show {
    /*width: 60px;*/
    width: 100%;
    height: 20px;
    background: #54576a;
    margin-top: 3px;
    text-align: center;
    line-height: 20px;
    padding-top: 2px;
    font-size: 10px;
    color: #c9c9cc;
    outline: none;
    border: none;
  }

  .area_titleSelect {
    width: 100%;
    height: 20px;
    margin-top: 3px;
    background-color: #505666;
  }

  .hot_map_view {
    width: 482px;
    height: 555px;
    position: relative
  }

  .hot_map {
    height: 482px;
    box-sizing: border-box;
    padding: 0 80px 0 40px;
    width: 602px;
    /*margin-top: 10px;*/
    display: flex
  }

  .main_up_left_middle {
    display: flex;
    align-items: center;
    padding: 20px 20px 0 20px;
    justify-content: space-between;
  }

  .hot_map_left {
    width: 440px;
    background-color: #333643
  }

  .hot_map_right {
    width: 160px;
    background-color: #333643;
    margin-left: 25px;
  }

  .hot_map_right_middle,
  .hot_map_left_middle {
    height: 35px;
    width: 160px;
    padding-top: 5px;
  }

  .map_left {
    width: 440px;
    height: 515px;
    padding: 5px 0 0 0;
    /*background-color: white;*/
  }

  .keep_up_div {
    height: 401px;
    width: 23px;
    background-color: #333643;
    position: absolute;
    margin-left: 213px;
    margin-top: 22px;
    z-index: 100
  }

  .hot_map_canvas {
    width: 100%;
    height: 493px;
    position: absolute;
    z-index: 70
  }

  .main_up_right_pie_head {
    width: 530px;
    /*height: 55px;*/
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 20px;
    box-sizing: border-box;
    /*padding-top: 20px*/
  }

  input:focus::-webkit-input-placeholder {
    opacity: 0.1;
  }

  .rate-container {
    display: flex;;
    height: 80px;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
    box-sizing: border-box;
  }

  .rate-container-item:nth-child(1) {
    align-items: right;
  }

  .is-active.rate-container-item {
    background: rgb(71, 74, 87);
    border-radius: 15px;
  }

  .rate-container-item {
    padding: 5px;
    width: 30%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
  }

  .rate-container-action-contaienr {
    width: 30%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .rate-container-item-title {
    flex-grow: 1;
    text-align: center;
    padding: 0 10px;
    font-size: 20px;

  }

  /*.rate-container-item-title:nth-child(2n){*/
  /*text-align: left;*/
  /*}*/
  .rate-container-cavans-container {
    width: 50px;
    height: 50px;
  }

  .rate-container-action {
    height: 28px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5px;
  }

  .is-active .rate-container-action-line {
    opacity: 1;
  }

  .rate-container-action-line {
    flex-grow: 1;
    height: 1px;
    background-image: linear-gradient(to right, rgb(221, 129, 41) 0%, rgb(221, 129, 41) 50%, transparent 50%);
    background-size: 10px 1px;
    background-repeat: repeat-x;
    opacity: 0;

  }

  .rate-container-action-option {
    width: 28px;
    height: 28px;
    box-sizing: border-box;
    border-radius: 50%;
    border: 2px solid rgb(221, 129, 41);
    padding: 5px;
    position: relative;
  }

  .rate-container-action-title {
    position: absolute;
    font-size: 10px;
    right: -54px;
    top: -5px;
    width: 50px;
  }

  .is-active .rate-container-action-selected {
    opacity: 1;
  }

  .rate-container-action-selected {
    width: 14px;
    height: 14px;
    background: rgb(221, 129, 41);
    border-radius: 50%;
    box-sizing: border-box;
    opacity: 0;
  }

  .rate-item-bottom,
  .rate-item-top {
    margin: auto;
    width: 0px;
    height: 36px;
    border: 1px solid rgb(221, 129, 41);
  }

  .main-search-header {
    display: flex;
    padding: 20px 60px 0 60px;
    height: 45px;
    justify-content: space-between;
    align-items: center;
  }

  .main-search-action {
    display: flex;
    padding: 5px 60px 15px 60px;
    height: 40px;
    justify-content: center;
  }

  .main-search-title {
    font-size: 10px;
    height: 12px;
    margin-bottom: 5px;
    text-align: center;
  }

  .el-select-dropdown.is-multiple .el-select-dropdown__item.selected {
    color: #ffffff;
    background-color: #2F2B39;
  }

  .el-select .el-tag {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-color: transparent;
    margin: 2px 0 2px 6px;
    background-color: #2F2B39;
  }

  .hide {
    opacity: 0;
  }

  .search-button {
    background: #54576a;
    border: none;
    color: rgb(148, 148, 154);
    height: 28px;
    padding: 0 20px;
    border-radius: 0;
  }

  .main-search-item {
    width: 75px;
  }

  .road-direction {
    height: 35px;
  }

  .main-search-item:nth-child(3) {
    width: 150px;
  }

  .range-time-title {
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
    height: 20px;
    box-sizing: border-box;
  }

  .min-header {
    padding: 20px 40px 0 40px;
  }


</style>
<style>
  .min .el-input__inner,
  .min .el-select-dropdown__item {
    font-size: 11px !important;
    text-align: left;
  }

  .min input {
    padding-left: 10px
  }
</style>
