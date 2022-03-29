import * as express from 'express'
import { authUser } from '../auth'
import { createUser, getAllUsers, getUserById } from '../utils/users'

export const usersApi = express.Router()

usersApi.get('/', authUser, getAllUsers)
usersApi.get('/:id', authUser, getUserById)
usersApi.post('/', createUser)
