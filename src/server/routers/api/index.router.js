import {Router} from 'express'
import usersRouter from './users.router.js'
import productsRouter from './products.router.js'
import ordersRouter from './orders.router.js'

const apiRouter = Router()
apiRouter.use("/products",productsRouter)
apiRouter.use("/users",usersRouter)
apiRouter.use("/orders",ordersRouter)
export default apiRouter