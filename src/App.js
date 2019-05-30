import React from 'react';
import SiderMenu from './components/SiderMenu'
import PageHeader from './components/PageHeader'
import Footer from './components/Footer'
import {Routes} from './routes/index';
import Header from './components/Header/index'
import { LocaleProvider} from 'antd';
// 由于 antd 组件的默认文案是英文，所以需要修改为中文
import zhCN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';

import './App.scss';
moment.locale('zh-cn');
class App extends React.Component {

  render = () => {

    return (

      <LocaleProvider locale={zhCN}>

        <div className='app'>
          <div className="siderMenu">
            <SiderMenu/>
          </div>
          <div className='appRight'>
            <Header/>
            <div className='pageHeader'>
              <PageHeader/>
            </div>
            <div className='rightContent'>
              <Routes/>
            </div>
            <Footer></Footer>
          </div>
        </div>

      </LocaleProvider>

    )

  }

}

export default(App);
