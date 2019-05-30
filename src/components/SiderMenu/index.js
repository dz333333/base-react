import {Menu, Icon} from 'antd';
import React from 'react';
import {routesMenu} from '../../routes/index'
import {withRouter} from "react-router-dom";
import './index.scss'
import logoSrc from '../../assets/img/logo.png'
import {inject} from 'mobx-react';


const SubMenu = Menu.SubMenu;

@inject('loginStore')
class SiderMenu extends React.Component {
  state = {
    collapsed: false,
    role:''
  };

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  clickMenu = (path) => {
    // console.log(this.props, 'this')
    this
      .props
      .history
      .push(path)
  }

  componentDidMount() {
    // console.log(JSON.parse(localStorage.getItem('userInfo')),'userInfo')
    this.setState({
      role:JSON.parse(localStorage.getItem('role'))
    });
  }
  

  render() {
    const {role}=this.state
    return (
      <div style={{
        width: 256
      }}>
        <div className='menuTop'>
          <img src={logoSrc} alt=""/>
          <h1>永乐智慧门店</h1>
        </div>
        <Menu mode="inline" theme="dark" inlineCollapsed={this.state.collapsed}>
          {routesMenu.map((route, index) => {
            return (
              route.role&&route.role.find(item=>item===role)&&<SubMenu
                key={route.path}
                title={< span > <Icon type={route.icon}/> < span > {
                route.name
              } </span></span >}>
                {route.routes && route
                  .routes
                  .map((routeItem, routeKey) => {
                    return !routeItem.hidden&&<Menu.Item
                      key={routeItem.path}
                      onClick={() => {
                      this.clickMenu(routeItem.path)
                    }}><Icon type={route.icon}/> {routeItem.name}</Menu.Item>

                  })}
              </SubMenu>
            )
          })}
        </Menu>
      </div>
    );
  }
}

export default withRouter(SiderMenu)