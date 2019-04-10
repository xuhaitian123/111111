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
          <div
            class="up_left_pie_body_area"
            style="padding: 43px 43px 50px 43px;box-sizing: border-box;display: flex;flex-wrap: wrap;"
            v-loading="loading_pie"
            element-loading-background="rgba(51, 54, 67, 1)"
          >
            <div id="pie"></div>
          </div>
        </div>
        <div class="up_middle">
          <div class="up_left_pie_title">
            <span>违章车辆不同类型增长趋势对比分析图表</span>
          </div>
          <div style="width: 100%;height: 470px;">
            <div class="select_time">
              <span style="margin-right:30px;">请选择时间</span>
              <el-date-picker
                v-model="week_data_picker_3"
                type="datetimerange"
                size="mini"
                format="yyyy-MM-dd hh:mm:ss"
                value-format="yyyy-MM-dd hh:mm:ss"
                range-separator="至"
                placeholder="选择日期"
              ></el-date-picker>
              <el-button class="search-button" v-on:click="get_top_bar_data()">查询</el-button>
            </div>
            <div class="line">
              <div id="line"></div>
            </div>
          </div>
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
              placeholder="选择日期"
            ></el-date-picker>
            <el-button class="search-button" v-on:click="get_left_bar_data()">查询</el-button>
          </div>

          <div
            class="down_left_bar_body_area"
            style="padding: 43px 43px 50px 43px;box-sizing: border-box;display: flex;flex-wrap: wrap;"
            v-loading="loading_pie"
            element-loading-background="rgba(51, 54, 67, 1)"
          >
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
              placeholder="选择日期"
            ></el-date-picker>
            <el-button class="search-button" v-on:click="get_right_bar_data()">查询</el-button>
          </div>
          <div
            class="down_right_bar_body_area"
            style="padding: 43px 43px 50px 43px;box-sizing: border-box;display: flex;flex-wrap: wrap;"
            v-loading="loading_pie"
            element-loading-background="rgba(51, 54, 67, 1)"
          >
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
      line_dataX :[],
      line_data :[],
      count: 0,
      text: "不同类型车辆保有量对比",
      loading_pie: true,
      week_data_picker_1: [
        this.formatDate(
          new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 30),
          "yyyy-MM-dd hh:mm:ss"
        ),
        this.formatDate(new Date(), "yyyy-MM-dd hh:mm:ss")
      ],
      week_data_picker_2: [
        this.formatDate(
          new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 30),
          "yyyy-MM-dd hh:mm:ss"
        ),
        this.formatDate(new Date(), "yyyy-MM-dd hh:mm:ss")
      ],
      week_data_picker_3: [
        this.formatDate(
          new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 30),
          "yyyy-MM-dd hh:mm:ss"
        ),
        this.formatDate(new Date(), "yyyy-MM-dd hh:mm:ss")
      ]
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
          this_.loading_pie = false;
        });
    },
    get_left_bar_data() {
      var this_ = this;
      var time = new Date(this.week_data_picker_1[0]);
      var end = new Date(this.week_data_picker_1[1]);
      var startTime = this.formatDate(
        new Date(time.getTime()),
        "yyyy-MM-dd hh:mm:ss"
      );
      var endTime = this.formatDate(
        new Date(end.getTime()),
        "yyyy-MM-dd hh:mm:ss"
      );
      this.$http
        .post("/reg_car_statistics", {
          username: this.username,
          password: this.password,
          start_time: startTime,
          end_time: endTime
        })
        .then(data => {
          this_.bar_data = data.data;
          this_.init2();
        });
    },
    get_right_bar_data() {
      var this_ = this;
      var time = new Date(this.week_data_picker_2[0]);
      var end = new Date(this.week_data_picker_2[1]);
      var startTime = this.formatDate(
        new Date(time.getTime()),
        "yyyy-MM-dd hh:mm:ss"
      );
      var endTime = this.formatDate(
        new Date(end.getTime()),
        "yyyy-MM-dd hh:mm:ss"
      );
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
    get_top_bar_data() {
      var this_ = this;
      var time = new Date(this.week_data_picker_3[0]);
      var end = new Date(this.week_data_picker_3[1]);
      var startTime = this.formatDate(
        new Date(time.getTime()),
        "yyyy-MM-dd hh:mm:ss"
      );
      var endTime = this.formatDate(
        new Date(end.getTime()),
        "yyyy-MM-dd hh:mm:ss"
      );
      this.$http
        .post("/violation_car_type", {
          username: this.username,
          password: this.password,
          start_time: startTime,
          end_time: endTime,
          // start_time: "2001-03-05 00:00:00",
          // end_time: "2001-03-30 00:00:00",
          select_type: "闯红灯,未系安全带,无证驾驶,超载或超员,酒后驾驶,肇事逃逸,超速驾驶,超载或超员,使用伪造驾驶证,记满12分继续驾车,驾驶拼装或报废机动车"
        })
        .then(data => {
          this_.line_dataX = data.data.all_date;  //x轴的坐标
          this_.line_data = data.data.data;  //所有数据
          this_.init4();
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
            top: 10
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
            textStyle: {
              color: "#296562"
            },
            data: this.data,
            selected: this.data
          },
          series: [
            {
              name: "详情",
              type: "pie",
              radius: "55%",
              center: ["50%", "50%"],
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
            textStyle: {
              color: "#296562"
            }
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
                  yAxisIndex: 'none'
              },
              dataView: {readOnly: false},
              magicType: {type: ['line', 'bar']},
              restore: {},
              saveAsImage: {
                pixelRatio: 5
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
            nameTextStyle: {
              color: "#ffffff"
            },
            axisLabel: {
              textStyle: {
                color: "#21abfa"
              }
            }
          },
          yAxis: {
            axisLabel: {
              textStyle: {
                color: "#21abfa"
              }
            }
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
            textStyle: {
              color: "#296562"
            }
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
                  yAxisIndex: 'none'
              },
              dataView: {readOnly: false},
              magicType: {type: ['line', 'bar']},
              restore: {},
              saveAsImage: {
                pixelRatio: 5
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
                color: "#21abfa"
              }
            }
          },
          yAxis: {
            axisLabel: {
              textStyle: {
                color: "#21abfa"
              }
            }
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
    init4() {
      this.myChart = this.$echarts.init(document.getElementById("line"));
      var option = {},
        option = {
          tooltip: {
            trigger: 'axis',
            showContent: false
          },
          toolbox: {
            show: true,
            orient : "vertical",
            top : 20,
            right : 25,
            feature: {
              dataZoom: {
                  yAxisIndex: 'none'
              },
            // myTool1: {
            //   show: true,
            //   title: '自定义扩展方法1',
            //   icon: 'path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891',
            //   onclick: function (){
            //       alert('myToolHandler1')
            //   }
            // },
              dataView: {readOnly: false},
              magicType: {type: ['line', 'bar']},
              restore: {},
              saveAsImage: {
                pixelRatio: 500
              }
            }
          },
           tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c}辆 "
          },
          xAxis: {
            type: "category",
            axisLabel: {
              textStyle: {
                color: "#21abfa"
              }
            },
            data: this.line_dataX
          },
          legend: {
            type :'scroll',
            left : 70,
            // right : 20,
            width :'80%',
            textStyle :{
              color : '#fff',
              fontWeight : 100
            },
            inactiveColor :"#21abfa",
            data:['闯红灯','未系安全带','无证驾驶','超载或超员','酒后驾驶','肇事逃逸','超速驾驶','超载或超员','使用伪造驾驶证','记满12分继续驾车','驾驶拼装或报废机动车']
          },
          yAxis: {
            type: "value",
            axisLabel: {
              textStyle: {
                color: "#21abfa"
              }
            }
          },
          series: [
            {
              name:'闯红灯',
              type:'line',
              data: this.line_data[0],
              // symbol:'none',
              smooth: true ,
              // itemStyle : { normal: {label : {show: true}}}
            },
            {
              name:'未系安全带',
              data: this.line_data[1],
              type: "line",
              // symbol:'none',
              smooth: true 
            },
            {
              name:'无证驾驶',
              data: this.line_data[2],
              type: "line",
              // symbol:'none',
              smooth: true 
            },
            {
              name:'超载或超员',
              data: this.line_data[3],
              type: "line",
              // symbol:'none',
              smooth: true 
            },
            {
              name:'酒后驾驶',
              data: this.line_data[4],
              type: "line",
              // symbol:'none',
              smooth: true 
            },
            {
              name:'肇事逃逸',
              data: this.line_data[6],
              type: "line",
              // symbol:'none',
              smooth: true 
            },
            {
              name:'超速驾驶',
              data: this.line_data[7],
              type: "line",
              // symbol:'none',
              smooth: true 
            },
            {
              name:'超载或超员',
              data: this.line_data[8],
              type: "line",
              // symbol:'none',
              smooth: true 
            },
            {
              name:'使用伪造驾驶证',
              data: this.line_data[9],
              type: "line",
              // symbol:'none',
              smooth: true 
            },
            {
              name:'记满12分继续驾车',
              data: this.line_data[10],
              type: "line",
              // symbol:'none',
              smooth: true 
            },
            {
              name:'驾驶拼装或报废机动车',
              data: this.line_data[11],
              type: "line",
              // symbol:'none',
              smooth: true 
            },
          ]
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
    this.get_top_bar_data();
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
.contianer_layout {
  background: #272836;
  padding: 10px 10px;
  display: flex;
  flex-wrap: wrap;
}

.up_left_pie {
  height: 500px;
  width: 40%;
  margin-right: 1%;
  background-color: #1d1d2c;
}
.up_left_pie_title {
  background: #333643;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.up_left_pie_body_area {
  height: 470px;
  background: #333643;
  padding: 0 !important;
}
.up_middle {
  height: 500px;
  width: 59%;
  /* margin-right: 1%; */
  background-color: #1d1d2c;
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
.down_left_bar_title {
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
.down_right_bar_title {
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
.time_picker {
  height: 30px;
  width: 805px;
  padding: 5px 200px 5px 20px;
  text-align: center;
}
.select_time {
  height: 40px;
  width: 100%;
  padding: 5px 20px 5px 20px;
  text-align: center;
  background-color: #1d1d2c;
  box-sizing: border-box;
}
.search-button {
  background: #54576a;
  border: none;
  color: rgb(148, 148, 154);
  height: 23px;
  padding: 0 20px;
  border-radius: 0;
  margin-left: 80px;
}
.line {
  width: 100%;
  height: 430px;
}
#line {
  width: 100%;
  height: 100%;
}
</style>

<style>
.el-range-input,
.el-range-separator,
.el-date-editor {
  background: #545768;
  color: #ffffff !important;
}
</style>

