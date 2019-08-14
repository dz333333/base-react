import React, { Component } from 'react';
import moment from 'moment';
import {
  Form,
  Select,
  Input,
  Cascader,
  Row,
  Col,
  DatePicker,
  Radio,
  Tag,
  Tooltip,
  Icon,
  Switch
} from 'antd';
import request from '../../utils/request';
import UploadImg from '../UploadImg'
import './index.scss'
const { Option } = Select;
const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';

@Form.create()

class AddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
    
    };
  }
  componentDidMount() {
    this.amendProps(this.props)
  }

 
  amendProps=(props)=>{
    console.log(props, 'AddFormProps')
    const { form, addKeys } = props
    setTimeout(() => {
      addKeys.forEach((item,index) => {
        // console.log(index,'iondex')

        // 没有值的放前面
        if (item.type === 'tag') {
          this.setState({
            [item.keyId]: [],
            [`inputVisible_${item.keyId}`]: false
          });

        }
       
        if (item.hasOwnProperty("defaultValue")) {
          if (item.type === 'serverSelect') {
            form.setFieldsValue({
              [item.keyId]: item.defaultValue[item.options.value]
            })
            this.setState({
              [item.keyId]: [item.defaultValue]
            })
          }else if(item.type==='tag'){
            this.setState({
              [item.keyId]:item.defaultValue
            });
            this.props.form.setFieldsValue({[item.keyId]:item.defaultValue})
          } else if(item.type==='upload'){
            this.getImgUrl(item.defaultValue,item.keyId)
          } else {
            form.setFieldsValue({
              [item.keyId]: item.defaultValue
            })
          }
        }

        if (item.type === 'serverSelect') {
          this.serverSelectHandleSearch(item.keyId, null, item.options.url)
        }


      })
    }, 100);
  }
  serverSelectHandleSearch = (id, value, url, searchKey) => {
    request({ url, method: 'get', params: { [searchKey]: value ,page:1,limit:10} })
      .then((res) => {
        if (res && res.status === 0) {
          this.setState({
            [id]: res.data.results
          })
        }

      })
  };

  // tag点击new
  showInput = (keyId) => {
    this.setState({ [`inputVisible_${keyId}`]: true });
  };
  handleInputChange = (e, keyId) => {
    console.log(e, keyId, 'ss')
    this.setState({ [`inputValue_${keyId}`]: e.target.value });
  };
  handleInputConfirm = (keyId) => {

    let tags = this.state[keyId];
    console.log(tags, this.props,'sfsdsds')
    tags = [...tags, this.state[`inputValue_${keyId}`]];
    console.log(tags, 'tags');
    this.setState({
      [keyId]: tags,
      [`inputVisible_${keyId}`]: false,
      [`inputValue_${keyId}`]: '',
    });
    this.props.form.setFieldsValue({[keyId]:tags})
  };
  handleClose = (removedTag, keyId) => {
    const tags = this.state[keyId].filter(tag => tag !== removedTag);
    console.log(tags);
    this.setState({ [keyId]: tags });
    this.props.form.setFieldsValue({[keyId]:tags})
  };
// 接收imgurl
getImgUrl = (urlList, imgType) => {
  console.log(urlList, 'url', imgType);
  this.setState({
      [imgType]: urlList,
  });
  this.props.customPreview&&this.props.customPreview(urlList)
  this.props.form.setFieldsValue({[imgType]:urlList})
};
  renderForm = (item) => {

    if (item.type === 'input') {
      return <Input placeholder={item.placeholder} />
    } else if (item.type === 'select') {
      return (
        <Select placeholder={item.placeholder} showSearch optionFilterProp="children" allowClear>
          {item
            .options
            .list
            .map(optionItem => {
              return (
                <Option key={optionItem[item.options.value]} value={(optionItem[item.options.value])}>{optionItem[item.options.text]}</Option>
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
          label: item.options.label,
          value: item.options.value
        }} />)
    } else if (item.type === 'date') {
      return <RangePicker format={dateFormat} style={{ width: '100%' }} ranges={{
        今天: [moment(), moment()],
        '本周': [moment().startOf('week'), moment().endOf('week')],
        '上周': [moment().startOf('week').subtract('week', 1), moment().endOf('week').subtract('week', 1)],
        '本月': [moment().startOf('month'), moment().endOf('month')],
        '上个月': [moment().startOf('month').subtract('month', 1), moment().endOf('month').subtract('month', 1).endOf('month')],
      }} />
    } else if (item.type === 'datePicker') {
      return <DatePicker style={{ width: '100%' }} />
    } else if (item.type === 'timePicker') {
      return <DatePicker showTime placeholder="Select Time" style={{ width: '100%' }} />
    } else if (item.type === 'serverSelect') {
      return (
        <Select
          allowClear
          showSearch
          filterOption={false}
          onSearch={(value) => { this.serverSelectHandleSearch(item.keyId, value, item.options.url, item.options.searchKey) }}
        >
          {
            this.state[item.keyId] && this.state[item.keyId].map((option, index) => {
              return <Option key={index} value={option[item.options.value]}>{option[item.options.text]}</Option>
            })
          }
        </Select>
      )
    } else if (item.type === 'radio') {
      return (
        <Radio.Group >
          {item.options.list.map((option, index) => {
            return <Radio key={index} value={option[item.options.value]}>{option[item.options.text]}</Radio>
          })}
        </Radio.Group>
      )
    } else if (item.type === 'tag') {
      return <div>
        {this.state[item.keyId] && this.state[item.keyId].length > 0 && this.state[item.keyId].map((tag, index) => {
          const tagElem = (
            <Tag key={tag} closable onClose={() => this.handleClose(tag, item.keyId)}>
              {tag}
            </Tag>
          );
          return tagElem
        })}
        {this.state[`inputVisible_${item.keyId}`] && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            style={{ width: 78 }}
            onChange={(e) => { this.handleInputChange(e, item.keyId) }}
            onBlur={() => { this.handleInputConfirm(item.keyId) }}
            onPressEnter={() => { this.handleInputConfirm(item.keyId) }}
            maxLength={item.wordsMaxLen}

          />
        )}
        {!this.state[`inputVisible_${item.keyId}`] && this.state[item.keyId] && this.state[item.keyId].length < item.tagMaxNum && (
          <Tag onClick={() => { this.showInput(item.keyId) }} style={{ background: '#fff', borderStyle: 'dashed' }}>
            <Icon type="plus" /> New Tag
        </Tag>
        )}
      </div>
    } else if (item.type === 'upload') {
      return (
        <UploadImg
          imgList={item.defaultValue}
          getImgUrl={this.getImgUrl}
          imgType={item.keyId}
          imgLimit={item.imgLimit}
          multiple={item.multiple}
          canDrag={item.canDrag}
          aspectRatio={item.aspectRatio}
          showNumber={item.showNumber}
        ></UploadImg>
      )
    }else if(item.type==='switch'){
      return (
        <Switch  checkedChildren="启用" unCheckedChildren="禁用" defaultChecked={item.defaultValue} />
      )
    } else {
      return null
    }
  }

  render() {

    const { addKeys, form } = this.props
    return (
      <div style={{width:'100%'}}>
        {addKeys.map((item) => {
          return (
            <Row type='flex' key={item.keyId} justify="space-between" >
              <Col span={20}>
                <Form labelCol={{
                  span: 8
                }}
                  wrapperCol={{
                    span: 16
                  }}
                >


                  <FormItem label={item.keyName} colon={false} extra={item.tip}>
                    {form.getFieldDecorator(`${item.keyId}`, { rules: item.rules })(this.renderForm(item))}

                  </FormItem>


                </Form>
              </Col>
              <Col span={4} style={{ lineHeight: '40px', verticalAlign: 'middle' }}>
                {item.actions && item.actions}
              </Col>
            </Row>
          )
        })}
        {this.props.children}
      </div>
    );
  }
}


export default AddForm;