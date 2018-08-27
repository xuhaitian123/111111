<template>
  <div class="main-container">
    <div class="container" v-bind:style="{width: width+'px', height: height+'px', marginTop: marginTop+'px'}">
      <div class="map-contaienr">
        <img class="one" src="../../../static/map/地图1.png"/>
      </div>
      <div class="map-contaienr1">
        <img class="two" src="../../../static/map/地图2.png"/>

      </div>
      <div class="map-contaienr2">
        <img class="three" src="../../../static/map/地图3.png"/>
      </div>
      <button  style="position: absolute;left: 100px" v-on:click="test1">test1</button>
      <button  style="position: absolute;left: 200px" v-on:click="test2">test2</button>
      <button  style="position: absolute;left: 300px" v-on:click="test3">test3</button>
      <button  style="position: absolute;left: 400px" v-on:click="test4">test4</button>
      <button  style="position: absolute;left: 500px" v-on:click="home">home</button>
      <button  style="position: absolute;left: 500px" v-on:click="enter">进入</button>

    </div>
  </div>


</template>
<style>
  .main-container{
    overflow: hidden;
    background: black;
  }
  .container{
    margin: auto;

  }
  .map-contaienr{}
  .container{
    width: 1000px;
    height: 500px;
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
      var clientWidth =  document.body.clientWidth;
      var clientHeight = document.body.clientHeight;
      return {
        width: (clientHeight-60) *2,
        height: clientHeight-60 ,
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
