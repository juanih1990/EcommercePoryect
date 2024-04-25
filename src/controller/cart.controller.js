import { CartService } from '../services/index.js'
import { SessionService } from '../services/index.js'

export const getCart = async (req, res) => {
    try {
        const cart = await CartService.getCart()
        if (!cart || cart.length === 0) return  res.status(400).json({ message: "No hay productos en el carrito" })
       
        return res.status(200).json(cart)
    } catch (error) {
        console.log("Server Error: " + error)
        res.status(500).json({ Message: "server error" })
    }
}
export const getCartByid = async (req, res) => {
    try {
        const { id } = req.params
        const cart = await CartService.getCartByid(id)
        if (!cart) return res.status(400).json({ message: "No se encontro el producto en el carrito" })
        return res.status(200).json(cart)
    } catch (error) {
        console.log("Server Error: " + error)
        res.status(500).json({ Message: "server error" })
    }
}
export const deleteCart = async (req, res) => {
    try {
        const { id } = req.params
        const cart = await CartService.deleteCart(id)
        if (!cart) return res.status(400).json({ message: "No se encontro el producto en el carrito" })
        return res.status(200).json({ message: "Producto eliminado con exito" })
    } catch (error) {
        console.log("Server Error: " + error)
        res.status(500).json({ Message: "server error" })
    }
}
export const updateCart = async (req, res) => {
    try {
        const { cid, pid } = req.params
        let { quantity } = req.body 
        if(!quantity) quantity = 1

        const cartupdate = await CartService.updateCart(cid, pid, quantity)
        if (!cartupdate) return res.status(400).json({ message: "No se encontro el producto en el carrito" })
        return res.status(200).json(cartupdate)
    } catch (error) {
        console.log("Server Error: " + error)
        res.status(500).json({ Message: "server error" })
    }
}

export const newCart = async (req, res) => {
    try {
        const { user } = req.user
        const idCart = await CartService.createCart()

        if (!idCart) return res.status(400).json({ message: "Error al crear el carrito" })

        const sessionCart = await SessionService.sessionUpdateCart(user._id, idCart)
        res.status(200).json(sessionCart)

    } catch (error) {
        console.log("Server Error " + error)
        res.status(500).json({ message: "server error" })
    }
}

