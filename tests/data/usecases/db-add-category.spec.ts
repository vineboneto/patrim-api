import { DbAddCategory } from '@/data/usecases/db-add-category'

describe('DbAddCategory', () => {
  test('DbAddCategory should return true on success', async () => {
    const sut = new DbAddCategory()
    const isValid = await sut.add({ name: 'any_name' })
    expect(isValid).toBeTruthy()
  })
})
