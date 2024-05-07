import React from 'react'
import { Box, Container, Typography, TextField, Button, Link as MuyLink } from '@mui/material'
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';

const ReminderComponent = ({ onSubmit, errors, register, watch }) => {
    return (
        < Container maxWidth="sm" >
            <Box component="form" onSubmit={onSubmit}>
                <Box component="div" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography component="h2" sx={{ mt: 15 }} > < ForwardToInboxIcon sx={{ fontSize: '3rem', color: '#2196f3' }} /> </Typography>
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
                <Button sx={{ mt: 1.5, mb: 1.5 }} variant="contained" fullWidth type="submit">Enviar Link</Button>
              
            </Box>
        </Container >
    )

}
export default ReminderComponent