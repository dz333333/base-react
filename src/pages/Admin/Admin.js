import React, {Component} from 'react';
import PageTitle from '../../components/PageTitle/index';
import TableList from '../../components/TableList';
import AddForm from '../../components/AddForm/AddForm';
import {Link} from 'react-router-dom'
import {Button, Modal} from "antd";

class Admin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal:false,
      url: '/brand/lib/list',
      searchType: [
        {
          type: 'input',
          title: '品牌名称',
          id: 'brand_name'
        }
      ]
    }
  }

  componentDidMount() {
    
  }
  

  saveNewForm = () => {
    console.log('addform')
    this.setState({showModal: true});
  }

  handleCancel=()=>{
    this.setState({
      showModal:false
    });
  }
  handleOk=()=>{
    console.log(this.addForm,'handleOk')
    const {form}=this.addForm.props
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      console.log(fieldsValue,'value')
     
    });
  }

  render() {
    const options = [
      {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
          {
            value: 'hangzhou',
            label: 'Hangzhou',
            
          },
        ],
      },
      {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
          {
            value: 'nanjing',
            label: 'Nanjing',
           
          },
        ],
      },
    ];
    const addKeys = [
      {
        keyId:'brand_id',
        keyName: '品牌名称',
        rules:[{required: true,message:'请输入品牌名称'}],
        tip: '小提示',
        defaultValue: '默认值',
        placeholder: 'placeholder',
        type: 'input',
      },
      {
        keyId:'brand',
        keyName: '品牌名称',
        rules:[{ required: true, message:'请输入品牌名称', }],
        placeholder: 'placeholder',
        defaultValue: '默认值',
        type: 'select',
        options:{
          id:'id',
          value:'name',
          list:[{id:1,name:'选项一'},{id:2,name:'选项二'}]
        }
      },
      {
        keyId:'brand_city',
        keyName: '省市',
        rules:[{ required: true, message:'请输入品牌名称'}],
        placeholder: 'placeholder',
        type: 'cascader',
        options:{
          label:'label',
          value:'value',
          list:options
        },
        
      },{
        keyId:'brand_date',
        keyName: '日期',
        rules:[{ required: true, message:'请输入日期'}],
        placeholder: 'placeholder',
        type: 'date',
      }
    ]
    const columns = [
      {
        title: '品牌ID',
        dataIndex: 'brand_id',
        key: 'brand_id'
      }, {
        title: '品牌名称',
        dataIndex: 'brand_name',
        key: 'brand_name',
        render: (text, record) => (
          <span>
            <Link to='/admin/detail'>{record.brand_name}</Link>
          </span>
        )
      }, {
        title: '入驻门店',
        dataIndex: 'store_name',
        key: 'store_name'
      }, {
        title: '品牌主体',
        dataIndex: 'brand_business',
        key: 'brand_business'
      }, {
        title: '品牌类别',
        dataIndex: 'brand_type',
        key: 'brand_type'
      }, {
        title: '入驻门店数量',
        dataIndex: 'owned_store_count',
        key: 'owned_store_count'
      }, {
        title: '创建时间',
        key: 'create_time',
        dataIndex: 'create_time'
      }, {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span></span>
        )
      }
    ];
    return (
      <div>
        <PageTitle title="ADMIN列表"></PageTitle>
        <TableList
          columns={columns}
          rowKey='brand_id'
          url={this.state.url}
          searchType={this.state.searchType}>
          <Button
            icon="plus"
            onClick={this.saveNewForm}
            type='primary'
            style={{
            marginTop: '20px'
          }}>新建</Button>
        </TableList>
        <Modal
          maskClosable={false}
          title="Basic Modal"
          visible={this.state.showModal}
          onOk={this.handleOk}
          onCancel={this.handleCancel}>
           <AddForm addKeys={addKeys} onRef={(ref) => this.addForm = ref}></AddForm>
        </Modal>
       
      </div>
    );
  }
}

export default Admin;