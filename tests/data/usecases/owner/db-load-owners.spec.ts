import { DbLoadOwners } from '@/data/usecases'
import { LoadOwnersRepositorySpy, mockLoadOwnersParams } from '@/tests/data/mocks'

type SutTypes = {
  sut: DbLoadOwners
  loadOwnersRepositorySpy: LoadOwnersRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadOwnersRepositorySpy = new LoadOwnersRepositorySpy()
  const sut = new DbLoadOwners(loadOwnersRepositorySpy)
  return {
    sut,
    loadOwnersRepositorySpy
  }
}

describe('DbLoadOwners', () => {
  test('Should call LoadOwnersRepository with correct value', async () => {
    const { sut, loadOwnersRepositorySpy } = makeSut()
    const params = mockLoadOwnersParams()
    await sut.load(params)
    expect(loadOwnersRepositorySpy.params).toEqual(params)
  })

  test('Should return empty array if LoadOwnersRepository returns empty array', async () => {
    const { sut, loadOwnersRepositorySpy } = makeSut()
    loadOwnersRepositorySpy.ownersModel = []
    const data = await sut.load(mockLoadOwnersParams())
    expect(data).toEqual([])
  })
})
