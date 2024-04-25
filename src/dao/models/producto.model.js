import mongoose from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"

const productoSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    stock: {
        type: Number,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    code: {
        type: String,
        require: true,
        unique: true
    },
    thumbnail: {
        type: String,
        require: true
    },
    owner:{
        type: String ,
        require: true,
        default: "admin"
    }
},
{
   timestamps: true  
} ) 

productoSchema.plugin(mongoosePaginate)
export default mongoose.model('producto' , productoSchema)