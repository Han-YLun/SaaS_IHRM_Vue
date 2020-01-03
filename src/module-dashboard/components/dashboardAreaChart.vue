<template>
  <div class="className"></div>
</template>

<script>
import echarts from 'echarts'
import { debounce } from '@/utils'
import { performance } from '@/api/base/notices'
require('echarts/theme/macarons') // echarts theme

// const animationDuration = 6000
var _this = null
export default {
  props: {},
  data() {
    return {
      chart: null,
      formBase: []
    }
  },
  mounted() {
    // this.__resizeHanlder = debounce(() => {
    //   if (this.chart) {
    //     this.chart.resize()
    //   }
    // }, 100)
    // window.addEventListener('resize', this.__resizeHanlder)
    this.chart = echarts.init(this.$el, 'macarons')

        this.chart.setOption({
          tooltip: {},
          // legend: {
          //   data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
          // },
          radar: {
            // shape: 'circle',
            name: {
              textStyle: {
                color: '#333',
                borderRadius: 3,
                padding: [3, 5]
              }
            },
            // xAxis: [
            //   {
            //     type: 'category',
            //     data: this.formBase.indicator //2. json数据中的横坐标
            //   }
            // ],
            // indicator: this.formBase.indicator,
            indicator: [
              { name: '能力', max: 6500 },
              { name: '管理', max: 16000 },
              { name: '周边', max: 30000 },
              { name: '贡献', max: 38000 },
              { name: '态度', max: 52000 }
            ],
            axisLine: {
              // 坐标轴线
              show: false // 默认显示，属性show控制显示与否
            }
          },
          series: [
            {
              // type: 'radar',
              // data: this.formBase.data
              name: '预算 vs 开销（Budget vs spending）',
              type: 'radar',
              // areaStyle: {normal: {}},
              data: [
                {
                  value: [4000, 7000, 22000, 30000, 45000],
                  name: '个人'
                },
                {
                  value: [5000, 14000, 28000, 31000, 42000],
                  name: '部门'
                },
                {
                  value: [6000, 10000, 20000, 20000, 30000],
                  name: '公司'
                }
              ]
            }
          ]
        })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    window.removeEventListener('resize', this.__resizeHanlder)
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    getObjInfo() {
      // console.log(this.$route.params.id)
      performance().then(ret => {
        this.formBase = ret.data
        console.log(this.formBase)
        this.chart = echarts.init(this.$el, 'macarons')

        this.chart.setOption({
          // tooltip: {},
          // legend: {
          //   data: this.formBase
          // },
          radar: {
            // shape: 'circle',
            name: {
              textStyle: {
                color: '#333',
                borderRadius: 3,
                padding: [3, 5]
              }
            },
            // xAxis: [
            //   {
            //     type: 'category',
            //     data: this.formBase.indicator //2. json数据中的横坐标
            //   }
            // ],
            indicator: this.formBase.indicator,
            axisLine: {
              // 坐标轴线
              show: false // 默认显示，属性show控制显示与否
            }
          },
          series: [
            {
              type: 'radar',
              data: this.formBase.data
            }
          ]
        })
      })
    }
  },
  // 创建完毕状态
  created: function() {
    _this = this
    // this.getObjInfo()
  }
}
</script>
<style>
.className {
  width: 350px;
  height: 350px;
  margin: 0 auto;
}
</style>
