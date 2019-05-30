import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'mobx-react';
import * as serviceWorker from './serviceWorker';
import store from './store/index';
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import App from './App'
import Login from './components/Login/index';

import DevTools from 'mobx-react-devtools'
console.log(process.env.REACT_APP_API_ENV, 'env')
ReactDOM.render(
  <Provider {...store}>
  <Router>
    <Switch>
      <Route path='/login' component={Login} exact={true}></Route>
      <Route path='/' component={App}></Route>
    </Switch>
    <DevTools></DevTools>
  </Router>
</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls. Learn
// more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
