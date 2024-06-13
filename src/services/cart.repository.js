export default class CartRepository {
    constructor(cartDao, sessionDao) {
        this.cartDao = cartDao
    }
    getCart = async () => {
        try {
            const cart = await this.cartDao.getCart()
            return cart
        } catch (error) {
            console.log("Error en (service) al realizar la busqueda " + error)
        }
    }
    getCartByid = async (id) => {
        try {
            const cart = await this.cartDao.getCartByid(id)
            return cart
        } catch (error) {
            console.log("Error en (service) al buscar el carrito " + error)
        }
    }
    deleteCart = async (cid,pid) => {
        try {
            const cart = await this.cartDao.deleteCart(cid,pid)
            return cart
        } catch (error) {
            console.log("Error en (service) al borrar el carrito " + error)
        }
    }
    updateCart = async (id, pid, cantidad) => {
        try {
            
            const cartUpdate = await this.cartDao.updateCart(id, pid, cantidad)
            return cartUpdate
        } catch (error) {
            console.log("Error en (service) al actualizar el producto " + error)
        }
    }
    createCart = async () => {
        try {
            const showCart = await this.getCart()
            const openCart = showCart.find(cart => cart.closeBuy === false)

            console.log("showCart" + JSON.stringify(openCart))

            if (openCart) {
                return openCart._id
            }
            else {
                console.log("carrito cerrado")

                const newCart = ({
                    products: [],
                })
                const cartNew = await this.cartDao.createCart(newCart)
                return cartNew._id
            }

        } catch (error) {
            console.log("Error en (service) al crear el carrito " + error)
        }
    }
    updateCloseBuy = async (id) => {
        try {
            const cartClose = await this.cartDao.updateCloseBuy(id)
            return cartClose
        } catch (error) {
            console.log("Error en (service) al actualizar el cierre del carrito")
        }
    }
}