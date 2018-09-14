<template>
  <div>
    <area-select></area-select>
    <el-row :gutter="10" class="Dashboard_lineRow">
      <el-col>
        <el-card shadow="never" :body-style="{ padding: '0px' }" class="Dashboard_box_card">
          <div class="Dashboard_clearfix">
            <span>拥堵地图</span>
            <div style="float: right; padding: 3px 0">
              <i class="iconfont icon-fangda" @click="jumpPage('/main/dashboard')"></i>
              <i class="iconfont icon-shuxian"></i>
              <i class="iconfont icon-webicon03"></i>
            </div>
          </div>
          <div class="" style="height: 980px;position: relative">
            <div id="bigMap" style="height: 980px"></div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import AreaSelect from '../../components/Area/Area'

  export default {
    components:   {
      AreaSelect,
    },
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
         allNodeAlarmInfo: [],
         congestionPercent: 0,
         roadNetCongestionScore: 0,
         currentRoadNet: false,
       }
     }
    }
</script>

<style scoped>

</style>
