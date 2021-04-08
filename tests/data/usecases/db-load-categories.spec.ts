import { DbLoadCategories } from '@/data/usecases'
import { LoadCategoriesRepository } from '@/data/protocols'
import { mockCategoryModels } from '@/tests/domain/mocks'

class LoadCategoriesRepositorySpy implements LoadCategoriesRepository {
  callsCount = 0
  categoryModels = mockCategoryModels()
  async loadAll (): Promise<LoadCategoriesRepository.Model> {
    this.callsCount++
    return this.categoryModels
  }
}

describe('DbLoadCategories', () => {
  test('Should call LoadCategoriesRepository', async () => {
    const loadCategoriesRepositorySpy = new LoadCategoriesRepositorySpy()
    const sut = new DbLoadCategories(loadCategoriesRepositorySpy)
    await sut.load()
    expect(loadCategoriesRepositorySpy.callsCount).toBe(1)
  })
})
