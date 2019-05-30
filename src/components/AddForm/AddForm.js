import React, {Component} from 'react';
import {
  Form,
  Select,
  Input,
  Cascader,
  Row,
  Col,
  Icon,
  DatePicker
} from 'antd';

const {Option} = Select;
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';

@Form.create()

class AddForm extends Component {

  componentDidMount() {
    console.log(this.props, 'AddFormProps')
    this
      .props
      .onRef(this)
    const {form, addKeys} = this.props
    setTimeout(() => {
      addKeys.forEach(item => {
        if (item.defaultValue) {
          form.setFieldsValue({
            [item.keyId]: item.defaultValue
          })
        }
      })
    }, 100);
  }

  renderForm = (item) => {

    if (item.type === 'input') {
      return <Input placeholder={item.placeholder}/>
    } else if (item.type === 'select') {
      return (
        <Select placeholder={item.placeholder} showSearch optionFilterProp="children">
          {item
            .options
            .list
            .map(optionItem => {
              return (
                <Option key={optionItem[item.options.id]} value={(optionItem[item.options.id])}>{optionItem[item.options.value]}</Option>
              )
            })
}
        </Select>
      )
    } else if (item.type === 'cascader') {
      return (<Cascader
        style={{
        width: '100%'
      }}
        showSearch
        options={item.options.list}
        placeholder={item.placeholder}
        fieldNames={{
        label: item.label,
        value: item.value
      }}/>)
    }else if(item.type==='date'){
      return <RangePicker format={dateFormat} style={{ width: '100%' }} />
    }
  }

  render() {
    const {addKeys, form} = this.props
    return (
      <div>
        {addKeys.map((item) => {
          return (
            <Row type='flex' key={item.keyId} >
              <Col span={20}>
                <Form labelCol={{
                  span: 5
                }}
                wrapperCol={{
                  span:18
                }}
                >

                 
                    <FormItem label={item.keyName} colon={false} extra={item.tip}>
                      {form.getFieldDecorator(`${item.keyId}`, {rules: item.rules})(this.renderForm(item))}

                    </FormItem>
                 

                </Form>
              </Col>
              <Col span={4} style={{lineHeight:'40px',verticalAlign:'middle'}}>
                <Icon type="minus-circle-o" style={{marginRight:'20px' ,fontSize: '18px'}}  />
                <Icon type="ordered-list" style={{fontSize: '18px'}} />
              </Col>
              {this.props.children}
            </Row>
          )
        })}
      </div>
    );
  }
}

export default AddForm;