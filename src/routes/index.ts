import * as express from 'express'
import { ordersApi } from './orders'
import { productsApi } from './products'
import { usersApi } from './users'

const router = express.Router()

router.use('/product', productsApi)
router.use('/user', usersApi)
router.use('/order', ordersApi)

export default router
