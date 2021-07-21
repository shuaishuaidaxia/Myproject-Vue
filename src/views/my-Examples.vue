<template>
  <div id="myChart" style="width: 600px;height:400px;">
  </div>
</template>

<script>
export default {
  name: 'my-Examples',
  created () {
    /* this.drawLine() */
  },
  mounted () {
    this.drawLine()
  },
  methods: {
    drawLine () {
      const echarts = require('echarts')
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        title: { text: '在Vue中使用echarts' },
        tooltip: {},
        xAxis: {
          data: ['湖人队', '火箭队', '热火队', '勇士队', '篮网队', '快船队']
        },
        yAxis: {},
        series: [{
          name: '总比分',
          type: 'bar',
          data: [50, 20, 36, 10, 10, 20]
        }]
      })
    }
  }
}
</script>

<style scoped>

</style>
