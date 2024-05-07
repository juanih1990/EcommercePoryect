export default class SessionRepositoyry {
    constructor(sessionDao,mailModule) {
        this.mailModule = mailModule
        this.sessionDao = sessionDao
    }

    getSession = async () => {
        try {
            const user = this.sessionDao.getSession()
            return user
        } catch (error) {
            console.log(error)
        }

    }

    getSessionOne = async ({ email }) => {
        try {
            const user = this.sessionDao.getSessionOne({ email })
            return user
        } catch (error) {
            console.log(error)
        }

    }

    getSessionById = async (id) => {
        try {
            const user = this.sessionDao.getSessionById(id)
            return user
        } catch (error) {
            console.log(error)
        }

    }

    sessionDelete = async (id) => {
        try {
            const user = this.sessionDao.sessionDelete(id)
            return user
        } catch (error) {
            console.log(error)
        }

    }

    sessionCreate = async (user) => {
        try {
            const users = await this.sessionDao.sessionCreate(user)
            return users
        } catch (error) {
            console.log(error)
        }

    }

    sessionUpdate = async (id, body) => {
        try {
            return this.sessionDao.sessionUpdate(id, body)
        } catch (error) {
            console.log("Error R: " + error)
        }

    }

    sessionUpdateRole = async (id, rol) => {
        try {
            return this.sessionDao.sessionUpdateRole(id, rol)
        } catch (error) {
            console.log(error)
        }

    }

    sessionUpdateCart = async (id, cart) => {
        try {
            console.log("id: " + id)
            console.log("id cart: " + cart)
            return this.sessionDao.sessionUpdateCart(id, cart)
        } catch (error) {
            console.log(error)
        }
    }

    sessionDeleteAtributeCart = async (userID) => {
        try {
          const updatedUser = await this.sessionDao.sessionDeleteAtributeCart(userID)
        } catch (error) {
            console.log(error)
        }
    }

    reminder = async (userEmail) => {
        const user = await this.getSessionOne(userEmail)
        console.log(JSON.stringify(user))
        const expirationTime = new Date();
        //expira en 5 min para pruebas
        expirationTime.setMinutes(expirationTime.getMinutes() + 5)
     //   expirationTime.setHours(expirationTime.getHours() + 1);
        const expirationTimeString = expirationTime.toLocaleString('en-US', { hour12: true });
        
        // Codificar la cadena de tiempo de expiración para que sea seguro para la URL
        const encodedExpirationTimeString = encodeURIComponent(expirationTimeString)
        const encodedUserEmail = encodeURIComponent(user.email)
        const encodedIdUser = encodeURIComponent(user._id)
        //Me falta ponerle a donde me tiene que mandar para cambiar la contraseña
        let html = `<div>Mr ${user.name} ,<h2> Password Reset</h2>
        <p>We heard that you lost your password. Sorry about that!</p>
        <p>But don’t worry! You can use the following link to reset your password:</p>
        <a href="http://localhost:5173/recoveryPass?expirationTime=${encodedExpirationTimeString}&email=${encodedUserEmail}&_id=${encodedIdUser}">Reset your password</a>
        <p>If you don’t use this link within the next hour (${expirationTimeString}), it will expire. 
        <p>Thanks,<br></p></div>`
        const result = this.mailModule.send(user, "Recovery password", html)
        return result
    }
}
