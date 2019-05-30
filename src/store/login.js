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
      request({url: '/account/login', method: 'post', data}).then(response => {
        if (response.status === 0) {
          // console.log(response, 'userI')
          this.userInfo = response.data;
          localStorage.setItem('token',response.data.auth_name)
          localStorage.setItem('userInfo', JSON.stringify(response.data))
          if (response.data.level === 10) {
            localStorage.setItem('role', JSON.stringify('admin'))
          } else if (response.data.level === 20) {
            localStorage.setItem('role', JSON.stringify('manager'))
          }
          resolve(response)
        }

      })
    })
  }
}

export default new LoginStore();