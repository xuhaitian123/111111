<template>
  <div id="allmap" style="height: 300px"></div>

</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted(){
    var map = new BMap.Map('allmap');
    map.centerAndZoom(new BMap.Point(116.404269,39.916042), 12);
    var  mapStyle ={
      features: ["road", "building","water","land"],//隐藏地图上的poi
      style : "dark"  //设置地图风格为高端黑
    }
    map.setMapStyle(mapStyle);
    function checkhHtml5()
    {
      if (typeof(Worker) === "undefined")
      {
        if(navigator.userAgent.indexOf("MSIE 9.0")<=0)
        {
          alert("定制个性地图示例：IE9以下不兼容，推荐使用百度浏览器、chrome、firefox、safari、IE10");
        }

      }
    }
    checkhHtml5()
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
