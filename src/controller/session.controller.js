import { SessionService } from '../services/index.js'
import { createHash, isValidatePassword, generarToken } from '../utils.js'
import UserDTO from '../dto/user.dto.js'
import config from '../config/config.js'
export const register = async (req, res) => {
    const { name, lastName, email, age, password } = req.body

    try {

        // Verificar si el correo electrónico ya está registrado
        let saveUser = {}
        if (req.body.sub) {
            const user = new UserDTO(req.body)
            const existingUser = await SessionService.getSessionOne({ email })
            if (existingUser) return
            saveUser = await SessionService.sessionCreate(user)
        } else {
            console.log("entro al logueo comun")
            const existingUser = await SessionService.getSessionOne({ email });
            if (existingUser) {

                if (existingUser.passportId === '') {
                    req.logger.info("Error al registrar el usuario, El correo electrónico ya está registrado ")
                    return res.status(400).json({ message: "El correo electrónico ya está registrado" });
                }
                else if (existingUser.passportId != '') {
                    const hashPassword = await createHash(password)
                    saveUser = await SessionService.sessionUpdatePasswordAndAge(existingUser._id, hashPassword, age)
                    if (!saveUser) {
                        req.logger.info("Error al registrar el usuario")
                        return res.status(400).json({ message: "Error al registrar el usuario" })
                    }
                }
            }

            else {
                console.log("Su primer registro")
                const hashPassword = await createHash(password)
                const NewUser = {
                    name,
                    lastName,
                    email,
                    age,
                    password: hashPassword
                }
                saveUser = await SessionService.sessionCreate(NewUser)
                if (!saveUser) {
                    req.logger.info("Error al registrar el usuario")
                    return res.status(400).json({ message: "Error al registrar el usuario" })
                }
            }
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
        if ( email === config.USER && password === config.PASSWORD) {
            const userFound = new UserDTO(req.body)
            const token = await generarToken(userFound)
            res.cookie('token', token)
            return res.json({ message: "usuario logueado correctamente" })
        }
        const userFound = await SessionService.getSessionOne({ email })

        if (!userFound) return res.status(400).json({ message: "user not found" })

        const isMatch = isValidatePassword(userFound, password)

        if (!isMatch) return res.status(401).json({ message: "inavlid credential" })

        const token = await generarToken(userFound)
        res.cookie('token', token )
        return res.json({ message: "usuario logueado correctamente"  , token })

    } catch (error) {
        req.logger.error("Error de servidor: " + error)
        return res.status(500).json({ message: error })
    }
}

export const logout = async (req, res) => {
    try {
        console.log("Entro al logout")
        res.clearCookie('token')
        return res.status(200).json({ message: "usuario deslogueado" })
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

export const reminder = async (req, res) => {
    const { email } = req.body
    const result = await SessionService.reminder({ email })
    return res.json({ message: "Revisa tu corre, podras cambiar tu contraseña " })
}



export const updatePass = async (req, res) => {
    try {
        const currentTime = new Date()
        const { expirationTime, password, id } = req.body

        // Convertir la hora de expiración del enlace a un objeto de tipo Date
        const expirationDate = new Date(expirationTime)

        // Verificar si la hora actual es menor que la hora de expiración del enlace
        if (currentTime < expirationDate) {

            const user = await SessionService.getSessionById(id)

            const isMatch = isValidatePassword(user, password)
            if (isMatch) return res.status(400).json({ message: 'Error, la contraseña debe ser diferente de la anterior' })

            const passwordHash = await createHash(password)
            const update = await SessionService.sessionUpdate(id, passwordHash)
            return res.status(200).json({ message: 'Contraseña actualizada' })

        } else {
            return res.status(400).json({ message: 'El enlace de restablecimiento de contraseña ha expirado.' })
        }
    } catch (error) {
        console.log("Error: " + error)
    }

}
