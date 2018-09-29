<template>
  <div>
    <Area></Area>
    <div class="main" >
      <div class="header">
        <img src="../../../static/map/toLeft.png" class="header_img">
        <span class="header-span">拥堵情况变化趋势分析</span>
      </div>
      <div class="main_up">
        <div class="main_up_left" v-loading="week_loading"element-loading-background="rgba(0, 0, 0, 0.8)">
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
                   style="width: 95%;height: 62px;display: flex;align-items: center;justify-content: center;margin-left: 5%">
                <el-button class="search-button" v-on:click="heatChart_map_left_select">确定</el-button>
              </div>
              <div id="hot_map"></div>
              <div class="keep_up_div"></div>
            </div>
          </div>
        </div>


        <div class="main_up_middle" v-loading="road_24h_loading" element-loading-background="rgba(0, 0, 0, 0.8)">
          <div class="main_up_child_head">
            <span>道路天（24hr）趋势分析</span>
          </div>

          <div class="main_up_left_middle">
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
                value-format="yyyyMMdd"
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
            <div class="show_time_left big-item range-data">
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
            <span>道路协同分析</span>
          </div>

          <div class="main_up_left_middle">
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
                value-format="yyyyMMdd"
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
            <div class="show_time_left big-item range-data">
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
          <span>天（24hr）趋势分析</span>
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
                value-format="yyyyMMdd"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
              <!--<input class="time_left_show" placeholder="选择日期" v-model="hour_data_picker"-->
              <!--id="line_map_top_right_date_picker_start" type="text"/>-->
            </div>
            <div class="show-filter-item_road default-select">
              <div class="selected_road">选择路口</div>
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
              <div class="selected_road">选择路口</div>
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

            <el-button class="search-button"
                       v-on:click="line_map_select">确定
            </el-button>
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
            linksName: ['had', 'asdasd', 'asdas', 'asdass', 'asdas', 'asdas12']
          },
          '沈坤路': {
            linksLeftInfo: [302, 602, 802, 1002],
            linksRightInfo: [304, 604, 804, 1004],
            linksName: ['had1', 'asdasd2', 'asda3s', 'asd4ass']
          }
        },

        flow_hour_node_1: '',
        flow_hour_node_2: '',
        flow_hour_date: this.formatDate(new Date(), 'yyyyMMdd'),
        roadList: [{id: 1, road_name: '梁红玉路'}, {id: 2, road_name: '沈坤路'}],
        intersectionsList: {"":[{"link_id":1,"value":0,"isMock":1},{"link_id":11,"value":0,"isMock":1}],
          " ":[{"link_id":2,"value":0,"isMock":1},{"link_id":22,"value":0,"isMock":1}],
          "  ":[{"link_id":3,"value":0,"isMock":1},{"link_id":33,"value":0,"isMock":1}],
          "   ":[{"link_id":4,"value":0,"isMock":1},{"link_id":44,"value":0,"isMock":1}]},

        myChart: undefined,
        // intersectionsList: {},
        // data: [],
        road_head_data: [],
      }
    },
    components: {
      Area,
      rate,
      heatChart,
      trendLine,
    },
    mounted: function () {
      this.$http.get('/index/nodes' +
        '' + '?token=' + this.getHeader().token).then(nodes => {
        this.nodes = nodes.data.nodes
        this.week_date_picker_node = this.nodes[0].node_id;
        this.flow_hour_node_1 = this.nodes[0].node_id;
        this.flow_hour_node_2 = this.nodes[1].node_id
      })
      this.init()
    },
    methods: {
      heatChart_map_left_select() {


      },
      heatChart_map_right_select() {
        this.road_24h_loading = true;
        this.$http.get('/roadDataAnalysis/24HourCorridorCongestionOfDayByRoadName?roadName=' + this.road_24h_picker_node + '&beginDay=' + this.road_24h_date[0] + '&endDay=' + this.road_24h_date[1] + '&token=' + this.getHeader().token).then((result) => {
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
        this.$http.get('roadDataAnalysis/getCorridorCongestionSourceByRoadName?current=false&start=' + this.road_24h_date[0] + '&end=' + this.road_24h_date[1] + '&roadName=' + this.road_ratio_node + '&token=' + this.getHeader().token)
          .then((result) => {
            this.intersectionsList = result.data.value[this.road_ratio_node]
            this.road_ratio_loading = false;
          }).catch(function (data) {
          console.log(data);
        });
      },
      line_map_select() {
        this.flow_hour_loading = true;
        var line_1_promise = new Promise(resolve => {
          this.$http.get('/roadDataAnalysis/someHourFlowByNodeId?nodeId=' + this.flow_hour_node_1 + '&beginTime=20180926&endTime=20180927'
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
          this.$http.get('/roadDataAnalysis/someHourFlowByNodeId?nodeId=' + this.flow_hour_node_2 + '&beginTime=20180926&endTime=20180927'
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

      init() {

        this.myChart = this.$echarts.init(document.getElementById('hot_map'));//
        var weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六', '', '周日', '周一', '周二', '周三', '周四', '周五', '周六'];
        var weeks2 = [0, 1, 2, 3, 4, 5, 6]
        var hours = ['24:00', '20:00', '16:00', '12:00', '8:00', '4:00', '0:00'];
        var y = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14'
          , '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29',
          '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46',
          '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64',
          '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83',
          '84',]
        var data = [[0, 1, 5], [0, 1, 1], [0, 2, 0], [0, 3, 0], [0, 4, 0], [0, 5, 0], [0, 6, 0], [0, 7, 0], [0, 8, 0], [0, 9, 0], [0, 10, 0], [0, 11, 2], [0, 12, 4], [0, 13, 1],
          [0, 14, 1], [0, 15, 3], [0, 16, 4], [0, 17, 6], [0, 18, 4], [0, 19, 4], [0, 20, 3], [0, 21, 3], [0, 22, 2], [0, 23, 5], [1, 0, 7], [1, 1, 0], [1, 2, 0], [1, 3, 0], [1, 4, 0],
          [1, 5, 0], [1, 6, 0], [1, 7, 0], [1, 8, 0], [1, 9, 0], [1, 10, 5], [1, 11, 2], [1, 12, 2], [1, 13, 6], [1, 14, 9], [1, 15, 11], [1, 16, 6], [1, 17, 7], [1, 18, 8], [1, 19, 12],
          [1, 20, 5], [1, 21, 5], [1, 22, 7], [1, 23, 2], [2, 0, 1], [2, 1, 1], [2, 2, 0], [2, 3, 0], [2, 4, 0], [2, 5, 0], [2, 6, 0], [2, 7, 0], [2, 8, 0], [2, 9, 0], [2, 10, 3], [2, 11, 2],
          [2, 12, 1], [2, 13, 9], [2, 14, 8], [2, 15, 10], [2, 16, 6], [2, 17, 5], [2, 18, 5], [2, 19, 5], [2, 20, 7], [2, 21, 4], [2, 22, 2], [2, 23, 4], [3, 0, 7], [3, 1, 3], [3, 2, 0],
          [3, 3, 0], [3, 4, 0], [3, 5, 0], [3, 6, 0], [3, 7, 0], [3, 8, 1], [3, 9, 0], [3, 10, 5], [3, 11, 4], [3, 12, 7], [3, 13, 14], [3, 14, 13], [3, 15, 12], [3, 16, 9], [3, 17, 5],
          [3, 18, 5], [3, 19, 10], [3, 20, 6], [3, 21, 4], [3, 22, 4], [3, 23, 1], [4, 0, 1], [4, 1, 3], [4, 2, 0], [4, 3, 0], [4, 4, 0], [4, 5, 1], [4, 6, 0], [4, 7, 0], [4, 8, 0], [4, 9, 2],
          [4, 10, 4], [4, 11, 4], [4, 12, 2], [4, 13, 4], [4, 14, 4], [4, 15, 14], [4, 16, 12], [4, 17, 1], [4, 18, 8], [4, 19, 5], [4, 20, 3], [4, 21, 7], [4, 22, 3], [4, 23, 0], [5, 0, 2],
          [5, 1, 1], [5, 2, 0], [5, 3, 3], [5, 4, 0], [5, 5, 0], [5, 6, 0], [5, 7, 0], [5, 8, 2], [5, 9, 0], [5, 10, 4], [5, 11, 1], [5, 12, 5], [5, 13, 10], [5, 14, 5], [5, 15, 7], [5, 16, 11],
          [5, 17, 6], [5, 18, 0], [5, 19, 5], [5, 20, 3], [5, 21, 4], [5, 22, 2], [5, 23, 0], [6, 0, 1], [6, 1, 0], [6, 2, 0], [6, 3, 0], [6, 4, 0], [6, 5, 0], [6, 6, 0], [6, 7, 0], [6, 8, 0], [6, 9, 0],
          [6, 10, 1], [6, 11, 0], [6, 12, 2], [6, 13, 1], [6, 14, 3], [6, 15, 4], [6, 16, 0], [6, 17, 0], [6, 18, 0], [6, 19, 0], [6, 20, 1], [6, 21, 2], [6, 22, 2], [6, 23, 6],
          [0, 0, 5], [0, 1, 1], [0, 2, 0], [0, 3, 0], [0, 4, 0], [0, 5, 0], [0, 6, 0], [0, 7, 0], [0, 8, 0], [0, 9, 0], [0, 10, 0], [0, 11, 2], [0, 12, 4], [0, 13, 1],
          [0, 14, 1], [0, 15, 3], [0, 16, 4], [0, 17, 6], [0, 18, 4], [0, 19, 4], [0, 20, 3], [0, 21, 3], [0, 22, 2], [0, 23, 5], [1, 0, 7], [1, 1, 0], [1, 2, 0], [1, 3, 0], [1, 4, 0],
          [1, 5, 0], [1, 6, 0], [1, 7, 0], [1, 8, 0], [1, 9, 0], [1, 10, 5], [1, 11, 2], [1, 12, 2], [1, 13, 6], [1, 14, 9], [1, 15, 11], [1, 16, 6], [1, 17, 7], [1, 18, 8], [1, 19, 12],
          [1, 20, 5], [1, 21, 5], [1, 22, 7], [1, 23, 2], [2, 0, 1], [2, 1, 1], [2, 2, 0], [2, 3, 0], [2, 4, 0], [2, 5, 0], [2, 6, 0], [2, 7, 0], [2, 8, 0], [2, 9, 0], [2, 10, 3], [2, 11, 2],
          [2, 12, 1], [2, 13, 9], [2, 14, 8], [2, 15, 10], [2, 16, 6], [2, 17, 5], [2, 18, 5], [2, 19, 5], [2, 20, 7], [2, 21, 4], [2, 22, 2], [2, 23, 4], [3, 0, 7], [3, 1, 3], [3, 2, 0],
          [3, 3, 0], [3, 4, 0], [3, 5, 0], [3, 6, 0], [3, 7, 0], [3, 8, 1], [3, 9, 0], [3, 10, 5], [3, 11, 4], [3, 12, 7], [3, 13, 14], [3, 14, 13], [3, 15, 12], [3, 16, 9], [3, 17, 5],
          [3, 18, 5], [3, 19, 10], [3, 20, 6], [3, 21, 4], [3, 22, 4], [3, 23, 1], [4, 0, 1], [4, 1, 3], [4, 2, 0], [4, 3, 0], [4, 4, 0], [4, 5, 1], [4, 6, 0], [4, 7, 0], [4, 8, 0], [4, 9, 2],
          [4, 10, 4], [4, 11, 4], [4, 12, 2], [4, 13, 4], [4, 14, 4], [4, 15, 14], [4, 16, 12], [4, 17, 1], [4, 18, 8], [4, 19, 5], [4, 20, 3], [4, 21, 7], [4, 22, 3], [4, 23, 0], [5, 0, 2],
          [5, 1, 1], [5, 2, 0], [5, 3, 3], [5, 4, 0], [5, 5, 0], [5, 6, 0], [5, 7, 0], [5, 8, 2], [5, 9, 0], [5, 10, 4], [5, 11, 1], [5, 12, 5], [5, 13, 10], [5, 14, 5], [5, 15, 7], [5, 16, 11],
          [5, 17, 6], [5, 18, 0], [5, 19, 5], [5, 20, 3], [5, 21, 4], [5, 22, 2], [5, 23, 0], [6, 0, 1], [6, 1, 0], [6, 2, 0], [6, 3, 0], [6, 4, 0], [6, 5, 0], [6, 6, 0], [6, 7, 0], [6, 8, 0], [6, 9, 0],
          [6, 10, 1], [6, 11, 0], [6, 12, 2], [6, 13, 1], [6, 14, 3], [6, 15, 4], [6, 16, 0], [6, 17, 0], [6, 18, 0], [6, 19, 0], [6, 20, 1], [6, 21, 2], [6, 22, 2], [6, 23, 6]];
        data = data.map(function (item) {
          return [item[1], item[0], item[2] || '-'];
        });
        // 指定图表的配置项和数据
        var option = {
          tooltip: {
            position: 'top'
          },
          animation: false,
          grid: {
            height: '400px',
            width: "370px",
            y: '10%',
            left: "40px",
            top: "23px"
          },
          xAxis: {
            type: 'category',
            data: weeks,
            position: 'top',
            max: '8',
            axisLabel: {
              width: '1px',
              showMinLabel: true,
              interval: 0,
              show: true,
              // rotate:30,
              textStyle: {
                fontSize: '8'
              },
              formatter: function (value, index) {

                console.log(value)
                return value;
              }
            },
            splitArea: {
              show: true,
              interval: 0,
            }
          },
          yAxis: {
            type: 'category',
            data: y,
            axisLabel: {
              interval: 13,
              show: true,
              formatter: function (value, index) {
                return value;

              },
            },
            showMinLabel: true,
            showMaxLabel: true,

            splitArea: {
              show: true
            },
          },
          visualMap: {
            min: 0,
            max: 100,
            itemWidth: 10,
            itemHeight: 370,
            calculable: false,
            orient: 'horizontal',
            // heightStyle:{
            //   height:"10px",
            //   width:'400px'
            // },
            inRange: {
              color: ['#B7C3C4', '#C89498', '#C44E83']
            },
            right: '-5',
            bottom: '5%',
            symbolSize: '1'
          },
          series: [{
            name: 'Punch Card',
            type: 'heatmap',
            data: data,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowColor: 'rgba(255,255,255,255)'
              }
            }
          }],
          textStyle: {
            color: '#c9c9cc',
          }
        };
        // 使用刚指定的配置项和数据显示图表。
        // myChart.setOption(option);
        this.myChart.setOption(option);
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
    width: 100%;
    height: 555px;
    position: relative
  }

  .main_up_left_middle {
    display: flex;
    align-items: center;
    padding: 20px 20px 0 20px;
    justify-content: space-between;
  }

  .hot_map {
    height: 482px;
    padding: 0 80px 0 40px;
    /*margin-top: 10px;*/
    display: flex
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

  #hot_map {
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
  .road-direction{
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
