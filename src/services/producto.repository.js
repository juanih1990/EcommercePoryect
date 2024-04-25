export default class ProductoRepository {
    constructor(productoDao) {
        this.productoDao = productoDao
    }
    getProduct = async ({ lm, pg }) => {
        try {
            const producto = await this.productoDao.getProduct({ lm, pg })
            return producto
        } catch (error) {
            console.log(error)
        }
    }
    getProductOne = async (code) => {
        try {
            const producto = await this.productoDao.getProductOne(code)
            return producto
        } catch (error) {
            console.log(error)
        }
    }
    getProductById = async (id) => {
        try {
            const producto = await this.productoDao.getProductById(id)
            return producto
        } catch (error) {
            console.log(error)
        }
    }
    productCreate = async (producto) => {
        try {
            const newProducto = await this.productoDao.productCreate(producto)
            return newProducto
        } catch (error) {
            console.log(error)
        }
    }
    productoUpdate = async (id, body) => {
        try {
            return await this.productoDao.productoUpdate(id, body)
        } catch (error) {
            console.log(error)
        }
    }
    prductoDelete = async (id) => {
        try {
            const producto = await this.productoDao.prductoDelete(id)
            return producto
        } catch (error) {
            console.log(error)
        }
    }
}