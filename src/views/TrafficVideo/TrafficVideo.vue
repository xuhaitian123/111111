<template>
  <div>
    <Area></Area>
    <div class="trafficVideo-container-header">

    </div>
    <div class="trafficVideo-container">

      <div class="trafficVideo-container-left">
        <div class="trafficVideo" id="trafficVideo">
          <!--<img class="show"  v-bind:src="videoUrl"/>-->
          <!--<div>-->
          <!--<img v-bind:class='{"show": (currentIndex == 0)}'  v-bind:src="videoUrl0"/>-->
          <!--<img v-bind:class='{"show": (currentIndex == 1)}'   v-bind:src="videoUrl1"/>-->
          <!--<img v-bind:class='{"show": (currentIndex == 2)}'   v-bind:src="videoUrl2"/>-->
          <!--<img v-bind:class='{"show": (currentIndex == 3)}'  v-bind:src="videoUrl3"/>-->
          <!--<img v-bind:class='{"show": (currentIndex == 4)}'   v-bind:src="videoUrl4"/>  -->
          <!--</div>-->



          <!--<img v-if="showCar" v-bind:src="carUrl"/>-->
          <!--<img v-if="showBigCar" v-bind:src="bigCarUrl"/>-->
          <!--<img v-if="showPeople" v-bind:src="peopleUrl"/>-->
        </div>
        <div class="trafficVideo" id="trafficVideo1">

        </div>
      </div>
      <div class="trafficVideo-container-right">
        <div>
          <div class="trafficVideo-right-top">

          </div>

        </div>
        <div class="trafficVideo-right-bottom">
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
    <!--<TimeLine></TimeLine>-->
  </div>

</template>

<script>
  import TimeLine from '../../components/TimeLine/TimeLine'
  import Area from '../../components/Area/Area'

  export default {
    data() {
      return {
        timer:"",
        imageList: {},
        currentIndex: 0,
        delay: 10000,
        delay_show: 5000,
        prevloading: 3000
      }
    },
    components: {
      TimeLine,
      Area,
    },
    mounted() {

      this.init()
    },
    beforeDestroy(){
      clearInterval(this.timer)
    },
    methods: {
      init() {
        let i = 0;
        var j = 0;
        this.timer  = setInterval(() => {
          i++;
          j++
          // if(j>100) return
          if (i % 10 === 0 ) {
            this.loadImage();
            i = 0;
          }
          this.showImage()
        }, 100)
      },
      showImage(type) {
        let currentTime = new Date();
        let millSecond = currentTime.getMilliseconds();
        currentTime.setMilliseconds(0);
        let startTime = currentTime.getTime() - this.delay_show;

        var prevloadingTime = startTime+ this.prevloading;


        for(var i = startTime; startTime<prevloadingTime)



          if (!this.imageList[startTime]||
            !this.imageList[startTime].isLoading ||
            !this.imageList[nextTime]||
            !this.imageList[nextTime].isLoading ||
            !this.imageList[nextTime2]||
            !this.imageList[nextTime2].isLoading) {
            return  console.log('================loading================')
          }

        if(this.imageList[startTime] && this.imageList[startTime].index !=0){
          for(var time in this.imageList){
            if(time< startTime){
              delete  this.imageList[time]
            }
          }
          $('#'+startTime+"_car").nextAll().remove();
          $('#'+startTime+"_origin").nextAll().remove()
        }

        if(window.current != startTime){

          if(!window.current){
            let fristImages = this.imageList[startTime].imageList;
            var string = "<div id='"+ startTime+"_origin'>"
            fristImages.forEach((image)=>{
              string += "<img src='"+  image.url  +"'>"
            });
            string += "</div>";
            $('#trafficVideo').prepend(string)

            let nextImages = this.imageList[nextTime].imageList;
            string = "<div id='"+ nextTime+"_origin'>"
            nextImages.forEach((image)=>{
              string += "<img src='"+  image.url  +"'>"
            });
            string += "</div>";
            $('#trafficVideo').prepend(string);
          }

          var nextTImages = this.imageList[nextTime2].imageList;
          var string = "<div id='"+ nextTime2+"_origin'>"
          nextTImages.forEach((image)=>{
            string += "<img src='"+  image.url+"'>"
          });
          string += "</div>";
          $('#trafficVideo').prepend(string);
          window.current = startTime;
        }







        let images = this.imageList[startTime].imageList;
        let index = this.imageList[startTime].index;
        if(!images[index]) return
        if(images[index].timestamp%1000 > millSecond) return


        if (this.imageList[startTime].isLoading && index < images.length) {
          // console.log('show')
          $('#'+startTime+"_origin img").eq(index).addClass('show')
          $('#'+startTime+"_car img").eq(index).addClass('show').prevAll().removeClass('show')
          if(index+1 == images.length) return
          this.imageList[startTime].index += 1
        }
















      },

      loadImage() {
        let currentTime = new Date();
        currentTime.setMilliseconds(0);
        var endTime = currentTime.getTime() - this.delay;
        var startTime = endTime - 1000;
        this.imageList[startTime] = {isLoading: 0, imageList: [], index: 0};
        // console.log('http://47.97.165.170:6001/frames?' + 'task_id=04461d423ded11e8b051d094663aac3d&start=' + startTime + '&end=' + endTime)
        this.$http.get('http://localhost:3000/video/videoImage?task_id=04461d423ded11e8b051d094663aac3d&start=' + startTime + '&end=' + endTime).then(
          (images) => {
            if(images.data.length ===0) return console.log('http://47.97.165.170:6001/frames?task_id=04461d423ded11e8b051d094663aac3d&start=' + startTime + '&end=' + endTime)
            images = images.data.map(item => {
              item.url = item.url.replace('192.168.8.131:8002', '47.97.165.170:6003');
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
            let allPromise1 = images.map((item) => {
              new Promise(function (resolve) {
                let imgObj = new Image(); // 创建图片对象
                imgObj.src = item.url.replace('img/', 'mask/').replace('jpg', 'png');

                imgObj.addEventListener('load', function () { // 这里没有考虑error，实际上要考虑
                  resolve()
                }, false);
              })
            })

            Promise.all([Promise.all(allPromise)]).then(() => {
              this.imageList[startTime] = {isLoading: 1, imageList: images, index: 0}
            })
          })
      }
    }
  }

</script>

<style>
  .trafficVideo-container {
    height: 500px;
    width: 100%;
    padding: 20px;
    display: flex;


  }

  .trafficVideo-container-header {
    width: 100%;
    height: 30px;
  }

  .trafficVideo-container-left {
    width: 1080px;
    height: 715px;
    position: relative;
  }

  .trafficVideo-container-right {
    flex-grow: 1;
    height: 700px;
    padding: 0 20px;
  }

  .trafficVideo {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .trafficVideo img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
  .trafficVideo img.show {
    width: 100%;
    height: 100%;
    opacity: 1;
  }



  .trafficVideo-right-top {
    height: 200px;
    background: black;
    margin-bottom: 20px;
  }

  .trafficVideo-right-bottom {
    height: 200px;
    background: black;
  }



</style>
