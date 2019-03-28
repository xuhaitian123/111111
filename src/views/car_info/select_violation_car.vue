<template>
  <div>
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
    <div style="width : 500px;height :500px">
      <ul class="ul_left" v-for="(item,index) in alldata" :key="index">
        <li><span class="left_sapn">车主姓名：</span> <el-input class="input" placeholder="请输入内容"  v-model="item.people_name"  clearable> </el-input></li>
        <li><span class="left_sapn">车牌号：</span> <el-input class="input" placeholder="请输入内容"  v-model="item.license_num"  clearable> </el-input></li>
        <li><span class="left_sapn">车辆名称：</span> <el-input class="input" placeholder="请输入内容"  v-model="item.car_name"  clearable> </el-input></li>
        <li><span class="left_sapn">车辆类型：</span> <el-input class="input" placeholder="请输入内容"  v-model="item.car_type"  clearable> </el-input></li>
        <li><span class="left_sapn">车辆颜色：</span> <el-input class="input" placeholder="请输入内容"  v-model="item.car_color"  clearable> </el-input></li>
        <li><span class="left_sapn">车辆归属地：</span> <el-input class="input" placeholder="请输入内容"  v-model="item.home_loaction"  clearable> </el-input></li>
        <li><span class="left_sapn">是否发生过事故：</span> <el-input class="input" placeholder="请输入内容"  v-model="item.is_accident"  clearable> </el-input></li>
        <li><span class="left_sapn">是否年检：</span> <el-input class="input" placeholder="请输入内容"  v-model="item.is_check"  clearable> </el-input></li>
        <li><span class="left_sapn">登记地区：</span> <el-input class="input" placeholder="请输入内容"  v-model="item.reg_city"  clearable> </el-input></li>
        <li><span class="left_sapn">登记时间：</span> <el-input class="input" placeholder="请输入内容"  v-model="item.reg_time"  clearable> </el-input></li>
      </ul>
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
      alldata: [],
      people_data: [],
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
        this.$http.post(url, this.select_params).then(data => {
          if(data.data.reg_car_info.length!==0){
            this.alldata.push(data.data.reg_car_info[0]);
            console.log(this.alldata);
          }
          else{
            //未查到数据
          }
        });
      }
    },
    get_pie_data() {
      this.$http
        .post("/AllViolationInformation/allData", this.params)
        .then(data => {
          //   console.log(data);
          this.tableData = data.data;
          this.count = data.data.count;
          //   this_.init()
          //   console.log(this_.tableData);
          this.loading = false;
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
      this.currentPage4 = 1;
      console.log(`当前页: ${val}`);
    }
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
  width: 150px;
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
  margin-right: 5px;
  display: block;
  padding: 0 5px;
  width: 160px;
  height: 30px;
  line-height: 30px;
  text-align: left;
  font-size: 15px;
}
.ul_left li {
  display: flex;
  align-self: center;
  padding-bottom:5px; 
}
.input{
  width: 200px;
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

