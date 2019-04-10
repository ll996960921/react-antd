import React, { Component } from 'react'
import { Card, Button, Modal } from 'antd'

export default class Modals extends Component {

    state= {
        showModal1: false,
        showModal2: false,
        showModal3: false,
        showModal4: false,
    }

    //点击显示模态框
    handleOpen = (type)=>{
        this.setState({
            [type]: true
        })
    }

    //点击显示信息提示框
    handleConfirm = (type)=>{
        Modal[type]({
            title:"提示",
            content: "你确定要进行次操作？",
            onOk(){

            },
            onCancel(){

            },
            okText: "确定",
            cancelText: "取消"
        })
    }

    render() {
        return (
            <div>
                    <Card title="基础模态框" className="card-wrap">
                        <Button type="primary" onClick={() => this.handleOpen('showModal1')}>Open Modal</Button>
                        <Button type="primary" onClick={() => this.handleOpen('showModal2')}>自定义页脚</Button>
                        <Button type="primary" onClick={() => this.handleOpen('showModal3')}>距离顶部20px</Button>
                        <Button type="primary" onClick={() => this.handleOpen('showModal4')}>水平垂直居中</Button>
                    </Card>

                    <Card title="信息确认框" className="card-wrap">
                        <Button onClick={() => this.handleConfirm('confirm')}>confirm</Button>
                        <Button type="primary" onClick={() => this.handleConfirm('success')}>success</Button>
                        <Button type="default" onClick={() => this.handleConfirm('info')}>info</Button>
                        <Button type="default" onClick={() => this.handleConfirm('warning')}>warning</Button>
                        <Button type="danger" onClick={() => this.handleConfirm('error')}>error</Button>
                    </Card>

                    <Modal
                        title="Open Modal"
                        visible={this.state.showModal1}
                        onOk={()=>{this.setState({showModal1: false})}}
                        onCancel={()=>{this.setState({showModal1: false})}}
                    >
                        <p>欢迎学习react-antd的模态框：Open Modal</p>
                    </Modal>

                    <Modal
                        title="自定义页脚"
                        visible={this.state.showModal2}
                        okText="确定"
                        cancelText="取消"
                        onOk={()=>{this.setState({showModal2: false})}}
                        onCancel={()=>{this.setState({showModal2: false})}}
                    >
                        <p>欢迎学习react-antd的模态框：自定义页脚</p>
                    </Modal>

                    <Modal
                        title="距离顶部20px"
                        visible={this.state.showModal3}
                        okText="确定"
                        cancelText="取消"
                        style={{top: '20px'}}
                        onOk={()=>{this.setState({showModal3: false})}}
                        onCancel={()=>{this.setState({showModal3: false})}}
                    >
                        <p>欢迎学习react-antd的模态框：距离顶部20px</p>
                    </Modal>

                    <Modal
                        title="水平垂直居中"
                        visible={this.state.showModal4}
                        okText="确定"
                        cancelText="取消"
                        wrapClassName="vertical-center-modal"
                        onOk={()=>{this.setState({showModal4: false})}}
                        onCancel={()=>{this.setState({showModal4: false})}}
                    >
                        <p>欢迎学习react-antd的模态框：水平垂直居中</p>
                    </Modal>

            </div>
        )
    }
}
