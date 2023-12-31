import express from 'express'
// const path = require('path');
const server = express ()
 import ProductManager from './server/data/fs/products.fs.js';
 import UserManager from './server/data/fs/user.fs.js';
const PORT = 8080;
const ready = ()=> console.log('server ready on port ' +PORT);
 
server.listen(PORT,ready);
 
//middlewares
server.use(express.urlencoded({extended:true}));
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

server.get("/api/products", (req, res) => {
    try {
        const products = productManager.read();
        if (products.length > 0) {
            res.json({
                success: true,
                response: products
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'not found!'
            });
        }
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({
            success: false,
            message: 'internal server error'
        });
    }
});


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


server.get("/api/user",(req, res) => {
    try {
        const users = userManager.read();
        if (users.length > 0) {
            res.json({
                success: true,
                response: products
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'not found!'
            });
        }
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({
            success: false,
            message: 'internal server error'
        });
    }
});

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