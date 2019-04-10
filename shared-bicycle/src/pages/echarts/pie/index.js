import React, { Component } from 'react'
import { Card } from 'antd'
// import echarts from 'echarts'
//按需导入
import echartTheme from './../echartTheme'
import echarts from 'echarts/lib/echarts'
//导入饼图
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import ReactEcharts from 'echarts-for-react'

export default class Pie extends Component {

  componentWillMount(){
    echarts.registerTheme("Imooc", echartTheme) //注入主题
  }

  getOption = ()=>{
    let option = {
        title: {
          text: '用户骑行订单',
          x: 'center'
        },
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          top: 20,
          right: 50,
          data: ['星期一','星期二','星期三','星期四','星期五','星期六','星期日']
        },
        series : [
          {
              name:'订单量',
              type:'pie',
              data:[
                {value:1000, name:'星期一'},
                {value:1500, name:'星期二'},
                {value:2000, name:'星期三'},
                {value:2500, name:'星期四'},
                {value:3000, name:'星期五'},
                {value:2300, name:'星期六'},
                {value:1600, name:'星期日'}
            ],
          }
        ]
      }
    return option;
  }

  getOption2 = ()=>{
    let option = {
        title: {
          text: '用户骑行订单',
          x: 'center'
        },
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          top: 20,
          right: 50,
          data: ['星期一','星期二','星期三','星期四','星期五','星期六','星期日']
        },
        series : [
          {
              name:'订单量',
              type:'pie',
              radius: ['30%', '80%'],
              data:[
                {value:1000, name:'星期一'},
                {value:1500, name:'星期二'},
                {value:2000, name:'星期三'},
                {value:2500, name:'星期四'},
                {value:3000, name:'星期五'},
                {value:2300, name:'星期六'},
                {value:1600, name:'星期日'}
            ],
          }
        ]
      }
    return option;
  }

  render() {
    return (
      <div>
        <Card title="饼图">
          <ReactEcharts option={this.getOption()} theme="Imooc" style={{height:500}}/>
        </Card>
        <Card title="环形图" style={{marginTop:15}}>
          <ReactEcharts option={this.getOption2()} theme="Imooc" style={{height:500}}/>  
        </Card>
      </div>
    )
  }
}
