import React, { Component } from 'react';
import { Button, Col, Icon } from 'antd';
import PageTitle from '../../components/PageTitle/index';
import AddForm from '../../components/AddForm/AddForm';
import moment from 'moment';

class Forms extends Component {
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
        console.log(this, 'props')
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
                actions: <div><Icon type="minus-circle-o" style={{ marginRight: '20px', fontSize: '18px' }} />
                    <Icon type="ordered-list" style={{ fontSize: '18px' }} /></div>
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
                <PageTitle title="单列表单">
                    单列表单填写说明
                </PageTitle>
                <div style={{ backgroundColor: 'white',  padding: '24px' }}>
                    <div style={{ width: '100%', margin: '0 auto' }}>
                        <div style={{display:'flex'}}>
                           <div style={{width:'50%'}}>
                           <AddForm addKeys={addKeys} onRef={(ref) => this.addForm = ref}>

</AddForm>
                           </div>
                            <div style={{width:'50%'}}>
                            <AddForm addKeys={addKeys} onRef={(ref) => this.addForm2 = ref}>

</AddForm>
                            </div>
                        </div>

                        <Col offset={8}>
                            <Button style={{ margin: '32px' }} type='primary' onClick={this.submit}>提交</Button>
                        </Col>
                    </div>
                </div>
            </div>
        );
    }
}

export default Forms;