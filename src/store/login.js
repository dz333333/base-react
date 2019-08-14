import {observable, action} from 'mobx';
import request from '../utils/request';

class LoginStore {
  @observable title;
  @observable userInfo;
  @action getCaptcha = (values) => {
    return new Promise((resolve, reject) => {
      request({url: '/auth/login_msg', method: 'get', params: values}).then(response => {
        if (response.status === 0) {
          resolve(response)
        }

      })
    })
  };

  @action login = (data) => {
    return new Promise((resolve, reject) => {
      request({url: '/auth/login', method: 'post', data}).then(response => {
        if (response) {
          // console.log(response, 'userI')
         
          localStorage.setItem('token',response.data.auth_token)
          
          resolve(response)
        }

      })
    })
  }

  @action getUserInfo = () => {
    return new Promise((resolve, reject) => {
      request({url: '/auth/user_info', method: 'get'}).then(response => {
        if (response.status === 0) {
          console.log(response, 'userI')
          
         
          localStorage.setItem('permissions', JSON.stringify(response.data.permissions))
          localStorage.setItem('userInfo', JSON.stringify(response.data))
          resolve(response)
        }

      })
    })
  }
}

export default new LoginStore();