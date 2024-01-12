import express from 'express'
// const path = require('path');
const server = express ()
import ProductManager from './src/server/data/fs/products.fs.js';
 import UserManager from './src/server/data/fs/users.fs.js';
import errorHandler from './src/server/middlewares/errorHandler.mid.js';
import pathHandler from './src/server/middlewares/pathHandler.mid.js';
import router from './src/server/routers/index.router.js';

const PORT = 9000;
const ready = ()=> console.log('server ready on port ' +PORT);
 
server.listen(PORT,ready);
 
//middlewares
server.use(express.json())
server.use(express.urlencoded({extended:true}));

//esto sacar el comentario
//server.use("./"",router)
//server.use(pathHandler)
//server.use(errorHandler)

const productManager = new ProductManager();
const userManager = new UserManager();

server.get("/", (req, res) => {
    try {
        res.json({ message: "Welcome my API" });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
});

// Endpoint para obtener todos los productos
server.get("/api/products", (req, res) => {
    try {
        const products = productManager.read();

        if (products.length > 0) {
            res.json({
                success: true,
                response: products
            });
        } else {
            throw new Error('No se encontraron productos');
        }
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message || 'Error interno del servidor'
        });
    }
});


// Endpoint para obtener un producto específico por su ID
server.get("/api/products/:pid", (req, res) => {
    const productId = req.params.pid;
    const product = productManager.readOne(productId);

    if (product) {
        res.json({
            success: true,
            response: product
        });
    } else {
        res.status(404).json({
            success: false,
            message: 'not found!'
        });
    }
});

// Endpoint para obtener todos los usuarios
server.get("/api/users", (req, res) => {
    const users = userManager.read();
    if (users.length > 0) {
        res.json({
            success: true,
            response: users
        });
    } else {
        res.status(404).json({
            success: false,
            message: 'not found!'
        });
    }
});

// Endpoint para obtener un usuario específico por su ID
server.get("/api/users/:uid", (req, res) => {
    const userId = req.params.uid;
    const user = userManager.readOne(userId);

    if (user) {
        res.json({
            success: true,
            response: user
        });
    } else {
        res.status(404).json({
            success: false,
            message: 'not found!'
        });
    }
});
