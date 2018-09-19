<template>
<div>
  <Area></Area>

  <div style="display: flex;width: 1638px;height: 935px;background-color:#252531;margin: 10px 10px">
    <div class="header">
      <img src="" >
      <span class="header-span">拥堵情况变化趋势分析</span>
    </div>
    <!--<div style="width: 530px;height: 650px;background-color: #fff">-->
    <!--</div>-->
    <!--<div style="padding: 0 15px">-->
    <!--<div style="width: 560px;height: 650px;background-color: red;">-->
    <!--</div>-->
    <!--</div>-->
  </div>
</div>
</template>

<script>
  import Area from '../../components/Area/Area'
  export default {
        name: "signal-optimization",
    components: {
      Area,
    },
    }
</script>

<style scoped>
.header{
  width: 1640px;
  height: 40px;
  background-color: #353644;
  display: flex;
  align-items: center;
}
  .header-span{
    line-height: 19px;
    color: #ffffff;
  }
</style>
