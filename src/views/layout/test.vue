<template>

    <div style="height: 150px;width: 150px">
      <gauge :id="'sdf'"></gauge>
    </div>





</template>


<script>


import gauge from '../../components/ECharts/gauge'
  export  default {
    data(){
      return {

        prov: '江苏',
        city: '淮安',
        district: '淮阴区',
        cityArr: [],
        districtArr: []
      }
    },
    methods: {

    },
    components:{
      gauge,
    },
    mounted: function () {



    },
    watch: {

    }
  }

</script>
