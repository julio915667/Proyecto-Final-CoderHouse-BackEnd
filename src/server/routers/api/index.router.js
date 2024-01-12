import {Router} from 'express'
import usersRouter from './users.router.js'
import productsRouter from './products.router.js'

const apiRouter = Router()
apiRouter.use("/products",productsRouter)
apiRouter.use("/users",usersRouter)
export default apiRouter