import React, { Component } from 'react'
import { Card, Button, notification } from 'antd'

export default class Notification extends Component {

    handleOpnNotification = (type,direction) => {
        if(direction){
            notification.config({
                placement: direction
            })
        }
        notification[type]({
            message: '提示',
            description: '本次操作成功'
        });
    }

  render() {
    return (
      <div>
          <Card title="通知提醒框" className="card-wrap">
                <Button type="primary" onClick={()=>{this.handleOpnNotification('success')}}>Success</Button>
                <Button  onClick={()=>{this.handleOpnNotification('info')}}>Info</Button>
                <Button  onClick={()=>{this.handleOpnNotification('warning')}}>Warning</Button>
                <Button type="danger" onClick={()=>{this.handleOpnNotification('error')}}>Error</Button>
          </Card>
          <Card title="按位置弹出——通知提醒框" className="card-wrap">
                <Button type="primary" onClick={()=>{this.handleOpnNotification('success','topLeft')}}>Success</Button>
                <Button  onClick={()=>{this.handleOpnNotification('info','topRight')}}>Info</Button>
                <Button  onClick={()=>{this.handleOpnNotification('warning','bottomLeft')}}>Warning</Button>
                <Button type="danger" onClick={()=>{this.handleOpnNotification('error','bottomRight')}}>Error</Button>
          </Card>
      </div>
    )
  }
}
