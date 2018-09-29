<template>
  <div class="main-container">
    <div class="container">
      <div class="map-contaienr">
        <div class="comment button-1" v-on:click="test1">中国 江苏省</div>
        <!--<button class="button-1" v-on:click="test1"></button>-->
        <img class="one" src="../../../static/image/login/0919-47.png"/>
      </div>
      <div class="map-contaienr1">
        <div class="comment button-2" v-on:click="test2">江苏省 淮安市</div>
        <!--<button class="button-2" v-on:click="test2"></button>-->
        <img class="two" src="../../../static/image/login/0919-48.png"/>
      </div>
      <div class="map-contaienr2">
        <div class="comment button-3" v-on:click="enter">淮安市 淮安区</div>
        <!--<button class="button-3" v-on:click="enter"></button>-->
        <img class="three" src="../../../static/image/login/0919-49.png"/>
      </div>
    </div>
    <div class="map-area-container">
      <div class="map-area-container-header">
        <div class="map-area-container-header-action" v-on:click="back">
          <img src="/static/map/left.png"/>
        </div>
        <div class="map-area-container-header-title">
          <div class="Country">{{country}}</div>
          <img class="image_next" src="/static/map/right.png">
          <div class="province">{{province}}</div>
          <img class="image_next" src="/static/map/right.png">
          <div class="city">{{city}}</div>
          <img class="image_next_county" src="/static/map/right.png">
          <div class="county">{{county}}</div>
        </div>
      </div>
      <div class="map-area-container-main">
        <div class="lift">
          <div class="people-squre">
            <div class="people_countent">总人口</div>
            <div class="people-data"><span class="count-size">{{showInfo.city_population}}</span><span
              class="unit">人</span></div>
          </div>
          <div class="data">
            <div class="squre">总面积</div>
            <div class="squre-data"><span class="squre-size">{{showInfo.city_size}}</span><span class="unit">万平方千米</span>
            </div>
          </div>
        </div>
        <div class="countent">
          <div class="count">
            <div class="car-count">汽车保有量</div>
            <div class="car-data"><span class="count-size">{{showInfo.vehicle_par}}</span><span class="unit">万辆</span>
            </div>
          </div>
          <div class="monitor">
            <div class="monitor-count">监控数量</div>
            <div class=" monitor-data"><span class="count-size">{{showInfo.camera_num}}</span><span
              class="unit">个</span></div>
          </div>
        </div>
        <div class="license-score">
          <div class="license">
            <div class="license-number">车牌代码</div>
            <div class="license-data count-size">{{showInfo.licence_plate}}</div>
          </div>
          <div class="score">
            <div class="all-score">总体评分</div>
            <div class="score-data"><span class="score-size">{{showInfo.cur_all_crowded_grade}}</span><span
              class="unit">分</span></div>
          </div>
        </div>
      </div>
    </div>
    <div class="toMianPage_bag">
      <img class="toMianPage" src="../../../static/image/map/toMianPage.png" v-on:click="enter"/>
    </div>
  </div>

</template>
<style scoped>


  .comment {
    width: 220px;
    height: 70px;
    background-color: #e07819;
    border-bottom-color: #e07819;
    /*为了给after伪元素自动继承*/
    color: #fff;
    font-size: 20px;
    padding: 20px 0;
    box-shadow: 5px 5px 5px #1c1f24;
    text-align: center;
    box-sizing: border-box;
    position: relative;
    word-break: break-all;
    z-index: 100;
  }

  .comment:after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -7px;
    width: 15px;
    height: 15px;
    background: inherit;
    /*自动继承父元素的背景*/
    transform: rotate(45deg);
  }

  .button-1 {
    /*width: 115px;*/
    /*height: 108px;*/
    position: absolute;
    left: 1090px;
    top: 460px;
    /*z-index: 200;*/
    /*opacity: 0;*/
  }

  .button-2 {
    /*width: 195px;*/
    /*height: 60px;*/
    position: absolute;
    left: 989px;
    top: 228px;
    /*z-index: 200;*/
    /*opacity: 0;*/
  }

  .button-3 {
    /*width: 195px;*/
    /*height: 60px;*/
    position: absolute;
    left: 1142px;
    top: 260px;
    /*z-index: 200;*/
    /*opacity: 0;*/
  }

  .main-container {
    height: 100%;
    width: 100%;
    overflow: hidden;
    background: black;
    position: relative;
  }

  .map-area-container {
    position: absolute;
    width: 340px;
    height: 320px;
    left: 30px;
    top: 30px;
    background: rgb(56, 58, 71);
    display: none;
  }

  .toMianPage_bag {
    position: absolute;
    width: 340px;
    height: 60px;
    left: 30px;
    top: 360px;
    display: none;
  }

  .map-area-container-header {
    height: 40px;
    background: rgb(39, 39, 53);
    display: flex;
    align-items: center;
    padding-left: 14px;
  }

  .map-area-container-header-action img {
    width: 22px;
    height: 14px;
  }

  .map-area-container-header-title {
    display: flex;
    align-items: center;
    padding-left: 12px;
    line-height: 14px;
  }

  .image_next {
    width: 14px;
    height: 16px;
  }

  .image_next_county {
    width: 14px;
    height: 16px;
    display: none;
  }

  .container {
    margin: auto;
  }

  .map-contaienr {
  }

  .container {
    height: 100%;
    width: 100%;
    overflow: hidden;
    position: relative;
    background: rgb(53, 54, 68);
  }

  .map-contaienr {
    height: 100%;
    width: 100%;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    /*opacity: 0;*/
  }

  .map-contaienr1 {
    height: 100%;
    width: 100%;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
  }

  .map-contaienr2 {
    height: 100%;
    width: 100%;
    overflow: hidden;
    position: absolute;
    opacity: 0;
    top: 0;
    left: 0;

  }

  .one {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }

  .two {
    width: 100%;
    position: absolute;

    /*display: none;*/
  }

  .three {
    width: 100%;
    position: absolute;
    /*display: none;*/
  }

  .Country {
    width: 40px;
    padding-left: 12px;
    border-left: 1px solid #94949a;
    line-height: 15px;
  }

  .province {
    padding: 0 10px;
    line-height: 15px;

  }

  .city {
    padding: 0 10px;
    line-height: 15px;
  }

  .county {
    padding: 0 10px;
    line-height: 15px;
    display: none;
  }

  /*.next,*/
  /*.pre,*/
  /*.current{*/
  /*position: absolute;*/
  /*left: 0;*/
  /*top: 0;*/
  /*}*/
  /*.next,*/
  /*.pre{*/
  /*width: 0;*/
  /*opacity: 0;*/
  /*}*/
  .current {
    width: 100%;
    opacity: 1;
  }

  .map-area-container-main {
    padding: 16px 20px 20px 20px;
    height: 244px;
  }

  .lift {
    border-bottom: 1px solid #94949a;
    height: 74px;
    display: flex;
    flex-direction: row;
  }

  .countent {
    border-bottom: 1px solid #94949a;
    height: 90px;
    display: flex;
    flex-direction: row;
  }

  .license-score {
    height: 70px;
    display: flex;
    flex-direction: row;
  }

  .people-squre {
    width: 150px;
  }

  .count {
    width: 150px;
  }

  .license {
    width: 150px;
  }

  .count-size,
  .squre-size {
    font-size: 22px;
    color: #f98c21;
    display: block;
  }

  .score-size {
    font-size: 22px;
    color: green;
    display: block;
  }

  .people-data,
  .squre-data,
  .car-data,
  .monitor-data,
  .license-data,
  .score-data {
    margin-top: 20px;
    height: 22px;
    display: flex;
    align-items: center;
  }

  .car-count,
  .license,
  .monitor,
  .score {
    margin-top: 16px;
  }

  .unit {
    margin-left: 5px;
    display: block;
  }

  .toMianPage {
    height: 60px;
    width: 340px;
  }
</style>
<script>

  export default {
    components: {},
    data() {
      return {
        marginTop: 0,
        country: "中国",
        province: "江苏省",
        city: "淮安市",
        county: "淮安区",
        showInfo: {},
        height: document.getElementById('app').style.height - 60,
        map_info: [{
          "node_num": '-',
          "camera_num": '-',
          "cur_all_crowded_grade": '-',
          "city_population": '-',
          "city_size": '-',
          "vehicle_par": '-',
          "area_total_mileage": '-',
          "licence_plate": "-"
        }, {
          "node_num": '-',
          "camera_num": '-',
          "cur_all_crowded_grade": '-',
          "city_population": '-',
          "city_size": '-',
          "vehicle_par": '-',
          "area_total_mileage": '-',
          "licence_plate": "-"
        }]
      }
    },
    beforeMount() {
      this.$http.get('/dataB/getDataB?token=' + this.getHeader().token)
        .then((data) => {
          this.map_info = data.data
        })
        .catch(function (data) {
          console.log(data);
        });
    },
    methods: {
      county_map_info_handler() {
        // var self = this
        return this.showInfo = this.map_info[1]
        // return county
      },
      city_map_info_handler() {
        return this.showInfo = this.map_info[0]
        // return city
      },

      back() {
        if ($(".county").is(':hidden')) {
          this.test4()
        } else {
          this.test3()
        }
      },
      test1() {
        var self = this
        $('.map-contaienr').animate({
          width: '500%',
          height: '500%',
          left: '-340%',
          'top': '-240%',
          opacity: '0.4'
        }, 500, () => {
          $('.map-contaienr').animate({opacity: '0'}, 500, function () {
            $(".map-area-container").show()
            self.city_map_info_handler()
            $('.map-contaienr').animate({width: '100%', height: '100%', left: '0', 'top': '0'})
          })
          $('.map-contaienr1').animate({opacity: '1'}, 500)
          // this.test2()
        })
      },
      test2() {
        var self = this
        $('.map-contaienr1').animate({
          width: '200%',
          height: '200%',
          left: '-50%',
          'top': '-50%',
          opacity: '0.4'
        }, 500, () => {
          $('.map-contaienr1').animate({opacity: '0'}, 300, function () {
            $(".map-area-container,.image_next_county,.county,.toMianPage_bag").show()
            self.county_map_info_handler()
            $('.map-contaienr1').animate({width: '100%', height: '100%', left: '0', 'top': '0'})
          })
          $('.map-contaienr2').animate({opacity: '1'}, 1000)
          // setTimeout(this.test3 ,2000)
        })
      },

      test3() {
        var self = this
        $('.map-contaienr2').animate({
          width: '50%',
          height: '50%',
          left: '25%',
          'top': '25%',
          opacity: '0.4'
        }, 500, () => {
          $('.map-contaienr2').animate({opacity: '0'}, 500, function () {
            $(".map-area-container").show()
            $(".county,.image_next_county,.toMianPage_bag").hide()
            self.city_map_info_handler()
            $('.map-contaienr2').animate({width: '100%', height: '100%', left: '0', 'top': '0'})
          })
          $('.map-contaienr1').animate({opacity: '1'}, 500)
          // this.test2()
        })
      },
      test4() {
        $('.map-contaienr1').animate({
          width: '20%',
          height: '20%',
          left: '68%',
          'top': '52%',
          opacity: '0.4'
        }, 500, () => {
          $('.map-contaienr1').animate({opacity: '0'}, 500, function () {
            $(".map-area-container,toMianPage_bag").hide()
            $('.map-contaienr1').animate({width: '100%', height: '100%', left: '0', 'top': '0'})
          })
          $('.map-contaienr').animate({opacity: '1'}, 500)
          // this.test2()
        })
      },
      home() {
        $('.map-contaienr2').animate({
          width: '10%',
          height: '10%',
          left: '73%',
          'top': '58%',
          opacity: '0.4'
        }, 500, () => {
          $('.map-contaienr2').animate({opacity: '0'}, 500, function () {
            $(".map-area-container").hide()
            $('.map-contaienr2').animate({width: '100%', height: '100%', left: '0', 'top': '0'})
          })
          $('.map-contaienr').animate({opacity: '1'}, 500)
          // this.test2()
        })
      },
      enter() {
        this.$router.push('/main/dashboard')
      }

    },
    mounted() {

      // setTimeout(this.test1, 3000)
      // setTimeout(this.test2, 6000)
    }
  }
</script>
