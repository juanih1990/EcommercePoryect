import sessionModel from "../models/user.model.js"

export default class session {
    getSession = async () => {
        try {
            const user = sessionModel.find()
            return user
        } catch (error) {
            console.log(error)
        }
    }

    getSessionOne = async ({ email }) => {
        try {
            const user = sessionModel.findOne({ email })
            return user
        } catch (error) {
            console.log(error)
        }

    }

    getSessionById = async (id) => {
        try {
            const user = sessionModel.findById(id)
            return user
        } catch (error) {
            console.log(error)
        }

    }

    sessionDelete = async (id) => {
        try {
            const user = sessionModel.findByIdAndDelete(id)
            return user
        } catch (error) {
            console.log(error)
        }

    }

    sessionCreate = async (user) => {
        try {
            const users = await sessionModel.create(user)
            return users
        } catch (error) {
            console.log(error)
        }

    }

    sessionUpdatePassword = async (id, password) => {
        try {
            return sessionModel.findOneAndUpdate(
                { _id: id },
                { $set: { password: password } },
                { new: true }
            )
        } catch (error) {
            console.log(error)
        }
    }
    sessionUpdateRole = async (id, rol) => {
        try {
            return sessionModel.findOneAndUpdate(
                { _id: id },
                { $set: { role: rol } },
                { new: true }
            )
        } catch (error) {
            console.log(error)
        }
    }
    sessionUpdateCart = async (id, cart) => {
        try {
            return sessionModel.findOneAndUpdate(
                { _id: id },
                { $set: { cart: cart } },
                { new: true }
            )
        } catch (error) {
            console.log(error)
        }
    }

    sessionDeleteAtributeCart = async (userID) => {
        try {
            const updatedUser = await sessionModel.findOneAndUpdate(
                { _id: userID }, 
                { $unset: { cart: 1 } }, 
                { new: true } 
            );
    
            return updatedUser
        } catch (error) {
            console.error('Error al eliminar el campo "cart" del usuario:', error);
        }
    }
}