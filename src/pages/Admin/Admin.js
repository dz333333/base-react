import React, { Component } from 'react';
import PageTitle from '../../components/PageTitle/index';
import TableList from '../../components/TableList';
import AddForm from '../../components/AddForm/AddForm';
import { Link } from 'react-router-dom'
import { Button, Modal, Badge, Tooltip, message, Icon } from "antd";
import { staticData, getShopStatus } from '../../utils/staticData'
import { inject } from 'mobx-react';
import request from '../../utils/request';


@inject('areaStore')
class Admin extends Component {
  constructor(props) {
    super(props)
    this.tableList = React.createRef();
    this.addForm = React.createRef();
    this.addForm2 = React.createRef();
    this.state = {
      showModal: false,
      showModal2: false,
      url: '/demo/store/list',
      searchType: [
        {
          type: 'input',
          title: '门店名称',
          id: 'store_name'
        },
        {
          type: 'input',
          title: '门店ID',
          id: 'store_id'
        },
        {
          type: 'select',
          title: '门店状态',
          id: 'store_status',
          placeholder: '请选择',
          options: {
            list: staticData.shopStatus,
            value: 'value',
            text: 'text'
          },
        },
        {
          type: 'serverSelect',
          title: '门店管理员',
          id: 'user_id',
          placeholder: '请搜索选择',
          options: {
            url: "/demo/common/auto_complete/user",
            value: 'user_id',
            text: 'name',
            searchKey: 'key'
          }
        },
        {
          id: 'address',
          title: '省市',
          placeholder: '请选择',
          type: 'cascader',
          options: {
            label: 'region_name',
            value: 'region_code',
            list: props.areaStore.provinceList
          },

        }

      ]
    }
  }

  componentDidMount() {
    console.log(this.tableList.current, 'ref')
  }


  saveNewForm = () => {
    console.log('addform')
    this.setState({ showModal: true });
  }
  saveNewForm2 = () => {
    console.log('addform')
    this.setState({ showModal2: true });
  }

  handleCancel = () => {
    this.setState({
      showModal: false,
      showModal2: false
    });
  }
  handleOk = () => {
    console.log(this.addForm, 'handleOk')
    const { form } = this.addForm.props
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      console.log(fieldsValue, 'value')
      fieldsValue.country_code = fieldsValue.address[0]
      fieldsValue.province_code = fieldsValue.address[1]
      fieldsValue.city_code = fieldsValue.address[2]
      request({ url: '/demo/store', method: 'post', data: fieldsValue }).then((res) => {
        if (res && res.status === 0) {
          message.success('操作成功');
          this.tableList.current.getDataList()
          this.handleCancel()
        }
      })
    });
  }
  handleTableChange = (pagination, filters, sorter) => {
    console.log(pagination, filters, sorter)
    let params = null;
    if (filters.store_status&&filters.store_status.length > 0) {
      params = { store_status: staticData.shopStatus[filters.store_status[0]].value }
    }
    this.tableList.current.getDataList(params)
  };
  removeShop = (id) => {
    const _this=this
    Modal.confirm({
      title:'删除操作',
      content: (
        <div>
          <p>你确定要删除门店吗？</p>

        </div>
      ),
      onCancel() { },
      onOk() {
        request({ url: `/demo/store/${id}`, method: 'delete' }).then((res) => {
          if (res && res.status === 0) {
            _this.tableList.current.getDataList()
            message.success('操作成功');
          }
        })
      },
      icon: <Icon type="exclamation" style={{ borderRadius: '50%', backgroundColor: '#faad14', color: 'white' }} />,
    });

  }

  addShopAddress = () => {

  }

  addForm2HandOk = () => {

    console.log(this.addForm2, 'addform2')
    this.setState({
      showModal2: false
    });
  }

  render() {
    const { areaStore } = this.props
    const addKeys = [
      {
        keyId: 'store_name',
        keyName: '门店名称',
        rules: [{ required: true, message: '请输入门店名称' }],
        placeholder: '请输入门店名称',
        type: 'input',

      },
      {
        keyId: 'store_address',
        keyName: '门店地址',
        rules: [{ required: true, message: '请输入门店地址' }],
        placeholder: '请输入门店地址',
        type: 'input',
      },
      {
        keyId: 'brand_count',
        keyName: '品牌数量',
        rules: [{ required: true, message: '请输入品牌数量' }],
        placeholder: '请输入品牌数量',
        type: 'input',
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
        }
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
        }
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

      }
    ]
    const addKeys2 = [
      {
        keyId: 'store_name',
        keyName: '门店名称',
        rules: [{ required: true, message: '请输入门店名称' }],
        placeholder: '请输入门店名称',
        type: 'input',

      },
      {
        keyId: 'store_address',
        keyName: '门店门店地址',
        rules: [{ required: true, message: '请输入门店地址' }],
        placeholder: '请输入门店地址',
        type: 'input',

      },
      {
        keyId: 'store_address1',
        keyName: ' ',

        placeholder: '请输入门店地址',
        type: 'input',
        actions: <div><Icon type="minus-circle" style={{ marginLeft: '16px', fontSize: '18px' }} />
        </div>
      },
      {
        keyId: 'brand_count',
        keyName: '品牌数量',
        rules: [{ required: true, message: '请输入品牌数量' }],
        placeholder: '请输入品牌数量',
        type: 'input'
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
        }
      }
    ]
    const columns = [
      {
        title: '门店ID',
        dataIndex: 'store_id',
        key: 'store_id',
        show: true,
        disabled: true
      }, {
        title: '省市区',
        dataIndex: 'province_code',
        key: 'province_code',
        width: 150,
        show: true,
        render: (text, record) => (
          <span>
            {areaStore.getAreaName(record.province_code, 'provinceList')}-
          {areaStore.getAreaName(record.city_code, 'cityList')}
          </span>
        )
      }, {
        title: '门店名称',
        dataIndex: 'store_name',
        key: 'store_name',
        width: 220,
        show: true,
        render: (text, record) => (
          <span>
            <Link to={`/admin/detail/${record.store_id}`}>{record.store_name}</Link>
          </span>
        )
      }, {
        title: '门店管理员',
        dataIndex: 'user_id',
        key: 'user_id',
        show: true,
        render(text, record) {
          return <Tooltip placement="topLeft" title={`手机号：12222222222`} arrowPointAtCenter>
            {record.user_id.name}
          </Tooltip>
        }

      }, {
        title: '品牌数量',
        dataIndex: 'brand_count',
        key: 'brand_count',
        show: true,
        sorter: (a, b) => a.brand_count - b.brand_count
      }, {
        title: '门店状态',
        dataIndex: 'store_status',
        key: 'store_status',
        show: true,
        filters: staticData.shopStatus,
        render(val) {
          return <Badge status={val === 1 ? 'success' : 'error'} text={getShopStatus(val)} />;
        },
      }, {
        title: '创建时间',
        key: 'create_time',
        dataIndex: 'create_time',
        width: 220,
        show: true
      }, {
        title: '操作',
        key: 'action',
        show: true,
        render: (text, record) => (
          <span>
            <span style={{ marginRight: '5px' }}><Link to={`/admin/detail/${record.store_id}`}>查看</Link></span>
            {
              record.brand_count > 10 ? <Tooltip placement="topLeft" title="不允许删除" arrowPointAtCenter>
                <span style={{ color: '#ccc',cursor:'pointer' }}>删除</span>
              </Tooltip> : <span>
                  <span style={{ color: '#1890FF',cursor:'pointer'  }} onClick={() => { this.removeShop(record.store_id) }} >删除</span>
                </span>
            }

          </span>
        )
      }
    ];



    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      },
      onSelect: (record, selected, selectedRows) => {
        console.log(record, selected, selectedRows);
      },
      onSelectAll: (selected, selectedRows, changeRows) => {
        console.log(selected, selectedRows, changeRows);
      },
    };
    return (
      <div>
        <PageTitle title="普通列表"></PageTitle>

        <TableList
          location={this.props.location}
          ref={this.tableList}
          customConfig={rowSelection}
          columns={columns}
          rowKey='store_id'
          url={this.state.url}
          onChange={this.handleTableChange}
          searchType={this.state.searchType}>
          <div>
            <Button
              icon="plus"
              onClick={this.saveNewForm}
              type='primary'
            >新建</Button>
            <Button
              style={{ marginLeft: '24px' }}
              icon="plus"
              onClick={this.saveNewForm2}
              type='primary'
            >新建有MENU</Button>
            <Button style={{ marginLeft: '24px' }}>次要按钮</Button>
            <Button style={{ marginLeft: '24px' }}>次要按钮</Button>
          </div>

        </TableList>
        <Modal
          width={600}
          maskClosable={false}
          title="Basic Modal"
          visible={this.state.showModal}
          onOk={this.handleOk}
          onCancel={this.handleCancel}>
          <AddForm addKeys={addKeys} wrappedComponentRef={(inst) => { this.addForm = inst }}></AddForm>
        </Modal>
        <Modal
          width={600}
          maskClosable={false}
          title="Basic Modal"
          visible={this.state.showModal2}
          onOk={this.addForm2HandOk}
          onCancel={this.handleCancel}>
          <AddForm addKeys={addKeys2} wrappedComponentRef={(inst) => { this.addForm2 = inst }} >
            <div style={{ width: '100%', textAlign: 'center' }}>
              <Button onClick={this.addShopAddress}>添加门店地址</Button>
            </div>
          </AddForm>
        </Modal>

      </div>
    );
  }
}

export default Admin;