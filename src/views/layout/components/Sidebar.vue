<template>


    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <span>交通数据展示</span>
        </template>
        <!--<el-menu-item-group>-->
          <el-menu-item index="1-1">拥堵地图<div class="active-item"></div></el-menu-item>
          <el-menu-item index="1-2">交叉口数据展示<div class="active-item"></div></el-menu-item>
          <el-menu-item index="1-3">道路数据展示<div class="active-item"></div></el-menu-item>
        <!--</el-menu-item-group>-->
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <span>交通数据分析</span>
        </template>
        <!--<el-menu-item-group>-->
          <el-menu-item index="2-1">信号灯优化前后数据分析<div class="active-item"></div></el-menu-item>
          <el-menu-item index="2-2">拥堵情况数据前后分析<div class="active-item"></div></el-menu-item>
        <!--</el-menu-item-group>-->
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <span>监控视频</span>
        </template>
        <!--<el-menu-item-group>-->
          <el-menu-item index="3-1">实时监控<div class="active-item"></div></el-menu-item>
          <el-menu-item index="3-2">历史监控<div class="active-item"></div></el-menu-item>
        <!--</el-menu-item-group>-->
      </el-submenu>
    </el-menu>
</template>
<style>


</style>

<script>

  export default {
    data(){
      return{}
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
