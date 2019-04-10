import React, { Component } from 'react'
import { Card } from 'antd'
// import echarts from 'echarts'
//按需导入
import echartTheme from './../echartTheme'
import echarts from 'echarts/lib/echarts'
//导入柱形图
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import ReactEcharts from 'echarts-for-react'

export default class Bar extends Component {

  componentWillMount(){
    echarts.registerTheme("Imooc", echartTheme) //注入主题
  }

  getOption = ()=>{
    let option = {
        title: {
          text: '用户骑行订单'
        },
        tooltip:{
          trigger: 'axis'
        },
        xAxis: {
          data: ['星期一','星期二','星期三','星期四','星期五','星期六','星期日']
        },
        yAxis: {
          type: 'value'
        },
        series : [
          {
              name:'订单量',
              type:'bar',
              barWidth: '50%',
              data:[1000, 1500, 2000, 3000, 2500, 1800, 1200]
          }
      ]
    }
    return option;
  }

  getOption2 = ()=>{
    let option = {
        title: {
          text: '用户骑行订单'
        },
        tooltip:{
          trigger: 'axis'
        },
        legend: {
          data:['ofo','摩拜','小蓝']
      },
        xAxis: {
          data: ['星期一','星期二','星期三','星期四','星期五','星期六','星期日']
        },
        yAxis: {
          type: 'value'
        },
        series : [
          {
              name:'ofo',
              type:'bar',
              barWidth: '15%',
              data:[800, 1300, 2000, 2300, 1800, 1100, 500]
          },
          {
            name:'摩拜',
            type:'bar',
            barWidth: '15%',
            data:[1000, 1800, 2200, 3100, 2200, 1500, 1000]
          },
          {
            name:'小蓝',
            type:'bar',
            barWidth: '15%',
            data:[300, 800, 1200, 1800, 1300, 600, 200]
          }
      ]
    }
    return option;
  }

  render() {
    return (
      <div>
        <Card title="柱形图表之一">
          <ReactEcharts option={this.getOption()} theme="Imooc" style={{height:500}}/>
        </Card>
        <Card title="柱形图表之二" style={{marginTop:15}}>
          <ReactEcharts option={this.getOption2()} theme="Imooc" style={{height:500}}/>  
        </Card>
      </div>
    )
  }
}
