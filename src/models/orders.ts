import client from '../database'

export type OrderProducts = {
  id?: number
  quantity: number
  order_id: number
  product_id: number
}

export class OrderStore {
  static async show(userId: number): Promise<OrderProducts[]> {
    try {
      const sql =
        'SELECT op.id AS id, quantity, order_id, product_id FROM products p INNER JOIN order_products op ON p.id = op.product_id INNER JOIN orders o ON op.order_id=o.id AND o.user_id = $1'
      const conn = await client.connect()

      const result = await conn.query(sql, [userId])

      conn.release()

      return result.rows
    } catch (err) {
      throw new Error(`Could not find order ${userId}. Error: ${err}`)
    }
  }

  static async create(
    userId: number
  ): Promise<{ id: number; user_id: number }> {
    try {
      const sql = 'INSERT INTO orders (user_id) VALUES($1) RETURNING *'
      const conn = await client.connect()

      const result = await conn.query(sql, [userId])

      const order = result.rows[0]

      conn.release()

      return order
    } catch (err) {
      throw new Error(
        `Could not add new order for user ${userId}. Error: ${err}`
      )
    }
  }

  static async addProductToOrder(
    quantity: number,
    orderId: number,
    productId: number
  ): Promise<OrderProducts> {
    try {
      const sql =
        'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *'
      const conn = await client.connect()

      const result = await conn.query(sql, [quantity, orderId, productId])

      const order = result.rows[0]

      conn.release()

      return order
    } catch (err) {
      throw new Error(
        `Could not add product ${productId} to order ${orderId}: ${err}`
      )
    }
  }
}
