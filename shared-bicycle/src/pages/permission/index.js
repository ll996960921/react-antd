import React, { Component } from 'react'
import { Card, Button, Table, Modal, Form, Input, Select, message, Tree, Transfer } from 'antd'
import utils from './../../utils/utils'
import menuConfig from './../../config/menuConfig'
import axios from './../../axios'
import './index.less'

export default class Permission extends Component {

    state = {
        isShowRoleVisible: false,
        isShowPermVisible: false,
        isUserVisible: false
    }

    componentWillMount(){
        this.requestList();
    }

    //请求列表数据
    requestList = ()=>{
        axios.ajax({
            url: '/role/list',
            data: {
                params: {}
            }
        }).then((res)=>{
            if(res.code == 0){
                let list  = res.result.item_list.map((item,i)=>{
                    item.key = i;
                    return item;
                })
                this.setState({
                    list,
                    selectedRowKeys:[],
                    selectedItem: null
                })
            }
        })
    }

    //点击按钮创建用户
    handleCreate = ()=>{ 
        this.setState({
            isShowRoleVisible: true
        })
    }
    //点击弹框确定创建用户
    onOkRoleSubmit = ()=>{
        let data =  this.roleForm.props.form.getFieldsValue();//获取表但是数据
        // console.log(data);
        axios.ajax({
            url:'/role/create',
            data: {
                params: {
                    ...data
                }
            }
        }).then((res)=>{
            if(res.code == 0){
                this.setState({
                    isShowRoleVisible: false
                })
                this.requestList();
                message.success("创建用户成功！")
                this.roleForm.props.form.resetFields(); //清空创建框数据
            }
        })
        
    }

    //点击按钮设置角色权限
    handlePermission = ()=>{
        let item = this.state.selectedItem;
        // console.log(item);
        if(!item){
            Modal.info({
                title: '提示',
                content: '请选择一个角色'
            })
            return;
        }
        this.setState({
            isShowPermVisible: true,
            detailInfo: item,
            menuInfo: item.menus
        })
    }

    //点击弹框确定角色权限设置
    onOkPermSubmit = ()=>{
        let data = this.permForm.props.form.getFieldsValue(); //取出表单中的值
        data.role_id = this.state.selectedItem.id;
        data.menus = this.state.menuInfo;
        console.log({...data});
        axios.ajax({
            url:'/permission/edit',
            data: {
                params: {
                    ...data
                }
            }
        }).then((res)=>{
            if(res.code == 0){
                this.setState({
                    isShowPermVisible: false,
                })
                this.requestList();
                message.success("设置成功！")
            }
        })
       
    }

    //点击按钮用户授权
    handleUserAuth = ()=>{
        let item = this.state.selectedItem;
        if(!item){
            Modal.info({
                title: '提示',
                content: '请选择一个用户'
            })
            return;
        }
        this.getRoleUserList(item.id);
        this.setState({
            isUserVisible: true,
            isAuthClosed: false,
            detailInfo: item
        })
    }

    //获取角色用户
    getRoleUserList = (id)=>{
        axios.ajax({
            url: '/role/user_list',
            data: {
                params: {
                    id
                }
            }
        }).then((res)=>{
            if(res){
                this.getAuthUserList(res.result);
            }
        })
    }

    //筛选目标用户
    getAuthUserList = (dataSource) => {
        const mockData = [];
        const targetKeys = [];
        if (dataSource && dataSource.length > 0) {
            for (let i = 0; i < dataSource.length; i++) {
                const data = {
                    key: dataSource[i].user_id,
                    title: dataSource[i].user_name,
                    status: dataSource[i].status,
                };
                if (data.status == 1) {
                    targetKeys.push(data.key);
                }
                 mockData.push(data);
            }
        }
        this.setState({mockData, targetKeys});
    }

    //用户授权提交
    onOkUserSubmit = ()=>{
        let data = {};
        data.user_ids = this.state.targetKeys || [];
        data.role_id = this.state.selectedItem.id;
        axios.ajax({
            url:'/role/user_role_edit',
            data:{
                params:{
                    ...data
                }
            }
        }).then((res)=>{
            if(res){
                this.setState({
                    isUserVisible:false
                })
                message.success("用户授权成功！")
                this.requestList();
            }
        })
    }


    //绑定表格点击，及数据获取
    onRowClick = (record, index)=>{
        let selectKey = [index];
        this.setState({
            selectedRowKeys: selectKey,
            selectedItem: record
        })
    }
    
  render() {

    const columns = [
        {
            title: '角色ID',
            dataIndex: 'id'
        }, {
            title: '角色名称',
            dataIndex: 'role_name'
        },{
            title: '创建时间',
            dataIndex: 'create_time',
            render: utils.formateDate
        }, {
            title: '使用状态',
            dataIndex: 'status',
            render(status){
                if (status == 1) {
                    return "启用"
                } else {
                    return "停用"
                }
            }
        }, {
            title: '授权时间',
            dataIndex: 'authorize_time',
            render: utils.formateDate
        }, {
            title: '授权人',
            dataIndex: 'authorize_user_name',
        }
    ];

    
    //定义表格单选及选中
    const selectedRowKeys = this.state.selectedRowKeys;
    const rowSelection = {
        type: 'radio',
        selectedRowKeys  //绑定点击行后，单选按钮被选中
    }

    return (
      <div>
          <Card className="card-wrap">
            <Button type="primary" onClick={this.handleCreate}>创建用户</Button>
            <Button type="primary" onClick={this.handlePermission}>设置权限</Button>
            <Button type="primary" onClick={this.handleUserAuth}>用户授权</Button>
          </Card>
          <Card className="card-wrap">
            <Table 
                bordered
                columns={columns}
                dataSource={this.state.list}
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
            title="创建用户"
            okText="确定"
            cancelText="取消"
            visible={this.state.isShowRoleVisible}
            onCancel={()=>{
                this.roleForm.props.form.resetFields(); //清除表单数据
                this.setState({isShowRoleVisible: false})
            }}
            onOk={this.onOkRoleSubmit}
           >
                <RoleForm  wrappedComponentRef={(inst)=>this.roleForm=inst}/>
          </Modal>
          <Modal 
            title="设置权限"
            okText="确定"
            cancelText="取消"
            width={600}
            visible={this.state.isShowPermVisible}
            onCancel={()=>{
                // this.roleForm.props.form.resetFields(); //清除表单数据
                this.setState({isShowPermVisible: false})
            }}
            onOk={this.onOkPermSubmit}
          >
            <PermForm 
                detailInfo={this.state.detailInfo}
                menuInfo={this.state.menuInfo}
                patchMenuInfo={(selectedKeys)=>{this.setState({menuInfo: selectedKeys})}} //传会子组件勾选的复选框
                wrappedComponentRef={(inst)=>this.permForm=inst}   //获取表单中的值
            />
          </Modal>
          <Modal
                title="用户授权"
                okText="确定"
                cancelText="取消"
                width={800}
                visible={this.state.isUserVisible}
                onOk={this.onOkUserSubmit}
                onCancel={()=>{
                    this.setState({isUserVisible: false})
                }}
            >
                <RoleAuthForm 
                    detailInfo={this.state.detailInfo}
                    targetKeys={this.state.targetKeys}
                    mockData={this.state.mockData}
                    patchUserInfo={(targetKeys)=>{this.setState({targetKeys})}} //传回子组件勾选的复选框
                    wrappedComponentRef={(inst)=>this.roleAuthForm=inst}   //获取表单中的值
            />
          </Modal>
      </div>
    )
  }
}

//创建角色
class RoleForm extends Component{
    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol:{span:5},
            wrapperCol:{span:16}
        };
        return(
            <Form layout="horizontal">
                <Form.Item label="角色名称" {...formItemLayout}>
                    {
                        getFieldDecorator("role_name")(
                            <Input placeholder="请输入角色名称"/>
                        )
                    }
                </Form.Item>
                <Form.Item label="状态" {...formItemLayout}>
                    {
                        getFieldDecorator("state",{
                            initialValue: 0
                        })(
                           <Select>
                               <Select.Option value={0}>关闭</Select.Option>
                               <Select.Option value={1}>开启</Select.Option>
                           </Select>
                        )
                    }
                </Form.Item>
            </Form>
        )
    }
}
RoleForm = Form.create({})(RoleForm)


//设置权限
class PermForm extends Component{

    //加载权限节点
    renderTreeNodes = (data)=> data.map((item)=>{
        if(item.children){
            return (
                <Tree.TreeNode title={item.title} key={item.key} >
                    {this.renderTreeNodes(item.children)}
                </Tree.TreeNode>
            )
        }
        return <Tree.TreeNode {...item}/>
    })

    //获取数据，传递到父组件中
    onCheck = (checkedKeys)=>{
        this.props.patchMenuInfo(checkedKeys); //调用父组件中的方法，将数据传递到父组件中
    }
    

    render(){
        const { getFieldDecorator } = this.props.form;
        const detail_info = this.props.detailInfo;
        const menuInfo = this.props.menuInfo;
        // console.log(menuInfo);
        
        const formItemLayout = {
            labelCol:{span:5},
            wrapperCol:{span:16}
        };
        return(
            <Form layout="horizontal">
                <Form.Item label="角色名称" {...formItemLayout}>
                {
                    getFieldDecorator("role_name",{
                        initialValue: detail_info.role_name
                    })(
                        <Input disabled/>
                    )
                }
                </Form.Item>
                <Form.Item label="状态" {...formItemLayout}>
                {
                    getFieldDecorator("status",{
                        initialValue: detail_info.status
                    })(
                        <Select>
                            <Select.Option value={1}>启用</Select.Option>
                            <Select.Option value={0}>停用</Select.Option>
                        </Select>
                    )
                }
                </Form.Item>
                <Tree
                    checkable
                    defaultExpandAll
                    onCheck={(checkedKeys)=>{ //获取选中的值的id
                        this.onCheck(checkedKeys)
                    }}
                    checkedKeys={menuInfo} //渲染该用户已经拥有的权限
                >
                    <Tree.TreeNode title="平台权限" key="all_permission">
                        {this.renderTreeNodes(menuConfig)}
                    </Tree.TreeNode>
                </Tree>
            </Form>
        )
    }
}
PermForm = Form.create({})(PermForm)

//用户授权
class RoleAuthForm extends Component{

    
    filterOption = (inputValue, option) => {
        return option.title.indexOf(inputValue) > -1;
    };

    handleChange = (targetKeys) => {
        this.props.patchUserInfo(targetKeys);
    };

    render(){
        const { getFieldDecorator } = this.props.form;
        const detail_info = this.props.detailInfo;
        
        const formItemLayout = {
            labelCol:{span:5},
            wrapperCol:{span:16}
        };
        return(
            <Form layout="horizontal">
                <Form.Item label="角色名称" {...formItemLayout}>
                {
                    getFieldDecorator("role_name",{
                        initialValue: detail_info.role_name
                    })(
                        <Input disabled maxLength={8} style={{width:450}}/>
                    )
                }
                </Form.Item>
                <Form.Item label="选择用户：" {...formItemLayout}>
                    <Transfer
                        listStyle={{width: 200,height: 400}}
                        dataSource={this.props.mockData}
                        showSearch
                        titles={['待选用户', '已选用户']}
                        searchPlaceholder='输入用户名'
                        filterOption={this.filterOption}
                        targetKeys={this.props.targetKeys}
                        onChange={this.handleChange}
                        render={item => item.title}
                    />
                </Form.Item>
            </Form>
        )
    }
}
RoleAuthForm = Form.create({})(RoleAuthForm)