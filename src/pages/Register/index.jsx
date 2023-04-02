import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {IoIosArrowBack} from 'react-icons/io'
import axios from 'axios';
import swal from 'sweetalert2'

const Register = () => {
  const navigate = useNavigate();

  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/user/register`,{
        fullname, username, email, password
      });
      if (response.status = 200) {
        swal.fire({
          title: `Register success`,
          text: `${response.data.message}`,
          icon: `success`
        })
        navigate('/user/login');
      }
    } catch (error) {
      console.log(error.response);
      swal.fire({
        title: `Register failed`,
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
          <form onSubmit={handleRegister}>
            <div className="d-flex flex-column p-3">
              <div className="d-flex justify-content-center mt-2">
                <Link to="/user/login" className='align-self-center me-auto'><IoIosArrowBack className='fs-2 fw-bold text-primary-theme' /></Link>
                <img className="" src='/assets/svg/logo.svg' alt='' />
                <div className="pt-1 ps-2 fs-4 fw-bold text-primary-theme me-auto">Chatter</div>
                <IoIosArrowBack className='align-self-center fs-2 fw-bold text-primary-theme' style={{visibility: "hidden"}} />
              </div>
              <div className="mt-4 align-self-center">Let's create your account!</div>
              <input type="text" class="border-0 border-bottom border-secondary border-2 mt-4" id="exampleFormControlInput1" placeholder="Full name" value={fullname} onChange={(e) => setFullname(e.target.value)} />
              <input type="text" class="border-0 border-bottom border-secondary border-2 mt-4" id="exampleFormControlInput2" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
              <input type="email" class="border-0 border-bottom border-secondary border-2 mt-4" id="exampleFormControlInput3" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)}/>
              <input type="password" class="border-0 border-bottom border-secondary border-2 mt-4" id="exampleFormControlInput4" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <button type="submit" className="bg-primary-theme text-center mt-5 py-2 text-white border-0 rounded-pill">Register</button>
              <div className="mt-4 mb-2 align-self-center">Already have an account? <Link to="/user/login" className='text-secondary-theme'>Login</Link></div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register