import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import PrivateChat from '../../components/PrivateChat'
import { AiOutlineMenu, AiOutlinePlus, AiOutlineUsergroupAdd } from 'react-icons/ai'
import { HiOutlineLockClosed } from 'react-icons/hi'
import { VscMegaphone } from 'react-icons/vsc'
import { BsGear, BsPerson, BsTelephone, BsBookmark, BsPersonPlus, BsQuestionCircle } from 'react-icons/bs'
import { IoSend } from 'react-icons/io5'
import { FaSmile } from 'react-icons/fa'
import { FiPaperclip } from 'react-icons/fi'
import { BiLogOut } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import MessageSender from '../../components/MessageSender'
import MessageReceiver from '../../components/MessageReceiver'
import { io } from "socket.io-client";
import axios from 'axios'
import swal from 'sweetalert2'
import { useSelector } from 'react-redux'

// const Desktop = ({ children }) => {
//   const isDesktop = useMediaQuery({ minWidth: 992 })
//   return isDesktop ? children : null
// }
// const Tablet = ({ children }) => {
//   const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
//   return isTablet ? children : null
// }
const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 })
  return isMobile ? children : null
}

const Default = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 })
  return isNotMobile ? children : null
}


const Home = () => {
  const bottomRef = useRef(null);
  const { userProfile } = useSelector((state) => state.user);
  const [selectMessage, setSelectMessage] = useState(true);
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [username, setUsername] = useState("");
  const [activeUsers, setActiveUsers] = useState({});

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
  }, [])

  // send username to server
  useEffect(() => {
    if (socket) {
      socket.emit('setActiveUsers', { username: userProfile.username })
    }
  }, [socket])

  // Scroll to bottom after sending message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Send all message
  // const handleSendMessage = (e) => {
  //   e.preventDefault();
  //   socket.emit('messageAll', { message: inputMessage, user: "alif" })
  //   setInputMessage("")
  // }

  // Send private message
  const handleSendMessage = (e) => {
    e.preventDefault();
    console.log(activeUsers)
    socket.emit('messagePrivate', { senderId: socket.id, id : activeUsers.breadsticks.id ,message: inputMessage, user: userProfile.username })
    setInputMessage("")
  }

  return (
    <Fragment>
      {/* <Default> */}
      <div className="container-fluid">
        <div className="row vh-100">
          <div className="col-md-4 col-lg-3">
            <div className="d-flex flex-column pt-3 px-2 vh-100">

              {/* Title app name */}
              <div className="d-flex justify-content-between">
                <div className="fs-4 fw-bold text-primary-theme">Chatter</div>

                <div className="dropdown align-self-center">
                  <button className="bg-transparent border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <AiOutlineMenu className="fs-4 fw-bold text-primary-theme" />
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li><a className="dropdown-item" href="#"><BsGear /> Settings</a></li>
                    <li><a className="dropdown-item" href="#"><BsPerson /> Contacts</a></li>
                    <li><a className="dropdown-item" href="#"><BsTelephone /> Calls</a></li>
                    <li><a className="dropdown-item" href="#"><BsBookmark /> Saved messages</a></li>
                    <li><a className="dropdown-item" href="#"><BsPersonPlus /> Invite friends</a></li>
                    <li><button className="dropdown-item" href="#" onClick={() => alert(socket.id)}><BsQuestionCircle /> Show socket id</button></li>
                    <li><Link to="/user/logout" className="dropdown-item" href="#"><BiLogOut /> Logout</Link></li>
                  </ul>
                </div>
              </div>

              {/* Search bar */}
              <div className="d-flex mt-4">
                <input type="text" className="form-control rounded border-0 bg-light" id="exampleFormControlInput1" placeholder="Search messages" />

                <div className="dropdown align-self-center">
                  <button className="bg-transparent border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <AiOutlinePlus className="ms-2 fs-4 fw-bold text-primary-theme align-self-center" />
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li><a className="dropdown-item" href="#"><AiOutlineUsergroupAdd className='fs-5' /> New group chat</a></li>
                    <li><a className="dropdown-item" href="#"><HiOutlineLockClosed className='fs-5' /> New private chat</a></li>
                    <li><a className="dropdown-item" href="#"><VscMegaphone className='fs-5' /> Broadcast chat</a></li>
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
                    <PrivateChat />
                    <PrivateChat />
                  </div>
                </div>
                <div className="tab-pane fade" id="pills-unread" role="tabpanel" aria-labelledby="pills-unread-tab" tabIndex="1">
                  <PrivateChat />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-8 col-lg-9 px-0">

            {selectMessage ?
              <div className='d-flex flex-column vh-100'>
                <div className="d-flex align-items-center p-3">
                  <img className="align-self-center rounded" src='/assets/img/default-user.png' style={{width:"50px"}} />
                  <div className="d-flex flex-column justify-content-around ms-2">
                    <div className="">Theresa Webb</div>
                    <div className="text-primary">Online</div>
                  </div>
                  <AiOutlineMenu className="fs-4 fw-bold text-primary-theme ms-auto me-1" />
                </div>

                <div className="bg-light d-flex flex-column justify-content-end flex-grow-1 p-3 overflow-auto">
                  <div className="h-100">
                    {messages.map((item) => (
                      <MessageReceiver text={item.message} time="12:23" />
                    ))}
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