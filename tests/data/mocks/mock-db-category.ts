import {
  AddCategoryRepository,
  CheckCategoryByNameRepository,
  DeleteCategoryRepository,
  LoadCategoriesRepository,
  CheckCategoryByIdRepository,
  UpdateCategoryRepository
} from '@/data/protocols'
import { mockCategoriesModel, mockCategoryModel } from '@/tests/domain/mocks'

import faker from 'faker'

export const mockAddCategoryParams = (): AddCategoryRepository.Params => ({
  name: faker.name.jobType()
})

export const mockAddCategoriesParams = (): AddCategoryRepository.Params[] => ([
  mockAddCategoryParams(),
  mockAddCategoryParams(),
  mockAddCategoryParams()
])

export const mockUpdateCategoryParams = (): UpdateCategoryRepository.Params => ({
  id: faker.datatype.number().toString(),
  name: faker.name.findName()
})

export class AddCategoryRepositorySpy implements AddCategoryRepository {
  callsCount = 0
  params: AddCategoryRepository.Params
  result = true
  async add (category: AddCategoryRepository.Params): Promise<AddCategoryRepository.Result> {
    this.callsCount++
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
  id = faker.datatype.number().toString()
  async delete (id: string): Promise<DeleteCategoryRepository.Model> {
    this.id = id
    return this.model
  }
}

export class CheckCategoryByIdRepositorySpy implements CheckCategoryByIdRepository {
  result = true
  id = faker.datatype.number().toString()
  async checkById (id: string): Promise<CheckCategoryByIdRepository.Result> {
    this.id = id
    return this.result
  }
}

export class UpdateCategoryRepositorySpy implements UpdateCategoryRepository {
  callsCount = 0
  params: UpdateCategoryRepository.Params
  result = true
  async update (category: UpdateCategoryRepository.Params): Promise<UpdateCategoryRepository.Result> {
    this.callsCount++
    this.params = category
    return this.result
  }
}
