import { ProductStore } from '../models'

export const createProductInDatabase = {
  id: 1,
  name: 'test name',
  price: 20,
}

export function ProductSpec() {
  describe('Product Model', () => {
    it('should have an index method', () => {
      expect(ProductStore.index).toBeDefined()
    })

    it('should have a show method', () => {
      expect(ProductStore.show).toBeDefined()
    })

    it('should have a create method', () => {
      expect(ProductStore.create).toBeDefined()
    })

    it('create method should add a product', async () => {
      const result = await ProductStore.create(createProductInDatabase)
      expect(result).toEqual(createProductInDatabase)
    })

    it('index method should return a list of products', async () => {
      const result = await ProductStore.index()
      expect(result).toEqual([createProductInDatabase])
    })

    it('show method should return the correct product', async () => {
      const result = await ProductStore.show(1)
      expect(result).toEqual(createProductInDatabase)
    })
  })
}
