import { Request, Response } from 'express'
import { ProductStore } from '../../models/products'

export async function getAllProducts(_req: Request, res: Response) {
  const data = await ProductStore.index()
  res.status(200).json(data)
}
