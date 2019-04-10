import React, { Component } from 'react'
import { Card, Table, Button, message, Badge, Modal } from 'antd'
import axios from './../../axios/index'
import './table.less'
import utils from '../../utils/utils';

export default class HighTable extends Component {

    state = {}
    params = {
        page: 1
    }

    componentWillMount() {
        this.request()
    }

    //发送请求获取数据
    request = () => {
        let _this = this;
        axios.ajax({
            url: '/table/high/list',
            data: {
                params: {
                    page: this.params.page
                }
            }
        }).then((res) => {
            
            if (res.code === 0) {
                //指定表格数据唯一，防止页面报警告
                res.result.list.map((item, index) => {
                    item.key = index
                })
                this.setState({
                    dataSource: res.result.list,
                    pagination: utils.pagination(res, (current) => { //调用分页
                        _this.params.page = current; //保存当前页数
                        this.request(); //调用数据
                    }),
                    selectedRowKeys: [], //清除选中的索引
                    selectedRows: null, //清除选中的行
                })
            }
        })
    }

    //排序
    handleChange = (pagination, filters, sorter) => {
        this.setState({
            sortOrder: sorter.order
        })
    }

    //删除操作
    handleDelete = (item)=>{
        let id = item.id;
        Modal.confirm({
            title: '提示',
            content: '你确定要删除此条数据吗？',
            okText: '确定',
            cancelText: '取消',
            onOk:()=>{
                message.success('删除成功！');
                this.request();
            }
        })
    }

    render() {

        const columns = [
            {
                title: 'id',
                dataIndex: 'id',
                width: 80,
            },
            {
                title: '用户名',
                dataIndex: 'username',
                width: 80,
            },
            {
                title: '性别',
                dataIndex: 'sex',
                width: 80,
                render(sex) {
                    return sex === 1 ? '男' : '女'
                }
            },
            {
                title: '状态',
                dataIndex: 'state',
                width: 80,
                render(state) {
                    let config = {
                        '1': '咸鱼一条',
                        '2': '风华浪子',
                        '3': '江南才子',
                        '4': '红尘旧梦',
                        '5': '河畔一角'
                    }
                    return config[state]
                }
            },
            {
                title: '爱好',
                dataIndex: 'interest',
                width: 80,
                render(interest) {
                    let config = {
                        '1': '篮球',
                        '2': '上网',
                        '3': '游泳',
                        '4': '爬山',
                        '5': '唱歌',
                        '6': '跳舞',
                        '7': '睡觉',
                        '8': '足球'
                    }
                    return config[interest]
                }
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                width: 120,
            },
            {
                title: '地址',
                dataIndex: 'address',
                width: 160,
            },
            {
                title: '早起时间',
                dataIndex: 'time',
                width: 120,
            }
        ];

        const columns2 = [
            {
                title: 'id',
                dataIndex: 'id',
                fixed: 'left', //固定列
                width: 80,
            },
            {
                title: '用户名',
                dataIndex: 'username',
                fixed: 'left', //固定列
                width: 80,
            },
            {
                title: '性别',
                dataIndex: 'sex',
                width: 80,
                render(sex) {
                    return sex === 1 ? '男' : '女'
                }
            },
            {
                title: '状态',
                dataIndex: 'state',
                width: 80,
                render(state) {
                    let config = {
                        '1': '咸鱼一条',
                        '2': '风华浪子',
                        '3': '江南才子',
                        '4': '红尘旧梦',
                        '5': '河畔一角'
                    }
                    return config[state]
                }
            },
            {
                title: '爱好',
                dataIndex: 'interest',
                width: 80,
                render(interest) {
                    let config = {
                        '1': '篮球',
                        '2': '上网',
                        '3': '游泳',
                        '4': '爬山',
                        '5': '唱歌',
                        '6': '跳舞',
                        '7': '睡觉',
                        '8': '足球'
                    }
                    return config[interest]
                }
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                width: 120,
            },
            {
                title: '地址',
                dataIndex: 'address',
                width: 160,
            },
            {
                title: '地址',
                dataIndex: 'address',
                width: 160,
            },
            {
                title: '地址',
                dataIndex: 'address',
                width: 160,
            },
            {
                title: '地址',
                dataIndex: 'address',
                width: 160,
            },
            {
                title: '地址',
                dataIndex: 'address',
                width: 160,
            },
            {
                title: '地址',
                dataIndex: 'address',
                width: 160,
            },
            {
                title: '早起时间',
                dataIndex: 'time',
                fixed: 'right', //固定列
                width: 120,
            }
        ];

        const columns3 = [
            {
                title: 'id',
                dataIndex: 'id',
                width: 80,
            },
            {
                title: '用户名',
                dataIndex: 'username',
                width: 80,
            },
            {
                title: '性别',
                dataIndex: 'sex',
                width: 80,
                render(sex) {
                    return sex === 1 ? '男' : '女'
                }
            },
            {
                title: '年龄',
                dataIndex: 'age',
                width: 80,
                sorter: (a,b)=>{
                    return a.age-b.age
                },
                sortOrder: this.state.sortOrder,
            },
            {
                title: '状态',
                dataIndex: 'state',
                width: 80,
                render(state) {
                    let config = {
                        '1': '咸鱼一条',
                        '2': '风华浪子',
                        '3': '江南才子',
                        '4': '红尘旧梦',
                        '5': '河畔一角'
                    }
                    return config[state]
                }
            },
            {
                title: '爱好',
                dataIndex: 'interest',
                width: 80,
                render(interest) {
                    let config = {
                        '1': '篮球',
                        '2': '上网',
                        '3': '游泳',
                        '4': '爬山',
                        '5': '唱歌',
                        '6': '跳舞',
                        '7': '睡觉',
                        '8': '足球'
                    }
                    return config[interest]
                }
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                width: 120,
            },
            {
                title: '地址',
                dataIndex: 'address',
                width: 160,
            },
            {
                title: '早起时间',
                dataIndex: 'time',
                width: 120,
            }
        ];

        const columns4 = [
            {
                title: 'id',
                dataIndex: 'id',
                width: 80,
            },
            {
                title: '用户名',
                dataIndex: 'username',
                width: 80,
            },
            {
                title: '性别',
                dataIndex: 'sex',
                width: 80,
                render(sex) {
                    return sex === 1 ? '男' : '女'
                }
            },
            {
                title: '年龄',
                dataIndex: 'age',
                width: 80,
                sorter: (a,b)=>{
                    return a.age-b.age
                },
                sortOrder: this.state.sortOrder,
            },
            {
                title: '状态',
                dataIndex: 'state',
                width: 80,
                render(state) {
                    let config = {
                        '1': <Badge status="success" text="成功"/>,
                        '2': <Badge status="default" text="正常"/>,
                        '3': <Badge status="error" text="错误"/>,
                        '4': <Badge status="processing" text="进行中"/>,
                        '5': <Badge status="warning" text="警告"/>
                    }
                    return config[state]
                }
            },
            {
                title: '爱好',
                dataIndex: 'interest',
                width: 80,
                render(interest) {
                    let config = {
                        '1': '篮球',
                        '2': '上网',
                        '3': '游泳',
                        '4': '爬山',
                        '5': '唱歌',
                        '6': '跳舞',
                        '7': '睡觉',
                        '8': '足球'
                    }
                    return config[interest]
                }
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                width: 120,
            },
            {
                title: '地址',
                dataIndex: 'address',
                width: 160,
            },
            {
                title: '早起时间',
                dataIndex: 'time',
                width: 120,
            },
            {
                title: '操作',
                width: 120,
                render: (text, item) => {
                    return <a href="javascript:;" onClick={(item)=>{this.handleDelete(item)}}>删除</a>
                    // return <Button type="danger" onClick={(item)=>{this.handleDelete(item)}}>删除</Button>
                }
            }
        ];
        
        return (
            <div>
                <Card title="表格---头部固定" className="card-wrap">
                    <Table
                        bordered   //加边框
                        columns={columns}
                        dataSource={this.state.dataSource}
                        scroll={{y:240}}
                    />
                </Card>

                <Card title="表格---左右固定" className="card-wrap">
                    <Table
                        bordered   //加边框
                        columns={columns2}
                        dataSource={this.state.dataSource}
                        scroll={{x: 1560,y: 240}}
                    />
                </Card>

                <Card title="表格---排序" className="card-wrap">
                    <Table
                        bordered   //加边框
                        columns={columns3}
                        dataSource={this.state.dataSource}
                        onChange = {this.handleChange}
                    />
                </Card>

                <Card title="表格---操作" className="card-wrap">
                    <Table
                        bordered   //加边框
                        columns={columns4}
                        dataSource={this.state.dataSource}
                        onChange = {this.handleChange}
                    />
                </Card>

            </div>
        )
    }
}
