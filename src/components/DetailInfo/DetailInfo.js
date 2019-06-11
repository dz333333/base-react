import React, {Component} from 'react';
import {Button} from 'antd';
import './index.scss';

class DetailInfo extends Component {
  render() {
    return (
      <div style={{width:'100%'}}>
        <div className='detailTitle'>
            <span>基本信息</span>
            <Button type='primary'>编辑</Button>
        </div>
        <div className='detailInfo'>
          {this.props.children}
        </div>
      </div>

    );
  }
}

export default DetailInfo;