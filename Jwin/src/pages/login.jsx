import React from 'react'
import { Box, Container, Typography, TextField, Button, Link as MuyLink } from '@mui/material'
import { Link } from 'react-router-dom'
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined'

const Login = () => {
    return (

        <Container maxWidth="sm" >
            <Box component="form"  >
                <Box component="div" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography component="h2" sx={{ mt: 15 }} > < GroupOutlinedIcon sx={{ fontSize: '3rem', color: '#2196f3' }} /> </Typography>
                </Box>
                <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth sx={{ mt: 2.5, mb: 2.5 }} />
                <TextField id="outlined-basic" label="password" variant="outlined" fullWidth sx={{ mt: 2.5, mb: 2.5 }} />
                <Button sx={{ mt: 1.5, mb: 1.5 }} variant="contained" fullWidth>Login</Button>
                <Box component="div" sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, mb: 1 }}>
                    <Link to="/register" ><MuyLink sx={{ mt: 1, mb: 1, cursor: 'pointer' }}>olvide mi contraseña</MuyLink></Link>
                    <Link to="/register" > <MuyLink sx={{ mt: 1, mb: 1, cursor: 'pointer' }}>no tienes cuenta? registrate aqui</MuyLink></Link>
                </Box>
            </Box>
        </Container>


    )
}

export default Login
