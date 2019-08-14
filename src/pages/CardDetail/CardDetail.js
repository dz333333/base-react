import React, { Component } from 'react';
import { Icon, Card, Badge, Table, Input,Tabs } from 'antd';
import PageTitle from '../../components/PageTitle/index';
import DetailInfo from '../../components/DetailInfo/DetailInfo';
import DetailColumn from '../../components/DetailColumn/DetailColumn';
import { inject } from 'mobx-react';
import request from '../../utils/request';
import './index.scss'
const Search = Input.Search;
const { TabPane } = Tabs;



const advancedOperation1 = [
    {
        key: 'op1',
        type: '订购关系生效',
        name: '曲丽丽',
        status: 'agree',
        updatedAt: '2017-10-03  19:23:12',
        memo: '-',
    },
    {
        key: 'op2',
        type: '财务复审',
        name: '付小小',
        status: 'reject',
        updatedAt: '2017-10-03  19:23:12',
        memo: '不通过原因',
    },
    {
        key: 'op3',
        type: '部门初审',
        name: '周毛毛',
        status: 'agree',
        updatedAt: '2017-10-03  19:23:12',
        memo: '-',
    },
    {
        key: 'op4',
        type: '提交订单',
        name: '林东东',
        status: 'agree',
        updatedAt: '2017-10-03  19:23:12',
        memo: '很棒',
    },
    {
        key: 'op5',
        type: '创建订单',
        name: '汗牙牙',
        status: 'agree',
        updatedAt: '2017-10-03  19:23:12',
        memo: '-',
    },
];

const advancedOperation2 = [
    {
        key: 'op1',
        type: '订购关系生效',
        name: '曲丽丽',
        status: 'agree',
        updatedAt: '2017-10-03  19:23:12',
        memo: '-',
    },
];

const advancedOperation3 = [
    {
        key: 'op1',
        type: '创建订单',
        name: '汗牙牙',
        status: 'agree',
        updatedAt: '2017-10-03  19:23:12',
        memo: '-',
    },
];

@inject('areaStore', 'shopStore')
class CardDetail extends Component {
    state = {
        operationkey: 'tab1',
        detailData:null
    }
    componentDidMount() {
        console.log(this, 'thisdetail')
       this.getDetail(1)
      }
    getDetail=(id)=>{
       
        request({ url: `/demo/store/${id}`, method: 'get' }).then((res) => {
          if (res && res.status === 0) {
            this.setState({
              detailData: res.data
            });
          }
        })
      }
    onOperationTabChange = key => {
        this.setState({ operationkey: key });
    };
    changeTab=(activeKey)=>{
        if(activeKey==='1'){
            this.getDetail(1)
        }else if(activeKey==='2'){
            this.getDetail(9)
        }else if(activeKey==='3'){
            this.getDetail(10)
        }
    }
    render() {
       
        const { operationkey ,detailData} = this.state
        if (!detailData) {
            return null
          }
        const { areaStore } = this.props
        const columns = [
            {
                title: '操作类型',
                dataIndex: 'type',
                key: 'type',
            },
            {
                title: '操作人',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '执行结果',
                dataIndex: 'status',
                key: 'status',
                render: text =>
                    text === 'agree' ? (
                        <Badge status="success" text="成功" />
                    ) : (
                            <Badge status="error" text="驳回" />
                        ),
            },
            {
                title: '操作时间',
                dataIndex: 'updatedAt',
                key: 'updatedAt',
            },
            {
                title: '备注',
                dataIndex: 'memo',
                key: 'memo',
            },
        ];
        const contentList = {
            tab1: (
                <Table
                    pagination={false}

                    dataSource={advancedOperation1}
                    columns={columns}
                />
            ),
            tab2: (
                <Table
                    pagination={false}

                    dataSource={advancedOperation2}
                    columns={columns}
                />
            ),
            tab3: (
                <Table
                    pagination={false}

                    dataSource={advancedOperation3}
                    columns={columns}
                />
            ),
        };
        const operationTabList = [
            {
                key: 'tab1',
                tab: '操作日志一',
            },
            {
                key: 'tab2',
                tab: '操作日志二',
            },
            {
                key: 'tab3',
                tab: '操作日志三',
            },
        ];


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
       
       const content=<div>
           <DetailInfo>
                    <DetailColumn columns={columnOne}>

                    </DetailColumn>
                    <DetailColumn columns={columnTwo}>

                    </DetailColumn>
                    <DetailColumn columns={columnThree}>

                    </DetailColumn>


                </DetailInfo>
                <div className='card'>
                    <Card
                        
                        bordered={false}
                        tabList={operationTabList}
                        onTabChange={this.onOperationTabChange}
                        extra={<Search
                            placeholder="input search text"
                            onSearch={value => console.log(value)}
                           
                        />}
                    >
                        {contentList[operationkey]}
                    </Card>
                </div>
       </div>
        return (
            <div>
                <PageTitle title="详情"></PageTitle>
                <div>
                    <Tabs defaultActiveKey="1" onChange={(activeKey)=>{this.changeTab(activeKey)}} tabBarStyle={{ background: "#fff", paddingLeft: '40px', marginBottom: 0 }}>
                        <TabPane tab="Tab 1" key="1">
                        {content}
                        </TabPane>
                        <TabPane tab="Tab 2" key="2">
                        {content}
                        </TabPane>
                        <TabPane tab="Tab 3" key="3">
                        {content}
                        </TabPane>
                    </Tabs>
                </div>
                
            </div>
        );
    }
}

export default CardDetail;