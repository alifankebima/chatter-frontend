import React from 'react'
import { useSelector } from 'react-redux';

const CobaRedux = () => {
    const { count } = useSelector((state) => state.counter);

    return (
    <div>CobaRedux : {count}</div>
  )
}

export default CobaRedux