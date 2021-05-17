import { DbLoadPatrimoniesByOwnerId } from '@/data/usecases'
import { LoadPatrimoniesByOwnerIdRepositorySpy } from '@/tests/data/mocks'
import { mockLoadPatrimoniesByOwnerIdParams } from '@/tests/domain/mocks'

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
    const params = mockLoadPatrimoniesByOwnerIdParams()
    await sut.loadByOwnerId(params)
    expect(loadPatrimoniesByOwnerIdRepositorySpy.params).toEqual(params)
  })

  test('Should return [] if LoadPatrimoniesByOwnerIdRepository returns empty array', async () => {
    const { sut, loadPatrimoniesByOwnerIdRepositorySpy } = makeSut()
    loadPatrimoniesByOwnerIdRepositorySpy.result.model = []
    const data = await sut.loadByOwnerId(mockLoadPatrimoniesByOwnerIdParams())
    expect(data.model).toEqual([])
  })

  test('Should return patrimony on success', async () => {
    const { sut, loadPatrimoniesByOwnerIdRepositorySpy } = makeSut()
    const data = await sut.loadByOwnerId(mockLoadPatrimoniesByOwnerIdParams())
    expect(data.model).toEqual(loadPatrimoniesByOwnerIdRepositorySpy.result.model)
  })

  test('Should throw if LoadPatrimoniesByOwnerIdRepository throws', async () => {
    const { sut, loadPatrimoniesByOwnerIdRepositorySpy } = makeSut()
    jest.spyOn(loadPatrimoniesByOwnerIdRepositorySpy, 'loadByOwnerId').mockRejectedValueOnce(new Error())
    const promise = sut.loadByOwnerId(mockLoadPatrimoniesByOwnerIdParams())
    await expect(promise).rejects.toThrow()
  })
})
