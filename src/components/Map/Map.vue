<template>
  <div id="bigMap" style="height: 980px"></div>
</template>

<script>
  export default {
    name: "map",
    props: {
      allLinksDelay: {
        type: Array,
        default: function () {
          return []
        }
      },
      allNodeDelay: {
        type: Array,
        default: function () {
          return []
        }
      },
      allLinksFlow: {
        type: Array,
        default: function () {
          return []
        }
      },
      allNodeFlow: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    data() {
      return {}
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        let map = new window.BMap.Map("bigMap");    // 创建Map实例
        map.centerAndZoom(new window.BMap.Point(119.170574, 33.513026), 16);  // 初始化地图,设置中心点坐标和地图级别
        map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
        map.setMinZoom(12);
        map.setMaxZoom(18);
        map.addControl(new window.BMap.NavigationControl({
          offset: new BMap.Size(10, 60)
        }));   //缩放按钮
        let b = new window.BMap.Bounds(new window.BMap.Point(118.19214, 32.717855), new window.BMap.Point(119.648976, 34.184862));
        try {
          BMapLib.AreaRestriction.setBounds(map, b);
        } catch (e) {
        }

        window.congestionMap = map;
      },
      addLabel(long, lat, name, value, id, isAddUrl) {
        let pt = new window.BMap.Point(long, lat);
        let opts = {position: pt, offset: new BMap.Size(-70, -70)};
        let label = new BMap.Label(name + "<br>交叉口延误时间 " + (value || 0) + "s", opts);  // 创建文本标注对象
        label.setStyle({
          color: "#fff",
          fontSize: "14px",
          background: this.getDelayColor(value || 0),
          height: "40px",
          border: 0,
          boxShadow: "5px 5px 5px #111",
          padding: "5px",
          lineHeight: "20px",
        });

        if (isAddUrl) {
          label.id = id;
          label.addEventListener('click', (pt) => {
            console.log(pt.currentTarget)
            this.jumpPage('/main/intersectionsMap/' + pt.currentTarget.id);
          });
        }
        window.congestionMap.addOverlay(label);
      },
      addNodeFlow(long, lat, name, value, id, isAddUrl) {
        let pt = new window.BMap.Point(long, lat);
        let myIcon = new window.BMap.Icon(this.getNodeDelayImg(value || 0), new window.BMap.Size(52, 51));
        let marker = new window.BMap.Marker(pt, {icon: myIcon});  // 创建标注
        if (isAddUrl) {
          marker.id = id;
          marker.addEventListener('click', (pt) => {
            console.log(pt.currentTarget)
            this.jumpPage('/main/intersectionsMap/' + pt.currentTarget.id);
          });
        }

        window.congestionMap.addOverlay(marker);
      },

      addRoadFlow(link_nodes, value, id, isAddUrl) {
        let pois = link_nodes.map((node) => {
          return new window.BMap.Point(node[0], node[1])
        });
        let polyline = new window.BMap.Polyline(pois, {
          enableEditing: false,//是否启用线编辑，默认为false
          enableClicking: true,//是否响应点击事件，默认为true
          strokeWeight: '3',//折线的宽度，以像素为单位
          strokeOpacity: 0.8,//折线的透明度，取值范围0 - 1
          strokeColor: this.getDelayColor(value) //折线颜色
        });
        if (isAddUrl) {
          polyline.id = id;
          polyline.addEventListener('click', (pt) => {
            console.log(pt.currentTarget)
            this.jumpPage('/main/RoadSectionMap/' + pt.currentTarget.id + '?lng=' + pt.currentTarget.nI.lng + '&lat=' + pt.currentTarget.nI.lat);
          });
        }

        window.congestionMap.addOverlay(polyline);          //增加折线
      },
      addMarkerAndLabel(allNodeDelay) {
        for (let i = 0; i < allNodeDelay.length; i++) {
          let pt = new window.BMap.Point(allNodeDelay[i].node.long, allNodeDelay[i].node.lat);
          let opts = {position: pt, offset: new BMap.Size(-70, -70)};
          let label = new BMap.Label(allNodeDelay[i].node_name + "<br>交叉口延误时间 " + (allNodeDelay[i].value || 0) + "s", opts);  // 创建文本标注对象
          label.setStyle({
            color: "#fff",
            fontSize: "14px",
            background: this.getDelayColor(allNodeDelay[i].value || 0),
            height: "40px",
            border: 0,
            boxShadow: "5px 5px 5px #111",
            padding: "5px",
            lineHeight: "20px",
          });
          label.id = allNodeDelay[i].node_id;

          let myIcon = new window.BMap.Icon(this.getNodeDelayImg(allNodeDelay[i].value || 0), new window.BMap.Size(52, 51));
          let marker = new window.BMap.Marker(pt, {icon: myIcon});  // 创建标注
          marker.id = allNodeDelay[i].node_id;
          marker.addEventListener('click', (pt) => {
            console.log(pt.currentTarget)
            this.jumpPage('/main/intersectionsMap/' + pt.currentTarget.id);
          });
          label.addEventListener('click', (pt) => {
            console.log(pt.currentTarget)
            this.jumpPage('/main/intersectionsMap/' + pt.currentTarget.id);
          });
          window.congestionMap.addOverlay(label);
          window.congestionMap.addOverlay(marker);
        }
      },
      addRoadLine(allLinksDelay) {
        for (let i = 0; i < this.allLinksDelay.length; i++) {
          let pois = allLinksDelay[i].link.link_nodes.map((node) => {
            return new window.BMap.Point(node[0], node[1])
          });
          let polyline = new window.BMap.Polyline(pois, {
            enableEditing: false,//是否启用线编辑，默认为false
            enableClicking: true,//是否响应点击事件，默认为true
            strokeWeight: '3',//折线的宽度，以像素为单位
            strokeOpacity: 0.8,//折线的透明度，取值范围0 - 1
            strokeColor: this.getDelayColor(allLinksDelay[i].value) //折线颜色
          });
          polyline.id = allLinksDelay[i].link_id;
          polyline.addEventListener('click', (pt) => {
            console.log('/main/RoadSectionMap/' +pt.currentTarget.id + '?lng=' + pt.currentTarget.nI.lng + '&lat=' + pt.currentTarget.nI.lat)
            // pt.currentTarget.id
            this.jumpPage('/main/RoadSectionMap/' + pt.currentTarget.id + '?lng=' + pt.currentTarget.nI.lng + '&lat=' + pt.currentTarget.nI.lat);
          });
          window.congestionMap.addOverlay(polyline);          //增加折线
        }
      },
      jumpPage(key) {
        this.$router.push(key);
      },
      getDelayColor(num) {
        if (num < 30) {
          return "green"
        } else if (num > 30 && num < 50) {
          return "#e7c936"
        } else if (num > 50 && num < 60) {
          return "darkorange"
        } else if (num > 60) {
          return "red"
        } else {
          return "#c9c9cc"
        }
      },
      getNodeDelayImg(num) {
        if (num < 30) {
          // return "/static/50.png"
          return "/static/image/map/green.jpg"
        } else if (num > 30 && num < 50) {
          // return "/static/53.png"
          return "/static/image/map/yellow.jpg"
        } else if (num > 50 && num < 60) {
          // return "/static/52.png"
          return "/static/image/map/orange.jpg"
        } else if (num > 60) {
          // return "/static/51.png"
          return "/static/image/map/red.jpg"
        }
      },
    },
    watch: {
      allNodeDelay: {
        handler(newVal, oldVal) {
          console.log(newVal)
          this.addMarkerAndLabel(newVal)
        },
        deep: true //对象内部属性的监听，关键。
      },
      allLinksDelay: {
        handler(newVal, oldVal) {
          this.addRoadLine(newVal)
        },
        deep: true //对象内部属性的监听，关键。
      },
      allNodeFlow: {
        handler(newVal, oldVal) {
          console.log(newVal)
          newVal.forEach((flow) => {
            this.addNodeFlow(flow.node.long, flow.node.lat, flow.node.node_name, flow.value, flow.node.node_id, false)
          })
        },
        deep: true //对象内部属性的监听，关键。
      },
      allLinksFlow: {
        handler(newVal, oldVal) {
          newVal.forEach((flow) => {

          })
        },
        deep: true //对象内部属性的监听，关键。
      }
    },
  }
</script>

<style scoped>

</style>
