import { Router } from 'express'
import { register, login, profile, logout } from '../controller/session.controller.js'
import { verificarToken } from '../middleware/verificarToken.js'
import {validateSchema} from '../middleware/validator.middleware.js'
import {loginSchema,registerSchema} from '../schemas/auth.schema.js'

const router = Router()

router.post('/register', validateSchema(registerSchema), register)
router.post('/login',validateSchema(loginSchema), login)
router.post('/logout',logout)
router.get('/profile',
    verificarToken,
    profile)

export default router


