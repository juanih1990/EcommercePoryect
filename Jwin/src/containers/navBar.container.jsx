import React, { useEffect } from 'react';

import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Logged_Out } from "../redux/actions/authActions"
import { useMutation } from '@tanstack/react-query';
import { logout } from '../api/sessionApi'
import NavBar from '../componentes/navBar.component';


function NavBarContainer() {
    const isLogged = useSelector(state => state.authReducer.isLogged)
    const dispatch = useDispatch()

    const logoutAccount = useMutation({
            mutationFn: logout,
            onSuccess: (data) => {
                dispatch(Logged_Out());
            }
    })

    const handleLogout = () => {
        logoutAccount.mutate()
    };

    return (
        <>
             <NavBar isLogged={isLogged} handleLogout={handleLogout} />
        </>)
}


export default NavBarContainer