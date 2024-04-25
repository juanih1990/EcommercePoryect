import ticketModel from '../models/ticket.model.js'

export default class Ticket {
    getTicket = async () => {
        try {
            const ticket = await ticketModel.find()
            return ticket
        } catch (error) {
            console.log("Error en (mongo) al realizar la busqueda " + error)
        }
    }
    getTicketByid = async (id) => {
        try {
            const ticket = await ticketModel.findById(id)
            return ticket
        } catch (error) {
            console.log("Error en (mongo) al buscar el carrito " + error)
        }
    }
    deleteTicket= async (id) => {
        try {
            const ticket = await ticketModel.findByIdAndDelete(id)
            return ticket
        } catch (error) {
            console.log("Error en (mongo) al borrar el carrito " + error)
        }
    }

    createTicket = async (ticket) => {
        try {
            const ticketNew = await ticketModel.create(ticket)
            return ticketNew
        } catch (error) {
            console.log("Error en (mongo) al crear el carrito")
        }
    }
}