import React, { useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { IoIosArrowBack } from 'react-icons/io'
import axios from 'axios';
import swal from 'sweetalert2'

const ResetPassword = () => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const token = searchParams.get("token");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password == password2) {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/user/reset-password`, {
          token, password
        });
        if (response.status = 200) {
          swal.fire({
            title: `Reset password success`,
            text: `${response.data.message}`,
            icon: `success`
          })
          navigate('/user/login');
        }
      } catch (error) {
        console.log(error.response)
        swal.fire({
          title: `Reset password failed`,
          text: `${error.response.data.message}`,
          icon: `error`
        })
      }
    } else {
      swal.fire({
        title: `Reset password failed`,
        text: `Password doesn't match`,
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
          <form onSubmit={handleResetPassword}>
            <div className="d-flex flex-column p-3">
              <div className="d-flex justify-content-center mt-2">
                <Link to="/user/login" className='align-self-center me-auto'><IoIosArrowBack className='fs-2 fw-bold text-primary-theme' /></Link>
                <img className="" src='/assets/svg/logo.svg' />
                <div className="pt-1 ps-2 fs-4 fw-bold text-primary-theme me-auto">Chatter</div>
                <IoIosArrowBack className='align-self-center fs-2 fw-bold text-primary-theme' style={{ visibility: "hidden" }} />
              </div>
              <div className="mt-4 align-self-center">Enter your new password</div>
              <input type="password" className="border-0 border-bottom border-secondary border-2 mt-4" id="exampleFormControlInput1" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <input type="password" className="border-0 border-bottom border-secondary border-2 mt-4" id="exampleFormControlInput2" placeholder="Confirm password" value={password2} onChange={(e) => setPassword2(e.target.value)} />
              <button type="submit" className="bg-primary-theme text-center mt-5 py-2 text-white border-0 rounded-pill">Send</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword