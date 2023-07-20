import fs from "fs"

class ProductManager{
    constructor(){
        this.path = "src/productList.json"
        this.products = []
    }

    getProducts = () => {
        try {
            if (!fs.existsSync(this.path)) {
                fs.writeFileSync(this.path, "[]");
            }
            let data = fs.readFileSync(this.path, "utf-8");
            let productsToJS = JSON.parse(data);
            return productsToJS;
        } catch (error) {
            console.log(error);
            return [];
        }
    }

    getProductById = (id) => {
        try {
            let data = fs.readFileSync(this.path, "utf-8")
            let arrayToJS = JSON.parse(data)
            let productFind = arrayToJS.find(p => p.id === id)
            console.log(productFind)
        } catch(error) {
            console.log(error)
        }
    }

    addProduct = (product) => {
        const { title, description, price, code, stock, quantity, thumbnail } = product
        for (const key in product) {
            if (key !== 'thumbnail' && (product[key] === undefined || product[key] === null || product[key] === '' || (typeof product[key] === 'number' && isNaN(product[key])))) {
                console.log(`No se completaron todos los campos.`);
                return;
            }
        }
        if (thumbnail) {
            if (Array.isArray(thumbnail)) {
                product.thumbnail = thumbnail;
            } else {
                product.thumbnail = [thumbnail];
            }
        } else {
            product.thumbnail = [];
        }

        let products = this.getProducts()
        if (products.some(x => x.code === code)) {
            console.log("Código ya registrado, ingrese un código que no esté cargado.");
            return;
        }
        if (products.length === 0) {
            product.id = 1;
        } else {
            product.id = products[products.length - 1].id + 1;
        }
        products.push(product)

        let productToJSON = JSON.stringify(products, null, "\t")
        fs.writeFileSync(this.path, productToJSON, function(err) {
            if(err) throw err
            console.log("Elemento cargado correctamente.")
        })
    }

    deleteProduct = (idDelete) => {
        let products = this.getProducts();
        let productDelete = products.find((x) => x.id === idDelete);
        if (productDelete === undefined) {
            console.log("Producto no existente");
            return;
        } else {
            let indexDelete = products.indexOf(productDelete);
            products.splice(indexDelete, 1);
        }
        let productToJSON = JSON.stringify(products, null, "\t");
        fs.writeFileSync(this.path, `\n${productToJSON}`, function (err) {
            if (err) throw err;
            console.log("Elemento eliminado correctamente.");
        });
    };

    updateProduct = (id, newField, newValue) => {
        if(newField == "id"){
            console.log("No se puede cambiar el id")
            return
        }
        try {
            let products = this.getProducts();
            let productFind = products.find(p => p.id === id)
            productFind[newField] = newValue
            let productToJSON = JSON.stringify(products, null, "\t")
            fs.writeFileSync(this.path, `\n${productToJSON}`, function(err) {
                if(err) throw err
                console.log("Elemento cargado correctamente.")
            })
            console.log("Producto actualizado correctamente")
        } catch(error) {
            console.log(error)
        }
    }
}

export default ProductManager