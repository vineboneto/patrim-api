import { DbLoadCategories } from '@/data/usecases'
import { LoadCategoriesRepositorySpy } from '@/tests/data/mocks'
import { mockLoadCategoriesParams } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbLoadCategories
  loadCategoriesRepositorySpy: LoadCategoriesRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadCategoriesRepositorySpy = new LoadCategoriesRepositorySpy()
  const sut = new DbLoadCategories(loadCategoriesRepositorySpy)
  return {
    sut,
    loadCategoriesRepositorySpy
  }
}

describe('DbLoadCategories', () => {
  test('Should call LoadCategoriesRepository with correct value', async () => {
    const { sut, loadCategoriesRepositorySpy } = makeSut()
    const params = mockLoadCategoriesParams()
    await sut.load(params)
    expect(loadCategoriesRepositorySpy.params).toEqual(params)
  })

  test('Should returns categories on LoadCategoriesRepository success', async () => {
    const { sut, loadCategoriesRepositorySpy } = makeSut()
    const categories = await sut.load(mockLoadCategoriesParams())
    expect(categories).toEqual(loadCategoriesRepositorySpy.models)
  })

  test('Should throw if LoadCategoriesRepository throws', async () => {
    const { sut, loadCategoriesRepositorySpy } = makeSut()
    jest.spyOn(loadCategoriesRepositorySpy, 'loadAll').mockRejectedValueOnce(new Error())
    const promise = sut.load(mockLoadCategoriesParams())
    await expect(promise).rejects.toThrow()
  })
})
