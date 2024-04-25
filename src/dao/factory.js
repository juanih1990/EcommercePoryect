import config from '../config/config.js'
import mongoose from "mongoose"

export let session
export let producto
export let cart
export let ticket

switch (config.PERSISTENCE) {
    case "mongo":
        await mongoose.connect(config.MONGO_URL, { dbName: config.MONGO_DB_NAME })
        const { default: sessionMongo } = await import('./mongo/session.mongo.js')
        const { default: productoMongo } = await import('./mongo/producto.mongo.js')
        const {default: cartMongo} = await import('./mongo/cart.mongo.js')
        const {default: ticketMongo} = await import('./mongo/ticket.mongo.js')

        session = sessionMongo
        producto = productoMongo
        cart = cartMongo
        ticket = ticketMongo
        console.log("Conexion exitosa a la Base de datos")
        break

    default:
        throw new Error('Persistence not recognized')
}