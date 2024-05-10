import express from 'express'
import session from 'express-session'
import sessions from './routers/session.route.js'
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
import initializePassport from './config/passport.config.js'
import passport from 'passport'

const app = express()

const javascript_origins = ["http://localhost","http://localhost:8080","http://localhost:5173"]




//para que acepte formato json.
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())

//agrego cors 
app.use(cors({
    origin: ['http://localhost:8080' , 'http://localhost:5173'],
    methods: ['GET','POST','PUT','DELETE'],
    credentials: true
}));
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

app.use(session({
    secret: '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', // Cambia esto por una cadena secreta fuerte
    resave: false,
    saveUninitialized: false,
}))

initializePassport()
app.use(passport.initialize())
app.use(passport.session())


app.use('/api/session', addlogger, sessions)
app.use('/api/product', addlogger, producto)
app.use('/api/cart', addlogger, cart)
app.use('/api/ticket', addlogger, ticket)

app.listen(config.PORT, () => { console.log('Conexion exitosa con el puerto :  ' + config.PORT) })

export default app