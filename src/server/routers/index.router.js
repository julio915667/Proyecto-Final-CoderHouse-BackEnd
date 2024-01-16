
import {Router} from 'express'
import apiRouter from './api/index.router.js'
import viewRouter from './view/index.view.js'

const router = Router()
router.use("/api", apiRouter)
router.use("/", viewRouter)
export default router