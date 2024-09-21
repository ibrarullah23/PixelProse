import React, { useContext } from 'react'
import { AuthContext } from '../context/authContext';
import { Outlet, useNavigate } from 'react-router-dom';

export default function UnAuthorized() {
    const auth = useContext(AuthContext);
    const navigate = useNavigate()
    
    return (
        <>
            {auth ?
                navigate("/") :
                <Outlet />
            }
        </>
    )
}
