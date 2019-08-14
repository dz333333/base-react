import React, { useState, useEffect } from 'react';

const useCount = (countParmas) => {
    const [count, setCount] = useState(countParmas);

    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        // Update the document title using the browser API
        document.title = `You clicked ${count} times`;
    });

    return count
};

export default useCount;