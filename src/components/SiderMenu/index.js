import { Menu, Icon ,Button} from 'antd';
import React from 'react';
import { routesMenu } from '../../routes/index'
import { withRouter } from "react-router-dom";
import './index.scss'
import logoSrc from '../../assets/img/logo.png'
import { inject } from 'mobx-react';


const SubMenu = Menu.SubMenu;

@inject('loginStore')
class SiderMenu extends React.Component {
  state = {
    
    permissions: '',
    openKeys: [],
    rootSubmenuKeys: []
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
    const menuKeys = []
    routesMenu.forEach((route) => {
      // route.routes&&route.routes.forEach((item)=>{
      menuKeys.push(route.path)
      // })
    })
    this.setState({
      permissions: JSON.parse(localStorage.getItem('permissions')),
      rootSubmenuKeys: menuKeys
    });
  }
  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  };

  render() {
    const { permissions ,openKeys} = this.state
    const defaultProps = this.props.collapsed ? {} : { openKeys };
    return (
      <div className="sideMenu">
        <div className={this.props.collapsed?"collapsedMenuTop":'menuTop'}>
          <img src={logoSrc} alt="" />
          {this.props.collapsed?"":<h1>永乐智慧门店</h1>}
          
        </div>
       
        <Menu mode='inline' theme="dark" {...defaultProps}
          onOpenChange={this.onOpenChange}>
          {routesMenu.map((route, index) => {
            return (
              permissions.length > 0 && permissions.find(item => item === route.permission) && (
                route.routes ?
                  <SubMenu
                    key={route.path}
                    title={< span > <Icon type={route.icon} /> < span > {
                      route.name
                    } </span></span >}>
                    {route.routes && route
                      .routes
                      .map((routeItem, routeKey) => {
                        return !routeItem.hidden && <Menu.Item
                          key={routeItem.path}
                          onClick={() => {
                            this.clickMenu(routeItem.path)
                          }}><Icon type={route.icon} /> {routeItem.name}</Menu.Item>

                      })}
                  </SubMenu> :
                  <Menu.Item
                    key={route.path}
                    onClick={() => {
                      this.clickMenu(route.path)
                    }}>
                    <Icon type={route.icon} /><span> {route.name}</span>
                  </Menu.Item>
              )
            )
          })}
        </Menu>
      </div>
    );
  }
}

export default withRouter(SiderMenu)