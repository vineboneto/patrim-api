import { DbCheckByIdCategory } from '@/data/usecases'
import { CheckCategoryByIdRepositorySpy } from '@/tests/data/mocks'

import faker from 'faker'

type SutTypes = {
  sut: DbCheckByIdCategory
  checkSectorByIdRepositorySpy: CheckCategoryByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkSectorByIdRepositorySpy = new CheckCategoryByIdRepositorySpy()
  const sut = new DbCheckByIdCategory(checkSectorByIdRepositorySpy)
  return {
    sut,
    checkSectorByIdRepositorySpy
  }
}

describe('DbCheckCategoryById', () => {
  test('Should call CheckCategoryById with correct value', async () => {
    const { sut, checkSectorByIdRepositorySpy } = makeSut()
    const id = faker.datatype.number()
    await sut.checkById(id)
    expect(checkSectorByIdRepositorySpy.id).toBe(id)
  })
})
