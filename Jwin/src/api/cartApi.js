import axios from "axios";

const  cart = axios.create({
    baseURL: 'http://localhost:8080/api/cart',
    withCredentials: true
})

export const addToCart = async(cid,pid) => {
    try {
        const res = await cart.put(`/updateCart/${cid}/${pid}`)
        return res.data
    } catch (error) {
        return error.response.data.message
    }
}


export const newCart = async() => {
    try {
        const res = await cart.post('/newCart')
        return res.data
    } catch (error) {
        return error.response.data.message
    }
}

export const getCart = async() => {
    try {
        const res = await cart.get('/getCart')
        return res.data
    } catch (error) {
        return error.response.data.message
    }
}

export const updateQuantity = async({cid,pid,quantity}) => {
    try {
        const res = await cart.put(`/updateCart/${cid}/${pid}` , quantity)
        return res.data
    } catch (error) {
        return error.response.data.message
    }
}

export const deleteCart = async({cid , pid}) => {
    try {
        const res = await cart.delete(`/deleteCart/${cid}/${pid}`)
        return res.data
    } catch (error) {
        return error.response.data.message
    }
}