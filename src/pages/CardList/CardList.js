import React, { Component } from 'react';
import TableList from '../../components/TableList';
import AddForm from '../../components/AddForm/AddForm';
import { Link } from 'react-router-dom'
import { Button, Modal, Tabs, Tooltip, Badge } from "antd";
import { inject } from 'mobx-react';
import { staticData, getShopStatus } from '../../utils/staticData'
import PageTitle from '../../components/PageTitle/index';
const { TabPane } = Tabs;
@inject('areaStore', 'shopStore')
class CardList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
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

    }


    saveNewForm = () => {
        console.log('addform')
        this.setState({ showModal: true });
    }

    handleCancel = () => {
        this.setState({
            showModal: false
        });
    }
    handleOk = () => {
        console.log(this.addForm, 'handleOk')
        const { form } = this.addForm.props
        form.validateFields((err, fieldsValue) => {
            if (err) return;
            console.log(fieldsValue, 'value')

        });
    }

    render() {
        const { areaStore } = this.props
        const addKeys = [
            {
                keyId: 'brand_id',
                keyName: '品牌名称',
                rules: [{ required: true, message: '请输入品牌名称' }],
                tip: '小提示',
                defaultValue: '默认值',
                placeholder: 'placeholder',
                type: 'input',
            },
            {
                keyId: 'brand',
                keyName: '品牌名称',
                rules: [{ required: true, message: '请输入品牌名称', }],
                placeholder: 'placeholder',
                defaultValue: '默认值',
                type: 'select',
                options: {
                    id: 'id',
                    value: 'name',
                    list: [{ id: 1, name: '选项一' }, { id: 2, name: '选项二' }]
                }
            },
            {
                keyId: 'brand_city',
                keyName: '省市',
                rules: [{ required: true, message: '请输入品牌名称' }],
                placeholder: 'placeholder',
                type: 'cascader',
                options: {
                    label: 'label',
                    value: 'value',
                    list: areaStore.countryList
                },

            }, {
                keyId: 'brand_date',
                keyName: '日期',
                rules: [{ required: true, message: '请输入日期' }],
                placeholder: 'placeholder',
                type: 'date',
            }
        ]
        const columns = [
            {
                title: '门店ID',
                dataIndex: 'store_id',
                key: 'store_id',
                width: 100,
                show: true,
                disabled: true
            }, {
                title: '省市区',
                dataIndex: 'province_code',
                key: 'province_code',
                width: 100,
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
                width: 150,
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
                width: 100,
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
                width: 100,
                show: true,
                sorter: true,
            }, {
                title: '门店状态',
                dataIndex: 'store_status',
                key: 'store_status',
                width: 100,
                show: true,
                filters: staticData.shopStatus,
                render(val) {
                    return <Badge status={val === 1 ? 'success' : 'error'} text={getShopStatus(val)} />;
                },
            }, {
                title: '创建时间',
                key: 'create_time',
                dataIndex: 'create_time',
                width: 150,
                show: true
            }, {
                title: '操作',
                key: 'action',
                width: 150,
                show: true,
                render: (text, record) => (
                    <span>
                    <span style={{marginRight:'5px'}}><Link to={`/admin/detail/${record.store_id}`}>查看</Link></span>
                    {
                      record.brand_count > 10 ? <Tooltip placement="topLeft" title="不允许删除" arrowPointAtCenter>
                        <span style={{ color: '#ccc' }}>删除</span>
                      </Tooltip> : <span>
                          <span style={{color:'#1890FF'}} >删除</span>
                        </span>
                    }
        
                  </span>
                )
            }
        ];



       
        return (
            <div>
            <PageTitle title="选项卡"></PageTitle>
                <div>
                    <Tabs defaultActiveKey="1" tabBarStyle={{ background: "#fff", paddingLeft: '40px', marginBottom: 0 }}>
                        <TabPane tab="Tab 1" key="1">
                        
                            <TableList
                                location={this.props.location}
                                columns={columns}
                                rowKey='store_id'
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
                        </TabPane>
                        <TabPane tab="Tab 2" key="2">
                            <TableList
                                location={this.props.location}
                                columns={columns}
                                rowKey='store_id'
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
                        </TabPane>
                        <TabPane tab="Tab 3" key="3">
                            <TableList
                                location={this.props.location}
                                columns={columns}
                                rowKey='store_id'
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
                        </TabPane>
                    </Tabs>
                </div>

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

export default CardList;