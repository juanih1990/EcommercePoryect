import { Box, Container, Typography, TextField, Button } from '@mui/material'
import React, { useEffect } from 'react'
import { useState } from 'react';

const AgregarProductoComponent = ({ onSubmit, errors, register, watch, setActionType, productId }) => {

    return (
        <Container maxWidth='sm'>
            <Box component='form' onSubmit={onSubmit}>
                <Box component='div' sx={{ display: 'Flex', justifyContent: 'center', mt: 5 }}>
                    <Typography sx={{ fontFamily: 'Lilita One, sans-serif', fontWeight: 400, fontStyle: 'normal', fontSize: '2rem' }}>Nuevo Producto</Typography>
                </Box>

                <TextField type='text' variant="outlined" label={watch('Producto') ? "" : "Producto"} sx={{ mt: 2.5, mb: 2.5 }} fullWidth {...register('Producto', {
                    required: {
                        value: true,
                        message: 'El Producto es requerido'
                    },
                    minLength: {
                        value: 2,
                        message: 'El Producto debe tener por lo menos dos caracteres'
                    }
                })} />

                {
                    errors.Producto && <Typography component='span' sx={{ color: 'tomato', fontSize: 'sm' }} >{errors.Producto.message}</Typography>
                }
                <TextField type='text' variant="outlined" label={watch('Descripcion') ? "" : "Descripcion"} sx={{ mt: 2.5, mb: 2.5 }} fullWidth {...register('Descripcion', {
                    required: {
                        value: true,
                        message: 'La Descripcion es requerida'
                    },
                    minLength: {
                        value: 3,
                        message: 'La Descripcion  debe tener como minimo 3 caracteres'
                    }
                })} />
                {
                    errors.Descripcion && <Typography component='span' sx={{ color: 'tomato', fontSize: 'sm' }} >{errors.Descripcion.message}</Typography>
                }
                <TextField
                    type='text' // Cambiado de 'number' a 'text'
                    inputMode="numeric" // Añadido el atributo inputMode
                    variant="outlined"
                    label={watch('Precio') ? "" : "Precio"}
                    sx={{ mt: 2.5, mb: 2.5 }}
                    fullWidth
                    {...register('Precio', {
                        required: {
                            value: true,
                            message: 'El Precio es requerido'
                        },
                        pattern: {
                            value: /^\d*\.?\d*$/, // Patrón actualizado para permitir decimales
                            message: "El Precio no es válido"
                        }
                    })}
                />
                {
                    errors.Precio && <Typography component='span' sx={{ color: 'tomato', fontSize: 'sm' }} >{errors.Precio.message}</Typography>
                }
                <TextField
                    type='number'
                    variant="outlined"
                    label={watch('Stock') ? "" : "Stock"}
                    sx={{ mt: 2.5, mb: 2.5 }}
                    fullWidth {...register('Stock', {
                        required: {
                            value: true,
                            message: 'El Stock es requerido'
                        },
                        pattern: {
                            value: /^\d*\.?\d*$/,
                            message: "El Stock no es válido"
                        },
                        minLength: {
                            value: 1,
                            message: 'La cantidad minima requerida es de al menos un producto'
                        }
                    })} />
                {
                    errors.Stock && <Typography component='span' sx={{ color: 'tomato', fontSize: 'sm' }} >{errors.Stock.message}</Typography>
                }
                <TextField type='text' variant="outlined" label={watch('Categoria') ? "" : "Categoria"} sx={{ mt: 2.5, mb: 2.5 }} fullWidth {...register('Categoria', {
                    required: {
                        value: true,
                        message: 'La Categoria es requerida'
                    },
                    maxLength: {
                        value: 30,
                        message: 'La Categoria debe tener como maximo 30 caracteres'
                    },
                    minLength: {
                        value: 3,
                        message: 'La Categoria  debe tener como minimo 3 caracteres'
                    }
                })} />
                {
                    errors.Categoria && <Typography component='span' sx={{ color: 'tomato', fontSize: 'sm' }} >{errors.Categoria.message}</Typography>
                }
                <TextField type='text' variant="outlined" label={watch('Codigo') ? "" : "Codigo"} sx={{ mt: 2.5, mb: 2.5 }} fullWidth {...register('Codigo', {
                    required: {
                        value: true,
                        message: 'El Codigo es requerida'
                    },
                    maxLength: {
                        value: 30,
                        message: 'El Codigo  debe tener como maximo 30 caracteres'
                    },
                    minLength: {
                        value: 3,
                        message: 'El Codigo  debe tener como minimo 3 caracteres'
                    }
                })} />
                {
                    errors.Codigo && <Typography component='span' sx={{ color: 'tomato', fontSize: 'sm' }} >{errors.Codigo.message}</Typography>
                }
                <TextField type='text' variant="outlined" label={watch('thumbnail') ? "" : "thumbnail"} sx={{ mt: 2.5, mb: 2.5 }} fullWidth {...register('thumbnail', {
                    required: {
                        value: true,
                        message: 'La imagen es requerida'
                    },
                    minLength: {
                        value: 7,
                        message: 'La imagen debe tener como minimo 7 caracteres'
                    }
                })} />
                {
                    errors.thumbnail && <Typography component='span' sx={{ color: 'tomato', fontSize: 'sm' }} >{errors.thumbnail.message}</Typography>
                }
                <Button sx={{ mt: 1.5, mb: 1.5 }} variant="contained" fullWidth type="submit" onClick={() => setActionType(productId ? 'guardar' : 'agregar')}> {productId ? "Guardar Cambios" : "Agregar Producto"}</Button>
            </Box>
        </Container>
    )
}

export default AgregarProductoComponent
