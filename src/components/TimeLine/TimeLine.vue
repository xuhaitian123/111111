<template>
  <div class='timeLine-main'>

    <div class="timeLine-container" @mousemove="changeTimer" @mouseup='stopChange' @mouseleave="stopChange">
      <div class="timeLine-day-container">
        <el-select v-model="checkedYear" placeholder="请选择">
          <el-option
            v-for="item in yearList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            :disabled="!item.disable">
          </el-option>
        </el-select>
        年
        <el-select v-model="checkedMonth" placeholder="请选择">
          <el-option
            v-for="item in monthList"
            :key="item.value"
            :label="item.value"
            :value="item.value"
            :disabled="item.disable">
          </el-option>
        </el-select>
        月
        <el-select v-model="checkedDay" placeholder="请选择">
          <el-option
            v-for="item in dayList"
            :key="item.value"
            :label="item.value"
            :value="item.value"
            :disabled="item.disable">
          </el-option>
        </el-select>
        日
        <img @click="restart" class="timeLine-time-reset" src="/static/timeLine/19.png">
      </div>
      <canvas id="timeLine-line" height="100">
      </canvas>
      <div class="timeLine-current-line" id='timeLine_line' @mousedown="stop" v-bind:style="{left: left+'px'}">
      </div>
    </div>

  </div>


</template>

<style scoped>
  .timeLine-main {
    width: 1574px;
    margin: auto;
    box-shadow: 5px 5px 5px #111;
    height: 100px;
    position: relative;
    background: rgb(54, 54, 66);
    box-sizing: border-box;
  }

  .timeLine-container {
    width: 1474px;
    margin: auto;
    height: 100px;
    position: relative;
    background: rgb(54, 54, 66);
    box-sizing: border-box;
    /*text-align: center  ;*/
  }

  .timeLine-day-container {
    position: absolute;
    top: 10px;
    right: 0;
    z-index: 99;
    color: #ffffff;
    display: flex;
    align-items: center;
    width: 440px;
    justify-content: space-between;
  }

  .timeLine-current-line {
    position: absolute;
    top: 0;
    width: 16px;
    height: 100%;
    background-size: cover;
    /*background-origin: 0.5;*/
    overflow: visible;
    z-index: 70;
    background: url("../../../static/timeLine/line.png") center;
    background-size: 16px 100%;
  }

  .timeLine-current-line image {
    position: absolute;
    width: 40px;
    height: 80px;
  }

  .timeLine-current-line-bottom {
    position: absolute;
    width: 0;
    height: 0;
    left: -10px;
    bottom: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid red;
  }

  .timeLine-time-reset {
    width: 25px;
    height: 25px;
  }

</style>

<script>
  export default {
    props: {
      isRealTime: {
        type: Boolean,
        default: true
      },
      isPauseTime: {
        type: Boolean,
        default: true
      }
    },
    data() {
      var that = this;
      return {
        space: 5.1,
        timeLineWidth: 1468.8,
        minSpace: 0.0017 ,
        startPosition: 0,
        endPosition: 0,
        isChangeTime: false,
        timer: '',
        left: -10,
        rate: 100,
        scale: 0,
        yearList: [{value: 2018, disable: true}, {value: 2017, disable: true}, {value: 2016, disable: true}],
        monthList: function (currentMonth) {
          return that.getMonthList(new Date().getMonth() + 1)
        }(),
        dayList: function () {
          var currentTime = new Date();
          var currentDay = currentTime.getDate();
          return that.getDayList(currentTime.getFullYear(), currentTime.getMonth() + 1, currentDay)
        }(),
        checkedYear: new Date().getFullYear(),
        checkedMonth: new Date().getMonth() + 1,
        checkedDay: new Date().getDate(),
      }
    },
    beforeDestroy(){
      clearInterval(this.timer)
    },
    mounted() {
      document.getElementById('timeLine-line').width = this.timeLineWidth + 50;
      this.initPosition();
      this.init();
      this.start()
    },
    methods: {
      restart() {
        clearInterval(this.timer);
        this.left = -10;
        this.start()
      },
      stopChange() {
        if(this.isChangeTime ){
          this.isChangeTime = false
          this.$emit('changeTime')
        }

      },
      start(e) {
        this.isChangeTime = false;
        this.timer = setInterval(() => {
          this.changePosition()
        }, this.rate)
      },
      changePosition() {
        if (this.isPauseTime == true)
        {
          this.getTimer();
          return;
        }
        if (this.isChangeTime || this.left >= this.timeLineWidth - 10) return;
        if (this.endPosition && this.startPosition) {
          let left = this.left + this.endPosition - this.startPosition;
          this.left = parseInt(left / (this.space)) * (this.space)
          this.endPosition = 0;
          this.startPosition = 0;
        }

        this.left += this.minSpace;
        this.getTimer()

      },
      stop(e) {
        this.isChangeTime = true;
        this.startPosition = e.clientX;
      },
      getTimer() {
        var seconds = (this.left + 10) / this.minSpace;

        var hour = parseInt(seconds / 60 / 60 / 10);
        var minuth = Math.floor(seconds / 60 / 10 % 60);


        var second = Math.floor(seconds / 10 % 60);
        var milliseconds = Math.floor(seconds % 10);

        var time = new Date(this.checkedYear + '-' + this.checkedMonth + '-' + this.checkedDay)
        time.setHours(hour)
        time.setMinutes(minuth)
        time.setSeconds(second)
        time.setMilliseconds(milliseconds * 100)

        this.$emit('newTime', time.getTime())
      },


      changeTimer(e) {

        if (!this.isChangeTime) return;
        this.endPosition = e.clientX;
        document.getElementById('timeLine_line').style.left = this.left + this.endPosition - this.startPosition + 'px'

      },
      initPosition() {
        var currentTime = new Date();


        this.left = -10 + parseInt((currentTime.getHours() * 60 * 60 + currentTime.getMinutes() * 60 + currentTime.getSeconds()) / (this.rate / 1000)) * this.minSpace

      },
      init() {
        let c = document.getElementById("timeLine-line");
        let ctx = c.getContext("2d");
        let index = 0;
        let left = 0;
        let space = this.space;
        let start = 85;
        let bigLine = 10;
        let smallLine = 3;
        let midLine = 5;
        let totalLine = 288;
        let mid = 6;
        let big = 12;

        do {
          ctx.beginPath();
          ctx.lineWidth = 2;
          ctx.strokeStyle = '#94949a';
          ctx.fillStyle = '#94949a';
          ctx.moveTo(space * index + left, start);
          if (index % big === 0) {
            ctx.strokeStyle = '#d26011'
            ctx.lineTo(space * index + left, start - bigLine);
            ctx.fillText(index / big + ":00", space * index + left, start - bigLine - 4);
          } else if (index % mid === 0) {
            ctx.lineTo(space * index + left, start - midLine);

          } else {
            ctx.lineTo(space * index + left, start - smallLine);
          }
          ctx.stroke();
          index += 1;
        } while (index <= totalLine)
      },
      mGetDate(year, month) {
        return new Date(year, month, 0).getDate()
      },
      checkTimeList() {
        var currentYear = new Date().getFullYear();
        var currentMonth = new Date().getMonth() + 1
        if (currentYear === this.checkedYear) {
          this.getMonthList(currentMonth)
        } else {
          this.getMonthList()
        }
        if (currentYear === this.checkedYear && currentMonth === this.checkedMonth) {
          this.dayList = this.getDayList(this.checkedYear, this.checkedMonth, new Date().getDate())
        }
        if (currentYear > this.checkedYear) {
          this.dayList = this.getDayList(this.checkedYear, this.checkedMonth)
        }
        if (currentYear === this.checkedYear && currentMonth > this.checkedMonth) {
          this.dayList = this.getDayList(this.checkedYear, this.checkedMonth)
        }
        if (currentYear < this.checkedYear || (currentYear === this.checkedYear && currentMonth < this.checkedMonth)) {
          this.dayList = this.getDayList(this.checkedYear, this.checkedMonth, -1)
        }
      },
      getDayList(year, month, day) {
        var maxDay = this.mGetDate(year, month);
        var dayList = [];
        for (var i = 1; i <= maxDay; i++) {
          var dayInfo = {value: i, disable: false};
          if (day && day < i) {
            dayInfo.disable = true
          }
          dayList.push(dayInfo)

        }
        return dayList
      },
      getMonthList(currentMonth) {

        var monthList = [];
        for (var i = 1; i < 13; i++) {
          var monthInfo = {value: i, disable: false};
          if (currentMonth && currentMonth < i) {
            monthInfo.disable = true
          }
          monthList.push(monthInfo)
        }
        return monthList


      },
    },
    watch: {
      checkedYear(year) {
        var maxDay = this.mGetDate(year, this.checkedMonth);
        this.checkedMonth = 1;
        this.checkedDay = 1;
        this.checkTimeList()
      },
      checkedMonth() {
        var maxDay = this.mGetDate(this.checkedYear, this.checkedMonth);
        this.checkedDay = 1;
        this.checkTimeList()
      }
    }

  }
</script>
