import { Request, Response } from 'express'
import { ProductStore } from '../../models/products'

export async function createProduct(req: Request, res: Response) {
  const name = req.body.name
  const price = parseInt(req.body.price)

  try {
    const data = await ProductStore.create({ name, price })

    res.status(200).json(data)
  } catch {
    res
      .status(400)
      .send('please provide a proper product JSON object to create a product')
  }
}
