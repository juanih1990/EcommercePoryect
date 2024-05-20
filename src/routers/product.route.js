import { Router } from 'express'
import { addProduct, getProduct, getProductByid, deleteProduct, getOneProduct, updateProduct } from '../controller/producto.controller.js'
import { validateSchema } from '../middleware/validator.middleware.js'
import { productSchema } from '../schemas/product.schema.js'
import { verificarToken } from '../middleware/verificarToken.js'
const router = Router()

router.post('/addProduct',
    verificarToken,
    validateSchema(productSchema),
    addProduct)
router.get('/getProduct',
    getProduct)
router.get('/getProductByid/:id',
    verificarToken,
    getProductByid)
router.get('/getOneProduct',
    verificarToken, getOneProduct)
router.delete('/deleteProduct/:id',
    verificarToken, deleteProduct)
router.put('/updateProduct/:id',
    verificarToken,
    updateProduct)

export default router
