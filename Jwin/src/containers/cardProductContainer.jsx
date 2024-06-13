import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { registerUser } from "../api/sessionApi";
import { getProduct, deleteProduct } from '../api/productApi';
import { newCart, addToCart } from '../api/cartApi'
import { Container } from '@mui/material';
import CardProductComponent from '../componentes/cardProductComponent';
import Swal from "sweetalert2"

const CardProductContainer = () => {
  const { user } = useAuth0();
  const isAdmin = useSelector(state => state.isAdminReducer.isAdmin);
  const isLogged = useSelector(state => state.authReducer.isLogged)
  const [loadProduct, setLoadProduct] = useState([]);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [pid, setPid] = useState()

  const { isLoading, data, isError, error } = useQuery({
    queryKey: ['products'],
    queryFn: getProduct
  });

  const deleteProductMutate = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries('products')
    }
  })

  const handleDelete = (id) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProductMutate.mutate(id)
      }
    })
  }

  const handleUpdate = (id) => {
    navigate('/product/addProduct', { state: { id } });
  };

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
  const addToCartMutation = useMutation({
    mutationFn: ({ cid, pid }) => addToCart(cid, pid),
    onSuccess: (data) => {
      if (data && typeof data === 'string') {
        Swal.fire({

          icon: 'error',
          title: 'Error',
          text: data
        });
      }
    }
  })
  const createCartMutation = useMutation({
    mutationFn: newCart,
    onSuccess: (data) => {
      if (data && typeof data === 'string') {
        Swal.fire({

          icon: 'error',
          title: 'Error',
          text: data
        });
      } else {
        const cid = data.cart
        addToCartMutation.mutate({cid, pid})
        Swal.fire({
          icon: 'success',
          title: '¡Se agrego el producto a tu carrito de compras!',
          text: 'Para finalizar la compra, ve al icono del carrito en el panel superiror derecho'
        })
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

  const handleAddCart = (id) => {
    if (!isLogged) {
      Swal.fire({
        icon: 'error',
        title: 'Error de login ',
        text: "Gracias por elegirnos, inicia session y comienza a comprar ! "
      });
    } else {
      setPid(id)
      createCartMutation.mutate()
    }
  }


  useEffect(() => {
    if (!isLoading && data) {
      setLoadProduct(data.docs);
    }
  }, [data, isLoading]);

  useEffect(() => {
    if (user) {
      addUserMutation.mutate(user);
    }
  }, [user]);

  if (isLoading) {
    return <div>Cargando datos...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 15 }}>
      {loadProduct.length > 0 ? (
        <CardProductComponent
          products={loadProduct}
          isAdmin={isAdmin}
          handleDelete={handleDelete}
          handleUpdate={handleUpdate}
          handleAddCart={handleAddCart}
        />
      ) : (
        <div>No hay datos disponibles.</div>
      )}
    </Container>
  );
};

export default CardProductContainer;