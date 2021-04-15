import { DbLoadPatrimonyByOwnerId } from '@/data/usecases'
import { LoadPatrimonyByOwnerIdRepositorySpy, mockLoadPatrimonyByOwnerIdRepositoryParams } from '@/tests/data/mocks'

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
    const params = mockLoadPatrimonyByOwnerIdRepositoryParams()
    await sut.loadByOwnerId(params)
    expect(loadPatrimonyByOwnerIdRepositorySpy.params).toEqual(params)
  })

  test('Should return null if LoadPatrimonyByOwnerIdRepository returns null', async () => {
    const { sut, loadPatrimonyByOwnerIdRepositorySpy } = makeSut()
    loadPatrimonyByOwnerIdRepositorySpy.model = null
    const data = await sut.loadByOwnerId(mockLoadPatrimonyByOwnerIdRepositoryParams())
    expect(data).toEqual(loadPatrimonyByOwnerIdRepositorySpy.model)
  })
})
