import React, { Component } from 'react'
import { Card, Form, Button, Select, DatePicker } from 'antd'
import axios from './../../axios'

export default class BikeMap extends Component {

    state = {
        bikeInfo: []
    }
    map = {}
    params = {
        page:1
    }

    componentWillMount(){
        this.requestList()
    }

    // 列表请求
    requestList = ()=>{
        axios.ajax({
            url:'/map/bike_list',
            data:{
                params:this.params
            }
        }).then((res)=>{
            if(res){
                // console.log(res);
                this.setState({
                    total_count:res.result.total_count
                },()=>{
                    
                })
                this.renderMap(res.result); //渲染地图
            }
        })
    }

    // 渲染地图
    renderMap = (res) => {
        let list = res.route_list;
        this.map = new window.BMap.Map("container", {enableMapClick: false});
        let gps1 = list[0].split(',');
        let startPoint = new window.BMap.Point(gps1[0], gps1[1]);
        let gps2 = list[list.length - 1].split(',');
        let endPoint = new window.BMap.Point(gps2[0], gps2[1]);

        this.map.centerAndZoom(endPoint, 11);
        // map.clearOverlays();

        //添加起始图标
        let startPointIcon = new window.BMap.Icon("/assets/start_point.png", new window.BMap.Size(36, 42), {
            imageSize: new window.BMap.Size(36, 42),
            anchor: new window.BMap.Size(18, 42)
        });
        
        var bikeMarkerStart = new window.BMap.Marker(startPoint, { icon: startPointIcon });
        this.map.addOverlay(bikeMarkerStart);

        let endPointIcon = new window.BMap.Icon("/assets/end_point.png", new window.BMap.Size(36, 42), {
            imageSize: new window.BMap.Size(36, 42),
            anchor: new window.BMap.Size(18, 42)
        });
        var bikeMarkerEnd = new window.BMap.Marker(endPoint, { icon: endPointIcon });
        this.map.addOverlay(bikeMarkerEnd);

        let routeList = [];
        list.forEach((item)=>{
            let p = item.split(",");
            let point = new window.BMap.Point(p[0], p[1]);
            routeList.push(point);
        })
        // 行驶路线
        var polyLine = new window.BMap.Polyline(routeList, {
            strokeColor: "#ef4136",
            strokeWeight: 3,
            strokeOpacity: 1
        });
        this.map.addOverlay(polyLine);

        // 服务区路线
        let serviceList = res.service_list;
        let servicePointist = [];
        serviceList.forEach((item) => {
            let point = new window.BMap.Point(item.lon, item.lat);
            servicePointist.push(point);
        })
        // 画线
        var polyServiceLine = new window.BMap.Polyline(servicePointist, {
            strokeColor: "#ef4136",
            strokeWeight: 3,
            strokeOpacity: 1
        });
        this.map.addOverlay(polyServiceLine);

        // 添加地图中的自行车
        let bikeList = res.bike_list;
        let bikeIcon = new window.BMap.Icon("/assets/bike.jpg", new window.BMap.Size(36, 42), {
            imageSize: new window.BMap.Size(36, 42),
            anchor: new window.BMap.Size(18, 42)
        });
        bikeList.forEach((item) => {
            let p = item.split(",");
            let point = new window.BMap.Point(p[0], p[1]);
            var bikeMarker = new window.BMap.Marker(point, { icon: bikeIcon });
            this.map.addOverlay(bikeMarker);
        })
        
        // 添加地图控件
        this.addMapControl();
    };

    // 添加地图控件
    addMapControl = () => {
        let map = this.map;
        // 左上角，添加比例尺
        var top_right_control = new window.BMap.ScaleControl({anchor: window.BMAP_ANCHOR_TOP_RIGHT});
        var top_right_navigation = new window.BMap.NavigationControl({anchor: window.BMAP_ANCHOR_TOP_RIGHT});
        //添加控件和比例尺
        map.addControl(top_right_control);
        map.addControl(top_right_navigation);
        map.enableScrollWheelZoom(true);
        // legend.addLegend(map);
    };

    //表单数据提交
    handleSubmit = ()=>{

    }

    //提交表单
    onClickSubmit = (result)=>{
        console.log(JSON.stringify(result)); 
    }

  render() {
    return (
      <div>
          <Card>
            <FilterForm onSubmit={this.onClickSubmit}/>
          </Card>
          <Card style={{marginTop:10}}>
            <div>共{this.state.total_count}辆车</div>
            <div id="container" style={{height:500}}></div>
          </Card>
      </div>
    )
  }
}


class FilterForm extends Component{

    //查询
    handleFieldSubmit = ()=>{
        let fieldsValue = this.props.form.getFieldsValue();
        // console.log(JSON.stringify(fieldsValue));  
        this.props.onSubmit(fieldsValue);  
    }

    //重置
    handleReset = ()=>{
        this.props.form.resetFields();
    }

    render(){
        const { getFieldDecorator } = this.props.form;

        return(
            <Form layout="inline">
                <Form.Item label="城市">
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
                <Form.Item>
                    {
                        getFieldDecorator("start_time")(
                            <DatePicker placeholder="请选择开始时间" showTime format="YYYY-MM-DD HH:mm:ss"/>
                        )
                    }
                </Form.Item>
                <Form.Item label="~" colon={false}>
                    {
                        getFieldDecorator("end_time")(
                            <DatePicker placeholder="请选择结束时间" showTime format="YYYY-MM-DD HH:mm:ss"/>
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
                    <Button style={{marginLeft:20}} onClick={this.handleReset}>重置</Button>
                </Form.Item>
            </Form>
        )
    }
}
FilterForm = Form.create({})(FilterForm);
