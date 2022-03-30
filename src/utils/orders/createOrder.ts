import { Request, Response } from 'express'
import { OrderStore } from '../../models/orders'

export async function createOrder(_req: Request, res: Response) {
  try {
    const data = await OrderStore.create(res.locals.user.id)

    res.status(200).json(data)
  } catch {
    res
      .status(400)
      .send('please provide a proper order JSON object to create an order')
  }
}
