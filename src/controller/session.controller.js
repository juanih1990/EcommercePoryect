import { SessionService } from '../services/index.js'
import { createHash, isValidatePassword, generarToken } from '../utils.js'

export const register = async (req, res) => {
    const { name, lastName, email, age, password } = req.body
    try {

        const hashPassword = await createHash(password)
        const NewUser = {
            name,
            lastName,
            email,
            age,
            password: hashPassword
        }
        

        const saveUser = await SessionService.sessionCreate(NewUser)
        if(!saveUser){
            req.logger.info("Error al registrar el usuario")
            res.status(400).json({message: "Error al registrar el usuario"})
        }
        const token = await generarToken(saveUser)
        res.cookie('token', token)
        req.logger.info("token: " + token)
        return res.json({
            name: saveUser.name,
            lastName: saveUser.lastname,
            email: saveUser.email,
            age: saveUser.age
        })

    } catch (error) {
        req.logger.error("Error de servidor: " + error)
        return res.status(500).json({ message: error })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body
    try {

        const userFound = await SessionService.getSessionOne({ email })

        if (!userFound) return res.status(400).json({ message: "user not found" })

        const isMatch = isValidatePassword(userFound, password)

        if (!isMatch) return res.status(401).json({ message: "inavlid credential" })

        const token = await generarToken(userFound)
        res.cookie('token', token)
        return res.json({ message: "usuario logueado correctamente" })

    } catch (error) {
        req.logger.error("Error de servidor: " + error)
        return res.status(500).json({ message: error })
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie('token')
        console.log("coockie despues " + req.cookies.token)
        return res.status(200).json({message:"usuario deslogueado"})
    }
    catch (error) {
        console.error("Error during logout:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const profile = async (req, res, next) => {
    try {
        const { user } = req.user
        const email = user.email
        const profile = await SessionService.getSessionOne({ email })
        return res.json({
            name: profile.name,
            lastName: profile.lastName,
            email: profile.email,
            age: profile.age
        })
    } catch (error) {
        next(error)
    }
}


