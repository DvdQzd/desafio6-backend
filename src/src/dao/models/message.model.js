import mongoose from "mongoose";

const messageCollection = "messages"

const messageSchema = new mongoose.Schema({
    user:{
        type: String,
        require: true,
    },
    text:{
        type: String,
        require: true,
    }
})

export const messageModel = mongoose.model(messageCollection, messageSchema)
