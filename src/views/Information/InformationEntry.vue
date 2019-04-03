<template>
  <div>
    <Area></Area>
    <div class="layout">
      <div class="top">
        <div class="select_div">
          <span>先选择录入的信息的类型:</span>
          <el-select v-model="select_type" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-button
            style="margin-left:20px;background:#353643;color:#ffffff;border:none"
            @click="select_type_btn"
          >确定</el-button>
        </div>
        <div class="btn_parent">
          <el-button class="submit_btn" @click="submit">确定录入</el-button>
        </div>
      </div>
      <div class="content">
        <div>
          <ul class="ul_info">
            <li v-for="item in data_info" :key="item.name" >
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
import Area from "../../components/Area/Area";
import XLSX from "xlsx";

export default {
  name: "auth",
  data() {
    return {
      data: [],
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
      loading: true,
      params: {
        username: "q",
        password: "q"
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
      select_type: ""
    };
  },
  methods: {
    date_string(data){
      data.forEach(item =>{
        if(item.flag){
          item.value = this.formatDate(item.value, 'yyyy-MM-dd hh:mm:ss')
        }
      })
      return data
    },
    get_data(params) {
      this.$http.post("/AllCarInformation/allData", params).then(data => {
        this.tableData = data.data.data;
        this.count = data.data.total;
        this.loading = false;
      });
    },
    select_type_btn() {
      if (this.select_type == "登记车辆") {
        this.data_info = this.reg_info;
      } else if (this.select_type == "违章车辆") {
        this.data_info = this.violation_info;
      } else if (this.select_type == "车主信息") {
        this.data_info = this.people_info;
      }
      console.log(this.select_type);
    },
    submit() {
      if(this.select_type ==""){
         this.$message({
            message: "请选择录入信息的类型！",
            type: "warning"
          });
      }else{
        var status = true;
        this.data_info.forEach(item => {
          if (item.value == "") {
            status = false;
            this.$message({
              message: "信息不能为空，请确认填写完整！",
              type: "warning"
            });
          }
        });
        if(status){
          let params ={
            type : this.select_type,
            data : this.date_string(this.data_info)
          }
          this.$http.post("/Information/entry", params).then(data => {
            if(data.data.status =="1"){
              this.$message({
                message: '信息录入成功！',
                type: 'success'
              });
              this.data_info.forEach(item =>{
                item.value = ""
              })
            }else{
              this.$message({
                message: "信息录入失败，请重新录入！",
                type: "warning"
              });
            }
          });
        }
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
.layout {
  margin: 10px 10px 0 10px;
}
.top {
  width: 100%;
  height: 80px;
  /* background-color: #fff; */
  display: flex;
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
  font-size: 20px
}
.time_picker {
  width: 300px;
}
.submit_btn{
  height: 50px;
  background-color: rgb(53, 54, 67);
  border: none;
  color:#fff;
  font-size: 16px;
}
.btn_parent{
  width: 200px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

<style>
</style>

