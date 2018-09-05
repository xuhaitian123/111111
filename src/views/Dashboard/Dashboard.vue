<template>

  <div>
    <div class="Dashboard_titleCascader">
      <span>省
        <el-select v-model="currentProvince" size="mini" placeholder="请选择">
          <el-option
            v-for="item in provinceList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </span>

      <span>城市
        <el-select v-model="currentCity" size="mini" placeholder="请选择">
          <el-option
            v-for="item in cityList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </span>

      <span>地区
        <el-select v-model="currentArea" size="mini" placeholder="请选择">
          <el-option class="selectColor"
                     v-for="item in areaList"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </span>

    </div>

    <!--card 模板-->
    <!--<el-card shadow="never" :body-style="{ padding: '0px' }" class="Dashboard_box-card">-->
    <!--<div class="Dashboard_clearfix">-->
    <!--<span>实时地图</span>-->
    <!--<i class="el-icon-menu" style="float: right; padding: 3px 0"></i>-->
    <!--</div>-->
    <!--<div class="Dashboard_card_body">-->

    <!--</div>-->
    <!--</el-card>-->

    <el-row :gutter="10" class="Dashboard_lineRow">
      <el-col :span="8">
        <el-card shadow="never" :body-style="{ padding: '0px' }" class="Dashboard_box-card">
          <div class="Dashboard_clearfix">
            <span>实时地图</span>
            <i class="el-icon-menu" style="float: right; padding: 3px 0"></i>
          </div>
          <div class="Dashboard_card_body">
            <div id="map"></div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="never" :body-style="{ padding: '0px' }" class="Dashboard_box-card">
          <div class="Dashboard_clearfix">
            <span>路网数据展示</span>
            <i class="el-icon-menu" style="float: right; padding: 3px 0"></i>
          </div>
          <div class="Dashboard_card_body">
            <div class="Dashboard_card_main">
              <div class="Dashboard_card_left">
                <div class="Dashboard_card_current">
                  <div class="Dashboard_card_title">路网总流量</div>

                  <div class="Dashboard_card_progressList" style="height: 150px">
                    <div v-for="item in roadFlow" :key="item.vph">
                      <div class="fl Dashboard_card_progress">
                        <div class="Dashboard_card_road">{{item.name}}</div>
                        <el-progress :percentage="item.perc" :stroke-width="8" :color="item.color"
                                     :show-text="false"></el-progress>
                      </div>
                      <div class="fr">
                        <span class="Dashboard_card_vph">{{item.vph}}vph</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div style="margin-top: 20px" class="Dashboard_card_title">路网拥堵评分</div>
                    <div style="line-height: 60px;text-align: right" class="">
                      <span style="font-size: 24px ;color: #ff8539">68</span> 分
                    </div>
                    <el-progress :percentage="80" :stroke-width="8" color="#ff8539"
                                 :show-text="false"></el-progress>
                  </div>
                </div>
              </div>

              <div>
                <div class="Dashboard_card_right">
                  <div class="Dashboard_card_current">
                    <div class="Dashboard_card_title">拥堵里程比例</div>
                    <RoadGauge></RoadGauge>

                    <div style="margin-top: -50px" class="Dashboard_card_title">交叉口拥堵评分</div>
                    <div class="Dashboard_card_progressList" v-for="item in roadFlow" :key="item.vph"
                         style="line-height: 18px">
                      {{item.name}}<span class="fr" style="font-size: 20px">{{item.perc}}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card shadow="never" :body-style="{ padding: '0px' }" class="Dashboard_box-card">
          <div class="Dashboard_clearfix">
            <span>报警信息</span>
            <i class="el-icon-menu" style="float: right; padding: 3px 0"></i>
          </div>
          <div class="Dashboard_card_body">
            <div class="Dashboard_card_main">
              <div class="" style="margin: auto;width: 90%">
                <div class="Dashboard_card_title">
                  <div style="width: 50%;text-align: center;display: inline-block">交叉口</div>
                  <div class="Dashboard_card_right" style="text-align: center">拥堵报警</div>
                </div>
                <div class="Dashboard_card_progressList">
                  <div
                    style="width: 25%;line-height: 35px;text-align: center;font-size: 14px;display: inline-block;margin: 10px 0 10px 10%;padding-right: 5%;border-left: 5px #9f172b solid;;border-right: 2px #63646f solid">
                    天津路-南京路
                  </div>
                  <div style="width: 30%;text-align: center;font-size: 14px;margin: 10px 0;padding: 0 9%" class="fr">
                    北进道口右转中度拥挤
                    <br>
                    北进道口右转中度拥挤
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="Dashboard_lineRow">
      <el-col :span="8">
        <el-card shadow="never" :body-style="{ padding: '0px' }" class="Dashboard_box-card">
          <div class="Dashboard_clearfix">
            <span>信号灯优化前后数据展示</span>
            <i class="el-icon-menu" style="float: right; padding: 3px 0"></i>
          </div>
          <div class="Dashboard_card_body_two">
            <MixLineBar></MixLineBar>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="never" :body-style="{ padding: '0px' }" class="Dashboard_box-card">
          <div class="Dashboard_clearfix">
            <span>信号灯优化前后数据展示</span>
            <i class="el-icon-menu" style="float: right; padding: 3px 0"></i>
          </div>
          <div class="Dashboard_card_body_two">
            <div style="width: 50%;height: 80%;display: inline-block">
              <PieDoughnut id="pieDoughnut" title="优化前"></PieDoughnut>
            </div>
            <div style="width: 50%;height: 80%;display: inline-block" class="fr">
              <PieDoughnut id="PieDoughnut" title="优化后"></PieDoughnut>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card shadow="never" :body-style="{ padding: '0px' }" class="Dashboard_box-card">
          <div class="Dashboard_clearfix">
            <span>数据变化趋势对比分析</span>
            <i class="el-icon-menu" style="float: right; padding: 3px 0"></i>
          </div>
          <div class="Dashboard_card_body_two">
            <SmoothBarLine></SmoothBarLine>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="10" class="Dashboard_lineRow">
      <el-col>
        <el-card shadow="never" :body-style="{ padding: '0px' }" class="Dashboard_box-card">
          <div class="Dashboard_clearfix">
            <span>优先通行控制设置</span>
            <i class="el-icon-menu" style="float: right; padding: 3px 0"></i>
          </div>
          <div class="Dashboard_card_body_two" style="padding: 20px">

            <el-col :span="6" class="">
              <div class="Dashboard_set_col" style="height: 180px;position: relative">
                人民路-珠海路优先通行控制设置

                <div>
                  <div class="fl" style="padding-left: 10px;margin: 10px 0">
                    <span>优先方式</span>
                    <ul>
                      <el-checkbox-group style="margin: 10px 0" v-model="firstMode">
                        <li>
                          <el-checkbox label="绿灯延长"></el-checkbox>
                        </li>
                        <li>
                          <el-checkbox label="红灯提前结束"></el-checkbox>
                        </li>
                        <li>
                          <el-checkbox label="调整相位顺序"></el-checkbox>
                        </li>
                      </el-checkbox-group>
                    </ul>
                  </div>
                  <div class="fr" style="margin: 10px 0">
                    <div class="fl">
                      <span>优先车辆和等级</span>
                      <ul>
                        <el-checkbox-group v-model="firstVehicle" style="margin: 10px 0 10px 10px">
                          <li>
                            <el-checkbox label="警卫车辆">警卫车辆</el-checkbox>
                          </li>
                          <li>
                            <el-checkbox label="警务车辆">警务车辆</el-checkbox>
                          </li>
                          <li>
                            <el-checkbox label="领导车辆">领导车辆</el-checkbox>
                          </li>
                          <li>
                            <el-checkbox label="救护车">救护车</el-checkbox>
                          </li>
                          <li>
                            <el-checkbox label="公交车">公交车</el-checkbox>
                          </li>
                        </el-checkbox-group>
                      </ul>
                    </div>
                    <div class="fr" style="margin-left: 5px;">
                      <span>高 中 低</span>
                      <ul style="margin: 10px 0">
                        <li>
                          <el-radio-group v-model="radio">
                            <el-radio :label="1">&nbsp;</el-radio>
                            <el-radio :label="2">&nbsp;</el-radio>
                            <el-radio :label="3">&nbsp;</el-radio>
                          </el-radio-group>
                        </li>
                        <li>
                          <el-radio-group v-model="radio1">
                            <el-radio :label="1">&nbsp;</el-radio>
                            <el-radio :label="2">&nbsp;</el-radio>
                            <el-radio :label="3">&nbsp;</el-radio>
                          </el-radio-group>
                        </li>
                        <li>
                          <el-radio-group v-model="radio2">
                            <el-radio :label="1">&nbsp;</el-radio>
                            <el-radio :label="2">&nbsp;</el-radio>
                            <el-radio :label="3">&nbsp;</el-radio>
                          </el-radio-group>
                        </li>
                        <li>
                          <el-radio-group v-model="radio3">
                            <el-radio :label="1">&nbsp;</el-radio>
                            <el-radio :label="2">&nbsp;</el-radio>
                            <el-radio :label="3">&nbsp;</el-radio>
                          </el-radio-group>
                        </li>
                        <li>
                          <el-radio-group v-model="radio4">
                            <el-radio :label="1">&nbsp;</el-radio>
                            <el-radio :label="2">&nbsp;</el-radio>
                            <el-radio :label="3">&nbsp;</el-radio>
                          </el-radio-group>
                        </li>
                      </ul>
                    </div>

                    <div style="position: absolute;bottom: 20px;left: 30px">
                      启动优先通行
                      <el-radio v-model="radioLine" :label="1">&nbsp;</el-radio>
                    </div>

                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="6" class="">
              <div class="Dashboard_set_col">123</div>
            </el-col>
            <el-col :span="6" class="">
              <div class="Dashboard_set_col">123</div>
            </el-col>


          </div>
        </el-card>
      </el-col>
    </el-row>

    <!--<div id="map">sdfasdfasdf</div>-->
    <!--<div id="myChart" :style="{width: '300px', height: '300px'}"></div>-->
    <!--<time-line></time-line>-->
    <!--<div class="video">-->
    <!--<img :src="videourl"/>-->
    <!--<img :src="videoCarurl"/>-->
    <!--</div>-->

  </div>
</template>
<style>
  li {
    margin: 5px 0;
  }

  ul {
    display: block;
    list-style-type: none;
    -webkit-margin-before: 0;
    -webkit-margin-after: 0;
    -webkit-margin-start: 0;
    -webkit-margin-end: 0;
    -webkit-padding-start: 0;
  }

  .el-checkbox__label {
    display: inline-block;
    padding-left: 5px !important;
    font-size: 12px !important;
    color: #a7a7ac !important;
  }

  #map {
    width: 100%;
    height: 400px;
  }

  .echarts {
    height: 300px;
  }

  .el-radio + .el-radio {
    margin-left: 0 !important;
  }

  .el-radio-group {
    line-height: 16px !important;
  }

  .el-radio__label {
    padding-left: 0 !important;
  }

  .video {
    position: relative;
    height: 300px;
    width: 400px;
  }

  img {
    position: absolute;
    height: 100%;
    width: 100%;
  }

  .Dashboard_titleCascader {
    background: #282635;
    color: white;
    line-height: 60px;
    margin: 0 5px;
    border-radius: 1px;
  }

  .Dashboard_box-card {
    border-radius: 1px;
    color: white;
    border: 0;
  }

  .Dashboard_clearfix {
    padding: 8px 30px;
    background: #353644;
    font-size: 15px;
  }

  .Dashboard_lineRow {
    margin: 10px 0 0 !important;
  }

  .Dashboard_card_body {
    background: #292936;
    height: 400px;
  }

  .Dashboard_card_body_two {
    background: #292936;
    height: 200px;
  }

  .Dashboard_card_main {
    padding: 10px 0;
  }

  .Dashboard_card_left {
    width: 50%;
    float: left;
  }

  .Dashboard_card_title {
    font-size: 14px;
    padding: 8px 20px;
    background: #1f1f2c;
    color: #a7a7ac;
  }

  .Dashboard_card_current {
    margin: auto;
    width: 80%;
  }

  .Dashboard_card_right {
    float: right;
    width: 50%;
  }

  .Dashboard_card_progressList {
    margin-top: 10px;
    background: #353644;
    padding: 8px;
    /*height: 150px;*/
    color: #a7a7ac;
    font-size: 12px;
  }

  .el-progress-bar__inner, .el-progress-bar__outer {
    border-radius: 0 !important;
  }

  .el-progress-bar__outer {
    background: inherit !important;
  }

  .Dashboard_card_road {
    padding-bottom: 2px;
  }

  .Dashboard_card_progress {
    width: 70%;
  }

  .Dashboard_card_vph {
    font-size: 15px;
    line-height: 30px;
  }

  .Dashboard_set_col {
    background: #353644;
    padding: 10px 30px;
    font-size: x-small;
    color: #b9b9b9;
  }
</style>
<script>
  import TimeLine from '../../components/TimeLine/TimeLine'
  import RoadGauge from '../../components/ECharts/RoadGaugeItem'
  import MixLineBar from '../../components/ECharts/MixLineBarItem'
  import PieDoughnut from '../../components/ECharts/PieDoughnutItem'
  import SmoothBarLine from '../../components/ECharts/SmoothBarLineItem'

  export default {
    components: {
      TimeLine,
      RoadGauge,
      MixLineBar,
      PieDoughnut,
      SmoothBarLine,
    },
    data() {
      let data = []

      for (let i = 0; i <= 360; i++) {
        let t = i / 180 * Math.PI
        let r = Math.sin(2 * t) * Math.cos(2 * t)
        data.push([r, i])
      }

      return {

        provinceList: [{
          value: '1',
          label: '江苏'
        }],
        cityList: [{
          value: '1',
          label: '淮安'
        }],
        areaList: [{
          value: '1',
          label: '盱眙'
        }],
        currentProvince: '1',
        currentCity: '1',
        currentArea: '1',
        roadFlow: [
          {name: '人民路 - 南京路', vph: '123', perc: 12, color: 'blue'},
          {name: '人民路 - 南京路', vph: '312', perc: 70, color: 'yellow'}
        ],
        firstMode: [],
        firstVehicle: [],
        radio: 3,
        radio1: 3,
        radio2: 3,
        radio3: 3,
        radio4: 2,
        radioLine: 1,


        videourl: '',
        videoCarurl: '',
        polar: {
          title: {
            text: '极坐标双数值轴'
          },
          legend: {
            data: ['line']
          },
          polar: {
            center: ['50%', '54%']
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          angleAxis: {
            type: 'value',
            startAngle: 0
          },
          radiusAxis: {
            min: 0
          },
          series: [
            {
              coordinateSystem: 'polar',
              name: 'line',
              type: 'line',
              showSymbol: false,
              data: data
            }
          ],
          animationDuration: 2000,
        }
      }
    },
    mounted() {
      this.video()
      // this.drawLine()
      var map = new window.BMap.Map("map");    // 创建Map实例
      map.centerAndZoom(new window.BMap.Point(119.020306, 33.625408), 10);  // 初始化地图,设置中心点坐标和地图级别
      // // map.setCurrentCity("武汉");          // 设置地图中心显示的城市 new！
      map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
      map.addControl(new window.BMap.NavigationControl());   //缩放按钮
      // map.addControl(new window.BMap.MapTypeControl( {mapTypes: [BMAP_NORMAL_MAP,BMAP_HYBRID_MAP]} ));   //添加地图类型控件 离线只支持普通、卫星地图; 三维不支持
      // var driving = new window.BMap.DrivingRoute(map, {
      //   renderOptions: {
      //     map: map,
      //     autoViewport: true
      //   }
      // });
      // // map.setMinZoom(10);
      // driving.search("中关村", "天安门");
      // var b = new window.BMap.Bounds(new window.BMap.Point(117.898377, 34.232956),new BMap.Point(120.414208,32.657899));
      // try {
      //   BMapLib.AreaRestriction.setBounds(map, b);
      // } catch (e) {
      //   // Window.layer.msg(e);
      // }
      // //监听地图缩放
      // // map.addEventListener("zoomend", function(){
      // //     if( this.getZoom() > 8 ) {
      // //         layer.msg("默认只有8级地图, 超过无法显示");
      // //     }
      // // });

      // var cr = new window.BMap.CopyrightControl({anchor: BMAP_ANCHOR_TOP_LEFT});   //设置版权控件位置
      // map.addControl(cr); //添加版权控件
      // var bs = map.getBounds();   //返回地图可视区域


    },
    methods: {
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表

        // app.title = '笛卡尔坐标系上的热力图';

        var hours = ['12a', '1a', '2a', '3a', '4a', '5a', '6a',
          '7a', '8a', '9a', '10a', '11a',
          '12p', '1p', '2p', '3p', '4p', '5p',
          '6p', '7p', '8p', '9p', '10p', '11p'];
        var days = ['Saturday', 'Friday', 'Thursday',
          'Wednesday', 'Tuesday', 'Monday', 'Sunday'];

        var data = [[0, 0, 10], [0, 1, 1], [0, 2, 0], [0, 3, 0], [0, 4, 0], [0, 5, 0], [0, 6, 0], [0, 7, 0], [0, 8, 0], [0, 9, 0], [0, 10, 0], [0, 11, 2], [0, 12, 4], [0, 13, 1], [0, 14, 1], [0, 15, 3], [0, 16, 4], [0, 17, 6], [0, 18, 4], [0, 19, 4], [0, 20, 3], [0, 21, 3], [0, 22, 2], [0, 23, 5], [1, 0, 7], [1, 1, 0], [1, 2, 0], [1, 3, 0], [1, 4, 0], [1, 5, 0], [1, 6, 0], [1, 7, 0], [1, 8, 0], [1, 9, 0], [1, 10, 5], [1, 11, 2], [1, 12, 2], [1, 13, 6], [1, 14, 9], [1, 15, 11], [1, 16, 6], [1, 17, 7], [1, 18, 8], [1, 19, 12], [1, 20, 5], [1, 21, 5], [1, 22, 7], [1, 23, 2], [2, 0, 1], [2, 1, 1], [2, 2, 0], [2, 3, 0], [2, 4, 0], [2, 5, 0], [2, 6, 0], [2, 7, 0], [2, 8, 0], [2, 9, 0], [2, 10, 3], [2, 11, 2], [2, 12, 1], [2, 13, 9], [2, 14, 8], [2, 15, 10], [2, 16, 6], [2, 17, 5], [2, 18, 5], [2, 19, 5], [2, 20, 7], [2, 21, 4], [2, 22, 2], [2, 23, 4], [3, 0, 7], [3, 1, 3], [3, 2, 0], [3, 3, 0], [3, 4, 0], [3, 5, 0], [3, 6, 0], [3, 7, 0], [3, 8, 1], [3, 9, 0], [3, 10, 5], [3, 11, 4], [3, 12, 7], [3, 13, 14], [3, 14, 13], [3, 15, 12], [3, 16, 9], [3, 17, 5], [3, 18, 5], [3, 19, 10], [3, 20, 6], [3, 21, 4], [3, 22, 4], [3, 23, 1], [4, 0, 1], [4, 1, 3], [4, 2, 0], [4, 3, 0], [4, 4, 0], [4, 5, 1], [4, 6, 0], [4, 7, 0], [4, 8, 0], [4, 9, 2], [4, 10, 4], [4, 11, 4], [4, 12, 2], [4, 13, 4], [4, 14, 4], [4, 15, 14], [4, 16, 12], [4, 17, 1], [4, 18, 8], [4, 19, 5], [4, 20, 3], [4, 21, 7], [4, 22, 3], [4, 23, 0], [5, 0, 2], [5, 1, 1], [5, 2, 0], [5, 3, 3], [5, 4, 0], [5, 5, 0], [5, 6, 0], [5, 7, 0], [5, 8, 2], [5, 9, 0], [5, 10, 4], [5, 11, 1], [5, 12, 5], [5, 13, 10], [5, 14, 5], [5, 15, 7], [5, 16, 11], [5, 17, 6], [5, 18, 0], [5, 19, 5], [5, 20, 3], [5, 21, 4], [5, 22, 2], [5, 23, 0], [6, 0, 1], [6, 1, 0], [6, 2, 0], [6, 3, 0], [6, 4, 0], [6, 5, 0], [6, 6, 0], [6, 7, 0], [6, 8, 0], [6, 9, 0], [6, 10, 1], [6, 11, 0], [6, 12, 2], [6, 13, 1], [6, 14, 3], [6, 15, 4], [6, 16, 0], [6, 17, 0], [6, 18, 0], [6, 19, 0], [6, 20, 1], [6, 21, 2], [6, 22, 2], [6, 23, 6]];

        data = data.map(function (item) {
          return [item[0], item[1], item[2] || '-'];
        });

        var option = {
          tooltip: {
            position: 'top'
          },
          animation: false,
          grid: {
            height: '50%',
            y: '10%'
          },
          xAxis: {
            type: 'category',
            data: days,
            splitArea: {
              show: false
            }
          },
          yAxis: {
            type: 'category',
            data: hours,
            splitArea: {
              show: false
            }
          },
          visualMap: {
            min: 0,
            max: 10,
            calculable: true,
            orient: 'horizontal',
            left: 'center',
            bottom: '15%'
          },
          series: [{
            name: 'Punch Card',
            type: 'heatmap',
            data: data,
            label: {
              normal: {
                show: true
              }
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }]
        }

        myChart.setOption(option);
      },

    },

  }
</script>
