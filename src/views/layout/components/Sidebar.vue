<template>


    <el-menu
      :default-active="this.$route.path"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :router="true"
      text-color="#88888F"
      active-text-color="#ffffff">
      <el-submenu index="/main/dashboard">
        <template slot="title">
          <span>交通数据展示</span>
          <div class="item-line"></div>
        </template>
        <!--<el-menu-item-group>-->

          <el-menu-item index="/main/congestionMap">拥堵地图<div class="active-item"></div></el-menu-item>
        <el-menu-item index="/main/roadSectionMap/202">交通走廊数据展示<div class="active-item"></div></el-menu-item>
        <el-menu-item index="/main/intersectionsMap/2">交叉口数据展示<div class="active-item"></div></el-menu-item>
        <!--</el-menu-item-group>-->
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <span>交通数据分析</span>
          <div class="item-line"></div>
        </template>
        <!--<el-menu-item-group>-->

          <el-menu-item index="/signalOptimization/signalOptimization">拥堵情况变化趋势<div class="active-item"></div><div class="item-line"></div></el-menu-item>
        <!--</el-menu-item-group>-->
      </el-submenu>
      <el-submenu index="">
        <template slot="title">
          <span>视频监控与分析</span>
        </template>
        <!--<el-menu-item-group>-->
          <el-menu-item index="/main/trafficVideo/2">视频监控与分析<div class="active-item"></div></el-menu-item>
          <!--<el-menu-item index="3-2">历史监控<div class="active-item"></div></el-menu-item>-->
        <!--</el-menu-item-group>-->
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <span>智能信号灯优化</span>
        </template>

        <!--<el-menu-item-group>-->
        <el-menu-item index="/intelSignalLampOptimize/dataAnalyse">智能优化效果分析<div class="active-item"></div><div class="item-line"></div></el-menu-item>
        <el-menu-item index="/intelSignalLampOptimize/signalLampControl">智能信号灯控制<div class="active-item"></div></el-menu-item>
        <el-menu-item index="/intelSignalLampOptimize/firstPassSetting">优先通行设置<div class="active-item"></div></el-menu-item>
        <!--</el-menu-item-group>-->
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
      return{}
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
