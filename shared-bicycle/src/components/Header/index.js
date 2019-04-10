import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { connect } from 'react-redux'
import './index.less';
import Utils from '../../utils/utils';
import axios from './../../axios';

class Header extends Component {

  componentWillMount(){
    this.setState({
      userName: '河畔一角'
    })

    //定时器
    setInterval(() => {
      let sysTime = Utils.formateDate(new Date().getTime());
      this.setState({
        sysTime
      })
    }, 1000);

    this.getWeathweAPIDate();
  }

  //获取天气
  getWeathweAPIDate(){
    let city = '昆山';
    axios.jsonp({
      url: Utils.weatherURL(city)
    }).then((res)=>{
      // console.log(res);
      if(res.status === 'success'){
        let data = res.results[0].weather_data[0]
        // console.log(data);
        this.setState({
          dayPictureUrl: data.dayPictureUrl,
          temperature: data.temperature,
          weather: data.weather
        })        
      }
      
    }); 
  }

  render() {
    const menuType = this.props.menuType;
    return (
      <div className="header">
        <Row className="header-top">
        {
          !menuType? '':  //menuType 二级导航样式
          <Col span={6}  className="logo">
             <img src="/assets/logo-ant.svg" alt="logo"/>
             <span>共享单车，通用管理系统</span>
          </Col>
        }
          <Col span={menuType? 18:24}>
             <span>欢迎，{this.state.userName}</span>
             <a href="#">退出</a>
          </Col>
        </Row> 
        {
          //menuType 为true，不需要面包屑
          menuType ? "" :  
            <Row className="breadcrumb">
              <Col span={4} className="breadcrumb-title">首页</Col>
              <Col span={20} className="weather">
                <span className="date">{this.state.sysTime}</span>
                <span className="weather-img">
                    <img src={this.state.dayPictureUrl} alt=""/>
                </span>
                <span className="weather-detail">
                    {this.state.weather}
                </span>
                <span className="weather-temp">
                    {this.state.temperature}  
                </span>
              </Col>
            </Row>    
        }     
        
      </div>
    )
  }
}

const mapStateToProps = (state)=>{
  return{
  
  }
}

export default connect(mapStateToProps)(Header)