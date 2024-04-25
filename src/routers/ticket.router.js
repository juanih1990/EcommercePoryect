import { Router } from 'express'
import { purchase, getTicketAll, getTicketId, deleteTicket } from '../controller/ticket.controller.js'
import { verificarToken } from '../middleware/verificarToken.js'

const router = Router()

router.get('/getTicket',
    verificarToken,
    getTicketAll)
router.get('/getTicketId/:id',
    verificarToken,
    getTicketId)
router.post('/purchase/:cid',
    verificarToken,
    purchase)
router.delete('/deleteTicket/:id',
    verificarToken,
    deleteTicket)


export default router