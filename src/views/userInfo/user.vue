<template>
  <div>
    <Area></Area>
    <div class="layout_table">
      <div class="add">
        <el-button class="add_user_button" size="small" @click="add_user">添加用户</el-button>
        <el-button class="add_user_button" size="small" @click="show_table_button">所有账号</el-button>
      </div>
      <div class="add_user_div" v-if="show_table">
         <el-table
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :data="tableData"
        @sort-change="handleSortChange"
        style="width:100%;"
        max-height="750"
        :default-sort="{prop: 'create_time', order: 'descending'}"
        id="out-table"
      >
        <el-table-column prop="username" label="账号" ></el-table-column>
        <el-table-column prop="password" label="密码"></el-table-column>
        <el-table-column prop="nickname" label="昵称" ></el-table-column>
        <el-table-column prop="create_time" sortable label="创建时间"></el-table-column>
        <el-table-column prop="department" label="所属部门" ></el-table-column>
        <el-table-column prop="creator" label="创建人" ></el-table-column>
        <!-- <el-table-column prop="is_accident" label="是否发生过事故" ></el-table-column>
        <el-table-column prop="reg_city" label="车辆登记地区" ></el-table-column>
        <el-table-column prop="home_loaction" label="车辆归属地" ></el-table-column>
        <el-table-column prop="reg_time" label="登记时间" sortable ></el-table-column> -->
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[15, 30, 45, 60, 100]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="count"
        ></el-pagination>
      </div>
      </div>
      <div class="add_user_div add_form" v-if="!show_table">
        <div class="form">
          <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="username">
              <el-input type="username" v-model="ruleForm2.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="昵称" prop="nickname">
              <el-input type="nickname" v-model="ruleForm2.nickname" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="所属部门" prop="department">
              <el-input type="department" v-model="ruleForm2.department" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input  v-model="ruleForm2.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="创建时间" prop="create_time">
              <el-date-picker
              class="date_picker"
                v-model="ruleForm2.create_time" autocomplete="off"
                type="datetime"
                placeholder="选择日期时间"
                default-time="12:00:00">
              </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm2')">添加</el-button>
              <el-button @click="resetForm('ruleForm2')">重置</el-button>
          </el-form-item>
        </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Area from "../../components/Area/Area";
import XLSX from "xlsx";

export default {
  name: "user",
  data() {
      var username = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }else{
          callback()
        }
      };
      var create_time = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }else{
          callback()
        }
      };
      var department = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('所属部门不能为空'));
        }else{
          callback()
        }
      };
      var nickname = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('昵称不能为空'));
        }else{
          callback()
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          // if (this.ruleForm2.checkPass !== '') {
          //   this.$refs.ruleForm2.validateField('checkPass');
          // }
          callback();
        }
      };
      // var validatePass2 = (rule, value, callback) => {
      //   if (value === '') {
      //     callback(new Error('请再次输入密码'));
      //   } else if (value !== this.ruleForm2.pass) {
      //     callback(new Error('两次输入密码不一致!'));
      //   } else {
      //     callback();
      //   }
      // };
    return {
      data: [],
      tableData: [],
      currentPage: 1,
      loading: true,
      value1 :"", 
      count: 0,
      show_table : true,
      add : false,
      params: {
        username: "q",
        password: "q",
        start: 0,
        length: 15,
        sort: {
          name: "reg_time",
          type: "desc"
        }
      },
      ruleForm2: {
        pass: '',
        create_time: '',
        username: '',
        department: '',
        nickname: '',
      },
      rules2: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        create_time: [
          { validator: create_time, trigger: 'blur' }
        ],
        username: [
          { validator: username, trigger: 'blur' }
        ],
        department: [
          { validator: department, trigger: 'blur' }
        ],
        nickname: [
          { validator: nickname, trigger: 'blur' }
        ],
        // checkPass: [
        //   { validator: validatePass2, trigger: 'blur' }
        // ],
        // age: [
        //   { validator: checkAge, trigger: 'blur' }
        // ]
      }
    };
  },
  methods: {
    get_data() {
      this.$http.get("/user/getUser").then(data => {
        console.log(data)
        this.tableData = data.data;
        this.count = data.data.total;
        this.loading = false;
      });
    },
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleClick(row){
        this.$http.post("/user/deleteUser",{id : row.id}).then(data => {
        if(data.data.code == 200){
          this.$message({
            message: '删除成功',
            type: 'success',
            duration: 2000
          });
        }else if(data.data.code == 500){
          this.$message.error('删除失败，未知错误');
        }
        this.get_data()
      });
      },
      add_user() {
        this.show_table = false
      },
      show_table_button(){
        this.show_table = true,
        this.add = false
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          console.log(formName)
          console.log(valid)
          console.log(this.ruleForm2)
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
  },
  components: {
    Area
  },
  created() {},
  mounted() {
    this.get_data()
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
.layout_table {
  width: 100%;
  padding: 10px 10px 0 10px;
  height: 100%;
  box-sizing: border-box;
  /* margin:  0 auto; */
  /* height: 500px; */
  /* background-color: #fff; */
  /* display: flex;
  justify-content: center;
  align-items: center */
}
.title_div {
  width: 100%;
  display: flex;
}
.title {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.add_user_div{
  width: 100%;
  height: 800px;
  /* background-color: red; */
}
.add{
  width: 100%;
  height: 50px;
  line-height: 50px
}
.add_user_button{
  background-color: #282635;
  color: #ffffff;
  border: none;
  height: 30px;
}
.form{
  width: 30%;
  height: 40%;
  padding: 150px;
  border-radius: 20px;
  background-color: #282635;
}
.add_form{
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center
}
.date_picker{
  width: 100%
}
.el-form-item__label{
  color: #ffffff
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
</style>

