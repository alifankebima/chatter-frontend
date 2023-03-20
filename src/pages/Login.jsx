import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    // image background
    <div className='bg-account'>

      {/* container to align div center horizontally and vertically */}
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="bg-white rounded account-form shadow-lg m-3">
          <form>
            <div className="d-flex flex-column p-3">
              <div className="d-flex justify-content-center mt-2">
                <img className="" src='/assets/svg/logo.svg' alt='' />
                <div className="pt-1 ps-2 fs-4 fw-bold text-primary-theme">Chatter</div>
              </div>
              <div className="mt-4 align-self-center">Hi, Welcome back!</div>
              <input type="email" class="border-0 border-bottom border-secondary border-2 mt-4" id="exampleFormControlInput1" placeholder="Email Address" />
              <input type="password" class="border-0 border-bottom border-secondary border-2 mt-4" id="exampleFormControlInput1" placeholder="Password" />
              <div className="align-self-end mt-4 text-secondary-theme"><Link to="/forgot-password" className='text-secondary-theme'>Forgot Password?</Link></div>
              <button type="submit" className="bg-primary-theme text-center mt-4 py-2 text-white border-0 rounded-pill">Login</button>
              <div className="mt-4 mb-2 align-self-center">Don't have an account? <Link to="/register" className='text-secondary-theme'>Register</Link></div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login