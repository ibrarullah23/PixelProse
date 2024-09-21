import React from 'react'
import moment from 'moment'
import { useNavigate, useParams } from 'react-router-dom';
import PostActions from '../components/post/PostActions';
import Footer from './../components/Layout/Footer';

const EditPost = () => {
    const { id } = useParams();
    const navigate = useNavigate()


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
    const filteredData = data.find(item => item._id === id)
    //
    //postId - fetch post data - load in the editor

    // auth = writer (true) then enable some features 
    // edit button - Title editable=true  and editorjs readOnly=!true

    // actions like edit image button on the top right 
    // save Cancel and restore button to restore the previous state
    // on save button

    return (
        <>
            <div className='px-7 pt-8'>
                <div className='max-w-[600px] *:borde mx-auto space-y-5 '>

                    {/* <div className="w-max theme-gray hover:underline flex gap-2 mb-2 text-sm font-medium  items-center cursor-pointer"
                        onClick={() => navigate(`/user/${filteredData.username}`)}>
                        <img className='rounded-full sm:w-[20px] w-[16px]' src="https://picsum.photos/40" alt='' />
                        <p className='font-details ' >{filteredData.username}</p>
                    </div> */}

                    <h1 contentEditable suppressContentEditableWarning className="text-xl sm:text-3xl theme-text font-title font-bold mb-2 ">
                        {filteredData.title}
                    </h1>


                    <p className="text-xs md:text-base theme-gray font-details">{filteredData.desc.slice(0, 70) + " ...Read more"}</p>

                    {/* <div className="theme-gray flex mt-3 items-center py-3 border-y-[1px] justify-between sm:pr-12   ">
                        <div className='flex items-center gap-1'>
                            <p className='font-details text-sm '> Posted at {moment(filteredData.createdAt).format('MMM D, YYYY')} </p>
                        </div>
                        <div className='flex items-center text-base sm:text-lg gap-7 '>
                            <PostActions post={filteredData} />
                        </div>
                    </div> */}

                    <div className=" select-none rounded-xl overflow-hidden theme-bg-gray  aspect-video flex justify-center items-center  ">
                        <img src={filteredData.photo}
                            className="object-cover w-full" />
                    </div>

                </div>
            </div>
        </>
    )
}

export default EditPost
