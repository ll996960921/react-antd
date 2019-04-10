import React, { Component } from 'react'
import { Card, Tabs, message, Icon } from 'antd'
import './ui.less'
const TabPane = Tabs.TabPane

export default class Tab extends Component {


    componentWillMount(){
        const panes = [
            {
                title: 'Tab 1',
                content: '1、欢迎学习react',
                key: '1'
            },
            {
                title: 'Tab 2',
                content: '2、欢迎学习java',
                key: '2'
            },
            {
                title: 'Tab 3',
                content: '3、欢迎学习vue',
                key: '3'
            }
        ]

        this.setState({
            panes,
            newTabIndex: 1,
            activeKey: panes[0].key,
        })
    }

    handleCallback = (key) => {
       message.info("当前时页签是："+key)
    }


    onChange = (activeKey) => {
        message.info("当前时页签是："+activeKey)
        this.setState({ activeKey });
    }

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    }

    add = () => {
        const panes = this.state.panes;
        const activeKey = `newTab${this.state.newTabIndex++}`;
        panes.push({ title: activeKey, content: `Content of ${activeKey}`, key: activeKey });
        this.setState({ panes, activeKey });
    }

    remove = (targetKey) => {
        let activeKey = this.state.activeKey;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
        if (pane.key === targetKey) {
            lastIndex = i - 1;
        }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (panes.length && activeKey === targetKey) {
            if (lastIndex >= 0) {
                activeKey = panes[lastIndex].key;
            } else {
                activeKey = panes[0].key;
            }
        }
        this.setState({ panes, activeKey });
    }


  render() {
    return (
      <div>
          <Card title="基本Tab页签" className="card-wrap">
            <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
                <TabPane tab="Tab 1" key="1"> 1、欢迎学习react</TabPane>
                <TabPane tab="Tab 2" key="2">2、欢迎学习java</TabPane>
                <TabPane tab="Tab 3" key="3">3、欢迎学习python</TabPane>
            </Tabs>,
          </Card>

          <Card title="带图标的Tab页签" className="card-wrap">
            <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
                <TabPane tab={<span><Icon type='plus'/>Tab 1</span>} key="1"> 1、欢迎学习react</TabPane>
                <TabPane tab={<span><Icon type='edit'/>Tab 2</span>} key="2">2、欢迎学习java</TabPane>
                <TabPane tab={<span><Icon type='delete'/>Tab 3</span>} key="3">3、欢迎学习python</TabPane>
            </Tabs>,
          </Card>

          <Card title="动态Tab页签" className="card-wrap">
            <Tabs 
                // defaultActiveKey="1" 
                activeKey={this.state.activeKey}
                onChange={this.onChange} 
                type="editable-card" 
                onEdit={this.onEdit}
            >
                {
                    this.state.panes.map(pane=><TabPane tab={pane.title} key={pane.key}>{pane.content}</TabPane> )
                }
            </Tabs>
          </Card>

      </div>
    )
  }
}
