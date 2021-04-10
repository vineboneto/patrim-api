import { DbCheckSectorById } from '@/data/usecases'
import { CheckSectorByIdRepositorySpy } from '@/tests/data/mocks'

import faker from 'faker'

type SutTypes = {
  sut: DbCheckSectorById
  checkSectorByIdRepositorySpy: CheckSectorByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkSectorByIdRepositorySpy = new CheckSectorByIdRepositorySpy()
  const sut = new DbCheckSectorById(checkSectorByIdRepositorySpy)
  return {
    sut,
    checkSectorByIdRepositorySpy
  }
}

describe('DbCheckSectorById', () => {
  test('Should call CheckSectorByIdRepository with correct value', async () => {
    const { sut, checkSectorByIdRepositorySpy } = makeSut()
    const id = faker.datatype.number()
    await sut.checkById(id)
    expect(checkSectorByIdRepositorySpy.id).toBe(id)
  })

  test('Should return true if CheckSectorByIdRepository return true', async () => {
    const { sut } = makeSut()
    const check = await sut.checkById(faker.datatype.number())
    expect(check).toBe(true)
  })

  test('Should return false if CheckSectorByIdRepository return false', async () => {
    const { sut, checkSectorByIdRepositorySpy } = makeSut()
    checkSectorByIdRepositorySpy.result = false
    const check = await sut.checkById(faker.datatype.number())
    expect(check).toBe(false)
  })

  test('Should throws if CheckSectorByIdRepository throws', async () => {
    const { sut, checkSectorByIdRepositorySpy } = makeSut()
    jest.spyOn(checkSectorByIdRepositorySpy, 'checkById').mockRejectedValueOnce(new Error())
    const promise = sut.checkById(faker.datatype.number())
    await expect(promise).rejects.toThrow()
  })
})
