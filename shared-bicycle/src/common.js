import React, { Component } from 'react';
import { Row, Col } from 'antd';
import './style/common.less';
import Header from './components/Header';

export default class Common extends Component {
    render() {
        return (
            <div>
                <Row className="simple-page">
                    <Header menuType="second"/>
                </Row>
                <Row className="container">
                    {this.props.children}
                </Row>
            </div>
        )
    }
}

