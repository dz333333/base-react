import request from '../utils/request';

export default{
    async getCaptcha(values){
        return await request({url: '/auth/login_msg', method: 'get', params: values}).then(response => {
            if (response.status === 0) {
              // console.log('success=----', response)
              return(response)
            }
    
          })
    }
}