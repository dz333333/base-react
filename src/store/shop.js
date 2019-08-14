import {observable, action} from 'mobx';
import request from '../utils/request';

class shopStore {
  @observable shopManagerList=[];

  @action getShopManagerList = () => {

    
   
  
    return new Promise((resolve, reject) => {
      request({url: '/demo/common/region', method: 'get'}).then(response => {
        if (response.status === 0) {
          // console.log(response, 'userI')
          
          this.shopManagerList = response.data;
          resolve(response)
        }
        
        
      })
    })
  }
}

export default new shopStore();