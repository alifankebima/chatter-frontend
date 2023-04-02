import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { IoIosArrowBack } from 'react-icons/io'
import { AiOutlineMail } from 'react-icons/ai'
import axios from 'axios';
import swal from 'sweetalert2'

const EmailVerification = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("token");

  const handleButton = () => {
    navigate('/user/login')
  }

  useEffect(() => {
    axios.post(`${process.env.REACT_APP_API_URL}/api/v1/user/verify-email`, {
      token
    }).then((result) => {
      if (result.status = 200) {
        swal.fire({
          title: `Email verification success`,
          text: `${result.data.message}`,
          icon: `success`
        })
      }
    }).catch((error) => {
      console.log(error.response)
      swal.fire({
        title: `Email verification failed`,
        text: `${error.response.data.message}`,
        icon: `error`
      })
    });
  }, []);

  return (
    // image background
    <div className='bg-account'>

      {/* container to align div center horizontally and vertically */}
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="bg-white rounded account-form shadow-lg m-3">
          <div className="d-flex flex-column p-3">
            <div className="d-flex justify-content-center mt-2">
              <img className="" src='/assets/svg/logo.svg' alt='' />
              <div className="pt-1 ps-2 fs-4 fw-bold text-primary-theme">Chatter</div>
            </div>
            <div className="mt-4 fs-5 align-self-center">Email Verification Success</div>
            <AiOutlineMail style={{ fontSize: '64px' }} className='mt-2 text-primary-theme align-self-center' />
            <div className="mt-2 mb-2 align-self-center">Let's get started using Chatter!</div>
            <button onClick={handleButton} className="w-100 bg-primary-theme text-center mt-4 py-2 text-white border-0 rounded-pill">Go to login page</button>
            {/* <div className="mt-5 mb-2 align-self-center">Did not receive email? <Link onClick={handleResendEmail} className='text-secondary-theme'>Resend verification email</Link></div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmailVerification