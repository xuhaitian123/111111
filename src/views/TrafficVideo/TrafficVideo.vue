<template>
  <div>
    <Area></Area>
    <div class="trafficVideo-container-header">

    </div>
    <div class="trafficVideo-container" >
      <div class="trafficVideo-container-left"  v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.8)">
        <div class="trafficVideo-video-header">
          <div class="trafficVideo-video-header-left font16">人民路-南京路监控视频</div>
          <div class="trafficVideo-video-header-right">
            本区域所有监控视频路口

          </div>

        </div>
        <div class="trafficVideo" id="trafficVideo_origin">
        </div>
        <div class="trafficVideo" id="trafficVideo_car">
        </div>
        <div class="trafficVideo" id="trafficVideo_bus">
        </div>
        <div class="trafficVideo" id="trafficVideo_bike">
        </div>
      </div>
      <div class="trafficVideo-container-right">

        <div class="trafficVideo-right-top">
          <div class="trafficVideo-video-header">
            <div class="trafficVideo-video-header-left">各方向监控视频选择</div>
          </div>
          <div class="trafficVideo-select-node-contaienr">
            <div class="trafficVideo-select-node-top">

              <div>

                <div class="trafficVideo-select-node-action action">N</div>
                南京路
              </div>

            </div>
            <div class="trafficVideo-select-node-middle">
              <div class="trafficVideo-select-node-left">
                <div>
                  南京路
                  <div class="trafficVideo-select-node-action">W</div>
                </div>
              </div>

              <div class="trafficVideo-select-node-center">

              </div>
              <div class="trafficVideo-select-node-right">
                <div>
                  南京路
                  <div class="trafficVideo-select-node-action">E</div>
                </div>
              </div>

            </div>
            <div class="trafficVideo-select-node-bottom">
              <div>
                南京路
                <div class="trafficVideo-select-node-action">S</div>
              </div>
            </div>




          </div>

        </div>


        <div class="trafficVideo-right-bottom">
          <div class="trafficVideo-video-header">
            <div class="trafficVideo-video-header-left">人民路* 南京路南进道口</div>
          </div>

          <div class="trafficVideo-table">
            <div class="trafficVideo-title">
            </div>

            <div class="trafficVideo-row">
              <div class="trafficVideo-li">计数车型</div>
              <div class="trafficVideo-li">左转</div>
              <div class="trafficVideo-li">直行</div>
              <div class="trafficVideo-li">右转</div>
            </div>
            <div class="trafficVideo-row">
              <div class="trafficVideo-li">
                机动车
              <img  @click="countNumber('car')" v-if="numberOfCarModal.numberOfModal.car.status" class="trafficVideo-action-img" src="/static/image/trafficVideo/25.png">
                <img @click="countNumber('car')" v-if="!numberOfCarModal.numberOfModal.car.status" class="trafficVideo-action-img" src="/static/image/trafficVideo/26.png">
              </div>
              <div class="trafficVideo-li">{{numberOfCarModal.numberOfModal.car.status ? numberOfCarModal.numberOfModal.car.left: '-'}}</div>
              <div class="trafficVideo-li">{{numberOfCarModal.numberOfModal.car.status ? numberOfCarModal.numberOfModal.car.straight: '-'}}</div>
              <div class="trafficVideo-li">{{numberOfCarModal.numberOfModal.car.status ? numberOfCarModal.numberOfModal.car.right: '-'}}</div>

            </div>
            <div class="trafficVideo-row">
              <div class="trafficVideo-li">
                非机动车
                <img  @click="countNumber('bus')" v-if="numberOfCarModal.numberOfModal.bus.status" class="trafficVideo-action-img" src="/static/image/trafficVideo/25.png">
                <img @click="countNumber('bus')" v-if="!numberOfCarModal.numberOfModal.bus.status" class="trafficVideo-action-img" src="/static/image/trafficVideo/26.png">

              </div>
              <div class="trafficVideo-li">{{numberOfCarModal.numberOfModal.bus.status ? numberOfCarModal.numberOfModal.bus.left: '-'}}</div>
              <div class="trafficVideo-li">{{numberOfCarModal.numberOfModal.bus.status ? numberOfCarModal.numberOfModal.bus.straight: '-'}}</div>
              <div class="trafficVideo-li">{{numberOfCarModal.numberOfModal.bus.status ? numberOfCarModal.numberOfModal.bus.right: '-'}}</div>

            </div>
            <div class="trafficVideo-row">
              <div class="trafficVideo-li">
                行人
                <img  @click="countNumber('bike')" v-if="numberOfCarModal.numberOfModal.bike.status" class="trafficVideo-action-img" src="/static/image/trafficVideo/25.png">
                <img @click="countNumber('bike')" v-if="!numberOfCarModal.numberOfModal.bike.status" class="trafficVideo-action-img" src="/static/image/trafficVideo/26.png">

              </div>
              <div class="trafficVideo-li">{{numberOfCarModal.numberOfModal.bike.status ? numberOfCarModal.numberOfModal.bike.left: '-'}}</div>
              <div class="trafficVideo-li">{{numberOfCarModal.numberOfModal.bike.status ? numberOfCarModal.numberOfModal.bike.straight: '-'}}</div>
              <div class="trafficVideo-li">{{numberOfCarModal.numberOfModal.bike.status ? numberOfCarModal.numberOfModal.bike.right: '-'}}</div>

            </div>
            <div >
              <div class="trafficVideo-line-title">
                交叉口重型车比例
              </div>
              <div class="trafficVideo-line-container">
                <div class="trafficVideo-line">
                  <div class="trafficVideo-process" v-bind:style="{width : ratio +'%'}"></div>
                </div>
                <div class="trafficVideo-ratio">
                  {{ratio}}%
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
    <TimeLine @newTime="updataVideo"></TimeLine>
  </div>

</template>

<script>
  import TimeLine from '../../components/TimeLine/TimeLine'
  import Area from '../../components/Area/Area'

  export default {
    data() {
      return {
        timer: "",
        imageList: {},
        currentIndex: 0,
        delay: 10000,
        delay_show: 5000,
        prevloading: 3000,
        isShowCar: 0,
        isShowBus: 0,
        isShowBike: 0,
        loading: true,
        typeList: ['origin', 'car', 'bus', 'bike'],
        ratio: 10,
        // typeList: ['origin','car'],
        numberOfCarModal:{
          startTime: 0,
          numberOfModal:{
            car:{startTime:0,endTime:0, left:0,right:0, straight:0, status: 0 },
            bus:{startTime:0,endTime:0, left:0,right:0, straight:0, status: 0 },
            bike:{startTime:0,endTime:0, left:0,right:0, straight:0, status: 0 }
          },
          endTime: 0,
        },

        typeMap: {
          origin: null,
          car: 'mask',
          bus: 'mask2',
          bike: 'mask3'
        }
      }
    },
    components: {
      TimeLine,
      Area,
    },
    mounted() {
      this.getNodeLineLish(2)
      this.getlikeByNodeId()
      // this.init()

    },
    beforeDestroy() {
      clearInterval(this.timer)
    },
    methods: {
      updataVideo(time) {
        let i = 0;
        var j = 0;
        // this.timer = setInterval(() => {
        //   i++;
        //   j++


          let millSecond = time%1000;

          // currentTime.setMilliseconds(0);
          let startTime = time - this.delay_show;


          // if(j>100) return
          if (time % 1000 === 0) {
            console.log(new Date())
            // console.log(this.imageList)
            this.loadImage(startTime);

          }

          this.showImage(parseInt((startTime - 8000)/1000)*1000, millSecond)
        // }, 100)
      },
      showImage(startTime, millSecond) {
        var prevloadingTime = startTime + this.prevloading;
        for (var time = startTime; time < prevloadingTime; time += 1000) {
          if (!this.imageList[time] || !this.imageList[time].isLoading) {
            return this.loading = true
          }
        }
        // console.log('==hadloading')




        if (this.imageList[startTime] && this.imageList[startTime].index !== 0) {
          this.removeImage(startTime)
        }

        if (window.current !== startTime) {
          if (!window.current) {
            this.addImage(startTime);
            this.addImage(startTime + 1000)
          }
          this.addImage(startTime + 2000);
          window.current = startTime;
        }

        let images = this.imageList[startTime].imageList;
        let index = this.imageList[startTime].index;
        // console.log('============='+millSecond)
        if (!images[index]) return;

        if (images[index].timestamp % 1000 > millSecond) return;
        if (this.imageList[startTime].isLoading && index < images.length) {
          this.loading = false;
          this.changeImage(startTime, index);
          // console.log(images.length)
          if (index + 1 === images.length) return;
          this.imageList[startTime].index += 1
          // console.log(this.imageList[startTime])
        }
      },

      loadImage(endTime) {

        var startTime = endTime - 1000;

        this.imageList[startTime] = {isLoading: 0, imageList: [], index: 0};
        this.getCountOfNode(endTime).then((count)=>{
          this.$http.get('http://localhost:3000/video/videoImage?task_id=04461d423ded11e8b051d094663aac3d&start=' + startTime + '&end=' + endTime).then(
            (images) => {
              if (images.data.length === 0) return console.log('http://47.97.165.170:6001/frames?task_id=04461d423ded11e8b051d094663aac3d&start=' + startTime + '&end=' + endTime)
              images = images.data.map(item => {
                item.url = item.url.replace('192.168.8.131:8002', '47.97.165.170:6003');
                return item
              })

              let allPromise = images.map((item) => {
                return new Promise(function (resolve) {
                  let imgObj = new Image(); // 创建图片对象
                  imgObj.src = item.url;

                  imgObj.addEventListener('load', function () { // 这里没有考虑error，实际上要考虑
                    resolve(imgObj)
                  }, false);
                })
              })
              let allPromise1 = images.map((item) => {
                return new Promise(function (resolve) {
                  let imgObj = new Image(); // 创建图片对象
                  imgObj.src = item.url.replace('img/', 'mask/').replace('jpg', 'png');
                  imgObj.addEventListener('load', function () { // 这里没有考虑error，实际上要考虑
                    resolve(imgObj)
                  }, false);
                })
              })
              let allPromise2 = images.map((item) => {
                return new Promise(function (resolve) {
                  let imgObj = new Image(); // 创建图片对象
                  imgObj.src = item.url.replace('img/', 'mask2/').replace('jpg', 'png');
                  imgObj.addEventListener('load', function () { // 这里没有考虑error，实际上要考虑
                    resolve(imgObj)
                  }, false);
                })
              })
              let allPromise3 = images.map((item) => {
                return new Promise(function (resolve) {
                  let imgObj = new Image(); // 创建图片对象
                  imgObj.src = item.url.replace('img/', 'mask3/').replace('jpg', 'png');
                  imgObj.addEventListener('load', function () { // 这里没有考虑error，实际上要考虑
                    resolve(imgObj)
                  }, false);
                })
              })

              Promise.all([[Promise.all(allPromise)], [Promise.all(allPromise1)], [Promise.all(allPromise2)], [Promise.all(allPromise3)]]).then((image) => {
                this.imageList[startTime] = {
                  isLoading: 1,
                  imageList: images,
                  index: 0,
                  preImage: [image[0], image[1], image[2], image[3]],
                  count: count,
                }
              })
            })
        })

      },
      addImage(time) {
        this.typeList.forEach(type => {
          let fristImages = this.imageList[time].imageList;
          let string = "<div id='" + time + "_" + type + "'>";
          fristImages.forEach((image) => {
            let url = image.url;
            if (this.typeMap[type]) {
              url = url.replace('img/', '' + this.typeMap[type] + '/').replace('jpg', 'png')
              // console.log(url)
            }
            string += "<img src='" + url + "'>"
          });
          string += "</div>";
          // console.log('#trafficVideo_'+ this.typeMap[type])
          $('#trafficVideo_' + type).prepend(string)
        })
      },
      removeImage(prevTime) {
        for (let time in this.imageList) {
          if (time < prevTime) {
            delete  this.imageList[time]
          }
        }
        this.typeList.forEach(type => {
          $('#' + prevTime + "_" + type).nextAll().remove();
        });
      },
      changeImage(currentTime, index) {
        $('#' + currentTime + "_origin img").eq(index).addClass('show')
        if (this.numberOfCarModal.numberOfModal.car.status) {
          $('#' + currentTime + "_car img").eq(index).addClass('show').prevAll().removeClass('show')
        }
        if (this.numberOfCarModal.numberOfModal.bus.status) {
          $('#' + currentTime + "_bus img").eq(index).addClass('show').prevAll().removeClass('show')
        }
        if (this.numberOfCarModal.numberOfModal.bike.status) {
          $('#' + currentTime + "_bike img").eq(index).addClass('show').prevAll().removeClass('show')
        }
      },
      countNumber(type){
        this.numberOfCarModal.numberOfModal[type].status = !this.numberOfCarModal.numberOfModal[type].status
      },
      getCountOfNode(endTime){
        return new Promise(resolve => {
          var startTime = endTime - 1000;
          this.$http.get('http://localhost:3000/video/videoAnalysis?intersection_id=2&start=' + startTime + '&end=' + endTime).then((result)=>{
            resolve(result.data)
          })
        });
      },
      getNodeLineLish(nodeId){
        return new Promise(resolve => {
          this.$http.get('http://localhost:3000/nodeData/getCameraNode?nodeId='+nodeId).then((result)=>{
            resolve(result.data)
          })
        });
      },
      getlikeByNodeId(){
        return new Promise(resolve => {
          this.$http.get('http://localhost:3000/index/nodes').then((result)=>{
            resolve(result.data)
          })
        });
      }

    }
  }

</script>

<style>
  .trafficVideo-container {
    /*height: 500px;*/
    width: 100%;
    padding: 0 20px 20px 20px;
    display: flex;
    box-sizing: border-box;

  }

  .trafficVideo-container-header {
    /*width: 100%;*/
    height: 40px;
    margin: 10px 10px ;
    background: rgb(53,54,68);
  }

  .trafficVideo-container-left {
    width: 1080px;
    height: 715px;
    position: relative;
  }

  .trafficVideo-video-header {
    width: 100%;
    height: 30px;
    position: relative;
    left: 0;
    top: 0;
    z-index: 3000;
    background: rgb(31, 31, 44);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    box-sizing: border-box;
    color: #fff;

  }

  .trafficVideo-video-header-left {

  }

  .trafficVideo-container-right {
    flex-grow: 1;
    height: 712px;
    padding: 0 20px;
    box-sizing: border-box;
  }

  .trafficVideo {
    position: absolute;
    top: 30px;
    left: 0;
    width: 1080px;
    height: 682px;
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
    height: 420px;
    width: 530px;
    background: rgb(53, 54, 68);
    position: relative;
    /*margin-bottom: 20px;*/
  }

  .trafficVideo-right-bottom {
    position: relative;
    height: 290px;
    width: 530px;
    background: rgb(53, 54, 68);
    margin-top: 10px;
  }
  .trafficVideo-table{
    padding:  20px;
    box-sizing: border-box;

  }
  .trafficVideo-row{
    display: flex;
    margin-bottom: 10px;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    line-height: 30px;
    color: #fff;
  }
  .trafficVideo-row:nth-child(3) .trafficVideo-li{
    background: rgb(67, 175, 126);
  }
  .trafficVideo-row:nth-child(4) .trafficVideo-li{
    background: rgb(208, 78, 128);
  }
  .trafficVideo-row:nth-child(5) .trafficVideo-li{
    background: rgb(247, 144, 33);
  }
  .trafficVideo-li{
    flex-basis: 100px;
    flex-grow: 0;
    flex-shrink: 0;
    padding: 0 10px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;

    background: rgb(83,87,104);
  }
  .trafficVideo-li:first-child{
    width: 150px;
  }
  .trafficVideo-action-img{
    width: 20px;
    height: 20px;
  }
  .trafficVideo-line-title{

    color: #fff;
    padding-bottom: 10px;
  }
  .trafficVideo-line-container{
    align-items: center;
    display: flex;
  }
  .trafficVideo-line{
    height: 10px;
    width: 80%;
    background: rgb(41,41,54);
  }
  .trafficVideo-process{
    height: 10px;
    background: rgb(67, 175, 126);
  }
  .trafficVideo-ratio{
    width: 20%;
    font-size: 1.05em;
    text-align: center;
    color: #fff;
  }

  .trafficVideo-select-node-contaienr{
    width: 350px;
    height: 350px;
    margin: 30px auto;

  }

  .trafficVideo-select-node-top,
  .trafficVideo-select-node-bottom{
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .trafficVideo-select-node-action{
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background: rgb(113,114,124 );
    margin: 5px auto;
    color: #fff;
    text-align: center;
    line-height: 35px;
  }
  .trafficVideo-select-node-action.action{
    background: rgb(247, 144, 33);
  }


  .trafficVideo-select-node-middle{
    display: flex;
    height: 186px;
    align-items: center;
    justify-content: space-between;
  }
  .trafficVideo-select-node-center{
    width: 186px;
    height: 186px;
    border: 1px solid rgb(41, 41 ,54);
    flex-shrink: 0;
    flex-grow: 0;
  }
  .trafficVideo-select-node-left,
  .trafficVideo-select-node-right{
    width: 80px;
    display: flex;
    align-items: center;
    justify-content: center;

  }


</style>
