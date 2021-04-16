import { DbLoadPatrimonyByOwnerId } from '@/data/usecases'
import { LoadPatrimonyByOwnerId } from '@/domain/usecases'
import { LoadPatrimonyByOwnerIdRepositorySpy } from '@/tests/data/mocks'

import faker from 'faker'

export const mockParams = (): LoadPatrimonyByOwnerId.Params => ({
  ownerId: faker.datatype.number()
})

type SutTypes = {
  sut: DbLoadPatrimonyByOwnerId
  loadPatrimonyByOwnerIdRepositorySpy: LoadPatrimonyByOwnerIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadPatrimonyByOwnerIdRepositorySpy = new LoadPatrimonyByOwnerIdRepositorySpy()
  const sut = new DbLoadPatrimonyByOwnerId(loadPatrimonyByOwnerIdRepositorySpy)
  return {
    sut,
    loadPatrimonyByOwnerIdRepositorySpy
  }
}

describe('DbLoadPatrimonyByOwnerId', () => {
  test('Should call LoadPatrimonyByOwnerIdRepository with correct value', async () => {
    const { sut, loadPatrimonyByOwnerIdRepositorySpy } = makeSut()
    const params = mockParams()
    await sut.loadByOwnerId(params)
    expect(loadPatrimonyByOwnerIdRepositorySpy.params).toEqual(params)
  })

  test('Should return null if LoadPatrimonyByOwnerIdRepository returns null', async () => {
    const { sut, loadPatrimonyByOwnerIdRepositorySpy } = makeSut()
    loadPatrimonyByOwnerIdRepositorySpy.model = null
    const data = await sut.loadByOwnerId(mockParams())
    expect(data).toBe(null)
  })

  test('Should return patrimony on success', async () => {
    const { sut, loadPatrimonyByOwnerIdRepositorySpy } = makeSut()
    const data = await sut.loadByOwnerId(mockParams())
    expect(data).toEqual(loadPatrimonyByOwnerIdRepositorySpy.model)
  })

  test('Should throw if LoadPatrimonyByOwnerIdRepository throws', async () => {
    const { sut, loadPatrimonyByOwnerIdRepositorySpy } = makeSut()
    jest.spyOn(loadPatrimonyByOwnerIdRepositorySpy, 'loadByOwnerId').mockRejectedValueOnce(new Error())
    const promise = sut.loadByOwnerId(mockParams())
    await expect(promise).rejects.toThrow()
  })
})
