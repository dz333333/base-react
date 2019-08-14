import React from 'react';
import SiderMenu from './components/SiderMenu'
import PageHeader from './components/PageHeader'
import Footer from './components/Footer'
import { Routes } from './routes/index';
import Header from './components/Header/index'
import { LocaleProvider, Layout, Button, Icon } from 'antd';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { inject } from 'mobx-react';
import './App.scss';
moment.locale('zh-cn');
const { Sider, Content } = Layout;
@inject('areaStore')
class App extends React.Component {
  state = {
    collapsed: false,
    headerWidth: 'notCollapsedWidth'
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    }, () => {
      if (this.state.collapsed) {
        this.setState({
          headerWidth: 'collapsedWidth'
        });
      } else {
        this.setState({
          headerWidth: 'notCollapsedWidth'
        });
      }
    });
  };
  componentDidMount() {
    const { areaStore } = this.props
    if (!localStorage.getItem('cityList')) {
      areaStore.getAreaList()
    }
  }
  render = () => {

    return (
      <LocaleProvider locale={zhCN}>
        <Layout>
          <Sider trigger={null} collapsible collapsed={this.state.collapsed} width="220">
            <div className="siderMenu">
              <SiderMenu collapsed={this.state.collapsed}/>
            </div>
          </Sider>
          <Content>


            <div className='app'>

              <div className='appRight'>
                <Header headerWidth={this.state.headerWidth}>
                  <Button onClick={this.toggle} style={{ marginBottom: 16,border:'none' }}>
                    <Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} />
                  </Button>

                </Header>
                <div className='pageHeader'>
                  <PageHeader />
                </div>
                <div className='rightContent'>
                  <Routes />
                </div>
                <Footer></Footer>
              </div>
            </div>


          </Content>
        </Layout>
      </LocaleProvider>
    )

  }

}

export default (App);
