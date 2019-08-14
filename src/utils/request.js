import axios from 'axios'
import { notification } from 'antd'

// import store from '../store'
import {createHashHistory} from 'history';
const history = createHashHistory();


const BASE_API=process.env.REACT_APP_API_ENV==='production'?'https://example-test.euphonyqr.com/api/v1.0':'/api/v1.0'
// const BASE_API=process.env.REACT_APP_API_ENV==='production'?'https://yolo.euphonyqr.com/api/v1.0':'http://localhost:8000'
// 创建axios实例
const service = axios.create({
  baseURL: BASE_API, // api的base_url
  timeout: 5000, // 请求超时时间,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    
  }
})
// request拦截器
service.interceptors.request.use(
  config => {
    if (localStorage.getItem('token')) {
      config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}` // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    // Do something with request error
    console.log('1', error) // for debug
    Promise.reject(error)
  }
)

// respone拦截器
service.interceptors.response.use(
  response => {
    // console.log(response,'res')
      if (response.data.status !== 0&&response.data.status !== 4001) {
        notification.error({
          message: `请求错误`,
          description: response.data.message,
        });
      }else {
        // console.log(response, 'success')
        
      }
      if (response.data.status === 4001) {
        
        history.push('/login');
        localStorage.clear()
      }
      return Promise.resolve(response.data)
      
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
