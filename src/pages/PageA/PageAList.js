import React, {Component} from 'react';
import {Button} from 'antd';
import PageTitle from '../../components/PageTitle';

class PageAList extends Component {

  componentDidMount() {
    console.log(this.props.history,)
  }

  render() {
    return (
      <div>
        <PageTitle title="门店列表"></PageTitle>
        <div className='mainContent'>
          list<br></br>
          list<br></br>
          list<br></br>
          list<br></br>
          list<br></br>
          list<br></br>
          list<br></br>
          list<br></br>
          list<br></br>
          list<br></br>
          list<br></br>
          list<br></br>
          list<br></br>
          list<br></br>
          list<br></br>
          list<br></br>
          list<br></br>
          list<br></br>
          list<br></br>
          list<br></br>
          list<br></br>
          list<br></br>
          list<br></br>
          list<br></br>
          list<br></br>
          list<br></br>
          list<br></br>
          list<br></br>
          list<br></br>
          list<br></br>
          list<br></br>
          list<br></br>
          list<br></br>
          list<br></br>
          list<br></br>
          list<br></br>
          list<br></br>
          list<br></br>
          list<br></br>

          <Button
            onClick={() => {
            this
              .props
              .history
              .push('/pagea/pageadetail')
          }}>点击详情</Button>
        </div>
      </div>
    );
  }
}

export default PageAList;