import React, { Component } from 'react';
import {Spin} from 'antd'
import './index.scss';

class DetailInfo extends Component {
  render() {
    return (
      <div style={{ width: '100%' }} className='baseDetail'>
        <div className='detailTitle'>
          <span>基本信息</span>
          <div className="rightMenu">
            {this.props.menu}
          </div>
        </div>
        <div className='detailInfo'>
          {this.props.loading?<div class="detailSpin"><Spin></Spin></div>:this.props.children}
          
        </div>
      </div>

    );
  }
}

export default DetailInfo;