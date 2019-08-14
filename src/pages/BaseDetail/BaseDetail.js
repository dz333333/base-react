import React, { Component } from 'react';
import { Icon ,Modal} from 'antd';
import AddForm from '../../components/AddForm/AddForm';
import PageTitle from '../../components/PageTitle/index';
import DetailInfo from '../../components/DetailInfo/DetailInfo';
import DetailColumn from '../../components/DetailColumn/DetailColumn';
import './BaseDetail.scss'
import request from '../../utils/request';
import { inject } from 'mobx-react';
import { staticData,  } from '../../utils/staticData'
@inject('areaStore', 'shopStore')
class BaseDetail extends Component {
  state = {
    detailData: null,
    detailData2: null,
    detailData3: null,
    showModal: false,
    loading1:true,
    loading2:true,
  }
  componentDidMount() {
    console.log(this, 'thisdetail')
   this.getDetail(9,'detailData')
   this.getDetail(1,'detailData2',3)
   this.getDetail(10,'detailData3',3)
  }
  getDetail=(id,which,delay)=>{
    
    request({ url: `/demo/store/${id}`, method: 'get',params:{delay} }).then((res) => {
      if (res && res.status === 0) {

        this.setState({
          [which]: res.data
        });
        if(which==='detailData2'){
          this.setState({
            loading1:false
          });
        }else if(which==='detailData3'){
          this.setState({
            loading2:false
          });
        }else{
          this.setState({
            loading:false
          });
        }
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
    const { detailData ,detailData2,detailData3,loading1,loading2,loading} = this.state
    const { areaStore } = this.props
    
    const columnOne = [
      { name: '门店ID', value: <div>{detailData&&detailData.store_id}<Icon type="bars" /></div> },
      { name: '创建人员', value: detailData&&detailData.create_by.name },
      { name: '门店名称', value: detailData&&detailData.store_name },
      {
        name: '联系人', value: <div>{detailData&&detailData.user_id.name}
          <br />15212341234<br />
          rick.lv@dongting.com></div>
      },
    ]
    const columnFour = [
      { name: '门店ID', value: <div>{detailData2&&detailData2.store_id}<Icon type="bars" /></div> },
      { name: '创建人员', value: detailData2&&detailData2.create_by.name },
      { name: '门店名称', value: detailData2&&detailData2.store_name },
      {
        name: '联系人', value: <div>{detailData2&&detailData2.user_id.name}
          <br />15212341234<br />
          rick.lv@dongting.com></div>
      },
    ]
    const columnFive = [
      { name: '门店ID', value: <div>{detailData3&&detailData3.store_id}<Icon type="bars" /></div> },
      { name: '创建人员', value: detailData3&&detailData3.create_by.name },
      { name: '门店名称', value: detailData3&&detailData3.store_name },
      {
        name: '联系人', value: <div>{detailData3&&detailData3.user_id.name}
          <br />15212341234<br />
          rick.lv@dongting.com></div>
      },
    ]
    const columnTwo = [
      { name: '创建时间', value: detailData&&detailData.create_time },
      { name: '所在区域', value: detailData&& areaStore.getAreaName(detailData.province_code, 'provinceList')+"-"+
      areaStore.getAreaName(detailData.city_code, 'cityList') },
      { name: '入驻品牌', value: detailData&&detailData.brand_count },
      { name: '门店地址', value: detailData&&detailData.store_address },

    ]
    const columnThree = [
      {
        name: '门店图片', value: <img
          src={detailData&&detailData.store_images}
          alt="" />
      },

    ]
  
    const addKeys = [
      {
        keyId: 'store_name',
        keyName: '门店名称',
        rules: [{ required: true, message: '请输入门店名称' }],
        defaultValue:detailData&&detailData.store_name,
        placeholder: '请输入门店名称',
        type: 'input',
      },
      {
        keyId: 'store_address',
        keyName: '门店地址',
        rules: [{ required: true, message: '请输入门店地址' }],
        placeholder: '请输入门店地址',
        type: 'input',
        defaultValue:detailData&&detailData.store_address
      },
      {
        keyId: 'brand_count',
        keyName: '品牌数量',
        rules: [{ required: true, message: '请输入品牌数量' }],
        placeholder: '请输入品牌数量',
        type: 'input',
        defaultValue:detailData&&detailData.brand_count
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
        defaultValue:detailData&&detailData.store_status
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
        defaultValue:{user_id:detailData&&detailData.user_id.user_id,name:detailData&&detailData.user_id.name}
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
        defaultValue:[detailData&&detailData.country_code,detailData&&detailData.province_code,detailData&&detailData.city_code]
      }
    ]
    return (
      <div>
        <PageTitle title="详情"></PageTitle>
        
        <div className='templateDetail'>
          <DetailInfo loading={loading1}>
            <DetailColumn columns={columnFour}>

            </DetailColumn>
            <DetailColumn columns={columnFour}>

            </DetailColumn>

          </DetailInfo>
          <DetailInfo  loading={loading2}>
            <DetailColumn columns={columnFive}>

            </DetailColumn>
            <DetailColumn columns={columnFive}>

            </DetailColumn>


          </DetailInfo>
        </div>
        <DetailInfo editMethod={this.editShop} loading={loading}>
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
          <AddForm addKeys={addKeys} onRef={(ref) => this.addForm = ref}></AddForm>
        </Modal>
      </div>
    );
  }
}

export default BaseDetail;