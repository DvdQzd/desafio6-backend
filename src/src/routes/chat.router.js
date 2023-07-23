import { Router } from "express";
import { messageModel } from "../dao/models/message.model.js";

const router = Router()

router.get("/", async (req, res) => {
    let messagesFind = await messageModel.find().lean()
    console.log(messagesFind)
    res.render("chat", { messages: messagesFind })
    //res.send({status:"succes",payload:messagesFind});
})

router.post("/", async (req, res) => {
    const { user, text } = req.body;
    let messageSend = await messageModel.create({
        user,
        text
    });
    let messagesFind = await messageModel.find().lean();
    res.render("chat", { messages: messagesFind });
    //res.send({status:"succes",payload:messagesFind});
});

router.delete("/:id", async (req, res) => {
    let id = req.params.id
    let result = await messageModel.deleteOne({_id:id})
    let messagesFind = await messageModel.find().lean();
    res.render("chat", { messages: messagesFind });
    //res.send({status:"succes",payload:messagesFind});
})

export default router
