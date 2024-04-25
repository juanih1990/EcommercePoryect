import { Router } from 'express'
import { deleteCart, getCart, getCartByid, updateCart, newCart } from '../controller/cart.controller.js'
import { verificarToken } from '../middleware/verificarToken.js'

const router = Router()

router.get('/getCart',
    verificarToken,
    getCart)
router.get('/getCartByid/:id',
    verificarToken,
    getCartByid)
router.delete('/deleteCart/:id',
    verificarToken,
    deleteCart)
router.put('/updateCart/:cid/:pid',
    verificarToken,
    updateCart)
router.post('/newCart',
    verificarToken,
    newCart)

export default router