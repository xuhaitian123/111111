<template>
  <div class="timeLine-container">
    <canvas id="timeLine-line" width="1000" height="80">

    </canvas>
    <div class="timeLine-current-line">
      <div class="timeLine-current-line-bottom">

      </div>

    </div>
  </div>

</template>

<style>
    .timeLine-container{
      width: 1000px;
      height: 80px;
      position: relative;
    }
  .timeLine-current-line{
    position: absolute;
    top: 0;
    width: 1px;
    height: 100%;
    background: #ffffff;
    overflow: visible;
  }
  .timeLine-current-line-bottom{
    position: absolute;
    width: 10px;
    height: 10px;
    transform: rotate(45deg);
  }

</style>

<script>
  export default {
    data(){
      return{

      }
    },
    mounted(){
      this.init()
    },
    methods:{
      init(){
        let c=document.getElementById("timeLine-line");
        let ctx=c.getContext("2d");
        let index = 0;
        let left = 0;
        let space = 5;
        let start = 65;
        let bigLine = 10;
        let smallLine = 3;
        let midLine = 5;
        let totalLine = 150;
        let mid  = 5;
        let big = 10;
        let startTime =  new Date().getTime()


        do{
          ctx.beginPath();
          ctx.lineWidth = 1;
          ctx.strokeStyle = 'black'
          ctx.moveTo(space*index+left, start);
          if(index%big ===0){
            ctx.strokeStyle = 'red'
            ctx.lineTo(space*index+left, start-bigLine);
          }else if(index % mid === 0){
            ctx.lineTo(space*index+left,start-midLine);
          }else{
            ctx.lineTo(space*index+left,start-smallLine);
          }
          ctx.stroke();
          index+=1;
        }while (index<totalLine)
      }
    }
  }
</script>
