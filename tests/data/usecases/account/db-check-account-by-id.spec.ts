import { DbCheckAccountById } from '@/data/usecases'
import { CheckAccountByIdRepositorySpy } from '@/tests/data/mocks'

import faker from 'faker'

type SutTypes = {
  sut: DbCheckAccountById
  checkAccountByIdRepositorySpy: CheckAccountByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkAccountByIdRepositorySpy = new CheckAccountByIdRepositorySpy()
  const sut = new DbCheckAccountById(checkAccountByIdRepositorySpy)
  return {
    sut,
    checkAccountByIdRepositorySpy
  }
}

describe('DbCheckAccountById', () => {
  test('Should call CheckAccountByIdRepository with correct value', async () => {
    const { sut, checkAccountByIdRepositorySpy } = makeSut()
    const id = faker.datatype.number().toString()
    await sut.checkById(id)
    expect(checkAccountByIdRepositorySpy.id).toBe(id)
  })

  test('Should return true if CheckAccountByIdRepository return true', async () => {
    const { sut } = makeSut()
    const check = await sut.checkById(faker.datatype.number().toString())
    expect(check).toBe(true)
  })

  test('Should return false if CheckAccountByIdRepository return false', async () => {
    const { sut, checkAccountByIdRepositorySpy } = makeSut()
    checkAccountByIdRepositorySpy.result = false
    const check = await sut.checkById(faker.datatype.number().toString())
    expect(check).toBe(false)
  })

  test('Should throws if CheckAccountByIdRepository throws', async () => {
    const { sut, checkAccountByIdRepositorySpy } = makeSut()
    jest.spyOn(checkAccountByIdRepositorySpy, 'checkById').mockRejectedValueOnce(new Error())
    const promise = sut.checkById(faker.datatype.number().toString())
    await expect(promise).rejects.toThrow()
  })
})
