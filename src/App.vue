<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: rgb(41,41,53);
  width: 1920px;
  /*height: 100%;*/
  transform-origin: 0 0;
  position: relative;
  /*margin-top: 60px;*/
}

  .fr{
    float: right;
  }

  .fl{
    float: left;
  }
</style>
