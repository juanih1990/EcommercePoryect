import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    age: {
        type: Date,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user"
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
    passportId: {
        type: String ,// Para almacenar el ID de Google u otra estrategia de autenticación
        default: ''
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cart',
        default: null
      }
});

export default mongoose.model('user', userSchema);
