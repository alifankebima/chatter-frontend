import React, { Fragment, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import Chat from '../components/Chat'

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
            <div className="col-4">
              <div className="d-flex flex-column p-3">
                <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                  <li class="nav-item" role="presentation">
                    <button class="nav-link active" id="pills-all-tab" data-bs-toggle="pill" data-bs-target="#pills-all" type="button" role="tab" aria-controls="pills-all" aria-selected="true">All</button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button class="nav-link" id="pills-important-tab" data-bs-toggle="pill" data-bs-target="#pills-important" type="button" role="tab" aria-controls="pills-important" aria-selected="false">Important</button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button class="nav-link" id="pills-unread-tab" data-bs-toggle="pill" data-bs-target="#pills-unread" type="button" role="tab" aria-controls="pills-unread" aria-selected="false">Unread</button>
                  </li>
                </ul>
                <div class="tab-content" id="pills-tabContent">
                  <div class="tab-pane fade show active" id="pills-all" role="tabpanel" aria-labelledby="pills-all-tab" tabindex="0">
                    <Chat />
                    <Chat />
                    <Chat />
                  </div>
                  <div class="tab-pane fade" id="pills-important" role="tabpanel" aria-labelledby="pills-important-tab" tabindex="1">
                    <Chat />
                    <Chat />
                    <Chat />
                  </div>
                  <div class="tab-pane fade" id="pills-unread" role="tabpanel" aria-labelledby="pills-unread-tab" tabindex="2">
                    <Chat />
                    <Chat />
                    <Chat />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-8 bg-light">
              
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