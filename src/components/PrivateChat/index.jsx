import React from 'react'

const PrivateChat = (props) => {
  return (
    <div className="d-flex my-3">
      {props.image
        ? <img className="align-self-end rounded" src={props.image} alt={props.username} style={{ width: "50px" }} />
        : <img className="align-self-end rounded" src='/assets/img/default-user.png' alt={props.username} style={{ width: "50px" }} />
      }
      <div className="d-flex justify-content-between w-100">
        <div className="mx-2 d-flex flex-column align-self-center">
          <div className="">{props.username || "John Doe"}</div>
          <div className="text-primary-theme">{props.lastMessage || "Placeholder"}</div>
        </div>
        <div className="d-flex flex-column align-self-center">
          <div className="align-self-end">{props.time || "12:00"}</div>
          <div className="align-self-end">{props.unread || "1"}</div>
        </div>
      </div>
    </div>
  )
}

export default PrivateChat