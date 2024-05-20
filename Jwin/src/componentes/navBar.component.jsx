import React, { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BusinessIcon from '@mui/icons-material/Business';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import Tooltip from '@mui/material/Tooltip';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { Link } from 'react-router-dom';
import styles from './styles.module.css'
import { useAuth0 } from '@auth0/auth0-react'

function NavBar({ isLogged, isAdmin, handleLogout }) {
    const { isAuthenticated } = useAuth0()
    return (
        <>


            <AppBar position="static" sx={{ backgroundColor: '#20b2aa' }}>
                <Toolbar>
                    {/* Icono del negocio en la esquina superior izquierda */}
                    <IconButton color="inherit">
                        <BusinessIcon />
                    </IconButton>

                    {/* Elementos en la esquina superior derecha */}
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />
                    <IconButton color="inherit">
                        <Link to='/' className={styles.link}>
                            <Typography variant="h6" component="div" sx={{ color: '#FFFFFF' }}>
                                Inicio
                            </Typography>
                        </Link>
                    </IconButton>
                    <IconButton color="inherit">
                        <Link to='/contactanos' className={styles.link}>
                            <Typography variant="h6" component="div">
                                Contactanos
                            </Typography>
                        </Link>
                    </IconButton>
                    {!isAdmin ? (<Tooltip title="Carrito de compras">
                        <Link to='/cart' className={styles.link} >
                            <IconButton color="inherit">
                                <ShoppingCartIcon />
                            </IconButton>
                        </Link>
                    </Tooltip>
                    ) : (<Tooltip title="Agregar Productos">
                        <Link to='/product/addProduct' className={styles.link} >
                            <IconButton color="inherit">
                                <AddBusinessIcon />
                            </IconButton>
                        </Link>
                    </Tooltip>)}
                    {isLogged || isAuthenticated ? (

                        <Tooltip title="Logout">
                            <Link to='/logout' className={styles.link}>
                                <IconButton color="inherit" onClick={handleLogout}>
                                    <LogoutIcon />
                                </IconButton>
                            </Link>
                        </Tooltip>
                    ) : (
                        <Tooltip title="Login">
                            <Link to='/session' className={styles.link}>
                                <IconButton color="inherit" >
                                    <AccountCircleIcon />
                                </IconButton>
                            </Link>
                        </Tooltip>
                    )}
                </Toolbar>
            </AppBar>


        </>)
}


export default NavBar;

