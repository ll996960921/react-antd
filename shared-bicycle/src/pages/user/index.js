import React, { Component } from 'react'
import { Card, Button, Table, Form, Input, Select, Modal, message, DatePicker, Radio } from 'antd'
import moment from 'moment'
import axios from './../../axios'
import utils from '../../utils/utils';
// import './index.less'

export default class User extends Component {

    state = {
        userInfo: [], //保存用户详情
        isVisble: false
    }

    componentWillMount(){
        this.requestList();
    }

    //获取接口数据
    requestList = ()=>{
        let _this = this;
        axios.ajax({
            url: '/table/list1',
            data: {
                params: {
                   page: 1
                }
            }
        }).then((res)=>{
            if(res.code == '0'){
                let list = res.result.list.map((item, index)=>{
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

    //操作员工
    handleClick = (type)=>{
        let item = this.state.selectedItem; //获取点击的行的数据
        if(type=="create"){
            this.setState({
                title: '创建员工',
                isVisble: true,
                type
            })
        }
        else if(type=="edit" || type=="detail"){
            if(!item){
                Modal.info({
                    title:'提示',
                    content:'请选择一个用户'
                })
                return;
            }
            this.setState({
                title: type=='edit'?'编辑员工':'查看详情',
                isVisble: true,
                userInfo: item,
                type
            })
        }else if(type=="delete"){
            if(!item){
                Modal.info({
                    title:'提示',
                    content:'请选择一个用户'
                })
                return;
            }
            Modal.confirm({
                title: '提示',
                content: `你确定要删除用户 “${item.username}” 吗？`,
                okText: '确认',
                cancelText: '取消',
                onCancel: ()=>{this.setState({isVisble:false})},
                onOk: ()=>{
                    axios.ajax({
                        url: '/user/delete',
                        data:{
                            params: {
                                id: item.id
                            }
                        }
                    }).then((res)=>{
                        if(res.code ==0){
                            message.success("删除成功！")
                            this.setState({
                                isVisible:false
                            })
                            this.requestList();
                        }
                    })
                }
            })
        }      
    }

    onOkSubmit = ()=>{
        let type = this.state.type;
        let data = this.userForm.props.form.getFieldsValue();//获取表单数据
        axios.ajax({
            url:type == 'create'?'/user/add':'/user/edit',
            data: {
                params: {
                    ...data
                }
            }
        }).then((res)=>{
            if(res.code == 0){
                message.success('保存成功！')
                this.setState({
                    isVisble: false,
                    userInfo:''
                })
                this.requestList(); //刷新列表
            }
        })
        
    }

    render() {

        const columns = [{
            title: 'id',
            dataIndex: 'id'
          }, {
            title: '用户名',
            dataIndex: 'username'
          }, {
            title: '性别',
            dataIndex: 'sex',
            render(sex){
                return sex ==1 ?'男':'女'
            }
          }, {
            title: '状态',
            dataIndex: 'state',
            render(state){
                let config = {
                    '1':'咸鱼一条',
                    '2':'风华浪子',
                    '3':'江南才子',
                    '4':'红尘旧梦',
                    '5':'昙花一现'
                }
                return config[state];
            }
          },{
            title: '爱好',
            dataIndex: 'interest',
            render(interest){
                let config = {
                    '1':'游泳',
                    '2':'打篮球',
                    '3':'踢足球',
                    '4':'跑步',
                    '5':'爬山',
                    '6':'骑行',
                    '7':'桌球',
                    '8':'麦霸'
                }
                return config[interest];
            }
          },{
            title: '爱好',
            dataIndex: 'isMarried',
            render(isMarried){
                return isMarried?'已婚':'未婚'
            }
          },{
            title: '生日',
            dataIndex: 'birthday'
          },{
            title: '联系地址',
            dataIndex: 'address'
          },{
            title: '早起时间',
            dataIndex: 'time'
          }
        ];

        const selectedRowKeys = this.state.selectedRowKeys;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys //绑定点击行后，单选按钮被选中
        }

        return (
        <div>
            <Card className="card-wrap">
                <FilterForm />
            </Card>
            <Card className="card-wrap">
                <Button type="primary" icon="plus" onClick={()=>{this.handleClick("create")}}>创建员工</Button>
                <Button type="primary" icon="edit" onClick={()=>{this.handleClick("edit")}} >编辑员工</Button>
                <Button type="primary" icon="profile" onClick={()=>{this.handleClick("detail")}} >员工详情</Button>
                <Button type="danger" icon="delete" onClick={()=>{this.handleClick("delete")}}>删除员工</Button>
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
                title={this.state.title}
                okText="确认"
                cancelText="取消"
                visible={this.state.isVisble}
                onCancel={()=>{
                    this.userForm.props.form.resetFields();//清除表单数据
                    this.setState({
                        isVisble:false,
                        userInfo: ''
                    })
                }}
                onOk={this.onOkSubmit}
                width={600}
            >
                <UserForm 
                    userInfo={this.state.userInfo} 
                    type={this.state.type} 
                    wrappedComponentRef={(inst)=>this.userForm=inst}
                />
            </Modal>
        </div>
        )
  }
}

//顶部表格
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
                <Form.Item label="用户名">
                    {
                        getFieldDecorator("username")(
                            <Input placeholder="请输入用户名名称"/>
                        )
                    }
                </Form.Item>
                <Form.Item label="用户手机号码">
                    {
                        getFieldDecorator("phone")(
                            <Input placeholder="请输入密码"/>
                        )
                    }
                </Form.Item>
                <Form.Item label="请选择入职日期">
                    {
                        getFieldDecorator("time")(
                            <DatePicker showTime format="YYYY-MM-DD"/>
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


//模态框表格
class UserForm extends Component{

    getState = (state)=>{
        return {
            '1':'咸鱼一条',
            '2':'风华浪子',
            '3':'江南才子',
            '4':'红尘旧梦',
            '5':'昙花一现'
        }[state]
    }

    render(){

        const formItemLayout = {  //模态框布局
            labelCol: {span: 6}, //标签占的大小
            wrapperCol: {span: 12}, //框体占的大小
        }

        const { getFieldDecorator } = this.props.form; //双向绑定表格数据
        const userInfo = this.props.userInfo || {}; //取出父组件传过来的用户信息
        // console.log(userInfo);
        
        const type = this.props.type; //取出父组件穿过来的类型
        
        return(
            <Form layout="horizontal">
                    
                <Form.Item label="姓名" {...formItemLayout}>
                    {
                        userInfo && type=='detail'? userInfo.username:
                        getFieldDecorator("user_name",{
                            initialValue: userInfo.username
                        })(
                            <Input placeholder="请输入用户名"/>
                        )
                    }
                
                </Form.Item>
            
                <Form.Item label="性别" {...formItemLayout}>
                    {
                        userInfo && type=='detail'? userInfo.sex==1?'男':'女':
                        getFieldDecorator("sex",{
                            initialValue: userInfo.sex
                        })(
                        <Radio.Group>
                            <Radio value={1}>男</Radio>
                            <Radio value={2}>女</Radio>
                        </Radio.Group>  
                        ) 
                    }
                </Form.Item>
                <Form.Item label="状态" {...formItemLayout}>
                {
                        userInfo && type=='detail'? this.getState(userInfo.state):
                        getFieldDecorator("state",{
                            initialValue: userInfo.state
                        })(
                            <Select>
                                <Select.Option value={1}>咸鱼一条</Select.Option>
                                <Select.Option value={2}>风华浪子</Select.Option>
                                <Select.Option value={3}>江南才子</Select.Option>
                                <Select.Option value={4}>红尘旧梦</Select.Option>
                                <Select.Option value={5}>昙花一现</Select.Option>
                            </Select> 
                        ) 
                    }
                </Form.Item>
                <Form.Item label="生日" {...formItemLayout}>
                    {
                        userInfo && type=='detail'?userInfo.birthday:
                        getFieldDecorator("birthday",{
                            initialValue: moment(userInfo.birthday)
                        })(
                            <DatePicker/>
                        ) 
                    }
                </Form.Item>
                <Form.Item label="联系地址" {...formItemLayout}>
                    {
                        userInfo && type=='detail'?userInfo.address:
                        getFieldDecorator("address",{
                            initialValue: userInfo.address
                        })(
                            <Input.TextArea autosize={{minRows:2,maxRows:3}} placeholder="请输入联系地址"/>
                        ) 
                    }
                </Form.Item>
            </Form>
        )
    }
}
UserForm = Form.create({})(UserForm)