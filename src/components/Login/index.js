import React, {Component} from 'react';
import {Form, Input, Icon, Button,Spin} from 'antd';
import './index.scss';
import loginSrc from '../../assets/img/logo.png';

import {inject} from 'mobx-react';

@inject('loginStore')

class Login extends Component {

  state = {
    isGetCaptcha: false,
    time: 120,
    isLoading:false
  };

  getCaptcha = () => {
    const {form: {
        validateFields
      }, loginStore} = this.props;
    validateFields(['phone_number'], (errors, values) => {
      if (!errors) {
        loginStore
          .getCaptcha(values)
          .then((res) => {
            let timer = setInterval(() => {
              this.setState((preState) => ({
                time: preState.time - 1
              }), () => {
                if (this.state.time === 0) {
                  clearInterval(timer);
                  this.setState({isGetCaptcha: false})
                }
              });
            }, 1000)
            this.setState({isGetCaptcha: true})
          })
      }
    });

  }

  handleSubmit = (e) => {
    console.log('submit')
    const {form: {
        validateFields
      },loginStore} = this.props;
    validateFields((errors, values) => {
      if (!errors) {
        this.setState({
          isLoading:true
        });
        loginStore.login(values).then(()=>{
          console.log('then')
          this.setState({
            isLoading:false
          });
          this.props.history.push('home')
        })
        
      }
    });
  }

  render() {
    const {time, isGetCaptcha,isLoading} = this.state
    const {getFieldDecorator} = this.props.form;
    return (
      <div className='login'>
        <div>
          <div className='loginTop'>
            <img src={loginSrc} alt=""/>
            <span>永乐智慧门店</span>
          </div>
          <div className='loginForm'>
            <Form className="login-form">
              <Form.Item>
                {getFieldDecorator('phone_number', {
                  rules: [
                    {
                      required: true,
                      message: '请输入手机号!'
                    }
                  ]
                })(
                  <Input
                  prefix={< Icon type = "mobile" style = {{ color: 'rgba(0,0,0,.25)' }}/>}
                  placeholder="手机号"/>,)}
              </Form.Item>
              <Form.Item className='captcha'>
                {getFieldDecorator('phone_code', {
                  rules: [
                    {
                      required: true,
                      message: '请输入验证码!'
                    }
                  ]
                })(
                  <Input
                  prefix={< Icon type = "mail" style = {{ color: 'rgba(0,0,0,.25)' }}/>}
                  placeholder="验证码"/>,)}
                <Button disabled={isGetCaptcha} onClick={this.getCaptcha}>
                  {isGetCaptcha
                    ? `${time}秒`
                    : '获取验证码'}</Button>
              </Form.Item>
              <Form.Item>

                <Button type="primary" onClick={this.handleSubmit}>
                  {isLoading?<Spin className='spin'/>:'登录'}
                </Button>

              </Form.Item>

            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login = Form.create()(Login);
