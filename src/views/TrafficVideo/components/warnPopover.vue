<template>
  <div class="warn-popover-container">
    <div class='warn-popover-action'>
      <img src="/static/image/trafficVideo/59.png">
    </div>
    <div class="warn-popover-content">
      <div class="warn-popover-content-arrow"></div>
      <div class="warn-popover-content-main">
        {{content}}
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props:{
      content: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style>
  .warn-popover-container{
    position: relative;
    width: 100%;
    height: 100%;
  }
  .warn-popover-action{
    width: 100%;
    height: 100%;
  }
  .warn-popover-action  img{
    width: 100%;
    height: 100%;
  }

  .warn-popover-container:hover .warn-popover-content{
    display: block;
  }
  .warn-popover-content{
    display: none;
    position: absolute;
    bottom: -95px;
    width: 182px;
    left: -152px;
    min-height: 50px;
    z-index: 90;
    background: rgb(99,101,122);
    padding: 10px;
    box-sizing: border-box;
  }
  .warn-popover-content-main{
    position: relative;
    z-index: 100;
    height: 100%;
    background: rgb(99,101,122);
  }

  .warn-popover-content-arrow{
    position: absolute;
    top: -6px;
    left: 83%;
    margin-right: 3px;
    border-top-width: 0;
    width: 20px;
    height: 20px;
    z-index: 99;
    background: rgb(99,101,122);
    transform: rotate(45deg);
  }


</style>
