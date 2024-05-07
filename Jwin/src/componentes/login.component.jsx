import React from 'react'
import { Box, Container, Typography, TextField, Button, Link as MuyLink } from '@mui/material'
import { Link } from 'react-router-dom'
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined'

const LoginComponent = ({ onSubmit, errors, register, watch }) => {
    return (
        < Container maxWidth="sm" >
            <Box component="form" onSubmit={onSubmit}>
                <Box component="div" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography component="h2" sx={{ mt: 15 }} > < GroupOutlinedIcon sx={{ fontSize: '3rem', color: '#2196f3' }} /> </Typography>
                </Box>

                <TextField id="outlined-basic" label="Correo" variant="outlined" fullWidth sx={{ mt: 2.5, mb: 2.5 }}  {...register('Correo', {
                    required: {
                        value: true,
                        message: 'El correo es requerido'
                    },
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "El correo no es válido"
                    }
                })} />
                {
                    errors.Correo && <Typography component='span' sx={{ color: 'tomato', fontSize: 'sm' }}>{errors.Correo.message}</Typography>
                }


                <TextField id="outlined-basic" label="Contraseña" variant="outlined" sx={{ mt: 2.5, mb: 2.5 }} fullWidth  {...register('Contraseña', {
                    required: {
                        value: true,
                        message: 'La Contraseña es requerida'
                    },
                    minLength: {
                        value: 8,
                        message: 'La Contraseña debe tener al menos 8 caracteres'
                    }
                })} />
                {
                    errors.Contraseña && <Typography component='span' sx={{ color: 'tomato', fontSize: 'sm' }}>{errors.Contraseña.message}</Typography>
                }

                <Button sx={{ mt: 1.5, mb: 1.5 }} variant="contained" fullWidth type="submit">Login</Button>
                <Box component="div" sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, mb: 1 }}>
                    <Link to="/reminder" >
                        <Typography component='span' sx={{ mt: 1, mb: 1, cursor: 'pointer', color: 'blue', textDecoration: 'none' }}>olvide mi contraseña</Typography>
                    </Link>
                    <Link to="/register" >
                        <Typography component='span' sx={{ mt: 1, mb: 1, cursor: 'pointer', color: 'blue', textDecoration: 'none' }}>no tienes cuenta? registrate aqui</Typography>
                    </Link>
                </Box>
            </Box>
        </Container >
    )

}
export default LoginComponent