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
      addLabel(long, lat, text, value, id, isAddUrl) {
        this.deletePoint(id);
        let pt = new window.BMap.Point(long, lat);
        let opts = {position: pt, offset: new BMap.Size(-70, -70)};
        let label = new BMap.Label(text, opts);  // 创建文本标注对象
        label.setStyle({
          color: "#fff",
          fontSize: "14px",
          background: isAddUrl ? this.getDelayColor(value) : this.getFlowColor(value),
          height: "40px",
          border: 0,
          boxShadow: "5px 5px 5px #111",
          padding: "5px",
          lineHeight: "20px",
          // display: 'none'
        });

        label.id = id;
        label.addEventListener('click', (pt) => {
          console.log(pt.currentTarget)
          this.jumpPage('/main/intersectionsMap/' + pt.currentTarget.id.substring(0, id.indexOf('_')));
        });

        window.congestionMap.addOverlay(label);
      },
      addNodeMarker(long, lat, value, id, isAddUrl) {
        this.deletePoint(id);
        let pt = new window.BMap.Point(long, lat);
        let myIcon = new window.BMap.Icon(isAddUrl ? this.getNodeDelayImg(value) : this.getNodeFlowImg(value), new window.BMap.Size(40, 40));
        let marker = new window.BMap.Marker(pt, {icon: myIcon});  // 创建标注
        marker.id = id;
        marker.addEventListener('click', (pt) => {
          console.log(pt.currentTarget)
          this.jumpPage('/main/intersectionsMap/' + pt.currentTarget.id.substring(0, id.indexOf('_')));
        });

        // marker.addEventListener('mouseover',(pt)=>{
        //   console.log(pt.currentTarget.id.substring(0, id.lastIndexOf('_'))+'_label')
        //   console.log(document.getElementById(pt.currentTarget.id.substring(0, id.lastIndexOf('_'))+'_label'))
        // });
        //
        // marker.addEventListener('mouseleave',(pt)=>{
        //   document.getElementById(pt.currentTarget.id.substring(0, id.indexOf('_'))+'_delay_label').style.display='node'
        // });

        window.congestionMap.addOverlay(marker);
      },
      deletePoint(id) {
        let allOverlay = window.congestionMap.getOverlays();
        for (let i = 0; i < allOverlay.length - 1; i++) {
          if (allOverlay[i].id === id) {
            window.congestionMap.removeOverlay(allOverlay[i]);
            return false;
          }
        }
      },
      addPloyline(link_nodes, value, id, isAddUrl) { //多线
        this.deletePoint(id);
        let pois = link_nodes.map((node) => {
          return new window.BMap.Point(node[0], node[1])
        });
        let polyline = new window.BMap.Polyline(pois, {
          enableEditing: false,//是否启用线编辑，默认为false
          enableClicking: true,//是否响应点击事件，默认为true
          strokeWeight: '3',//折线的宽度，以像素为单位
          strokeOpacity: 0.8,//折线的透明度，取值范围0 - 1
          strokeColor: isAddUrl ? this.getDelayColor(value) : this.getFlowColor(value)//折线颜色
        });
        polyline.id = id;
        polyline.addEventListener('click', (pt) => {
          console.log(pt.currentTarget)
          this.jumpPage('/main/RoadSectionMap/' + pt.currentTarget.id.substring(0, id.indexOf('_')) + '?lng=' + pt.currentTarget.nI.lng + '&lat=' + pt.currentTarget.nI.lat);
        });

        window.congestionMap.addOverlay(polyline);          //增加折线
      },
      addNodeDelay(allNodeDelay) {
        allNodeDelay.forEach((delay) => {
          let text = delay.node.node_name + "<br>交叉口延误时间 " + delay.value + "s";
          this.addNodeMarker(delay.node.long, delay.node.lat, delay.value, delay.node_id + '_delay_node', true);
          this.addLabel(delay.node.long, delay.node.lat, text, delay.value, delay.node_id + '_delay_label', true);
        })
      },
      addRoadDelay(allLinksDelay) {
        allLinksDelay.forEach((delay) => {
          this.addPloyline(delay.link.link_nodes, delay.value, delay.link_id + '_delay_line', true);
        });
      },
      jumpPage(key) {
        this.$router.push(key);
      },
      getFlowColor(num) {
        if (num <= 1000) {
          return "green"
        } else if (num > 1000 && num <= 3000) {
          return "darkorange"
        } else if (num > 3000) {
          return "red"
        } else {
          return "#c9c9cc"
        }
      },
      getDelayColor(num) {
        if (num <= 30) {
          return "green"
        } else if (num > 30 && num <= 50) {
          return "#e7c936"
        } else if (num > 50 && num <= 60) {
          return "darkorange"
        } else if (num > 60) {
          return "red"
        } else {
          return "#c9c9cc"
        }
      },
      getNodeDelayImg(num) {
        if (num <= 30) {
          return "/static/image/map/green.png"
        } else if (num > 30 && num <= 50) {
          return "/static/image/map/yellow.png"
        } else if (num > 50 && num <= 60) {
          return "/static/image/map/orange.png"
        } else if (num > 60) {
          return "/static/image/map/red.png"
        }
      },
      getNodeFlowImg(num) {
        if (num <= 1000) {
          return "/static/image/map/green.png"
        } else if (num > 1000 && num <= 3000) {
          return "/static/image/map/orange.png"
        } else if (num > 3000) {
          return "/static/image/map/red.png"
        }
      },
    },
    watch: {
      allNodeDelay: {
        handler(newVal, oldVal) {
          console.log(newVal)
          this.addNodeDelay(newVal)
        },
        deep: true //对象内部属性的监听，关键。
      },
      allLinksDelay: {
        handler(newVal, oldVal) {
          this.addRoadDelay(newVal)
        },
        deep: true //对象内部属性的监听，关键。
      },
      allNodeFlow: {
        handler(newVal, oldVal) {
          console.log(newVal)
          newVal.forEach((flow) => {
            let text = flow.node.node_name + "<br>总流量: " + flow.value + "pcu";
            this.addNodeMarker(flow.node.long, flow.node.lat, flow.value, flow.node.node_id + '_flow_node', false)
            this.addLabel(flow.node.long, flow.node.lat, text, flow.value, flow.node_id + '_flow_label', false);
          })
        },
        deep: true //对象内部属性的监听，关键。
      },
      allLinksFlow: {
        handler(newVal, oldVal) {
          newVal.forEach((flow) => {
            this.addPloyline(flow.link.link_nodes, flow.value, flow.link_id + '_flow_line', false);
          })
        },
        deep: true //对象内部属性的监听，关键。
      }
    },
  }
</script>

<style scoped>

</style>
