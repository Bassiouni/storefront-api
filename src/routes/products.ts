import * as express from 'express'
import { authUser } from '../auth'
import {
  createProduct,
  getAllProducts,
  getProductById,
} from '../utils/products'

export const productsApi = express.Router()

productsApi.get('/', getAllProducts)
productsApi.get('/:id', getProductById)
productsApi.post('/', authUser, createProduct)
