import React, { Component } from 'react'
import { Card, Button, Modal } from 'antd'
import { Editor } from 'react-draft-wysiwyg'
import { convertFromRaw } from 'draft-js'
import draftjs from 'draftjs-to-html'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

export default class RichText extends Component {

    state = {
        isShowVisible: false,
        isShowVisible2: false,
        editorState: '',
        editorContent: '',
    }

    onEditorChange = (editorContent) => {
        console.log(JSON.stringify(editorContent));
        
        this.setState({
            editorContent
        });
    };

    onEditorStateChange = (editorState)=>{
        this.setState({
            editorState
        })
    }

    //清空内容
    handleClearContent = ()=>{
        this.setState({
            editorState: ''
        })
    }

    //获取html内容
    handleGetText = ()=>{
        this.setState({
            isShowVisible: true
        })
    }

    //获取json内容
    handleGetJson = ()=>{
        this.setState({
            isShowVisible2: true
        })
    }

    render() {
        const { editorState } = this.state;
        return (
            <div>
                <Card>
                    <Button type="primary" onClick={this.handleClearContent}>清空内容</Button>
                    <Button type="primary" onClick={this.handleGetText} style={{marginLeft:20}}>获取HTML文本</Button>
                    <Button type="primary" onClick={this.handleGetJson} style={{marginLeft:20}}>获取JSON文本</Button>
                </Card>
                <Card title="富文本编辑器">
                    <Editor
                        editorState={editorState}
                        onContentStateChange={this.onEditorChange} //获取内容变化值
                        onEditorStateChange={this.onEditorStateChange}  //编辑器状态发生变化时
                    />
                </Card>

                <Modal
                    title="富文本html内容"
                    visible={this.state.isShowVisible}
                    onCancel={()=>{this.setState({isShowVisible:false})}}
                    footer={null}
                >
                    {draftjs(this.state.editorContent)}
                </Modal>
                <Modal
                    title="富文本json内容"
                    visible={this.state.isShowVisible2}
                    onCancel={()=>{this.setState({isShowVisible2:false})}}
                    footer={null}
                >
                    {JSON.stringify(this.state.editorContent, null, 4)}
                </Modal>
            </div>
        )
    }
}
