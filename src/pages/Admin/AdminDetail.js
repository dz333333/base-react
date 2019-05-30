import React, { Component } from 'react';
import PageTitle from '../../components/PageTitle/index';
import './AdminDetail.scss'

class AdminDetail extends Component {
    render() {
        return (
            <div>
                <PageTitle title="admin详情"></PageTitle>
                <div className="detail">
                    <div>a</div>
                    <div>b</div>
                    <div>c</div>
                </div>
            </div>
        );
    }
}

export default AdminDetail;