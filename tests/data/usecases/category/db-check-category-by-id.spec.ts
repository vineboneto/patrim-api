import { DbCheckByIdCategory } from '@/data/usecases'
import { CheckSectorByIdRepositorySpy } from '@/tests/data/mocks'

import faker from 'faker'

describe('DbCheckCategoryById', () => {
  test('Should call CheckCategoryById with correct value', async () => {
    const checkSectorByIdRepositorySpy = new CheckSectorByIdRepositorySpy()
    const sut = new DbCheckByIdCategory(checkSectorByIdRepositorySpy)
    const id = faker.datatype.number()
    await sut.checkById(id)
    expect(checkSectorByIdRepositorySpy.id).toBe(id)
  })
})
