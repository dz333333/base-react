import React, { useState, useEffect } from 'react';
import useCount from './useCount';
const Example=()=> {
    const count = useCount(1);


  return (
    <div style={{width:'500px',height:'500px',background:'white'}}>
      <p>You clicked {count} times</p>
      
    </div>
  );
}

export default Example