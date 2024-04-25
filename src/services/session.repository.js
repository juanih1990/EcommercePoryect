export default class SessionRepositoyry {
    constructor(sessionDao) {
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

    sessionUpdatePassword = async (id, password) => {
        try {
            return this.sessionDao.sessionUpdatePassword(id, password)
        } catch (error) {
            console.log(error)
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
}
