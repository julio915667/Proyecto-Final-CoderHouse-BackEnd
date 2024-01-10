import {Router} from 'express'
const productsRouter = Router()
productsRouter.post("/", (req, res)=>{})
productsRouter.get("/", (req, res)=>{})
productsRouter.get("/:pid", (req, res)=>{})
productsRouter.put("/:pid", (req, res)=>{})
productsRouter.delete("/:pid", (req, res)=>{})
export default productsRouter