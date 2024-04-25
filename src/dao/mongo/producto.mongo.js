import productoModel from "../models/producto.model.js"

export default class producto {
    getProduct = async ({ lm, pg }) => {
        try {
            const producto = await productoModel.paginate({},
                {
                    limit: lm,
                    page: pg
                })
            return producto
        } catch (error) {
            console.log(error)
        }
    }
    getProductOne = async ( code ) => {
        try {
            const producto = await productoModel.findOne( code )
            return producto
        } catch (error) {
            console.log(error)
        }
    }
    getProductById = async (id) => {
        try {
            const producto = await productoModel.findById(id)
            return producto
        } catch (error) {
            console.log(error)
        }
    }
    productCreate = async (producto) => {
        try {
            const newProducto = await productoModel.create(producto)
            return newProducto
        } catch (error) {
            console.log(error)
        }
    }
    productoUpdate = async (id, body) => {
        try {
            return await productoModel.findOneAndUpdate(
                { _id: id },
                { $set: body },
                { new: true }
            )
        } catch (error) {
            console.log(error)
        }
    }
    prductoDelete = async (id) => {
        try {
            const producto = await productoModel.findByIdAndDelete(id)
            return producto
        } catch (error) {
            console.log(error)
        }
    }
}