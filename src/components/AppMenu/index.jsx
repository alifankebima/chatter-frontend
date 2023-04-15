import React from 'react'
import { BsGear, BsPerson, BsTelephone, BsBookmark, BsPersonPlus, BsQuestionCircle } from 'react-icons/bs'
import { AiOutlineMenu } from 'react-icons/ai'
import { BiLogOut } from 'react-icons/bi'

const AppMenu = (props) => {
    return (
        <div className="d-flex justify-content-between">
            <div className="fs-4 fw-bold text-primary-theme">Chatter</div>
            <div className="dropdown align-self-center">
                <button className="bg-transparent border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <AiOutlineMenu className="fs-4 fw-bold text-primary-theme" />
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                    <li><button className="dropdown-item" onClick={() => {if(!props.showProfile) props.setShowProfile(true); else props.setShowProfile(false)}}><BsGear /> Edit Profile</button></li>
                    <li><button className="dropdown-item" onClick={() => alert(props.socket.id)}><BsQuestionCircle /> Show socket id</button></li>
                    <li><button className="dropdown-item" onClick={props.handleLogout}><BiLogOut /> Logout</button></li>
                </ul>
            </div>
        </div>
    )
}

export default AppMenu