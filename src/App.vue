
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
  /*color: rgb(41,41,53);*/
  width: 1920px;
  /*height: 100%;*/
  transform-origin: 0 0;
  position: relative;
  /*margin-top: 60px;*/
}

ul {
  display: block;
  list-style-type: none;
  -webkit-margin-before: 0;
  -webkit-margin-after: 0;
  -webkit-margin-start: 0;
  -webkit-margin-end: 0;
  -webkit-padding-start: 0;
}

  .fr{
    float: right;
  }

  .fl{
    float: left;
  }

  .fs14{
    font-size: 14px;
  }
</style>
