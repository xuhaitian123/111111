<template>
  <div>
    <Area></Area>
    <div class="layout_table">
      <div class="title_div">
        <el-button type="text" style="width:80px" size="small" @click="exportExcel">导出Excel表格</el-button>
        <div class="title">所有车主登记信息数据概览表</div>
        <el-button type="text" style="width:80px" size="small" ></el-button>
      </div>
      <el-table
        v-loading="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
        :data="tableData"
        @sort-change="handleSortChange"
        style="width:100%;"
        max-height="750"
        :default-sort="{prop: 'birthDate', order: 'descending'}"
        id="out-table"
      >
        <el-table-column prop="name" label="车主姓名" ></el-table-column>
        <el-table-column prop="ID" label="身份证号码" ></el-table-column>
        <el-table-column prop="address" label="家庭住址"></el-table-column>
        <el-table-column prop="telphone" label="联系方式" ></el-table-column>
        <el-table-column prop="sex" label="性别" ></el-table-column>
        <el-table-column prop="birthDate" label="出生日期" ></el-table-column>
        <el-table-column prop="license_num" label="车牌号" ></el-table-column>
        <el-table-column prop="reg_time" label="登记时间" sortable ></el-table-column>
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
  </div>
</template>

<script>
import Area from "../../components/Area/Area";
import FileSaver from "file-saver";
import XLSX from "xlsx";

export default {
  name: "AllCarInformation",
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
      this.$http.post("/AllPeopleInformation/allData", params).then(data => {
        this.tableData = data.data.data;
        this.count = data.data.total;
        this.loading = false;
      });
    },
    exportExcel() {
      /* 从表生成工作簿对象 */
      let xlsxParam = { raw: true };
      var wb = XLSX.utils.table_to_book(
        document.querySelector("#out-table"),
        xlsxParam
      );
      console.log(wb)
      /* 获取二进制字符串作为输出 */
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        bookSST: true,
        type: "array"
      });
      console.log(wbout)
      try {
        FileSaver.saveAs(
          //Blob 对象表示一个不可变、原始数据的类文件对象。
          //Blob 表示的不一定是JavaScript原生格式的数据。
          //File 接口基于Blob，继承了 blob 的功能并将其扩展使其支持用户系统上的文件。
          //返回一个新创建的 Blob 对象，其内容由参数中给定的数组串联组成。
          new Blob([wbout], { type: "application/octet-stream" }),
          //设置导出文件名称
          "车主数据.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
    handleSortChange(column) {
      if (column.order == "descending") {
        this.params.start = 0;
        this.currentPage = 1;
        this.params.sort.type = "desc";
        this.params.sort.name = column.prop;
        this.get_data(this.params);
      } else if (column.order == "ascending") {
        this.params.start = 0;
        this.currentPage = 1;
        this.params.sort.type = "asc";
        this.params.sort.name = column.prop;
        this.get_data(this.params);
      }
    },
    handleSizeChange(val) {
      this.currentPage = 1;
      this.params.start = 0;
      this.params.length = val;
      this.loading = true;
      this.get_data(this.params);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.params.start = this.params.length * (val - 1);
      this.get_data(this.params);
    }
  },
  components: {
    Area
  },
  created() {
    this.get_data(this.params);
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

