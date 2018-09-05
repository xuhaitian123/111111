<template>
  <div>
    <Area></Area>
    <div class="video-container-header">

    </div>
    <div class="video-container">

      <div class="video-container-left">
        <div class="video">
          <img v-bind:src="videoUrl"/>
          <img v-if="showCar" v-bind:src="carUrl"/>
          <img v-if="showBigCar" v-bind:src="bigCarUrl"/>
          <img  v-if="showPeople" v-bind:src="peopleUrl"/>
        </div>

      </div>
      <div class="video-container-right">
        <div>
          <div class="video-right-top">

          </div>

        </div>
        <div class="video-right-bottom">
          <el-switch
            v-model="showCar"
            active-text="shi"
            inactive-text="fou">
          </el-switch>
          <el-switch
            v-model="showBigCar"
            active-text="shi"
            inactive-text="fou">
          </el-switch>
          <el-switch
            v-model="showPeople"
            active-text="shi"
            inactive-text="fou">
          </el-switch>

        </div>
      </div>
    </div>
    <TimeLine ></TimeLine>
  </div>

</template>

<script>
  import TimeLine from '../../components/TimeLine/TimeLine'
  import Area from '../../components/Area/Area'

  export default {
    data() {
      return {
        showCar: true,
        showBigCar: true,
        showPeople: true,
        videoUrl:'',
        carUrl:'',
        bigCarUrl:'',
        peopleUrl:''
      }
    },
    components: {
      TimeLine,
      Area,
    },
    mounted(){
      this.init()
    },
    methods: {
      init(){

          var endTime = new Date().getTime()
          var startTime = endTime - 5000

          this.$http.get('http://47.97.165.170:6001/frames?task_id=20a545e03dec11e8b051d094663aac3d&start='+startTime+ '&end='+ endTime).then(
            (images)=>{
              images = images.map(item => {
                item.url = item.url.replace('192.168.8.131:8002', '47.97.165.170:6003')
                return item
              })



              let allPromise = images.map((item) => {
                new Promise(function (resolve) {
                  let imgObj = new Image(); // 创建图片对象
                  imgObj.src = item.url;

                  imgObj.addEventListener('load', function () { // 这里没有考虑error，实际上要考虑
                    resolve()
                  }, false);
                })
              })
              Promise.all(allPromise).then(() => {
                console.log('start')
                var i = 0;
                let timer = setInterval(() => {
                  i++
                  if (images.length < i) clearInterval(timer)
                  this.videoUrl = images[i].url
                  this.carUrl = images[i].url.replace('img/', 'mask/').replace('jpg', 'png')
                  this.bigCarUrl = images[i].url.replace('img/', 'mask2/').replace('jpg', 'png')
                  this.peopleUrl= images[i].url.replace('img/', 'mask3/').replace('jpg', 'png')
                }, 100)
              })

            }
          )

          // var images = [{
          //   "url": "http://192.168.8.131:8002/images/1535021400/04461d423ded11e8b051d094663aac3d/img/1535021418910_3120.jpg",
          //   "timestamp": 1535021418910
          // },
          //   {
          //   "url": "http://192.168.8.131:8002/images/1535021400/04461d423ded11e8b051d094663aac3d/img/1535021418957_3121.jpg",
          //   "timestamp": 1535021418957
          // },
          //   {
          //   "url": "http://192.168.8.131:8002/images/1535021400/04461d423ded11e8b051d094663aac3d/img/1535021419004_3122.jpg",
          //   "timestamp": 1535021419004
          // },
          //   {
          //   "url": "http://192.168.8.131:8002/images/1535021400/04461d423ded11e8b051d094663aac3d/img/1535021419055_3123.jpg",
          //   "timestamp": 1535021419055
          // },
          //   {
          //   "url": "http://192.168.8.131:8002/images/1535021400/04461d423ded11e8b051d094663aac3d/img/1535021419235_3124.jpg",
          //   "timestamp": 1535021419235
          // }, {
          //   "url": "http://192.168.8.131:8002/images/1535021400/04461d423ded11e8b051d094663aac3d/img/1535021419431_3125.jpg",
          //   "timestamp": 1535021419431
          // }, {
          //   "url": "http://192.168.8.131:8002/images/1535021400/04461d423ded11e8b051d094663aac3d/img/1535021419631_3126.jpg",
          //   "timestamp": 1535021419631
          // }, {
          //   "url": "http://192.168.8.131:8002/images/1535021400/04461d423ded11e8b051d094663aac3d/img/1535021419827_3127.jpg",
          //   "timestamp": 1535021419827
          // }, {
          //   "url": "http://192.168.8.131:8002/images/1535021400/04461d423ded11e8b051d094663aac3d/img/1535021420025_3128.jpg",
          //   "timestamp": 1535021420025
          // }, {
          //   "url": "http://192.168.8.131:8002/images/1535021400/04461d423ded11e8b051d094663aac3d/img/1535021420226_3129.jpg",
          //   "timestamp": 1535021420226
          // }, {
          //   "url": "http://192.168.8.131:8002/images/1535021400/04461d423ded11e8b051d094663aac3d/img/1535021420441_3130.jpg",
          //   "timestamp": 1535021420441
          // }, {
          //   "url": "http://192.168.8.131:8002/images/1535021400/04461d423ded11e8b051d094663aac3d/img/1535021420631_3131.jpg",
          //   "timestamp": 1535021420631
          // }, {
          //   "url": "http://192.168.8.131:8002/images/1535021400/04461d423ded11e8b051d094663aac3d/img/1535021420825_3132.jpg",
          //   "timestamp": 1535021420825
          // }, {
          //   "url": "http://192.168.8.131:8002/images/1535021400/04461d423ded11e8b051d094663aac3d/img/1535021421028_3133.jpg",
          //   "timestamp": 1535021421028
          // }, {
          //   "url": "http://192.168.8.131:8002/images/1535021400/04461d423ded11e8b051d094663aac3d/img/1535021421226_3134.jpg",
          //   "timestamp": 1535021421226
          // }, {
          //   "url": "http://192.168.8.131:8002/images/1535021400/04461d423ded11e8b051d094663aac3d/img/1535021421433_3135.jpg",
          //   "timestamp": 1535021421433
          // }, {
          //   "url": "http://192.168.8.131:8002/images/1535021400/04461d423ded11e8b051d094663aac3d/img/1535021421626_3136.jpg",
          //   "timestamp": 1535021421626
          // }, {
          //   "url": "http://192.168.8.131:8002/images/1535021400/04461d423ded11e8b051d094663aac3d/img/1535021421825_3137.jpg",
          //   "timestamp": 1535021421825
          // }, {
          //   "url": "http://192.168.8.131:8002/images/1535021400/04461d423ded11e8b051d094663aac3d/img/1535021422027_3138.jpg",
          //   "timestamp": 1535021422027
          // }, {
          //   "url": "http://192.168.8.131:8002/images/1535021400/04461d423ded11e8b051d094663aac3d/img/1535021422227_3139.jpg",
          //   "timestamp": 1535021422227
          // }, {
          //   "url": "http://192.168.8.131:8002/images/1535021400/04461d423ded11e8b051d094663aac3d/img/1535021422445_3140.jpg",
          //   "timestamp": 1535021422445
          // }, {
          //   "url": "http://192.168.8.131:8002/images/1535021400/04461d423ded11e8b051d094663aac3d/img/1535021422630_3141.jpg",
          //   "timestamp": 1535021422630
          // }, {
          //   "url": "http://192.168.8.131:8002/images/1535021400/04461d423ded11e8b051d094663aac3d/img/1535021422830_3142.jpg",
          //   "timestamp": 1535021422830
          // }, {
          //   "url": "http://192.168.8.131:8002/images/1535021400/04461d423ded11e8b051d094663aac3d/img/1535021423027_3143.jpg",
          //   "timestamp": 1535021423027
          // }, {
          //   "url": "http://192.168.8.131:8002/images/1535021400/04461d423ded11e8b051d094663aac3d/img/1535021423230_3144.jpg",
          //   "timestamp": 1535021423230
          // }, {
          //   "url": "http://192.168.8.131:8002/images/1535021400/04461d423ded11e8b051d094663aac3d/img/1535021423426_3145.jpg",
          //   "timestamp": 1535021423426
          // }, {
          //   "url": "http://192.168.8.131:8002/images/1535021400/04461d423ded11e8b051d094663aac3d/img/1535021423623_3146.jpg",
          //   "timestamp": 1535021423623
          // }, {
          //   "url": "http://192.168.8.131:8002/images/1535021400/04461d423ded11e8b051d094663aac3d/img/1535021423823_3147.jpg",
          //   "timestamp": 1535021423823
          // }, {
          //   "url": "http://192.168.8.131:8002/images/1535021400/04461d423ded11e8b051d094663aac3d/img/1535021424024_3148.jpg",
          //   "timestamp": 1535021424024
          // }, {
          //   "url": "http://192.168.8.131:8002/images/1535021400/04461d423ded11e8b051d094663aac3d/img/1535021424223_3149.jpg",
          //   "timestamp": 1535021424223
          // }, {
          //   "url": "http://192.168.8.131:8002/images/1535021400/04461d423ded11e8b051d094663aac3d/img/1535021424457_3150.jpg",
          //   "timestamp": 1535021424457
          // }, {
          //   "url": "http://192.168.8.131:8002/images/1535021400/04461d423ded11e8b051d094663aac3d/img/1535021424627_3151.jpg",
          //   "timestamp": 1535021424627
          // }, {
          //   "url": "http://192.168.8.131:8002/images/1535021400/04461d423ded11e8b051d094663aac3d/img/1535021424823_3152.jpg",
          //   "timestamp": 1535021424823
          // }, {
          //   "url": "http://192.168.8.131:8002/images/1535021400/04461d423ded11e8b051d094663aac3d/img/1535021425017_3153.jpg",
          //   "timestamp": 1535021425017
          // }, {
          //   "url": "http://192.168.8.131:8002/images/1535021400/04461d423ded11e8b051d094663aac3d/img/1535021425227_3154.jpg",
          //   "timestamp": 1535021425227
          // }, {
          //   "url": "http://192.168.8.131:8002/images/1535021400/04461d423ded11e8b051d094663aac3d/img/1535021425425_3155.jpg",
          //   "timestamp": 1535021425425
          // }, {
          //   "url": "http://192.168.8.131:8002/images/1535021400/04461d423ded11e8b051d094663aac3d/img/1535021425626_3156.jpg",
          //   "timestamp": 1535021425626
          // }, {
          //   "url": "http://192.168.8.131:8002/images/1535021400/04461d423ded11e8b051d094663aac3d/img/1535021425820_3157.jpg",
          //   "timestamp": 1535021425820
          // }, {
          //   "url": "http://192.168.8.131:8002/images/1535021400/04461d423ded11e8b051d094663aac3d/img/1535021426025_3158.jpg",
          //   "timestamp": 1535021426025
          // }, {
          //   "url": "http://192.168.8.131:8002/images/1535021400/04461d423ded11e8b051d094663aac3d/img/1535021426233_3159.jpg",
          //   "timestamp": 1535021426233
          // }, {
          //   "url": "http://192.168.8.131:8002/images/1535021400/04461d423ded11e8b051d094663aac3d/img/1535021426451_3160.jpg",
          //   "timestamp": 1535021426451
          // }, {
          //   "url": "http://192.168.8.131:8002/images/1535021400/04461d423ded11e8b051d094663aac3d/img/1535021426625_3161.jpg",
          //   "timestamp": 1535021426625
          // }, {
          //   "url": "http://192.168.8.131:8002/images/1535021400/04461d423ded11e8b051d094663aac3d/img/1535021426833_3162.jpg",
          //   "timestamp": 1535021426833
          // }, {
          //   "url": "http://192.168.8.131:8002/images/1535021400/04461d423ded11e8b051d094663aac3d/img/1535021427026_3163.jpg",
          //   "timestamp": 1535021427026
          // }, {
          //   "url": "http://192.168.8.131:8002/images/1535021400/04461d423ded11e8b051d094663aac3d/img/1535021427223_3164.jpg",
          //   "timestamp": 1535021427223
          // }, {
          //   "url": "http://192.168.8.131:8002/images/1535021400/04461d423ded11e8b051d094663aac3d/img/1535021427430_3165.jpg",
          //   "timestamp": 1535021427430
          // }, {
          //   "url": "http://192.168.8.131:8002/images/1535021400/04461d423ded11e8b051d094663aac3d/img/1535021427631_3166.jpg",
          //   "timestamp": 1535021427631
          // }, {
          //   "url": "http://192.168.8.131:8002/images/1535021400/04461d423ded11e8b051d094663aac3d/img/1535021427827_3167.jpg",
          //   "timestamp": 1535021427827
          // }, {
          //   "url": "http://192.168.8.131:8002/images/1535021400/04461d423ded11e8b051d094663aac3d/img/1535021428027_3168.jpg",
          //   "timestamp": 1535021428027
          // }, {
          //   "url": "http://192.168.8.131:8002/images/1535021400/04461d423ded11e8b051d094663aac3d/img/1535021428217_3169.jpg",
          //   "timestamp": 1535021428217
          // }, {
          //   "url": "http://192.168.8.131:8002/images/1535021400/04461d423ded11e8b051d094663aac3d/img/1535021428448_3170.jpg",
          //   "timestamp": 1535021428448
          // }, {
          //   "url": "http://192.168.8.131:8002/images/1535021400/04461d423ded11e8b051d094663aac3d/img/1535021428635_3171.jpg",
          //   "timestamp": 1535021428635
          // }, {
          //   "url": "http://192.168.8.131:8002/images/1535021400/04461d423ded11e8b051d094663aac3d/img/1535021428829_3172.jpg",
          //   "timestamp": 1535021428829
          // }]

      }
    }
  }

</script>

<style>
  .video-container {
    height: 500px;
    width: 100%;
    padding: 20px;
    display: flex;

  }
  .video-container-header{
    width: 100%;
    height: 30px;
  }
  .video-container-left{
    width: 800px;
    height: 700px;
  }
  .video-container-right{
    flex-grow: 1;
    height: 700px;
    padding: 0  20px;
  }
  .video{
    position: relative;
  }
  .video-right-top{
    height: 200px;
    background: black;
    margin-bottom: 20px;
  }
  .video-right-bottom{
    height: 200px;
    background: black;
  }
  .video img{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }

</style>
