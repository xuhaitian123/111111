<template>
  <div>
    <Area></Area>
    <el-upload
        class="upload-demo"
        ref="upload"
        :on-change="importExcel"
        :show-file-list="showfilelist"
        :limit= "limmit"
        :on-exceed="exceed"
        :on-remove="remove"
        action="http://localhost:3000/upload/res">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        <div class="el-upload__tip" slot="tip">只能上传Excel表格文件，每次上传一个文件,支持xlsx,xlc,xlm,xls,xlt,xlw,csv格式</div>
    </el-upload>
  </div>
</template>


<script>
import Area from "../../components/Area/Area";
import XLSX from "xlsx";

export default {
  name: "car_info_table",
  data() {
    return {
        xlsxJson:[],
        showfilelist:true,
        limmit : 1,
        params: {
            username : "test",
            password : "123456",
        }
    };
  },
  methods: {
    submitUpload(){
        console.log(this.xlsxJson)
        this.params.data = this.xlsxJson;
        this.$http.post("/upload/carInfo", this.params).then(data => {
          console.log(data)
          if(data.data.status == "2"){
            this.$message({
                message: '恭喜你，上传成功！',
                type: 'success'
            });
          }else if(data.data.status == "3"){
              this.$message.error('文件上传失败！');
          }
        });
    },
    remove(event, file, fileList){
        this.$refs.upload.clearFiles();
    },
    exceed(file, fileList){
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
</style>
