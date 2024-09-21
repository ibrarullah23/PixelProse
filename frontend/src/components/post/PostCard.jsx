import moment from 'moment'
import React from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import PostActions from './PostActions'
import Starsvg from '../../assets/star.svg'

const PostCard = ({ post }) => {

  const navigate = useNavigate();

  const {username} = useParams();

  return (
  <div className='max-w-[430px] sm:max-w-[640px] select-none mx-auto'>
    <div className=" sm:my-8 my-5" >

      <div className=" flex  gap-4 sm:gap-8 justify-between ">

        <div className="flex flex-col w-fit">

          <div className={`${username ? "" : "" } w-max theme-gray hover:underline flex gap-2 mb-2 text-xs sm:text-sm font-medium  items-center cursor-pointer`}
            onClick={() => username ?? navigate(`/${post.username}`) } >
            <img className='rounded-full sm:w-[20px] w-[16px]' src="https://picsum.photos/40" alt="" />
            <p className='font-details ' >{post.username}</p>
          </div>

          <Link to={`/post/${post._id}`}>
            <h1 className="text-base sm:text-xl md:text-2xl leading-5 theme-text font-title font-bold mb-2 ">
              {post.title}
            </h1>
            <p className="text-xs md:text-base theme-gray font-details">{post.desc.slice(0, 70) + " ...Read more"}</p>
          </Link>
        </div>


        <div>
          <div className=" w-max select-none h-full flex justify-center items-center  ">
            <Link to={`/post/${post._id}`}>
              <img src={post.photo} alt="feature image" className="rounded-md w-[96px] h-[54px]  sm:w-[192px] sm:h-[108px]  object-cover" />
            </Link>
          </div>
        </div>

      </div>

      <div className="theme-gray flex sm:mt-3 mt-2 space-x-2 items-center justify-between sm:mr-[220px] ">
        <div className='flex items-center gap-1'>
          <img src={Starsvg} alt="" />
          <p className='font-details sm:text-sm text-xs '> {moment(post.createdAt).format('MMM D, YYYY')} </p>
        </div>
        <div className='flex items-center text-base sm:text-lg gap-7 '>
          <PostActions post={post}/>
        </div>
      </div>

    </div>
    <hr className='theme-bg theme-shift' />
  </div>
  )
}

export default PostCard
