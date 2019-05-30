import React from 'react';
import './index.scss'
import logoSrc from '../../assets/img/logo.png'
import {Dropdown, Menu} from 'antd';
import {withRouter} from "react-router-dom";


class Header extends React.Component {

  render(){
    const menu = (
      <Menu className='loginOut' onClick={()=>{
        this.props.history.push('/login')
        localStorage.clear()
        }}>
        <Menu.Item>退出</Menu.Item>
      </Menu>
    );
    return (
      <Dropdown overlay={menu}>
        <div className='header'>
          <img src={logoSrc} alt=""/>
          <div className='name'>
            测试姓名
          </div>
        </div>
      </Dropdown>
  
    )
  }
}
export default withRouter(Header)