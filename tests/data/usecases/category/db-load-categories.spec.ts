import { DbLoadCategories } from '@/data/usecases'
import { LoadCategoriesRepositorySpy, mockLoadCategoriesRepositoryParams } from '@/tests/data/mocks'

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
    const params = mockLoadCategoriesRepositoryParams()
    await sut.load(params)
    expect(loadCategoriesRepositorySpy.params).toEqual(params)
  })

  test('Should returns categories on LoadCategoriesRepository success', async () => {
    const { sut, loadCategoriesRepositorySpy } = makeSut()
    const categories = await sut.load(mockLoadCategoriesRepositoryParams())
    expect(categories).toEqual(loadCategoriesRepositorySpy.models)
  })

  test('Should throw if LoadCategoriesRepository throws', async () => {
    const { sut, loadCategoriesRepositorySpy } = makeSut()
    jest.spyOn(loadCategoriesRepositorySpy, 'loadAll').mockRejectedValueOnce(new Error())
    const promise = sut.load(mockLoadCategoriesRepositoryParams())
    await expect(promise).rejects.toThrow()
  })
})
