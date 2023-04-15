import React from 'react'
import { HiOutlineLockClosed } from 'react-icons/hi'
import { VscMegaphone } from 'react-icons/vsc'
import { AiOutlinePlus, AiOutlineUsergroupAdd } from 'react-icons/ai'

const SearchMessage = () => {
    return (
        <div className="d-flex mt-4">
            <input type="text" className="form-control rounded border-0 bg-light" id="exampleFormControlInput1" placeholder="Search messages" />
            <div className="dropdown align-self-center">
                <button className="bg-transparent border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <AiOutlinePlus className="ms-2 fs-4 fw-bold text-primary-theme align-self-center" />
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                    <li><a className="dropdown-item" href="/"><AiOutlineUsergroupAdd className='fs-5' /> New group chat</a></li>
                    <li><a className="dropdown-item" href="/"><HiOutlineLockClosed className='fs-5' /> New private chat</a></li>
                    <li><a className="dropdown-item" href="/"><VscMegaphone className='fs-5' /> Broadcast chat</a></li>
                </ul>
            </div>
        </div>
    )
}

export default SearchMessage