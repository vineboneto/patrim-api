import { DbCheckCategoryById } from '@/data/usecases'
import { CheckCategoryByIdRepositorySpy } from '@/tests/data/mocks'

import faker from 'faker'

type SutTypes = {
  sut: DbCheckCategoryById
  checkCategoryByIdRepositorySpy: CheckCategoryByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkCategoryByIdRepositorySpy = new CheckCategoryByIdRepositorySpy()
  const sut = new DbCheckCategoryById(checkCategoryByIdRepositorySpy)
  return {
    sut,
    checkCategoryByIdRepositorySpy
  }
}

describe('DbCheckCategoryById', () => {
  test('Should call CheckCategoryByIdRepository with correct value', async () => {
    const { sut, checkCategoryByIdRepositorySpy } = makeSut()
    const id = faker.datatype.number()
    await sut.checkById(id)
    expect(checkCategoryByIdRepositorySpy.id).toBe(id)
  })

  test('Should return true if CheckCategoryByIdRepository return true', async () => {
    const { sut } = makeSut()
    const check = await sut.checkById(faker.datatype.number())
    expect(check).toBe(true)
  })

  test('Should return false if CheckCategoryByIdRepository return false', async () => {
    const { sut, checkCategoryByIdRepositorySpy } = makeSut()
    checkCategoryByIdRepositorySpy.result = false
    const check = await sut.checkById(faker.datatype.number())
    expect(check).toBe(false)
  })

  test('Should throws if CheckCategoryByIdRepository throws', async () => {
    const { sut, checkCategoryByIdRepositorySpy } = makeSut()
    jest.spyOn(checkCategoryByIdRepositorySpy, 'checkById').mockRejectedValueOnce(new Error())
    const promise = sut.checkById(faker.datatype.number())
    await expect(promise).rejects.toThrow()
  })
})
