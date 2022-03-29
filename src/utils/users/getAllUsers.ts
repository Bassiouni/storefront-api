import { Request, Response } from 'express'
import { UserStore } from '../../models/users'

export async function getAllUsers(_req: Request, res: Response) {
  const data = await UserStore.index()

  res.status(200).json(data)
}
