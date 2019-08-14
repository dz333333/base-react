import React, { Component } from 'react';
import { Icon ,Modal,Tooltip} from 'antd';
import AddForm from '../../components/AddForm/AddForm';
import PageTitle from '../../components/PageTitle/index';
import DetailInfo from '../../components/DetailInfo/DetailInfo';
import DetailColumn from '../../components/DetailColumn/DetailColumn';
import './AdminDetail.scss'
import request from '../../utils/request';
import { inject } from 'mobx-react';
import { staticData,  } from '../../utils/staticData'
@inject('areaStore', 'shopStore')
class AdminDetail extends Component {
  state = {
    detailData: null,
    showModal: false,
  }
  componentDidMount() {
    console.log(this, 'thisdetail')
   this.getDetail()
  }
  getDetail=()=>{
    const id = this.props.match.params.id
    request({ url: `/demo/store/${id}`, method: 'get' }).then((res) => {
      if (res && res.status === 0) {
        this.setState({
          detailData: res.data
        });
      }
    })
  }
  handleCancel = () => {
    this.setState({
      showModal: false
    });
  }
  editShop=()=>{
    this.setState({
      showModal: true
    });
  }
  handleOk = () => {
    console.log(this.addForm, 'handleOk')
    const id = this.props.match.params.id
    const { form } = this.addForm.props
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      console.log(fieldsValue, 'value')
      fieldsValue.country_code=fieldsValue.address[0]
      fieldsValue.province_code=fieldsValue.address[1]
      fieldsValue.city_code=fieldsValue.address[2]
      request({ url:`/demo/store/${id}`, method: 'put', data: fieldsValue }).then((res) => {
        if (res && res.status === 0) {
          this.getDetail()
          this.handleCancel()
        }
      })
    });
  }
  render() {
    const { detailData } = this.state
    const { areaStore } = this.props
    if (!detailData) {
      return null
    }
    const columnOne = [
      { name: '门店ID', value: <div>{detailData.store_id}<Icon type="bars" /></div> },
      { name: '创建人员', value: detailData.create_by.name },
      { name: '门店名称', value: detailData.store_name },
      {
        name: '联系人', value: <div>{detailData.user_id.name}
          <br />15212341234<br />
          rick.lv@dongting.com></div>
      },
    ]
    const columnTwo = [
      { name: '创建时间', value: detailData.create_time },
      { name: '所在区域', value:  areaStore.getAreaName(detailData.province_code, 'provinceList')+"-"+
      areaStore.getAreaName(detailData.city_code, 'cityList') },
      { name: '入驻品牌', value: detailData.brand_count },
      { name: '门店地址', value: detailData.store_address },

    ]
    const columnThree = [
      {
        name: '门店图片', value: <img
          src={detailData.store_images}
          alt="" />
      },

    ]
  
    const addKeys = [
      {
        keyId: 'store_name',
        keyName: '门店名称',
        rules: [{ required: true, message: '请输入门店名称' }],
        defaultValue:detailData.store_name,
        placeholder: '请输入门店名称',
        type: 'input',
      },
      {
        keyId: 'store_address',
        keyName: '门店地址',
        rules: [{ required: true, message: '请输入门店地址' }],
        placeholder: '请输入门店地址',
        type: 'input',
        defaultValue:detailData.store_address
      },
      {
        keyId: 'brand_count',
        keyName: '品牌数量',
        rules: [{ required: true, message: '请输入品牌数量' }],
        placeholder: '请输入品牌数量',
        type: 'input',
        defaultValue:detailData.brand_count
      },
      {
        keyId: 'store_status',
        keyName: '门店状态',
        rules: [{ required: true, message: '请选择门店状态', }],
        placeholder: '请选择门店状态',
        type: 'select',
        options: {
          text: 'text',
          value: 'value',
          list: staticData.shopStatus
        },
        defaultValue:detailData.store_status
      },
      {
        keyId: 'user_id',
        keyName: '门店管理员',
        rules: [{ required: true, message: '请搜索选择门店管理员', }],
        placeholder: '请搜索选择门店管理员',
        type: 'serverSelect',
        options: {
          url: "/demo/common/auto_complete/user",
          value: 'user_id',
          text: 'name',
          searchKey: 'key'
        },
        defaultValue:{user_id:detailData.user_id.user_id,name:detailData.user_id.name}
      },
      {
        keyId: 'address',
        keyName: '省市',
        rules: [{ required: true, message: '请选择省市' }],
        placeholder: 'placeholder',
        type: 'cascader',
        options: {
          label: 'region_name',
          value: 'region_code',
          list: areaStore.countryList
        },
        defaultValue:[detailData.country_code,detailData.province_code,detailData.city_code]
      }
    ]
    const menu=<><Tooltip title="查看"><Icon type="eye" style={{ marginRight: '10px' }} /></Tooltip>
    <Tooltip title="编辑"><Icon type="edit"  onClick={this.editShop} /></Tooltip></>
    return (
      <div>
        <PageTitle title="详情"></PageTitle>
        {/* 
        <div style={{ display: 'flex' }}>
          <DetailInfo >
            <DetailColumn columns={columnOne}>

            </DetailColumn>


          </DetailInfo>
          <DetailInfo  >
            <DetailColumn columns={columnOne}>

            </DetailColumn>


          </DetailInfo>
        </div> */}
        <DetailInfo menu={menu}>
          <DetailColumn columns={columnOne}>

          </DetailColumn>
          <DetailColumn columns={columnTwo}>

          </DetailColumn>
          <DetailColumn columns={columnThree}>

          </DetailColumn>


        </DetailInfo>
        <Modal
          maskClosable={false}
          title="编辑门店"
          visible={this.state.showModal}
          onOk={this.handleOk}
          onCancel={this.handleCancel}>
          <AddForm addKeys={addKeys} wrappedComponentRef={(inst) => { this.addForm = inst }}></AddForm>
        </Modal>
      </div>
    );
  }
}

export default AdminDetail;