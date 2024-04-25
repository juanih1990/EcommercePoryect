import { producto, session , cart , ticket } from '../dao/factory.js'
import SessionRepository from './session.repository.js'
import ProductoRepository from './producto.repository.js'
import CartRepository from './cart.repository.js'
import TicketRepository from './ticket.repository.js'
import Mail from "../modules/mail.modules.js"

const mailModule = new  Mail()
const sessionDao = new session()
const productoDao = new producto()
const cartDao = new cart()
const ticketDao = new ticket()

export const SessionService = new SessionRepository(sessionDao)
export const ProductoService = new ProductoRepository(productoDao)
export const CartService = new CartRepository(cartDao)
export const TicketService = new TicketRepository(ticketDao,mailModule)