import { Request, Response } from 'express'
import { OrderStore } from '../../models/orders'

export async function getCurrentOrderByUserId(req: Request, res: Response) {
  try {
    const user_id = parseInt(req.params.user_id)

    if (!user_id) throw new Error()

    const data = await OrderStore.show(user_id)

    res.status(200).json(data)
  } catch {
    res.status(400)
  }
}
