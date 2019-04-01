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
      <span class="tip">上传注意的注意事项 </span>
    </div>
    <div class="middle">
      <span class="title">上传的数据详情展示：共{{total}}条数据</span>
      <div class="show_data"></div>
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
      total : "0",
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
      xlsxJson: [],
      showfilelist: true,
      limmit: 1,
      params: {
        username: "test",
        password: "123456"
      }
    };
  },
  methods: {
    submitUpload() {
      var url = "";
      if(this.select_type !==""){
        if(this.select_type == "登记车辆"){url =  "/upload/carInfo"}
        if(this.select_type == "违章车辆"){url =  "/upload/violation_car_info"}
        if(this.select_type == "车主信息"){url =  "/upload/people_info"}
        
      }else{
        this.$message({
          message: '请选择上传的类型后，再进行上传操作！',
          type: 'warning'
        });
        return
      }
      if(this.xlsxJson.length == 0){
        this.$message({
          message: '请添加文件后，再进行上传操作！',
          type: 'warning'
        });
        return
      }
      this.params.data = this.xlsxJson;
      this.$http.post(url, this.params).then(data => {
        console.log(data);
        if (data.data.status == "2") {
          this.$message({
            message: "恭喜你，上传成功！",
            type: "success"
          });
          this.remove();
        } else if (data.data.status == "3") {
          this.$message.error("文件上传失败！");
        }
      });
    },
    remove(event, file, fileList) {
      this.$refs.upload.clearFiles();
      this.xlsxJson = [];
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
          this.total = this.xlsxJson.length
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
    }
  },
  components: {
    Area
  }
};
</script>
<style scoped>

.top{
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  padding: 10px

}
.select_div{
  width: 400px;
  height: 60px;
  /* line-height: 60px; */
  display: flex;
  align-items: center;
  justify-content: center
}
.el-select{
  width: 145px;  
  margin-left: 15px;
}
.upload_div{
  height: 100%;
  width: 400px;
  /* background-color: #fff; */
  display: flex;
  align-items: center;
}
.el-upload__tip{
  font-size: 15px;
  width: 100%
}

.tip{
  height: 100%;
  /* background-color: #fff; */
  color: #fff
}
.middle{
  width: 100%;
  padding: 10px;
  height: 500px;
  box-sizing: border-box
}
.title{
  display: block;
  width: 100%;
  height: 80px;
  font-size: 25px;
  font-family: 'Courier New', Courier, monospace;
  color: #ffffff;
  line-height: 80px;
  text-align: center;
  background-color: #313233;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;

}
.show_data{
  width: 100%;
  height: 100%;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  background-color:#282635;
}






</style>

<style>
.el-upload-list{
  width: 330px;
}
</style>
