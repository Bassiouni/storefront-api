import { Request, Response } from 'express'
import { ProductStore } from '../../models/products'

export async function getProductById(req: Request, res: Response) {
  const id = parseInt(req.params.id)
  const data = await ProductStore.show(id)
  res.status(200).json(data)
}
