import React, { Component } from 'react'
import { Card, Button, Table, Form, Input, Select, Modal, message, DatePicker } from 'antd'
import axios from './../../axios'
import utils from '../../utils/utils';
import './index.less'

export default class Order extends Component {

    state = {
        orderInfo: [], //保存订单详情
        orderConfirmVisble: false
    }

    componentWillMount(){
        this.requestList();
    }

    //获取接口数据
    requestList = ()=>{
        let _this = this;
        axios.ajax({
            url: '/order/list',
            data: {
                params: {
                   page: 1
                }
            }
        }).then((res)=>{
            if(res.code == '0'){
                let list = res.result.item_list.map((item, index)=>{
                    item.key = index;
                    return item;
                })
                this.setState({
                    list,
                    pagination: utils.pagination(res,(current)=>{
                        _this.params.page = current;
                        _this.requestList(); //从新请求列表
                    }),
                    selectedRowKeys: [], //清空选中的行index
                    selectedItem: null,  //清空选中的行的信息
                })
            }
        })
    }

    //点击按钮结束订单
    handleConfirm = ()=>{
        let item = this.state.selectedItem;
        if(!item){
            Modal.info({
                title: '提示',
                content: '请选择一条订单进行结束'                
            })
            return;
        }
        axios.ajax({
            url:'/order/ebike_info',
            data:{
                params:{
                    orderId: item.id
                }
            }
        }).then((res)=>{ 
            // console.log(res.result);
            if(res.code ==0 ){
                this.setState({
                    orderInfo:res.result,  //订单详情
                    orderConfirmVisble: true
                })
            }
        })
    }
  
    //结束订单确认
    handleFinishOrder = ()=>{
        let item = this.state.selectedItem;
        axios.ajax({
            url: '/order/finish_order',
            data: {
                params: {
                    orderId: item.id
                }
            }
        }).then((res) => {
            if (res.code == 0) {
                message.success('订单结束成功')
                this.setState({
                    orderConfirmVisble: false
                })
                this.requestList();
            }
        })
    }

    //点击按钮打开订单详情
    handleOpenDetail =()=>{
        let item = this.state.selectedItem;
        if(!item){
            Modal.info({
                title: '提示',
                content: '请选中一条订单'                
            })
            return;
        }
        // window.location.href=`/#/common/order/detail/${item.id}` //本窗口打开
        window.open(`/#/common/order/detail/${item.id}`,'_blank'); //通过新窗口打开
    }

    /**
     * @param: record 获得点击的行的值
     * @param: index 获取点击的行的行号
     */
    //点击行事件
    onRowClick = (record, index)=>{
        // console.log(record); 
        let selectKey = [index]
        this.setState({
            selectedRowKeys: selectKey,  //保存选中的index
            selectedItem: record,   //保存选中的行的值
        })
    }

    render() {

        const columns = [
            {
                title:'订单编号',
                dataIndex:'order_sn'
            }, 
            {
                title: '车辆编号',
                dataIndex: 'bike_sn'
            }, 
            {
                title: '用户名',
                dataIndex: 'user_name',
            },
            {
                title: '手机号',
                dataIndex: 'mobile',
            }, 
            {
                title: '里程',
                dataIndex: 'distance'
            }, 
            {
                title: '行驶时长',
                dataIndex: 'total_time',
            }, 
            {
                title: '状态',
                dataIndex: 'status'
            }, 
            {
                title: '开始时间',
                dataIndex: 'start_time',
            }, 
            {
                title: '结束时间',
                dataIndex: 'end_time'
            }, 
            {
                title: '实付金额',
                dataIndex: 'user_pay'
            }
        ]

        const selectedRowKeys = this.state.selectedRowKeys;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys //绑定点击行后，单选按钮被选中
        }

        const formItemLayout = {  //模态框布局
            labelCol: {span: 5}, //标签占的大小
            wrapperCol: {span: 19}, //框体占的大小
        }

        return (
        <div>
            <Card className="card-wrap">
                <FilterForm />
            </Card>
            <Card className="card-wrap">
                <Button type="primary" onClick={this.handleOpenDetail}>订单详情</Button>
                <Button type="danger" onClick={this.handleConfirm}>结束订单</Button>
                <Table 
                    bordered
                    columns={columns}
                    dataSource={this.state.list}
                    pagination={this.state.pagination}
                    rowSelection={rowSelection}
                    onRow={(record, index)=>{
                        return { 
                           onClick: ()=>{  //点击行 record:行值, index:行号
                               this.onRowClick(record, index)
                           }
                        }
                    }}
                />
            </Card>
            <Modal
                title="结束订单"
                okText="确认"
                cancelText="取消"
                visible={this.state.orderConfirmVisble}
                onCancel={()=>{this.setState({orderConfirmVisble:false})}}
                onOk={this.handleFinishOrder}
                width={600}
            >
                <Form layout="horizontal">
                    <Form.Item label="车辆编号" {...formItemLayout}>
                        {this.state.orderInfo.bike_sn}
                    </Form.Item>
                    <Form.Item label="剩余电量" {...formItemLayout}>
                        {this.state.orderInfo.battery + '%'}
                    </Form.Item>
                    <Form.Item label="行程开始时间" {...formItemLayout}>
                        {this.state.orderInfo.start_time}
                    </Form.Item>
                    <Form.Item label="当前位置" {...formItemLayout}>
                        {this.state.orderInfo.location}
                    </Form.Item>
                </Form>
            </Modal>
        </div>
        )
  }
}


class FilterForm extends Component{

    //查询
    handleFieldSubmit = ()=>{
        let fieldsValue = this.props.form.getFieldsValue();
        console.log(JSON.stringify(fieldsValue));     
    }

    //重置
    handleReset = ()=>{
        this.props.form.resetFields();
    }

    render(){
        const { getFieldDecorator } = this.props.form;

        return(
            <Form layout="inline">
                <Form.Item label="开通城市">
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
                <Form.Item label="订单时间">
                    {
                        getFieldDecorator("start_time")(
                            <DatePicker placeholder="请选择时间" showTime format="YYYY-MM-DD HH:mm:ss"/>
                        )
                    }
                </Form.Item>
                <Form.Item label="~" colon={false}>
                    {
                        getFieldDecorator("end_time")(
                            <DatePicker placeholder="请选择时间" showTime format="YYYY-MM-DD HH:mm:ss"/>
                        )
                    }
                </Form.Item>
                <Form.Item label="订单状态">
                    {
                        getFieldDecorator('op_mode')(
                            <Select
                                style={{ width: 150 }}
                                placeholder="全部"
                            >
                                <Select.Option value="1">进行中</Select.Option>
                                <Select.Option value="2">结束行程</Select.Option>
                            </Select>
                        )
                    }
                </Form.Item>
                <Form.Item>
                    <Button type="primary" onClick={this.handleFieldSubmit}>查询</Button>
                    <Button onClick={this.handleReset}>重置</Button>
                </Form.Item>
            </Form>
        )
    }
}
FilterForm = Form.create({})(FilterForm);
