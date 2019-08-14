import React, { Component } from 'react';
import {
    Chart, 
    Geom,
    Axis,
    Tooltip,
  
} from "bizcharts";
import request from '../../utils/request'

import './index.scss'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            chartData: '',
            color:'green'
        }
    }
    componentDidMount() {
        this.getData()
        setTimeout(()=>{
            this.setState({
                color:'red'
            });
        },3000)
    }

    getData = () => {
        request({ url: '/demo/common/homepage', method: 'get' }).then(response => {
            if (response.status === 0) {
                this.setState({
                    chartData:response.data
                });
            }

        })
    }
    render() {
        const {chartData,color}=this.state
        const data=[]
        chartData&&chartData.column_graph.forEach(item=>{
            data.push({
                year:item[0],
                sales:item[1]
            })
        })
        
        
        const cols = {
            sales: {
                tickInterval: 100
            }
        };
        return (
            <div className='homePage'>
                <div className="allSee">
                    <div className="item">总销售额 <br /><h3>{chartData&&chartData.total_data.a}</h3></div>
                    <div className="item">订单 <br /><h3>{chartData&&chartData.total_data.b}</h3></div>
                    <div className="item">访客 <br /><h3>{chartData&&chartData.total_data.c}</h3></div>
                    <div className="item">活跃用户 <br /><h3>{chartData&&chartData.total_data.d}</h3></div>
                </div>
                <div className="chart">
                    <Chart height={400} data={data} scale={cols} forceFit>
                        <Axis name="year" />
                        <Axis name="sales" />
                        <Tooltip
                            crosshairs={{
                                type: "y"
                            }}
                        />
                        <Geom type="interval" position="year*sales" />
                    </Chart>
                </div>
            </div>
        );
    }
}

export default Home;




