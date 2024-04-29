import { Box, Button, Container, TextField, Typography } from '@mui/material'
import React from 'react'

const Register = () => {
    return (
        <Container maxWidth="sm">
            <Box>
                <Box component='div' sx={{ display: 'Flex', justifyContent: 'center', mt: 5 }}>
                    <Typography sx={{ fontFamily: 'Lilita One, sans-serif', fontWeight: 400, fontStyle: 'normal' , fontSize: '2rem' }}>Bienvenido! crea tu cuenta</Typography>
                </Box>
                <TextField id="outlined-basic" variant="outlined" label="Nombre" sx={{ mt: 2.5, mb: 2.5 }} fullWidth />
                <TextField id="outlined-basic" variant="outlined" label="Apellido" sx={{ mt: 2.5, mb: 2.5 }} fullWidth />
                <TextField id="outlined-basic" variant="outlined" label="Email" sx={{ mt: 2.5, mb: 2.5 }} fullWidth />
                <TextField id="outlined-basic" variant="outlined" label="Edad" sx={{ mt: 2.5, mb: 2.5 }} fullWidth />
                <TextField id="outlined-basic" variant="outlined" label="Contraseña" sx={{ mt: 2.5, mb: 2.5 }} fullWidth />
                <Button sx={{ mt: 1.5, mb: 1.5 }} variant="contained" fullWidth>Registrar</Button>
            </Box>
        </Container>
    )
}

export default Register
