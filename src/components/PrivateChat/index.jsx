import React from 'react'
import styles from './PrivateChat.module.css'

const PrivateChat = (props) => {
  return (
    <div className="d-flex my-3">
      {props.image
        ? <img className={`align-self-end rounded ${styles.profilePicture}`} src={props.image} alt={props.fullname}/>
        : <img className={`align-self-end rounded ${styles.profilePicture}`} src='/assets/img/default-user.png' alt="Default"/>
      }
      <div className="d-flex justify-content-between w-100">
        <div className="mx-2 d-flex flex-column align-self-center">
          <div className="">{props.fullname}</div>
          <div className="text-primary-theme align-self-start">{props.lastMessage}</div>
        </div>
        <div className="d-flex flex-column align-self-center">
          <div className="align-self-end">{props.time}</div>
          <div className="align-self-end">{props.unreadCount}</div>
        </div>
      </div>
    </div>
  )
}

export default PrivateChat