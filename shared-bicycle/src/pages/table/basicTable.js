import React, { Component } from 'react'
import { Card, Table, Modal, Button, message } from 'antd'
import axios from './../../axios/index'
import './table.less'
import utils from '../../utils/utils';

export default class BasicTable extends Component {

    state = {}
    params = {
        page: 1
    }
           
    componentWillMount(){
        const data=[
            {
                id:'1',
                userName: '关羽',
                sex: 1,
                state: 1,
                interest: [1,2,3],
                birthday: '2018-01-01',
                address: '蜀国',
                time: '08:30'
            },
            {
                id:'2',
                userName: '张飞',
                sex: 1,
                state: 1,
                interest: [1,2,3],
                birthday: '2018-01-01',
                address: '蜀国',
                time: '08:30'
            },
            {
                id:'3',
                userName: '赵云',
                sex: 1,
                state: 1,
                interest: [1,2,3],
                birthday: '2018-01-01',
                address: '蜀国',
                time: '08:30'
            },
            {
                id:'4',
                userName: '黄忠',
                sex: 1,
                state: 1,
                interest: [1,2,3],
                birthday: '2018-01-01',
                address: '蜀国',
                time: '08:30'
            },
            {
                id:'5',
                userName: '马超',
                sex: 1,
                state: 1,
                interest: [1,2,3],
                birthday: '2018-01-01',
                address: '蜀国',
                time: '08:30'
            }
        ]

        //指定表格数据唯一，防止页面报警告
        data.map((item,index)=>{
            item.key = index
        })

        this.setState({
            data
        })  

        this.request()  
    }

    request = () => {  
       let _this = this;
       axios.ajax({
            url: '/table/list',  
            data:{
                params:{
                    page: this.params.page
                }
            }     
       }).then((res)=>{
            if(res.code === 0){
                //指定表格数据唯一，防止页面报警告
                res.result.list.map((item,index)=>{
                    item.key = index
                })            
                this.setState({
                    dataSource: res.result.list,
                    pagination: utils.pagination(res,(current)=>{ //调用分页
                        _this.params.page = current; //保存当前页数
                        this.request(); //调用数据
                    }),
                    selectedRowKeys: [], //清除选中的索引
                    selectedRows: null, //清除选中的行
                })
            }
       })
    }

    //单选---点击的行
    onRowClick = (record, index) => {
        
        Modal.info({
            title: '提示',
            content: `当前用户是：${record.userName}，状态是：${record.state}`,
            okText: "确定"
        })
        let selectKey = [index] //获取点击的索引
        this.setState({
            selectedRowKeys:selectKey, //选中的索引
            selectedItem:record  //选中的哪一项
        })
    }

    //多选选---点击的行
    onRowCheckClick = (record, index) => {
        let selectKey = [index] //获取点击的索引
        this.setState({
            selectedCheckRowKeys:selectKey, //选中的索引
            selectedCheckItem:record  //选中的哪一项
        })
    }

    //多选执行删除操作
    handleDelete = ()=> {
        let rows = this.state.selectedRows;
        let ids = []  //存放要删除的id
        rows.map((item)=>{
            ids.push(item.id)
        })
        Modal.confirm({
            title: '删除提示',
            content: `你确定要删除这些数据：${ids.join(',')}`,
            okText:'确定',
            cancelText: '取消',
            onOk:()=>{
                message.success('删除成功！');
                this.request(); //删除后出现加载图标
            }
        })
    }

    render() {

        const columns =[
            {
                title: 'id',
                dataIndex: 'id',
            },
            {
                title: '用户名',
                dataIndex: 'userName',
            },
            {
                title: '性别',
                dataIndex: 'sex',
                render(sex){
                    return sex === 1 ? '男':'女'
                }
            },
            {
                title: '状态',
                dataIndex: 'state',
                render(state){
                    let config={
                        '1':'咸鱼一条',
                        '2':'风华浪子',
                        '3':'江南才子',
                        '4':'红尘旧梦',
                        '5':'河畔一角'
                    }
                    return config[state]
                }
            },
            {
                title: '爱好',
                dataIndex: 'interest',
                render(interest){
                    let config={
                        '1':'篮球',
                        '2':'上网',
                        '3':'游泳',
                        '4':'爬山',
                        '5':'唱歌',
                        '6':'跳舞',
                        '7':'睡觉',
                        '8':'足球'
                    }
                    return config[interest]
                }
            },
            {
                title: '生日',
                dataIndex: 'birthday',
            },
            {
                title: '地址',
                dataIndex: 'address',
            },
            {
                title: '早期时间',
                dataIndex: 'time',
            }
        ];

        //定义单选
        const selectedRowKeys =  this.state.selectedRowKeys    
        const rowSelection = {  //绑定表格单选
            type: 'radio',
            selectedRowKeys
        }
        //定义多选
        // const selectedCheckRowKeys = this.state.selectedCheckRowKeys;
        const rowCheckSelection = {  //绑定表格单选
            type: 'checkbox',
            // selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows)=>{
                // console.log(selectedRowKeys,selectedRows);
                this.setState({
                    selectedRowKeys:this.state.selectedCheckRowKeys,
                    selectedRows
                })
            }
        }

        return (
        <div>
            <Card title="基础表格" className="card-wrap">
                    <Table 
                        bordered   //加边框
                        columns={columns}
                        dataSource={this.state.data}
                        pagination={false} //取消分页
                    />
            </Card>

            <Card title="动态表格数据" className="card-wrap">
                    <Table 
                        bordered   //加边框
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={false} //取消分页
                    />
            </Card>

            <Card title="动态表格数据---单选" className="card-wrap">
                    <Table 
                        bordered   //加边框
                        rowSelection={rowSelection}
                        columns={columns}
                        dataSource={this.state.dataSource}
                        pagination={false} //取消分页
                        onRow={(record, index) => {  //点击行
                                return {
                                    onClick: () => {
                                        this.onRowClick(record, index)
                                    },       
                                }
                            }
                        }
                    />
            </Card>

            
            <Card title="动态表格数据---多选" className="card-wrap">
                <div>
                    <Button type="primary" style={{marginBottom: 10}} onClick={this.handleDelete}>删除</Button>
                </div>
                <Table 
                    bordered   //加边框
                    rowSelection={rowCheckSelection}
                    columns={columns}
                    dataSource={this.state.dataSource}
                    pagination={false} //取消分页
                    onRow={(record, index) => {  //点击行
                        return {
                            onClick: () => {
                                this.onRowCheckClick(record, index)
                            },       
                        }
                    }}
                />
            </Card>

              
            <Card title="表格分页" className="card-wrap">
                <Table 
                    bordered   //加边框
                    columns={columns}
                    dataSource={this.state.dataSource}
                    pagination={this.state.pagination}
                    // pagination
                />
            </Card>

        </div>
        )
    }
}
