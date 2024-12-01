import React, { useContext, useState } from 'react'
import { FaBookmark, FaRegBookmark } from 'react-icons/fa6';
import { LuMoreHorizontal } from 'react-icons/lu';
import { IoShare } from "react-icons/io5";
import Dropdown from '../Dropdown';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import { useMutation, useQueryClient } from 'react-query';
import { deleteBlog } from '../../helper/api';

const PostActions = ({ post }) => {
    const [marked, setMarked] = useState(false);
    const navigate = useNavigate()
    const auth = useContext(AuthContext)
    const queryClient = useQueryClient();
    const handelSave = () => {
        setMarked(!marked)
    }

    const deleteMutation = useMutation(deleteBlog, {
        onSuccess: () => {
            queryClient.invalidateQueries('blog');
        },
        onError: (error) => {
            alert("Error deleting item");
            console.error('Error deleting item:', error);
        },
    });

    const handelDelete = () => {
        if (confirm("Are you sure you want to delete this post ?") === true) {
            deleteMutation.mutate(post.data._id)
        }
    }

    return (
        <>
            <IoShare className='select-none text-lg sm:text-xl ' role='button' />
            <div role='button' className='select-none ' onClick={handelSave}>
                {!marked ? <FaRegBookmark /> : <FaBookmark />}
            </div>
            {/* <LuMoreHorizontal className='select-none text-lg sm:text-xl' role='button' /> */}

            {
                auth && auth?.username === post?.data?.author?.username &&
                <Dropdown buttonElement={<LuMoreHorizontal className='select-none text-lg sm:text-xl' role='button' />}>
                    <span><span className=' w-full ' onClick={() => { navigate('/post/edit/' + post.data._id) }} >Edit</span></span>
                    <span><span className=' w-full ' onClick={handelDelete} >Delete</span></span>
                </Dropdown>
                // console.log(post.data.author.username,post.data._id, auth.username)
            }

        </>
    )
}

export default PostActions

