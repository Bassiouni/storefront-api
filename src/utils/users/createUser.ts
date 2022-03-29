import { Request, Response } from 'express'
import { UserStore } from '../../models/users'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

dotenv.config()

const {
  SALT_ROUNDS: saltRounds,
  BCRYPT_PASSWORD: pepper,
  TOKEN_SECRET,
} = process.env

export async function createUser(req: Request, res: Response) {
  const { firstname, lastname, password: pwd } = req.body
  const salt = await bcrypt.genSalt(parseInt(saltRounds as string))
  const password = await bcrypt.hash(pwd + pepper, salt)

  try {
    const createdUser = await UserStore.create({
      firstname,
      lastname,
      password,
    })
    const data = jwt.sign(createdUser, TOKEN_SECRET as string)
    res.status(200).json(data)
  } catch {
    res
      .status(400)
      .send('please provide a proper user JSON object to create a user')
  }
}
