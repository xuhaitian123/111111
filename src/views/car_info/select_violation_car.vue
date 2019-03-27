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
  </el-table> -->
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
  </div> -->
 <input v-model="keyWords" type="text" placeholder="请输入关键词"  @input="handleQuery">
   <ul>
       <li v-for="(item,index) in results" :key='index' v-html='item.name' style="background:white;color:black"></li>
   </ul>
   <smart-input @sync="syncValueType" :list="valueTypeList"></smart-input>
  </div>
</template>
  <script src="//code.jquery.com/jquery-1.10.2.js"></script>
  <script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
<script>
import Area from "../../components/Area/Area";
import FileSaver from "file-saver";
import XLSX from "xlsx";
Object.defineProperty(Number.prototype, 'circlePlus', {value: function (length, count = 1) {
    return (this + count % length + length) % length;
}});


export default {
  name: "select_violation_car",
  data() {
    return {
      data: [],
      tableData: [],
      keyWords: '',
      results: [],
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      loading :true,
      params: {
        username: "q",
        password: "q",
        start: "1",
        length: "10"
      }
    };
  },
  component:('smart-input', {
        template: `<div class="friendSearchContainer">
            <input v-model="input" class="form-control smartInput"
                placeholder="输入文本自动检索，上下键选取，回车选中，可点选"
                data-toggle="tooltip"
                @focus="init" @keyup="search" @blur="blur" />
            <ul v-show="searching" class="friendSearchList col-sm-8">
                <li v-for="(item, index) in filtered" :class="{active: focusIndex===index}" @click.stop="clickOne">{{ item }}</li>
            </ul>
            <div v-show="searching" class="friendSearchModal" @click="searching=false"></div>
        </div>`,
        props: ['list', 'multiple', 'value'],
        data() {
            return {
                searching: false,
                timer: null,
                filtered: {},
                input: '',
                focusIndex: 0,
                invalidData: '',
            };
        },
        computed: {
            listLength() {
                return this.filtered.length;
            },
            key() {
                return /(?:.*,)*(.*)$/.exec(this.input)[1];
            }
        },
        methods: {
            // 调整联想搜索面板的大小和位置
            init(e) {
                this.searching = true;
                this.filtered = this.list;
            },
            // 失去焦点时关闭面板，主要是按下tab键切换时的作用，随之带来的是所有相关的事件都要清除该定时器
            blur() {
                this.timer = setTimeout(() => {
                    this.searching = false;
                }, 200);
            },
            // 联想搜索的主体功能函数
            search(e) {
                e = e || window.event;
                // clearTimeout(this.timer);
                // 通过上下键和回车选择
                if (e.keyCode === 38) {
                    this.focusIndex = this.focusIndex.circlePlus(this.listLength);
                    // $('.friendSearch').scrollTop($(selectee).index(selected) * 26 - 26);
                } else if (e.keyCode === 40) {
                    this.focusIndex = this.focusIndex.circlePlus(this.listLength, -1);
                } else if (e.keyCode === 13) {
                    this.selectOne();
                } else {
                    // 进行可选项过滤
                    this.filtered = this.list.filter((item) => {
                        return item.toLowerCase().includes(this.key.toLowerCase());
                    });
                }
            },
            clickOne(e) {
                clearTimeout(this.timer);
                e = e || window.event;
                let value = $(e.target).text();
                if (this.multiple) {
                    let arr = this.input.split(',');
                    arr.splice(arr.length, 1, value);
                    this.input = arr.join(',') + ',';
                } else {
                    this.input = value;
                }
                $('input', $(this.$el)).focus();
            },
            // 选择一个参数
            selectOne(e) {
                let value = this.filtered[this.focusIndex];
                if (this.multiple) {
                    let arr = this.input.split(',');
                    arr.splice(arr.length, 1, value);
                    this.input = arr.join(',') + ',';
                } else {
                    this.input = value;
                }
            },
        },
        watch: {
            value(val) {
                this.input = val;
            },
            input(val) {
                let inputArr = val.split(',');
                if (this.multiple) {
                    inputArr.pop();
                    let invalidData = [];
                    inputArr.forEach(item => {
                        if (!this.list.includes(item)) {
                            invalidData.push(item);
                        }
                    });
                    let $input = $('input', $(this.$el));
                    if (invalidData.length) {
                        $input.attr('title', invalidData.join(',') + '数据不合法');
                        $input.tooltip();
                    } else {
                        $input.tooltip('hide');
                    }
                }
                this.$emit('sync', this.input);
            },
        }
    }),
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (row.is_accident == "是") {
        return "accident";
      }
      return "";
    },
    get_pie_data() {
      // var this_ = this;
      this.$http.post("/AllViolationInformation/allData", this.params)
        .then(data => {
          //   console.log(data);
          this.tableData = data.data;
          this.count = data.data.count;
          //   this_.init()
          //   console.log(this_.tableData);
          this.loading = false
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
      this.currentPage4 = 1
      console.log(`当前页: ${val}`);
    },
    //关键词提示
    clearTimer () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
    },
    handleQuery (event) {
      this.clearTimer()
      console.log(event.timeStamp)
      this.timer = setTimeout(() => {
        console.log(event.timeStamp)
        this.$http.post('/select_key_word/violationCarInfo',{keyword:this.keyWords+"%"}).then(res => {
          console.log(res.data)
          this.changeColor(res.data)
        })
        // }
      }, 2000)
    },

    changeColor (resultsList) {
      resultsList.map((item, index) => {
        console.log(this.keyWords)
        // console.log('item', item)
        if (this.keyWords && this.keyWords.length > 0) {
          // 匹配关键字正则
          let replaceReg = new RegExp(this.keyWords, 'g')
          // 高亮替换v-html值
          let replaceString =
            '<span class="search-text">' + this.keyWords + '</span>'
          resultsList[index].name = item.name.replace(
            replaceReg,
            replaceString
          )
        }
      })
      this.results = []
      this.results = resultsList
    }
  
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
  background-color: #1d1d2c;
}
.block {
  float: right;
  margin: 10px 20px 0 0;
}
.accident {
  background-color: red;
}
.search-text{
color: red;
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

