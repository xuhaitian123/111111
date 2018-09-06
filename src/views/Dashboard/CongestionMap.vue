<template>
  <div>
    <div class="Dashboard_titleCascader">
      <span>省
        <el-select v-model="currentProvince" placeholder="请选择" class="Dashboard_titleSelect">
          <el-option
            v-for="item in provinceList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </span>

      <span>城市
        <el-select v-model="currentCity" size="mini" placeholder="请选择" class="Dashboard_titleSelect">
          <el-option
            v-for="item in cityList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </span>

      <span>地区
        <el-select v-model="currentArea" size="mini" placeholder="请选择" class="Dashboard_titleSelect">
          <el-option class="selectColor"
                     v-for="item in areaList"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </span>
    </div>
    <el-row :gutter="10" class="Dashboard_lineRow">
      <el-col>
        <el-card shadow="never" :body-style="{ padding: '0px' }" class="Dashboard_box-card">
          <div class="Dashboard_clearfix">
            <span>拥堵地图</span>
            <div style="float: right; padding: 3px 0">
              <i class="iconfont icon-fangda" @click="jumpPage()"></i>
              <i class="iconfont icon-shuxian"></i>
              <i class="iconfont icon-webicon03"></i>
            </div>
          </div>
          <div class="Dashboard_card_body">
            <div id="map"></div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: "congestion-map",
       data(){
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
          }
       },
      mounted(){
        let map = new window.BMap.Map("map");    // 创建Map实例
        map.centerAndZoom(new window.BMap.Point(119.020306, 33.625408), 10);  // 初始化地图,设置中心点坐标和地图级别
        map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
        map.addControl(new window.BMap.NavigationControl());   //缩放按钮
        // let driving = new window.BMap.DrivingRoute(map, {
        //   renderOptions: {
        //     map: map,
        //     autoViewport: true
        //   }
        // });
        // driving.search("中关村", "天安门");
        let b = new window.BMap.Bounds(new window.BMap.Point(117.898377, 34.232956), new BMap.Point(120.414208, 32.657899));
        try {
          BMapLib.AreaRestriction.setBounds(map, b);
        } catch (e) {
          // Window.layer.msg(e);
        }
        // var cr = new window.BMap.CopyrightControl({anchor: BMAP_ANCHOR_TOP_LEFT});   //设置版权控件位置
        // map.addControl(cr); //添加版权控件
        // var bs = map.getBounds();   //返回地图可视区域0.
      },
      methods:{

      }
    }
</script>

<style lang="css">
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
    font-size: 12px;
    color: #a7a7ac !important;
  }

  .el-checkbox__inner,.el-radio__inner{
    background: initial;
  }

  .el-select-dropdown {
    border: 0;
    text-align: center;
  }

  .el-select-dropdown__list {
    padding: 0 5px 5px 5px;
    background: #353644;
  }

  .el-select-dropdown__list li {
    margin: 0;
    padding: 5px;
    border-bottom: 1px solid #949494;
  }

  .el-popper .popper__arrow, .el-popper .popper__arrow::after {
    border-style: none;
  }

  .el-select-dropdown__item.selected {
    color: white;
    font-weight: 100;
    background: #353644;
  }

  .el-select-dropdown__item.selected span {
    font-size: 12px !important;
  }

  .el-select-dropdown__item {
    height: initial;
    line-height: initial;
  }

  .el-select .el-input, .el-select, .el-select input {
    height: 20px !important;
    font-size: 14px;
    background: #353643;
    border: 1px solid #353643;
  }

  .el-select .el-input__icon {
    line-height: 20px;
  }

  .Dashboard_titleSelect {
    margin: 0 10px;
  }

  #map {
    width: 100%;
    height: 955px;
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

  .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner,
  .el-radio__input.is-checked .el-radio__inner {
    background-color: #ef7f3e !important;
    border-color: #ef7f3e;
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
    font-size: 12px;
    height: 20px;
    padding: 12.5px 20px;
    margin: 0 10px;
    border-radius: 1px;
  }

  .Dashboard_box-card {
    border-radius: 1px;
    color: white;
    border: 0;
  }

  .Dashboard_clearfix {
    padding: 10px 30px;
    background: #353644;
    font-size: 15px;
  }

  .Dashboard_lineRow {
    margin: 10px 5px !important;
  }

  .Dashboard_card_body {
    background: #292936;
    height: 955px;
  }

</style>

