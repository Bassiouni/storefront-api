import { Request, Response } from 'express'
import { UserStore } from '../../models/users'

export async function getUserById(req: Request, res: Response) {
  const id = parseInt(req.params.id)
  const data = await UserStore.show(id)
  res.status(200).json(data)
}
