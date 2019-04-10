import React, { Component } from 'react'
import { Card, Spin, Icon, Button, Alert } from 'antd'
import './ui.less'

export default class Loadings extends Component {
  render() {
    const loading = <Icon type="loading" style={{fontSize: 24}}/>
    const sync = <Icon type="sync" />
    return (
        <div>
            <Card title="spin的用法" className="card-wrap">
              <Spin size="small"/>     
              <Spin size="default" style={{margin:'0 50px'}}/>  
              <Spin size="large"/>    
              <Spin indicator={loading}  style={{margin:'0 50px'}}/>  
              <Spin indicator={sync} size="large"/>      
            </Card>

            <Card title="内容遮罩" className="card-wrap">
              <Alert
                  message="react"
                  description="欢迎学习react实战课程"
                  type="info"
              /> 
              <Spin>
                <Alert
                    message="react"
                    description="欢迎学习react实战课程"
                    type="warning"
                    style={{marginTop: 10}}
                /> 
              </Spin>   
              <Spin tip="加载中...">
                <Alert
                    message="react"
                    description="欢迎学习react实战课程"
                    type="error"
                    style={{marginTop: 10}}
                />  
              </Spin>
              <Spin tip="加载中..." indicator={loading}>
                <Alert
                    message="react"
                    description="欢迎学习react实战课程"
                    type="error"
                    style={{marginTop: 10}}
                />  
              </Spin>
            </Card>

        </div>
    )
  }
}
