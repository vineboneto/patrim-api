import { DbLoadPatrimoniesByOwnerId } from '@/data/usecases'
import {
  LoadPatrimoniesByOwnerIdRepositorySpy,
  mockLoadPatrimoniesByOwnerIdRepositoryParams
} from '@/tests/data/mocks'

type SutTypes = {
  sut: DbLoadPatrimoniesByOwnerId
  loadPatrimoniesByOwnerIdRepositorySpy: LoadPatrimoniesByOwnerIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadPatrimoniesByOwnerIdRepositorySpy = new LoadPatrimoniesByOwnerIdRepositorySpy()
  const sut = new DbLoadPatrimoniesByOwnerId(loadPatrimoniesByOwnerIdRepositorySpy)
  return {
    sut,
    loadPatrimoniesByOwnerIdRepositorySpy
  }
}

describe('DbLoadPatrimoniesByOwnerId', () => {
  test('Should call LoadPatrimoniesByOwnerIdRepository with correct value', async () => {
    const { sut, loadPatrimoniesByOwnerIdRepositorySpy } = makeSut()
    const params = mockLoadPatrimoniesByOwnerIdRepositoryParams()
    await sut.loadByOwnerId(params)
    expect(loadPatrimoniesByOwnerIdRepositorySpy.params).toEqual(params)
  })

  test('Should return [] if LoadPatrimoniesByOwnerIdRepository returns empty array', async () => {
    const { sut, loadPatrimoniesByOwnerIdRepositorySpy } = makeSut()
    loadPatrimoniesByOwnerIdRepositorySpy.model = []
    const data = await sut.loadByOwnerId(mockLoadPatrimoniesByOwnerIdRepositoryParams())
    expect(data).toEqual([])
  })

  test('Should return patrimony on success', async () => {
    const { sut, loadPatrimoniesByOwnerIdRepositorySpy } = makeSut()
    const data = await sut.loadByOwnerId(mockLoadPatrimoniesByOwnerIdRepositoryParams())
    expect(data).toEqual(loadPatrimoniesByOwnerIdRepositorySpy.model)
  })

  test('Should throw if LoadPatrimoniesByOwnerIdRepository throws', async () => {
    const { sut, loadPatrimoniesByOwnerIdRepositorySpy } = makeSut()
    jest.spyOn(loadPatrimoniesByOwnerIdRepositorySpy, 'loadByOwnerId').mockRejectedValueOnce(new Error())
    const promise = sut.loadByOwnerId(mockLoadPatrimoniesByOwnerIdRepositoryParams())
    await expect(promise).rejects.toThrow()
  })
})
