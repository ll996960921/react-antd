import React, { Component } from 'react'
import { Card, Button, Form, Input, Icon, Checkbox, message} from 'antd'
import './form.less'

class Login extends Component {

    //表单提校验
    handleSubmit = () => {
        let userInfo = this.props.form.getFieldsValue();
        this.props.form.validateFields((err, values) => {
            if(!err){
                message.success(`恭喜${userInfo.username},登陆成功！当前密码为：${userInfo.password}`)
            }
        })
    }

    handleBlurUsername = ()=> {
        let userName = this.props.form.getFieldValue();

    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
        <div>
                <Card title="行内表单" className="card-wrap">
                    <Form layout="inline">
                        <Form.Item>
                            <Input placeholder="请输入用户名"/>
                        </Form.Item>
                        <Form.Item>
                            <Input placeholder="请输入密码"/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary">登陆</Button>
                        </Form.Item>
                    </Form>
                </Card>

                <Card title="水平表单" className="card-wrap">
                    <Form layout="horizontal" style={{width:300}}>
                        <Form.Item>
                            {
                                getFieldDecorator("username",{
                                    rules:[
                                        {
                                            required: true,
                                            message: "用户名不能为空"
                                        },
                                        {
                                            min: 5,
                                            max: 10,
                                            message: "长度不在范围内"
                                        },
                                        {
                                            pattern: /^\w+$/g,
                                            message: "用户名必须为字母或数字"
                                        }
                                    ]
                                })(
                                    <Input prefix={<Icon type="user"/>} placeholder="请输入用户名" onBlur={this.handleBlurUsername}/>
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            {
                                getFieldDecorator("password",{
                                    rules:[{
                                        required: true,
                                        message: "密码不能为空"
                                    }]
                                })(
                                    <Input prefix={<Icon type="key"/>} placeholder="请输入密码" type="password"/>
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            {
                                getFieldDecorator("remeber",{
                                    valuePropName: "checked",
                                    initialValue: true,
                                })(
                                    <Checkbox>记住密码</Checkbox>
                                )
                            }
                            <a href="#" style={{float:"right"}}>忘记密码</a>
                        </Form.Item>
                        <Form.Item style={{textAlign:"center"}}>
                            <Button type="primary" onClick={this.handleSubmit} style={{width: 150}}>登陆</Button>
                        </Form.Item>
                    </Form>
                </Card>
        </div>
        )
    }
}

export default Form.create()(Login)