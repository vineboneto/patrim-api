import { DbCheckPlaceById } from '@/data/usecases'
import { CheckPlaceByIdRepositorySpy } from '@/tests/data/mocks'

import faker from 'faker'

type SutTypes = {
  sut: DbCheckPlaceById
  checkPlaceByIdRepositorySpy: CheckPlaceByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkPlaceByIdRepositorySpy = new CheckPlaceByIdRepositorySpy()
  const sut = new DbCheckPlaceById(checkPlaceByIdRepositorySpy)
  return {
    sut,
    checkPlaceByIdRepositorySpy
  }
}

describe('DbCheckPlaceById', () => {
  test('Should call CheckPlaceByIdRepository with correct value', async () => {
    const { sut, checkPlaceByIdRepositorySpy } = makeSut()
    const id = faker.datatype.number().toString()
    await sut.checkById(id)
    expect(checkPlaceByIdRepositorySpy.id).toBe(id)
  })

  test('Should return true if CheckPlaceByIdRepository return true', async () => {
    const { sut } = makeSut()
    const check = await sut.checkById(faker.datatype.number().toString())
    expect(check).toBe(true)
  })

  test('Should return false if CheckPlaceByIdRepository return false', async () => {
    const { sut, checkPlaceByIdRepositorySpy } = makeSut()
    checkPlaceByIdRepositorySpy.result = false
    const check = await sut.checkById(faker.datatype.number().toString())
    expect(check).toBe(false)
  })

  test('Should throws if CheckPlaceByIdRepository throws', async () => {
    const { sut, checkPlaceByIdRepositorySpy } = makeSut()
    jest.spyOn(checkPlaceByIdRepositorySpy, 'checkById').mockRejectedValueOnce(new Error())
    const promise = sut.checkById(faker.datatype.number().toString())
    await expect(promise).rejects.toThrow()
  })
})
