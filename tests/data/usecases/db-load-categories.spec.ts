import { DbLoadCategories } from '@/data/usecases'
import { LoadCategoriesRepositorySpy } from '@/tests/data/mocks'

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
  test('Should call LoadCategoriesRepository', async () => {
    const { sut, loadCategoriesRepositorySpy } = makeSut()
    await sut.load()
    expect(loadCategoriesRepositorySpy.callsCount).toBe(1)
  })

  test('Should returns categories on LoadCategoriesRepository success', async () => {
    const { sut, loadCategoriesRepositorySpy } = makeSut()
    const categories = await sut.load()
    expect(categories).toEqual(loadCategoriesRepositorySpy.categoryModels)
  })
})
