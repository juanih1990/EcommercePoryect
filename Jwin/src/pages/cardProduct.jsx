import React, { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { registerUser } from "../api/sessionApi"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProduct } from '../api/productApi';
import { deleteProduct } from '../api/productApi';
import { useState } from 'react'
import { Card, CardContent, CardMedia, Container, Typography, Grid, Box, Button } from '@mui/material'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const CardProduct = () => {
  const { user } = useAuth0()
  const isAdmin = useSelector(state => state.isAdminReducer.isAdmin)
  const [loadProduct, isLoadProduct] = useState()
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { isLoading, data, isError, error } = useQuery(
    {
      queryKey: ['products'],
      queryFn: getProduct
    }
  )

  const deleteProductMutate = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries('products')
    }
  })
  const handleDelete = (id) => {
    deleteProductMutate.mutate(id);
  };


  const handleUpdate = (id) => {
    navigate('/product/addProduct', { state: { id } })
  }

  const addUserMutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      if (data && typeof data === 'string') {
        Swal.fire({

          icon: 'error',
          title: 'Error',
          text: data
        });
      } else {
        Swal.fire({
          icon: 'success',
          title: '¡Registro exitoso!',
          text: 'Gracias por unirte a jwin.'
        }).then(() => {
          navigate('/');
        });
      }
    },
    onError: (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message
      });
    }
  })



  useEffect(() => {
    if (!isLoading && data) {
      isLoadProduct(data.docs);
    }
  }, [data, isLoading])

  useEffect(() => {
    if (user && user != undefined) {
      addUserMutation.mutate(user)
    }
  }, [user])

  if (isLoading) {
    return <div>Cargando datos...</div>;
  }

  if (isError) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      < Container maxWidth="lg" sx={{ mt: 15 }} >
        {loadProduct && loadProduct.length > 0 ? (

          <Grid container spacing={6} justifyContent="center">
            {loadProduct.map((producto) => (
              <Grid item key={producto.code} xs={12} sm={6} md={3}>
                <Card sx={{ maxWidth: 250 }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={producto.thumbnail}
                    alt={producto.title}
                    sx={{ objectFit: 'contain' }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {producto.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ m: 2 }}>
                      {producto.description}
                    </Typography>
                    <Box component='div' sx={{ justifyContent: 'space-between', display: 'flex' }}>
                      <Typography variant="body2" color="text.secondary">

                      </Typography>
                      <Typography variant="body2" color="text.secondary" fontSize={18} >
                        <Box component='span'>Precio: $</Box>
                        <Box component='span' fontWeight='fontWeightBold'> {producto.price} </Box>

                      </Typography>
                    </Box>
                    {!isAdmin ? (
                      <Button variant='contained' fullWidth sx={{ mt: 2, background: '#148F77' }} > Agregar al carrito </Button>
                    ) :
                      (
                        <Box sx={{ justifyContent: 'space-between', display: 'flex' }}>
                          <Button variant='contained' color="error" sx={{ mt: 2 }} onClick={() => handleDelete(producto._id)}>Borrar </Button>
                          <Button variant='contained' color="primary" sx={{ mt: 2 }} onClick={() => handleUpdate(producto._id)} >Modificar </Button>
                        </Box>
                      )
                    }
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <div>No hay datos disponibles.</div>
        )
        }
      </Container >
    </div>

  )
}

export default CardProduct
