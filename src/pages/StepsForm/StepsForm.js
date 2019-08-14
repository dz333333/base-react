import React, { Component } from 'react';
import { Steps } from 'antd';
import PageTitle from "../../components/PageTitle";
import './index.scss'

import { Form, Input, Button, Select, Divider, Alert ,Icon} from 'antd';


const { Step } = Steps;
const { Option } = Select;

const formItemLayout = {
    labelCol: {
        span: 5,
    },
    wrapperCol: {
        span: 19,
    },
};

@Form.create()
class StepsForm extends Component {
    state = {
        current: 0
    }

    nextStep = (params) => {
        this.setState({
            current: params
        });
    }

    prev = () => {
        this.setState({
            current: 0
        });
    }
    render() {
        const { current } = this.state
        const { form,  } = this.props;
        const { getFieldDecorator,  } = form;
        const formInfo =
            <div className='formInfo'><Form.Item {...formItemLayout} label="付款账户">
                AntDesign@example.com
     </Form.Item>
                <Form.Item {...formItemLayout} label="收款账户">
                    XXXX XXXX XXXX XXXX 某银行储蓄卡
     </Form.Item>
                <Form.Item {...formItemLayout} label="收款人姓名">
                    吴加号
     </Form.Item>
                <Form.Item {...formItemLayout} label="转账金额">
                    <span >50,000.00</span>
                    <span >（伍萬圆整）</span>
                </Form.Item></div>



        return (
            <div>
                <PageTitle title="分步表单">
                    将一个冗长或用户不熟悉的表单任务分成多个步骤，指导用户完成
                </PageTitle>
                <div className="steps">
                    <Steps current={current}>
                        <Step title="填写转账信息" />
                        <Step title="确认转账信息" />
                        <Step title="完成" />
                    </Steps>

                    {current === 0 ? <div className="stepOne">
                        <Form layout="horizontal" hideRequiredMark>
                            <Form.Item {...formItemLayout} label="付款账户">
                                {getFieldDecorator('payAccount', {
                                    initialValue: 'data.payAccount',
                                    rules: [{ required: true, message: '请选择付款账户' }],
                                })(
                                    <Select placeholder="test@example.com">
                                        <Option value="ant-design@alipay.com">ant-design@alipay.com</Option>
                                    </Select>
                                )}
                            </Form.Item>
                            <Form.Item {...formItemLayout} label="收款账户">
                                <Input.Group compact>
                                    <Select defaultValue="alipay" style={{ width: 100 }}>
                                        <Option value="alipay">支付宝</Option>
                                        <Option value="bank">银行账户</Option>
                                    </Select>
                                    {getFieldDecorator('receiverAccount', {
                                        initialValue: 'data.receiverAccount',
                                        rules: [
                                            { required: true, message: '请输入收款人账户' },
                                            { type: 'email', message: '账户名应为邮箱格式' },
                                        ],
                                    })(<Input style={{ width: 'calc(100% - 100px)' }} placeholder="test@example.com" />)}
                                </Input.Group>
                            </Form.Item>
                            <Form.Item {...formItemLayout} label="收款人姓名">
                                {getFieldDecorator('receiverName', {
                                    initialValue: 'data.receiverName',
                                    rules: [{ required: true, message: '请输入收款人姓名' }],
                                })(<Input placeholder="请输入收款人姓名" />)}
                            </Form.Item>
                            <Form.Item {...formItemLayout} label="转账金额">
                                {getFieldDecorator('amount', {
                                    initialValue: 'data.amount',
                                    rules: [
                                        { required: true, message: '请输入转账金额' },
                                        {
                                            pattern: /^(\d+)((?:\.\d+)?)$/,
                                            message: '请输入合法金额数字',
                                        },
                                    ],
                                })(<Input prefix="￥" placeholder="请输入金额" />)}
                            </Form.Item>
                            <Form.Item
                                wrapperCol={{
                                    xs: { span: 24, offset: 0 },
                                    sm: {
                                        span: formItemLayout.wrapperCol.span,
                                        offset: formItemLayout.labelCol.span,
                                    },
                                }}
                                label=""
                            >
                                <Button type="primary" onClick={()=>{this.nextStep(1)}}>
                                    下一步
                                </Button>
                            </Form.Item>
                        </Form>
                    </div> : ''}
                    {
                        current === 1 ? <Form layout="horizontal" className='stepTwo'>
                            <Alert
                                closable
                                showIcon
                                message="确认转账后，资金将直接打入对方账户，无法退回。"
                                style={{ marginBottom: 24 }}
                            />
                            {formInfo}
                            <Divider style={{ margin: '24px 0' }} />
                            <Form.Item {...formItemLayout} label="支付密码" required={false}>
                                {getFieldDecorator('password', {
                                    initialValue: '123456',
                                    rules: [
                                        {
                                            required: true,
                                            message: '需要支付密码才能进行支付',
                                        },
                                    ],
                                })(<Input type="password" autoComplete="off" style={{ width: '80%' }} />)}
                            </Form.Item>
                            <Form.Item
                                style={{ marginBottom: 8 }}
                                wrapperCol={{
                                    xs: { span: 24, offset: 0 },
                                    sm: {
                                        span: formItemLayout.wrapperCol.span,
                                        offset: formItemLayout.labelCol.span,
                                    },
                                }}
                                label=""
                            >
                                <Button type="primary" onClick={()=>{this.nextStep(2)}}>
                                    提交
                                </Button>
                                <Button onClick={this.prev} style={{ marginLeft: 8 }}>
                                    上一步
                                </Button>
                            </Form.Item>
                        </Form> : ''
                    }
                    {
                        current === 2 ? <div className="stepThree">
                        <Icon className="success"  type="check-circle"  theme="filled"/>
                             <h1>操作成功</h1>
                             <h3>预计两小时内到账</h3>
                             {formInfo}
                             <div className="buttons">
                                 <Button type='primary' onClick={()=>{this.nextStep(0)}}>再转一笔</Button>
                                 <Button onClick={()=>{this.nextStep(0)}}>返回</Button>
                             </div>
                        </div> : ''
                    }
                </div>

            </div>
        );
    }
}

export default StepsForm;