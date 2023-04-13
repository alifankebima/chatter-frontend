import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement } from '../../config/redux/actions/decrementAction.jsx'
import { increment } from '../../config/redux/actions/incrementAction.jsx'
import CobaRedux from '../../components/CobaRedux/index.jsx'
import { useNavigate } from 'react-router-dom'

const Coba = () => {
  const { count } = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const handleIncrement = () => {
    dispatch(increment())
  }
  const handleDecrement = () => {
    dispatch(decrement())
  }
  return (
    <div>
      <p>TestRedux : {count}</p>
      <button className='btn border' onClick={handleIncrement}>Increment</button>
      <button className='btn border' onClick={handleDecrement}>Decrement</button>
      <button className='btn border' onClick={() => navigate('/redux')}>to redux</button>
      <hr />
      <CobaRedux></CobaRedux>
    </div>
    )
}

export default Coba