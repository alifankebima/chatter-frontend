import React, { Fragment, useEffect, useRef, useState } from 'react'
// import { useMediaQuery } from 'react-responsive'
import PrivateChat from '../../components/PrivateChat'
import { AiOutlineMenu } from 'react-icons/ai'
import { IoIosArrowBack } from 'react-icons/io'
import { BsTrash, BsQuestionCircle, BsGear, } from 'react-icons/bs'
import { IoSend } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import MessageSender from '../../components/MessageSender'
import MessageReceiver from '../../components/MessageReceiver'
import { io } from "socket.io-client";
import { useDispatch, useSelector } from 'react-redux'
import updateProfileAction from '../../config/redux/actions/updateProfileAction';
import getProfileAction from '../../config/redux/actions/getprofileAction'
import swal from 'sweetalert2';
import deleteProfilePictureAction from '../../config/redux/actions/deleteProfilePictureAction'
import getPrivateMessageListAction from '../../config/redux/actions/getPrivateMessageListAction'
import { BiLogOut } from 'react-icons/bi'
import styles from './Home.module.css'
import axios from 'axios'
import { HiOutlineLockClosed } from 'react-icons/hi'
import { VscMegaphone } from 'react-icons/vsc'
import { AiOutlinePlus, AiOutlineUsergroupAdd } from 'react-icons/ai'
import moment from 'moment'

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
  // Import react hooks
  const bottomRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Import redux
  const { userProfile } = useSelector((state) => state.user);
  const { privateMessageList } = useSelector((state) => state.privateMessage)

  // React states
  // const [privateMessageList, setPrivateMessageList] = useState([])
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);
  // const [lastMessage, setLastMessage] = useState([]);
  // Socket.io function
  const [socket, setSocket] = useState(null);
  // User's selected private chat
  const [selectedChat, setSelectedChat] = useState({});
  // List of online users in socket.io
  const [activeUsers, setActiveUsers] = useState({});
  // Track time and unread state
  const [privateMessageList2, setPrivateMessageList2] = useState(privateMessageList);

  // Edit profile menu state
  const [showProfile, setShowProfile] = useState(false);
  // Image file handling
  const [saveImage, setSaveImage] = useState(null);
  // Edit profile imput form
  const [updateProfile, setUpdateProfile] = useState({
    fullname: userProfile.fullname,
    username: userProfile.username,
    email: userProfile.email,
    phone_number: userProfile.phone_number
  })

  // Get message
  useEffect(() => {
    const resultSocket = io(process.env.REACT_APP_API_URL);
    setSocket(resultSocket);
  }, [])

  const API_URL = `${process.env.REACT_APP_API_URL}`;
  const token = localStorage.getItem("token");
  const auth = {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data"
    }
  }

  useEffect(() => {
    axios.get(`${API_URL}/api/v1/private-message/${selectedChat.username}`, auth)
      .then((result) => {
        setMessages(result.data.data)
      }).catch((error) => {
        console.log(error)
      })
  }, [selectedChat])

  // Active users list for online / offline status
  useEffect(() => {
    if (socket) {
      socket.emit('setActiveUsers', {
        id: userProfile.id,
        username: userProfile.username,
        fullname: userProfile.fullname,
        image: userProfile.image
      })

      socket.on("getActiveUsers", (data) => {
        setActiveUsers(data)
      })
      
      // socket.on("updatePrivateMessageList", (data)=> {
      //   setPrivateMessageList(data)
      //   console.log(data)
      // })

      socket.on("messageBE", (data) => {
        //  Receiver                                            Sender
        // if (selectedChat.username === data.receiver_username || userProfile.username === data.sender_username) {
          setMessages((current) => [...current, data]);
        // }
      });
    }
  }, [socket])
  
  // Remove user from active users list when disconnected
  const handleLogout = () => {
    socket.emit('removeActiveUsers', { username: userProfile.username })
    socket.disconnect()
    navigate("/user/logout")
  }

  // Scroll to bottom after sending message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Get users private message list
  useEffect(() => {
    dispatch(getPrivateMessageListAction()).then(()=>{
      setPrivateMessageList2(privateMessageList)
    })
  }, [dispatch])

  // Send private message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (inputMessage) {
      socket.emit('messagePrivate', {
        id_sender: userProfile.id,
        id_receiver: selectedChat.id,
        receiver_username: selectedChat.username,
        sender_username: userProfile.username,
        sender_image: userProfile.image,
        message: inputMessage
      })
      setInputMessage("")
    }
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

  // Handle profile input
  const handleChange = (e) => {
    setUpdateProfile({
      ...updateProfile,
      [e.target.name]: e.target.value,
    });
  }
  const handleUpload = (e) => {
    const uploader = e.target.files[0];
    setSaveImage(uploader);
  }

  const handleShowProfileButton = () => {
    if (!showProfile) {
      dispatch(getProfileAction()).then(() => {
        setUpdateProfile({
          fullname: userProfile.fullname,
          username: userProfile.username,
          email: userProfile.email,
          phone_number: userProfile.phone_number
        })
        setShowProfile(true)
      })
    } else {
      setShowProfile(false)
    }
  }



  return (
    <Fragment>
      {/* modal */}
      <div class="modal fade" id="newPrivateChat" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">New Private Chat</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div className="mt-1" >Username</div>
              <input type="text" className="form-control mb-3" name="username" />
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Add User</button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row vh-100">
          <div className="col-md-4 col-lg-3">
            {!showProfile ?
              <div className="d-flex flex-column pt-3 px-2 vh-100">

                {/* <AppMenu handleLogout={handleLogout} socket={socket} showProfile={showProfile} setShowProfile={setShowProfile} /> */}
                <div className="d-flex justify-content-between">
                  <div className="fs-4 fw-bold text-primary-theme">Chatter</div>
                  <div className="dropdown align-self-center">
                    <button className="bg-transparent border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <AiOutlineMenu className="fs-4 fw-bold text-primary-theme" />
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li><button className="dropdown-item" onClick={handleShowProfileButton}><BsGear /> Edit Profile</button></li>
                      <li><button className="dropdown-item" onClick={() => alert(socket.id)}><BsQuestionCircle /> Show socket id</button></li>
                      <li><button className="dropdown-item" onClick={handleLogout}><BiLogOut /> Logout</button></li>
                    </ul>
                  </div>
                </div>

                <div className="d-flex mt-4">
                  <input type="text" className="form-control rounded border-0 bg-light" id="exampleFormControlInput1" placeholder="Search messages" />
                  <div className="dropdown align-self-center">
                    <button className="bg-transparent border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <AiOutlinePlus className="ms-2 fs-4 fw-bold text-primary-theme align-self-center" />
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li><button className="btn dropdown-item"><AiOutlineUsergroupAdd className='fs-5' /> New group chat</button></li>
                      <li><button type="button" className="btn dropdown-item" data-bs-toggle="modal" data-bs-target="#newPrivateChat"><HiOutlineLockClosed className='fs-5' /> New private chat</button></li>
                      <li><button className="btn dropdown-item"><VscMegaphone className='fs-5' /> Broadcast chat</button></li>
                    </ul>
                  </div>
                </div>

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
                      {privateMessageList.map((item) => {
                        if (item.sender !== userProfile.id) {
                          return (<button key={item.sender_username} className='btn p-0 m-0 w-100' onClick={() => { setSelectedChat({ id: item.sender, username: item.sender_username, fullname: item.sender_fullname, image: item.sender_image }); console.log(selectedChat) }}>
                            <PrivateChat image={item.sender_image} fullname={item.sender_fullname} lastMessage={item.message} time={moment(item.created_at).format('hh:mm A')} unreadCount="1" />
                          </button>)
                        }
                        //TODO
                        // } else {
                        //   return (<button key={item.receiver_username} className='btn p-0 m-0 w-100' onClick={() => setSelectedChat({ id: item.receiver, username: item.receiver_username, fullname: item.receiver_fullname, image: item.receiver_image })}>
                        //     <PrivateChat image={item.receiver_image} fullname={item.receiver_fullname} lastMessage={item.message} time={moment(item.created_at).format('hh:mm A')} unreadCount="1" />
                        //   </button>)
                        // }
                      })}
                    </div>
                  </div>
                  <div className="tab-pane fade" id="pills-unread" role="tabpanel" aria-labelledby="pills-unread-tab" tabIndex="1">
                    <PrivateChat />
                  </div>
                </div>

              </div>

              // Edit Profile
              : <div className="d-flex flex-column pt-3 px-2 vh-100">
                {/* <AppMenu handleLogout={handleLogout} socket={socket} showProfile={showProfile} setShowProfile={setShowProfile} /> */}
                <div className="d-flex justify-content-between">
                  <div className="fs-4 fw-bold text-primary-theme">Chatter</div>
                  <div className="dropdown align-self-center">
                    <button className="bg-transparent border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <AiOutlineMenu className="fs-4 fw-bold text-primary-theme" />
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li><button className="dropdown-item" onClick={handleShowProfileButton}><BsGear /> Edit Profile</button></li>
                      <li><button className="dropdown-item" onClick={() => alert(socket.id)}><BsQuestionCircle /> Show socket id</button></li>
                      <li><button className="dropdown-item" onClick={handleLogout}><BiLogOut /> Logout</button></li>
                    </ul>
                  </div>
                </div>
                <div className="d-flex justify-content-between mt-4">
                  <button className='bg-transparent border-0' onClick={() => setShowProfile(false)}><IoIosArrowBack className='fs-2 fw-bold text-primary-theme' /></button>
                  <div className="align-self-center fs-5 text-primary-theme">Edit Profile</div>
                  <IoIosArrowBack className='align-self-center fs-2 fw-bold text-primary-theme' style={{ visibility: "hidden" }} />
                </div>
                <img className={`align-self-center rounded mt-4 ${styles.profileEdit}`} src={userProfile.image || '/assets/img/default-user.png'} alt={userProfile.fullname} />
                <form className='d-flex flex-column' onSubmit={(e) => { e.preventDefault(); dispatch(updateProfileAction(updateProfile, saveImage)) }}>
                  <div className="mt-3" style={{ fontSize: "14px" }}>Change Profile Picture</div>
                  <div className="d-flex mt-1">
                    <input type="file" className="form-control form-control-sm" name="photo" onChange={handleUpload} />
                    <button type="button" className="btn btn-sm btn-outline-danger ms-2" onClick={handleDeleteImage}><BsTrash className='' /></button>
                  </div>
                  <div className="mt-2" style={{ fontSize: "14px" }}>Fullname</div>
                  <input type="text" className="form-control form-control-sm" name="fullname" value={updateProfile.fullname} onChange={handleChange} />
                  <div className="mt-2" style={{ fontSize: "14px" }}>Username</div>
                  <input type="text" className="form-control form-control-sm" name="username" value={updateProfile.username} onChange={handleChange} />
                  <div className="mt-2" style={{ fontSize: "14px" }}>Email</div>
                  <input type="text" className="form-control form-control-sm" name="email" disabled value={updateProfile.email} />
                  <div className="mt-2" style={{ fontSize: "14px" }}>Phone Number</div>
                  <input type="text" className="form-control form-control-sm" name="phone_number" value={updateProfile.phone_number} onChange={handleChange} />
                  <button type='submit' className="bg-primary-theme text-center mt-3 py-2 px-3 text-white border-0 rounded-pill align-self-center" style={{ fontSize: "14px" }}>Update Profile</button>
                </form>
              </div>}
          </div>
          <div className="col-md-8 col-lg-9 px-0">

            {selectedChat.username !== undefined ?
              <div className='d-flex flex-column vh-100'>

                <div className="d-flex align-items-center p-3">
                  <img className={`align-self-center rounded ${styles.profilePicture}`} src={selectedChat.image} alt="placeholder" />
                  <div className="d-flex flex-column justify-content-around ms-2">
                    <div className="">{selectedChat.fullname}</div>
                    {activeUsers[selectedChat.username] ?
                      (<div className="text-primary">Online</div>) :
                      (<div className="text-secondary">Offline</div>)}
                  </div>
                  <AiOutlineMenu className="fs-4 fw-bold text-primary-theme ms-auto me-1" />
                </div>

                <div className="bg-light d-flex flex-column justify-content-end flex-grow-1 p-3 overflow-auto">
                  <div className="h-100">
                    {messages.map((item, index) => {
                      if (item.sender_username === userProfile.username) {
                        return (<MessageReceiver key={index} text={item.message} time={item.created_at} image={item.sender_image} />)
                      } else {
                        return (<MessageSender key={index} text={item.message} time={item.created_at} image={item.sender_image} />)
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