<template>
  <div class="header-container">
     <div class="logo-container">
       <img  class="logo-container-logo" src="/static/image/header/1.png">
       <div class="logo-container-line"></div>
       <div class="logo-container-name">交通数据平台系统</div>

     </div>
    <div class="logo-nav">
      <div class="logo-nav-action" @click="logout">
        <img class="logo-nav-img" src="/static/image/header/11.png">
        <div>李警官</div>
      </div>


    </div>
  </div>
</template>
<script>
  export  default {
    data(){
      return {}
    },
    methods:{
      logout(){
        this.$router.push('/login');
      }
    }
  }
</script>

<style>

  .header-container{
    position: absolute;
    width: 100%;
    display: flex;
    height: 60px;
    background: rgb(25,25,38);
    padding: 0 30px;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
  }
  .logo-container{
    width: 300px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .logo-container-line{
    height: 40px;
    width: 1px;
    background: #fff;
  }
  .logo-container-logo{
    width: 110px;
  }
  .logo-container-name{
    font-size: 21px;
    color: #94949a

  }
  .logo-nav-action{
    display: flex;
    justify-content: flex-end;
    align-items: end;
  }
  .logo-nav{
    width: 400px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
  .logo-nav-img{
    width: 20px;
    height: 20px;
    box-sizing: border-box;
    margin-right: 15px;
  }


</style>
