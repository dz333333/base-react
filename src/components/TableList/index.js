import React, { Component } from 'react';
import { Table,Pagination,Spin} from 'antd';
import request from '../../utils/request';
import SearchForm from '../SearchForm'
import './index.scss'
class TableList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage:1,
      pageSize:10,
      dataList:null,
      params:{
        page:"1",
        limit:'10'
      }
    };
  }

   componentDidMount(){
    this.getDataList()
   console.log('mount')
  };

  getDataList=()=>{
    const {params}=this.state
    const {url}=this.props
    request({url, method: 'get',params})
    .then((res)=>{
      if(res&&res.status===0){
        this.setState({
          dataList:res.data
        })
      }

    })
  }

  setSearchParams=(values)=>{
    const {params}=this.state
    
    console.log(values,'values')
    Object.keys(values).forEach(item=>{
      // if(values[item]){
        params[item]=values[item]
      // }
    })
    // 搜索从第一页开始
    params.page=1
    this.setState({
      params,
      currentPage:1
    },()=>{this.getDataList()});
  }

  onShowSizeChange=(current, pageSize)=> {
    console.log(current, pageSize,'改变一页展示数');
    const {params}=this.state
    params.limit=pageSize
    this.setState({
      params,
    },()=>{
      this.getDataList()
    })
  };

  pageChange=(page, pageSize)=>{
    console.log(page,pageSize,'点击页码')
    const {params}=this.state
    params.page=page
    this.setState({
      currentPage:page,
      params
    },()=>{
      this.getDataList()
    })
  };

  render() {
    const {columns,rowKey,customConfig,searchType}=this.props
    const {currentPage,pageSize,dataList}=this.state
    console.log('render')
    if(dataList){
        return (
            <div className='tableList'>
            {searchType&&<SearchForm searchType={searchType} searchWords={this.setSearchParams}></SearchForm>}
            {this.props.children}
              <Table
                pagination={false}
                columns={columns}
                rowKey={record => record[rowKey]}
                dataSource={dataList.data||dataList.results}
                
                className='antdTable'
                onRow={(record) => {
                  return {
                    onClick: (event) => {console.log(record,'record')},       // 点击行
                  };
                }}
                rowSelection={customConfig&&customConfig}
              />
              <div style={{display:'flex',justifyContent:'space-between',marginTop:'20px'}}>
                <div>{`共${dataList.total}条记录 第${currentPage}/${Math.ceil(Number(dataList.total)/Number(pageSize))}页`}</div>
                <Pagination
                  showSizeChanger
                  showQuickJumper
                  onChange={this.pageChange}
                  onShowSizeChange={this.onShowSizeChange}
                  total={dataList.total}
                  current={currentPage}
                />
              </div>
            </div>
          );
    }else{
        return <Spin className='spin' tip="Loading..."/>
    }
  }
}


export default TableList;
