import { logger } from '../logger/logger.js'
export const validateSchema = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body)
        next()
    } catch (error) {
        logger.error(`Error de validación en ${req.url}:  ${error.errors.map(error => error.message).join(', ')}`)
        return res.status(400).json({ error: error.errors.map(error => error.message) })
    }
}