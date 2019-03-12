<template>
  <div>
    <Area></Area>
    <div id="pie"></div>
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
            console.log(data)
          this_.data = data.data.data;
          this_.count = data.data.count
          this_.init()
          console.log(this_.data.data);
        });
    },
    init() {
      this.myChart = this.$echarts.init(document.getElementById("pie"));
      var option = {},
        option = {
            title : {
                text: '不同类型车辆数量对比',
                subtext: '共有' + this.count + '辆',
                x:'center'
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
    }
  },
  components: {
    Area
  },
  created() {
    this.get_pie_data();
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
</style>
