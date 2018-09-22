<template>
<div>
  <Area></Area>
  <div class="main">
    <div class="header">
      <img src="../../../static/map/toLeft.png" class="header_img" >
      <span class="header-span">拥堵情况变化趋势分析</span>
    </div>
    <div class="main_up">
    <div class="main_up_left">
      <div class="main_up_child_head">
        <span>周拥堵情况查看，对比</span>
      </div>
      <div class="main_up_left_middle">
      <div class="main_up_left_left_head">
          <div class="show_time_left">
            <div class="time_left">开始时间</div>
            <input class="time_left_show" placeholder="选择日期" v-model="left_date_picker_start" id="left_date_picker_start" type="text"  />
          </div>
          <div class="show_time_left">
            <div class="time_left">结束时间</div>
            <input class="time_left_show" placeholder="选择日期" v-model="left_date_picker_end" id="left_date_picker_end" type="text"  />
          </div>
          <div class="show-filter-item_road">
            <div class="selected_road">选择路口</div>
            <el-select v-model="currentCity" size="mini" class="area_titleSelect" placeholder="" :popper-append-to-body="false">
              <el-option
                v-for="item in cityList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
      </div>
      <div class="main_up_left_right_head">
        <div class="show-filter-item_road">
          <div class="selected_road">选择路口</div>
          <el-select v-model="currentCity" size="mini" class="area_titleSelect" placeholder="" :popper-append-to-body="false">
            <el-option
              v-for="item in cityList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="show_time_right">
          <div class="time_right">开始时间</div>
          <input class="time_left_show" placeholder="选择日期" v-model="right_date_picker_start" id="right_date_picker_start" type="text"  />
        </div>
        <div class="show_time_right">
          <div class="time_right">结束时间</div>
          <input class="time_left_show" placeholder="选择日期" v-model="right_date_picker_end" id="right_date_picker_end" type="text"  />
        </div>
      </div>

      </div>

      <div class="hot_map">
        <div class="hot_map_view" >
          <div class="hot_map_view_date" style="width: 95%;height: 62px;display: flex;align-items: center;margin-left: 5%">
            <div class="contrast_left">
              <div class="time_right">对比时段</div>
              <input class="time_left_show" placeholder="选择日期" v-model="right_date_picker_start" id="map_top_left_date_picker_start" type="text"  />
            </div>
            <div class="contrast_right">
              <div class="time_right">对比时段</div>
              <input class="time_left_show" placeholder="选择日期" v-model="right_date_picker_start" id="map_top_right_date_picker_start" type="text"  />
            </div>
          </div>
          <div id="hot_map"></div>
          <div class="keep_up_div"></div>
        </div>
      </div>
    </div>




    <div class="main_up_middle">
      <div class="main_up_child_head">
        <span>道路天（24hr）趋势分析</span>
      </div>
    </div>



      <div class="main_up_right">
        <div class="main_up_child_head">
          <span>道路协同分析</span>
        </div>
        <div class="main_up_right_pie_head" >
          <div style="margin-left: 70px;padding-right: 40px">
            <div class="time_left">开始时间</div>
            <input class="time_left_show" placeholder="选择日期" v-model="left_date_picker_start"  type="text"  />
          </div>
          <div style="padding-right: 40px">
            <div class="selected_road">数据类型</div>
            <el-select v-model="currentCity" size="mini" class="area_titleSelect" placeholder="" :popper-append-to-body="false">
              <el-option
                v-for="item in cityList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div style="padding-right: 40px">
            <div class="time_right">对比时段</div>
            <input class="time_left_show" placeholder="选择日期" v-model="right_date_picker_start" type="text"  />
          </div>
          <div style="padding-right: 70px">
            <div class="time_left">结束时间</div>
            <input class="time_left_show" placeholder="选择日期" v-model="left_date_picker_end"  type="text"  />
          </div>
        </div>
        <div class="pie_map" style="width: 100%;height: 543px;" id="pie_map"></div>
      </div>
    </div>




    <div class="main_down">
      <div class="main_down_head">
        <span>天（24hr）趋势分析</span>
      </div>
      <div class="main_down_down">
        <div  id="line_map" style="width: 100%;height: 100%;position: absolute;z-index: 10"></div>
        <div style="z-index: 20;position: absolute;width: 600px;height: 92px;margin: 0 0 120px 1018px ;display: flex;align-items: center">
          <div class="contrast_right">
            <div class="time_right">对比时段</div>
            <input class="time_left_show" placeholder="选择日期" v-model="left_date_picker_start_line_map" id="line_map_top_right_date_picker_start" type="text"  />
          </div>
          <div class="show-filter-item_road">
            <div class="selected_road">选择路口</div>
            <el-select v-model="currentCity" size="mini" class="area_titleSelect" placeholder="" :popper-append-to-body="false">
              <el-option
                v-for="item in cityList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            </div>
          <div class="contrast_right">
            <div class="time_right">对比时段</div>
            <input class="time_left_show" placeholder="选择日期"  type="text"  />
          </div>
          <div class="contrast_right">
            <div class="time_right">对比时段</div>
            <input class="time_left_show" placeholder="选择日期" v-model="right_date_picker_start_line_map" id="line_map_top_right_date_picker_end" type="text"  />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
  import Area from '../../components/Area/Area'
  export default {
    name: "signal-optimization",
    data() {
      return {
        left_date_picker_start: "",
        left_date_picker_end: "",
        left_filter_road_name: "",
        right_date_picker_start: "",
        right_date_picker_end: "",
        right_filter_road_name: "",
        left_date_picker_start_line_map: "",
        right_date_picker_start_line_map: "",
        myChart: undefined,
      }
    },
    components: {
      Area,
    },
    mounted: function () {
      this.add_date_picker_show()
      this.init()
      this.line_map_init()
      this.pie_map_init()
    },
    methods: {
      add_date_picker_show: function () {
        $("#left_date_picker_start,#left_date_picker_end,#right_date_picker_start,#right_date_picker_end,#line_map_top_right_date_picker_start,#line_map_top_right_date_picker_end").datepicker({
          showMonthAfterYear: true,
          changeMonth: true,
          changeYear: true,
          buttonImageOnly: true,
          dateFormat: 'yy/mm/dd',
          onSelect: function (dateText, inst) {
          }
        });
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
                // console.log(value)
                // var a =  value%14 === 0 ? value : ''
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
            // text:['0 sec','100 sec'],
            // textGap:['0px','10px'],
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
      line_map_init() {
        this.myChart = this.$echarts.init(document.getElementById('line_map'));//
        var option = {
          grid: {
            height: '130px',
            width: "940px",
            y: '10%',
            left: "75px",
            top: "25px"
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['19:00', '21:00', '23:00', '1:00', '3:00', '5:00', '7:00', '9:00', '11:00', '13:00', '15:00', '17:00']
          },
          yAxis: {
            type: 'value',
            min: 0,
            max: 6
          },
          legend: {
            right: 224,
            // type:'line',
            pageButtonItemGap: 100,
            // top:95,

            textStyle: {
              color: '#c9c9cc',
            },
            width: 100,
            height: 10,
            data: [
              {
                name: '邮件营销',
                type: 'line'
              },
              {
                name: '联盟广告',
                type: 'line'
              },
              {
                name: '视频广告',
                type: 'line'
              },
              {
                name: '直接访问',
                type: 'line'
              },
              {
                name: '搜索引擎',
                type: 'line'
              },
              {
                name: '直接查询',
                type: 'line'
              }
            ],
            // data:['(流量)指标一','(流量)指标二','(流量)指标三','(流量)指标四','(流量)指标五','(流量)指标六']
          },
          series: [
            {
              name: '邮件营销',
              type: 'line',
              smooth: true,
              data: [1, 2, 3, 4, 6, 4, 3, 3, 2, 6, 3, 5]
            },
            {
              name: '联盟广告',
              type: 'line',
              smooth: true,
              data: [3, 4, 6, 4, 3, 3, 2, 6, 3, 5, 2, 5]
            },
            {
              name: '视频广告',
              type: 'line',
              smooth: true,
              data: [3, 4, 6, 4, 3, 3, 2, 6, 3, 2, 4, 3]
            },
            {
              name: '直接访问',
              type: 'line',
              smooth: true,
              data: [5, 3, 4, 4, 3, 3, 2, 6, 3, 2, 4, 3]
            },
            {
              name: '直接查询',
              type: 'line',
              smooth: true,
              data: [5, 3, 4, 4, 3, 3, 3, 3, 2, 4, 2, 3]
            },
            {
              name: '搜索引擎',
              type: 'line',
              smooth: true,
              data: [5, 3, 4, 4, 2, 3, 4, 3, 2, 4, 2, 3]
            },],
          textStyle: {
            color: '#c9c9cc',
          }
        };
        this.myChart.setOption(option);
      },
      pie_map_init () {
        this.myChart = this.$echarts.init(document.getElementById('pie_map'));
        var option = {
          tooltip: {
            width: 150,
            trigger: 'item',
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              backgroundColor: '#ffffff',
              radius: ['22px', '28px'],
              center: ['50%', '50%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: [
                {value: 335, name: '直接访问'},
                {value: 310, name: '邮件营销'},
                {value: 234, name: '联盟广告'},
                {value: 135, name: '视频广告'},
                {value: 1548, name: '搜索引擎'}
              ]
            }
          ]
        };
        this.myChart.setOption(option);
      }
    },

  }
</script>

<style scoped>
  .main{
    width: 1638px;
    height: 935px;
    background-color:#252531;
    margin: 10px 10px
  }
.header{
  width: 1638px;
  height: 40px;
  background-color: #353644;
  display: flex;
  align-items: center;
}
  .header-span{
    line-height: 19px;
    color: #ffffff;
    margin-left: 20px;
  }

  .header_img{
    height: 18px;
    margin-left: 30px;
  }
  .main_up{
    width: 1618px;
    height: 650px;
    display: flex;
    padding: 10px 10px;
  }
  .main_up_left{
    width: 530px;
    height: 650px;
    background-color: #333643
  }
  .main_up_middle{
    width: 560px;
    height: 650px;
    background-color: #333643;
    margin: 0 15px
  }
  .main_up_right{
    width: 528px;
    height: 650px;
    background-color: #333643;
  }
  .main_up_child_head{
    height: 30px;
    background-color: #1D1D2C;
    padding: 0 20px;
    display: flex;
    align-items: center;
  }
  .main_up_child_head span{
    line-height: 19px;
    color: #ffffff;
  }
  .main_down{
    width: 1620px;
    height: 215px;
    padding: 0 10px;
  }
  .main_down_head{
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
  .main_down_down{
    height: 180px;
    background-color:#333643 ;
    position: relative;
  }
  .main_up_left_left_head{
    height: 30px;
    padding-top: 25px;
    display: flex;
    align-items: center;
    padding-left: 37px;
  }

  .main_up_left_right_head{
    height: 30px;
    padding-top: 25px;
    display: flex;
    align-items: center;
    padding-right:37px;
    margin-left: 26px;
  }
  .show_time_right{
    width: 60px;
    height: 30px;
    margin-left: 10px;
    align-items: center;
  }
  .contrast_right{
    width: 60px;
    height: 30px;
    margin: 0 auto;
  }
  .contrast_left{
    width: 60px;
    height: 30px;
    margin-left: 90px
  }

  .show_time_left{
    width: 60px;
    height: 30px;
    margin-right: 10px;
    align-items: center;
  }
  .show-filter-item_road{
    width: 75px;
    height: 30px;
    align-items: center;
  }
  .filter-condition :last-child{
    margin-right: 0;
  }
  .selected_road,
  .time_left,
  .time_right{
    text-align: center;
    color: #fff;
    line-height: 10px;
    font-size: 10px;
  }
  .time_left_show{
    width: 60px;
    height: 20px;
    background: #54576a;
    margin-top: 3px;
    text-align: center;
    line-height: 20px;
    padding-top: 2px;
    font-size: 12px;
    color: #c9c9cc;
    outline: none;
    border: none;
  }
  .area_titleSelect{
    width: 75px;
    height: 20px;
    margin-top: 3px;
    background-color: #505666;
  }
  .hot_map_view{
    width: 100%;
    height: 555px;
    position: relative
  }
  .main_up_left_middle{
    display: flex;
  }
  .hot_map{
    height: 482px;
    padding: 0 80px 0 40px;
    margin-top:10px;
    display: flex
  }
  .hot_map_left{
    width: 440px;
    background-color: #333643
  }
  .hot_map_right{
    width: 160px;
    background-color: #333643;
    margin-left: 25px;
  }
  .hot_map_right_middle,
  .hot_map_left_middle{
    height: 35px;
    width: 160px;
    padding-top: 5px;
  }
  .map_left{
    width: 440px;
    height: 515px;
    padding: 5px 0 0 0;
    /*background-color: white;*/
  }
  .keep_up_div{
    height: 401px;
    width: 23px;
    background-color: #333643;
    position: absolute;
    margin-left: 213px;
    margin-top: 22px;
    z-index: 100
  }
  #hot_map{
    width: 100%;
    height: 493px;
    position: absolute;
    z-index: 70
  }
  .main_up_right_pie_head{
    width: 530px;
    height: 55px;
    display: flex;align-items: center;
    padding-top: 20px
  }
  input:focus::-webkit-input-placeholder {
    opacity:0.1;
  }
</style>
