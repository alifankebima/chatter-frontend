import React from 'react'

const MessageReceiver = (props) => {
    return (
        <div className="d-flex my-2">
            <img className="align-self-end" src='/assets/img/Rectangle-80.png' />
            <div className='align-self-center'>
                <div className="left-bubble ms-2 p-2">{props.text}</div>
            </div>
        </div>
    )
}

export default MessageReceiver