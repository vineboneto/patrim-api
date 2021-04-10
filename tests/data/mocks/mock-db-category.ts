import {
  AddCategoryRepository,
  CheckCategoryByNameRepository,
  DeleteCategoryRepository,
  LoadCategoriesRepository,
  CheckCategoryByIdRepository,
  SaveCategoryRepository
} from '@/data/protocols'
import { mockCategoriesModel, mockCategoryModel } from '@/tests/domain/mocks'

import faker from 'faker'

export class AddCategoryRepositorySpy implements AddCategoryRepository {
  params: AddCategoryRepository.Params
  result = true
  async add (category: AddCategoryRepository.Params): Promise<AddCategoryRepository.Result> {
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
  categoryModels = mockCategoriesModel()
  async loadAll (): Promise<LoadCategoriesRepository.Model> {
    this.callsCount++
    return this.categoryModels
  }
}

export class DeleteCategoryRepositorySpy implements DeleteCategoryRepository {
  model = mockCategoryModel()
  id = faker.datatype.number()
  async delete (id: number): Promise<DeleteCategoryRepository.Model> {
    this.id = id
    return this.model
  }
}

export class CheckCategoryByIdRepositorySpy implements CheckCategoryByIdRepository {
  result = true
  id = faker.datatype.number()
  async checkById (id: number): Promise<CheckCategoryByIdRepository.Result> {
    this.id = id
    return this.result
  }
}

export class SaveCategoryRepositorySpy implements SaveCategoryRepository {
  params: SaveCategoryRepository.Params
  result = true
  async save (category: SaveCategoryRepository.Params): Promise<SaveCategoryRepository.Result> {
    this.params = category
    return this.result
  }
}
