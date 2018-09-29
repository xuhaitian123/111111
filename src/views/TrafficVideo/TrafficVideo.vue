<template>
  <div v-loading="isLoadingInfo" element-loading-background="rgba(0, 0, 0, 0.8)">
    <Area></Area>
    <div class="trafficVideo-container-header">

    </div>
    <div class="trafficVideo-container">
      <div class="trafficVideo-container-left" v-loading="loading&&taskId" element-loading-background="rgba(0, 0, 0, 0.8)">
        <div class="trafficVideo-video-header">
          <div class="trafficVideo-video-header-left font16">{{nodeLinkName[0]}}-{{nodeLinkName[1]}}监控视频</div>
          <div class="trafficVideo-video-header-right">

            <el-select v-model="nodeId" @change="changeNode" class="area_titleSelect trafficVideo-select" placeholder="本区域所有监控视频路口"
                       :popper-append-to-body="false">
              <el-option
                v-for="item in nodes"
                :key="item.node_id"
                :label="item.node_name"
                :value="item.node_id">
              </el-option>
            </el-select>

          </div>

        </div>


        <!--<canvas width="1080" height="680" id="mycanvas"></canvas>-->
        <canvas class="trafficVideo" width="1080" height="680" id="trafficVideo_origin">
        </canvas>
        <canvas class="trafficVideo" width="1080" height="680" id="trafficVideo_car">
        </canvas>
        <canvas class="trafficVideo" width="1080" height="680" id="trafficVideo_bus">
        </canvas>
        <canvas class="trafficVideo" width="1080" height="680" id="trafficVideo_bike">
        </canvas>

        <div v-if="!taskId" class="notTrafficVideo" style="background: black">
          <div class="notTrafficVideo-content">
            <div class="notTrafficVideo-content-img">
              <img src="/static/image/trafficVideo/31.png"/>
            </div>
            <div>
              未找到监控画面
            </div>
          </div>


        </div>

      </div>
      <div class="trafficVideo-container-right">

        <div class="trafficVideo-right-top">
          <div class="trafficVideo-video-header">
            <div class="trafficVideo-video-header-left">各方向监控视频选择</div>

              <div style="width: 20px;height: 21px">
                <warn-popover :content="'可查看该路口摄像机监控视频及视频分析点击方位选择摄像头'"></warn-popover>
              </div>

          </div>

          <div class="trafficVideo-select-node-contaienr">
            <div class="trafficVideo-select-node-contaienr-side">
              <div>
                N
              </div>
              <div>
                <i data-v-11bcbfa4="" class="iconfont icon-fangxiang" style="font-size: 22px;"></i>
              </div>
            </div>

            <div class="trafficVideo-select-node-top">

              <div @click="changeLink(nodeInfo['北'])">

                <div class="trafficVideo-select-node-action"
                     :class="{action:  nodeInfo['北'] && nodeInfo['北'].taskId===taskId}">N
                </div>
                {{nodeInfo['北']?nodeInfo['北'].link_name: ''}}
              </div>

            </div>
            <div class="trafficVideo-select-node-middle">
              <div class="trafficVideo-select-node-left">
                <div @click="changeLink(nodeInfo['西'])">
                  {{nodeInfo['西']?nodeInfo['西'].link_name: ''}}
                  <div class="trafficVideo-select-node-action"
                       :class="{action: nodeInfo['西'] && nodeInfo['西'].taskId===taskId}">W
                  </div>
                </div>
              </div>

              <div class="trafficVideo-select-node-center">
                <img src="/static/image/trafficVideo/0919-55.png"/>

              </div>
              <div class="trafficVideo-select-node-right">
                <div @click="changeLink(nodeInfo['东'])">
                  {{nodeInfo['东']?nodeInfo['东'].link_name: ''}}
                  <div class="trafficVideo-select-node-action"
                       :class="{action:  nodeInfo['东'] &&nodeInfo['东'].taskId===taskId}">E
                  </div>
                </div>
              </div>

            </div>
            <div class="trafficVideo-select-node-bottom">
              <div @click="changeLink(nodeInfo['南'])">
                {{nodeInfo['南']?nodeInfo['南'].link_name: ''}}
                <div class="trafficVideo-select-node-action"
                     :class="{action:  nodeInfo['南'] &&nodeInfo['南'].taskId===taskId}">S
                </div>
              </div>
            </div>


          </div>

        </div>


        <div class="trafficVideo-right-bottom">
          <div class="trafficVideo-video-header">
            <div class="trafficVideo-video-header-left">{{nodeLinkName[0]}}* {{nodeLinkName[1]}}</div>
            <div style="width: 20px;height: 21px">
              <warn-popover :content="'可查看该路口各进道口小客车、重型车、行人流量。'"></warn-popover>
            </div>

          </div>

          <div class="trafficVideo-table">
            <div class="trafficVideo-title">
              <div class="trafficVideo-title-content">开始时间： {{startTime}}</div>
              <div class="trafficVideo-title-content">进程时间： {{totalTime}}</div>

              <div class="trafficVideo-title-action" @click="restartCountNumber">归零</div>

            </div>

            <div class="trafficVideo-row">
              <div class="trafficVideo-li">计数车型</div>
              <div class="trafficVideo-li">左转</div>
              <div class="trafficVideo-li">直行</div>
              <div class="trafficVideo-li">右转</div>
            </div>
            <div class="trafficVideo-row">
              <div class="trafficVideo-li">
                小客车
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
                重型车
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
    <TimeLine :isPauseTime="isPauseTime" @newTime="updateTime" @changeTime="clearImage"></TimeLine>
  </div>

</template>

<script>
  import TimeLine from '../../components/TimeLine/TimeLine'
  import Area from '../../components/Area/Area'
  import warnPopover from './components/warnPopover'

  export default {
    data() {
      return {
        isLoadingInfo: true,
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
        trafficVideo_origin_ctx: {},
        trafficVideo_car_ctx: {},
        trafficVideo_bus_ctx: {},
        trafficVideo_bike_ctx: {},
        nodeInfo: {},
        taskId: null,
        isCountNumber: false,
        isPauseTime: false,

        ratio: 0,
        totalTime: '-',
        startTime: '-',
        nodeLinkName: ['*', '*'],
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
        linkId: null,

        typeMap: {
          origin: null,
          car: 'mask',
          bus: 'mask2',
          bike: 'mask3'
        },
        nodes: [],
        nodeId: null,
      }
    },
    components: {
      TimeLine,
      Area,
      warnPopover,
    },
    mounted(options) {
      this.getNodeList().then(()=>{
        this.nodeId = Number(this.$route.params.nodeId.toString())
        this.getNodeInfo(this.nodeId)
        this.getBusRate()
      })


      this.trafficVideo_origin_ctx = document.getElementById("trafficVideo_origin").getContext("2d");
      this.trafficVideo_car_ctx = document.getElementById("trafficVideo_car").getContext("2d");
      this.trafficVideo_bus_ctx = document.getElementById("trafficVideo_bus").getContext("2d");
      this.trafficVideo_bike_ctx = document.getElementById("trafficVideo_bike").getContext("2d");
    },
    beforeDestroy() {
      // clearInterval(this.timer)
    },
    methods: {
      getBusRate(link_id){
        console.log(this.linkId)
        if(!this.linkId) return
        this.$http.get('/nodeData/getNodeDataD8ByLinkId?linkId='+ this.linkId+'&current=true' + '&token=' + this.getHeader().token).then(rate => {
          this.ratio = parseInt(rate.data.value * 100)
          console.log(rate)
          // this.busRate =
        })
      },
      changeNode() {
        this.taskId =null;
        this.ratio = null;
        this.loadingTime = true
        this.clearImage();
        this.getNodeInfo(this.nodeId)

      },
      getNodeList() {
        return new Promise(resolve => {
          this.$http.get('/index/nodes' + '?token=' + this.getHeader().token).then(nodes => {
            this.nodes = nodes.data.nodes

            resolve();
          })
        })

      },
      getNodeInfo(id) {
        Promise.all([this.getAllMovementsByNodeId(id), this.getNodeCameraLish(id), this.getAllLinksByNodeId(id)]).then(result => {
          var linkInfo = result[2].links.map(link => {
            link.movementList = result[0].movements.filter(movement => {
              return movement.link_id === link.link_id
            })
             var taskInfo = result[1].find(movement => {
              return movement.camera_name.substr(-1, 1) === link.link_direction
            });
            link.taskId =  taskInfo ? taskInfo.camera_id : undefined;
            return link
          });
          var nodeInfo = {};
          linkInfo.forEach(link => {
            nodeInfo[link.link_direction] = link
          });
          var linkName = [];
          result[2].links.forEach(link => {
            if (linkName.indexOf(link.link_name) < 0) {
              linkName.push(link.link_name)
            }
          })
          this.isLoadingInfo = false;
          console.log(nodeInfo['北'])
          this.linkId = nodeInfo['北'].link_id

          this.taskId = nodeInfo['北'].taskId
          this.nodeInfo = nodeInfo;
          this.nodeLinkName = linkName;

        })
      },
      clearImage() {
        this.restartCountNumber()
        this.isPauseTime = false
        this.imageList = {}
      },
      changeLink(link) {
        this.taskId = link.taskId;
        this.linkId = link.link_id
        this.imageList = {}
        this.restartCountNumber()
      },
      updateTime(time) {
        let millSecond = time % 1000;

        let startTime = time - this.delay_show;

        if (time % 1000 === 0) {
          this.loadImage(startTime);
          this.loading = startTime
        }
        if((this.ratio&&time%5000===0)|| (!this.ratio&&time%1000==0)){
          this.getBusRate()
        }

        let showTime = startTime - this.delay_show;
        this.showImage(Math.floor((showTime) / 1000) * 1000, millSecond)
      },
      showImage(startTime, millSecond) {

        var prevloadingTime = startTime + this.prevloading;
        for (var time = startTime; time < prevloadingTime; time += 1000) {


          if (this.imageList[time] && !this.imageList[time].isLoading) {
            this.isPauseTime = true;

          }

          if (!this.imageList[time] || !this.imageList[time].isLoading || this.imageList[time].imageList.length === 0) {
            return this.loading = Math.random()
          }

        }
        this.isPauseTime = false

        if (this.imageList[startTime] && this.imageList[startTime].index !== -1) {
          this.removeImage(startTime)
        }
        let images = this.imageList[startTime].imageList;
        let index = this.imageList[startTime].index;

        var nextIndex = this.getImageIndex(images, index, millSecond, startTime)
        this.loading = false;

        if (nextIndex < 0 || nextIndex >= images.length) return;

        this.changeImage(startTime, nextIndex);
        this.imageList[startTime].index = nextIndex

        this.countAllTypeNumber(startTime)

      },
      getImageIndex(images, index, millSecond, startTime) {
        var nextIndex = index + 1;
        if (nextIndex < 0 || nextIndex >= images.length) return index
        if (images[nextIndex].timestamp % 1000 < millSecond) {
          return nextIndex
        }
        return index
      },

      loadImage(endTime) {
        if (!this.taskId) return;
        if (this.loadingTime == endTime) return

        var startTime = endTime - 1000;

        this.imageList[startTime] = {isLoading: 0, imageList: [], index: -2, startTime: new Date()};
        this.getCountOfNode(endTime).then((flow) => {

          this.$http.get('/video/videoImage?task_id=' + this.taskId + '&start=' + startTime + '&end=' + endTime + '&token=' + this.getHeader().token).then(
            (images) => {
              images = images.data
              if (images.length === 0) {
                return this.imageList[startTime] = {isLoading: 1, imageList: [], index: -2, startTime: new Date()};
              }
              var originUrl = images.map(item => {
                var url = item.url.split('/')
                url[2] = '47.97.165.170:6008'
                return url.join('/')
              })
              var mask = images.map(item => {
                var url = item.mask.split('/')
                url[2] = '47.97.165.170:6008'
                return url.join('/')
              })
              var mask2 = images.map(item => {
                var url = item.mask2.split('/')
                url[2] = '47.97.165.170:6008'
                return url.join('/')
              })
              var mask3 = images.map(item => {
                var url = item.mask3.split('/')
                url[2] = '47.97.165.170:6008'
                return url.join('/')
              })


              let allPromise = originUrl.map((url) => {
                return new Promise(function (resolve) {
                  let imgObj = new Image(); // 创建图片对象
                  imgObj.src = url;

                  imgObj.addEventListener('load', function () { // 这里没有考虑error，实际上要考虑
                    resolve(imgObj)
                  }, false);
                })
              })
              let allPromise1 = mask.map((url) => {
                return new Promise(function (resolve) {
                  let imgObj = new Image(); // 创建图片对象
                  imgObj.src = url;

                  imgObj.addEventListener('load', function () { // 这里没有考虑error，实际上要考虑
                    resolve(imgObj)
                  }, false);
                })
              })
              let allPromise2 = mask2.map((url) => {
                return new Promise(function (resolve) {
                  let imgObj = new Image(); // 创建图片对象
                  imgObj.src = url;

                  imgObj.addEventListener('load', function () { // 这里没有考虑error，实际上要考虑
                    resolve(imgObj)
                  }, false);
                })
              })
              let allPromise3 = mask3.map((url) => {
                return new Promise(function (resolve) {
                  let imgObj = new Image(); // 创建图片对象
                  imgObj.src = url;

                  imgObj.addEventListener('load', function () { // 这里没有考虑error，实际上要考虑
                    resolve(imgObj)
                  }, false);
                })
              })


              var loading_origin = new Promise(resolve => {
                Promise.all(allPromise).then(image => {
                  resolve(image)
                })
              })

              var loading_car = new Promise(resolve => {
                Promise.all(allPromise1).then(image => {
                  resolve(image)
                })
              })
              var loading_bus = new Promise(resolve => {
                Promise.all(allPromise2).then(image => {
                  resolve(image)
                })
              })
              var loading_bike = new Promise(resolve => {
                Promise.all(allPromise3).then(image => {
                  resolve(image)
                })
              })

              Promise.all([loading_origin, loading_car, loading_bus, loading_bike]).then((image) => {
                // this.imageList[startTime] = {
                if (!this.imageList[startTime]) return;
                this.imageList[startTime].imageList = images
                this.imageList[startTime].index = -1
                this.imageList[startTime].preImage = image
                this.imageList[startTime].flow = flow
                this.imageList[startTime].endTime = new Date()
                this.imageList[startTime].isLoading = 1
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
        this.trafficVideo_origin_ctx.drawImage(img[0][index], 0, 0, 1280, 720, 0, 0, 1080, 680);
        if (this.numberOfCarModal.numberOfModal.car.status) {
          this.trafficVideo_car_ctx.clearRect(0, 0, 1080, 680)
          this.trafficVideo_car_ctx.drawImage(img[1][index], 0, 0, 1280, 720, 0, 0, 1080, 680);
        }
        if (this.numberOfCarModal.numberOfModal.bus.status) {
          this.trafficVideo_bus_ctx.clearRect(0, 0, 1080, 680)
          this.trafficVideo_bus_ctx.drawImage(img[2][index], 0, 0, 1280, 720, 0, 0, 1080, 680);

        }
        if (this.numberOfCarModal.numberOfModal.bike.status) {
          this.trafficVideo_bike_ctx.clearRect(0, 0, 1080, 680)
          this.trafficVideo_bike_ctx.drawImage(img[3][index], 0, 0, 1280, 720, 0, 0, 1080, 680);

        }


      },
      restartCountNumber() {
        this.totalTime = '-';
        this.startTime = '-';
        this.numberOfCarModal = {
          startTime: 0,
          numberOfModal: {
            car: {
              startTime: 0,
              endTime: 0,
              left: 0,
              right: 0,
              straight: 0,
              status: this.numberOfCarModal.numberOfModal.car.status
            },
            bus: {
              startTime: 0,
              endTime: 0,
              left: 0,
              right: 0,
              straight: 0,
              status: this.numberOfCarModal.numberOfModal.bus.status
            },
            bike: {
              startTime: 0,
              endTime: 0,
              left: 0,
              right: 0,
              straight: 0,
              status: this.numberOfCarModal.numberOfModal.bike.status
            }
          },
          endTime: 0,
        }
      },

      handleStartTime(time) {
        time = new Date(time)

        return time.getHours() + ':' + (time.getMinutes() < 10 ? ('0' + time.getMinutes()) : time.getMinutes())
      },
      handleTotalTime(time) {

        time = Number(time) / 1000;

        var minutes = parseInt(time / 60)

        var seconds = time % 60;

        return (minutes > 9 ? minutes : ('0' + minutes)) + ":" + (seconds > 9 ? seconds : ('0' + seconds))


      },

      countAllTypeNumber(startTime) {

        if (!this.isCountNumber) return;
        if (this.numberOfCarModal.startTime && (this.numberOfCarModal.endTime === startTime)) return

        if (!this.numberOfCarModal.startTime) {
          this.numberOfCarModal.startTime = startTime
        }

        this.numberOfCarModal.endTime = startTime;
        this.startTime = this.handleStartTime(startTime);

        this.totalTime = this.handleTotalTime(this.numberOfCarModal.endTime - this.numberOfCarModal.startTime)
        var directions = this.imageList[startTime].flow.result;
        var directs = ['东', '北', '南', '西'];
        var direct_codes = [];
        for (var n = 0; n < directs.length; n++) {
          if (this.nodeInfo[directs[n]].taskId == this.taskId) {
            var movementList = this.nodeInfo[directs[n]].movementList;
            for (var j = 0; j < movementList.length; j++) {
              direct_codes.push(movementList[j].movement_id);
            }
            break;
          }
        }
        var types = ['car', 'bus', 'bike'];
        var direct_types = ['car', 'truck', 'bike'];

        for (var m = 0; m < directions.length; m++) {
          for (var i = 0; i < types.length; i++) {
            if (direct_codes.indexOf(directions[m].movement_id) != -1) {
              this.numberOfCarModal.numberOfModal[types[i]][directions[m].direction] += directions[m][direct_types[i]]
            }
          }
        }

      },
      countNumber(type) {

        this.numberOfCarModal.numberOfModal[type].status = !this.numberOfCarModal.numberOfModal[type].status


        this.isCountNumber = this.numberOfCarModal.numberOfModal['bike'].status ||
          this.numberOfCarModal.numberOfModal['car'].status ||
          this.numberOfCarModal.numberOfModal['bus'].status;
        if (!this.isCountNumber) this.restartCountNumber()
        this['trafficVideo_' + type + '_ctx'].clearRect(0, 0, 1080, 680)
        if (this.numberOfCarModal.numberOfModal[type].status == true) {
          this.numberOfCarModal.numberOfModal[type].left = 0;
          this.numberOfCarModal.numberOfModal[type].straight = 0;
          this.numberOfCarModal.numberOfModal[type].right = 0;
        }

      },
      getCountOfNode(endTime) {
        return new Promise(resolve => {
          var startTime = endTime - 1000;
          this.$http.get('/video/videoAnalysis?intersection_id=2&start=' + startTime + '&end=' + endTime + '&token=' + this.getHeader().token).then((result) => {

            resolve(result.data);

          })
          // resolve({result: [{movement_id: 210, direction: "left", car: 1, truck: 2, bike: 3, status: false},{movement_id: 203, direction: "straight", car: 1, truck: 2, bike: 3, status: false},{movement_id: 211, direction: "right", car: 1, truck: 2, bike: 3, status: false}]})
          //
          // {movement_id: 211, direction: "right", car: 1, truck: 2, bike: 3, status: false}]})
        });
      },
      getNodeCameraLish(nodeId) {
        return new Promise(resolve => {
          this.$http.get('/nodeData/getCameraNode?nodeId=' + nodeId + '&token=' + this.getHeader().token).then((result) => {
            resolve(result.data)
          })
        });
      },
      getAllMovementsByNodeId(id) {
        return new Promise(resolve => {
          this.$http.get('/index/getAllMovementsByNodeId?nodeId=' + id + '&token=' + this.getHeader().token).then((result) => {
            resolve(result.data)
          })
        });
      },
      getAllLinksByNodeId(id) {
        return new Promise(resolve => {
          this.$http.get('/index/getAllLinksByNodeId?nodeId=' + id + '&token=' + this.getHeader().token).then((result) => {
            resolve(result.data)
          })
        });
      },
      getDate() {
        this.$http.get('/roadDataAnalysis/weekCongestionBaohe?nodeId=2&dayBegin=20180910&dayEnd=20180916' + '&token=' + this.getHeader().token).then((result) => {
          console.log(result)
        })
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
    z-index: 1000;
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
  .notTrafficVideo{
    position: absolute;
    top: 30px;
    left: 0;
    width: 1080px;
    height: 682px;
  }
  .notTrafficVideo-content{
    margin: 30% auto;
    width: 100px
  }
  .notTrafficVideo-content-img{
    width: 100px;
    height: 100px;
    margin: 10px auto;
    background: #999999;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .notTrafficVideo-content-img img{
    width: 50px;
    height: 50px;
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
    padding: 10px 20px;
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

  .trafficVideo-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;

  }

  .trafficVideo-title-content {
    width: 150px;
  }

  .trafficVideo-title-action {
    flex-grow: 1;
    text-align: center;
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
    position: relative;
  }
  .trafficVideo-select-node-contaienr-side{
    position: absolute;
    right: 0;
    top: 40px;
    text-align: center;
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
    /*border: 1px solid rgb(41, 41, 54);*/
    flex-shrink: 0;
    flex-grow: 0;
  }

  .trafficVideo-select-node-center img {
    width: 100%;
    height: 100%;
  }

  .trafficVideo-select-node-left,
  .trafficVideo-select-node-right {
    width: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .main-popover-img{
    margin-top: 5px;
    width: 20px;
    height: 20px;
  }



</style>
