import React, { useContext, useRef } from 'react'
import moment from 'moment'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import PostActions from '../components/post/PostActions';
import Footer from './../components/Layout/Footer';
import { useQuery } from 'react-query';
import { fetchBlog } from '../helper/api';
import { AuthContext } from '../context/authContext';
import { editorTools } from '../helper/editorjsConfig';

import EditorJS from '@editorjs/editorjs';
import Loader from '../components/Loader';

const Post = () => {
    // const { id } = useParams();
    const id = "66d1a2b63e1d5aa7cd745369"
    const navigate = useNavigate()

    const auth = useContext(AuthContext)

    //
    const { data } = {
        isLoading: !true,
        data: [
            {
                "_id": "64c0b9e8e4b1d2f5c9e5e5e5",
                "photo": "https://picsum.photos/id/233/200",
                "title": "10 Because of a Question About try…catch, I Failed My Interview",
                "username": "johndoe",
                "createdAt": "2024-07-26T12:34:56Z",
                "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae scelerisque enim ligula venenatis dolor."
            },
            {
                "_id": "64c0ba12e4b1d2f5c9e5e5e6",
                "photo": "https://picsum.photos/id/223/200",
                "title": "Exploring the Depths of the Ocean",
                "username": "janedoe",
                "createdAt": "2024-07-25T10:15:30Z",
                "desc": "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            },
            {
                "_id": "64c0ba3be4b1d2f5c9e5e5e7",
                "photo": "https://picsum.photos/id/265/200",
                "title": "A Day in the Life of a Software Developer",
                "username": "developer123",
                "createdAt": "2024-07-24T08:00:00Z",
                "desc": "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            }
        ]
    }
    // const blog = data.find(item => item._id === id)
    //

    const editorRef = useRef(null);

    const { data: blog, isLoading, isSuccess, error } = useQuery(['blog', id], () => fetchBlog(id), { enabled: !!id });

    if (isLoading) {
        return <Loader/>

    }

    if (error) {
        return <>
            <div className='w-fit select-none space-y-1 lg:scale-[200%] sm:scale-[130%] mx-auto p-5 my-44 '>
                <h1 className='theme-gray font-bold font-title text-4xl tracking-widest mx-auto w-fit'>{error.response.status}</h1>
                <h1 className='theme-gray font-title mx-auto text-2xl w-fit'>Post {error.response.statusText}</h1>
            </div>
        </>
    }


    //postId - fetch post data - load in the editor
    // auth = writer (true) then enable some features 
    // edit button - Title editable=true  and editorjs readOnly=!true

    // actions like edit image button on the top right 
    // save Cancel and restore button to restore the previous state
    // on save button

    if (isSuccess) {
        const editor = new EditorJS({
            holder: 'editorjs',
            tools: editorTools,
            data: blog?.data?.content,
            readOnly: true,
            onReady: () => {
                editorRef.current = editor;
            },
        });

        return (
            <>
                <div className='px-5 sm:px-9 pt-8'>
                    <div className='max-w-[680px] *:borde mx-auto space-y-5 '>

                        <div className="w-max theme-gray hover:underline flex gap-2 mb-2 text-sm font-medium  items-center cursor-pointer"
                            onClick={() => navigate(`/${blog.data.author.username}`)}>
                            <img className='rounded-full w-[25px] ' src="https://picsum.photos/40" alt='' />
                            <p className='font-details ' >{blog.data.author.username}</p>
                        </div>

                        <h1 className="text-xl sm:text-3xl md:text-4xl theme-text font-title font-bold mb-2 ">
                            {blog.data.title}
                        </h1>

                        <div className="theme-gray flex mt-3 items-center py-3 border-y-[1px] justify-between sm:pr-12   ">
                            <div className='flex items-center gap-1'>
                                <p className='font-details text-sm '> Posted at {moment(blog.data.createdAt).format('MMM D, YYYY')} </p>
                            </div>
                            <div className='flex items-center text-base sm:text-lg gap-7 '>
                                <PostActions post={blog} />
                                {/* {auth?._id === blog.data.author._id && <button onClick={() => { navigate('/post/edit/' + id) }}>edit</button>} */}
                            </div>
                        </div>

                        {/* <p className="text-sm sm:text-base theme-gray font-details">{blog.data.desc.slice(0, 70) + " ...Read more"}</p> */}

                        <div className=" select-none rounded-xl overflow-hidden theme-bg-gray  aspect-video flex justify-center items-center  ">
                            <img src={blog.data.photo}
                                className="object-cover w-full" />
                        </div>

                        <div id="editorjs"  ></div>

                        {/* <p className="text-base sm:text-lg text-justify theme-text font-body" >
                            <span className='leading-7 sm:leading-9'>
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cumque enim, animi similique sed qui officiis dolor exercitationem possimus ipsa totam! Non, alias accusantium quia inventore odio molestias aut dolorum dolore incidunt quam!
                            </span>
                        </p> */}
                    </div>
                </div>
                <Footer />
            </>
        )
    }
    // else {
    //     return <>
    //         <div className='w-fit select-none space-y-1 scale-[200%] mx-auto p-5 my-44 '>
    //             <h1 className='theme-gray font-bold font-title text-4xl tracking-widest mx-auto w-fit'>{error.response.status}</h1>
    //             <h1 className='theme-gray font-title mx-auto text-2xl w-fit'>{error.response.statusText}</h1>
    //         </div>
    //     </>
    // }
}

export default Post