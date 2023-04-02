import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {IoIosArrowBack} from 'react-icons/io'
import axios from 'axios';
import swal from 'sweetalert2'

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/user/send-forgot-password`, {
        email
      });
      if (response.status = 200) {
        swal.fire({
          title: `Forgot password success`,
          text: `${response.data.message}`,
          icon: `success`
        })
          navigate('/user/login');
      }
    } catch (error) {
      console.log(error.response)
      swal.fire({
        title: `Forgot password failed`,
        text: `${error.response.data.message}`,
        icon: `error`
      })
    }
  }

  return (
    // image background
    <div className='bg-account'>

      {/* container to align div center horizontally and vertically */}
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="bg-white rounded account-form shadow-lg m-3">
          <form onSubmit={handleForgotPassword}>
            <div className="d-flex flex-column p-3">
              <div className="d-flex justify-content-center mt-2">
                <Link to="/user/login" className='align-self-center me-auto'><IoIosArrowBack className='fs-2 fw-bold text-primary-theme' /></Link>
                <img className="" src='/assets/svg/logo.svg' />
                <div className="pt-1 ps-2 fs-4 fw-bold text-primary-theme me-auto">Chatter</div>
                <IoIosArrowBack className='align-self-center fs-2 fw-bold text-primary-theme' style={{visibility: "hidden"}} />
              </div>
              <div className="mt-4 align-self-center">Enter email address associated with your account</div>
              <input type="email" class="border-0 border-bottom border-secondary border-2 mt-4" id="exampleFormControlInput1" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)}/>
              <button type="submit" className="bg-primary-theme text-center mt-5 py-2 text-white border-0 rounded-pill">Send</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword