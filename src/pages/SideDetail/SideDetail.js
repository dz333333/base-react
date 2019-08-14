import React, { Component } from 'react';
import PageTitle from '../../components/PageTitle/index';
import { Menu,  } from 'antd';
import './index.scss'


class SideDetail extends Component {
    state={
        currentKey:"2"
    }
    clickMenu=( item, key, keyPath, domEvent )=>{
        console.log(item,key,keyPath,domEvent)
        this.setState({
            currentKey:key
        })
    }
    render() {
        return (
            <div>
                <PageTitle title="详情"></PageTitle>

                <div className='sideContent'>
                    <Menu
                        style={{ width: 256 }}
                        defaultSelectedKeys={['2']}
                        mode="inline"
                        onClick={this.clickMenu}
                    >
                        <Menu.Item key="1">
                            基本设置
                        </Menu.Item>
                        <Menu.Item key="2">
                            安全设置
                        </Menu.Item>
                        <Menu.Item key="3">
                            账号绑定
                        </Menu.Item>
                        <Menu.Item key="4">
                            新消息通知
                        </Menu.Item>
                    </Menu>
                    <div className="rightContent">
                        <h1>安全设置</h1>
                        <div className="listItem">
                            <div className="left">
                                <span>当前密码</span>
                                <br/>
                                <span>当前密码强度： 强</span>
                            </div>
                            <a href="javaScript:;">修改</a>
                        </div>
                        <div className="listItem">
                            <div className="left">
                                <span>密保手机</span>
                                <br/>
                                <span>已绑定手机：<br/> 181****5677</span>
                            </div>
                            <a href="javaScript:;">修改</a>
                        </div>
                        <div className="listItem">
                            <div className="left">
                                <span>密保问题</span>
                                <br/>
                                <span>未设置密保问题，密保问题可有效保护账户安全</span>
                            </div>
                            <a href="javaScript:;">修改</a>
                        </div>
                        <div className="listItem">
                            <div className="left">
                                <span>备用邮箱</span>
                                <br/>
                                <span>已绑定邮箱:<br/> ant***alipay.com</span>
                            </div>
                            <a href="javaScript:;">修改</a>
                        </div>
                        <div className="listItem">
                            <div className="left">
                                <span>MFA 设备</span>
                                <br/>
                                <span>未绑定 MFA 设备，绑定后，可以进行二次确认</span>
                            </div>
                            <a href="javaScript:;">修改</a>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export default SideDetail;