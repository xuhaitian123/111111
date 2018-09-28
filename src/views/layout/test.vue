<template>

    <div>
      <canvas height="140" width="140" id="test"></canvas>
    </div>





</template>


<script>



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
    mounted: function () {
      var rate = 0.8/100*80;
      var c=document.getElementById("test");
      var ctx=c.getContext("2d");
      ctx.beginPath();
      ctx.lineWidth=2;
      ctx.strokeStyle='red';
      ctx.arc(70,70,60, 1.1 * Math.PI, (1.1+rate)*Math.PI);
      ctx.stroke();

      var c=document.getElementById("test");
      var ctx=c.getContext("2d");
      ctx.beginPath();
      ctx.lineWidth=2;
      ctx.strokeStyle='#fff';
      ctx.arc(70,70,54, 1.115 * Math.PI, (1.87)*Math.PI);
      ctx.stroke();


      var deg = (Math.PI)*(1.6+rate);
      var posX = 70 + Math.sin(deg)*60;
      var posY = 70 - Math.cos(deg)*60;
      ctx.beginPath();
      ctx.lineWidth=2
      ctx.strokeStyle='red';
      ctx.arc(posX,posY, 4, 0, 2*Math.PI);
      ctx.fillStyle="#fff";
      ctx.fill()
      ctx.stroke();





    },
    watch: {

    }
  }

</script>
