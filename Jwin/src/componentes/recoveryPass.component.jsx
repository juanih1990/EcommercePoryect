import React from 'react'
import { Box, Container, Typography, TextField, Button, Link as MuyLink } from '@mui/material'
import LockClockIcon from '@mui/icons-material/LockClock';

const RecoveryPassComponent = ({ onSubmit, errors, register, watch }) => {
    return (
        < Container maxWidth="sm" >
            <Box component="form" onSubmit={onSubmit}>
                <Box component="div" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography component="h2" sx={{ mt: 15 }} > < LockClockIcon sx={{ fontSize: '3rem', color: '#2196f3' }} /> </Typography>
                </Box>
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
                <Button sx={{ mt: 1.5, mb: 1.5 }} variant="contained" fullWidth type="submit">Cambiar Contraseña</Button>
              
            </Box>
        </Container >
    )

}
export default RecoveryPassComponent