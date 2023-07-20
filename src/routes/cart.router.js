import { Router } from "express";
import { cartModel } from "../dao/models/cart.model.js";
import { productModel } from "../dao/models/product.model.js";

const router = Router()

router.get("/", async (req, res) => {
    try {
        let carts = await cartModel.find()
        res.send(carts)
    } catch (error) {
        console.log(error)
    }
    
})

router.get("/:cid", async (req, res) => {
    let cartId = req.params.cid
    let cartFind = await cartModel.findOne({_id:cartId}).populate("products").lean()
    if(!cartId){
        res.send("No se encontro el carrito")
    } else {
        res.render("cart", { products: cartFind.products })
    }
})

router.post("/", async (req, res) => {
    try {
        let newCart = await cartModel.create({})
        res.send(newCart)
    } catch (error) {
        console.log(error)
    }
})

router.post("/:cid/product/:pid", async (req, res) => {
    let { pid, cid } = req.params
    let productFind = await productModel.findOne({ _id:pid })
    let cartFind = await cartModel.findOne({ _id:cid })
    cartFind.products.push(productFind.toObject())
    cartFind.save()
    res.send("Producto agregado")
})

router.delete("/:cid", async (req, res) => {
    let { cid } = req.params
    let cart = await cartModel.findOne({ _id:cid })
    if (!cart) {
        return res.status(404).send("No se encontró el carrito");
    }
    cart.products = []
    await cart.save()
    res.send("Se eliminaron todos los productos del carrito")
})

router.delete("/:cid/product/:pid", async (req, res) => {
    let { cid, pid } = req.params
    let cart = await cartModel.findOne({ _id:cid })
    let product = await productModel.findOne({ _id:pid })
    if (!cart || !product) {
        return res.status(404).send("No se encontró el carrito o el producto");
    }
    cart.products = cart.products.filter((cartProduct) => cartProduct._id.toString() !== pid)
    await cart.save();
    res.send("Producto eliminado del carrito")
})

export default router;