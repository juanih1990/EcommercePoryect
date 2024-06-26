import { Router } from 'express'
import { register, login, profile, logout, reminder, updatePass } from '../controller/session.controller.js'
import { verificarToken } from '../middleware/verificarToken.js'
import { validateSchema } from '../middleware/validator.middleware.js'
import { loginSchema, registerSchema } from '../schemas/auth.schema.js'


const router = Router()

router.post('/register', validateSchema(registerSchema), register)
router.post('/login', validateSchema(loginSchema), login)
router.post('/logout', logout)
router.get('/profile',
  verificarToken,
  profile)
router.post('/reminder', reminder)
router.put('/updatePass', updatePass)


export default router


