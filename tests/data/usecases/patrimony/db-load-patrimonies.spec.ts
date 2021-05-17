import { DbLoadPatrimonies } from '@/data/usecases'
import { LoadPatrimoniesRepositorySpy } from '@/tests/data/mocks'
import { mockLoadPatrimoniesParams } from '@/tests/domain/mocks'

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
    const params = mockLoadPatrimoniesParams()
    await sut.load(params)
    expect(loadPatrimoniesRepositorySpy.params).toEqual(params)
  })

  test('Should return empty array if LoadPatrimoniesRepository returns empty array', async () => {
    const { sut, loadPatrimoniesRepositorySpy } = makeSut()
    loadPatrimoniesRepositorySpy.result.model = []
    const data = await sut.load(mockLoadPatrimoniesParams())
    expect(data.model).toEqual([])
  })

  test('Should return owners on success', async () => {
    const { sut, loadPatrimoniesRepositorySpy } = makeSut()
    const data = await sut.load(mockLoadPatrimoniesParams())
    expect(data.model).toEqual(loadPatrimoniesRepositorySpy.result.model)
  })

  test('Should throw if LoadPatrimoniesRepository throws', async () => {
    const { sut, loadPatrimoniesRepositorySpy } = makeSut()
    jest.spyOn(loadPatrimoniesRepositorySpy, 'loadAll').mockRejectedValueOnce(new Error())
    const promise = sut.load(mockLoadPatrimoniesParams())
    await expect(promise).rejects.toThrow()
  })
})
