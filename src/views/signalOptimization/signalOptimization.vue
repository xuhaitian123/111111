<template>
<div>
  <Area></Area>
  <div class="main">
    <div class="header">
      <img src="../../../static/map/toLeft.png" class="header_img" >
      <span class="header-span">拥堵情况变化趋势分析</span>
    </div>
    <div class="main_up">
    <div class="main_up_left">
      <div class="main_up_child_head">
        <span>周拥堵情况查看，对比</span>
      </div>
      <div class="main_up_left_middle">
      <div class="main_up_left_left_head">
          <div class="show_time_left">
            <div class="time_left">开始时间</div>
            <input class="time_left_show" placeholder="选择日期" v-model="left_date_picker_start" id="left_date_picker_start" type="text"  />
          </div>
          <div class="show_time_left">
            <div class="time_left">结束时间</div>
            <input class="time_left_show" placeholder="选择日期" v-model="left_date_picker_end" id="left_date_picker_end" type="text"  />
          </div>
          <div class="show-filter-item_road">
            <div class="selected_road">选择路口</div>
            <el-select v-model="currentCity" size="mini" class="area_titleSelect" placeholder="" :popper-append-to-body="false">
              <el-option
                v-for="item in cityList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
      </div>
      <div class="main_up_left_right_head">
        <div class="show-filter-item_road">
          <div class="selected_road">选择路口</div>
          <el-select v-model="currentCity" size="mini" class="area_titleSelect" placeholder="" :popper-append-to-body="false">
            <el-option
              v-for="item in cityList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="show_time_right">
          <div class="time_right">开始时间</div>
          <input class="time_left_show" placeholder="选择日期" v-model="right_date_picker_start" id="right_date_picker_start" type="text"  />
        </div>
        <div class="show_time_right">
          <div class="time_right">结束时间</div>
          <input class="time_left_show" placeholder="选择日期" v-model="right_date_picker_end" id="right_date_picker_end" type="text"  />
        </div>
      </div>

      </div>

      <div class="hot_map">
        <div class="hot_map_left">
          <div class="hot_map_left_middle">
            <div class="contrast">
              <div class="time_right">对比时段</div>
              <input class="time_left_show" placeholder="选择日期" v-model="right_date_picker_start" id="right_date_picker_start" type="text"  />
            </div>
            <div class="map_left">

            </div>
          </div>
        </div>
        <div class="hot_map_right">
          <div class="hot_map_right_middle">
            <div class="contrast">
              <div class="time_right">对比时段</div>
              <input class="time_left_show" placeholder="选择日期" v-model="right_date_picker_start" id="right_date_picker_start" type="text"  />
            </div>
            <div class="map_right">

            </div>
          </div>
        </div>
      </div>
    </div>


    <div class="main_up_middle">
      <div class="main_up_child_head">
        <span>道路天（24hr）趋势分析</span>
      </div>
    </div>
      <div class="main_up_right">
        <div class="main_up_child_head">
          <span>道路协同分析</span>
        </div>
      </div>
    </div>
    <div class="main_down">
      <div class="main_down_head">
        <span>天（24hr）趋势分析</span>
      </div>
      <div class="main_down_down">
      </div>
    </div>
  </div>
</div>
</template>

<script>
  import Area from '../../components/Area/Area'
  export default {
        name: "signal-optimization",
    data(){
          return{
            left_date_picker_start:"",
            left_date_picker_end:"",
            left_filter_road_name:"",
            right_date_picker_start:"",
            right_date_picker_end:"",
            right_filter_road_name:""
          }
    },
    components: {
      Area,
    },
    mounted:function(){
          this.add_date_picker_show()
    },
    methods:{
      add_date_picker_show:function(){
        $( "#left_date_picker_start,#left_date_picker_end,#right_date_picker_start,#right_date_picker_end" ).datepicker({
          showMonthAfterYear: true,
          changeMonth: true,
          changeYear: true,
          buttonImageOnly: true,
          dateFormat: 'yy/mm/dd',
          onSelect: function(dateText, inst) {
          }
        });
      },
    }
    }
</script>

<style scoped>
  .main{
    width: 1638px;
    height: 935px;
    background-color:#252531;
    margin: 10px 10px
  }
.header{
  width: 1638px;
  height: 40px;
  background-color: #353644;
  display: flex;
  align-items: center;
}
  .header-span{
    line-height: 19px;
    color: #ffffff;
    margin-left: 20px;
  }

  .header_img{
    height: 18px;
    margin-left: 30px;
  }
  .main_up{
    width: 1618px;
    height: 650px;
    display: flex;
    padding: 10px 10px;
  }
  .main_up_left{
    width: 530px;
    height: 650px;
    background-color: #333643
  }
  .main_up_middle{
    width: 560px;
    height: 650px;
    background-color: #333643;
    margin: 0 15px
  }
  .main_up_right{
    width: 528px;
    height: 650px;
    background-color: #333643;
  }
  .main_up_child_head{
    height: 30px;
    background-color: #1D1D2C;
    padding: 0 20px;
    display: flex;
    align-items: center;
  }
  .main_up_child_head span{
    line-height: 19px;
    color: #ffffff;
  }
  .main_down{
    width: 1620px;
    height: 215px;
    padding: 0 10px;
  }
  .main_down_head{
    height: 35px;
    background-color: #1D1D2C;
    display: flex;
    align-items: center;
    padding: 0 20px;
  }
  .main_down_head span {
    line-height: 19px;
    color: #ffffff;
  }
  .main_down_down{
    height: 180px;
    background-color:#333643 ;
  }
  .main_up_left_left_head,
  .main_up_left_right_head{
    height: 30px;
    padding-top: 25px;
    display: flex;
    align-items: center;
    padding-left: 30px;
  }
  .show_time_right{
    width: 60px;
    height: 30px;
    margin-left: 10px;
    align-items: center;
  }
  .contrast{
    width: 60px;
    height: 30px;
    margin-left: 50px
  }

  .show_time_left{
    width: 60px;
    height: 30px;
    margin-right: 10px;
    align-items: center;
  }
  .show-filter-item_road{
    width: 75px;
    height: 30px;
    align-items: center;
  }
  .filter-condition :last-child{
    margin-right: 0;
  }
  .selected_road,
  .time_left,
  .time_right{
    text-align: center;
    color: #fff;
    line-height: 10px;
    font-size: 10px;
  }
  .time_left_show{
    width: 60px;
    height: 20px;
    background: #54576a;
    margin-top: 3px;
    text-align: center;
    line-height: 20px;
    padding-top: 2px;
    font-size: 12px;
    color: #c9c9cc;
    outline: none;
    border: none;
  }
  .area_titleSelect{
    width: 75px;
    height: 20px;
    margin-top: 3px;
    background-color: #505666;
  }
  .item-info-show_road{
    width: 75px;
    height: 20px;
    background: #54576a;
    margin-top: 3px;
    text-align: center;
    line-height: 20px;
    padding-top: 2px;
    font-size: 12px;
    color: #c9c9cc;
    outline: none;
    border: none;
  }
  .main_up_left_middle{
    display: flex;
  }
  .hot_map{
    height: 482px;
    padding: 0 84px 0 101px;
    margin-top:10px;
    display: flex
  }
  .hot_map_left{
    width: 160px;
    background-color: #333643
  }
  .hot_map_right{
    width: 160px;
    background-color: #333643;
    margin-left: 30px;
  }
  .hot_map_right_middle,
  .hot_map_left_middle{
    height: 35px;
    width: 160px;
    padding-top: 5px;
  }
  .map_left,
  .map_right{
    width: 160px;
    height: 438px;
    padding: 5px 0 0 0;
  }
  input:focus::-webkit-input-placeholder {
    opacity:0.1;
  }
</style>
