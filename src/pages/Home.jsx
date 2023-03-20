import React, { Fragment, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import PrivateChat from '../components/PrivateChat'
import { AiOutlineMenu, AiOutlinePlus, AiOutlineUsergroupAdd, AiOutlineLock } from 'react-icons/ai'

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
      <Default>
        <div className="container-fluid">
          <div className="row vh-100">
            <div className="col-md-4 col-lg-3">
              <div className="d-flex flex-column pt-3 px-2 vh-100">

                {/* Title app name */}
                <div className="d-flex justify-content-between">
                  <div className="fs-4 fw-bold text-primary-theme">Chatter</div>
                  <div class="btn-group dropstart">
                    <button type="button" class="bg-transparent border-0" data-bs-toggle="dropdown" aria-expanded="false">
                      <AiOutlineMenu className="fs-4 fw-bold text-primary-theme" />
                    </button>

                    <ul class="dropdown-menu border-0 bg-primary-theme">
                      <li className='d-flex text-white'>
                        <AiOutlineUsergroupAdd className='fs-4'/>
                        <AiOutlineLock />
                        <div className="">1</div>
                      </li>
                    </ul>
                  </div>


                </div>

                {/* Search bar */}
                <div className="d-flex mt-4">
                  <input type="text" class="form-control rounded border-0 bg-light" id="exampleFormControlInput1" placeholder="Search messages" />
                  <AiOutlinePlus className="ms-2 fs-4 fw-bold text-primary-theme align-self-center" />
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
                    <div className="overflow-auto h-100">
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
            <div className="col-md-8 col-lg-9 bg-light">

              {selectMessage ?
                <div>
                  Test
                </div>

                : <div className="d-flex justify-content-center align-items-center vh-100"><div className='text-secondary'>Please select a chat to start messaging</div> </div>}

            </div>
          </div>
        </div>
      </Default>
      <Mobile>
        <div>test mobile</div>
      </Mobile>
    </Fragment>

  )
}

export default Home