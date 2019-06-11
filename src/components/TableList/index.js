import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Table, Pagination, Button, Modal } from 'antd';
import request from '../../utils/request';
import SearchForm from '../SearchForm'
import './index.scss'
import Transfer from '../Transfer/Transfer';

@withRouter
class TableList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      pageSize: 10,
      dataList: null,
      isLoading: true,
      params: {
        page: "1",
        limit: '10'
      },
      showSetColumns: false,
      columns: []
    };
  }

  componentDidMount() {
    this.getDataList()
    console.log(this, 'mount')
    const columns = []
    if (JSON.parse(localStorage.getItem(`${this.props.location.pathname}columns`))) {
      JSON.parse(localStorage.getItem(`${this.props.location.pathname}columns`)).forEach(item => {
        if (item.show) {
          columns.push(item)
        }
      })

    } else {
      this.props.columns.forEach(item => {
        if (item.show) {
          columns.push(item)
        }
      })
    }


    this.setState({
      columns
    });
  };

  getDataList = () => {
    const { params } = this.state
    const { url } = this.props
    this.setState({
      isLoading: true
    })
    request({ url, method: 'get', params })
      .then((res) => {
        if (res && res.status === 0) {
          this.setState({
            dataList: res.data,
            isLoading: false
          })
        }

      })
  }

  setSearchParams = (values) => {
    const { params } = this.state

    console.log(values, 'values')
    Object.keys(values).forEach(item => {
      // if(values[item]){
      params[item] = values[item]
      // }
    })
    // 搜索从第一页开始
    params.page = 1
    this.setState({
      params,
      currentPage: 1
    }, () => { this.getDataList() });
  }
  //显示设置columns 的modal
  showSetColumns = () => {
    this.setState({
      showSetColumns: true
    });
  }

  onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize, '改变一页展示数');
    const { params } = this.state
    params.limit = pageSize
    this.setState({
      params,
    }, () => {
      this.getDataList()
    })
  };

  pageChange = (page, pageSize) => {
    console.log(page, pageSize, '点击页码')
    const { params } = this.state
    params.page = page
    this.setState({
      currentPage: page,
      params
    }, () => {
      this.getDataList()
    })
  };
  resetColumns = () => {
    console.log(this, 'this')
    const columns = []
    this.Transfer.state.choosedColumns.forEach(column => {
      column.show && columns.push(column)
    })

    localStorage.setItem(`${this.props.location.pathname}columns`, JSON.stringify(this.Transfer.state.choosedColumns))
    this.setState({
      columns,
      showSetColumns: false
    });
  }

  render() {
    const { rowKey, customConfig, searchType } = this.props
    const { currentPage, pageSize, dataList, isLoading, showSetColumns, columns } = this.state
    console.log('render')
    const storageColumns=localStorage.getItem(`${this.props.location.pathname}columns`)
    const transferColumns=storageColumns?JSON.parse(storageColumns):this.props.columns

    return (
      <div className='tableList'>
        {searchType && <SearchForm searchType={searchType} searchWords={this.setSearchParams}></SearchForm>}
        {this.props.children}
        <Button type='primary' style={{ marginLeft: '20px' }} onClick={this.showSetColumns}>显示/隐藏列</Button>

        <Modal

          title="自定义列表字段"
          width={800}
          visible={showSetColumns}
          onOk={this.resetColumns}
          onCancel={() => { this.setState({ showSetColumns: false }) }}
        >
          <Transfer columns={transferColumns} resetColumns={this.resetColumns} onRef={(ref) => this.Transfer = ref}></Transfer>
        </Modal>

        <Table
          pagination={false}
          columns={columns}
          rowKey={record => record[rowKey]}
          dataSource={dataList && dataList.data}
          loading={isLoading}
          className='antdTable'


          scroll={{ x: 'max-content' }}
          onRow={(record) => {
            return {
              onClick: (event) => { console.log(record, 'record') },       // 点击行
            };
          }}
          rowSelection={customConfig && customConfig}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          {dataList && <div>{`共${dataList.total}条记录 第${currentPage}/${Math.ceil(Number(dataList.total) / Number(pageSize))}页`}</div>}
          <Pagination
            showSizeChanger
            showQuickJumper
            onChange={this.pageChange}
            onShowSizeChange={this.onShowSizeChange}
            total={dataList && dataList.total}
            current={currentPage}
          />
        </div>
      </div>
    );

  }
}


export default TableList;
