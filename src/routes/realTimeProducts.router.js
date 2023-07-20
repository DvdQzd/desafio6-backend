import { Router } from "express";
//import ProductManager from "../dao/ProductManager.js"
import { productModel } from "../dao/models/product.model.js";

const router = Router()
//let products = new ProductManager()
//let productsList = products.getProducts()

//router.get("/", (req,res) => {
//    res.render("realTimeProducts", { products: productsList })
//})

router.get("/", async (req, res) => {
    let productsList = await productModel.find().lean()
    res.render("realTimeProducts", { products: productsList })
})

export default router;