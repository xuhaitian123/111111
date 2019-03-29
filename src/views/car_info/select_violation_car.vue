<template>
  <div id="to_pdf_1">
    <Area></Area>
    <!-- <el-table
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    :data="tableData"
    style="width:90%;"
    max-height="800"
    :row-class-name="tableRowClassName"
    :default-sort = "{prop: 'date', order: 'descending'}"
    id="out-table"
    >
    <el-table-column
      prop="car_name"
      label="车辆名称"
      
      width="180">
    </el-table-column>
    <el-table-column
      prop="car_type"
      label="车辆类型"
      
      width="180">
    </el-table-column>
    <el-table-column
      prop="car_color"
      label="车辆颜色">
    </el-table-column>
    <el-table-column
      prop="license_num"
      label="车牌号"
      
      width="180">
    </el-table-column>
    <el-table-column
      prop="people_name"
      label="车主姓名"
      
      width="180">
    </el-table-column>
    <el-table-column
      prop="is_check"
      label="是否年检">
    </el-table-column>
    <el-table-column
      prop="is_accident"
      label="是否发生过事故"
      
      width="180">
    </el-table-column>
    <el-table-column
      prop="reg_city"
      label="车辆登记地区"
      
      width="180">
    </el-table-column>
    <el-table-column
      prop="reg_time"
      label="登记时间"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small">编辑</el-button>
      </template>
    </el-table-column>
    </el-table>-->
    <!-- <button @click="exportExcel">导出Excel表格</button> -->
    <!-- <div class="block">
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[10, 200, 300, 400]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
    </div>-->

    <div class="title_div">
        <el-button @click="to_pdf">导出PDF</el-button>
      <div class="car_type_div">
        <span class="span_info">要查询的车辆类型选择</span>
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="license_div">
        <span class="span_info">车牌号关键字智能搜索</span>
        <el-autocomplete
          class="inline-input"
          value-key="name"
          prefix-icon="el-icon-search"
          v-model="license_num"
          :fetch-suggestions="querySearch"
          placeholder="请输入查询关键字"
          :trigger-on-focus="true"
        ></el-autocomplete>
        <el-button
          style="margin-left:20px;background:#353643;color:#ffffff;border:none"
          type="submit"
          @click="select"
        >搜索</el-button>
      </div>
    </div>
    <div class="info_div_body" >
      <div class="info_div_child" v-if="show_type == '登记车辆'"  id="to_pdf" >
        <span class="title_span"  >登记车辆信息</span>
        <span class="title_span"  v-show="false" >登记车辆信息</span>
      <ul class="ul_left" v-for="(item,index) in alldata" :key="index" >
        <li><span class="left_sapn">车主姓名：</span> <span class="info_value">{{item.people_name}}</span></li>
        <li><span class="left_sapn">车牌号：</span> <span class="info_value">{{item.license_num}}</span></li>
        <li><span class="left_sapn">车辆名称：</span> <span class="info_value">{{item.car_name}}</span></li>
        <li><span class="left_sapn">车辆类型：</span> <span class="info_value">{{item.car_type}}</span></li>
        <li><span class="left_sapn">车辆颜色：</span> <span class="info_value">{{item.car_color}}</span></li>
        <li><span class="left_sapn">车辆归属地：</span> <span class="info_value">{{item.home_loaction}}</span></li>
        <li><span class="left_sapn">是否发生过事故：</span> <span class="info_value">{{item.is_accident}}</span></li>
        <li><span class="left_sapn">是否年检：</span> <span class="info_value">{{item.is_check}}</span></li>
        <li><span class="left_sapn">登记地区：</span> <span class="info_value">{{item.reg_city}}</span></li>
        <li><span class="left_sapn">登记时间：</span> <span class="info_value">{{item.reg_time}}</span></li>
      </ul>
    </div>
      <div class="info_div_child" v-if="show_type == '违章车辆' ">
        <span class="title_span" >违章车辆信息</span>
      <ul class="ul_left" v-for="(item,index) in violation_car_info" :key="index">
        <li><span class="left_sapn">车主姓名：</span> <span class="info_value">{{item.people_name}}</span></li>
        <li><span class="left_sapn">车牌号：</span> <span class="info_value">{{item.license_num}}</span></li>
        <li><span class="left_sapn">车辆名称：</span> <span class="info_value">{{item.car_name}}</span></li>
        <li><span class="left_sapn">车辆类型：</span> <span class="info_value">{{item.car_type}}</span></li>
        <li><span class="left_sapn">车辆颜色：</span> <span class="info_value">{{item.car_color}}</span></li>
        <li><span class="left_sapn">是否年检：</span> <span class="info_value">{{item.is_check}}</span></li>
        <li><span class="left_sapn">是否发生过事故：</span> <span class="info_value">{{item.is_accident}}</span></li>
        <li><span class="left_sapn">违章类型：</span> <span class="info_value">{{item.violation_type}}</span></li>
        <li><span class="left_sapn">违章路段：</span> <span class="info_value">{{item.violation_road}}</span></li>
        <li><span class="left_sapn">违章时间：</span> <span class="info_value">{{item.violation_time}}</span></li>
        <li><span class="left_sapn" style="height:60px;line-height:60px;">处理描述：</span> <span class="info_value_description">{{item.description}}</span></li>
      </ul>
    </div>
    <div class="info_div_child" id="to_pdf3">
        <span class="title_span">车辆所有者信息</span>
      <ul class="ul_left" v-for="(item,index) in people_data" :key="index">
        <li><span class="left_sapn">车牌号：</span> <span class="info_value">{{item.license_num}}</span></li>
        <li><span class="left_sapn">车主姓名：</span> <span class="info_value">{{item.name}}</span></li>
        <li><span class="left_sapn">身份证号码：</span> <span class="info_value">{{item.ID}}</span></li>
        <li><span class="left_sapn">性别：</span> <span class="info_value">{{item.sex}}</span></li>
        <li><span class="left_sapn">出生日期：</span> <span class="info_value">{{item.birthDate}}</span></li>
        <li><span class="left_sapn">电话号码：</span> <span class="info_value">{{item.telphone}}</span></li>
        <li><span class="left_sapn">家庭住址：</span> <span class="info_value">{{item.address}}</span></li>
      </ul>
    </div>
  </div>
    </div>
</template>
<script>
import Area from "../../components/Area/Area";
import FileSaver from "file-saver";
import XLSX from "xlsx";

export default {
  name: "select_violation_car",
  data() {
    return {
      data: [],
      alldata: [
        {
          car_color: "",
          car_name: "",
          car_type:  "",
          home_loaction:  "",
          is_accident: "",
          is_check:  "",
          license_num:  "",
          people_name:  "",
          reg_city: "",
          reg_time:  "",
        }
      ],
      people_data: [
        {
          ID:  "",
          address:   "",
          birthDate:   "",
          license_num:   "",
          name:   "",
          sex:   "",
          telphone:   "",
        }
      ],
      show_type : "登记车辆",
      violation_car_info :[
        {
          car_color: "",
          car_name: "",
          car_type: "",
          description: "",
          is_accident: "",
          is_check: "",
          license_num: "",
          people_name: "",
          violation_road:"",
          violation_time: "",
          violation_type: "",
        }
      ],
      keyWords: "",
      license_num: "",
      results: [],
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      loading: true,
      params: {
        username: "q",
        password: "q",
        start: "1",
        length: "10"
      },
      options: [
        {
          value: "违章车辆",
          label: "违章车辆"
        },
        {
          value: "登记车辆",
          label: "登记车辆"
        }
      ],
      value: "",
      select_params: {
        username: "",
        password: "",
        license_num: ""
      }
    };
  },
  methods: {
    async querySearch(queryString, cb) {
      var user = {
        keyword: "%" + queryString + "%"
      };
      //这里是从后台获取数据
      await this.$http.post("select_key_word/allCarInfo", user).then(res => {
        console.log(res);
        this.restaurants = res.data;
        var restaurants = this.restaurants;
        var results = queryString ? this.searchData(queryString) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      });
    },
    searchData(issue_content) {
      return this.restaurants.filter(function(product) {
        return Object.keys(product).some(function(key) {
          return (
            String(product[key])
              .toUpperCase()
              .indexOf(issue_content) > -1
          );
        });
      });
      return this.products;
    },
    select() {
    //   this.alldata = [];
    //   this.people_data = [];
    //   this.violation_car_info = [];
      if (this.value == "") {
        this.$message({
          message: "请选择查询的车辆类型！",
          type: "warning"
        });
      } else if (this.license_num == "") {
        this.$message({
          message: "请输入查询的车牌号！",
          type: "warning"
        });
      } else {
        if (this.value == "违章车辆") {
          var url = "/select_car_info/violation_car_info";
        } else {
          var url = "/select_car_info/reg_car_info";
        }
        this.select_params.license_num = this.license_num;
        //请求数据
        this.$http.post(url, this.select_params).then(data => {
          if(this.value == "违章车辆"){
            this.show_type = "违章车辆"
            if(data.data.violation_car_info.length!==0){
              this.violation_car_info[0]=data.data.violation_car_info[0];
            }else{
              this.$message({
                message: "未查到此车辆的信息 ！",
                type: "warning"
              });
            }
          }else{
            this.show_type = "登记车辆"
            if(data.data.reg_car_info.length!==0){
              this.alldata[0] = data.data.reg_car_info[0];
            }else{
              this.$message({
                message: "未查到此车辆的信息 ！",
                type: "warning"
              });
            }
          }
          if(data.data.people_info.length!==0){
            this.people_data[0] = data.data.people_info[0];
          }
          else{
            //未查到数据
            this.$message({
              message: "未查到此车辆的信息 ！",
              type: "warning"
            });
          }
        });
      }
    },
    to_pdf(){
      this.getPdf('#to_pdf,#to_pdf3','车辆查询')
    },
    get_pie_data() {
      this.$http
        .post("/AllViolationInformation/allData", this.params)
        .then(data => {
          //   console.log(data);
          this.tableData = data.data;
          this.count = data.data.count;
          this.loading = false;
        });
    },
  },
  components: {
    Area
  },
  created() {
    // this.get_pie_data();
  },
  mounted() {}
};
</script>
<style scoped>
#pie {
  width: 500px;
  height: 400px;
  background-color: #1d1d2c;
}
.block {
  float: right;
  margin: 10px 20px 0 0;
}
.accident {
  background-color: red;
}
.search-text {
  color: red;
}
.el-autocomplete-suggestion {
  width: 150px;
}
.inline-input {
  width: 160px;
}
.title_div {
  width: 100%;
  height: 60px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.car_type_div {
  height: 50px;
  width: 400px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.license_div {
  height: 100%;
  width: 50%;
}
.span_info {
  font-size: 18px;
  margin-right: 15px;
}
.license_div {
  height: 50px;
  width: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.left_sapn{
  margin-right: 15px;
  display: block;
  padding: 0 5px;
  width: 160px;
  height: 40px;
  line-height: 30px;
  text-align: left;
  font-size: 15px;
}
.ul_left li {
  display: flex;
  align-self: center;
  padding-bottom:5px; 
  justify-content: center
}
.input{
  width: 200px;
}
.info_div_body{
  width: 100%;
  height: 700px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding:  100px 100px 0 100px;
  box-sizing: border-box;
}
.title_span{
  display: block;
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: skyblue;
  font-size: 20px;
  margin-bottom: 5px;
}
.info_div_child{
  width: 600px;
  height: 600px;
  background-color: #282635;
  border-radius: 50px;

}
.info_value{
  width: 250px;
  height: 40px;
  background-color: rgb(25,25,38);
  border-radius: 10px;
  line-height: 40px;
  text-align: center;
  color: #ffffff
}
.info_value_description{
  width: 250px;
  height: 60px;
  background-color: rgb(25,25,38);
  border-radius: 10px;
  /* line-height: 60px; */
  text-align: center;
  color: #ffffff;
  overflow: auto;
  padding: 5px;
}











</style>
<style>
.el-pagination .el-select .el-input {
  margin: 0 !important;
  width: 100% !important;
}
.accident {
  background-color: red;
}
.highlighted {
  background-color: red;
}
</style>

