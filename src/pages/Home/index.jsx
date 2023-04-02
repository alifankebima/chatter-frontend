import React, { Fragment, useState } from 'react'
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
  const [selectMessage, setSelectMessage] = useState(true);

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

                  <div class="dropdown align-self-center">
                    <button class="bg-transparent border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <AiOutlineMenu className="fs-4 fw-bold text-primary-theme" />
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end">
                      <li><a class="dropdown-item" href="#"><BsGear /> Settings</a></li>
                      <li><a class="dropdown-item" href="#"><BsPerson /> Contacts</a></li>
                      <li><a class="dropdown-item" href="#"><BsTelephone /> Calls</a></li>
                      <li><a class="dropdown-item" href="#"><BsBookmark /> Saved messages</a></li>
                      <li><a class="dropdown-item" href="#"><BsPersonPlus /> Invite friends</a></li>
                      <li><a class="dropdown-item" href="#"><BsQuestionCircle /> Chatter FAQ</a></li>
                      <li><Link to="/user/logout" class="dropdown-item" href="#"><BiLogOut /> Logout</Link></li>
                    </ul>
                  </div>
                </div>

                {/* Search bar */}
                <div className="d-flex mt-4">
                  <input type="text" class="form-control rounded border-0 bg-light" id="exampleFormControlInput1" placeholder="Search messages" />

                  <div class="dropdown align-self-center">
                    <button class="bg-transparent border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <AiOutlinePlus className="ms-2 fs-4 fw-bold text-primary-theme align-self-center" />
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end">
                      <li><a class="dropdown-item" href="#"><AiOutlineUsergroupAdd className='fs-5' /> New group chat</a></li>
                      <li><a class="dropdown-item" href="#"><HiOutlineLockClosed className='fs-5' /> New private chat</a></li>
                      <li><a class="dropdown-item" href="#"><VscMegaphone className='fs-5' /> Broadcast chat</a></li>
                    </ul>
                  </div>
                </div>

                {/* chat category selector */}
                <ul class="nav nav-pills mb-3 mt-4" id="pills-tab" role="tablist">
                  <li class="nav-item" role="presentation">
                    <button class="nav-link-theme active fw-semibold" id="pills-all-tab" data-bs-toggle="pill" data-bs-target="#pills-all" type="button" role="tab" aria-controls="pills-all" aria-selected="true">All</button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button class="nav-link-theme fw-semibold" id="pills-important-tab" data-bs-toggle="pill" data-bs-target="#pills-important" type="button" role="tab" aria-controls="pills-important" aria-selected="false">Important</button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button class="nav-link-theme fw-semibold" id="pills-unread-tab" data-bs-toggle="pill" data-bs-target="#pills-unread" type="button" role="tab" aria-controls="pills-unread" aria-selected="false">Unread</button>
                  </li>
                </ul>

                {/* Chat list */}
                <div class="tab-content flex-grow-1 overflow-auto" id="pills-tabContent">
                  <div class="tab-pane fade show active h-100" id="pills-all" role="tabpanel" aria-labelledby="pills-all-tab" tabindex="0">
                    <div className="h-100">
                      <PrivateChat />
                      <PrivateChat />
                      <PrivateChat />
                      <PrivateChat />
                      <PrivateChat />
                      <PrivateChat />
                      <PrivateChat />

                    </div>
                  </div>
                  <div class="tab-pane fade" id="pills-important" role="tabpanel" aria-labelledby="pills-important-tab" tabindex="1">
                    <PrivateChat />
                    <PrivateChat />
                    <PrivateChat />
                  </div>
                  <div class="tab-pane fade" id="pills-unread" role="tabpanel" aria-labelledby="pills-unread-tab" tabindex="2">
                    <PrivateChat />
                    <PrivateChat />
                    <PrivateChat />
                  </div>

                </div>

              </div>
            </div>
            <div className="col-md-8 col-lg-9 px-0">

              {selectMessage ?
                <div className='d-flex flex-column vh-100'>
                  <div className="d-flex align-items-center p-3">
                    <img className="align-self-center" src='/assets/img/Rectangle-3.png' />
                    <div className="d-flex flex-column justify-content-around ms-2">
                      <div className="">Theresa Webb</div>
                      <div className="text-primary">Online</div>
                    </div>
                    <AiOutlineMenu className="fs-4 fw-bold text-primary-theme ms-auto me-1" />
                  </div>

                  <div className="bg-light d-flex flex-column justify-content-end flex-grow-1 p-3 overflow-auto">
                    <div className="h-100">
                      <div className="d-flex my-2">
                        <img className="align-self-end" src='/assets/img/Rectangle-80.png' />
                        <div className="left-bubble ms-2 p-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam eos necessitatibus, sapiente inventore atque mollitia architecto, corporis reprehenderit dolores enim nisi blanditiis, praesentium dolorem ducimus doloribus alias est. Quasi, in?</div>
                      </div>
                      <div className="d-flex my-2">
                        <img className="align-self-end" src='/assets/img/Rectangle-80.png' />
                        <div className="left-bubble ms-2 p-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam eos necessitatibus, sapiente inventore atque mollitia architecto, corporis reprehenderit dolores enim nisi blanditiis, praesentium dolorem ducimus doloribus alias est. Quasi, in?</div>
                      </div>
                      <div className="d-flex my-2">
                        <img className="align-self-end" src='/assets/img/Rectangle-80.png' />
                        <div className="left-bubble ms-2 p-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam eos necessitatibus, sapiente inventore atque mollitia architecto, corporis reprehenderit dolores enim nisi blanditiis, praesentium dolorem ducimus doloribus alias est. Quasi, in?</div>
                      </div>
                      <div className="d-flex my-2">
                        <img className="align-self-end" src='/assets/img/Rectangle-80.png' />
                        <div className="left-bubble ms-2 p-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam eos necessitatibus, sapiente inventore atque mollitia architecto, corporis reprehenderit dolores enim nisi blanditiis, praesentium dolorem ducimus doloribus alias est. Quasi, in?</div>
                      </div>
                      <div className="d-flex my-2">
                        <img className="align-self-end" src='/assets/img/Rectangle-80.png' />
                        <div className="left-bubble ms-2 p-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam eos necessitatibus, sapiente inventore atque mollitia architecto, corporis reprehenderit dolores enim nisi blanditiis, praesentium dolorem ducimus doloribus alias est. Quasi, in?</div>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex align-items-center p-3">
                    <input type="text" class="form-control rounded border-0 bg-light" id="exampleFormControlInput1" placeholder="Type your message ..." />
                    <button className='ms-3 bg-transparent border-0'><FiPaperclip className='fs-4 text-primary-theme' /></button>
                    <button className='ms-3 bg-transparent border-0'><FaSmile className='fs-4 text-primary-theme' /></button>
                    <button className='ms-3 bg-transparent border-0'><IoSend className='fs-4 text-primary-theme' /></button>

                  </div>
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