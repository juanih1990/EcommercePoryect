import { Box, Button, Container, TextField, Typography } from '@mui/material'
import React from 'react'

const RegisterForm = ({ onSubmit, errors, register, watch }) => {
    return (
        <Container maxWidth="sm">
            <Box component='form' onSubmit={onSubmit}>

                <Box component='div' sx={{ display: 'Flex', justifyContent: 'center', mt: 5 }}>
                    <Typography sx={{ fontFamily: 'Lilita One, sans-serif', fontWeight: 400, fontStyle: 'normal', fontSize: '2rem' }}>Bienvenido! crea tu cuenta</Typography>
                </Box>

                <TextField id="outlined-basic" type='text' variant="outlined" label="Nombre" sx={{ mt: 2.5, mb: 2.5 }} fullWidth {...register('Nombre', {
                    required: {
                        value: true,
                        message: 'El Nombre es requerido'
                    },
                    minLength: {
                        value: 2,
                        message: 'El Nombre debe tener por lo menos dos caracteres'
                    }
                })} />
                {
                    errors.Nombre && <Typography component='span' sx={{ color: 'tomato', fontSize: 'sm' }} >{errors.Nombre.message}</Typography>
                }


                <TextField id="outlined-basic" variant="outlined" label="Apellido" sx={{ mt: 2.5, mb: 2.5 }} fullWidth  {...register('Apellido', {
                    required: {
                        value: true,
                        message: 'El Apellido es requerido'
                    },
                    minLength: {
                        value: 2,
                        message: 'El Apellido debe tener por lo menos dos caracteres'
                    }
                })} />
                {
                    errors.Apellido && <Typography component='span' sx={{ color: 'tomato', fontSize: 'sm' }}> {errors.Apellido.message} </Typography>
                }


                <TextField id="outlined-basic" variant="outlined" label="Correo" sx={{ mt: 2.5, mb: 2.5 }} fullWidth  {...register('Correo', {
                    required: {
                        value: true,
                        message: 'El Correo es requerido'
                    },
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "El correo no es válido"
                    }
                })} />
                {
                    errors.Correo && <Typography component='span' sx={{ color: 'tomato', fontSize: 'sm' }}>{errors.Correo.message}</Typography>
                }

                <TextField id="outlined-basic" variant="outlined" type='date' sx={{ mt: 2.5, mb: 2.5 }} fullWidth  {...register('Edad', {
                    required: {
                        value: true,
                        message: 'La Edad es requerida'
                    },
                    minLength:{
                        value: 10,
                        message: "El formato de la fecha no es valida"
                    },
                    maxLength: {
                        value: 10,
                        message: "El formato de la fecha no es valida"
                    },
                    validate : (value) =>{
                        const fechaNacimiento = new Date(value)
                        const fechaActual = new Date()
                        const edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear()
                        if (edad > 0 && edad < 110) {
                            return true
                        }
                        else {
                            return 'La fecha ingresada no es valida'
                        }
                    }
                })} />
                {
                    errors.Edad && <Typography component='span' sx={{ color: 'tomato', fontSize: 'sm' }}>{errors.Edad.message}</Typography>
                }

                <TextField id="outlined-basic" variant="outlined" label="Contraseña" sx={{ mt: 2.5, mb: 2.5 }} fullWidth  {...register('Contraseña', {
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

                <TextField id="outlined-basic" variant="outlined" label="Confirmar Contraseña" sx={{ mt: 2.5, mb: 2.5 }} fullWidth  {...register('ConfirmContraseña', {
                    required: {
                        value: true,
                        message: 'Debes confirmar la contraseña'
                    },
                    validate: (value) => {
                        if (value === watch('Contraseña')) {
                            return true
                        }
                        else {
                            return 'Las contraseñas no coinciden'
                        }
                    }
                })} />
                {
                    errors.ConfirmContraseña && <Typography component='span' sx={{ color: 'tomato', fontSize: 'sm' }}>{errors.ConfirmContraseña.message}</Typography>
                }

                <Button sx={{ mt: 1.5, mb: 1.5 }} variant="contained" fullWidth type="submit">Registrar</Button>
            </Box>
        </Container>
    )
}

export default RegisterForm
