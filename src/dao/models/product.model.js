import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const productCollection = "products"

const productSchema = new mongoose.Schema({
    title:{
        type: String,
        require: true
    },
    description:{
        type: String,
        require: true
    },
    price:{
        type: Number,
        require: true
    },
    code:{
        type: Number,
        require: true,
        unique: true
    },
    stock:{
        type: Number,
        require: true
    },
    quantity:{
        type: Number,
        require: true
    },
    thumbnail: String
})

productSchema.plugin(mongoosePaginate)

export const productModel = mongoose.model(productCollection, productSchema)