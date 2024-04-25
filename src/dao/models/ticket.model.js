import mongoose from "mongoose"
const ticketSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
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
    amount: {
        type: Number,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    }
})
export default mongoose.model('ticket',  ticketSchema)