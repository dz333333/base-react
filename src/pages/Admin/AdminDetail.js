import React, {Component} from 'react';
import {Icon} from 'antd';
import PageTitle from '../../components/PageTitle/index';
import DetailInfo from '../../components/DetailInfo/DetailInfo';
import DetailColumn from '../../components/DetailColumn/DetailColumn';
import './AdminDetail.scss'

class AdminDetail extends Component {

    
  render() {
    const columnOne=[
        {name:'门店ID',value:<div>2<Icon type="bars"/></div>},
        {name:'创建人员',value:'吕秀全吕秀全吕吕秀全吕秀全吕秀全'},
        {name:'门店名称',value:'永乐生活电器(中山公园店)'},
        {name:'联系人',value:<div>Rick/张三
        <br/>15212341234<br/>
        rick.lv@dongting.com></div>},
    ]
    const columnTwo=[
        {name:'创建时间',value:'2019-04-17 175136'},
        {name:'所在区域',value:'长宁路1018号龙之梦购物中心B1层'},
        {name:'入驻品牌',value:'123'},
      
    ]
    const columnThree=[
        {name:'门店图片',value:<img
        src="https://yolo-test-1252491111.cos.ap-shanghai.myqcloud.com/detail/750_360_2.jpg?imageView2/1/w/750/h/360/q/80"
        alt=""/>},
       
    ]
    return (
      <div>
        <PageTitle title="admin详情"></PageTitle>
        <DetailInfo>
          <DetailColumn columns={columnOne}>

          </DetailColumn>
          <DetailColumn columns={columnTwo}>

          </DetailColumn>
          <DetailColumn columns={columnThree}>

          </DetailColumn>
          

        </DetailInfo>
        <DetailInfo>
          <DetailColumn columns={columnOne}>

          </DetailColumn>
          <DetailColumn columns={columnTwo}>

          </DetailColumn>
          
        </DetailInfo>
        <div style={{display:'flex'}}>
        <DetailInfo >
          <DetailColumn columns={columnOne}>

          </DetailColumn>
          
          
        </DetailInfo>
        <DetailInfo  >
          <DetailColumn columns={columnOne}>

          </DetailColumn>
          
          
        </DetailInfo>
        </div>
      </div>
    );
  }
}

export default AdminDetail;