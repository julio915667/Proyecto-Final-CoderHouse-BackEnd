// const fs = require('fs');
// const path = require('path');
// const crypto = require('crypto');
import fs from "fs"
import path from "path"
import crypto from "crypto"
class ProductManager {
    constructor() {
        const __filename = new URL(import.meta.url).pathname;
        this.filePath = path.join(path.dirname(__filename), 'data', 'fs', 'files', 'products.json');

        this.products = []; // Inicializar aquí
        this.loadProducts();
    }
    

    create(data) {
        const product = {
            id: this.generateId(),
            title: data.title,
            photo: data.photo,
            price: data.price,
            stock: data.stock
        };
    
        this.products.push(product);
        this.saveProducts();
        this.loadProducts(); // Añadir esta línea
        return product;
    }
    

    read() {
        console.log("Reading all items:", this.products);
        return this.products;
    }

    readOne(id) {
        console.log("Reading one item with ID:", id);
    return this.products.find(product => product.id === id);
    }

    loadProducts() {
        try {
            const data = fs.readFileSync(this.filePath, 'utf8');
            this.products = JSON.parse(data);
        } catch (error) {
            console.error('Error loading products:', error.message);
            this.products = [];
        }
    }
    

    saveProducts() {
        try {
            const data = JSON.stringify(this.products, null, 2);
            fs.writeFileSync(this.filePath, data, 'utf8');
        } catch (error) {
            console.log('Error saving products to file:', error.message);
        }
    }

    generateId() {
        const id = crypto.randomBytes(6).toString('hex'); // Mantener los primeros 12 caracteres
        return id;
    }
    
    destroy(id) {
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            this.products.splice(index, 1);
            this.saveProducts();
            return true; // Indicar que la eliminación fue exitosa
        } else {
            return false; // Indicar que el producto no fue encontrado
        }
    }
}

export default ProductManager;

