import { DbCheckOwnerById } from '@/data/usecases'
import { CheckOwnerByIdRepositorySpy } from '@/tests/data/mocks'

import faker from 'faker'

type SutTypes = {
  sut: DbCheckOwnerById
  checkOwnerByIdRepositorySpy: CheckOwnerByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkOwnerByIdRepositorySpy = new CheckOwnerByIdRepositorySpy()
  const sut = new DbCheckOwnerById(checkOwnerByIdRepositorySpy)
  return {
    sut,
    checkOwnerByIdRepositorySpy
  }
}

describe('DbCheckOwnerById', () => {
  test('Should call CheckOwnerByIdRepository with correct value', async () => {
    const { sut, checkOwnerByIdRepositorySpy } = makeSut()
    const id = faker.datatype.number().toString()
    await sut.checkById(id)
    expect(checkOwnerByIdRepositorySpy.id).toBe(id)
  })

  test('Should return true if CheckOwnerByIdRepository return true', async () => {
    const { sut } = makeSut()
    const check = await sut.checkById(faker.datatype.number().toString())
    expect(check).toBe(true)
  })

  test('Should return false if CheckOwnerByIdRepository return false', async () => {
    const { sut, checkOwnerByIdRepositorySpy } = makeSut()
    checkOwnerByIdRepositorySpy.result = false
    const check = await sut.checkById(faker.datatype.number().toString())
    expect(check).toBe(false)
  })

  test('Should throws if CheckOwnerByIdRepository throws', async () => {
    const { sut, checkOwnerByIdRepositorySpy } = makeSut()
    jest.spyOn(checkOwnerByIdRepositorySpy, 'checkById').mockRejectedValueOnce(new Error())
    const promise = sut.checkById(faker.datatype.number().toString())
    await expect(promise).rejects.toThrow()
  })
})
