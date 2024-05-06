import axios from 'axios'

const users = axios.create({
    baseURL: 'http://localhost:8080/api/session',
    withCredentials: true
})

export const registerUser = async (user) => {
    try {
        const res = await users.post('/register', user)
        return res.data
    } catch (error) {
        return error.response.data.message
    }

}

export const loginUser = async (user) => {
    try {
        const res = await users.post('/login', user)
    } catch (error) {
        console.log(error.response.data.message)
        return error.response.data.message
    }
}

export const logout = async () => {
    try {
        const res = await users.post('/logout')
    } catch (error) {
        return error.response.data.message
    }
}