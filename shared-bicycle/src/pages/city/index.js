import React, { Component } from 'react'
import { Card, Button, Table, Form, Input, Select, Modal, message } from 'antd'
import axios from './../../axios'
import utils from '../../utils/utils';
import './index.less'

export default class City extends Component {

    state = {
        list: [],
        isShowOpenCity: false
    }
    params = {
        page: 1
    }

    componentWillMount(){
        this.requestList();
    }

    //请求接口数据
    requestList = ()=>{
        let _this = this;
        axios.ajax({
            url:'open_city',
            data: {
                params: {
                    page: this.params.page
                }
            }
        }).then((res)=>{
            this.setState({
                list: res.result.item_list.map((item, index)=>{
                    item.key = index;
                    return item;
                }),
                pagination: utils.pagination(res,(current)=>{
                    _this.params.page = current;
                    _this.requestList(); //从新请求列表
                })
            })
        })
    }

    //开通城市
    handleOpenCity = ()=>{
        this.setState({
            isShowOpenCity: true
        })
    }
    
    //城市开通提交
    handleSubmitCity = ()=>{
        let cityInfo = this.cityForm.props.form.getFieldsValue(); //获取表格值
        axios.ajax({
            url: '/city/open',
            data: {
                params: cityInfo
            }
        }).then((res)=>{
            if(res.code === 0){
                this.setState({
                    isShowOpenCity: false
                })                              
                message.success("开通成功！");
                this.requestList();
            }
        })
    }

    render() {
        const columns = [
            {
                title:'城市ID',
                dataIndex:'id'
            }, {
                title: '城市名称',
                dataIndex: 'name'
            }, {
                title: '用车模式',
                dataIndex: 'mode',
                render(mode){
                    return mode ==1 ?'停车点':'禁停区';
                }
            }, {
                title: '营运模式',
                dataIndex: 'op_mode',
                render(op_mode) {
                    return op_mode == 1 ? '自营' : '加盟';
                }
            }, {
                title: '授权加盟商',
                dataIndex: 'franchisee_name'
            }, {
                title: '城市管理员',
                dataIndex: 'city_admins',
                render(arr){
                    return arr.map((item)=>{
                        return item.user_name;
                    }).join('，');
                }
            }, {
                title: '城市开通时间',
                dataIndex: 'open_time'
            }, {
                title: '操作时间',
                dataIndex: 'update_time',
                render: utils.formateDate
            }, {
                title: '操作人',
                dataIndex: 'sys_user_name'
            }
        ]

        return (
        <div>
            <Card className="card-wrap">
                <FilterForm />
            </Card>
            <Card className="card-wrap">
                <Button type="primary" onClick={this.handleOpenCity}>开通城市</Button>
                <Table 
                    bordered
                    columns={columns}
                    dataSource={this.state.list}
                />
            </Card>
            <Modal
                title="开通城市"
                okText="确定"
                cancelText="取消"
                visible={this.state.isShowOpenCity}
                onCancel={()=>{
                    this.setState({isShowOpenCity: false})
                }}
                onOk={this.handleSubmitCity}
            >
                 {/* 经过 Form.create 之后如果要拿到ref通过 wrappedComponentRef  */}
                <OpenCityForm wrappedComponentRef={(inst)=>{this.cityForm = inst}}/>
            </Modal>
        </div>
        )
    }
}


class FilterForm extends Component{
    render(){
        const { getFieldDecorator } = this.props.form;

        return(
            <Form layout="inline">
                <Form.Item label="城市管理">
                    {
                        getFieldDecorator("city_id")(
                            <Select placeholder="请选择城市"  style={{width: 120}}>
                                <Select.Option value="1">北京</Select.Option>
                                <Select.Option value="2">上海</Select.Option>
                                <Select.Option value="3">广州</Select.Option>
                                <Select.Option value="4">深圳</Select.Option>
                            </Select>
                        )
                    }
                </Form.Item>
                <Form.Item label="用车模式">
                    {
                        getFieldDecorator("mode")(
                            <Select placeholder="请选择用车模式"  style={{width: 150}}>
                                <Select.Option value="1">指定停车点模式</Select.Option>
                                <Select.Option value="2">禁停区模式</Select.Option>
                            </Select>
                        )
                    }
                </Form.Item>
                <Form.Item label="营运模式">
                    {
                        getFieldDecorator('op_mode')(
                            <Select
                                style={{ width: 150 }}
                                placeholder="请选择营运模式"
                            >
                                <Select.Option value="1">自营</Select.Option>
                                <Select.Option value="2">加盟</Select.Option>
                            </Select>
                        )
                    }
                </Form.Item>
                <Form.Item label="加盟商授权状态">
                    {
                        getFieldDecorator('auth_status')(
                            <Select
                                style={{ width: 150 }}
                                placeholder="请选择授权状态"
                            >
                                <Select.Option value="1">已授权</Select.Option>
                                <Select.Option value="2">未授权</Select.Option>
                            </Select>
                        )
                    }
                </Form.Item>
                <Form.Item>
                    <Button type="primary" style={{margin:'0 20px'}}>查询</Button>
                    <Button>重置</Button>
                </Form.Item>
            </Form>
        )
    }
}
FilterForm = Form.create({})(FilterForm);

class OpenCityForm extends Component{
    render(){

        const { getFieldDecorator } = this.props.form
        const formItemLayout = {
            labelCol: {
                span: 5
            },
            wrapperCol:{
                span: 10
            }
        }

        return (
            <Form>
                <Form.Item label="选择城市" {...formItemLayout}>
                    {
                        getFieldDecorator("city_id",{
                            initialValue: '1'
                        })(
                            <Select placeholder="全部">
                                <Select.Option value="1">北京</Select.Option>
                                <Select.Option value="2">上海</Select.Option>
                                <Select.Option value="3">广州</Select.Option>
                                <Select.Option value="4">深圳</Select.Option>
                            </Select>
                        )
                    }
                </Form.Item>
                <Form.Item label="营运模式" {...formItemLayout}>
                    {
                        getFieldDecorator("op_mode",{
                            initialValue: '1'
                        })(
                            <Select  placeholder="全部">
                                <Select.Option value="1">自营</Select.Option>
                                <Select.Option value="2">加盟</Select.Option>
                            </Select>
                        )
                    }
                </Form.Item>
                <Form.Item label="用车模式" {...formItemLayout}>
                    {
                        getFieldDecorator("use_mode",{
                            initialValue: '1'
                        })(
                            <Select  placeholder="全部">
                                <Select.Option value="1">指定停车点</Select.Option>
                                <Select.Option value="2">禁停区</Select.Option>
                            </Select>
                        )
                    }
                </Form.Item>
            </Form>
        )
    }
}
OpenCityForm = Form.create()(OpenCityForm)

