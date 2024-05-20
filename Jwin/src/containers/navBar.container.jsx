import React, { useEffect } from 'react';

import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Logged_Out } from "../redux/actions/authActions"
import { not_isAdmin } from '../redux/actions/isAdminAction'
import { useMutation } from '@tanstack/react-query';
import { logout as Logout } from '../api/sessionApi'
import NavBar from '../componentes/navBar.component';
import { useAuth0 } from '@auth0/auth0-react'

function NavBarContainer() {
    const isLogged = useSelector(state => state.authReducer.isLogged)
    const isAdmin = useSelector(state => state.isAdminReducer.isAdmin)
    const { logout, isAuthenticated } = useAuth0()
    const dispatch = useDispatch()

    const logoutAccount = useMutation({
        mutationFn: Logout,
        onSuccess: (data) => {
            dispatch(not_isAdmin())
            dispatch(Logged_Out());
            navigate('/session')
        }
    })

    const handleLogout = () => {
        if (isAuthenticated) {
            logout({ returnTo: '/session' })
        }
        else {
            logoutAccount.mutate()
        }

    };

    return (
        <>
            <NavBar isLogged={isLogged} isAdmin={isAdmin} handleLogout={handleLogout} />
        </>)
}


export default NavBarContainer