import React, { Component } from 'react';
import { Row, Col } from 'antd';
import './style/common.less';
import Header from './components/Header';
import Footer from './components/Footer';
import NavLeft from './components/NavLeft';
// import Home from './pages/home';

export default class Admin extends Component {
    render() {
        return (
            <Row className="container">
                <Col span={4} className="nav-left">
                    <NavLeft />
                </Col>
                <Col span={20} className="main">
                    <Header />
                    <Row className="content">
                        {/* <Home /> */}
                        {this.props.children}
                    </Row>
                    <Footer />
                </Col>
            </Row>
        )
    }
}

