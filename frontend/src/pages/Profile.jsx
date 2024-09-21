import React, { useContext, useState } from 'react'
import Posts from '../components/post/Posts'
import { Link, useParams } from 'react-router-dom'
import Footer from './../components/Layout/Footer';
import { BsGithub, BsLinkedin } from 'react-icons/bs';
import { IoMdMail } from 'react-icons/io';
import { FaLinkedin } from 'react-icons/fa6';
import { AuthContext } from '../context/authContext';
import { useQuery } from 'react-query';
import { userProfileFn } from '../helper/api';
import Loader from '../components/Loader';

const Profile = () => {


  const auth = useContext(AuthContext)  

 
  console.log('auth in profile ', auth);

  const { username: paramUser } = useParams();

  const { data, error, isLoading } = useQuery(
    ['user', paramUser],//key
    () => userProfileFn(paramUser), // get user profile
    // {
    //   enabled: !!auth // query will run when
    // }
  );

  const { username = "", email = "", bio = "", profileImage = "", role = "admin" } = data || {}
  const { linkedin = "", github = "" } = data?.socialLinks || {}

  if (isLoading) {
    return <>
      <div className='w-fit scale-[200%] mx-auto p-5 my-44 '>
        <Loader />
      </div>
    </>
  }

  if (error) {
    console.log("error", error);
    return <>
      <div className='w-fit select-none space-y-1 lg:scale-[200%] sm:scale-[130%] mx-auto p-5 my-44 '>
        <h1 className='theme-gray font-bold font-title text-4xl tracking-widest mx-auto w-fit'>{error.response.status}</h1>
        <h1 className='theme-gray font-title mx-auto text-2xl w-fit'>{error.response.statusText}</h1>
      </div>
    </>
  }

  // const user = {
  //   username: "johndoe",
  //   email: "johndoe@example.com",
  //   bio: "Software developer with a passion for open-source projects.",
  //   profileImage: "https://i.pravatar.cc/150?img=1",
  //   linkedin: "https://linkedin.com/in/johndoe",
  //   github: "https://github.com/johndoe",
  //   createdAt: "2024-07-29T14:48:00.000Z"
  // }

  return (
    <>
      <div className='mt-4 w-fit lg:flex gap-5 min-h-[80svh] px-6 mx-auto '>

        <div className='order-1 lg:border-l space-y-6 theme-bg theme-shift  lg:p-5 lg:w-[350px] '>
          <div>
            <img className=' rounded-full m-1 w-16 h-16 ' src="https://picsum.photos/40" alt="" />
            <p className='theme-text font-details font-bold first-letter:uppercase text-2xl ' >{username}  </p>
            <p className='theme-text font-details text-xs sm:text-sm  ' >{bio ?? "  "} </p>
          </div>

          <div className='w-fit flex self-center space-x-6 '>
            {(paramUser === auth?.username) &&
              // <Link className='bg-[#f01010] font-semibold text-slate-100  px-2 py-1 rounded ' > Follow </Link>
              <Link className='bg-gray-200 dark:bg-zinc-700 theme-shift dark:text-slate-100  px-2 py-1 rounded ' > Edit Profile </Link>
            }
            <Link className='theme-bg-gray  theme-shift dark:text-slate-200  px-2 py-1 rounded ' > Share </Link>

            <div className='lg:hidden w-fit self-center text-xl *:p-1 flex gap-6 '>
              {linkedin && <Link to={"https://www.linkedin.com/in/" + linkedin}><FaLinkedin /></Link>}
              {github && <Link to={github}><BsGithub /></Link>}
              {email && <Link to={"mailto:" + email}><IoMdMail /></Link>}
            </div>

          </div>

          <div className='lg:block hidden w-fit self-center font-details *:flex *:items-center *:gap-2 space-y-2 '>
            {/* {<Link to={"https://www.linkedin.com/in/" + linkedin}><FaLinkedin className='text-xl' />Linkedin/{linkedin}</Link>} */}
            {linkedin && <Link to={"https://www.linkedin.com/in/" + linkedin}><FaLinkedin className='text-xl' />Linkedin/{linkedin}</Link>}
            {github && <Link to={github}><BsGithub className='text-xl' />Github/{github}</Link>}
            {email && <Link to={"mailto:" + email}><IoMdMail className='text-xl' />{email}</Link>}
          </div>


        </div>

        <div className='max-w-[430px] sm:max-w-[600px] sm:min-w-[610px]'>
          <h1 className='lg:block hidden font-details my-10 theme-text text-3xl font-bold'>Blogs</h1>
          <hr className='theme-bg w-full theme-shift' />
          <div><Posts /></div>
        </div>

      </div>
      <Footer />
    </>
  )
}

export default Profile
