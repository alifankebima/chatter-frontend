import React from 'react'
import styles from "./MessageSender.module.css";

const MessageSender = (props) => {
    return (
        <div className="d-flex my-2">
            {props.image
                ? <img className="align-self-end rounded" src={props.image} style={{ width: "50px" }} />
                : <img className="align-self-end rounded" src='/assets/img/default-user.png' style={{ width: "50px" }} />
            }
            <div className='align-self-center'>
                <div className={styles.leftBubble + " ms-2 p-2"}>{props.text}</div>
            </div>
            {props.time && <div className="ms-2 mb-1 text-secondary align-self-end" style={{ fontSize: "14px" }}>{props.time}</div>}
        </div>
    )
}

export default MessageSender