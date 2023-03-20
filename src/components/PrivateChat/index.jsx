import React from 'react'

const PrivateChat = () => {
  return (
    <div className="d-flex my-3">
      <img className="align-self-center" src='/assets/img/Rectangle-3.png' />
      <div className="d-flex justify-content-between w-100">
        <div className="mx-2 d-flex flex-column align-self-center">
          <div className="">Theresa Webb</div>
          <div className="text-primary-theme">Lorem ipsum dolor ...</div>
        </div>
        <div className="d-flex flex-column align-self-center">
          <div className="align-self-end">15:20</div>
          <div className="align-self-end">2</div>
        </div>
      </div>
    </div>
  )
}

export default PrivateChat