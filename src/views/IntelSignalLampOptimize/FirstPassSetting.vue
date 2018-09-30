<template>
  <div>
    <area-select></area-select>
    <el-row :gutter="10" class="first_pass_lineRow">
      <el-col>
        <el-card shadow="never" :body-style="{ padding: '0px' }" class="Dashboard_box_card">
          <div class="Dashboard_clearfix">
            <span><i class="el-icon-arrow-left" style="margin-right: 10px" @click="jumpPageToMain()"></i>智能信号灯控制</span>
            <div class="nav-right-style">
              <i class="iconfont icon-webicon03"></i>
            </div>
          </div>
          <div class="signal-lamp-container">
            <div id="bigMap" class="show-map-style">
              <road-net-map id="bmap" style="width: 65%"></road-net-map>
            </div>
            <div class="right-container">
              <div class="control-setting">
                <div class="control-setting-title">{{current_road}} 优先通行控制设置</div>
                <div class="control-setting-content">
                  <div class="first_method">
                    <div class="first_method-title">优先方式</div>
                    <div class="first_method_item" v-for="(item, index) in first_items.first_style" @click="set_first_style_item(index)">
                      <div class="empty-retangle">
                        <div v-for="(setting, i) in first_setting_info.first_style" v-if="first_setting_info.first_style[i]==first_items.first_style[index]" class="fill-retangle"></div>
                      </div>
                      <span>{{first_items.first_style[index]}}</span>
                    </div>
                  </div>
                  <div class="first_car_level">
                    <div class="car_level_item first_method-title">
                      <div class="car_info">优先车辆和等级</div>
                      <div class="level">高</div>
                      <div class="level">中</div>
                      <div class="level">低</div>
                    </div>
                    <div class="car_level_item" v-for="(item, index) in first_items.first_car">
                      <div class="first_method_item car_info" @click="changeFirstCar(index)">
                        <div class="empty-retangle">
                          <div class="fill-retangle" v-for="(dataInfo, i) in first_setting_info.first_data" v-if="first_setting_info.first_data[i].car_name==first_items.first_car[index]"></div>
                        </div>
                        <span>{{first_items.first_car[index]}}</span>
                      </div>
                      <div class="empty-circle" @click="changeLevel(index,'高')">
                        <div class="fill-circle" v-for="(dataInfo, i) in first_setting_info.first_data"
                             v-if="first_setting_info.first_data[i].car_name==first_items.first_car[index]
                             && first_setting_info.first_data[i].level=='高'"></div>
                      </div>
                      <div class="empty-circle" @click="changeLevel(index,'中')">
                        <div class="fill-circle"  v-for="(dataInfo, i) in first_setting_info.first_data"
                             v-if="first_setting_info.first_data[i].car_name==first_items.first_car[index]
                             && first_setting_info.first_data[i].level=='中'"></div>
                      </div>
                      <div class="empty-circle" @click="changeLevel(index,'低')">
                        <div class="fill-circle"  v-for="(dataInfo, i) in first_setting_info.first_data"
                             v-if="first_setting_info.first_data[i].car_name==first_items.first_car[index]
                             && first_setting_info.first_data[i].level=='低'"></div>
                      </div>

                    </div>
                  </div>
                </div>
                <div class="level-introduce">
                  <div class="level-introduce-item">高：对社会车辆通行影响大</div>
                  <div class="level-introduce-item">中：对社会车辆通行影响中等</div>
                  <div class="level-introduce-item">低：对社会车辆通行影响小</div>
                </div>
                <div class="split-line"></div>
                <div class="start-use-first-pass">
                  <div class="left-start-use" @click="change_start_open_first_pass_status()">
                    <span>启动优先通行</span>
                    <div class="empty-circle">
                      <div class="fill-circle" v-if="start_open_first_pass"></div>
                    </div>
                  </div>
                  <div class="right-start-use" @click="change_is_global_status()">
                    <div class="empty-retangle">
                      <div class="fill-retangle" v-if="is_global"></div>
                    </div>
                    <span>车辆和等级设置全局适用(不选只适用本路口)</span>
                  </div>
                </div>
              </div>
              <div class="find-first-record" >
                <div class="control-setting-title">查询优先通行车辆记录</div>
                <div class="filter-condition">
                  <div class="show_time_left big-item range-data">
                    <div class="range-time-title">
                      <div class="selected_road">开始时间</div>
                      <div class="selected_road">结束时间</div>
                    </div>
                    <el-date-picker
                      v-model="week_data_picker_1"
                      type="daterange"
                      size="mini"
                          format="yyyy/MM/dd"
                      value-format="yyyy/MM/dd"
                      range-separator="至"
                      placeholder="选择日期">
                    </el-date-picker>
                  </div>
                  <div class="show-filter-item">
                    <div class="item-key-intro">路口</div>
                    <el-select v-model="week_date_picker_node" size="mini" class="area_titleSelect min" placeholder="请选择"
                               :popper-append-to-body="false">
                      <el-option
                        v-for="item in nodes"
                        :key="item.node_id"
                        :label="item.node_name"
                        :value="item.node_id">
                      </el-option>
                    </el-select>
                  </div>
                  <div class="show-filter-item">
                    <div class="item-key-intro">车辆类型</div>
                    <el-select v-model="filter_car_type" size="mini" class="area_titleSelect min" placeholder="请选择"
                               :popper-append-to-body="false">
                      <el-option
                        v-for="item in car_style"
                        :key="item.type"
                        :label="item.name"
                        :value="item.type">
                      </el-option>
                    </el-select>
                  </div>

                </div>
              <div class="search_button_div">
                <el-button class="search-button" v-on:click="filter_button_click()">确定</el-button>
              </div>
              </div>
              <div class="history-record" >
                <div class="control-setting-title">优先通行历史记录： {{week_data_picker_1[0]}}-{{week_data_picker_1[1]}}
                  <span class="right-record-number">找到记录：{{filter_all_record_info.length}}</span>
                </div>
                <div class="show-record-title">
                  <div class="record-item">时间</div>
                  <div class="record-item_road">路口</div>
                  <div class="record-item">车辆类型</div>
                  <!--<div class="record-item">优先级别</div>-->
                  <div class="record-item">延误时间</div>
                  <div class="record-item">平均车速</div>
                </div>
                <div class="record-split-line"></div>
                <div class="show-all-record-content">
                  <div class="show-record-item" v-for="(record, i) in filter_all_record_info">
                    <div class="record-item">{{time_stamp_to_data(record.time)}}</div>
                    <div class="record-item_road">{{get_road_name(record.crossId,nodes)}}</div>
                    <div class="record-item">{{get_car_type(record.type)}}</div>
                    <!--<div class="record-item">{{record.priority}}</div>-->
                    <div class="record-item">{{record.delayTime}}</div>
                    <div class="record-item">{{record.speed}}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>

</template>

<script>
  import AreaSelect from '../../components/Area/Area'
  import RoadNetMap from '../../components/Map/Map'
  // import BMapLib from 'BMapLib'
  // import $ from 'jquery'
    export default {
      name: "FirstPassSetting",
      components: {
        AreaSelect,
        RoadNetMap
      },
      data() {
        return {
          week_data_picker_1: [this.formatDate(new Date(new Date().getTime() - 1000 * 60 * 60 * 24), 'yyyy-MM-dd'), this.formatDate(new Date(), 'yyyy-MM-dd')],
          road_name:'人民路-珠海路',
          radio2: 3,
          first_items:{
            first_style:['绿灯延长','红灯提前结束','调整相位顺序'],
            first_car:['警卫车辆','警务车辆','领导车辆','救护车','公交车']
          },
          first_setting_info:{
            first_style:['绿灯延长'],
            first_data:[
              {
                car_name:'警卫车辆',
                level:'中'
              }
              ]
          },
          nodes:[],
          week_date_picker_node:'沈坤路樱桃园路路口',
          car_style:[{type:'Police',name:'警卫车辆'},{type:'Police_1',name:'警务车辆'},{type:'LeadingVehicle',name:'领导车辆'},{type:'RescueVehicle',name:'救护车'},{type:'Bus',name:'公交车'}],
          open_road_record_List:[],
          current_road:'人民路-珠海路',
          start_open_first_pass:true,
          is_global:false,
          filter_carID:'000090',
          filter_date:'20180918',
          filter_start_time:'09:30',
          filter_end_time:'13:30',
          history_record_number:9,
          filter_road_name:'人民路-珠海路',
          filter_car_type:'警卫车辆',
          filter_all_record_info:[],
          filter_all_record:[{
            time:'9:00',
            road:'人民路',
            car_id:'00005',
            car_type:'警卫车辆',
            first_level:'中',
            delay_time:'10（83%）',
            avg_speed:'50（83%）'
          },{
            time:'10:00',
            road:'人民路',
            car_id:'00005',
            car_type:'警卫车辆',
            first_level:'中',
            delay_time:'10（83%）',
            avg_speed:'50（83%）'
          },{
            time:'11:00',
            road:'人民路',
            car_id:'00005',
            car_type:'警卫车辆',
            first_level:'中',
            delay_time:'10（83%）',
            avg_speed:'50（83%）'
          },{
            time:'11:00',
            road:'人民路',
            car_id:'00005',
            car_type:'警卫车辆',
            first_level:'中',
            delay_time:'10（83%）',
            avg_speed:'50（83%）'
          }
          ]
        }
      },
      mounted:function(){
        this.add_date_picker_show();
        window.open_map_road_icon = (node_id,title) =>{
          this.open_road_icon(node_id,title)
        };
        window.close_map_road_icon = (node_id,title) =>{
          this.close_road_icon(node_id,title)
        }
        window.close_map_window = ()=>{
          this.close_map_window()
        }

        //获取路口数据
        // this.showBMapPoint();
        this.getAllRoadInfo();
      },
      methods:{
        get_car_type(id){
          var type = this.car_style
          for(var i=0 ;i<type.length;i++){
            if(id==type[i].type){
              var car_type_name =type[i].name
            }
          }
          return car_type_name
        },
        data_to_time_stamp(date_string){
         var date =  new Date(date_string.replace(/-/g, "/"))
          console.log(date)
          return date/1000
        },
          time_stamp_to_data(time_stamp){
          var date = new Date(time_stamp);
          var Y = date.getFullYear() + '-';
          var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
          var D = date.getDate() + ' ';
          var h = date.getHours() + ':';
          var m = date.getMinutes();
          var s = date.getSeconds();
          return (M+D+h+m);
        },
        get_road_name(index,road_info){
          for(var i =0; i<road_info.length;i++){
            var name = ''
            if(index==i){
              name =road_info[i-1].node_name
            }
          }
          return name
        },
        getAllRoadInfo(){
          var self = this;
          this.$http.get('/index/nodes' + '?token=' + this.getHeader().token)
            .then((response) => {
              self.nodes = response.data.nodes
              console.log(this.nodes)
              self.showBMapPoint(response.data.nodes);
              return response.data;
            })
        },
        createOverLay(map,node){
          var self = this;
          //创建图标
          var pt = new BMap.Point(node.long, node.lat);
          //
          var isExist = this.findRoadIsOpen(node.node_id,node.node_name);
          var str_icon_path = isExist > -1 ? "/static/image/map/63.png" : "/static/image/map/red.png"
          var myIcon = new BMap.Icon(str_icon_path, new BMap.Size(40,40));
          var marker = new BMap.Marker(pt,{icon:myIcon});  // 创建标注
          marker.title = node.node_name;
          marker.id = node.node_id;
          marker.addEventListener("click", function(e){
            var index = self.findRoadIsOpen(node.node_id,node.node_name);
            var open_class;
            var close_class;
            var open_li_status;
            var close_window;
            if (index == -1)
            {
              open_class = "'close-button'";
              close_class = "'open-button'";
              open_li_status = '';
              close_window = '';
            }
            else
            {
              open_class = "'open-button'";
              close_class = "'close-button'";
              open_li_status = " class='open-road-li-color'";
              close_window = " onclick='close_map_window()'"
            }
            var title = "\"" +e.target.title + "\"";
            var sContent = "<div style=''  class='box-content'>" +
              "<div class='control-button'>" +
              "<div class="+open_class+" onclick='open_map_road_icon(" + e.target.id + "," +title +")'>开启</div>"+
              "<div class="+close_class+" onclick='close_map_road_icon(" + e.target.id + "," +title +")'>关闭</div>"
              +"</div>"+
              "<div class='select-options'><ul>" +
              "<li"+open_li_status+close_window+">Default</li>"+
              "<li"+open_li_status+close_window+">Minimize Delay</li>"+
              "<li"+open_li_status+close_window+">Minimize</li>"+
              "</ul>" +
              "</div>"
              +"</div>";

            var infoBox = new BMap.InfoWindow(sContent);
            map.openInfoWindow(infoBox, e.target.point)
            self.current_road = e.target.title;
          });
          return marker;
        },
        showBMapPoint(nodes){
          var self = this;
          var map = window.congestionMap;
          // 百度地图API功能
          for (var i = 0; i < nodes.length; i ++)
          {
            var marker = self.createOverLay(map,nodes[i])
            map.addOverlay(marker);

          }
        },
        add_date_picker_show:function(){
          $( "#date_picker" ).datepicker({
            showMonthAfterYear: true,
            changeMonth: true,
            changeYear: true,
            buttonImageOnly: true,
            dateFormat: 'yymmdd',
            onSelect: function(dateText, inst) {
            }
          });
        },
        //修改优先方式
        set_first_style_item:function (index) {
          for (var i = 0; i < this.first_setting_info.first_style.length; i ++)
          {
            if (this.first_setting_info.first_style[i] == this.first_items.first_style[index])
            {
              this.first_setting_info.first_style.splice(index,1);
              return;
            }
          }
          this.first_setting_info.first_style.push(this.first_items.first_style[index]);
        },
        //修改等级
        changeLevel:function (index,str_level) {
          console.log(index)
          for (var i = 0; i < this.first_setting_info.first_data.length; i ++)
          {
            console.log("for")
            if (this.first_setting_info.first_data[i].car_name == this.first_items.first_car[index])
            {
              console.log("if")
              this.first_setting_info.first_data[i].level = str_level;
              return;
            }
          }
        },
        changeFirstCar:function(index){
          for (var i = 0; i < this.first_setting_info.first_data.length; i ++)
          {
            if (this.first_setting_info.first_data[i].car_name == this.first_items.first_car[index])
            {
              this.first_setting_info.first_data.splice(i,1);
              return;
            }
          }
          this.first_setting_info.first_data.push({car_name:this.first_items.first_car[index],level:'高'});
        },
        change_start_open_first_pass_status:function () {
          this.start_open_first_pass = !this.start_open_first_pass;
        },
        change_is_global_status:function () {
          this.is_global = !this.is_global;
        },
        filter_button_click :function () {
          var self =this
          console.log(this.week_data_picker_1[0])
          var a =this.week_data_picker_1[0]
          var start_time = self.data_to_time_stamp(a)
          var end_time = this.data_to_time_stamp((self.week_data_picker_1)[1])
          console.log(this.week_date_picker_node)
          this.$http.get('/priorityVehicle/getPriorityVehicleData?startTime='+start_time+'&endTime='+end_time+'&cross='+this.week_date_picker_node+'&type='+this.filter_car_type+
            '&token=' + this.getHeader().token).then((result) => {
            this.filter_all_record_info = result.data
            console.log(result)
            })
        },
        //判断数据事件是否合法
        judge_input_time_correct:function(time){
          var reg = new RegExp(/^(([01]?\d)|(2[0-3])):[0-5]\d$/);
          //开始判断
          if(!reg.test(time)) alert("时间输入的格式不合法!");
        },
        //地图标注打开按钮
        open_road_icon(node_id,title){
          var map = window.congestionMap;
          var isExist = this.findRoadIsOpen(node_id,title);
          if (isExist == -1) {
            var arrMarkers = map.getOverlays();
            this.open_road_record_List.push({node_id:node_id,road_name:title});
            for (var i = 0; i < arrMarkers.length; i ++)
            {
              if (arrMarkers[i].id == node_id)
              {
                var node = {
                  long:arrMarkers[i].point.lng,
                  lat:arrMarkers[i].point.lat,
                  title:arrMarkers[i].title,
                  node_id:arrMarkers[i].id
                };
                map.removeOverlay(arrMarkers[i]);
                var new_marker = this.createOverLay(map,node);
                map.addOverlay(new_marker);
              }
            }
          }
          map.closeInfoWindow();
        },
        //地图图标关闭按钮
        close_road_icon(node_id,title){
          var map = window.congestionMap;
          var index = this.findRoadIsOpen(node_id,title);
          if (index != -1) {
            var arrMarkers = map.getOverlays();
            this.open_road_record_List.splice(index,1);
            for (var i = 0; i < arrMarkers.length; i ++)
            {
              if (arrMarkers[i].id == node_id)
              {
                var node = {
                  long:arrMarkers[i].point.lng,
                  lat:arrMarkers[i].point.lat,
                  title:arrMarkers[i].title,
                  node_id:arrMarkers[i].id
                };
                map.removeOverlay(arrMarkers[i]);
                var new_marker = this.createOverLay(map,node);
                map.addOverlay(new_marker);
              }
            }
          }
          map.closeInfoWindow();
        },
        close_map_window(){
          var map = window.congestionMap;
          map.closeInfoWindow();
        },
        findRoadIsOpen(node_id,title){
          var isExist = -1;
          for (var i = 0; i < this.open_road_record_List.length; i ++)
          {
            if (this.open_road_record_List[i].node_id == node_id)
            {
              isExist = i;
            }
          }
          return isExist;
        },

        getPassRecord(){
          // this.$http.get().then(())
        }
      }
    }
</script>

<style scoped>


  .CongestionMap_Legend i {
    margin-right: 5px;
  }
  .CongestionMap_Legend i, .CongestionMap_Legend span {
    font-size: 12px;
    color: #a7a7ac;
    line-height: 30px;
    text-align: center;
  }
  .first_pass_lineRow{
    margin: 0 5px !important;
  }
  .signal-lamp-container
  {
    height: 980px;
    position: relative
  }
  .nav-right-style{
    float: right;
    padding: 3px 0
  }
  .show-map-style{
    height: 980px;
  }
  .CongestionMap_Legend li {
    margin: 0 10px;
    border-bottom: 1px solid #a7a7ac;
  }

  .Dashboard_alarm_list span {
    font-size: 12px;
  }

  .Dashboard_box_card {
    border-radius: 1px;
    color: white !important;
    border: 0;
  }

  .Dashboard_clearfix {
    padding: 10px 30px;
    background: #353644;
    font-size: 15px;
  }

  .right-container{
    /*background: red;*/
    position: absolute;
    width: 530px;
    height: 960px;
    top: 10px;
    right: 15px;
    bottom: 10px;
  }
  .control-setting{
    width: 530px;
    height: 460px;
    background: rgba(41,41,54,0.7);
  }
  .control-setting-title{
    width: 530px;
    padding-left: 20px;
    height: 30px;
    line-height: 30px;
    color: #fff;
    background: #1f1f2c;
    box-sizing: border-box;
  }
  .control-setting-content{
    margin: 35px 0 0 52px;
    width: 431px;
    display: flex;
  }
  .first_method{
    font-size: 14px;
    width: 155px;
    height: 150px;
  }
  .first_method-title{
    font-size: 18px;
    color: #fff;
    height: 19px;
    margin-bottom: 21px;
  }
  .car_level_item{
    display: flex;
    width: 260px;
  }
  .first_car_level{
    width: 200px;
  }
  .first_method_item{
    height: 16px;
    margin-bottom: 21px;
    color: #c9c9cc;
    display: flex;
  }
  .empty-retangle{
    width: 11px;
    height: 11px;
    border-radius: 1px;
    border: 1px solid #ed894b;
    margin: 2.5px 5px 0 0;
  }
  .empty-circle{
    width: 12px;
    height: 12px;
    border-radius: 6px;
    border: 1px solid #ed894b;
    margin: 2.5px 0 0 17px;
  }
  .fill-retangle{
    width: 7px;
    height: 7px;
    border-radius: 1px;
    background-color: #ed894b;
    margin: 2px;
  }
  .fill-circle{
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background-color: #ed894b;
    margin: 2px;
  }
  .car_info{
    width: 130px;
    margin-right: 50px;
  }
  .level{
    padding-left: 10px;
  }
  .level-introduce{
    margin:20px 0  19px 52px;
  }
  .level-introduce-item{
    height: 16px;
    margin-bottom: 8px;
    color: #c9c9cc;
    /*display: flex;*/
  }
  .split-line{
    height: 1px;
    width: 470px;
    margin: 0 auto;
    background-color: #c9c9cc;

  }
  .start-use-first-pass{
    margin: 13px auto ;
    width: 470px;
    display: flex;
  }
  .left-start-use{
    display: flex;
    font-size: 16px;
    width: 150px;
  }
  .left-start-use span{
    margin-right: 10px;
  }
  .left-start-use .empty-circle{
    margin: 6px;
  }
  .right-start-use{
    display: flex;
    width: 320px;
    margin-left: 27px;
  }
  .right-start-use span{
    margin-left: 6px;
    color: #c9c9cc;
    margin-top: 2px;
  }
  .right-start-use .empty-retangle{
    margin-top: 6px !important;
  }
  .find-first-record
  {
    width: 530px;
    height: 160px;
    background: rgba(41,41,54,0.7);
    margin: 10px auto;
  }
  .filter-condition{
    width: 450px;
    display: flex;
    height: 55px;
    margin: 0 auto;
    padding-top: 18px;
    align-items: center;
  }
  .show-filter-item{
    width:150px;
    height: 100%;
    /*margin-right: 8px;*/
    margin-left: 10px;
    align-items: center;
    margin-top: 5px;
  }
  .filter-condition :last-child{
    margin-right: 0;
  }
  .item-key-intro{
    width: 100%;
    text-align: center;
    color: #fff;
    height: 16px;
    font-size: 12px;
  }
  .item-info-show{
    width: 100%;
    height: 20px;
    background: #54576a;
    margin-top: 3px;
    text-align: center;
    line-height: 20px;
    padding-top: 2px;
    font-size: 12px;
    white-space: nowrap;
    color: #c9c9cc;
  }
  .show-filter-item input{
    outline: none;
    border: none;
  }
  .filter-input{
    display: flex;
    width: 450px;
    margin: 10px auto;
  }
  .filter-input input{
    width: 372px;
    height: 20px;
    outline: none;
    border: none;
  }
  .filter-button{
    width: 70px;
    height: 20px;
    font-size: 12px;
    background: #54576a;
    margin-left: 20px;
    text-align: center;
    line-height: 20px;
    margin-top: 3px;
  }
  .history-record{
    width: 530px;
    height: 310px;
    background: rgba(41,41,54,0.7);
    margin: 10px auto;
    /*display: flex;*/
  }
  .right-record-number{
    float:right;
    padding-right: 20px;
  }
  .show-record-title{
    margin: 20px 15px;
    display: flex;
    color: #c9c9cc;
    display: flex;
    align-items: center;
  }
  .show-record-item{
    margin: 20px 15px;
    display: flex;
    color: #c9c9cc;
    font-size: 12px;
  }
  .record-item{
    width: 70px;
    padding: 0 10px 0 0;
    text-align: center;
  }
  .record-item_road{
    width: 140px;
    padding: 0 10px 0 0;
    text-align: center;
  }
  .record-split-line{
    width: 475px;
    margin: 0 auto;
    height: 1px;
    background: #c9c9cc;
  }
  .show-all-record-content{
    height: 190px;
    overflow-y: auto;
    display: flex;
  }
  .show_time_left {
    width: 60px;
    /*margin-right: 10px;*/
    align-items: center;
  }

  .big-item {
    width: 150px;
    text-align: center;
    align-items: center;
  }
  .search-button {
    background: #54576a;
    border: none;
    color: rgb(148, 148, 154);
    height: 28px;
    padding: 0 20px;
    border-radius: 0;
    margin: auto;
  }
  .selected_road {
    text-align: center;
    color: #fff;
    line-height: 10px;
    font-size: 10px;
    width: 50%;
  }
  .range-time-title {
    display: flex;
    justify-content: space-between;
    /*padding-bottom: 5px;*/
    height: 15px;
    box-sizing: border-box;
  }
  .area_titleSelect {
    width: 100%;
    height: 20px;
    margin-top: 3px;
    background-color: #505666;
  }
  .search_button_div{
    width: 450px;
    display: flex;
    height: 40px;
    margin: 0 auto;
    padding-top: 10px;
    align-items: center;
  }
  /*.show-all-record-content ::-webkit-scrollbar{*/
    /*width: 5px;*/
    /*background: #2b2b36;*/
  /*}*/
  /*.show-all-record-content ::-webkit-scrollbar-track {*/
    /*background-color: #eee;*/
  /*}*/

</style>
<style>
  .min .el-input__inner,
  .min .el-select-dropdown__item {
    font-size: 11px !important;
    text-align: left;
    /*background-color: #545768;*/
    /*border: 1px solid #545768;*/
    background-color: #545768;
    border: none;
  }

  .min input {
    padding-left: 10px
  }
</style>
