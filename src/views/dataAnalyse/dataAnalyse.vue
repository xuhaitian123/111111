<template>
  <div class="contianer">
    <Area></Area>
    <div class="contianer_body">
      <div class="contianer_body_title">
        <div class="title">
          <img class="toLeft" src="../../../static/map/toLeft.png"/><span class="title_text">信号灯优化前后数据</span>
        </div>
      </div>
      <div class="contianer_body_layout">
        <div class="score">
          <div class="score_title">
            <div class="score_title_text">优化前后路网总评分/路网各类路况占比</div>
          </div>
          <div class="score_body_area"></div>
        </div>
        <div class="alarmData">
          <div class="alarmData_title">
            <div class="alarmData_title_text">路网拥堵报警次数月变化趋势</div>
          </div>
          <div class="alarmData_body_area">
            <div id="data" style="height: 100%;width: 100%"></div>
          </div>
        </div>
        <div class="IntersectionData">
          <div class="IntersectionData_title">
            <div class="IntersectionData_title_text">各交叉口平均延误水平与拥堵报警次数</div>
          </div>
          <div class="IntersectionData_body_area">

          </div>
        </div>
        <div class="flowRate">
          <div class="flowRate_title">
            <div class="flowRate_title_text">路网流量、平均车速月变化趋势</div>
          </div>
          <div class="flowRate_body_area"></div>
        </div>
        <div class="goodSpeed">
          <div class="goodSpeed_title">
            <div class="goodSpeed_title_text">优化前后平均车速日变化趋势</div>
          </div>
          <div class="goodSpeed_body_area">

          </div>
        </div>

      </div>
    </div>
  </div>
</template>
<style scoped>
  .contianer_body {
    padding: 10px 10px;
    height: 935px;
    width: 1640px;
  }

  .contianer_body_title {
    background: #333643;
    height: 40px;
  }

  .title {
    line-height: 40px;
    width: 250px;
    display: flex;
    align-items: center;
  }

  .title_text {
    font-size: 19px;
    display: block;
    margin-left: 20px;
  }

  .toLeft {
    height: 19px;
    margin-left: 30px;
  }

  .contianer_body_layout {
    background: #272836;
    padding: 10px 10px;
    display: flex;
    flex-wrap: wrap;
  }

  .score,
  .alarmData,
  .IntersectionData {
    height: 420px;
    width: 530px;
    margin-right: 10px;
  }

  .flowRate {
    height: 420px;
    width: 530px;
    margin-right: 10px;
    margin-top: 10px;
  }

  .goodSpeed {
    height: 420px;
    width: 1070px;
    margin-right: 10px;
    margin-top: 10px;
  }

  .score_title,
  .alarmData_title,
  .IntersectionData_title,
  .flowRate_title,
  .goodSpeed_title {
    background: #1D1D2C;
    height: 30px;
    display: flex;
    align-items: center;
  }

  .score_title_text,
  .alarmData_title_text,
  .IntersectionData_title_text,
  .flowRate_title_text,
  .goodSpeed_title_text {
    width: 320px;
    margin-left: 20px;
    font-size: 16px;
  }

  .score_body_area,
  .alarmData_body_area,
  .IntersectionData_body_area,
  .flowRate_body_area,
  .goodSpeed_body_area {
    height: 390px;
    background: #333643;
  }

</style>

<script>
  import Area from '../../components/Area/Area'
  import MixLineBarItem from '../../components/ECharts/MixLineBarItem'

  export default {
    name: "DataAnalyse",
    mounted() {
      this.init();
    },
    data() {
      return {
        myChart: undefined,
      }
    },//
    methods: {
      init() {
        this.myChart = this.$echarts.init(document.getElementById('data'));//
        let options = {
          legend: {
            top: 50,
            data: [{
              name: '优化前',
              icon: 'square',
              textStyle: {
                color: '#c9c9cc',
                fontSize: 10,
              }
            },
              {
                name: '优化后',
                icon: 'square',
                textStyle: {
                  color: '#c9c9cc',
                  fontSize: 10,
                }
              },],
          },
          grid: {
            // left: 103,
            // bottom: 61,
          },
          xAxis: {
            type: 'value',
            name: ['报警次数'],
            nameLocation: 'end',
            nameTextStyle: {
              color: '#c9c9cc'
            },
            color:'#c9c9cc',
            splitLine: {
              show: false
            },
            // minInterval: 1,
            axisLabel: {
              show: "true",
              color: '#c9c9cc'
            }
          },
          yAxis: {
            type: 'category',
            data: ['五月', '四月', '三月', '二月', '一月', '九月', '十月', '十一月', '十二月'],


          },
          series: [
            {
              name: '优化前',
              type: 'bar',
              color: '#e05f9a',
              barWidth: '12',
              data: [100, 200, 300, 1000]
            },
            {
              name: '优化后',
              type: 'bar',
              color: '#02d1d1',
              barWidth: '12',
              data: [10, 52, 200, 1500]
            }
          ]

        }
        this.myChart.setOption(options);
      }

    },
    components: {
      Area,
      MixLineBarItem
    },
  }
</script>
