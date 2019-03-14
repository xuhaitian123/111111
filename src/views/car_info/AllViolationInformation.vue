<template>
  <div>
    <Area></Area>
    <el-table
    :data="tableData"
    style="width: 90%;"
    max-height="800"
    :row-class-name="tableRowClassName"
    :default-sort = "{prop: 'date', order: 'descending'}"
    >
    <el-table-column
      prop="car_name"
      label="车辆名称"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="car_type"
      label="车辆类型"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="car_color"
      label="车辆颜色">
    </el-table-column>
    <el-table-column
      prop="license_num"
      label="车牌号"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="people_name"
      label="车主姓名"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="is_check"
      label="是否年检">
    </el-table-column>
    <el-table-column
      prop="is_accident"
      label="是否发生过事故"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="reg_city"
      label="车辆登记地区"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="reg_time"
      label="登记时间"
      sortable
      width="180">
    </el-table-column>
  </el-table>
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="40">
    </el-pagination>
  </div>
  </div>
</template>

<script>
import Area from "../../components/Area/Area";

export default {
  name: "AllViolationInformation",
  data() {
    return {
      data: [],
      tableData: [],
    };
  },
  methods: {
    tableRowClassName({row, rowIndex}){
        if(row.is_accident == "是"){
            return "accident"
        }
        console.log(row)
        return '' ;
    },
    get_pie_data() {
      var this_ = this;
      this.$http.post("/AllViolationInformation/allData",
        {
          username: this.username,
          password: this.password
        })
        .then(data => {
            console.log(data)
          this_.tableData = data.data;
          this_.count = data.data.count
        //   this_.init()
          console.log(this_.tableData);
        });
    },
  },
  components: {
    Area
  },
  created() {
    this.get_pie_data();
  },
  mounted() {

  }
};
</script>
<style scoped>
#pie {
  width: 500px;
  height: 400px;
  background-color: #1D1D2C;
}
.block{
    float: right;
    margin:  10px 20px 0 0;
}
.accident{
    background-color:red;
}
</style>

<style>
.el-pagination .el-select .el-input{
    margin: 0 !important;
    width: 100% !important
}
.accident{
    background-color:red;
}
</style>

