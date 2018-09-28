<template>
  <div>
    <area-select></area-select>
    <el-row :gutter="10" class="Signal_lamp_lineRow">
      <el-col>
        <el-card shadow="never" :body-style="{ padding: '0px' }" class="Dashboard_box_card">
          <div class="Dashboard_clearfix">
            <span><i class="el-icon-arrow-left" style="margin-right: 10px" @click="jumpPageToMain()"></i>拥堵地图</span>
            <div class="nav-right-style">
              <i class="iconfont icon-webicon03"></i>
            </div>
          </div>
          <div class="signal-lamp-container">
            <div id="bigMap" class="show-map-style">
              <road-net-map style="width: 65%"></road-net-map>
            </div>

            <div class="right-container">
              <div class="road-select">
                <span>路口</span><!--el-icon-caret-right-->
                <el-select class="select-road-style" @change="changeNode()" v-model="road_value" placeholder="请选择">
                  <el-option
                    class="selectColor"
                    v-for="node_id in Object.keys(nodesInfo)"
                    :key="node_id"
                    :label="nodesInfo[node_id].name"
                    :value="node_id">
                  </el-option>
                </el-select>
              </div>
              <!--<div class="close-btn" @click="closeScoreInfo()">-->
              <!--</div>-->
              <div class="intel-score">
                <div class="use-intel-score">
                  <div class="use-intel-score-text">未启用智能控制评分</div>
                  <!--<road-gauge :data="unuse_intel_score" class="Dashboard_card_roadGauge"></road-gauge>-->
                  <div class="use-intel-score-image">
                    <div class="half-circle">
                      <div class="intel-score-number red-text-color">{{currentNodeInfo.beforeValue}}</div>
                    </div>
                  </div>
                </div>
                <div class="use-intel-score">
                  <div class="use-intel-score-text text-color">启用智能控制评分</div>
                  <div class="use-intel-score-image">
                    <div class="half-circle">
                      <div class="intel-score-number green-text-color">{{currentNodeInfo.afterValue}}</div>
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
                  <div class="week-day" id="monday" @click="get_week_day_data('monday',0)">周一</div>
                  <div class="week-day" id="tuesday" @click="get_week_day_data('tuesday',1)">周二</div>
                  <div class="week-day" id="wednesday" @click="get_week_day_data('wednesday',2)">周三</div>
                  <div class="week-day" id="thursday" @click="get_week_day_data('thursday',3)">周四</div>
                  <div class="week-day" id="friday" @click="get_week_day_data('friday',4)">周五</div>
                  <div class="week-day" id="saturday" @click="get_week_day_data('saturday',5)">周六</div>
                  <div class="week-day" id="sunday" @click="get_week_day_data('sunday',6)">周日</div>
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
              <div id="day_chart_line">
              </div>
              <div class="chart-title">{{['周一','周二','周三','周四','周五','周六','周日'][showWeeksIndex]}}</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import AreaSelect from '../../components/Area/Area'
  import RoadGauge from '../../components/ECharts/RoadGaugeItem'
  import RoadNetMap from '../../components/Map/Map'
  var echarts = require('echarts/lib/echarts');
  // 引入柱状图
  require('echarts/lib/chart/bar');
    export default {
      name: "SignalLampControl",
      components: {
        AreaSelect,
        RoadGauge,
        RoadNetMap,
      },
      data() {
        return {
          road_value:"",
          load_options:[{value:'珠海路-南京路'}],
          unuse_intel_score:0,
          use_intel_score:0,
          open_road_record_List:[],
          nodesInfo:{},
          currentNodeInfo:{},
          showWeeksIndex: 0,
        }
      },
      mounted: function () {
        this.getNodesInfoDate(()=>{

          this.showEchartColumn();
          this.showDayLineChart(0);
          this.get_week_day_data('monday',0)

          window.open_map_road_icon = (node_id,title) =>{
            this.open_road_icon(node_id,title)
          };
          window.close_map_road_icon = (node_id,title) =>{
            this.close_road_icon(node_id,title)
          }

          //获取路口数据
          this.getAllRoadInfo();
        })

      },
      beforeMount(){
        // this.showEchartColumn();
        // this.showDayLineChart(0);
      },
      methods:{
        changeNode(node_id){
          this.currentNodeInfo = this.nodesInfo[this.road_value]
          this.get_week_day_data('monday',0)
          this.showEchartColumn();
          this.showDayLineChart(0);

        },
        getNodesInfoDate(cb){
          this.$http.get('http://localhost:8080/static/data.json').then((nodesInfo)=>{
            this.nodesInfo =  nodesInfo.data;

            this.currentNodeInfo = this.nodesInfo[Object.keys(this.nodesInfo)[0]]
            this.road_value =   this.currentNodeInfo.name
            cb()

          })
        },

        getAllRoadInfo(){
          console.log('getAllRoadInfo');
          var self = this;
          this.$http.get('/index/nodes?token=693e9af84d3dfcc71e640e005bdc5e2e')
            .then((response) => {
              console.log(response.data);
              self.showBMapPoint(response.data.nodes);
              return response.data;
            })
        },
        createOverLay(map,node){
          var self = this;
          //创建图标
          var pt = new BMap.Point(node.long, node.lat);
          //
          var isExist = this.findRoadIsOpen(node.node_id,node.node_name);
          console.log(isExist);
          var str_icon_path = isExist > -1 ? "/static/image/map/63.png" : "/static/image/map/red.png"
          var myIcon = new BMap.Icon(str_icon_path, new BMap.Size(40,40));
          var marker = new BMap.Marker(pt,{icon:myIcon});  // 创建标注
          marker.title = node.node_name;
          marker.id = node.node_id;
          marker.addEventListener("click", function(e){
            var title = "\"" +e.target.title + "\"";
            var sContent = "<div style=''  class='box-content'>" +
              "<div class='control-button'>" +
              "<div class='open-button' onclick='open_map_road_icon(" + e.target.id + "," +title +")'>开启</div>"+
              "<div class='close-button' onclick='close_map_road_icon(" + e.target.id + "," +title +")'>关闭</div>"
              +"</div>"+
              "<div class='select-options'><ul>" +
              "<li>Default</li>"+
              "<li>Minimize Delay</li>"+
              "<li>Minimize</li>"+
              "</ul>" +
              "</div>"
              +"</div>";

            var infoBox = new BMap.InfoWindow(sContent);
            map.openInfoWindow(infoBox, e.target.point)
            self.road_value = e.target.title;
          });
          return marker;
        },
        showBMapPoint(nodes){
          var self = this;
          var map = window.congestionMap;
          // 百度地图API功能
          for (var i = 0; i < nodes.length; i ++)
          {
            var marker = self.createOverLay(map,nodes[i])
            map.addOverlay(marker);

          }
        },

        //地图标注打开按钮
        open_road_icon(node_id,title){
          var map = window.congestionMap;
          var isExist = this.findRoadIsOpen(node_id,title);
          if (isExist == -1) {
            var arrMarkers = map.getOverlays();
            this.open_road_record_List.push({node_id:node_id,road_name:title});
            for (var i = 0; i < arrMarkers.length; i ++)
            {
              if (arrMarkers[i].id == node_id)
              {
                var node = {
                  long:arrMarkers[i].point.lng,
                  lat:arrMarkers[i].point.lat,
                  title:arrMarkers[i].title,
                  node_id:arrMarkers[i].id
                };
                map.removeOverlay(arrMarkers[i]);
                var new_marker = this.createOverLay(map,node);
                map.addOverlay(new_marker);
              }
            }
          }
          map.closeInfoWindow();
        },
        //地图图标关闭按钮
        close_road_icon(node_id,title){
          var map = window.congestionMap;
          var index = this.findRoadIsOpen(node_id,title);
          if (index != -1) {
            var arrMarkers = map.getOverlays();
            this.open_road_record_List.splice(index,1);
            for (var i = 0; i < arrMarkers.length; i ++)
            {
              if (arrMarkers[i].id == node_id)
              {
                var node = {
                  long:arrMarkers[i].point.lng,
                  lat:arrMarkers[i].point.lat,
                  title:arrMarkers[i].title,
                  node_id:arrMarkers[i].id
                };
                map.removeOverlay(arrMarkers[i]);
                var new_marker = this.createOverLay(map,node);
                map.addOverlay(new_marker);
              }
            }
          }
          map.closeInfoWindow();
        },
        findRoadIsOpen(node_id,title){
          var isExist = -1;
          for (var i = 0; i < this.open_road_record_List.length; i ++)
          {
            if (this.open_road_record_List[i].node_id == node_id)
            {
              isExist = i;
            }
          }
          return isExist;
        },


        remove_week_background:function(){
          $("#monday").removeClass("week-day-background-color");
          $("#tuesday").removeClass("week-day-background-color");
          $("#wednesday").removeClass("week-day-background-color");
          $("#thursday").removeClass("week-day-background-color");
          $("#friday").removeClass("week-day-background-color");
          $("#saturday").removeClass("week-day-background-color");
          $("#sunday").removeClass("week-day-background-color");

        },
        get_week_day_data:function(week_day_id,index){
          this.remove_week_background();
          $("#"+week_day_id).addClass("week-day-background-color");
          this.showWeeksIndex = index;
          this.showDayLineChart(index);
        },
        jumpPageToMain: function () {

        },
        // closeScoreInfo: function () {
        //   console.log("关闭评分页面");
        // },
        //每周的数据展示柱状图
        showEchartColumn:function () {
          /*ECharts图表*/
          this.buildWeekData()
        },
        buildWeekData:function () {

          var legendData = ['', ''];
          var bgColorList = ['#ba4c48','#62ac82'];
          var currentNodeInfo = this.currentNodeInfo.data;
          var  beforeDataLine = {
            barWidth: 8,//柱状条宽度
            name: '',
            type: 'bar',
            itemStyle: {
              normal: {
                show: true,//鼠标悬停时显示label数据
                barBorderRadius: [0, 0, 0, 0],//柱形图圆角，初始化效果
                color: bgColorList[0]
              }
            },
            label: {
              normal: {
                show: true, //显示数据
                position: 'right',//显示数据位置 'top/right/left/insideLeft/insideRight/insideTop/insideBottom'
                color: '#fff'
              }
            },
            data: currentNodeInfo.map(item=> item.beforeValue)
          }
          var  afterDataLine = {
            barWidth: 8,//柱状条宽度
            name: '',
            type: 'bar',
            itemStyle: {
              normal: {
                show: true,//鼠标悬停时显示label数据
                barBorderRadius: [0, 0, 0, 0],//柱形图圆角，初始化效果
                color: bgColorList[1]
              }
            },
            label: {
              normal: {
                show: true, //显示数据
                position: 'right',//显示数据位置 'top/right/left/insideLeft/insideRight/insideTop/insideBottom'
                color: '#fff'
              }
            },
            data: currentNodeInfo.map(item=> item.afterValue)
          }

          this.buildWeekChart(legendData, ['','','','','','',''], [beforeDataLine, afterDataLine]);
        },
        buildWeekChart:function(legendData, axisLabel, seriesValue) {
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
              right: '5%',
              bottom: '0%',
              top:'0%',
              containLabel: false
            },
            xAxis: [{
              min: 0,
              max: 100,
              type: 'value',
              splitLine:{show: false},
              splitArea : {show : false}//保留网格区域
            }],
            yAxis: [{
              min: 0,

              type: 'category', //纵向柱状图，若需要为横向，则此处值为'value'， 下面 yAxis 的type值为'category'
              splitLine:{show: false},
              splitArea : {show : false},//保留网格区域
              data: axisLabel,
              axisLine: {
                lineStyle: {
                  width:'0'//坐标线的宽度
                }
              },
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
        },
        //每天的数据展示柱状图
        showDayLineChart:function (index) {
          console.log(this.currentNodeInfo)
          var legendData = ['', ''];
          var bgColorList = ['#ba4c48','#62ac82'];
          var axisLabel = ['00:00', '06:00', '12:00', '18:00', '24:00'];
          var seriesValue = [];
          for (var i = 0; i < legendData.length; i++) {
            var arrData = [];
            var seriesDataVal = null;
            for (var j = 0; j < axisLabel.length; j++) {
              arrData.push(Math.floor(Math.random() * 100));
            }

            seriesValue.push(seriesDataVal);
          }


          var beforeDate= {
            type: 'line',
            showAllSymbol: true,
            itemStyle: {
              normal: {
                color: bgColorList[0],
                lineStyle: {
                  color: bgColorList[0]
                }
              }
            },
            data:this.currentNodeInfo.data[index].beforeList
          };
          var afterDate= {
            type: 'line',
            showAllSymbol: true,
            itemStyle: {
              normal: {
                color: bgColorList[1],
                lineStyle: {
                  color: bgColorList[1]
                }
              }
            },
            data:this.currentNodeInfo.data[index].afterList
          };






          this.drawDayLine(legendData, axisLabel, [beforeDate,afterDate]);
        },
        drawDayLine:function(legendData, axisLabel, seriesValue) {
          var myLineChart = echarts.init(document.getElementById('day_chart_line'));
          var option = {
            tooltip: {
              trigger: 'axis',
              type: 'line'
            },
            legend: {
              data: legendData,
              y: 'bottom',//图例说明文字设置
            },
            grid: {
              left: '0%',
              right: '5%',
              bottom: '0%',
              top:'5%',
              containLabel: true
            },
            xAxis: [{
              type: 'category',
              boundaryGap:false,
              data:axisLabel,
              axisLabel: {
                color: '#c9c9cc' //刻度线标签颜色
              },
              axisLine: {
                lineStyle: {
                  type: 'solid',
                  color: '#c9c9cc',//左边线的颜色
                  width:'1'//坐标线的宽度
                }
              },
            }],
            yAxis: [{
              type: 'value',
              axisLabel: {
                color: '#c9c9cc' //刻度线标签颜色
              },
              axisLine: {
                lineStyle: {
                  width:'0'//坐标线的宽度
                }
              },
            }],
            series: seriesValue
          };

          myLineChart.setOption(option);

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
  .Signal_lamp_lineRow{
    margin: 0 5px !important;
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
    background: #333643;
    position: absolute;
    width: 530px;
    height: 960px;
    top: 10px;
    right: 15px;
    bottom: 10px;
  }
  .road-select{
    margin: 15px 0 34px 57px;
  }
  /*.select-road-style{*/
    /*width: 140px;*/
    /*height: 22px !important;*/
    /*line-height: 22px;*/
    /*font-size: 18px;*/

    /*!*很关键：将默认的select选择框样式清除*!*/
    /*appearance:none;*/
    /*-moz-appearance:none;*/
    /*-webkit-appearance:none;*/
  /*}*/
  /*.selectColor{*/
    /*color: white;*/
    /*font-size: 12px;*/
    /*height: 16px;*/
    /*line-height: 16px;*/
    /*margin: 0;*/
    /*padding: 3px;*/
    /*border-radius: 3px;*/

  /*}*/


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
  .Dashboard_card_roadGauge {
    height: 180px;
    margin-bottom: -70px
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
  .week-day-background-color{
    background-color: #535766;
  }
  .week-day{
    width: 45px;
    height: 20px;
    float: left;
    line-height: 20px;
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
  #day_chart_line{
    width: 300px;
    height: 150px;
    margin: 36px auto;
  }
  .chart-title{
    width: 45px;
    height: 20px;
    margin: 0 auto;
    color: #c9c9cc;
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
