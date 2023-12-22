const fs = require('fs');
const path = require('path');

class ProductManager {
    constructor() {
        this.filePath = path.join(__dirname, 'data', 'products.json');
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
        return this.products.length > 0 ? this.products[this.products.length - 1].id + 1 : 1;
    }
}

class UserManager {
    constructor() {
        this.filePath = path.join(__dirname, 'data', 'users.json');
        this.loadUsers();
    }

    create(data) {
        const user = {
            id: this.generateId(),
            name: data.name,
            photo: data.photo,
            email: data.email
        };

        this.users.push(user);
        this.saveUsers();
        return user;
    }

    read() {
        return this.users;
    }

    readOne(id) {
        return this.users.find(user => user.id === id);
    }

    loadUsers() {
        try {
            const data = fs.readFileSync(this.filePath, 'utf8');
            this.users = JSON.parse(data);
        } catch (error) {
            this.users = [];
        }
    }

    saveUsers() {
        try {
            const data = JSON.stringify(this.users, null, 2);
            fs.writeFileSync(this.filePath, data, 'utf8');
        } catch (error) {
            console.log('Error saving users to file:', error.message);
        }
    }

    generateId() {
        return this.users.length > 0 ? this.users[this.users.length - 1].id + 1 : 1;
    }
}

// Crear la carpeta 'data' si no existe
const dataFolderPath = path.join(__dirname, 'data');
if (!fs.existsSync(dataFolderPath)) {
    fs.mkdirSync(dataFolderPath);
}

const productManager = new ProductManager();
const userManager = new UserManager();

// Ejemplos de uso
const product1 = productManager.create({
    title: 'Bomba de agua',
    photo: 'link',
    price: 34000,
    stock: 10
});

const user1 = userManager.create({
    name: 'PABLO GOMEZ',
    photo: 'foto no',
    email: 'pablo123@gmail.com'
});

// Imprimir resultados
console.log('Productos:', productManager.read());
console.log('Usuarios:', userManager.read());
console.log('Producto específico:', productManager.readOne(product1.id));
console.log('Usuario específico:', userManager.readOne(user1.id));
