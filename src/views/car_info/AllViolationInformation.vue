<template>
  <div>
    <Area></Area>
    <div class="layout_table">
      <div class="title_div">
        <el-button type="text" style="width:80px" size="small" @click="exportExcel">导出Excel表格</el-button>
        <div class="title">所有违章车辆信息数据概览表</div>
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
        :row-class-name="tableRowClassName"
        :default-sort="{prop: 'violation_time', order: 'descending'}"
        id="out-table"
      >
        <el-table-column prop="car_name" label="车辆名称"></el-table-column>
        <el-table-column prop="car_type" label="车辆类型"></el-table-column>
        <el-table-column prop="car_color" label="车辆颜色"></el-table-column>
        <el-table-column prop="license_num" label="车牌号"></el-table-column>
        <el-table-column prop="people_name" label="车主姓名"></el-table-column>
        <el-table-column prop="is_check" label="是否年检"></el-table-column>
        <el-table-column prop="is_accident" label="是否发生过事故"></el-table-column>
        <el-table-column prop="violation_road" label="违章路段"></el-table-column>
        <el-table-column prop="violation_type" label="违章类型"></el-table-column>
        <el-table-column prop="description" label="处罚措施"></el-table-column>
        <el-table-column prop="violation_time" label="违章时间" sortable></el-table-column>
        <!-- <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看描述</el-button>
          </template>
        </el-table-column> -->
      </el-table>
      <div class="block">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[15, 30, 45,60,100]"
          :page-size="15"
          layout="total, sizes, prev, pager, next, jumper"
          :total="count"
        ></el-pagination>
        <el-dialog title="违章车辆处理措施" :visible.sync="centerDialogVisible" width="30%">
          <div class="modal_span">{{msg}}</div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
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
      tableData: [],
      currentPage: 1,
      loading: true,
      msg: "",
      centerDialogVisible: false,
      count: 0, //数据的总数
      params: {
        username: this.getCookie('username'),
        password: this.getCookie('password'),
        start: "1",
        length: "15",
        sort: {
          name: "violation_time",
          type: "DESC    "
        }
      }
    };
  },
  methods: {
    handleClick(row) {
      this.centerDialogVisible = true;
      this.msg = row.description;
      console.log(row);
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.is_accident == "是") {
        return "accident";
      }
      return "";
    },
    get_data(params) {
      this.$http.post("/AllViolationInformation/allData", params).then(data => {
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
          "违章车辆数据.xlsx"
        );
      } catch (e) {
        if (typeof console !== "undefined") console.log(e, wbout);
      }
      return wbout;
    },
    handleSortChange(column) {
      console.log(column);
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
.modal_span {
  width: 100%;
  overflow: auto;
  word-break: break-all;
}
.layout_table {
  width: 100%;
  padding: 10px 10px 0 10px;
  height: 100%;
  box-sizing: border-box
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

