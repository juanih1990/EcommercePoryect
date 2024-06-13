import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, Box, Button } from '@mui/material';

const CardProductComponent = ({ products, isAdmin, handleDelete, handleUpdate , handleAddCart }) => {
  return (
    <Grid container spacing={6} justifyContent="center">
      {products.map((producto) => (
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
                <Typography variant="body2" color="text.secondary" fontSize={18}>
                  <Box component='span'>Precio: $</Box>
                  <Box component='span' fontWeight='fontWeightBold'> {producto.price} </Box>
                </Typography>
              </Box>
              {!isAdmin ? (
                <Button variant='contained' fullWidth sx={{ mt: 2, background: '#148F77' }} onClick={() => handleAddCart(producto._id)}> Agregar al carrito </Button>
              ) : (
                <Box sx={{ justifyContent: 'space-between', display: 'flex' }}>
                  <Button variant='contained' color="error" sx={{ mt: 2 }} onClick={() => handleDelete(producto._id)}>Borrar</Button>
                  <Button variant='contained' color="primary" sx={{ mt: 2 }} onClick={() => handleUpdate(producto._id)}>Modificar</Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default CardProductComponent