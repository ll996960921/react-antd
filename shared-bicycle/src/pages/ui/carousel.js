import React, { Component } from 'react'
import { Card, Carousel } from 'antd'
import './ui.less'

export default class Carousels extends Component {
  render() {
    return (
      <div>
            <Card title="文字背景轮播" className="card-wrap">
                <Carousel autoplay={true}>
                    <div><h3>1、欢迎学习react</h3></div>
                    <div><h3>2、欢迎学习vue</h3></div>
                    <div><h3>3、欢迎学习java</h3></div>
                    <div><h3>4、欢迎学习python</h3></div>
                </Carousel>
            </Card>

            <Card title="图片轮播" className="card-wrap slider-wrap">
                <Carousel autoplay={true} >
                    <div><img src="/carousel-img/carousel-1.jpg" alt=""/></div>
                    <div><img src="/carousel-img/carousel-2.jpg" alt=""/></div>
                    <div><img src="/carousel-img/carousel-3.jpg" alt=""/></div>
                </Carousel>
            </Card>
      </div>
    )
  }
}
