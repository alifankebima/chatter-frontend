import React from 'react'
import styles from "./MessageSender.module.css";
import moment from 'moment';

const MessageSender = (props) => {
    return (
        <div className="d-flex my-2">
            {props.image
                ? <img className={`align-self-end rounded ${styles.profilePicture}`} src={props.image} />
                : <img className={`align-self-end rounded ${styles.profilePicture}`} src='/assets/img/default-user.png' />
            }
            <div className='align-self-center'>
                <div className={styles.leftBubble + " ms-2 p-2 text-break"}>{props.text}</div>
            </div>
            {props.time && <div className="ms-2 mb-1 text-secondary align-self-end" style={{ fontSize: "14px" }}>{moment(props.time).format('hh:mm A')}</div>}
        </div>
    )
}

export default MessageSender