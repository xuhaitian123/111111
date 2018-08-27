<template>
  <!--<narbar/>-->
  <div class="layout-container">
    <div>
      <Header/>
    </div>
    <div class="layout-main">

      <div class="layout-left">
        <Sidebar/>
      </div>
      <div class="layout-right">
        <router-view />
      </div>

    </div>
  </div>

  <!--<AppMain></AppMain>-->
</template>
<style scoped>
  .layout-container{
    height: 100%;
  }
  .layout-main{
    min-height: 100%;
    display: flex;
  }
  .layout-left{
    width: 200px;
  }
  .layout-right{
    flex-grow:1;
    border: 1px solid #999999;
    background: #999999;
  }
</style>
<script>
  // import NarBar from ''
  import Sidebar from './components/Sidebar'
  import Header from './components/Header'
  // import AppMain from ''
  export default{
    data(){
      return{}
    },
    components:{
      Sidebar,
      Header,
    },
    methods:{
      key() {
        return this.$route.fullPath
      }
      },
    mounted(){

    }
  }
</script>
