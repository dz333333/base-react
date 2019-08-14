import React, { Component } from 'react';
import { Form, Row, Col, Input, Button, DatePicker, Cascader, Icon, Select } from 'antd';
import './index.scss'
import request from '../../utils/request';
import {debounce} from '../../utils/commonFunction';

const { RangePicker } = DatePicker;
const FormItem = Form.Item;
const { Option } = Select;

@Form.create()
class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpand: false
    };
  }

  componentDidMount() {
    console.log(this.props)
    console.log(this.props)
  };

  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
  };

  handleSearch = e => {
    e.preventDefault();

    const { form, searchWords } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
      };
      searchWords(values)
    });
  };
  serverSelectHandleSearch = (id, value, url, searchKey) => {
    request({ url, method: 'get', params: { [searchKey]: value } })
      .then((res) => {
        if (res && res.status === 0) {
          this.setState({
            [id]: res.data
          })
        }

      })
  };
  renderSearch(searchType) {

    const dateFormat = 'YYYY/MM/DD';
    const {
      form: { getFieldDecorator }
    } = this.props;
    return searchType.map((item) => {
      if (item.type === 'input') {
        return (
          <Col key={item.id} className="searchItem" md={8} sm={24}>
            <FormItem label={item.title} colon={false}>
              {getFieldDecorator(item.id)(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
        )
      }
      else if (item.type === 'date') {
        return (
          <Col key={item.id} className="searchItem" md={8} sm={24}>
            <FormItem label={item.title} colon={false}>
              {getFieldDecorator(item.id)(<RangePicker

                format={dateFormat}
              />)}
            </FormItem>
          </Col>
        )
      }
      else if (item.type === 'select') {
        return (
          <Col key={item.id} className="searchItem" md={8} sm={24}>
            <FormItem label={item.title} colon={false}>
              {getFieldDecorator(item.id)(<Select allowClear placeholder={item.placeholder}>
                {
                  item.options.list.map((option, index) => {
                    return <Option key={index} value={option[item.options.value]} >{option[item.options.text]}</Option>
                  })
                }
              </Select>)}
            </FormItem>
          </Col>
        )
      } else if (item.type === 'serverSelect') {
        return (
          <Col key={item.id} className="searchItem" md={8} sm={24}>
            <FormItem label={item.title} colon={false}>
              {getFieldDecorator(item.id)(<Select
                allowClear
                showSearch
                onFocus={()=>{this.serverSelectHandleSearch(item.id, null, item.options.url)}}
                filterOption={false}
                placeholder={item.placeholder}
                onSearch={debounce((value) => { this.serverSelectHandleSearch(item.id, value, item.options.url, item.options.searchKey) },200)}
              >
                {
                  this.state[item.id] && this.state[item.id].map((option, index) => {
                    return <Option key={index} value={option[item.options.value]}>{option[item.options.text]}</Option>
                  })
                }
              </Select>)}
            </FormItem>
          </Col>
        )
      } else if (item.type === 'cascader') {
        return <Col key={item.id} className="searchItem" md={8} sm={24}>
          <FormItem label={item.title} colon={false}>
            {getFieldDecorator(item.id)(<Cascader
              placeholder={item.placeholder}
              showSearch
              options={item.options.list}
              fieldNames={{
                label: item.options.label,
                value: item.options.value
              }} />)}
          </FormItem>
        </Col>
      }
      else {
        return null
      }


    })
  }
  ;
  render() {
    const { searchType } = this.props;
    const { isExpand } = this.state

    return (
      <Form layout="inline" >
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {
              isExpand ? this.renderSearch(searchType) : this.renderSearch([searchType[0], searchType[1]])
            }
            <div style={{
              display: 'flex',
              marginTop: '4px', marginLeft: '24px', marginBottom: '24px'
            }}>
              <Button type="primary" onClick={this.handleSearch}>
                查询
              </Button>
              <Button style={{ marginLeft: 4 }} onClick={this.handleFormReset}>
                重置
              </Button>
              <Button style={{ marginLeft: 4 }} onClick={() => { this.setState({ isExpand: !isExpand }) }}>
                {isExpand ? <span>收起<Icon type="up" /></span> : <span>展开<Icon type="down" /></span>}
              </Button>
            </div>
          </div>
        </Row>
      </Form>

    );
  }
}


export default SearchForm;
