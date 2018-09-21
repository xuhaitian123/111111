<template>
  <div>
    <Area></Area>
    <div class="trafficVideo-container-header">

    </div>
    <div class="trafficVideo-container">
      <div class="trafficVideo-container-left" v-loading="loading" element-loading-background="rgba(0, 0, 0, 0.8)">
        <div class="trafficVideo-video-header">
          <div class="trafficVideo-video-header-left font16">人民路-南京路监控视频</div>
          <div class="trafficVideo-video-header-right">
            本区域所有监控视频路口

          </div>

        </div>
        <!--<canvas width="1080" height="680" id="mycanvas"></canvas>-->
        <canvas class="trafficVideo"  width="1080" height="680"  id="trafficVideo_origin">
        </canvas>
        <canvas class="trafficVideo" width="1080" height="680"  id="trafficVideo_car">
        </canvas>
        <canvas class="trafficVideo" width="1080" height="680"  id="trafficVideo_bus">
        </canvas>
        <canvas class="trafficVideo" width="1080" height="680"  id="trafficVideo_bike">
        </canvas>
      </div>
      <div class="trafficVideo-container-right">

        <div class="trafficVideo-right-top">
          <div class="trafficVideo-video-header">
            <div class="trafficVideo-video-header-left">各方向监控视频选择</div>
          </div>
          <div class="trafficVideo-select-node-contaienr">
            <div class="trafficVideo-select-node-top">

              <div @click="changeLink(nodeInfo['北'].taskId)">

                <div class="trafficVideo-select-node-action" :class="{action:  nodeInfo['北'] && nodeInfo['北'].taskId===taskId}">N</div>
                {{nodeInfo['北']?nodeInfo['北'].link_name: ''}}
              </div>

            </div>
            <div class="trafficVideo-select-node-middle">
              <div class="trafficVideo-select-node-left">
                <div @click="changeLink(nodeInfo['西'].taskId)">
                  {{nodeInfo['西']?nodeInfo['西'].link_name: ''}}
                    <div class="trafficVideo-select-node-action" :class="{action: nodeInfo['西'] && nodeInfo['西'].taskId===taskId}">W</div>
                </div>
              </div>

              <div class="trafficVideo-select-node-center">

              </div>
              <div class="trafficVideo-select-node-right">
                <div @click="changeLink(nodeInfo['东'].taskId)">
                  {{nodeInfo['东']?nodeInfo['东'].link_name: ''}}
                  <div class="trafficVideo-select-node-action" :class="{action:  nodeInfo['东'] &&nodeInfo['东'].taskId===taskId}">E</div>
                </div>
              </div>

            </div>
            <div class="trafficVideo-select-node-bottom">
              <div @click="changeLink(nodeInfo['南'].taskId)">
                {{nodeInfo['南']?nodeInfo['南'].link_name: ''}}
                <div class="trafficVideo-select-node-action" :class="{action:  nodeInfo['南'] &&nodeInfo['南'].taskId===taskId}">S</div>
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
                <img @click="countNumber('car')" v-if="numberOfCarModal.numberOfModal.car.status"
                     class="trafficVideo-action-img" src="/static/image/trafficVideo/25.png">
                <img @click="countNumber('car')" v-if="!numberOfCarModal.numberOfModal.car.status"
                     class="trafficVideo-action-img" src="/static/image/trafficVideo/26.png">
              </div>
              <div class="trafficVideo-li">{{numberOfCarModal.numberOfModal.car.status ?
                numberOfCarModal.numberOfModal.car.left: '-'}}
              </div>
              <div class="trafficVideo-li">{{numberOfCarModal.numberOfModal.car.status ?
                numberOfCarModal.numberOfModal.car.straight: '-'}}
              </div>
              <div class="trafficVideo-li">{{numberOfCarModal.numberOfModal.car.status ?
                numberOfCarModal.numberOfModal.car.right: '-'}}
              </div>

            </div>
            <div class="trafficVideo-row">
              <div class="trafficVideo-li">
                非机动车
                <img @click="countNumber('bus')" v-if="numberOfCarModal.numberOfModal.bus.status"
                     class="trafficVideo-action-img" src="/static/image/trafficVideo/25.png">
                <img @click="countNumber('bus')" v-if="!numberOfCarModal.numberOfModal.bus.status"
                     class="trafficVideo-action-img" src="/static/image/trafficVideo/26.png">

              </div>
              <div class="trafficVideo-li">{{numberOfCarModal.numberOfModal.bus.status ?
                numberOfCarModal.numberOfModal.bus.left: '-'}}
              </div>
              <div class="trafficVideo-li">{{numberOfCarModal.numberOfModal.bus.status ?
                numberOfCarModal.numberOfModal.bus.straight: '-'}}
              </div>
              <div class="trafficVideo-li">{{numberOfCarModal.numberOfModal.bus.status ?
                numberOfCarModal.numberOfModal.bus.right: '-'}}
              </div>

            </div>
            <div class="trafficVideo-row">
              <div class="trafficVideo-li">
                行人
                <img @click="countNumber('bike')" v-if="numberOfCarModal.numberOfModal.bike.status"
                     class="trafficVideo-action-img" src="/static/image/trafficVideo/25.png">
                <img @click="countNumber('bike')" v-if="!numberOfCarModal.numberOfModal.bike.status"
                     class="trafficVideo-action-img" src="/static/image/trafficVideo/26.png">

              </div>
              <div class="trafficVideo-li">{{numberOfCarModal.numberOfModal.bike.status ?
                numberOfCarModal.numberOfModal.bike.left: '-'}}
              </div>
              <div class="trafficVideo-li">{{numberOfCarModal.numberOfModal.bike.status ?
                numberOfCarModal.numberOfModal.bike.straight: '-'}}
              </div>
              <div class="trafficVideo-li">{{numberOfCarModal.numberOfModal.bike.status ?
                numberOfCarModal.numberOfModal.bike.right: '-'}}
              </div>

            </div>
            <div>
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
    <TimeLine :isPauseTime="isPauseTime" @newTime="updataVideo" @changeTime="clearImage"></TimeLine>
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
        currentIndex: -1,
        delay: 10000,
        delay_show: 5000,
          prevloading: 1000,
        isShowCar: 0,
        isShowBus: 0,
        isShowBike: 0,
        loading: true,
        typeList: ['origin', 'car', 'bus', 'bike'],
        ctx: {},
        trafficVideo_origin_ctx:{},
        trafficVideo_car_ctx:{},
        trafficVideo_bus_ctx:{},
        trafficVideo_bike_ctx:{},
        nodeInfo:{},
        taskId:null,
        isPauseTime:false,

        ratio: 10,
        // typeList: ['origin','car'],
        numberOfCarModal: {
          startTime: 0,
          numberOfModal: {
            car: {startTime: 0, endTime: 0, left: 0, right: 0, straight: 0, status: 0},
            bus: {startTime: 0, endTime: 0, left: 0, right: 0, straight: 0, status: 0},
            bike: {startTime: 0, endTime: 0, left: 0, right: 0, straight: 0, status: 0}
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

      Promise.all([this.getAllMovementsByNodeId(2),this.getNodeCameraLish(2),this.getAllLinksByNodeId(2)]).then(result=>{
        var linkInfo = result[2].links.map(link=>{
          link.movementList = result[0].movements.filter(movement=>{
            return movement.link_id === link.link_id
          })
          link.taskId = result[1].find(movement=>{
            return movement.camera_name.substr(-1,1) === link.link_direction
          }).camera_id;
          return link
        });
        var nodeInfo ={}
        linkInfo.forEach(link=>{
          nodeInfo[link.link_direction] = link
        });
        this.taskId =  nodeInfo['北'].taskId
        this.nodeInfo =  nodeInfo;
        console.log(this.nodeInfo)
      })



      this.trafficVideo_origin_ctx=  document.getElementById("trafficVideo_origin").getContext("2d");
      this.trafficVideo_car_ctx=  document.getElementById("trafficVideo_car").getContext("2d");
      this.trafficVideo_bus_ctx=  document.getElementById("trafficVideo_bus").getContext("2d");
      this.trafficVideo_bike_ctx=  document.getElementById("trafficVideo_bike").getContext("2d");
    },
    beforeDestroy() {
      clearInterval(this.timer)
    },
    methods: {
      clearImage(){
        //重置数据
        this.numberOfCarModal =  {
          startTime: 0,
            numberOfModal: {
            car: {startTime: 0, endTime: 0, left: 0, right: 0, straight: 0, status: this.numberOfCarModal.numberOfModal.car.status},
            bus: {startTime: 0, endTime: 0, left: 0, right: 0, straight: 0, status: this.numberOfCarModal.numberOfModal.bus.status},
            bike: {startTime: 0, endTime: 0, left: 0, right: 0, straight: 0, status: this.numberOfCarModal.numberOfModal.bike.status}
          },
          endTime: 0,
        }

        // this.imageList ={}
      },
      changeLink(taskId){
        this.taskId =  taskId;
        this.imageList ={}
      },
      updataVideo(time) {
        console.log(time)

        let i = 0;
        var j = 0;

        let millSecond = time % 1000;

        let startTime = time - this.delay_show;

        if (time % 1000 === 0) {
          this.loadImage(startTime);

        }
        this.showImage(Math.floor((startTime - this.delay_show-5000)/1000)*1000 , millSecond)
      },
      showImage(startTime, millSecond) {

        var prevloadingTime = startTime + this.prevloading;
        for (var time = startTime; time < prevloadingTime; time += 1000) {

          if (!this.imageList[time] || !this.imageList[time].isLoading || this.imageList[time].imageList.length === 0) {
            // console.log(this.imageList[time])
            //设置一个表示表明没有拉下来数据

            return this.loading = Math.random()
          }
          if(this.imageList[time]&& !this.imageList[time].isLoading ){
            this.isPauseTime = true;
          }

        }

        if (this.imageList[startTime] && this.imageList[startTime].index !== -1) {
          this.removeImage(startTime)
        }
        let images = this.imageList[startTime].imageList;
        let index = this.imageList[startTime].index;

        var nextIndex = this.getImageIndex(images, index, millSecond, startTime)
        this.loading = false;
        this.isPauseTime = false;

        if (nextIndex >= images.length) return;

        this.changeImage(startTime, nextIndex);
        this.imageList[startTime].index  =  nextIndex

      },
      getImageIndex(images, index, millSecond, startTime){
        var count = images.length;
        var index = index;
        var current = Math.ceil((millSecond/100)/count);
        return current;
      },

      loadImage(endTime) {
        if (!this.taskId) return;
        var startTime = endTime - 1000;

        this.imageList[startTime] = {isLoading: 0, imageList: [], index: -2,startTime: new Date()};
        this.getCountOfNode(endTime).then((count) => {
          this.countAllTypeNumber(count)
          // console.log('http://47.97.165.170:6001/frames?task_id='+ this.taskId +'&start=' + startTime + '&end=' + endTime)
          this.$http.get('/video/videoImage?task_id='+ this.taskId +'&start=' + startTime + '&end=' + endTime).then(
            (images) => {
              if (images.data.length === 0) {
                return  this.imageList[startTime] = {isLoading: 1, imageList: [], index: -2,startTime: new Date()};
              }
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

              var loading_origin = new Promise(resolve => {
                Promise.all(allPromise).then(image=>{
                  resolve(image)
                })
              })

              var loading_car = new Promise(resolve => {
                Promise.all(allPromise1).then(image=>{
                  resolve(image)
                })
              })
              var loading_bus = new Promise(resolve => {
                Promise.all(allPromise2).then(image=>{
                  resolve(image)
                })
              })
              var loading_bike = new Promise(resolve => {
                Promise.all(allPromise3).then(image=>{
                  resolve(image)
                })
              })

              Promise.all([loading_origin,loading_bus,loading_car,loading_bike]).then((image) => {
                // this.imageList[startTime] = {

                  this.imageList[startTime].imageList=images

                  this.imageList[startTime].index=-1
                  this.imageList[startTime].preImage=image
                  this.imageList[startTime].count=count
                  this.imageList[startTime].endTime=new Date()
                this.imageList[startTime].isLoading=1
                // }
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
      },
      changeImage(currentTime, index) {
        var img = this.imageList[currentTime].preImage;
        this.trafficVideo_origin_ctx.drawImage(img[0][index], 0, 0,1280, 720, 0, 0, 1080, 680);
        if(this.numberOfCarModal.numberOfModal.car.status){
          this.trafficVideo_car_ctx.clearRect(0, 0, 1080, 680)
          this.trafficVideo_car_ctx.drawImage(img[1][index], 0, 0, 640, 360, 0, 0, 1080, 680);
        }
        if(this.numberOfCarModal.numberOfModal.bus.status){
          this.trafficVideo_bus_ctx.clearRect(0, 0, 1080, 680)
          this.trafficVideo_bus_ctx.drawImage(img[2][index], 0, 0, 640, 360, 0, 0, 1080, 680);

        }
        if(this.numberOfCarModal.numberOfModal.bike.status){
          this.trafficVideo_bike_ctx.clearRect(0, 0, 1080, 680)
          this.trafficVideo_bike_ctx.drawImage(img[3][index], 0, 0,640, 360, 0, 0, 1080, 680);

        }


      },
      countAllTypeNumber(result){
        var directions = result.result;
        var directs = ['东','北','南','西'];
        var direct_codes = [];
        for (var n = 0; n < directs.length; n ++)
        {
          if (this.nodeInfo[directs[n]].taskId == this.taskId)
          {
            var movementList = this.nodeInfo[directs[n]].movementList;
            for (var j = 0; j < movementList.length; j ++)
            {
              direct_codes.push(movementList[j].movement_id);
            }
            break;
          }
        }
        var types = ['car','bus','bike'];
        var direct_types = ['car','truck','bike'];

        for (var m = 0; m < directions.length; m ++)
        {
          for (var i = 0; i < types.length; i ++)
          {
            if (direct_codes.indexOf(directions[m].movement_id) != -1)
            {
              this.numberOfCarModal.numberOfModal[types[i]][directions[m].direction] += directions[m][direct_types[i]]
            }
          }
        }

      },
      countNumber(type) {
        this.numberOfCarModal.numberOfModal[type].status = !this.numberOfCarModal.numberOfModal[type].status
        this['trafficVideo_'+ type+'_ctx'].clearRect(0, 0, 1080, 680)
        if (this.numberOfCarModal.numberOfModal[type].status == true)
        {
          this.numberOfCarModal.numberOfModal[type].left = 0;
          this.numberOfCarModal.numberOfModal[type].straight = 0;
          this.numberOfCarModal.numberOfModal[type].right = 0;
        }

      },
      getCountOfNode(endTime) {
        return new Promise(resolve => {
          var startTime = endTime - 1000;
          this.$http.get('http://172.16.5.82:3000/video/videoAnalysis?intersection_id=2&start=' + startTime + '&end=' + endTime).then((result)=>{
            resolve(result.data);
          })
          //  resolve({result:[{movement_id: 210, direction: "left", car: 1, truck: 2, bike: 3, status: false},
          // {movement_id: 203, direction: "straight", car: 1, truck: 2, bike: 3, status: false},
          // {movement_id: 211, direction: "right", car: 1, truck: 2, bike: 3, status: false}]})
        });
      },
      getNodeCameraLish(nodeId) {
        return new Promise(resolve => {
          this.$http.get('/nodeData/getCameraNode?nodeId=' + nodeId).then((result) => {
            resolve(result.data)
          })
        });
      },
      getAllMovementsByNodeId(id) {
        return new Promise(resolve => {
          this.$http.get('/index/getAllMovementsByNodeId?nodeId='+ id).then((result) => {
            resolve(result.data)
          })
        });
      },
      getAllLinksByNodeId(id){
        return new Promise(resolve => {
          this.$http.get('/index/getAllLinksByNodeId?nodeId='+ id).then((result) => {
            resolve(result.data)
          })
        });
      },

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
    margin: 10px 10px;
    background: rgb(53, 54, 68);
  }

  .trafficVideo-container-left {
    width: 1080px;
    height: 715px;
    position: relative;
    overflow: hidden;
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

  .trafficVideo-table {
    padding: 20px;
    box-sizing: border-box;

  }

  .trafficVideo-row {
    display: flex;
    margin-bottom: 10px;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    line-height: 30px;
    color: #fff;
  }

  .trafficVideo-row:nth-child(3) .trafficVideo-li {
    background: rgb(67, 175, 126);
  }

  .trafficVideo-row:nth-child(4) .trafficVideo-li {
    background: rgb(208, 78, 128);
  }

  .trafficVideo-row:nth-child(5) .trafficVideo-li {
    background: rgb(247, 144, 33);
  }

  .trafficVideo-li {
    flex-basis: 100px;
    flex-grow: 0;
    flex-shrink: 0;
    padding: 0 10px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;

    background: rgb(83, 87, 104);
  }

  .trafficVideo-li:first-child {
    width: 150px;
  }

  .trafficVideo-action-img {
    width: 20px;
    height: 20px;
  }

  .trafficVideo-line-title {

    color: #fff;
    padding-bottom: 10px;
  }

  .trafficVideo-line-container {
    align-items: center;
    display: flex;
  }

  .trafficVideo-line {
    height: 10px;
    width: 80%;
    background: rgb(41, 41, 54);
  }

  .trafficVideo-process {
    height: 10px;
    background: rgb(67, 175, 126);
  }

  .trafficVideo-ratio {
    width: 20%;
    font-size: 1.05em;
    text-align: center;
    color: #fff;
  }

  .trafficVideo-select-node-contaienr {
    width: 350px;
    height: 350px;
    margin: 30px auto;

  }

  .trafficVideo-select-node-top,
  .trafficVideo-select-node-bottom {
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .trafficVideo-select-node-action {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background: rgb(113, 114, 124);
    margin: 5px auto;
    color: #fff;
    text-align: center;
    line-height: 35px;
  }

  .trafficVideo-select-node-action.action {
    background: rgb(247, 144, 33);
  }

  .trafficVideo-select-node-middle {
    display: flex;
    height: 186px;
    align-items: center;
    justify-content: space-between;
  }

  .trafficVideo-select-node-center {
    width: 186px;
    height: 186px;
    border: 1px solid rgb(41, 41, 54);
    flex-shrink: 0;
    flex-grow: 0;
  }

  .trafficVideo-select-node-left,
  .trafficVideo-select-node-right {
    width: 80px;
    display: flex;
    align-items: center;
    justify-content: center;

  }


</style>
