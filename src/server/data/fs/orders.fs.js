// OrdersManager.fs.js
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
 // Asegúrate de importar la función adecuada
import __dirname from './utils.js';
const currentDir = __dirname;
class OrdersManager {
    constructor() {
      
        this.filePath = path.join(currentDir, 'files/orders.json');

        this.orders = [];
        this.loadOrders();
    }

  

    generateId() {
        const id = crypto.randomBytes(6).toString('hex');
        return id;
    }

    create(data) {
        const newOrder = {
            id: this.generateId(),
            ...data,
        };

        this.orders.push(newOrder);
        this.saveOrders();
        return newOrder;
    }

    read() {
        console.log("Reading all orders:", this.orders);
        return this.orders;
    }

    readOne(id) {
        console.log("Reading order with ID:", id);
        return this.orders.find(order => order.id === id);
    }

    destroy(id) {
        const index = this.orders.findIndex(order => order.id === id);
        if (index !== -1) {
            this.orders.splice(index, 1);
            this.saveOrders();
            return true; // Éxito en la eliminación
        } else {
            return false; // No se encontró la orden
        }
    }

    loadOrders() {
        try {
            const data = fs.readFileSync(this.filePath, 'utf8');
            this.orders = JSON.parse(data);
        } catch (error) {
            console.error('Error loading orders:', error.message);
            this.orders = [];
        }
    }

    saveOrders() {
        try {
            const data = JSON.stringify(this.orders, null, 2);
            fs.writeFileSync(this.filePath, data, 'utf8');
        } catch (error) {
            console.log('Error saving orders to file:', error.message);
        }
    }
}

export default OrdersManager;
