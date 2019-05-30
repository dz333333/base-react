import React from 'react';
import {Switch} from 'react-router-dom'
import Example from '../pages/Example/index'
import Home from '../pages/Home/Home';
import PageAList from '../pages/PageA/PageAList'
import PageADetail from '../pages/PageA/PageADetail'
import Admin from '../pages/Admin/Admin'
import Manager from '../pages/Manager/manager'
import PrivateRoute from '../components/PrivateRoute';
import NotFound from '../components/NotFound';
import AdminDetail from '../pages/Admin/AdminDetail';
import FormDemo from '../pages/FormDemo/FormDemo';


const routesMenu = [
  {
    path: '/',
    icon: 'home',
    name: '测试一级菜单',
    routes: [
      {
        path: '/example',
        name: '测试二级菜单',
        component: Example,
        icon: 'home',
        exact: true
      }
    ]
  },
  {
    path: '/home',
    icon: 'home',
    name: '主页',
    routes: [
      {
        path: '/example',
        name: '',
        component: Home,
        icon: 'home',
        exact: true
      }
    ]
  },
  {
    path: '/admin',
    icon: 'home',
    name: '角色admin',
    role:['admin'],
    routes: [
      {
        path: '/admin/form',
        name: 'form',
        component: FormDemo,
        icon: 'home',
        exact: true
      },
      {
        path: '/admin/list',
        name: 'adminList',
        component: Admin,
        icon: 'home',
        exact: true
      },
      {
        path: '/admin/detail',
        name: 'adminDetail',
        component: AdminDetail,
        icon: 'home',
        exact: true,
        hidden:true
      }
    ]
  },
  {
    path: '/manager',
    icon: 'home',
    name: '角色manager',
    role:['manager'],
    routes: [
      {
        path: '/manager/list',
        name: 'managerList',
        component: Manager,
        icon: 'home',
        exact: true
      }
    ]
  },
  {
    path: '/pagea',
    icon: 'home',
    name: '测试一级菜单2',
    routes: [
      {
        path: '/pagea/pagealist',
        name: '测试二级菜单list',
        component: PageAList,
        icon: 'home',
        exact: true
      },
      {
        path: '/pagea/pageadetail',
        name: '测试二级菜单detail',
        component: PageADetail,
        icon: 'home',
        exact: true,
        hidden:true
      }
    ]
  }
  // etc.
]

const Routes = () => {
  return <Switch>
    <PrivateRoute path='/example' component={Example}></PrivateRoute>
    <PrivateRoute path='/pagea/pagealist' component={PageAList}></PrivateRoute>
    <PrivateRoute path='/admin/form' component={FormDemo}></PrivateRoute>
    <PrivateRoute path='/admin/list' component={Admin}></PrivateRoute>
    <PrivateRoute path='/admin/detail' component={AdminDetail}></PrivateRoute>
    <PrivateRoute path='/manager/list' component={Manager}></PrivateRoute>
    <PrivateRoute path='/pagea/pageadetail' component={PageADetail}></PrivateRoute>
    <PrivateRoute path='/home' component={Home}></PrivateRoute>
    <PrivateRoute exact path='/' component={Home}></PrivateRoute>
    <PrivateRoute  component={NotFound}></PrivateRoute>
  </Switch>
}

export {Routes, routesMenu};