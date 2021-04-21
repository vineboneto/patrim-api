import { DbLoadPatrimonies } from '@/data/usecases'
import { LoadPatrimoniesRepositorySpy, mockLoadPatrimoniesRepositoryParams } from '@/tests/data/mocks'

type SutTypes = {
  sut: DbLoadPatrimonies
  loadPatrimoniesRepositorySpy: LoadPatrimoniesRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadPatrimoniesRepositorySpy = new LoadPatrimoniesRepositorySpy()
  const sut = new DbLoadPatrimonies(loadPatrimoniesRepositorySpy)
  return {
    sut,
    loadPatrimoniesRepositorySpy
  }
}

describe('DbLoadPatrimonies', () => {
  test('Should call LoadPatrimoniesRepository with correct value', async () => {
    const { sut, loadPatrimoniesRepositorySpy } = makeSut()
    const params = mockLoadPatrimoniesRepositoryParams()
    await sut.load(params)
    expect(loadPatrimoniesRepositorySpy.params).toEqual(params)
  })

  test('Should return empty array if LoadPatrimoniesRepository returns empty array', async () => {
    const { sut, loadPatrimoniesRepositorySpy } = makeSut()
    loadPatrimoniesRepositorySpy.models = []
    const data = await sut.load(mockLoadPatrimoniesRepositoryParams())
    expect(data).toEqual([])
  })

  test('Should return owners on success', async () => {
    const { sut, loadPatrimoniesRepositorySpy } = makeSut()
    const data = await sut.load(mockLoadPatrimoniesRepositoryParams())
    expect(data).toEqual(loadPatrimoniesRepositorySpy.models)
  })

  test('Should throw if LoadPatrimoniesRepository throws', async () => {
    const { sut, loadPatrimoniesRepositorySpy } = makeSut()
    jest.spyOn(loadPatrimoniesRepositorySpy, 'loadAll').mockRejectedValueOnce(new Error())
    const promise = sut.load(mockLoadPatrimoniesRepositoryParams())
    await expect(promise).rejects.toThrow()
  })
})
