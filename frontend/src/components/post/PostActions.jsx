import React, { useContext, useState } from 'react'
import { FaBookmark, FaRegBookmark } from 'react-icons/fa6';
import { LuMoreHorizontal } from 'react-icons/lu';
import { IoShare } from "react-icons/io5";
import Dropdown from '../Dropdown';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';

const PostActions = ({ post }) => {
    const [marked, setMarked] = useState(false);
    const navigate = useNavigate()
    
    const auth = useContext(AuthContext)
    const handelSave = () => {
        setMarked(!marked)
    }
    return (
        <>
            <IoShare className='select-none text-lg sm:text-xl ' role='button' />
            <div role='button' className='select-none ' onClick={handelSave}>
                {!marked ? <FaRegBookmark /> : <FaBookmark />}
            </div>
            {/* <LuMoreHorizontal className='select-none text-lg sm:text-xl' role='button' /> */}

            {
                true &&
                <Dropdown buttonElement={<LuMoreHorizontal className='select-none text-lg sm:text-xl' role='button' />}>
                    <span><span className=' w-full ' onClick={() => { navigate('/post/edit/' + post.id) }} >Edit</span></span>
                    <span><span className=' w-full ' onClick={() => { }} >Delete</span></span>
                </Dropdown>
            }

        </>
    )
}

export default PostActions

