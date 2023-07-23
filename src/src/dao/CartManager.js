import fs from "fs"

class CartManager{
    static lastId = 0

    constructor(){
        this.path = "./cart.json"
        this.products = []
        this.id = ++CartManager.lastId
    }

    getCart = () => {
        try {
            let data = fs.readFileSync(this.path, "utf-8")
            let cartToJS = JSON.parse(data)
            return cartToJS
        } catch(error) {
            console.log(error)
            return
        }
    }

    getCartById = (id) => {
        try {
            let data = fs.readFileSync(this.path, "utf-8")
            let arrayToJS = JSON.parse(data)
            let cartFind = arrayToJS.find(c => c.id === id)
            console.log(cartFind)
        } catch(error) {
            console.log(error)
        }
    }

    addToCart = (product) => {
        const { id, quantity } = product
        if(this.products.some(x => x.id === id)){
            let repeatedProduct = this.products.find(x => x.code === code)
            repeatedProduct.quantity += quantity
        }
        this.products.push(product)
        let cartToJSON = JSON.stringify(this.products, null, "\t")
        fs.writeFileSync(this.path, `\n${cartToJSON}`, function(err) {
            if(err) throw err
            console.log("Elemento cargado correctamente.")
        })
    }

    deleteFromCart = (idDelete) => {
        let productDelete = this.products.find(x => x.id === idDelete)
        if(productDelete === undefined){
            console.log("Producto no existente")
            return
        } else {
            let indexDelete = this.products.indexOf(productDelete)
            return this.products.splice(indexDelete, 1)
        }
    }
}

export default CartManager