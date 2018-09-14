<template>
  <div>
    <div class="area_titleCascader">
      <span>省
        <el-select v-model="currentProvince" size="mini" class="area_titleSelect" placeholder="请选择">
          <el-option
            v-for="item in provinceList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </span>

      <span>城市
        <el-select v-model="currentCity" size="mini" class="area_titleSelect" placeholder="请选择">
          <el-option
            v-for="item in cityList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </span>

      <span>地区
        <el-select v-model="currentArea" size="mini" class="area_titleSelect" placeholder="请选择">
          <el-option class="selectColor"
                     v-for="item in areaList"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </span>

      <span class="area_time">{{ formatDate(new Date(),'yyyy.MM.dd hh:mm')}}</span>
    </div>
  </div>
</template>
<script>
  export  default {
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
        currentProvince:'1',
        currentCity:'1',
        currentArea:'1'
      }
    },
    methods:{

    }
  }

</script>
<style scoped>
  .area_titleCascader{
    background: #282635;
    color: white;
    font-size: 12px;
    height: 20px;
    padding: 12.5px 20px;
    margin: 0 10px;
    border-radius: 1px;

    /*background: #282635;*/
    /*color: white;*/
    /*height: 60px;*/
    /*margin: 0 5px;*/
    /*border-radius: 1px;*/
    /*display: flex;*/
    /*align-items: center;*/
    /*padding: 0 40px;*/
    /*font-size: 16px;*/
  }

  .area_titleSelect {
    margin: 0 10px;
  }

  .area_time{
    float: right;
    font-size: 20px;
  }

</style>
