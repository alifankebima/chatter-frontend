import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import swal from 'sweetalert2'

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/user/login`, {
        email, password
      });
      if (response.status = 200) {
        swal.fire({
          title: `Login success`,
          text: `${response.data.message}`,
          icon: `success`
        })
        localStorage.setItem("token", response.data.data.token);
        if (localStorage.getItem("token")) {
          navigate('/');
        }
      }
    } catch (error) {
      console.log(error.response)
      swal.fire({
        title: `Login failed`,
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

          {/* Login form */}
          <form onSubmit={handleLogin}>
            <div className="d-flex flex-column p-3">

              {/* Form title */}
              <div className="d-flex justify-content-center mt-2">
                <img className="" src='/assets/svg/logo.svg' alt='' />
                <div className="pt-1 ps-2 fs-4 fw-bold text-primary-theme">Chatter</div>
              </div>

              {/* input field */}
              <div className="mt-4 align-self-center">Hi, Welcome back!</div>
              <input type="email" class="border-0 border-bottom border-secondary border-2 mt-4" id="exampleFormControlInput1" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input type="password" class="border-0 border-bottom border-secondary border-2 mt-4" id="exampleFormControlInput1" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <div className="align-self-end mt-4 text-secondary-theme"><Link to="/user/forgot-password" className='text-secondary-theme'>Forgot Password?</Link></div>
              <button type="submit" className="bg-primary-theme text-center mt-4 py-2 text-white border-0 rounded-pill">Login</button>
              <div className="mt-4 mb-2 align-self-center">Don't have an account? <Link to="/user/register" className='text-secondary-theme'>Register</Link></div>

            </div>
          </form>

        </div>
      </div>

    </div>
  )
}

export default Login