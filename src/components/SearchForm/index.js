import React, { Component } from 'react';
import { Form ,Row,Col,Input,Button,DatePicker,Cascader} from 'antd';

const {  RangePicker } = DatePicker;
const FormItem = Form.Item;
@Form.create()
class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount(){
    console.log(this.props)
  };

  handleFormReset = () => {
    const { form } = this.props;
    form.resetFields();
  };

  handleSearch = e => {
    e.preventDefault();

    const {form ,searchWords} = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
      };
      searchWords(values)
    });
  };

  renderSearch(searchType){
    const dateFormat = 'YYYY/MM/DD';
    const {
      form: { getFieldDecorator }
    } = this.props;
      return searchType.map((item)=>{
        if(item.type==='input'){
          return(
            <Col key={item.id}>
              <FormItem label={item.title}>
                {getFieldDecorator(item.id)(<Input placeholder="请输入" />)}
              </FormItem>
            </Col>
          )
        }
        if(item.type==='date'){
          return(
            <Col key={item.id}>
              <FormItem label={item.title}>
                {getFieldDecorator(item.id)( <RangePicker

                  format={dateFormat}
                />)}
              </FormItem>
            </Col>
          )
        }
        if(item.type==='cascader'){
          return(
            <Col key={item.id}>
              <FormItem label={item.title}>
                {getFieldDecorator(item.id)( <Cascader
                  options={item.options.option}
                  fieldNames={item.options.fieldNames}
                  placeholder="请选择"
                  showSearch='true'
                />)}
              </FormItem>
            </Col>
          )
        }else{
            return null
        }
        

      })
  }
;
  render() {
    const { searchType } = this.props;
    return (
      <Form  layout="inline">
        <Row gutter={{ md: 2, lg: 24, xl: 48 }}>
          <div style={{display:'flex'}}>
            {this.renderSearch(searchType)}
            <div style={{display: 'flex',
              alignItems: 'center'}}>
              <Button type="primary" onClick={this.handleSearch}>
                查询
              </Button>
              <Button style={{ marginLeft: 4 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </div>
          </div>
        </Row>
      </Form>

    );
  }
}


export default SearchForm;
