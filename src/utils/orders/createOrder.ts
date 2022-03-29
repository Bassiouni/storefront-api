import { Request, Response } from 'express'
import { OrderStore } from '../../models/orders'
import * as jwt from 'jsonwebtoken'
import { User } from '../../models/users'
import * as dotenv from 'dotenv'

dotenv.config()

export async function createOrder(req: Request, res: Response) {
  const { token } = req.body
  try {
    const { id: user_id } = jwt.verify(
      token,
      process.env.TOKEN_SECRET as string
    ) as User

    if (!user_id) throw new Error()

    const data = await OrderStore.create(user_id as number)

    res.status(200).json(data)
  } catch {
    res
      .status(400)
      .send('please provide a proper order JSON object to create an order')
  }
}

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
