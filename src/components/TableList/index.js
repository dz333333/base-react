import React, { Component } from 'react';
import { Table, Pagination, Button, Modal } from 'antd';
import request from '../../utils/request';
import SearchForm from '../SearchForm'
import './index.scss'
import Transfer from '../Transfer/Transfer';


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
        this.props.columns.forEach(column => {
          console.log(item, column.title, 'title')
          if (column.key === item) {
            columns.push(column)
          }
        })
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

  getDataList = (otherParams) => {
    const { params } = this.state
    const { url } = this.props
    this.setState({
      isLoading: true
    })
    request({ url, method: 'get', params:{...params,...otherParams} })
      .then((res) => {
        if (res && res.status === 0) {
          this.setState({
            dataList: res.data,
            isLoading: false
          })
        }

      })
  }

  // 搜索，对于一些需要拆分的字段需要特殊处理
  setSearchParams = (values) => {
    const { params } = this.state

    console.log(values, 'values')
    Object.keys(values).forEach(item => {
      if (values[item] || values[item] === 0) {
       
        if (item === 'address') {
          params.province_code = values[item][0]
          params.city_code = values[item][1]
        } else {
          params[item] = values[item]
        }
      } else {
        if (item === 'address') {
          params.province_code =null
          params.city_code = null
        } 
        params[item] = null
      }
    })
    // 搜索从第一页开始
    params.page = 1
    console.log(999,params)
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

    localStorage.setItem(`${this.props.location.pathname}columns`, JSON.stringify(this.Transfer.state.choosedValueList))
    this.setState({
      columns,
      showSetColumns: false
    });
  }
  // 结合本地储存更改columns的show属性
  giveTransferColumns = () => {
    const storageColumns = JSON.parse(localStorage.getItem(`${this.props.location.pathname}columns`))
    storageColumns && this.props.columns.forEach(column => { column.show = false })

    this.props.columns.forEach((column => {
      storageColumns && storageColumns.forEach(item => {
        if (column.key === item) {
          column.show = true
        }
      })
    }))
    return this.props.columns
  }
  render() {
    const { rowKey, customConfig, searchType, onChange } = this.props
    const { currentPage, pageSize, dataList, isLoading, showSetColumns, columns } = this.state
    console.log('render')

    const transferColumns = this.giveTransferColumns()

    return (
      <div className='tableList'>
        {searchType && <SearchForm searchType={searchType} searchWords={this.setSearchParams}></SearchForm>}
        <div className='actionButton'>
          {this.props.children}
          <div>
            <Button type='primary' style={{ marginLeft: '24px' }} onClick={this.showSetColumns}>显示/隐藏列</Button>
            <Button type='primary' style={{ marginLeft: '24px' }} >下载</Button>
          </div>
        </div>

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
          dataSource={dataList && dataList.results}
          loading={isLoading}
          className='antdTable'
          onChange={onChange}

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
