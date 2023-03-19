import React from 'react'

const Chat = () => {
  return (
    <div className="d-flex">
        <img className="align-self-center" src='/assets/img/Rectangle-3.png'/>
        <div className="d-flex flex-column">
            <div className="">Name</div>
            <div className="">Message Text</div>
        </div>
        <div className="d-flex flex-column">
            <div className="align-self-end">15:20</div>
            <div className="align-self-end">2</div>
        </div>
    </div>
  )
}

export default Chat