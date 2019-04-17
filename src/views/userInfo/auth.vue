<template>
  <div>
    <Area></Area>
    <div class="layout_table">
      <div class="title_div">
        <el-button type="text" style="width:80px" size="small" @click="exportExcel">导出Excel表格</el-button>
        <div class="title">所有车辆登记信息数据概览表</div>
        <el-button type="text" style="width:80px" size="small" ></el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Area from "../../components/Area/Area";
import XLSX from "xlsx";
import axios from 'axios'
export default {
  name: "auth",
  data() {
    return {
      data: [],
      tableData: [],
      currentPage: 1,
      loading: true,
      count: 0,
      params: {
        username: "q",
        password: "q",
        start: 0,
        length: 15,
        sort: {
          name: "reg_time",
          type: "desc"
        }
      }
    };
  },
  methods: {
    get_data(params) {
      axios.get("/all_city_reg/city_loaction").then(data => {
        console.log(data)
      });
    },
    
  },
  components: {
    Area
  },
  created() {
    this.get_data()
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
.layout_table {
  width: 100%;
  padding: 10px 10px 0 10px;
  height: 100%;
  box-sizing: border-box;
}
.title_div{
  width: 100%;
  display: flex;
}
.title{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center
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

