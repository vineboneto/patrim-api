import {
  AddCategoryRepository,
  CheckCategoryByNameRepository,
  DeleteCategoryRepository,
  LoadCategoriesRepository,
  CheckCategoryByIdRepository,
  UpdateCategoryRepository
} from '@/data/protocols'
import {
  mockAddCategoryParams,
  mockCategoriesModel,
  mockCategoryModel,
  mockCheckCategoryByIdParams,
  mockDeleteCategoryParams
} from '@/tests/domain/mocks'

import faker from 'faker'

export const mockAddCategoryRepositoryParams = (): AddCategoryRepository.Params => mockAddCategoryParams()

export const mockCheckCategoryByIdRepositoryParams = (): CheckCategoryByIdRepository.Params => mockCheckCategoryByIdParams()

export const mockDeleteCategoryRepositoryParams = (): DeleteCategoryRepository.Params => mockDeleteCategoryParams()

export const mockUpdateCategoryRepositoryParams = (): UpdateCategoryRepository.Params => ({
  id: faker.datatype.number(),
  name: faker.name.findName()
})

export class AddCategoryRepositorySpy implements AddCategoryRepository {
  params: AddCategoryRepository.Params
  result = true
  async add (params: AddCategoryRepository.Params): Promise<AddCategoryRepository.Result> {
    this.params = params
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
  models = mockCategoriesModel()
  async loadAll (): Promise<LoadCategoriesRepository.Model> {
    this.callsCount++
    return this.models
  }
}

export class DeleteCategoryRepositorySpy implements DeleteCategoryRepository {
  model = mockCategoryModel()
  params: DeleteCategoryRepository.Params
  async delete (params: DeleteCategoryRepository.Params): Promise<DeleteCategoryRepository.Model> {
    this.params = params
    return this.model
  }
}

export class CheckCategoryByIdRepositorySpy implements CheckCategoryByIdRepository {
  params: CheckCategoryByIdRepository.Params
  result = true
  async checkById (params: CheckCategoryByIdRepository.Params): Promise<CheckCategoryByIdRepository.Result> {
    this.params = params
    return this.result
  }
}

export class UpdateCategoryRepositorySpy implements UpdateCategoryRepository {
  params: UpdateCategoryRepository.Params
  result = true
  async update (category: UpdateCategoryRepository.Params): Promise<UpdateCategoryRepository.Result> {
    this.params = category
    return this.result
  }
}
