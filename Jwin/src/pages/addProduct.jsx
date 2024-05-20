import React, { useEffect } from 'react'
import AgregarProductoContainer from '../containers/addProduct.container'
import { useLocation } from 'react-router-dom'
const AddProduct = () => {
  const location = useLocation();
  const productId = location.state?.id
 
  return (
    <AgregarProductoContainer productId={productId} />
  )
}

export default AddProduct

