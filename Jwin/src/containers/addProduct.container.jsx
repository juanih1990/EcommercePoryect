import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import AgregarProductoComponent from '../componentes/addProduct.component'
import { useMutation, useQuery } from '@tanstack/react-query'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { addProduct } from '../api/productApi'
import { getProductById } from '../api/productApi'
import { updateProduct } from '../api/productApi'
import { useState } from 'react'

const AgregarProductoContainer = ({ productId }) => {
  const { register, handleSubmit, formState: { errors }, watch, reset, setValue } = useForm({
    defaultValues: {
      Producto: '',
      Descripcion: '',
      Precio: '',
      Stock: '',
      Categoria: '',
      Codigo: '',
      thumbnail: ''
    }

  })
  const [actionType, setActionType] = useState('') //para saber si dio click al boton guardar o al agregar  es una bandera
  const navigate = useNavigate()

  const { data, isSuccess, isError, error, isLoading } = useQuery({
    queryKey: ['productsByid', productId], // La clave de la consulta incluye productId
    queryFn: () => getProductById(productId), // queryFn es una función que llama a getProductById
    enabled: !!productId // Solo ejecuta la consulta si productId está presente
  })

  useEffect(() => {
    if (isSuccess && data) {
      setValue('Producto', data.title || '');
      setValue('Descripcion', data.description || '');
      setValue('Precio', data.price || '');
      setValue('Stock', data.stock || '');
      setValue('Categoria', data.category || '');
      setValue('Codigo', data.code || '');
      setValue('thumbnail', data.thumbnail || '')
    }
    else {
      if (productId === undefined) {
        reset()
      }
    }

  }, [data, isSuccess, isError, error])

  const addProductMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: (data) => {
      if (data && typeof data === 'string') {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data
        })
      }
      else {
        Swal.fire({
          icon: 'success',
          title: '¡Producto agregado con éxito!',
          text: 'Agregaste un nuevo producto a tu comercio !'
        }).then(() => {
          navigate('/')
        })
      }
    },
    onError: (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message
      })
    }
  })


  const updateProductMutation = useMutation({
    mutationFn: ({ id, data }) => updateProduct(id, data),
    onSuccess: (data) => {
      if (data && typeof data === 'string') {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data
        })
      }
      else {
        Swal.fire({
          icon: 'success',
          title: '¡El producto se actualizo éxito!',
          text: 'Producto actualizado!'
        }).then(() => {
          navigate('/')
        })
      }
    },
    onError: (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message
      })
    }
  })

  const onSubmit = handleSubmit(data => {

    reset()
    let precioData = 0
    let stockData = 0
    if (typeof data.Precio != "number") {
      precioData = parseFloat(data.Precio.replace(',', '.'))
    }
    else {
      precioData = data.Precio
    }
    if (typeof data.Stock != "number") {
      stockData = parseFloat(data.Stock.replace(',', '.'))
    }
    else {
      stockData = data.Stock
    }
    const formData = {
      title: data.Producto.toUpperCase(),
      description: data.Descripcion.toUpperCase(),
      price: precioData,
      stock: stockData,
      category: data.Categoria.toUpperCase(),
      code: data.Codigo.toUpperCase(),
      thumbnail: data.thumbnail,
    }



    if (actionType === 'guardar') {
      updateProductMutation.mutate({ id: productId, data: formData })
    }
    else {
      addProductMutation.mutate(formData);
    }


  })

  return (
    <div>
      <AgregarProductoComponent
        onSubmit={onSubmit}
        errors={errors}
        register={register}
        watch={watch}
        setActionType={setActionType}
        productId={productId}
        reset={reset}
      />
    </div>
  )
}

export default AgregarProductoContainer
