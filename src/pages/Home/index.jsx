import React, { Fragment, useEffect, useRef, useState } from 'react'
// import { useMediaQuery } from 'react-responsive'
import PrivateChat from '../../components/PrivateChat'
import { AiOutlineMenu } from 'react-icons/ai'
import { IoIosArrowBack } from 'react-icons/io'
import { BsTrash } from 'react-icons/bs'
import { IoSend } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import MessageSender from '../../components/MessageSender'
import MessageReceiver from '../../components/MessageReceiver'
import { io } from "socket.io-client";
import { useDispatch, useSelector } from 'react-redux'
import AppMenu from '../../components/AppMenu'
import SearchMessage from '../../components/SearchMessage'
import updateProfileAction from '../../config/redux/actions/updateProfileAction';
import getProfileAction from '../../config/redux/actions/getprofileAction'
import swal from 'sweetalert2';
import deleteProfilePictureAction from '../../config/redux/actions/deleteProfilePictureAction'

// const Desktop = ({ children }) => {
//   const isDesktop = useMediaQuery({ minWidth: 992 })
//   return isDesktop ? children : null
// }
// const Tablet = ({ children }) => {
//   const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
//   return isTablet ? children : null
// }
// const Mobile = ({ children }) => {
//   const isMobile = useMediaQuery({ maxWidth: 767 })
//   return isMobile ? children : null
// }
// const Default = ({ children }) => {
//   const isNotMobile = useMediaQuery({ minWidth: 768 })
//   return isNotMobile ? children : null
// }

const Home = () => {
  const bottomRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userProfile } = useSelector((state) => state.user);
  const [selectMessage] = useState(true);
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [saveImage, setSaveImage] = useState(null);
  // const [username, setUsername] = useState("");
  const [activeUsers, setActiveUsers] = useState({});
  const [updateProfile, setUpdateProfile] = useState({
    fullname: userProfile.fullname, 
    username: userProfile.username,
    email: userProfile.email,
    phone_number: userProfile.phone_number
  })

  //Handle update profile input
  const handleChange = (e) => {
    setUpdateProfile({
      ...updateProfile,
      [e.target.name]: e.target.value,
    });
  };

  // Get message
  useEffect(() => {
    const resultSocket = io(process.env.REACT_APP_API_URL);
    setSocket(resultSocket);
    console.log(resultSocket)

    resultSocket.on("messageBE", (data) => {
      console.log(data)
      setMessages((current) => [...current, data]);
    });

    resultSocket.on("getActiveUsers", (data) => {
      setActiveUsers({
        ...activeUsers,
        ...data
      })
    })

    if(localStorage.getItem("token") && userProfile.username == ""){
      dispatch(getProfileAction())
      setUpdateProfile({
        fullname: userProfile.fullname, 
        username: userProfile.username,
        email: userProfile.email,
        phone_number: userProfile.phone_number
      })
    }
  }, [])

  // send username to server
  useEffect(() => {
    if (socket) socket.emit('setActiveUsers', { username: userProfile.username })
  }, [socket])

  // Scroll to bottom after sending message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Send private message
  const handleSendMessage = (e) => {
    e.preventDefault();
    console.log(activeUsers)
    socket.emit('messagePrivate', {
      receiverId: activeUsers.breadsticks.id,
      receiverUsername: activeUsers.breadsticks.username,
      senderUsername: userProfile.username,
      message: inputMessage
    })
    setInputMessage("")
  }
  
  const handleDeleteImage = () => {
    swal.fire({
      title: 'Are you sure?',
      text: "Do you want to delete profile picture",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProfilePictureAction())
      }
    })
  }

  const handleLogout = () => {
    socket.disconnect()
    navigate("/user/logout")
  }

  function handleUpload(e) {
    const uploader = e.target.files[0];
    setSaveImage(uploader);
  }

  return (
    <Fragment>
      {/* <Default> */}
      <div className="container-fluid">
        <div className="row vh-100">
          <div className="col-md-4 col-lg-3">
            {!showProfile ?
              <div className="d-flex flex-column pt-3 px-2 vh-100">

                <AppMenu handleLogout={handleLogout} socket={socket} showProfile={showProfile} setShowProfile={setShowProfile} />

                <SearchMessage />

                {/* chat category selector */}
                <ul className="nav nav-pills mb-3 mt-4" id="pills-tab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button className="nav-link-theme active fw-semibold" id="pills-all-tab" data-bs-toggle="pill" data-bs-target="#pills-all" type="button" role="tab" aria-controls="pills-all" aria-selected="true">All</button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button className="nav-link-theme fw-semibold" id="pills-unread-tab" data-bs-toggle="pill" data-bs-target="#pills-unread" type="button" role="tab" aria-controls="pills-unread" aria-selected="false">Unread</button>
                  </li>
                </ul>

                {/* Chat list */}
                <div className="tab-content flex-grow-1 overflow-auto" id="pills-tabContent">
                  <div className="tab-pane fade show active h-100" id="pills-all" role="tabpanel" aria-labelledby="pills-all-tab" tabIndex="0">
                    <div className="h-100">
                      <PrivateChat />
                      <PrivateChat />
                    </div>
                  </div>
                  <div className="tab-pane fade" id="pills-unread" role="tabpanel" aria-labelledby="pills-unread-tab" tabIndex="1">
                    <PrivateChat />
                  </div>
                </div>

              </div>

              // Edit Profile
              : <div className="d-flex flex-column pt-3 px-2 vh-100">
                <AppMenu handleLogout={handleLogout} socket={socket} showProfile={showProfile} setShowProfile={setShowProfile} />
                <div className="d-flex justify-content-between mt-4">
                  <button className='bg-transparent border-0' onClick={() => setShowProfile(false)}><IoIosArrowBack className='fs-2 fw-bold text-primary-theme' /></button>
                  <div className="align-self-center fs-5 text-primary-theme">Edit Profile</div>
                  <IoIosArrowBack className='align-self-center fs-2 fw-bold text-primary-theme' style={{ visibility: "hidden" }} />
                </div>
                <img className="align-self-center rounded mt-4" src={userProfile.image || '/assets/img/default-user.png'} alt={userProfile.username} style={{ width: "80px" }} />
                <form className='d-flex flex-column' onSubmit={(e) => {e.preventDefault(); dispatch(updateProfileAction(updateProfile, saveImage))}}>
                  <div className="mt-3" style={{fontSize: "14px"}}>Change Profile Picture</div>
                  <div className="d-flex mt-1">
                    <input type="file" className="form-control form-control-sm" name="photo" onChange={handleUpload} />
                    <button type="button" class="btn btn-sm btn-outline-danger ms-2" onClick={handleDeleteImage}><BsTrash className='' /></button>
                  </div>
                  <div className="mt-2" style={{fontSize: "14px"}}>Fullname</div>
                  <input type="text" className="form-control form-control-sm" name="fullname" value={updateProfile.fullname} onChange={handleChange}/>
                  <div className="mt-2" style={{fontSize: "14px"}}>Username</div>
                  <input type="text" className="form-control form-control-sm" name="username" value={updateProfile.username} onChange={handleChange}/>
                  <div className="mt-2" style={{fontSize: "14px"}}>Email</div>
                  <input type="text" className="form-control form-control-sm" name="email" disabled value={updateProfile.email}/>
                  <div className="mt-2" style={{fontSize: "14px"}}>Phone Number</div>
                  <input type="text" className="form-control form-control-sm" name="phone_number" value={updateProfile.phone_number} onChange={handleChange}/>
                  <button type="submit" class="bg-primary-theme text-center mt-3 py-2 px-3 text-white border-0 rounded-pill align-self-center" style={{fontSize: "14px"}}>Update Profile</button>
                </form>
              </div>}
          </div>
          <div className="col-md-8 col-lg-9 px-0">

            {selectMessage ?
              <div className='d-flex flex-column vh-100'>

                <div className="d-flex align-items-center p-3">
                  <img className="align-self-center rounded" src='/assets/img/default-user.png' alt="placeholder" style={{ width: "50px" }} />
                  <div className="d-flex flex-column justify-content-around ms-2">
                    <div className="">John Doe</div>
                    <div className="text-primary">Online</div>
                  </div>
                  <AiOutlineMenu className="fs-4 fw-bold text-primary-theme ms-auto me-1" />
                </div>

                <div className="bg-light d-flex flex-column justify-content-end flex-grow-1 p-3 overflow-auto">
                  <div className="h-100">
                    {messages.map((item) => {
                      if (item.user === userProfile.username) {
                        return (<MessageReceiver text={item.message} time={item.date} />)
                      } else {
                        return (<MessageSender text={item.message} time={item.date} />)
                      }
                    })}
                    <div ref={bottomRef} style={{
                      visibility: 'hidden'
                    }} />
                  </div>
                </div>

                <form className="d-flex align-items-center p-3" onSubmit={handleSendMessage}>
                  <input type="text" className="form-control rounded border-0 bg-light" id="exampleFormControlInput1" placeholder="Type your message ..." value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} />
                  {/* <button className='ms-3 bg-transparent border-0'><FiPaperclip className='fs-4 text-primary-theme' /></button>
                    <button className='ms-3 bg-transparent border-0'><FaSmile className='fs-4 text-primary-theme' /></button> */}
                  <button type="submit" className='ms-3 bg-transparent border-0'><IoSend className='fs-4 text-primary-theme' /></button>
                </form>

              </div>

              : <div className="d-flex justify-content-center align-items-center vh-100"><div className='text-secondary'>Please select a chat to start messaging</div> </div>}

          </div>
        </div>
      </div>
      {/* </Default> */}
    </Fragment>

  )
}

export default Home