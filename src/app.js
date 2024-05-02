import express from 'express'
import session from './routers/session.route.js'
import producto from './routers/product.route.js'
import cart from './routers/cart.router.js'
import ticket from './routers/ticket.router.js'
import _dirname from './utils.js'
import config from './config/config.js'
import cookieParser from 'cookie-parser'
import swaggerJSDoc from 'swagger-jsdoc'
import SwaggerUiExpress from 'swagger-ui-express'
import { addlogger } from './logger/logger.js'
import cors from 'cors'

const app = express()

//agrego cors 
app.use(cors())
//para que acepte formato json.
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser()) //convierte las cookies a formato json

//documentacion
const swaggerOptions = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: 'Documentacion de proyecto jwin (Venta de celulares y accesorios)',
            description: 'Proyecto jwin'
        },
    },

    apis: [`${_dirname}/docs/**/*.yaml`]
}

const specs = swaggerJSDoc(swaggerOptions)
app.use('/docs', SwaggerUiExpress.serve, SwaggerUiExpress.setup(specs))

app.use('/api/session', addlogger, session)
app.use('/api/product', addlogger, producto)
app.use('/api/cart', addlogger, cart)
app.use('/api/ticket', addlogger, ticket)

app.listen(config.PORT, () => { console.log('Conexion exitosa con el puerto :  ' + config.PORT) })

export default app