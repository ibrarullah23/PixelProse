import React, { useContext, useEffect, useState } from 'react'
import Menu from './Menu'

// Icons
import { FaBars, FaSearch, FaUser } from 'react-icons/fa'
import { MdClose, MdSunny } from "react-icons/md";
import { IoMdMoon } from "react-icons/io";
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/authContext';
import Dropdown from '../Dropdown';
import { RiEdit2Fill, RiSettingsFill  } from "react-icons/ri";
import { IoLogOut } from "react-icons/io5";


const Navbar = () => {

    const user = useContext(AuthContext);

    const navigate = useNavigate()
    const [prompt, setPrompt] = useState("")
    const [menu, setMenu] = useState(false)
    const [dark, setDark] = useState(localStorage.getItem('techlog-theme') || "dark");

    useEffect(() => {
        document.body.classList.add('theme-shift')
    }, []);

    useEffect(() => {
        document.documentElement.className = dark;
        localStorage.setItem('techlog-theme', dark)
    }, [dark]);


    const dir = useLocation();

    const handeltheme = () => {
        setDark(dark === 'light' ? 'dark' : 'light');
    }

    const handelSearch = () => navigate(prompt ? "/?search=" + prompt : navigate("/"))

    const isAuthPage = () => {
        return dir.pathname.match("/login") || dir.pathname.match("/register")
    }


    return (
        <>
            <div className=" theme-bg  z-50 sticky top-0 select-none theme-text flex items-center justify-between space-x-1 mx-auto max-w-[1000px] px-4 sm:px-10 py-4">
                <h1 className="text-xl sm:text-2xl font-extrabold font-title cursor-pointer" onClick={() => navigate('/')}>
                    {/* <div className='logo flex items-center gap-2 '> */}
                    TechLog
                    {/* </div> */}
                </h1>


                {!isAuthPage() &&
                    <div className={` flex text-xs sm:text-base font-details justify-center items-center space-x-0 theme-bg-gray theme-text rounded-full px-2 sm:px-4 py-1`}>
                        <p onClick={handelSearch} className="cursor-pointer"><FaSearch /></p>
                        <input
                            onChange={(e) => setPrompt(e.target.value)}
                            onKeyDown={(e) => { (e.key === 'Enter') && handelSearch() }}
                            className="theme-text theme-bg-gray outline-none px-3 w-[110px] sm:w-auto"
                            placeholder="Search a post"
                            type="text" />
                    </div>
                }

                <div onClick={handeltheme} className='cursor-pointer p-1 text-xl ' >
                    {dark === 'dark' ? <MdSunny className='animate-spin dd ' /> : <IoMdMoon className='animate-spin dd ' />}
                </div>


                {!isAuthPage() && <div>
                    <div className=" items-center  justify-center space-x-2 md:space-x-6 ">


                        {user ?
                            <Dropdown buttonElement={<div className={`w-max mr-2 gray hover:underline flex  gap-2 items-center font-medium  cursor-pointer`}
                            // onClick={() => setMenu(!menu)} 
                            >
                                <img className='rounded-full sm:w-[32px] w-[26px] ' src="https://picsum.photos/40" alt="" />
                                <p className='font-details hidden sm:block' >{user.username}</p>
                                {/* {menu && <Menu auth={user} />} */}
                            </div>}>

                                <Link to={"/" + user.username}><FaUser /> Profile</Link>
                                <Link to={"/write"}><RiEdit2Fill className='text-lg'/> Write</Link>
                                <Link to={"/settings"}><RiSettingsFill  className='text-base'/> Settings</Link>
                                <hr />
                                <Link to={"/logout"}><IoLogOut className='text-lg'/> Logout</Link>
                            </Dropdown>
                            :
                            <>
                                <div className='md:block hidden space-x-6'>
                                    <Link to={"#"} > About </Link>
                                    <Link to="/login">Login</Link>
                                    <Link to="/register">Register</Link>
                                    <Link to="/editor">editor</Link>
                                </div>
                            </>
                        }


                        {/* {user ?
                            <div onClick={() => setMenu(!menu)}>
                                <p className="cursor-pointer  relative">{menu ? <MdClose /> : <FaBars />}</p>
                                {menu && <Menu auth={user}/>}
                            </div>
                            : <h3><Link to="/register">Register</Link></h3>} */}
                    </div>

                    {!user &&
                        <div onClick={() => setMenu(!menu)} className="md:hidden  text-lg">
                            <p className="cursor-pointer relative ">{menu ? <MdClose /> : <FaBars />}</p>
                        </div>}

                    {menu && <Menu auth={user} />}

                </div>}

            </div>
        </>
    )
}

export default Navbar
