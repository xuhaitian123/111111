<template>
<div>
  <Area></Area>

  <div class="main">
    <div class="header">
      <img src="../../../static/map/toLeft.png" class="header_img" >
      <span class="header-span">拥堵情况变化趋势分析</span>
    </div>
    <div class="main_up">
    <div class="main_up_left">
      <div class="main_up_child_head">
        <span>周拥堵情况查看，对比</span>
      </div>
    </div>
    <div class="main_up_middle">
      <div class="main_up_child_head">
        <span>道路天（24hr）趋势分析</span>
      </div>
    </div>
      <div class="main_up_right">
        <div class="main_up_child_head">
          <span>道路协同分析</span>
        </div>
      </div>
    </div>
    <div class="main_down">
      <div class="main_down_head">
        <span>天（24hr）趋势分析</span>
      </div>
      <div class="main_down_down">

      </div>
    </div>
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
  .main{
    width: 1638px;
    height: 935px;
    background-color:#252531;
    margin: 10px 10px
  }
.header{
  width: 1638px;
  height: 40px;
  background-color: #353644;
  display: flex;
  align-items: center;
}
  .header-span{
    line-height: 19px;
    color: #ffffff;
    margin-left: 20px;
  }

  .header_img{
    height: 18px;
    margin-left: 30px;
  }
  .main_up{
    width: 1618px;
    height: 650px;
    display: flex;
    padding: 10px 10px;
  }
  .main_up_left{
    width: 530px;
    height: 650px;
    background-color: #333643
  }
  .main_up_middle{
    width: 560px;
    height: 650px;
    background-color: #333643;
    margin: 0 15px
  }
  .main_up_right{
    width: 528px;
    height: 650px;
    background-color: #333643;
  }
  .main_up_child_head{
    height: 30px;
    background-color: #1D1D2C;
    padding: 0 20px;
    display: flex;
    align-items: center;
  }
  .main_up_child_head span{
    line-height: 19px;
    color: #ffffff;
  }
  .main_down{
    width: 1620px;
    height: 215px;
    padding: 0 10px;
  }
  .main_down_head{
    height: 35px;
    background-color: #1D1D2C;
    display: flex;
    align-items: center;
    padding: 0 20px;
  }
  .main_down_head span {
    line-height: 19px;
    color: #ffffff;
  }
  .main_down_down{
    height: 180px;
    background-color:#333643 ;
  }
</style>
