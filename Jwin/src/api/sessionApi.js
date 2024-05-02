import axios from 'axios'

const users = axios.create({
    baseURL: 'http://localhost:8080/api/session'
})

export const registerUser = async (user) => {
    try {
        const res = await users.post('/register', user)
        return res.data
    } catch (error) {
        return error.response.data.message
    }

}