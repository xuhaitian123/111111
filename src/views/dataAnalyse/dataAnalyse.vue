<template>
  <div class="contianer">
    <Area></Area>
    <div class="contianer_body">
      <div class="contianer_body_title">
        <div class="title">
        <img  class="toLeft" src="../../../static/map/toLeft.png"/><span class="title_text">信号灯优化前后数据</span>
        </div>
      </div>
      <div class="contianer_body_layout">
        <div class="score">
          
        </div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
        <div class=""></div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  .contianer_body{
    padding: 10px 10px;
    height: 935px;
  }
  .contianer_body_title{
    background: #353D4F;
    height: 40px;
  }
  .title{
    line-height: 40px;
    width: 250px;
    display: flex;
    align-items: center;
  }
  .title_text{
    font-size: 19px;
    display: block;
    margin-left: 20px;
  }
  .toLeft{
    height: 19px;
    margin-left: 30px;
  }
  .contianer_body_layout{
    background: #272836;
    padding: 10px 10px;
  }

</style>

<script>
  import Area from '../../components/Area/Area'
  export default {
    name: "DataAnalyse",
    methods:{

    },
    components:{
      Area
    },
    mounted(){
      console.log('1212')
    }
  }
</script>
