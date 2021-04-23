import { DbLoadPatrimonyByNumber } from '@/data/usecases'
import { LoadPatrimonyByNumberRepositorySpy } from '@/tests/data/mocks'

import faker from 'faker'

type SutTypes = {
  sut: DbLoadPatrimonyByNumber
  loadPatrimonyByNumberRepositorySpy: LoadPatrimonyByNumberRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadPatrimonyByNumberRepositorySpy = new LoadPatrimonyByNumberRepositorySpy()
  const sut = new DbLoadPatrimonyByNumber(loadPatrimonyByNumberRepositorySpy)
  return {
    sut,
    loadPatrimonyByNumberRepositorySpy
  }
}

describe('DbLoadPatrimonyByNumber', () => {
  test('Should call LoadPatrimonyByNumberRepository with correct values', async () => {
    const { sut, loadPatrimonyByNumberRepositorySpy } = makeSut()
    const params = faker.datatype.number().toString()
    await sut.loadByNumber(params)
    expect(params).toEqual(loadPatrimonyByNumberRepositorySpy.number)
  })

  test('Should return null if LoadPatrimonyByNumberRepository return null', async () => {
    const { sut, loadPatrimonyByNumberRepositorySpy } = makeSut()
    loadPatrimonyByNumberRepositorySpy.model = null
    const data = await sut.loadByNumber(faker.datatype.number().toString())
    expect(data).toBe(null)
  })

  test('Should return patrimony on success', async () => {
    const { sut, loadPatrimonyByNumberRepositorySpy } = makeSut()
    const data = await sut.loadByNumber(faker.datatype.number().toString())
    expect(data).toEqual(loadPatrimonyByNumberRepositorySpy.model)
  })

  test('Should throws if LoadPatrimonyByNumberRepository throw', async () => {
    const { sut, loadPatrimonyByNumberRepositorySpy } = makeSut()
    jest.spyOn(loadPatrimonyByNumberRepositorySpy, 'loadByNumber').mockRejectedValueOnce(new Error())
    const promise = sut.loadByNumber(faker.datatype.number().toString())
    await expect(promise).rejects.toThrow()
  })
})
