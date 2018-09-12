<template>
  <div>
    <div class="area_titleCascader">
      <span>省
        <el-select v-model="currentProvince" size="mini" placeholder="请选择" :popper-append-to-body="false">
          <el-option
            v-for="item in provinceList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </span>

      <span>城市
        <el-select v-model="currentCity" size="mini" placeholder="请选择" :popper-append-to-body="false">
          <el-option
            v-for="item in cityList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </span>

      <span>地区
        <el-select v-model="currentArea" size="mini" placeholder="请选择" :popper-append-to-body="false">
          <el-option class="selectColor"
                     v-for="item in areaList"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </span>

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
    height: 60px;
    margin: 0 5px;
    border-radius: 1px;
    display: flex;
    align-items: center;
    padding: 0 40px;
    font-size: 16px;
  }



</style>
