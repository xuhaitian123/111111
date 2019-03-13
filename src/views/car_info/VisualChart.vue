<template>
  <div>
    <Area></Area>
    <div id="pie"></div>
    <div id="bar"></div>
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
      bar_data :[],
      count : 0,
      text: "不同类型车辆保有量对比"
    };
  },
  methods: {
    get_pie_data() {
      var this_ = this;
      this.$http.post("/VisualChart/pie_car_type",
        {
          username: this.username,
          password: this.password
        })
        .then(data => {
          this_.data = data.data.data;
          this_.count = data.data.count
          this_.init1()
        });
    },
    get_bar_data() {
      var this_ = this;
      this.$http.post("/reg_car_statistics",
        {
          username: this.username,
          password: this.password,
          start_time : '2001-03-04 00:00:00',
          end_time : '2001-03-30 23:00:00'
        })
        .then(data => {
          this_.bar_data = data.data;
          this_.init2()
        });
    },
    init1() {
      this.myChart = this.$echarts.init(document.getElementById("pie"));
      var option = {},
        option = {
            title : {
                text: '不同类型车辆数量对比',
                subtext: '共有' + this.count + '辆',
                x:'center'
            },
            toolbox: {
              // y: 'bottom',
              feature: {
                // dataView: {},
                saveAsImage: {
                  pixelRatio: 2
                }
              }
          },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                type: 'scroll',
                orient: 'vertical',
                right: 10,
                top: 20,
                bottom: 20,
                data: this.data,
                selected: this.data
            },
            series : [
                {
                    name: '详情',
                    type: 'pie',
                    radius : '55%',
                    center: ['40%', '50%'],
                    data:this.data,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
      this.myChart.setOption(option, true);
    },
    init2() {
      this.myChart = this.$echarts.init(document.getElementById("bar"));
      var xAxisData = this.bar_data.all_date;
      var option = {},
        option = {
          title: {
              text: '柱状图动画延迟'
          },
          legend: {
              data: ['警车', '私家车','出租车','救护车','公交车','政府用车'],
              align: 'left'
          },
          toolbox: {
              // y: 'bottom',
              feature: {
                dataZoom: {
                  yAxisIndex: 'none'
                },
                restore: {},
                magicType: {
                    type: ['stack', 'tiled']
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
              }
          },
          yAxis: {
          },
          series: [{
              name: '警车',
              type: 'bar',
              data: this.bar_data.data[0],
              animationDelay: function (idx) {
                  return idx * 10;
              }
          }, {
              name: '私家车',
              type: 'bar',
              data: this.bar_data.data[1],
              animationDelay: function (idx) {
                  return idx * 10 + 100;
              }
          },{
              name: '出租车',
              type: 'bar',
              data: this.bar_data.data[2],
              animationDelay: function (idx) {
                  return idx * 10 + 100;
              }
          },{
              name: '救护车',
              type: 'bar',
              data: this.bar_data.data[3],
              animationDelay: function (idx) {
                  return idx * 10 + 100;
              }
          },{
              name: '公交车',
              type: 'bar',
              data: this.bar_data.data[4],
              animationDelay: function (idx) {
                  return idx * 10 + 100;
              }
          },{
              name: '政府用车',
              type: 'bar',
              data: this.bar_data.data[5],
              animationDelay: function (idx) {
                  return idx * 10 + 100;
              }
          }],
          animationEasing: 'elasticOut',
          animationDelayUpdate: function (idx) {
              return idx * 5;
          }
      };
      this.myChart.setOption(option, true);
    }
  },
  components: {
    Area
  },
  created() {
    this.get_pie_data();
    this.get_bar_data();
  },
  mounted() {}
};
</script>
<style scoped>
#pie {
  width: 500px;
  height: 400px;
  background-color: #1D1D2C;
}
#bar{
  width: 700px;
  height: 500px;
  background-color: #1D1D2C;
}
</style>
