import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {

    // if(localStorage.getItem('techlog-theme')){
    //     document.documentElement.classList.add('dark');
    // }

    return (
        <>
            <div>
                <Navbar />
                <Outlet />
            </div>
        </>
    )
}

export default Layout
