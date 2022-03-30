import { Request, Response } from 'express'
import { OrderStore } from '../../models'

export async function addProductToExistingOrder(req: Request, res: Response) {
  const { quantity, order_id, product_id } = req.body
  try {
    const data = await OrderStore.addProductToOrder(
      parseInt(quantity),
      parseInt(order_id),
      parseInt(product_id)
    )
    res.status(200).json(data)
  } catch {
    res.send(`Could not add product ${product_id} to order ${order_id}`)
  }
}
