import { Router } from 'express';
import ProductManager from '../../data/fs/products.fs.js';

const productsRouter = Router();
const productManager = new ProductManager();

// Obtener todos los productos
productsRouter.get("/", (req, res) => {
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

// Obtener un producto específico por su ID
productsRouter.get("/:pid", (req, res) => {
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

// Agregar un nuevo producto
productsRouter.post("/", (req, res) => {
   
});

// Actualizar un producto existente por su ID
productsRouter.put("/:pid", (req, res) => {
    
});

// Eliminar un producto por su ID
productsRouter.delete("/:pid", (req, res) => {
    
});

export default productsRouter;
