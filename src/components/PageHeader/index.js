import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import './index.scss';
import {routesMenu} from '../../routes/index';
import {Breadcrumb} from 'antd';

@withRouter
class PageHeader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentRoute: this.getRouteLevel(props.location.pathname) || [],
      pathList: [],
      currentPath: [],
      isMount: false
    };
  }
  componentDidMount = async() => {
    // console.log(this.props, 'props')
    this.getPathList(routesMenu)
    this.setState({isMount: true});
  }

  componentWillReceiveProps(nextProps) {
    const currentRoute = this.getRouteLevel(nextProps.location.pathname);

    this.state.isMount && this.setState({currentRoute});
  }

  getPathList = (routesMenu) => {
    const list = []
    const loop = (routesMenu) => {
      routesMenu.forEach((route, index) => {
        list.push({path: route.path, name: route.name})
        if (route.routes) {
          // console.log('route')
          loop(route.routes)
        }
      })
    }
    loop(routesMenu)
    this.setState({pathList: list});
  }

  getRouteLevel = async pathName => {
    await this.componentDidMount
    const orderPaths = [];
    const {pathList} = this.state
    pathName
      .split('/')
      .reduce((prev, next) => {
        const path = [prev, next].join('/');
        orderPaths.push(path);
        return path;
      });
    // console.log(orderPaths, 'orderpath')
    const currentPath = []
    orderPaths.forEach((path, index) => {

      pathList.forEach((pathListItem) => {
        if (path === pathListItem.path) {
          currentPath.push(pathListItem.name)
        }
      })

    })
    this.setState({currentPath});
  };
  render() {
    const {currentPath} = this.state
    return (
      currentPath[0]==='主页'?null:<div className="crumb">
      <Breadcrumb>
        {currentPath.map((item, index) => {

          return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>

        })}
      </Breadcrumb>
    </div>

    );
  }
}

export default PageHeader;