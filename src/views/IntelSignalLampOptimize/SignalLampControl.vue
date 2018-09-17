<template>
  <div>
    <area-select></area-select>
    <el-row :gutter="10" class="Signal_lamp_lineRow">
      <el-col>
        <el-card shadow="never" :body-style="{ padding: '0px' }" class="Dashboard_box_card">
          <div class="Dashboard_clearfix">
            <span><i class="el-icon-arrow-left" style="margin-right: 10px" @click="jumpPageToMain()"></i>拥堵地图</span>
            <div class="nav-right-style">
              <i class="iconfont icon-fangda" @click="jumpPage('/main/dashboard')"></i>
              <i class="iconfont icon-shuxian"></i>
              <i class="iconfont icon-webicon03"></i>
            </div>
          </div>
          <div class="signal-lamp-container">
            <div id="bigMap" class="show-map-style"></div>

            <div class="right-container">
              <div class="road-select">
                <span>路口</span><!--el-icon-caret-right-->
                <!--<select class="select-road-style" value="珠海路-南京路"  v-model="road_value">-->
                  <!--<option-->
                    <!--v-for="item in load_options"-->
                    <!--:key="item.value"-->
                    <!--:label="item.label"-->
                    <!--:value="item.value">-->
                  <!--</option>-->
                <!--</select>-->

                <el-select class="select-road-style" v-model="road_value" placeholder="请选择">
                  <el-option
                    v-for="item in load_options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="close-btn" @click="closeScoreInfo()">
              </div>
              <div class="intel-score">
                <div class="use-intel-score">
                  <div class="use-intel-score-text">未启用智能控制评分</div>
                  <div class="use-intel-score-image">
                    <div class="half-circle">
                      <div class="intel-score-number red-text-color">60</div>
                    </div>
                  </div>
                </div>
                <div class="use-intel-score">
                  <div class="use-intel-score-text text-color">启用智能控制评分</div>
                  <div class="use-intel-score-image">
                    <div class="half-circle">
                      <div class="intel-score-number green-text-color">90</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="two-contrast">
                <div class="use-intel-contrast">启动智能控制前后路口拥堵评分周趋势对比</div>
                <div class="use-intel">
                  <div class="unuse-intel-bg-color">
                  </div>
                  <span>未启用智能控制</span>
                </div>
                <div class="use-intel text-color">
                  <div class="use-intel-bg-color">
                  </div>
                  启用智能控制
                </div>
              </div>
              <div class="week-contrast">
                <div class="week-show">
                  <div class="week-day">周一</div>
                  <div class="week-day">周二</div>
                  <div class="week-day">周三</div>
                  <div class="week-day">周四</div>
                  <div class="week-day">周五</div>
                  <div class="week-day">周六</div>
                  <div class="week-day">周日</div>
                </div>
                <div class="week-line"></div>
                <div id="week_echart">

                </div>
              </div>
              <div class="contrast-line-chart">
                <div>启用智能拥堵前后路口评分天趋势对比</div>
                <div class="use-intel">
                  <div class="unuse-intel-bg-line">
                  </div>
                  <div class="unuse-intel-bg-circle"></div>
                  <div class="use-text-left">未启用智能控制</div>
                </div>
                <div class="use-intel text-color">
                  <div class="unuse-intel-bg-line use-intel-bg-color-chart">
                  </div>
                  <div class="unuse-intel-bg-circle use-intel-bg-color-chart"></div>
                  <div class="use-text-left">启用智能控制</div>
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import AreaSelect from '../../components/Area/Area'
  var echarts = require('echarts/lib/echarts');
  // 引入柱状图
  require('echarts/lib/chart/bar');
    export default {
      name: "SignalLampControl",
      components: {
        AreaSelect,
      },
      data() {
        return {
          road_value:"珠-南京路",
          load_options:[]
        }
      },
      mounted: function () {
        this.showEchartColumn();

      },
      methods:{
        jumpPageToMain: function () {

        },
        closeScoreInfo: function () {
          console.log("关闭评分页面");
        },
        showEchartColumn:function () {
          /*ECharts图表*/
          this.buildData()
        },
        buildData:function () {
          var legendData = ['', ''];
          var bgColorList = ['#ba4c48','#62ac82'];
          var axisLabel = ['', '', '', '', '', '',''];
          var seriesValue = [];
          for (var i = 0; i < legendData.length; i++) {
            var arrData = [];
            var seriesDataVal = null;
            for (var j = 0; j < axisLabel.length; j++) {
              arrData.push(Math.floor(Math.random() * 100));
            }
            seriesDataVal = {
              barWidth: 8,//柱状条宽度
              name:'',
              type:'bar',
              itemStyle: {
                normal: {
                  show: true,//鼠标悬停时显示label数据
                  barBorderRadius: [0, 0, 0, 0],//柱形图圆角，初始化效果
                  color: bgColorList[i]
                }
              },
              label: {
                normal: {
                  show: true, //显示数据
                  position: 'right',//显示数据位置 'top/right/left/insideLeft/insideRight/insideTop/insideBottom'
                  color:'#fff'
                }
              } ,
              data:arrData
            };
            seriesValue.push(seriesDataVal);
          }

          this.buildChart(legendData, axisLabel, seriesValue);
        },
        buildChart:function(legendData, axisLabel, seriesValue) {
          var chart = document.getElementById('week_echart');
          var echart = echarts.init(chart);
          var option = {
            title: {
            },
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'//阴影，若需要为直线，则值为'line'
              }
            },
            toolbox: {
              show: false,
              feature: {
                saveAsImage: {show: true}
              }
            },
            legend: {
              data: legendData,
              y: 'bottom'//图例说明文字设置
            },
            grid: {
              left: '-0.1%',
              right: '0%',
              bottom: '0%',
              top:'0%',
              containLabel: false
            },
            xAxis: [{
              min: 0,
              type: 'value',
              splitLine:{show: false},
              splitArea : {show : false}//保留网格区域
            }],
            yAxis: [{
              min: 0,
              type: 'category', //纵向柱状图，若需要为横向，则此处值为'value'， 下面 yAxis 的type值为'category'
              splitLine:{show: false},
              splitArea : {show : false},//保留网格区域
              data: axisLabel
            }],
            label: {
              normal: { //显示bar数据
                show: true,
                position: 'top'
              }
            },
            series: seriesValue
          };

          echart.setOption(option);
        }
        }
    }
</script>

<style scoped>
  .CongestionMap_Legend i {
    margin-right: 5px;
  }
  .CongestionMap_Legend i, .CongestionMap_Legend span {
    font-size: 12px;
    color: #a7a7ac;
    line-height: 30px;
    text-align: center;
  }
  .signal-lamp-container
  {
    height: 980px;
    position: relative
  }
  .nav-right-style{
    float: right;
    padding: 3px 0
  }
  .show-map-style{
    height: 980px;
  }
  .right-container{
    background: rgba(41,41,54,0.7);
    position: absolute;
    width: 530px;
    height: 875px;
    top: 10px;
    right: 15px;
  }
  .road-select{
    margin: 15px 0 34px 57px;
  }
  select {
    /*Chrome和Firefox里面的边框是不一样的，所以复写了一下*/
    border: solid 1px #000;

    /*很关键：将默认的select选择框样式清除*/
    appearance:none;
    -moz-appearance:none;
    -webkit-appearance:none;

    /*在选择框的最右侧中间显示小箭头图片*/
    background: url("https://raw.githubusercontent.com/ourjs/static/gh-pages/2015/arrow.png") no-repeat scroll right center transparent;
    /*为下拉小箭头留出一点位置，避免被文字覆盖*/
    padding-right: 14px;
  }
  .select-road-style{
    width: 130px;
    height: 22px !important;
    line-height: 22px;
    font-size: 18px;

    /*很关键：将默认的select选择框样式清除*/
    appearance:none;
    -moz-appearance:none;
    -webkit-appearance:none;
  }


  .CongestionMap_Legend li:last-child {
    border-bottom: 0;
  }

  .close-btn{
    position: absolute;
    top: 20px;
    right: 20px;
    color: white;
    /* make a round button */
    border-radius: 12px;
    /* center text */
    text-align: center;
    font-size: 30px;
    padding: 1px;
    height: 15px;
    width: 15px;
    line-height: 15px;
  }
  .close-btn::before {
    content: "\00D7";
  }
  .intel-score{
    display: flex;
    margin: 0 auto;
    width: 416px;
    /*flex-grow: 1;*/
  }
  .use-intel-score{
    width: 208px;
  }
  .use-intel-score-text
  {
    text-align: center;
  }
  .use-intel-score-image{
    width: 208px;
  }
  .text-color{
    color: #c9c9cc;
  }

  .half-circle{
    width: 160px;
    border-radius: 80px 80px 0 0;
    border: 2px solid #ba4c4f;
    border-right-color:  #5e4557;
    border-bottom: none;
    height: 80px;
    margin: 50px auto;
  }
  .intel-score-number{
    text-align: center;
    width: 100%;
    height: 100%;
    font-size: 30px;
    padding-top: 40px;
    font-family: "Arial Rounded MT Bold";
    line-height: 100%;
  }
  .green-text-color{
    color: #62ac82;
  }
  .red-text-color{
    color: #ba4c48;
  }

  .two-contrast{
    /*width: 100%;*/
    margin-left: 57px;
    height: 16px;
    line-height: 16px;
    display: flex;
    flex-grow: 1;
  }
  .use-intel-contrast{
    font-size: 12px;
  }
  .use-intel{
    font-size: 8px;
    height: 16px;
    line-height: 16px;
    margin-left: 20px;
    display: flex;
    position: relative;

  }
  .unuse-intel-bg-color{
    width: 10px;
    height: 10px;
    background-color: #ba4c48;
    margin: 3px 5px 0 0;

  }
  .use-intel-bg-color{
    width: 10px;
    height: 10px;
    background-color: #62ac82;
    margin: 3px 5px 0 0;
  }


  .week-contrast{
    margin-top: 55px;
    margin-left: 57px;
    display: flex;
    height: 220px;
  }
  .week-show{
    width: 60px;
    height: 100%;
  }
  .week-day{
    width: 45px;
    height: 20px;
    float: left;
    line-height: 20px;
    /*background-color: #535766;*/
    text-align: center;
    font-size: 12px;
    color: #c9c9cc;
    border-radius: 3px;
    float: left;
    margin-bottom: 13px;
  }
  .week-line{
    width: 1px;
    height: 100%;
    background-color: #c9c9cc;
  }
  #week_echart{
    width: 340px;
    height: 100%;
    margin-left: 20px;
  }

 .contrast-line-chart{
   margin-top: 50px;
   margin-left: 57px;
   display: flex;
   font-size: 12px;
   height: 16px;
 }
 .unuse-intel-bg-line{
   width: 20px;
   height: 2px;
   background-color: #ba4c48;
   position: absolute;
   top: 7px;
 }
 .unuse-intel-bg-circle{
   width: 8px;
   height: 8px;
   border-radius: 4px;
   background-color: #ba4c48;
   position: absolute;
   top: 4px;
   left: 6px;
 }
 .use-intel-bg-color-chart{
   background-color: #62ac82 !important;
 }
.use-text-left{
  padding-left: 24px;
}

  .CongestionMap_Legend li {
    margin: 0 10px;
    border-bottom: 1px solid #a7a7ac;
  }

  .Dashboard_alarm_list span {
    font-size: 12px;
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

</style>
