import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import __dirname from './utils.js';
const currentDir = __dirname;

class ProductManager {
    constructor() {
        this.filePath = path.join(currentDir, 'files/products.json');
        this.products = [];
        this.loadProducts();
    }

    generateId() {
        const id = crypto.randomBytes(6).toString('hex');
        return id;
    }

    create(data) {
        const newProduct = {
            id: this.generateId(),
            ...data,
        };

        this.products.push(newProduct);
        this.saveProducts();
        return newProduct;
    }

    read() {
        console.log("Reading all products:", this.products);
        return this.products;
    }

    readOne(id) {
        console.log("Reading product with ID:", id);
        return this.products.find(product => product.id === id);
    }

    destroy(id) {
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            this.products.splice(index, 1);
            this.saveProducts();
            return true; // Éxito en la eliminación
        } else {
            return false; // No se encontró el producto
        }
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
}

export default ProductManager;
