import React, { Component } from 'react'
import { Card, Button, Icon, Radio } from 'antd'
import './ui.less'

export default class Buttons extends Component {

    state ={
        status: true,
        size: "default"
    }

    //loading得加载切换
    handleCloseLoading = ()=> {
            this.setState({
                status: !this.state.status
            })
    }

    //改变按钮尺寸大小
    handleChangeSize = (e)=> {
        this.setState({
            size: e.target.value
        })
    }

  render() {
    return (
      <div>
        <Card title="基础按钮" className="card-wrap">
            <Button>默认</Button>
            <Button type="primary">primary</Button>
            <Button type="danger">danger</Button>
            <Button type="dashed">dashed</Button>
            <Button type="ghost">ghost</Button>
            <Button type="default">default</Button>
            <Button disabled>disabled</Button>
        </Card>

        <Card title="图形按钮" className="card-wrap">
            <Button icon="plus">创建</Button>
            <Button icon="edit" type="primary">编辑</Button>
            <Button icon="delete" type="danger">删除</Button>
            <Button shape="circle" icon="search"></Button>
            <Button type="primary" icon="search">搜索</Button>
            <Button type="primary" icon="download">下载</Button>
        </Card>

        <Card title="Loading按钮" className="card-wrap">
            <Button type="primary" loading={this.state.status}>确定</Button>
            <Button type="primary" shape="circle" loading={this.state.status}></Button>
            <Button loading={this.state.status}>点击加载</Button>
            <Button shape="circle" loading={this.state.status}></Button>
            {
                this.state.status?
                <Button type="primary" onClick={this.handleCloseLoading}>关闭</Button>:
                <Button type="primary" onClick={this.handleCloseLoading}>打开</Button>
            }
            
        </Card>

        <Card title="按钮组">
        <Button.Group>
            <Button type="primary"><Icon type="left" />返回</Button>
            <Button type="primary">前进<Icon type="right" /></Button>
        </Button.Group>
        </Card>

        <Card title="按钮尺寸" className="card-wrap-size">
            <Radio.Group value={this.state.size} onChange={this.handleChangeSize}>
                <Radio value="small">小</Radio>
                <Radio value="default">中</Radio>
                <Radio value="large">大</Radio>
            </Radio.Group>
            <Button type="primary" size={this.state.size}>变小</Button>
            <Button type="danger" size={this.state.size}>默认(中)</Button>
            <Button type="primary" size={this.state.size}>默认(中)</Button>
            <Button type="default" size={this.state.size}>变大</Button>
        </Card>

      </div>
    )
  }
}
