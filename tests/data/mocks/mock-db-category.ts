import {
  AddCategoryRepository,
  CheckCategoryByNameRepository,
  LoadCategoriesRepository
} from '@/data/protocols'
import { mockCategoryModels } from '@/tests/domain/mocks'

export class AddCategoryRepositorySpy implements AddCategoryRepository {
  params: AddCategoryRepository.Params
  result = true
  async addCategory (category: AddCategoryRepository.Params): Promise<AddCategoryRepository.Model> {
    this.params = category
    return this.result
  }
}

export class CheckCategoryByNameRepositorySpy implements CheckCategoryByNameRepository {
  name: string
  result = false
  async checkByName (name: string): Promise<boolean> {
    this.name = name
    return this.result
  }
}

export class LoadCategoriesRepositorySpy implements LoadCategoriesRepository {
  callsCount = 0
  categoryModels = mockCategoryModels()
  async loadAll (): Promise<LoadCategoriesRepository.Model> {
    this.callsCount++
    return this.categoryModels
  }
}
