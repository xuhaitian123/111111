<template>


    <el-menu
      :default-active="this.$route.path"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :router="true"
      text-color="#88888F"
      active-text-color="#ffffff">
      <!-- <el-submenu index="/main/dashboard">
        <template slot="title">
          <span>交通数据展示</span>
          <div class="item-line"></div>
        </template>
          <el-menu-item index="/main/congestionMap">拥堵地图<div class="active-item"></div></el-menu-item>
        <el-menu-item index="/main/roadSectionMap/202">交通走廊数据展示<div class="active-item"></div></el-menu-item>
        <el-menu-item index="/main/intersectionsMap/2">交叉口数据展示<div class="active-item"></div></el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <span>交通数据分析</span>
          <div class="item-line"></div>
        </template>
          <el-menu-item index="/signalOptimization/signalOptimization">拥堵情况变化趋势<div class="active-item"></div><div class="item-line"></div></el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <span>视频监控与分析</span>
        </template>
          <el-menu-item index="/main/trafficVideo/2">视频监控与分析<div class="active-item"></div></el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <span>智能信号灯优化</span>
        </template>
        <el-menu-item index="/intelSignalLampOptimize/dataAnalyse">智能优化效果分析<div class="active-item"></div><div class="item-line"></div></el-menu-item>
        <el-menu-item index="/intelSignalLampOptimize/signalLampControl">智能信号灯控制<div class="active-item"></div></el-menu-item>
        <el-menu-item index="/intelSignalLampOptimize/firstPassSetting">优先通行设置<div class="active-item"></div></el-menu-item>
      </el-submenu> -->

      <el-submenu index="1">
        <template slot="title">
          <span>车辆信息可视化</span>
      </template>
        <!-- <el-menu-item index="/car/all_reg_car_loaction">所有登记车辆地区分布图<div class="active-item"></div></el-menu-item> -->
        <el-menu-item index="/car/VisualChart">可视化图表<div class="active-item"></div></el-menu-item>
        <el-menu-item index="/car/AllCarInformation">所有车辆概览<div class="active-item"></div><div class="item-line"></div></el-menu-item>
        <el-menu-item index="/car/AllViolationInformation">违章车辆概览<div class="active-item"></div></el-menu-item>
        <el-menu-item index="/car/AllPeopleInformation">车主信息概览<div class="active-item"></div></el-menu-item>
      </el-submenu>
       <el-submenu index="2">
        <template slot="title">
          <span>车辆信息查询</span>
        </template>
        <el-menu-item index="/car/select_violation_car">登记车辆与违章车辆查询<div class="active-item"></div><div class="item-line"></div></el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <span>车辆信息录入</span>
        </template>
        <el-menu-item index="/Information/InformationEntry">信息录入<div class="active-item"></div><div class="item-line"></div></el-menu-item>
        <el-menu-item index="/Information/InformationUpadte">信息更新<div class="active-item"></div></el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <span>数据导入</span>
      </template>
        <el-menu-item index="/dataImport/Excel">车辆数据批量导入(Excel)<div class="active-item"></div></el-menu-item>
        <!-- <el-menu-item index="/car/">违章车辆数据批量导入(Excel)<div class="active-item"></div><div class="item-line"></div></el-menu-item>
        <el-menu-item index="/car/">车主信息批量导入(Excel)<div class="active-item"></div></el-menu-item> -->
      </el-submenu>
      <el-submenu index="5" v-show="type == 'admin' ">
        <template slot="title">
          <span>用户管理</span>
      </template>
        <el-menu-item index="/userInfo/user">用户管理<div class="active-item"></div></el-menu-item>
        <!-- <el-menu-item index="/userInfo/auth">权限管理<div class="active-item"></div></el-menu-item> -->
      </el-submenu>
    </el-menu>
</template>
<style scoped>
  .el-menu-item, .el-submenu__title{
    position: relative;
    font-size: 14px;
  }
  .el-menu-item  .item-line{
    /*height: 1px;*/
    /*background: rgb(136,136,143);*/
    position: absolute;
    bottom: 0;
    width: 148px;
    left: 20px;
  }
  .el-menu>.el-menu-item:last-child .item-line{
    display: none;
  }

  .is-opened>.el-submenu__title >.item-line{
    display: none;
  }
  .el-submenu__title  .item-line{
    /*height: 1px;*/
    /*background: rgb(136,136,143);*/
    position: absolute;
    bottom: 0;
    width: 168px;
    left: 10px;
  }

</style>

<script>

  export default {
    data(){
      return{
        type : localStorage.getItem('type')
      }
    },
    mounted(){
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    watch: {
      '$route' (to, from) {
        // this.$router.go({
        //   path: this.$route.path,
        //   force: true
        // });
        // console.log(this.$route.path)
      }
    }
  }
</script>
