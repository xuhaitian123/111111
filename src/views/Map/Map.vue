<template>
  <div class="main-container">
    <div class="container" >
      <div class="map-contaienr">
        <button  class="button-1" v-on:click="test1"></button>
        <img class="one" src="../../../static/map/地图11.png"/>

      </div>
      <div class="map-contaienr1">
        <button  class="button-2" v-on:click="test2"></button>
        <img class="two" src="../../../static/map/地图22.png"/>
      </div>
      <div class="map-contaienr2">
        <button  class="button-3" v-on:click="enter"></button>
        <img class="three" src="../../../static/map/地图33.png"/>
      </div>
    </div>
    <div class="map-area-container">
      <div class="map-area-container-header">
        <div class="map-area-container-header-action"><img  src="/static/map/left.png"/></div>
        <div class="map-area-container-header-title">
          <div>中国 </div><img src="/static/map/right.png"> 江苏省 > 淮安市
        </div>

      </div>
      <div class="map-area-container-main">

      </div>
    </div>
  </div>


</template>
<style scoped>
  .button-1{
    width: 195px;
    height: 60px;
    position: absolute;
    left: 1385px;
    top: 480px;
    z-index:200;
    opacity: 0;
  }
  .button-2{
    width: 195px;
    height: 60px;
    position: absolute;
    left: 865px;
    top: 260px;
    z-index:200;
    opacity: 0;
  }
  .button-3{
    width: 195px;
    height: 60px;
    position: absolute;
    left: 814px;
    top: 162px;
    z-index:200;
    opacity: 0;
  }
  .main-container{
    height: 100%;
    width: 100%;
    overflow: hidden;
    background: black;
    position: relative;
  }
  .map-area-container{
    position: absolute;
    width: 320px;
    height: 320px;
    left: 30px;
    top: 30px;
    background: rgb(56,58,71);
  }
  .map-area-container-header{
    height: 40px;
    background: rgb(39,39,53);
    display: flex;
    align-items: center;
    padding: 0 16px;
  }
  .map-area-container-header-action img{
    width: 22px;
    height: 14px;
  }
  .map-area-container-header-title{
    display: flex;
    align-items: center;
  }
  .map-area-container-header-title img{
    width: 16px;
    height: 16px;
  }
  .map-area-container-header-title{
    padding-left: 12px;
  }

  .container{
    margin: auto;
  }
  .map-contaienr{}
  .container{
    height: 100%;
    width: 100%;
    overflow: hidden;
    position: relative;
    background: rgb(53,54,68);
  }

  .map-contaienr{
    height: 100%;
    width: 100%;
    overflow: hidden;
    position: absolute;
    top:0;
    left: 0;
    /*opacity: 0;*/
  }
  .map-contaienr1{
    height: 100%;
    width: 100%;
    overflow: hidden;
    position: absolute;
    top:0;
    left: 0;
    opacity: 0;
  }
  .map-contaienr2{
    height: 100%;
    width: 100%;
    overflow: hidden;
    position: absolute;
    opacity: 0;
    top:0;
    left: 0;

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

    /*display: none;*/
  }
  .three{
    width: 100%;
    position: absolute;
    /*display: none;*/
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
        marginTop: 0
      }
    },
    methods: {
      test1(){
        $('.map-contaienr').animate({width:'500%', height:'500%', left:'-340%','top':'-240%',opacity:'0.4'},  500, ()=>{
          $('.map-contaienr').animate({opacity: '0'},500,function(){

              $('.map-contaienr').animate({width:'100%', height:'100%', left:'0','top':'0'})
          })
          $('.map-contaienr1').animate({opacity: '1'},500)
          // this.test2()
        })
      },
      test2(){
        $('.map-contaienr1').animate({width:'200%', height:'200%', left:'-50%','top':'-50%',opacity:'0.4'},  500, ()=>{
          $('.map-contaienr1').animate({opacity: '0'},300, function(){

            $('.map-contaienr1').animate({width:'100%', height:'100%', left:'0','top':'0'})
          })
          $('.map-contaienr2').animate({opacity: '1'},1000)
          // setTimeout(this.test3 ,2000)
        })
      },

      test3(){
        $('.map-contaienr2').animate({width:'50%', height:'50%', left:'25%','top':'25%',opacity:'0.4'},  500, ()=>{
          $('.map-contaienr2').animate({opacity: '0'},500,function(){
            $('.map-contaienr2').animate({width:'100%', height:'100%', left:'0','top':'0'})
          })
          $('.map-contaienr1').animate({opacity: '1'},500)
          // this.test2()
        })
      },
      test4(){
        $('.map-contaienr1').animate({width:'20%', height:'20%', left:'68%','top':'52%',opacity:'0.4'},  500, ()=>{
          $('.map-contaienr1').animate({opacity: '0'},500,function(){
            $('.map-contaienr1').animate({width:'100%', height:'100%', left:'0','top':'0'})
          })
          $('.map-contaienr').animate({opacity: '1'},500)
          // this.test2()
        })
      },
      home(){
        $('.map-contaienr2').animate({width:'10%', height:'10%', left:'73%','top':'58%',opacity:'0.4'},  500, ()=>{
          $('.map-contaienr2').animate({opacity: '0'},500,function(){
            $('.map-contaienr2').animate({width:'100%', height:'100%', left:'0','top':'0'})
          })
          $('.map-contaienr').animate({opacity: '1'},500)
          // this.test2()
        })
      },
      enter(){
        this.$router.push('/main/dashboard')
      }

  },
    mounted() {

      // setTimeout(this.test1, 3000)
      // setTimeout(this.test2, 6000)
    }
  }
</script>
