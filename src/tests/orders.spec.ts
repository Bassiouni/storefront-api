import { OrderStore } from '../models/orders'

export function OrderSpec() {
  describe('Order Model', () => {
    it('should have a show method', () => {
      expect(OrderStore.show).toBeDefined()
    })

    it('should have a create method', () => {
      expect(OrderStore.create).toBeDefined()
    })

    it('should have a addProductToOrder method', () => {
      expect(OrderStore.addProductToOrder).toBeDefined()
    })

    it('create method should add an order', async () => {
      const result = await OrderStore.create(1)

      expect(result).toEqual({
        id: 1,
        user_id: 1,
      })
    })

    it('addProductToOrder should add a product to the order of the user', async () => {
      const result = await OrderStore.addProductToOrder(3, 1, 1)
      expect(result).toEqual({ id: 1, quantity: 3, order_id: 1, product_id: 1 })
    })

    it('show method should return the correct order', async () => {
      const result = await OrderStore.show(1)
      expect(result).toEqual([
        {
          id: 1,
          product_id: 1,
          quantity: 3,
          order_id: 1,
        },
      ])
    })
  })
}
