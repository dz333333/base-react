import React from 'react';
import './index.scss'

const PageTitle = (props) => {
    return (
        <div className='pageTitle'>
            <h1>{props.title}</h1>
            
            {props.children?<div style={{marginTop:'16px'}}>{props.children}</div>:''}
        </div>
    );
};

export default PageTitle;