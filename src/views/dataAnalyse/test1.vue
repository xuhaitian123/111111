<template>
    <div class="container">
      <div class="tab">
        <input  type = 'radio' name = 'tab-radio' class = 'tab-radio' id = 'tab-radio-1'checked>
        <label for ='tab-radio-1' class="tab-handler tab-handler-1">路网流量、平均车速月变化趋势</label>
        <div class="tab-content tab-content-1">
sndfns,nf,msnm,dfn,
        </div>
        <input  type = 'radio' name = 'tab-radio' class = 'tab-radio' id = 'tab-radio-2'>
        <label for ='tab-radio-2' class="tab-handler tab-handler-2">优先通行系统效果图</label>
        <div class="tab-content tab-content-2">
sdnfsn,md,msndfm,ns,mdf
        </div>
      </div>
      </div>
</template>

<script>
    export default {
        name: "test1"
    }
</script>

<style scoped>
.container{
  height: 500px;
  background-color: #1f1f2c;
}
  .tab{
    position: relative;
    height: 100px;
    width: 800px;
    background-color: #003eff;
  }
  .tab .tab-radio{
    display: none;
  }
  .tab-handler{
    position: relative;
    z-index: 2;
    display: block;
    float: left;
    height: 100px;
    padding: 0 40px;
    color: #717181;
    font-size: 16px;
    line-height: 100px;
  }
.tab-radio:checked + .tab-handler{
  color: #fff;
  background-color: #e74c3c;
}
.tab-radio:checked + .tab-handler + .tab-content{
  visibility: visible;
  opacity: 1;
}
.tab .tab-content{
  visibility: hidden;
  position: absolute;
  top:100px;
  left: 0;
  width: 740px;
  padding: 30px;
  color: #999;
  font-size: 14px;
  line-height: 1.618em;
  background-color: #fff;
  opacity: 0;
}
</style>
