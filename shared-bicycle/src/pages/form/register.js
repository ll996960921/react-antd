import React, { Component } from 'react'
import { Card, Form, Button, Input, Icon, Select, Checkbox, Radio, Switch,
        DatePicker, TimePicker, Row, Col, InputNumber, Upload, message } from 'antd'
import './form.less'
import moment from 'moment' //日期插件

class Register extends Component {

    state = {}

    //注册提交
    handleSubmit = () => {
        const userInfo = this.props.form.getFieldsValue();
        console.log(JSON.stringify(userInfo));
        
    }

    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
      
    beforeUpload = (file)  => {
        const isJPG = file.type === 'image/jpeg';
        if (!isJPG) {
          message.error('You can only upload JPG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error('Image must smaller than 2MB!');
        }
        return isJPG && isLt2M;
    }

    //图像上传
    handleChange = (info) => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          this.getBase64(info.file.originFileObj, imageUrl => this.setState({
            userImg: imageUrl,
            loading: false,
          }));
        }
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs:24,
                sm:4
            },
            wrapperCol: {
                xs:24,
                sm:10
            }
        }
        const offsetLayput = {
            wrapperCol: {
                xs:24,
                sm: {
                    span: 12,
                    offset: 4
                }
            }
        }

        return (
            <div>
                <Card title="注册表单" className="card-wrap">
                    <Form>
                        <Form.Item label="用户名" {...formItemLayout}>
                            {
                                getFieldDecorator("userName",{
                                    initialValue:'',
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
                                    <Input prefix={<Icon type="user"/>} placeholder="请输入5~10字母或数字"/>
                                )
                            }
                        </Form.Item>

                        <Form.Item label="密码" {...formItemLayout}>
                            {
                                getFieldDecorator("passWord",{
                                    initialValue:'',
                                    rules:[
                                        {
                                            required: true,
                                            message:"密码不能为空"
                                        }
                                    ]
                                })(
                                    <Input prefix={<Icon type="key"/>} placeholder="请输入密码" type="password"/>
                                )
                            }
                        </Form.Item>

                        <Form.Item label="性别" {...formItemLayout}>
                            {
                                getFieldDecorator("sex",{
                                    initialValue: "1",
                                    rules:[
                                        {
                                            required: true
                                        }
                                    ]
                                })(
                                    <Radio.Group>
                                        <Radio value="1">男</Radio>
                                        <Radio value="0">女</Radio>
                                    </Radio.Group>
                                )
                            }
                        </Form.Item>

                        <Form.Item label="年龄" {...formItemLayout}>
                            {
                                getFieldDecorator("older",{
                                    initialValue: 18,
                                    rules:[
                                        {
                                            required: true,
                                            message: "年龄不能为空"
                                        }
                                    ]
                                })(
                                    <InputNumber min={0} max={150} />
                                )
                            }
                        </Form.Item>

                        <Form.Item label="当前状态" {...formItemLayout}>
                            {
                                getFieldDecorator("status",{
                                    initialValue: "1"
                                })(
                                    <Select>
                                        <Select.Option value="1">咸鱼一条</Select.Option>
                                        <Select.Option value="2">风华浪子</Select.Option>
                                        <Select.Option value="3">江南才子</Select.Option>
                                        <Select.Option value="4">红尘旧梦</Select.Option>
                                        <Select.Option value="5">河畔一角</Select.Option>
                                    </Select>
                                )
                            }
                        </Form.Item>

                        <Form.Item label="爱好" {...formItemLayout}>
                            {
                                getFieldDecorator("hobby",{
                                    initialValue: ["1","2","3","4","5"]
                                })(
                                    <Select mode="multiple">
                                        <Select.Option value="1">篮球</Select.Option>
                                        <Select.Option value="2">上网</Select.Option>
                                        <Select.Option value="3">游泳</Select.Option>
                                        <Select.Option value="4">爬山</Select.Option>
                                        <Select.Option value="5">唱歌</Select.Option>
                                        <Select.Option value="6">跳舞</Select.Option>
                                        <Select.Option value="7">睡觉</Select.Option>
                                        <Select.Option value="8">足球</Select.Option>
                                    </Select>
                                )
                            }
                        </Form.Item>

                        <Form.Item label="是否已婚" {...formItemLayout}>
                            {
                                getFieldDecorator("isMarried",{
                                    valuePropName: 'checked',
                                    initialValue: true
                                })(
                                    <Switch />
                                )
                            }
                        </Form.Item>

                        <Form.Item label="出生时间" {...formItemLayout}>
                            {
                                getFieldDecorator("birthday",{
                                    initialValue: moment('2010-01-01 12:00:00')
                                })(
                                    <DatePicker
                                        showTime
                                        format="YYYY-MM-DD HH:mm:ss"
                                    />
                                )
                            }
                        </Form.Item>

                        <Form.Item label="联系地址" {...formItemLayout}>
                            {
                                getFieldDecorator("address",{
                                    initialValue: "江苏省昆山市"
                                })(
                                    <Input.TextArea
                                        autosize={{minRows: 1,maxRows: 2}}
                                    />
                                )
                            }
                        </Form.Item>

                        
                        <Form.Item label="早期时间" {...formItemLayout}>
                            {
                                getFieldDecorator("time")(
                                    <TimePicker/>
                                )
                            }
                        </Form.Item>

                        <Form.Item label="头像" {...formItemLayout}>
                            {
                                getFieldDecorator("userImg",{
                                    initialValue: ""
                                })(
                                    <Upload
                                        action="//jsonplaceholder.typicode.com/posts/"
                                        listType="picture-card"
                                        showUploadList={false}
                                        beforeUpload={this.beforeUpload}
                                        onChange={this.handleChange}
                                    >
                                        {
                                            this.state.userImg?<img src={this.state.userImg} alt=""/>:<Icon type="plus"/>
                                        }
                                    </Upload>
                                )
                            }
                        </Form.Item>

                        <Form.Item {...offsetLayput}>
                            {
                                getFieldDecorator("protocol",{
                                    valuePropName: 'checked',
                                    initialValue: true
                                })(
                                    <Checkbox>
                                        <a href="http://localhost:3000/#/admin/form/reg">我已经阅读了相关协议</a>
                                    </Checkbox>
                                )
                            }
                        </Form.Item>

                        <Form.Item {...offsetLayput}>
                            {
                                getFieldDecorator("register")(
                                    <Button type="primary" onClick={this.handleSubmit}>注册</Button>
                                )
                            }
                        </Form.Item>

                    </Form>
                </Card>
            </div>
        )
    }
}
export default Form.create()(Register)