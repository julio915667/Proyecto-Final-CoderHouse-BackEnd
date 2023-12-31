// const fs = require('fs');
// const path = require('path');
// const crypto = require('crypto');
import fs from "fs"
import path from "path"
import crypto from "crypto"
class ProductManager {
    constructor() {
        this.filePath = path.join(__dirname, 'data', './files/products.json');
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
        return product;
    }

    read() {
        return this.products;
    }

    readOne(id) {
        return this.products.find(product => product.id === id);
    }

    loadProducts() {
        try {
            const data = fs.readFileSync(this.filePath, 'utf8');
            this.products = JSON.parse(data);
        } catch (error) {
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
        const id = crypto.randomBytes(6).toString('hex'); // Generate a 12-character hex ID
        return id;
    }
}

export default ProductManager;
