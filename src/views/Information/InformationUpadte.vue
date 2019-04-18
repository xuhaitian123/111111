<template>
  <div>
    <Area></Area>
    <div class="title_div">
      <div class="car_type_div">
        <span class="span_info">要更新的车辆类型选择</span>
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

    <div class="info_div_body" ref="imageWrapper">
      <div class="content">
        <div>
          <ul class="ul_info">
            <li v-for="item in data_info" :key="item.name">
              <span>{{item.name}}</span>
              <el-input
                class="time_picker"
                v-if="!item.flag"
                v-model="item.value"
                clearable
                placeholder="请输入内容"
              ></el-input>
              <el-date-picker
                class="time_picker"
                v-if="item.flag"
                v-model="item.value"
                type="datetime"
                placeholder="选择日期时间"
              ></el-date-picker>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import html2Canvas from "html2canvas";
import Area from "../../components/Area/Area";
import FileSaver from "file-saver";
import XLSX from "xlsx";

export default {
  name: "select_violation_car",
  data() {
    return {
      data: [],
      dataURL: "",
      data_info: [],
      reg_info: [
        {
          flag: false,
          name: "车主姓名",
          value: ""
        },
        {
          flag: false,
          name: "车牌号",
          value: ""
        },
        {
          flag: false,
          name: "车辆名称",
          value: ""
        },
        {
          flag: false,
          name: "车辆类型",
          value: ""
        },
        {
          flag: false,
          name: "车辆颜色",
          value: ""
        },
        {
          flag: false,
          name: "车辆归属地",
          value: ""
        },
        {
          flag: false,
          name: "是否发生过事故",
          value: ""
        },
        {
          flag: false,
          name: "是否年检",
          value: ""
        },
        {
          flag: false,
          name: "登记地区",
          value: ""
        },
        {
          flag: true,
          name: "登记时间",
          value: ""
        }
      ],
      violation_info: [
        {
          flag: false,
          name: "车主姓名",
          value: ""
        },
        {
          flag: false,
          name: "车牌号",
          value: ""
        },
        {
          flag: false,
          name: "车辆名称",
          value: ""
        },
        {
          flag: false,
          name: "车辆类型",
          value: ""
        },
        {
          flag: false,
          name: "车辆颜色",
          value: ""
        },
        {
          flag: false,
          name: "是否发生过事故",
          value: ""
        },
        {
          flag: false,
          name: "是否年检",
          value: ""
        },
        {
          flag: false,
          name: "违章类型",
          value: ""
        },
        {
          flag: false,
          name: "违章路段",
          value: ""
        },
        {
          flag: true,
          name: "违章时间",
          value: ""
        },
        {
          flag: false,
          name: "处理描述",
          value: ""
        }
      ],
      people_info: [
        {
          flag: false,
          name: "车牌号",
          value: ""
        },
        {
          flag: false,
          name: "车主姓名",
          value: ""
        },
        {
          flag: false,
          name: "身份证号码",
          value: ""
        },
        {
          flag: false,
          name: "性别",
          value: ""
        },
        {
          flag: true,
          name: "出生日期",
          value: ""
        },
        {
          flag: false,
          name: "电话号码",
          value: ""
        },
        {
          flag: false,
          name: "家庭住址",
          value: ""
        }
      ],
      alldata: [
        {
          car_color: "",
          car_name: "",
          car_type: "",
          home_loaction: "",
          is_accident: "",
          is_check: "",
          license_num: "",
          people_name: "",
          reg_city: "",
          reg_time: ""
        }
      ],
      people_data: [
        {
          ID: "",
          address: "",
          birthDate: "",
          license_num: "",
          name: "",
          sex: "",
          telphone: ""
        }
      ],
      // show_type: "登记车辆",
      violation_car_info: [
        {
          car_color: "",
          car_name: "",
          car_type: "",
          description: "",
          is_accident: "",
          is_check: "",
          license_num: "",
          people_name: "",
          violation_road: "",
          violation_time: "",
          violation_type: ""
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
          value: "登记车辆",
          label: "登记车辆"
        },
        {
          value: "违章车辆",
          label: "违章车辆"
        },
        {
          value: "车主信息",
          label: "车主信息"
        }
      ],
      value: "", //显示现在是查询的是什么类型的车
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
      // console.log(this.show_type);
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
        // if (this.value == "违章车辆") {
        //   this.data_info = this.violation_info;
        //   var url = "/select_car_info/violation_car_info";
        // } else {
        //   var url = "/select_car_info/reg_car_info";
        // }
        this.select_params.license_num = this.license_num;
        //请求数据
        this.$http.post('url', this.select_params).then(data => {
          console.log(this.value);
          if (this.value == "违章车辆") {
            // this.show_type = "违章车辆";1
            if (data.data.violation_car_info.length !== 0) {
              for (var key in this.violation_car_info[0]) {
                this.violation_car_info[0][key] =
                  data.data.violation_car_info[0][key];
              }
            } else {
              this.$message({
                message: "未查到此车辆的信息 ！",
                type: "warning"
              });
            }
          } else if(this.value == "登记车辆"){
            // this.show_type = "登记车辆";
            this.data_info = this.reg_info;
            if (data.data.reg_car_info.length !== 0) {
              for (var key in this.alldata[0]) {
                this.alldata[0][key] = data.data.reg_car_info[0][key];
              }
            } else {
              this.$message({
                message: "未查到此车辆的信息 ！",
                type: "warning"
              });
            }
          }else{
            this.data_info =  this.people_info;
          }
          if (data.data.people_info.length !== 0) {
            this.people_data[0] = data.data.people_info[0];
          } else {
            //未查到数据
            this.$message({
              message: "未查到此车辆的信息 ！",
              type: "warning"
            });
          }
        });
      }
    }
  },
  components: {
    Area
  },
  created() {},
  mounted() {
    this.data_info = this.reg_info;
  }
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
.left_sapn {
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
  padding-bottom: 5px;
  justify-content: center;
}
.input {
  width: 200px;
}
.info_div_body {
  width: 100%;
  height: 700px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 100px 100px 0 100px;
  box-sizing: border-box;
}
.title_span {
  display: block;
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: skyblue;
  font-size: 20px;
  margin-bottom: 5px;
}
.info_div_child {
  width: 600px;
  height: 600px;
  background-color: #282635;
  border-radius: 50px;
}
.info_value {
  width: 250px;
  height: 40px;
  background-color: rgb(25, 25, 38);
  border-radius: 10px;
  line-height: 40px;
  text-align: center;
  color: #ffffff;
}
.info_value_description {
  width: 240px;
  height: 60px;
  background-color: rgb(25, 25, 38);
  border-radius: 10px;
  /* line-height: 60px; */
  text-align: center;
  color: #ffffff;
  overflow: auto;
  padding: 5px;
  box-sizing: border-box;
}
.load_img {
  display: block;
  width: 150px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background-color: rgb(53, 54, 67);
  color: #ffffff;
  border-radius: 10px;
  text-decoration: none;
}

.content {
  width: 100%;
  height: 720px;
  /* background-color: blue */
}
.select_div {
  width: 500px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20px;
  background-color: #282635;
  border-radius: 30px;
}
.el-select {
  width: 145px;
  margin-left: 15px;
}
.ul_info {
  margin-top: 40px;
  width: 100%;
  height: 450px;
  display: flex;
  flex-flow: wrap;
  justify-content: center;
}
.ul_info li {
  display: flex;
  padding: 2px;
  margin: 5px;
  width: 600px;
  height: 60px;
  border-radius: 20px;
  line-height: 60px;
  background-color: #282635;
  float: left;
}
.ul_info li span {
  display: block;
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}
.time_picker {
  width: 300px;
}
.submit_btn {
  height: 50px;
  background-color: rgb(53, 54, 67);
  border: none;
  color: #fff;
  font-size: 16px;
}
.btn_parent {
  width: 200px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
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

