import jwt from 'jsonwebtoken'
import config from '../config/config.js'

export const verificarToken = (req, res, next) => {
    const { token } = req.cookies
    if (!token) return res.status(401).json({ message: "unathorized" })

    jwt.verify(token,config.SECRETTOKEN, (error,user) =>{
        if(error) return res.status(403).json({message: "invalid token"})
        req.user = user
        next()
    })

   
}