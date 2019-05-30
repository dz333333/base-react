import React, { Component } from 'react';
import './index.scss'

class NotFound extends Component {
    render() {
        return (
            <div className='notFound'>
               <div className="left"></div>
               <div className="right">
                   <h1>404</h1>
                   <div>抱歉，你访问的页面不存在</div>
               </div>
            </div>
        );
    }
}

export default NotFound;