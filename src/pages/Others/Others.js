import React, { Component } from 'react';
import PageTitle from '../../components/PageTitle'
import { Button, message, Modal ,Icon} from 'antd'
import './index.scss'


message.config({
    duration: 1.5,
});

class Others extends Component {
    exclamation = () => {
        Modal.confirm({
            title: '这是进行一项操作时必须了解的重要信息',
            content: (
                <div>
                    <p>用户须知的信息，你还要继续吗？</p>
                   
                </div>
            ),
            onCancel(){},
            onOk() { },
            icon:<Icon type="exclamation" style={{borderRadius:'50%',backgroundColor:'#faad14',color:'white'}} />,
        });
    }
    info = () => {
        Modal.info({
            title: '这是一条通知信息',
            content: (
                <div>
                    <p>一些附加信息一些附加信息一些附加信息</p>
                   
                </div>
            ),
            onOk() { },
            icon:<Icon type="info" style={{borderRadius:'50%',backgroundColor:'rgba(24, 144, 255, 1)',color:'white'}}/>
        });
    }
    success = () => {
        Modal.success({
            title: '这是一条成功通知信息',
            content: '一些附加信息一些附加信息一些附加信息',
            icon:<Icon type="check" style={{borderRadius:'50%',backgroundColor:'#52c41a',color:'white'}}/>
        });
    }

    error = () => {
        Modal.error({
            title: '这是一条错误提示',
            content: '一些附加信息一些附加信息一些附加信息',
            icon:<Icon type="close" style={{borderRadius:'50%',backgroundColor:'#f5222d',color:'white'}}/>
        });
    }
    render() {
        const success = () => {
            const hide=message.success('操作成功');
            setTimeout(hide, 1500);
        };
        const error = () => {
            const hide=message.error('操作失败');
            setTimeout(hide, 1500);
        };

        return (
            <div>
                <PageTitle title="其他"></PageTitle>
                <div className="others" >
                    <div className="disappear">
                        <div className="title">自动消失</div>
                        <div className="content">
                            <Button type='primary' onClick={success}>操作成功</Button>
                            <Button type='primary' onClick={error}>操作失败</Button>
                        </div>
                    </div>
                    <div className="modal">
                        <div className="title">对话框</div>
                        <div className="content">
                            <Button type='primary' onClick={this.success}>成功</Button>
                            <Button type='primary' onClick={this.error}>错误</Button>
                            <Button type='primary' onClick={this.exclamation}>再次确认</Button>
                            <Button type='primary' onClick={this.info}>消息通知</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Others;