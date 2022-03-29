import { UserStore } from '../models'

export const createdUserInDatabase = {
  id: 1,
  firstname: 'FN',
  lastname: 'LN',
  password: 'passwd',
}

export function UserSpec() {
  describe('User Model', () => {
    it('should have an index method', () => {
      expect(UserStore.index).toBeDefined()
    })

    it('should have a show method', () => {
      expect(UserStore.show).toBeDefined()
    })

    it('should have a create method', () => {
      expect(UserStore.create).toBeDefined()
    })

    it('create method should add a user', async () => {
      const result = await UserStore.create(createdUserInDatabase)

      expect(result).toEqual(createdUserInDatabase)
    })

    it('index method should return a list of products', async () => {
      const result = await UserStore.index()
      expect(result).toEqual([createdUserInDatabase])
    })

    it('show method should return the correct product', async () => {
      const result = await UserStore.show(1)
      expect(result).toEqual(createdUserInDatabase)
    })
  })
}
