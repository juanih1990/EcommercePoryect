import { TicketService, CartService, ProductoService, SessionService } from '../services/index.js'

//Me falta:
//* mandar un mail al usuario , 
//con la compra realizada o con el mensaje de falta de stock


export const purchase = async (req, res) => {
    try {
        const { user } = req.user
        const { cid } = req.params
        const compra = await CartService.getCartByid(cid)

        const productsSinStock = []
        const purchase = []
        let amount = 0
        //Controlar stock de los productos
        for (const cartProduct of compra.products) {

            const producto = await ProductoService.getProductById(cartProduct.pid)
            if (producto && producto.stock >= cartProduct.quantity) {
                amount += producto.price * cartProduct.quantity
                purchase.push(cartProduct)
            }
            else {
                productsSinStock.push(producto.title.toUpperCase())
            }
        }

        //Si algun producto no tiene stock no realiza la compra
        if (productsSinStock.length > 0) {
            return res.status(400).json({ message: "Lo sentimos no se pudo finalizar la compra por que los productos ('" + productsSinStock + "') no estan en existencia en este momento" })
        }
        else {   //Si todo esta correcto procede con la compra
            const newTicket = {
                user: user._id,
                products: purchase,
                amount
            }
            for (const cartProduct of compra.products) {
                const producto = await ProductoService.getProductById(cartProduct.pid)

                const stock = producto.stock - cartProduct.quantity
                const actualizarStock = await ProductoService.productoUpdate(producto._id, { stock: stock })
            }
            const buy = await TicketService.createTicket(newTicket)
            const cartClose = await CartService.updateCloseBuy(cid)
            const cartUserDelete = await SessionService.sessionDeleteAtributeCart(user._id)
            const sendTicket = await TicketService.sendMailTicket(user,newTicket,amount)
            return res.status(200).json(buy)
        }



    } catch (error) {
        console.log("Server Error: " + error)
        res.status(500).json({ Message: "server error" })
    }
}

export const getTicketAll = async (req, res) => {
    try {
        const ticket = await TicketService.getTicket()
        if (!ticket) return res.status(400).json({ message: "Errr problemas al recuperar el ticket" })
        return res.status(200).json(ticket)
    } catch (error) {
        console.log("Server Error: " + error)
        res.status(500).json({ Message: "server error" })
    }
}

export const getTicketId = async (req, res) => {
    try {
        const { id } = req.params
        const ticket = await TicketService.getTicketByid(id)
        if (!ticket) return res.status(400).json({ message: "Errr problemas al recuperar el ticket" })

        return res.status(200).json(ticket)
    } catch (error) {
        console.log("Server Error: " + error)
        res.status(500).json({ Message: "server error" })
    }
}

export const deleteTicket = async (req, res) => {
    try {
        const { id } = req.params
        const ticket = await TicketService.deleteTicket(id)
        return res.status(200).json('Ticket deleted!')
    } catch (error) {
        console.log("Server Error: " + error)
        res.status(500).json({ Message: "server error" })
    }
}