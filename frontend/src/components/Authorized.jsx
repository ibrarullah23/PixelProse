import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../context/authContext';
import { Outlet, useNavigate } from 'react-router-dom';

export default function Authorized() { 

    const auth = useContext(AuthContext);
    const navigate = useNavigate()

    return (
        <>
            {auth ?
                <Outlet /> : 
                navigate("/") 
            }
        </>
    )
}
