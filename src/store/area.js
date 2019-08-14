import {observable, action} from 'mobx';
import request from '../utils/request';

class areaStroe {
  @observable countryList=JSON.parse(localStorage.getItem("countryList"))||[];
  @observable provinceList=JSON.parse(localStorage.getItem("provinceList"))||[];
  @observable cityList=JSON.parse(localStorage.getItem("cityList"))||[];
  
  @action getAreaName=(regionCode,type)=>{
    
    return this[type].length>0?this[type].find(item=>{return item.region_code===regionCode}).region_name:''
  }
  @action getAreaList = () => {

    const countryList=[]
    const provinceList=[]
    const cityList=[]
  
    return new Promise((resolve, reject) => {
      request({url: '/demo/common/region', method: 'get'}).then(response => {
        if (response.status === 0) {
          // console.log(response, 'userI')
          
          response.data.forEach((item)=>{
            if(item.region_class===1){
              item.children=[]
              countryList.push(item)
            }
          })
         
          response.data.forEach((item)=>{
            if(item.region_class===2){
              item.children=[]
              provinceList.push(item)
            }
          })
          response.data.forEach((item)=>{
            if(item.region_class===3){
              cityList.push(item)
            }
          })
 
          provinceList.forEach(province=>{
            cityList.forEach(city=>{
              if(city.father_code===province.region_code){
                province.children.push(city)
              }
            })
          })
          resolve(response)
        }
        this.provinceList = provinceList;
        this.cityList = cityList;
       
        countryList[0].children=provinceList
        this.countryList=countryList
        localStorage.setItem("provinceList",JSON.stringify(provinceList))
        localStorage.setItem("cityList",JSON.stringify(cityList))
        localStorage.setItem("countryList",JSON.stringify(countryList))

      })
    })
  }
}

export default new areaStroe();