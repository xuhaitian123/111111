<template>
    <div id = "container" style="height: 100%;width: 100%"></div>
</template>

<script>
    export default {
        name: "alarm-data-item",
        props:{},
        data(){
          return {
            myChart: undefined,
          }
        },
      mounted(){
          this.init()
      },
      methods:{}
    }

</script>

<style scoped>

</style>
