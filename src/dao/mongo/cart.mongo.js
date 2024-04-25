import cartModel from '../models/cart.model.js'



export default class Cart {
    getCart = async () => {
        try {
            const cart = await cartModel.find({ closeBuy: false })
            return cart
        } catch (error) {
            console.log("Error en (mongo) al realizar la busqueda " + error)
        }
    }
    getCartByid = async (id) => {
        try {
            const cart = await cartModel.findById(id)
            return cart
        } catch (error) {
            console.log("Error en (mongo) al buscar el carrito " + error)
        }
    }
    deleteCart = async (id) => {
        try {
            const cart = await cartModel.findByIdAndDelete(id)
            return cart
        } catch (error) {
            console.log("Error en (mongo) al borrar el carrito " + error)
        }
    }
    updateCart = async (id, pid, cantidad) => {
        try {
            const cartInfo = await cartModel.findById(id)
            const existingProduct = cartInfo.products.find(product => product.pid.toString() === pid)
            if (existingProduct) {
                const cartUpdate = await cartModel.findOneAndUpdate(
                    { _id: id, 'products.pid': pid },
                    { $set: { 'products.$.quantity': cantidad } },
                    { new: true }
                )
                return cartUpdate
            }
            else {
                const cartUpdate = await cartModel.findByIdAndUpdate(
                    { _id: id },
                    { $push: { products: { pid: pid, quantity: cantidad } } },
                    { new: true }
                )
                return cartUpdate
            }
        } catch (error) {
            console.log("Error en (mongo) al actualizar el producto " + error)
        }
    }
    createCart = async (cart) => {
        try {
            const cartNew = await cartModel.create(cart)
            return cartNew
        } catch (error) {
            console.log("Error en (mongo) al crear el carrito")
        }
    }

    updateCloseBuy = async (id) =>{
        try {
            return await cartModel.findOneAndUpdate(
                { _id: id },
                { $set: {closeBuy: true} },
                { new: true }
            )
        } catch (error) {
            console.log(error)
        }
    }
  
}