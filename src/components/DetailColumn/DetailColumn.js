import React, { Component } from 'react';

class DetailColumn extends Component {
  render() {
    return (
      <div className='detailColumn'>
        {this
          .props
          .columns
          .map((item, index) => {
            return (
              <div className='columnItem' key={index}>
                <span className="title">{item.name}</span>
                <span className='content'>{item.value}</span>
              </div>
            )

          })
        }
      </div>
    );
  }
}

export default DetailColumn;