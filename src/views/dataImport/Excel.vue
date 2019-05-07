<template>
  <div>
    <Area></Area>
    <div class="top">
      <div class="select_div">
        <span>导入的数据的类型：</span>
        <el-select v-model="select_type" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="upload_div">
        <el-upload
          class="upload-demo"
          ref="upload"
          :on-change="importExcel"
          :show-file-list="showfilelist"
          :limit="limmit"
          :on-exceed="exceed"
          :on-remove="remove"
          action="http://localhost:3000/upload/res"
        >
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button
            style="margin-left: 10px;"
            size="small"
            type="success"
            @click="submitUpload"
          >上传到服务器</el-button>
          <div
            class="el-upload__tip"
            slot="tip"
          >只能上传Excel表格文件，每次上传一个文件,支持xlsx,xlc,xlm,xls,xlt,xlw,csv格式</div>
        </el-upload>
      </div>
      <!-- <div class="select_div">
        <span>下载模板</span>
        <el-select v-model="download_type" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-button @click="download_template">确定下载</el-button>
      </div> -->
    </div>
    <div class="middle">
      <span class="title">上传的数据详情展示：共{{total}}条数据</span>
      <div class="show_data">
        <ul v-if="Exceldata.length" class="ul_show">
          <li v-for="item in Exceldata" :key="item.name">{{item}}</li>
        </ul>
        <div
          v-if="show_tip"
          style="width:100%;height:450px;line-height:450px;text-align:center;font-size:35px;"
        >暂无数据上传！</div>
      </div>
      <span class="footer">请确认好信息正确再上传！</span>
    </div>
  </div>
</template>


<script>
import Area from "../../components/Area/Area";
import XLSX from "xlsx";
export default {
  name: "car_info_table",
  data() {
    return {
      total: "0",
      Exceldata: [],
      show_tip: true,
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
      select_type: "", //选择上传的类型
      download_type: "", //选择下载模板的类型
      xlsxJson: [],
      showfilelist: true,
      limmit: 1,
      params: {
        username: "test1",
        password: "123456"
      }
    };
  },
  methods: {
    submitUpload() {
      var url = "";
      if (this.select_type !== "") {
        if (this.select_type == "登记车辆") {
          url = "/upload/carInfo";
        }
        if (this.select_type == "违章车辆") {
          url = "/upload/violation_car_info";
        }
        if (this.select_type == "车主信息") {
          url = "/upload/people_info";
        }
      } else {
        this.$message({
          message: "请选择上传的类型后，再进行上传操作！",
          type: "warning"
        });
        return;
      }
      if (this.xlsxJson.length == 0) {
        this.$message({
          message: "请添加文件后，再进行上传操作！",
          type: "warning"
        });
        return;
      }
      this.params.data = this.xlsxJson;
      this.$http.post(url, this.params).then(data => {
        console.log(data);
        if (data.data.status == "2") {
          this.$message({
            message: "恭喜你，上传成功！",
            type: "success"
          });
          this.total = 0;
          this.remove();
          this.Exceldata = [];
          this.show_tip = true;
        } else if (data.data.status == "3") {
          this.$message.error("文件上传失败！");
        }
      });
    },
    remove(event, file, fileList) {
      this.$refs.upload.clearFiles();
      this.xlsxJson = [];
      this.Exceldata = [];
      this.show_tip = true;
    },
    exceed(file, fileList) {
      this.$message.error("每次最多上传一个文件!");
    },
    importExcel(file) {
      const types = file.name.split(".")[1];
      const fileType = ["xlsx", "xlc", "xlm", "xls", "xlt", "xlw", "csv"].some(
        item => item === types
      );
      if (!fileType) {
        this.$message.error("格式错误！请重新选择");
        return;
      }
      this.file2Xce(file).then(tabJson => {
        if (tabJson && tabJson.length > 0) {
          this.xlsxJson = tabJson[0].sheet;
          this.total = this.xlsxJson.length;
          this.show_tip = false;
          this.Exceldata = this.xlsxJson;
          console.log(this.xlsxJson.length);
          // xlsxJson就是解析出来的json数据,数据格式如下
          // [
          //   {
          //     sheetName: sheet1
          //     sheet: sheetData
          //   }
          // ]
        }
      });
    },
    file2Xce(file) {
      return new Promise(function(resolve, reject) {
        const reader = new FileReader();
        reader.onload = function(e) {
          const data = e.target.result;
          this.wb = XLSX.read(data, {
            type: "binary"
          });
          const result = [];
          this.wb.SheetNames.forEach(sheetName => {
            result.push({
              sheetName: sheetName,
              sheet: XLSX.utils.sheet_to_json(this.wb.Sheets[sheetName])
            });
          });
          resolve(result);
        };
        reader.readAsBinaryString(file.raw);
      });
    },
    // download_template() {
    //   if (this.download_type == "") {
    //     var download_template_data = [];
    //     this.$message.error("请选择下载模板的类型！");
    //     return;
    //   } else if (this.download_type == "登记车辆") {
    //     download_template_data = [
    //       {
    //         车辆名称: "",
    //         车辆类型: "",
    //         车辆颜色: "",
    //         车牌号: "",
    //         车主姓名: "",
    //         是否年检: "",
    //         是否发生过事故: "",
    //         车辆登记地区: "",
    //         车辆归属地: "",
    //         登记时间: ""
    //       }
    //     ];
    //   } else if (this.download_type == "违章车辆") {
    //   } else if (this.download_type == "车主信息") {
    //   }
    // }
  },
  components: {
    Area
  }
};
</script>
<style scoped>
.top {
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  padding: 10px;
}
.select_div {
  width: 400px;
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
.upload_div {
  height: 100%;
  width: 400px;
  background-color: #282635;
  border-radius: 30px;
  display: flex;
  align-items: center;
  margin-left: 20px;
  padding: 10px;
  box-sizing: border-box;
}
.el-upload__tip {
  font-size: 15px;
  width: 100%;
}
.tip {
  height: 100%;
  /* background-color: #fff; */
  color: #fff;
}
.middle {
  width: 100%;
  padding: 10px;
  height: 500px;
  box-sizing: border-box;
}
.title {
  display: block;
  width: 100%;
  height: 80px;
  font-size: 25px;
  font-family: "Courier New", Courier, monospace;
  color: #ffffff;
  line-height: 80px;
  text-align: center;
  background-color: #313233;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
}
.footer {
  display: block;
  width: 100%;
  height: 50px;
  font-size: 25px;
  font-family: "Courier New", Courier, monospace;
  color: #ffffff;
  line-height: 50px;
  text-align: center;
  background-color: #313233;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
}
.show_data {
  width: 100%;
  height: 450px;
  /* border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px; */
  background-color: #282635;
}
.ul_show {
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
  /* max-width: 500px; */
  max-height: 450px;
  overflow: auto;
}
</style>

<style>
.el-upload-list {
  width: 330px;
}
</style>