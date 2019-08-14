import React from 'react';
import './index.scss'
import logoSrc from '../../assets/img/logo.png'
import { Dropdown, Menu } from 'antd';
import { withRouter } from "react-router-dom";



class Header extends React.Component {

  render() {
    const menu = (
      <Menu className='loginOut' onClick={() => {
        this.props.history.push('/login')
        localStorage.clear()
      }}>
        <Menu.Item>退出</Menu.Item>
      </Menu>
    );
    return (


      <div className={`header ${this.props.headerWidth}`}>
        {this.props.children}
        <Dropdown overlay={menu}>
          <div className='headerInfo'>
            <img src={logoSrc} alt="" />
            <div className='name'>
              {JSON.parse(localStorage.getItem('userInfo')) && JSON.parse(localStorage.getItem('userInfo')).name}
            </div>
          </div>
        </Dropdown>
      </div>


    )
  }
}
export default withRouter(Header)