import React from 'react';
import {Switch} from 'react-router-dom'
import Home from '../pages/Home/Home';
import Admin from '../pages/Admin/Admin'
import PrivateRoute from '../components/PrivateRoute';
import NotFound from '../components/NotFound';
import AdminDetail from '../pages/Admin/AdminDetail';
import BaseDetail from '../pages/BaseDetail/BaseDetail';
import FormDemo from '../pages/FormDemo/FormDemo';
import CardList from '../pages/CardList/CardList';
import Forms from '../pages/Forms/Forms';
import StepsForm from '../pages/StepsForm/StepsForm';
import  SingleForm from '../pages/SingleForm/SingleForm';
import CardDetail from '../pages/CardDetail/CardDetail';
import SideDetail from '../pages/SideDetail/SideDetail';
import Others from '../pages/Others/Others';
import Hooks from '../pages/Hooks/Hooks';


const routesMenu = [
  {
    path: '/home',
    icon: 'home',
    name: '主页',
    permission:'demo_a',
    component: Home,
  },
  // {
  //   path: '/hooks',
  //   icon: 'home',
  //   name: 'hooks',
  //   permission:'demo_a',
  //   component: Hooks,
  // },
  {
    path: '/admin',
    icon: 'home',
    name: '列表页',
    permission:'demo_a',
    routes: [
      {
        path: '/admin/list',
        name: '普通列表',
        component: Admin,
        icon: 'home',
        exact: true
      },
      {
        path: '/admin/cardlist',
        name: '选项卡列表',
        component: CardList,
        icon: 'home',
        exact: true
      },
      {
        path: '/admin/detail/:id',
        name: 'adminDetail',
        component: AdminDetail,
        icon: 'home',
        exact: true,
        hidden:true
      }
    ]
  },
  {
    path:'/form',
    icon:'home',
    name:'表单页',
    permission:'demo_a',
    routes:[ {
      path: '/form/form',
      name: '单列表单',
      component: FormDemo,
      icon: 'home',
      exact: true
    },{
      path: '/form/forms',
      name: '多列表单',
      component: Forms,
      icon: 'home',
      exact: true
    },{
      path: '/form/stepsforms',
      name: '分步表单',
      component: StepsForm,
      icon: 'home',
      exact: true
    },{
      path: '/form/singleform',
      name: '表单组件',
      component: SingleForm,
      icon: 'home',
      exact: true
    }]
  },
  
  {
    path:'/detail',
    icon:'home',
    name:'详情页',
    permission:'demo_a',
    routes:[
      {
        path:'/detail/base',
        name:'基本详情页',
        component:BaseDetail,
        icon:'home',
        exact:true
      },
      {
        path:'/detail/card',
        name:'选项卡详情页',
        component:CardDetail,
        icon:'home',
        exact:true
      },
      {
        path:'/detail/side',
        name:'侧边栏详情页',
        component:SideDetail,
        icon:'home',
        exact:true
      }
    ]
  },
  {
    path: '/others',
    icon: 'home',
    name: '其他',
    permission:'demo_a',
    routes: [
      {
        path: '/others',
        name: '警告提示',
        component: Others,
        icon: 'home',
        exact: true
      }
    ]
  }
  // etc.
]

const Routes = () => {
  return <Switch>
    {routesMenu.map((menu)=>{
      if(menu.routes){
        return menu.routes.map(item=>{return <PrivateRoute path={item.path} component={item.component}></PrivateRoute>})
      }else{
        return <PrivateRoute key={menu.path} path={menu.path} component={menu.component}></PrivateRoute>
      }
    })}
    <PrivateRoute exact path='/' component={Home}></PrivateRoute>
    <PrivateRoute  component={NotFound}></PrivateRoute>
  </Switch>
}

export {Routes, routesMenu};