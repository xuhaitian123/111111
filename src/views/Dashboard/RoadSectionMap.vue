<template>
  <div>
    <area-select></area-select>
    <el-row :gutter="10" class="Dashboard_lineRow">
      <el-col>
        <el-card shadow="never" :body-style="{ padding: '0px' }" class="Dashboard_box_card">
          <div class="Dashboard_clearfix">
            <span><i class="el-icon-arrow-left" style="margin-right: 10px" @click="jumpPage('/main/dashboard')"></i>路段数据展示</span>
            <div style="float: right; padding: 3px 0">
              <i class="iconfont icon-webicon03"></i>
            </div>
          </div>
          <div class="" style="position: relative;background: #1f1f2c">
            <RoadNetMap style="width: 1070px"></RoadNetMap>

          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import AreaSelect from '../../components/Area/Area'
  import RoadNetMap from '../../components/Map/Map'

  export default {
    components: {
      AreaSelect,
      RoadNetMap,
    },
    data() {
      return {}
    },
    mounted(){},
    methods:{
      getNodeDataD12ByNodeId(){

      },
    }
  }
</script>

<style scoped>
  .Dashboard_clearfix {
    padding: 10px 30px;
    background: #353644;
    font-size: 15px;
  }
</style>
