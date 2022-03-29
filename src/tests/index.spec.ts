import { UserSpec, createdUserInDatabase } from './users.spec'
import { OrderSpec } from './orders.spec'
import { ProductSpec, createProductInDatabase } from './products.spec'
import { app } from '../server'
import supertest from 'supertest'
import { Response } from 'superagent'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()

UserSpec()
ProductSpec()
OrderSpec()

const request = supertest(app)
let res: Response
const globals = {
  token: '',
  id: 2,
  name: 'ProDuctSpec',
  price: 20,
  quantity: 1,
  product_id: 1,
}

describe('Testing /user endpont', async () => {
  it('creates a user', async () => {
    res = await request.post('/user').send({
      firstname: 'John',
      lastname: 'Doe',
      password: 'password',
    })
    expect(res.status).toEqual(200)
    globals.token = res.body
  })

  it('connects to the server with 200 OK', async () => {
    res = await request.get('/user').send(globals)
    expect(res.status).toEqual(200)
  })

  const { SALT_ROUNDS: saltRounds, BCRYPT_PASSWORD: pepper } = process.env
  const salt = await bcrypt.genSalt(parseInt(saltRounds as string))
  const password = await bcrypt.hash('password' + pepper, salt)

  it('views the created users', async () => {
    res = await request.get('/user').send(globals)
    expect(res.status).toEqual(200)
    expect(res.body).toEqual([
      createdUserInDatabase,
      {
        id: 2,
        firstname: 'John',
        lastname: 'Doe',
        password,
      },
    ])
  })

  it('views the created second user', async () => {
    res = await request.get('/user/2').send(globals)
    expect(res.status).toEqual(200)
    expect(res.body).toEqual({
      id: 2,
      firstname: 'John',
      lastname: 'Doe',
      password,
    })
  })
})

describe('Testing /product endpoint', () => {
  beforeAll(async () => {
    res = await request.get('/product')
  })

  it('status 200', () => {
    expect(res.statusCode).toEqual(200)
  })

  it('response data is valid', () => {
    expect(res.body).toEqual([createProductInDatabase])
  })

  it('creates a new product', async () => {
    res = await request.post('/product').send(globals)
    expect(res.status).toEqual(200)
  })

  it('checks for created product', async () => {
    res = await request.get('/product/2')
    expect(res.body).toEqual({
      id: globals.id,
      name: globals.name,
      price: globals.price,
    })
  })

  it('gets a single created product', async () => {
    res = await request.get('/product/2')
    expect(res.status).toEqual(200)
    expect(res.body).toEqual({
      id: globals.id,
      name: globals.name,
      price: globals.price,
    })
  })
})

describe('Testing /orders endpoint', () => {
  beforeAll(async () => {
    res = await request.get('/order/2').send(globals)
  })

  it('gets the orders of current user with status 200', () => {
    expect(res.status).toEqual(200)
    expect(res.body).toEqual([])
  })

  it('creates a new order', async () => {
    res = await request.post('/order').send(globals)
    expect(res.status).toEqual(200)
  })

  it('checks for orders list', async () => {
    res = await request.get('/order/2').send(globals)
    expect(res.status).toEqual(200)
    expect(res.body).toEqual([
      {
        id: globals.id,
        quantity: globals.quantity,
        user_id: globals.id,
        product_id: globals.product_id,
      },
    ])
  })
})
