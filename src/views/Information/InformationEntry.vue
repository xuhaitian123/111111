<template>
  <div>
    <Area></Area>
    <div class="layout">
      <div class="top">
        <div class="select_div">
          <span>选择录入的信息的类型:</span>
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
      </div>
      <div class="content">
        <div>
          <ul class="ul_info">
            <li><span>车主信息</span><el-input v-model="input" clearable="true" placeholder="请输入内容"></el-input></li>
            <li><span>车主信息</span><el-input v-model="input" clearable="true" placeholder="请输入内容"></el-input></li>
            <li><span>车主信息</span><el-input v-model="input" clearable="true" placeholder="请输入内容"></el-input></li>
            <li><span>车主信息</span><el-input v-model="input" clearable="true" placeholder="请输入内容"></el-input></li>
            <li><span>车主信息</span><el-input v-model="input" clearable="true" placeholder="请输入内容"></el-input></li>
            <li><span>车主信息</span><el-input v-model="input" clearable="true" placeholder="请输入内容"></el-input></li>
            <li><span>车主信息</span><el-input v-model="input" clearable="true" placeholder="请输入内容"></el-input></li>
            <li><span>车主信息</span><el-input v-model="input" clearable="true" placeholder="请输入内容"></el-input></li>
            <li><span>车主信息</span><el-input v-model="input" clearable="true" placeholder="请输入内容"></el-input></li>
            <li><span>车主信息</span><el-input v-model="input" clearable="true" placeholder="请输入内容"></el-input></li>
            <li><span>车主信息</span><el-input v-model="input" clearable="true" placeholder="请输入内容"></el-input></li>
            <li><span>车主信息</span><el-input v-model="input" clearable="true" placeholder="请输入内容"></el-input></li>
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
      reg_info:{

      },
      loading: true,
      params: {
        username: "q",
        password: "q",
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
    get_data(params) {
      this.$http.post("/AllCarInformation/allData", params).then(data => {
        this.tableData = data.data.data;
        this.count = data.data.total;
        this.loading = false;
      });
    },
    select_type_btn() {
      console.log(this.select_type);
    }
  },
  components: {
    Area
  },
  created() {},
  mounted() {}
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
.ul_info{
  width: 400px;
}
.ul_info li{
  display: flex;
  padding: 2px;
  margin: 1px;
}
.ul_info li span{
  display: block;
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}
























</style>

<style>
</style>

