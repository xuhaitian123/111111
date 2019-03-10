<template>
  <div v-for="(intersections, index) in intersectionsList" v-if="index*2 < intersectionsList.length"
       class="rate-container">
    <div class="rate-container-item">
      <div class="rate-container-item-title"> {{intersections.rate}}%</div>
      <div class="rate-container-cavans-container">
        <rate :id="intersectionsList[index].id" :rate="intersections.rate"></rate>
      </div>


    </div>
    <div class="rate-container-action-contaienr">
      <div class="rate-item-top" :class="{'hide': index === 0}"></div>
      <div class="rate-container-action">
        <div class="rate-container-action-line"></div>
        <div class="rate-container-action-option">

        </div>
        <div class="rate-container-action-line"></div>

      </div>
      <div class="rate-item-bottom" :class="{'hide': index+1 === intersectionsList.length
            /2}"></div>

    </div>
    <div class="rate-container-item">
      <div class="rate-container-cavans-container">
        <rate :id="intersectionsList[intersectionsList.length-1-index].id"
              :rate="intersectionsList[intersectionsList.length-1-index].rate"></rate>
      </div>

      <div class="rate-container-item-title"> {{intersectionsList[intersectionsList.length-1-index].rate}}%</div>
    </div>

  </div>
</template>
<script>
  export  default {

    date(){

    }
  }
</script>
<style scoped>


</style>
