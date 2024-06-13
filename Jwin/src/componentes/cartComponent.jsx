import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, IconButton, Button, Box
} from '@mui/material';
import { Add, Remove, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom'
import Swal from "sweetalert2"


const CartComponent = ({ handleIncrease, handleDecrease, handleRemove, handlePurchase, cartItems = [], isLoading, isLogged }) => {
  const navigate = useNavigate();
  const [redirect, setRedirect] = useState(false)

  useEffect(() => {
    if (!isLogged) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Para continuar, inicia sesión.',
        confirmButtonText: 'Aceptar'
      }).then(() => {
        setRedirect(true)
      })
    }
  }, [])
  useEffect(() => {
    if (redirect) {
      navigate('/session');
    }
  }, [redirect])
  return (
    <Box>
      {isLoading ? (
        <div>Cargando...</div>
      ) : (
        <>
          {!Array.isArray(cartItems) && cartItems.length <= 0 ? (
            <div>El carrito está vacío</div>
          ) : (
            <TableContainer component={Paper} sx={{ mt: 5 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Nombre del Producto</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Cantidad</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Monto en Pesos</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  { Array.isArray(cartItems) && cartItems?.map((item) =>
                    item.products.map((product) => (
                      <TableRow key={product.pid._id}>
                        <TableCell>{product.pid.title}</TableCell>
                        <TableCell>
                          <IconButton color="warning" onClick={() => handleDecrease(product._id)} disabled={product.quantity <= 1}>
                            <Remove />
                          </IconButton>
                          {product.quantity}
                          <IconButton color="success" onClick={() => handleIncrease(product._id)}>
                            <Add />
                          </IconButton>
                        </TableCell>
                        <TableCell>{product.pid.price * product.quantity}</TableCell>
                        <TableCell>
                          <IconButton color="warning" onClick={() => handleRemove(product.pid._id)}>
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          <Box display="flex" justifyContent="center" marginTop={2}>
            <Button variant="contained" color="primary" onClick={handlePurchase}>
              Comprar
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default CartComponent;
