import axios from 'axios'
const product = axios.create({
    baseURL: 'http://localhost:8080/api/product',
    withCredentials: true
})
export const addProduct = async (producto) => {
    try {
        const res = await product.post('/addProduct', producto)
        return res.data
    } catch (error) {
        return error.response.data.message
    }
}
export const getProduct = async () => {
    try {
        const res = await product.get('/getProduct')
        return res.data
    } catch (error) {
        return error.response.data.message
    }
}
export const getProductById = async (id) => {
    try {
        const res = await product.get(`/getProductByid/${id}`)
        return res.data
    } catch (error) {
        return error.response.data.message
    }
}
export const deleteProduct = async (id) => {
    try {
        const res = await product.delete(`/deleteProduct/${id}`)
        return res.data
    } catch (error) {
        return error.response.data.message
    }
}

export const updateProduct = async (id, data) => {
    try {
        const res = await product.put(`/updateProduct/${id}`, data)
        return res.data
    } catch (error) {
        return error.response.data.message
    }
}
