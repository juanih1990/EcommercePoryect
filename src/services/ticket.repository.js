export default class TicketRepositoyry {
    constructor(ticketDao, mailModule) {
        this.ticketDao = ticketDao
        this.mailModule = mailModule
    }
    getTicket = async () => {
        try {
            const ticket = await this.ticketDao.getTicket()
            return ticket
        } catch (error) {
            console.log("Error en (TicketRepositoyry) al realizar la busqueda " + error)
        }
    }
    getTicketByid = async (id) => {
        try {
            const ticket = await this.ticketDao.getTicketByid(id)
            return ticket
        } catch (error) {
            console.log("Error en (TicketRepositoyry) al buscar el carrito " + error)
        }
    }
    deleteTicket = async (id) => {
        try {
            const ticket = await this.ticketDao.deleteTicket(id)
            return ticket
        } catch (error) {
            console.log("Error en (TicketRepositoyry) al borrar el carrito " + error)
        }
    }

    createTicket = async (ticket) => {
        try {
            const ticketNew = await this.ticketDao.createTicket(ticket)
            return ticketNew
        } catch (error) {
            console.log("Error en (TicketRepositoyry) al crear el carrito")
        }
    }

    sendMailTicket = async (user, ticket, amount) => {
        try {
            const emailContent = `<div>Estimado/a ${user.name},\n\n su compra se realizo con exito. Total a pagar $ ${amount} </div>`
            await this.mailModule.send(user, 'Gracias por su compra', emailContent)
            return emailContent
        } catch (error) {
            console.log("Error en (TicketRepositoyry) al mandar el mail")
        }
    }

}
