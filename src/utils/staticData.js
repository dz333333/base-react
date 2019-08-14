export const staticData={
    shopStatus:[{ text: '闭店', value: 0 }, { text: '营业', value: 1 }, { text: '装修中', value: 2 }],
    productStatus:[{text:'隐藏',value:"0"},{text:'展示',value:"1"}],
    accountStatus:[{text:'未启用',value:"0"},{text:'正常',value:"1"}],
    userStatus:[{text:'禁用',value:"0"},{text:'正常',value:"1"}],
    codeStatus:[{text:'设备邀请码',value:"0"},{text:'人员邀请码',value:"1"}],
    releaseStatus:[{text:'未发放',value:"0"},{text:'已发放',value:"1"}],
    codeUseStatus:[{text:'未使用',value:"0"},{text:'已使用',value:"1"}],
    bindingStatus:[{text:'未绑定',value:"0"},{text:'已绑定',value:"1"}],
    equipmentType:[{text:'魔盒',value:"1"}],
}
export function getStaticName(val,which) {
    return staticData[which].find(item=>{return val===item.value}).text
}
