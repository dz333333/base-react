import React, { Component } from 'react';
import { Button, Col } from 'antd';
import PageTitle from '../../components/PageTitle/index';
import AddForm from '../../components/AddForm/AddForm';
import moment from 'moment';

class FormDemo extends Component {
  constructor(props) {
    super()
    this.state = {
      addKeys2: [
        {
          keyId: 'brand_id',
          keyName: '输入框',
          rules: [{ required: true, message: '请输入名称' }],
          tip: '小提示',
          //   defaultValue: '默认值',
          placeholder: 'placeholder',
          type: 'input',
        }
      ]
    }
  }
  submit = () => {
    const { form } = this.addForm.props
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      console.log(fieldsValue, 'value')

    });
  }
  addInput = () => {
    const { addKeys2 } = this.state
    this.state.addKeys2.push({
      keyId: 'brand_id',
      keyName: ' ',
      rules: [{ message: '请输入名称' }],
      tip: '小提示',
      //   defaultValue: '默认值',
      placeholder: 'placeholder',
      type: 'input',
    })
    this.setState({
      addKeys2
    })
  }

  render() {
    const options = [
      {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
          {
            value: 'hangzhou',
            label: 'Hangzhou',

          },
        ],
      },
      {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
          {
            value: 'nanjing',
            label: 'Nanjing',

          },
        ],
      },
    ];

    const addKeys = [
      {
        keyId: 'brand_id',
        keyName: '输入框',
        rules: [{ required: true, message: '请输入名称' }],
        tip: '小提示',
        //   defaultValue: '默认值',
        placeholder: 'placeholder',
        type: 'input',
      },
      {
        keyId: 'brand',
        keyName: '下拉框',
        rules: [{ message: '请输入下拉框', }],
        placeholder: 'placeholder',
        //   defaultValue: '默认值',
        type: 'select',
        options: {
          id: 'id',
          value: 'name',
          list: [{ id: 1, name: '选项一' }, { id: 2, name: '选项二' }]
        }
      },
      {
        keyId: 'brand_city',
        keyName: '层级框',
        rules: [{ required: true, message: '请输入层级框' }],
        placeholder: 'placeholder',
        type: 'cascader',
        options: {
          label: 'label',
          value: 'value',
          list: options
        },

      }, {
        keyId: 'brand_date',
        keyName: '日期',
        rules: [{ required: true, message: '请输入日期' }],
        placeholder: 'placeholder',
        type: 'date',
        defaultValue: [moment('2017-05-29'), moment('2017-05-30')]
      }
    ]
    return (
      <div>
       
        <div style={{ backgroundColor: 'white', padding: '24px' }}>
          <div style={{ width: '60%', margin: '0 auto' }}>
            <AddForm addKeys={addKeys} onRef={(ref) => this.addForm = ref}>

            </AddForm>

            <Col offset={4}>
              <Button style={{ margin: '32px' }} type='primary' onClick={this.submit}>提交</Button>
            </Col>
          </div>
        </div>

      </div>
    );
  }
}

export default FormDemo;