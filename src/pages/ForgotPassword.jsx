import React from 'react'
import { Link } from 'react-router-dom'
import {IoIosArrowBack} from 'react-icons/io'

const ForgotPassword = () => {
  return (
    // image background
    <div className='bg-account'>

      {/* container to align div center horizontally and vertically */}
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="bg-white rounded account-form shadow-lg m-3">
          <form>
            <div className="d-flex flex-column p-3">
              <div className="d-flex justify-content-center mt-2">
                <Link to="/login" className='align-self-center me-auto'><IoIosArrowBack className='fs-2 fw-bold text-primary-theme' /></Link>
                <img className="" src='/assets/svg/logo.svg' />
                <div className="pt-1 ps-2 fs-4 fw-bold text-primary-theme me-auto">Chatter</div>
                <IoIosArrowBack className='align-self-center fs-2 fw-bold text-primary-theme' style={{visibility: "hidden"}} />
              </div>
              <div className="mt-4 align-self-center">Enter email address associated with your account</div>
              <input type="email" class="border-0 border-bottom border-secondary border-2 mt-4" id="exampleFormControlInput1" placeholder="Email Address" />
              <button type="submit" className="bg-primary-theme text-center mt-5 py-2 text-white border-0 rounded-pill">Send</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword