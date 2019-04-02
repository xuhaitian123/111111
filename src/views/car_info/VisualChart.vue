<template>
  <div>
    <Area></Area>
    <div class="contianer">
      <div class="contianer_body_title">
        <div class="title">
          <!-- <img class="toLeft"  src="../../../static/map/toLeft.png" @click="jumpPage('/main/dashboard')"> -->
          <span class="title_text">可视化图表</span>
        </div>
      </div>
      <div class="contianer_layout">
        <div class="up_left_pie">
          <div class="up_left_pie_title">
            <span>在网所有车辆对比分析图表</span>
          </div>
          <div class="up_left_pie_body_area" style="padding: 43px 43px 50px 43px;box-sizing: border-box;display: flex;flex-wrap: wrap;"  v-loading="loading_pie"  element-loading-background="rgba(51, 54, 67, 1)">
            <div id="pie"></div>
          </div>
        </div>
        <div class="up_middle">
          
        </div>
        <div class="down_left_bar">
          <div class="down_left_bar_title">
            <span>新车入网登记车辆数量对比分析图表</span>
          </div>
          <div class="time_picker">
            <span style="margin-right:30px;">请选择时间</span>
            <el-date-picker
              v-model="week_data_picker_1"
              type="datetimerange"
              size="mini"
              format="yyyy-MM-dd hh:mm:ss"
              value-format="yyyy-MM-dd hh:mm:ss"
              range-separator="至"
              placeholder="选择日期">
            </el-date-picker>
            <el-button class="search-button" v-on:click="get_left_bar_data()">查询</el-button>
          </div>
          
          <div class="down_left_bar_body_area" style="padding: 43px 43px 50px 43px;box-sizing: border-box;display: flex;flex-wrap: wrap;"  v-loading="loading_pie"  element-loading-background="rgba(51, 54, 67, 1)">
            <div id="bar_left"></div>
          </div>
        </div>
        <div class="down_right_bar">
          <div class="down_right_bar_title">
            <span>违章车辆数量对比分析图表</span>
          </div>
          <div class="time_picker">
            <span style="margin-right:30px;">请选择时间</span>
            <el-date-picker
              v-model="week_data_picker_2"
              type="datetimerange"
              size="mini"
              format="yyyy-MM-dd hh:mm:ss"
              value-format="yyyy-MM-dd hh:mm:ss"
              range-separator="至"
              placeholder="选择日期">
            </el-date-picker>
            <el-button class="search-button" v-on:click="get_right_bar_data()">查询</el-button>
          </div>
          <div class="down_right_bar_body_area" style="padding: 43px 43px 50px 43px;box-sizing: border-box;display: flex;flex-wrap: wrap;"  v-loading="loading_pie"  element-loading-background="rgba(51, 54, 67, 1)">
            <div id="bar_right"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Area from "../../components/Area/Area";

export default {
  name: "car_info_table",
  data() {
    return {
      
      data: [
        { value: 335, name: "直接访问" },
        { value: 310, name: "邮件营销" },
        { value: 274, name: "联盟广告" },
        { value: 235, name: "视频广告" },
        { value: 400, name: "搜索引擎" }
      ],
      bar_data: [],
      count: 0,
      text: "不同类型车辆保有量对比",
      loading_pie : true,
      week_data_picker_1: [this.formatDate(new Date(new Date().getTime() - 1000 * 60 * 60 * 24*30), 'yyyy-MM-dd hh:mm:ss'), this.formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')],
      week_data_picker_2: [this.formatDate(new Date(new Date().getTime() - 1000 * 60 * 60 * 24*30), 'yyyy-MM-dd hh:mm:ss'), this.formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss')],
        
    };
  },
  methods: {
    get_pie_data() {
      var this_ = this;
      this.$http
        .post("/VisualChart/pie_car_type", {
          username: this.username,
          password: this.password
        })
        .then(data => {
          this_.data = data.data.data;
          this_.count = data.data.count;
          this_.init1();
          this_.loading_pie =false;
        });
    },
    get_left_bar_data() {
      var this_ = this;
      var time = new Date(this.week_data_picker_1[0])
      var end = new Date(this.week_data_picker_1[1]);
      var startTime = this.formatDate(new Date(time.getTime()), 'yyyy-MM-dd hh:mm:ss')
      var endTime = this.formatDate(new Date(end.getTime()), 'yyyy-MM-dd hh:mm:ss')
      this.$http
        .post("/reg_car_statistics", {
          username: this.username,
          password: this.password,
          start_time: startTime,
          end_time: endTime,
        })
        .then(data => {
          this_.bar_data = data.data;
          this_.init2();
        });
    },
    get_right_bar_data() {
      var this_ = this;
      var time = new Date(this.week_data_picker_2[0])
      var end = new Date(this.week_data_picker_2[1]);
      var startTime = this.formatDate(new Date(time.getTime()), 'yyyy-MM-dd hh:mm:ss')
      var endTime = this.formatDate(new Date(end.getTime()), 'yyyy-MM-dd hh:mm:ss')
      this.$http
        .post("/violation_car_statistics", {
          username: this.username,
          password: this.password,
          start_time: startTime,
          end_time: endTime
        })
        .then(data => {
          this_.bar_data = data.data;
          this_.init3();
        });
    },
    init1() {
      this.myChart = this.$echarts.init(document.getElementById("pie"));
      var option = {},
        option = {
          title: {
            text: "不同类型车辆数量对比",
            subtext: "共有" + this.count + "辆",
            x: "center",
            top : 10,
          },
          grid: {
            top: 150,
            left: 50,
            right: 50
          },
          toolbox: {
            // top : '50px',
            // right : '30px',
            feature: {
              // dataView: {},
              saveAsImage: {
                pixelRatio: 2
              }
            }
          },
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            type: "scroll",
            orient: "vertical",
            right: 10,
            top: 50,
            bottom: 20,
            textStyle :{
              color : "#296562",
            },
            data: this.data,
            selected: this.data
          },
          series: [
            {
              name: "详情",
              type: "pie",
              radius: "55%",
              center: ["40%", "50%"],
              data: this.data,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              }
            }
          ]
        };
      this.myChart.setOption(option, true);
    },
    init2() {
      this.myChart = this.$echarts.init(document.getElementById("bar_left"));
      var xAxisData = this.bar_data.all_date;
      var option = {},
        option = {
          title: {
            // text: "各类车辆登记数量对比",
            left: 250
          },
          legend: {
            data: ["警车", "私家车", "出租车", "救护车", "公交车", "政府用车"],
            align: "left",
            top: 40,
            textStyle :{
              color : "#296562",
            },
          },
          grid: {
            top: 100,
            left: 50,
            right: 50
          },
          toolbox: {
            top: 5,
            right: 10,
            feature: {
              dataZoom: {
                yAxisIndex: "none"
              },
              restore: {},
              magicType: {
                type: ["stack", "tiled"]
              },
              dataView: {},
              saveAsImage: {
                pixelRatio: 2
              }
            }
          },
          
          tooltip: {},
          xAxis: {
            data: xAxisData,
            silent: false,
            splitLine: {
              show: false
            },
            nameTextStyle:{
              color : "#ffffff"
            }, 
            axisLabel: {
              textStyle: {
                color: '#21abfa',
                },
            },
          },
          yAxis: {
            axisLabel: {
              textStyle: {
                color: '#21abfa',
              },
            },
          },
          series: [
            {
              name: "警车",
              type: "bar",
              data: this.bar_data.data[0],
              animationDelay: function(idx) {
                return idx * 10;
              }
            },
            {
              name: "私家车",
              type: "bar",
              data: this.bar_data.data[1],
              animationDelay: function(idx) {
                return idx * 10 + 100;
              }
            },
            {
              name: "出租车",
              type: "bar",
              data: this.bar_data.data[2],
              animationDelay: function(idx) {
                return idx * 10 + 100;
              }
            },
            {
              name: "救护车",
              type: "bar",
              data: this.bar_data.data[3],
              animationDelay: function(idx) {
                return idx * 10 + 100;
              }
            },
            {
              name: "公交车",
              type: "bar",
              data: this.bar_data.data[4],
              animationDelay: function(idx) {
                return idx * 10 + 100;
              }
            },
            {
              name: "政府用车",
              type: "bar",
              data: this.bar_data.data[5],
              animationDelay: function(idx) {
                return idx * 10 + 100;
              }
            }
          ],
          animationEasing: "elasticOut",
          animationDelayUpdate: function(idx) {
            return idx * 5;
          }
        };
      this.myChart.setOption(option, true);
    },
     init3() {
      this.myChart = this.$echarts.init(document.getElementById("bar_right"));
      var xAxisData = this.bar_data.all_date;
      var option = {},
        option = {
          title: {
            // text: "各类车辆登记数量对比",
            left: 250
          },
          legend: {
            data: ["警车", "私家车", "出租车", "救护车", "公交车", "政府用车"],
            align: "left",
            top: 40,
            textStyle :{
              color : "#296562",
            },
          },
          grid: {
            top: 100,
            left: 50,
            right: 50
          },
          toolbox: {
            top: 5,
            right: 10,
            feature: {
              dataZoom: {
                yAxisIndex: "none"
              },
              restore: {},
              magicType: {
                type: ["stack", "tiled"]
              },
              dataView: {},
              saveAsImage: {
                pixelRatio: 2
              }
            }
          },
          tooltip: {},
          xAxis: {
            data: xAxisData,
            silent: false,
            splitLine: {
              show: false
            },
            axisLabel: {
              textStyle: {
                color: '#21abfa',
              },
            },
          },
          yAxis: {
            axisLabel: {
              textStyle: {
                color: '#21abfa',
              },
            },
          },
          series: [
            {
              name: "警车",
              type: "bar",
              data: this.bar_data.data[0],
              animationDelay: function(idx) {
                return idx * 10;
              }
            },
            {
              name: "私家车",
              type: "bar",
              data: this.bar_data.data[1],
              animationDelay: function(idx) {
                return idx * 10 + 100;
              }
            },
            {
              name: "出租车",
              type: "bar",
              data: this.bar_data.data[2],
              animationDelay: function(idx) {
                return idx * 10 + 100;
              }
            },
            {
              name: "救护车",
              type: "bar",
              data: this.bar_data.data[3],
              animationDelay: function(idx) {
                return idx * 10 + 100;
              }
            },
            {
              name: "公交车",
              type: "bar",
              data: this.bar_data.data[4],
              animationDelay: function(idx) {
                return idx * 10 + 100;
              }
            },
            {
              name: "政府用车",
              type: "bar",
              data: this.bar_data.data[5],
              animationDelay: function(idx) {
                return idx * 10 + 100;
              }
            }
          ],
          animationEasing: "elasticOut",
          animationDelayUpdate: function(idx) {
            return idx * 5;
          }
        };
      this.myChart.setOption(option, true);
    },
    jumpPage(key) {
      // this.$router.push(key);
    }
  },
  components: {
    Area
  },
  created() {
    this.get_pie_data();
    this.get_left_bar_data();
    this.get_right_bar_data();
  },
  mounted() {}
};
</script>
<style scoped>
  #pie {
    width: 100%;
    height: 100%;
    margin-top: 5px;
    background-color: #1d1d2c;
  }
  .contianer {
    padding: 10px 10px;
    /* height: 935px; */
    width: 1640px;
  }
  .contianer_body_title {
    background: #333643;
    height: 40px;
  }
  .title {
    line-height: 40px;
    width: 250px;
    display: flex;
    align-items: center;
  }

  .title_text {
    display: block;
    margin-left: 20px;
  }

  .toLeft {
    height: 19px;
    margin-left: 30px;
  }
  .contianer_layout{
    background: #272836;
    padding: 10px 10px;
    display: flex;
    flex-wrap: wrap;
  }


  .up_left_pie {
    height: 400px;
    width: 600px;
    margin-right: 10px;
    background-color: #1d1d2c ;
  }
  .up_left_pie_title{
    background: #333643;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .up_left_pie_body_area {
    height: 370px;
    background: #333643;
    padding: 0 !important;
  }
  .up_middle{
    width: 800px;
    height: 200px;
  }


  #bar_left {
    width: 805px;
    height: 470px;
    margin-top: 5px;
    background-color: #1d1d2c;
  }
  .down_left_bar {
    margin-top: 10px;
    height: 500px;
    width: 805px;
    margin-right: 10px;
  }
  .down_left_bar_title{
    background: #333643;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .down_left_bar_body_area {
    height: 470px;
    background: #333643;
    padding: 0 !important;
  }
  #bar_right {
    width: 805px;
    height: 470px;
    margin-top: 5px;
    background-color: #1d1d2c;
  }
  .down_right_bar {
    height: 540px;
    width: 805px;
    margin-top: 10px;
    /* margin-right: 10px; */
  }
  .down_right_bar_title{
    background: #333643;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .down_right_bar_body_area {
    height: 470px;
    background: #333643;
    padding: 0 !important;
  }
 .time_picker{
   height: 30px;
   width: 805px;
   padding: 5px 200px 5px 20px;
   text-align: center;
 }
.search-button {
    background: #54576a;
    border: none;
    color: rgb(148, 148, 154);
    height: 23px;
    padding: 0 20px;
    border-radius: 0;
    margin-left: 80px
  }
</style>

<style>
  .el-range-input,
  .el-range-separator,
  .el-date-editor{
    background: #545768;
    color : #ffffff !important;
  }
  
</style>

