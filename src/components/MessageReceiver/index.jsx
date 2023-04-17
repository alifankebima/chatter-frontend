import React from 'react'
import styles from "./MessageReceiver.module.css";
import moment from 'moment';

const MessageReceiver = (props) => {
    return (
        <div className="d-flex flex-row-reverse my-2">
            {props.image
                ? <img className={`align-self-end rounded ${styles.profilePicture}`} src={props.image} />
                : <img className={`align-self-end rounded ${styles.profilePicture}`} src='/assets/img/default-user.png' />
            }
            <div className='align-self-center'>
                <div className={styles.rightBubble + " me-2 p-2"}>{props.text}</div>
            </div>
            {props.time && <div className="me-2 mb-1 text-secondary align-self-end" style={{ fontSize: "14px" }}>{moment(props.time).format('hh:mm A')}</div>}
        </div>
    )
}

export default MessageReceiver