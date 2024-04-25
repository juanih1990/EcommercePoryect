import mongoose from "mongoose"
const cartSchema = new mongoose.Schema({
    products: [{
        pid: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'producto',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    closeBuy: {
        type: Boolean,
        default: false
    }
})
export default mongoose.model('cart', cartSchema)