import * as express from 'express'
import { authUser } from '../auth'
import {
  createOrder,
  getCurrentOrderByUserId,
  addProductToExistingOrder,
} from '../utils/orders'

export const ordersApi = express.Router()

ordersApi.get('/:user_id', authUser, getCurrentOrderByUserId)
ordersApi.post('/', authUser, createOrder)
ordersApi.post('/:user_id/products', authUser, addProductToExistingOrder)
