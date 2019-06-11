import React, { Component } from 'react';
import { Input, Icon, Checkbox } from 'antd';
import './index.scss'
const Search = Input.Search;
const CheckboxGroup = Checkbox.Group;
class Transfer extends Component {
    state = {
        visible: true,
        choosedColumns: [],
        allColumns: [],
        choosedValueList: [],
        allColumnsForSearch: []
    }
    componentDidMount() {
        const { columns } = this.props
        this.props.onRef(this)
        console.log(columns, 'column')
        const choosedList = []
        const choosedValueList = []
        columns.forEach(element => {
            if (element.show) {

                choosedValueList.push(element.key)
            }
            choosedList.push(element)
        });
        this.setState({
            choosedColumns: choosedList,
            allColumns: columns,
            allColumnsForSearch: columns,
            choosedValueList
        });
    }
    onChange = (values) => {
        console.log(values, 'value')
        const { choosedColumns } = this.state
        choosedColumns.forEach(item => { item.show = false })

        const choosedValueList = []
        values.forEach(element => {
            choosedColumns.forEach(column => {
                if (column.key === element) {
                    column.show = true
                    choosedValueList.push(column.key)
                }  
            });
        });
        this.setState({
            choosedColumns,
            choosedValueList
        });
    }

    close = (item) => {
        const { choosedColumns } = this.state
        if (item.disabled) {
            return;
        }
        choosedColumns[choosedColumns.indexOf(item)].show=false
        //这种写法页面不知道为什么不刷新
        // choosedValueList.splice(choosedValueList.indexOf(item.key),1)
        const choosedValueList = []
        choosedColumns.forEach((column) => {

            if(column.show){
                choosedValueList.push(column.key)
            }

        })
        this.setState({
            choosedColumns,
            choosedValueList
        });

    }

    searchColumn = (value) => {
        const { allColumnsForSearch } = this.state
        const resultList = []
        allColumnsForSearch.forEach(item => {
            if (item.title.indexOf(value) !== -1) {
                resultList.push(item)
            }
        })
        this.setState({
            allColumns: resultList
        });
    }

    render() {
        // const { leftTitle } = this.props
        const { choosedColumns, allColumns, choosedValueList } = this.state
        return (
            <div className="transfer">
                <div className='left'>

                    <h3>请选择你想显示的列表字段</h3>
                    <Search placeholder="搜索" onSearch={(value) => { this.searchColumn(value) }} enterButton
                    />
                    <div className="content">


                        <CheckboxGroup
                            value={choosedValueList}
                            onChange={this.onChange}
                        >
                            <ul>
                                {
                                    allColumns.map(item => {
                                        return <li className="item" key={item.key}><Checkbox disabled={!!item.disabled} value={item.key}>{item.title}</Checkbox></li>
                                    })
                                }

                            </ul>
                        </CheckboxGroup>
                    </div>

                </div>
                <div className="right">
                    <h3>已选择</h3>
                    <div className="content">
                        <ul>
                            {
                                choosedColumns.map(item => {
                                    return item.show ? <li className='item' key={item.key}>{item.title}<Icon type="close" onClick={() => { this.close(item) }} /></li> : null
                                })
                            }



                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Transfer;
