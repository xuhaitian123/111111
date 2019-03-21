<template>
  <div>
    <Area></Area>
    <el-table
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
  </el-table>
          <button @click="exportExcel">导出Excel表格</button>
  <div class="block">
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
      tableData: [],
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      loading :true,
      params: {
        username: "",
        password: "",
        start: "",
        length: ""
      }
    };
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (row.is_accident == "是") {
        return "accident";
      }
      return "";
    },
    get_pie_data() {
      var this_ = this;
      this.$http
        .post("/AllViolationInformation/allData", {
          username: this.username,
          password: this.password
        })
        .then(data => {
          //   console.log(data);
          this_.tableData = data.data;
          this_.count = data.data.count;
          //   this_.init()
          //   console.log(this_.tableData);
          this_.loading = false
        });
    },
    exportExcel() {
      /* 从表生成工作簿对象 */
      var wb = XLSX.utils.table_to_book(document.querySelector("#out-table"));
      /* 获取二进制字符串作为输出 */
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      try {
        FileSaver.saveAs(
          //Blob 对象表示一个不可变、原始数据的类文件对象。
          //Blob 表示的不一定是JavaScript原生格式的数据。
          //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
          //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
          new Blob([wbout], { type: "application/octet-stream" }),
          //设置导出文件名称
          "sheetjs.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
    handleSizeChange(val) {
      console.log(val);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  },
  components: {
    Area
  },
  created() {
    this.get_pie_data();
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

