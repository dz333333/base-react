import React, {Component} from 'react';
import {Route, withRouter,Redirect} from 'react-router-dom';

class PrivateRoute extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: localStorage.getItem("role") ? true: false
        }
    }

    componentWillMount() {
        if(!this.state.isAuthenticated){
            const {history} = this.props;
            setTimeout(() => {
                history.replace("/login");
            }, 1000)
        }
    }

    render() {
        let { component: Component, ...rest } = this.props;
        const {location}=this.props
        // console.log(location,'location')
        if(this.state.isAuthenticated){
            return (<Route {...rest} render={(props) => ( <Component {...props} /> 
                )}/> )
        }else{
           return (<Redirect to={{
                pathname: '/login',
              }}/>)
        }
      
    }
}

export default withRouter(PrivateRoute);