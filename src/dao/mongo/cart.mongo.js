import cartModel from '../models/cart.model.js'
import mongoose from 'mongoose'



export default class Cart {
    getCart = async () => {
        try {
            const cart = await cartModel.find({ closeBuy: false }).populate('products.pid')
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
    deleteCart = async (cid ,pid) => {
        try {
            const objectId = new mongoose.Types.ObjectId(pid)
            // Actualiza el carrito eliminando el producto con el pid especificado
            const result = await cartModel.updateOne(
                { _id: cid },
                { $pull: { products: { pid: objectId } } }
            );
    
            if (result.nModified > 0) {
               console.info('Producto eliminado del carrito exitosamente.')
               return result
            } else {
                console.info('Producto no encontrado en el carrito.')
            }
        } catch (error) {
            console.error(error);
        }
    }
    updateCart = async (id, pid, cantidad) => {
        try {
            const cartInfo = await cartModel.findById(id)
            const existingProduct = cartInfo.products.find(product => product.pid.toString() === pid)
          
            if (existingProduct) {
                const cartUpdate = await cartModel.findOneAndUpdate(
                    { _id: id, 'products.pid': pid },
                    { $set: { 'products.$.quantity': existingProduct.quantity  + cantidad } },
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