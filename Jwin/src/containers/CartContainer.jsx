import React, { useState, useEffect } from 'react'
import CartComponent from '../componentes/cartComponent'
import { getCart, updateQuantity , deleteCart } from '../api/cartApi'
import { useMutation, useQuery , useQueryClient} from '@tanstack/react-query'
import { useSelector } from 'react-redux'

const CartContainer = () => {
    const [cartItems, setCartItems] = useState([])
    const isLogged = useSelector(state => state.authReducer.isLogged)
    const queryClient = useQueryClient();

    const { isLoading, data, isError, error } = useQuery({
        queryKey: ['carts'],
        queryFn: getCart
    })

    const deleteCartMutate = useMutation({
        mutationFn:({cid,pid}) => deleteCart({cid,pid}),
        onSuccess: () => {
          queryClient.invalidateQueries('carts')
        }
      })

    const updateQuantityMutation = useMutation({
        mutationFn: ({ cid, pid, quantity }) => updateQuantity({ cid, pid, quantity }),
        onSuccess: (data, variables) => {
            if (data && typeof data === 'string') {
                Swal.fire({

                    icon: 'error',
                    title: 'Error',
                    text: data
                });
            }
            else {
                setCartItems(prevCartItems =>
                    prevCartItems.map(item =>
                        item._id === variables.cid ? { // Si el item actual es el carrito que se está actualizando
                            ...item,
                            products: item.products.map(product =>
                                product.pid._id === variables.pid ? { // Si el producto actual es el que se está actualizando
                                    ...product,
                                    quantity: product.quantity + variables.quantity // Actualiza la cantidad del producto
                                } : product // Si no es el producto que se está actualizando, devuélvelo sin cambios
                            )
                        } : item // Si no es el carrito que se está actualizando, devuélvelo sin cambios
                    )
                )
            }
        }
    })

    const handleIncrease = (id) => {
        const cid = cartItems[0]._id
        cartItems.forEach(item => {
            item.products.forEach(product => {
                if (product._id === id) {
                    console.log(product.pid._id)
                    updateQuantityMutation.mutate({ cid: cid, pid: product.pid._id, quantity: 1 })
                }
            });
        })

    }

    const handleDecrease = (id) => {
        const cid = cartItems[0]._id
        cartItems.forEach(item => {
            item.products.forEach(product => {
                if (product._id === id) {
                    console.log(product.pid._id)
                    updateQuantityMutation.mutate({ cid: cid, pid: product.pid._id, quantity: -1 })
                }
            });
        })
    }

    const handleRemove = (pid) => {
        const cid = cartItems[0]._id
        deleteCartMutate.mutate({cid,pid})
    }

    const handlePurchase = () => {
        // Aquí puedes agregar la lógica de la compra
        alert('Compra realizada');
    }
    useEffect(() => {

        if (!isLoading && data) {
            console.log("DENTRO DE ISLOADING ")
            setCartItems(data);
        }
    }, [data, isLoading]);

    return (
        <CartComponent
            handleIncrease={handleIncrease}
            handleDecrease={handleDecrease}
            handleRemove={handleRemove}
            handlePurchase={handlePurchase}
            cartItems={cartItems}
            isLoading={isLoading}
            isLogged={isLogged}
        />
    )
}

export default CartContainer
