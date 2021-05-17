import { DbLoadOwners } from '@/data/usecases'
import { LoadOwnersRepositorySpy } from '@/tests/data/mocks'
import { mockLoadOwnersParams } from '@/tests/domain/mocks'

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
    loadOwnersRepositorySpy.result.model = []
    const data = await sut.load(mockLoadOwnersParams())
    expect(data.model).toEqual([])
  })

  test('Should return owners on success', async () => {
    const { sut, loadOwnersRepositorySpy } = makeSut()
    const data = await sut.load(mockLoadOwnersParams())
    expect(data.model).toEqual(loadOwnersRepositorySpy.result.model)
  })

  test('Should throw if LoadOwnersRepository throws', async () => {
    const { sut, loadOwnersRepositorySpy } = makeSut()
    jest.spyOn(loadOwnersRepositorySpy, 'loadAll').mockRejectedValueOnce(new Error())
    const promise = sut.load(mockLoadOwnersParams())
    await expect(promise).rejects.toThrow()
  })
})
