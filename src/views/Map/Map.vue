<template>
  <div class="container">
    <div class="map-contaienr">
      <img class="one" src="../../../static/map/地图1.png"/>
    </div>
    <div class="map-contaienr1">
      <img class="two" src="../../../static/map/地图2.png"/>

    </div>
    <div class="map-contaienr1">

    </div>
    <img class="three" src="../../../static/map/地图3.png"/>
  </div>

</template>
<style>
  .container{
    width: 1000px;
    height: 1000px;
    overflow: hidden;
    position: relative;

  }
  .map-contaienr{
    height: 100%;
    width: 100%;
    overflow: hidden;
    position: absolute;
    top:0;
    left: 0;
    transform-origin: 72%  50%;

  }
  .map-contaienr{
    height: 100%;
    width: 100%;
    overflow: hidden;
    position: absolute;
    top:0;
    left: 0;
    transform-origin: 72%  50%;

  }
  .map-contaienr1{
    height: 100%;
    width: 100%;
    overflow: hidden;
    position: absolute;
    top:0;
    left: 0;
    transform-origin: 72%  50%;

  }
  .map-contaienr2{
    height: 100%;
    width: 100%;
    overflow: hidden;
    position: absolute;
    top:0;
    left: 0;
    transform-origin: 72%  50%;

  }
  .one{
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
  .two{
    width: 100%;
    position: absolute;

    display: none;
  }
  .three{
    width: 100%;
    position: absolute;
    display: none;
  }

  /*.next,*/
  /*.pre,*/
  /*.current{*/
    /*position: absolute;*/
    /*left: 0;*/
    /*top: 0;*/
  /*}*/
  /*.next,*/
  /*.pre{*/
    /*width: 0;*/
    /*opacity: 0;*/
  /*}*/
  .current{
    width: 100%;
    opacity: 1;
  }

</style>
<script>

  export default {
    components:{

    },
    data() {

      return {

      }
    },
    methods: {
      test1(){
        $('.map-contaienr').animate({width:'500%', height:'500%',top:'-70%',left:'-300%'},  5000, ()=>{
          $('.two').css('display','block')
          $('.one').css('display','none')
          this.test2()
        })
      },
      test2(){
        $('.map-contaienr1').animate({width:'50%', height:'50%',top:'30%',left:'70%'},  5000, function(){
          $('.two').css('display','none')
          $('.map-contaienr').css('width','100%').css('height','100%').css('top',0).css('left',0)
          $('.one').css('display','block')
        })

      }

  },
    mounted() {
      setTimeout(this.test1, 3000)
      // setTimeout(this.test2, 6000)
    }
  }
</script>
