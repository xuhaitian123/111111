<template>
  <div>
    <area-select></area-select>
    <el-row :gutter="10" class="Signal_lamp_lineRow">
      <el-col>
        <el-card shadow="never" :body-style="{ padding: '0px' }" class="Dashboard_box_card">
          <div class="Dashboard_clearfix">
            <span><i class="el-icon-arrow-left" style="margin-right: 10px" @click="jumpPage('/main/dashboard')"></i>拥堵地图</span>
            <div class="nav-right-style">
              <i class="iconfont icon-fangda" @click="jumpPage('/main/dashboard')"></i>
              <i class="iconfont icon-shuxian"></i>
              <i class="iconfont icon-webicon03"></i>
            </div>
          </div>
          <div class="signal-lamp-container">
            <div id="bigMap" class="show-map-style"></div>

            <div class="right-container">
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import AreaSelect from '../../components/Area/Area'
    export default {
      name: "SignalLampControl",
      components: {
        AreaSelect,
      },
      data() {
        return {}
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
    background: rgba(41,41,54,0.8);
    position: absolute;
    width: 530px;
    height: 875px;
    top: 10px;
    right: 15px
  }

  .CongestionMap_Legend li:last-child {
    border-bottom: 0;
  }

  .CongestionMap_Legend li {
    margin: 0 10px;
    border-bottom: 1px solid #a7a7ac;
  }

  .Dashboard_alarm_list span {
    font-size: 12px;
  }

  .Dashboard_alarm_info {
    margin-top: 10px;
    border-left: 1px solid #63646f;
    line-height: 18px
  }

  .Dashboard_card_body {
    background: rgba(41, 41, 54, 0.8);
    height: 380px;
  }

  .Dashboard_card_alarm {
    line-height: 30px;
    text-align: center;
    background: #1f1f2c;
    font-size: 14px;
    color: #fff;
  }

  .mb10 {
    margin-bottom: 10px
  }

  .Dashboard_alarm_list {
    text-align: center;
    background: #353644;
    color: #a7a7ac;
    margin-bottom: 5px
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
