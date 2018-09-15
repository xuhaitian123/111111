<template>
  <div id="bigMap" style="height: 980px"></div>
</template>

<script>
    export default {
        name: "map",
      data(){
          return{

          }
      },
      mounted(){
          this.init()
      },
      methods:{
          init(){
            let map = new window.BMap.Map("bigMap");    // 创建Map实例
            map.centerAndZoom(new window.BMap.Point(119.170574, 33.513026), 14);  // 初始化地图,设置中心点坐标和地图级别
            map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
            map.setMinZoom(12);
            map.setMaxZoom(16);
            map.addControl(new window.BMap.NavigationControl());   //缩放按钮
            let b = new window.BMap.Bounds(new window.BMap.Point(118.19214, 32.717855), new window.BMap.Point(119.648976, 34.184862));
            try {
              BMapLib.AreaRestriction.setBounds(map, b);
            } catch (e) {
            }

            window.congestionMap = map;
          },
      }
    }
</script>

<style scoped>

</style>
