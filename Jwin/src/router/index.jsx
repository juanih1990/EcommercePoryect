import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import LayoutPage from '../layout/layoutPage'
import NotFound from '../pages/notFound'
import CardProduct from '../pages/cardProduct'
import Contactanos from '../pages/contactanos'
import Cart from '../pages/cart'
import Login from '../pages/login'
import Register from '../pages/register'
import Reminder from '../pages/reminder'
import RecoveryPass from '../pages/recoveryPass'
import AddProduct from '../pages/addProduct'

export const router = createBrowserRouter([
    {
        path: "/",
        element: <LayoutPage/>,
        errorElement: <NotFound/>,
        children:[
            {
                index: true,
                element: <CardProduct/>            
            },
            {
                path: '/contactanos',
                element: <Contactanos/>            
            },
            {
                path: '/cart',
                element: <Cart/>            
            },
            {
                path: '/session',
                element: <Login />            
            },
            {
                path: '/register',
                element: <Register/>
            },
            {
                path: '/logout',
                element: <Login/>
            },
            {
                path: '/reminder',
                element: <Reminder/>
            },
            {
                path: '/recoveryPass',
                element: <RecoveryPass/>
            },
            {
                path: '/product/addProduct',
                element: <AddProduct/>
            }
        ]
    }
])
