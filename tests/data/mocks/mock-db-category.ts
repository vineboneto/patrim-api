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
  mockDeleteCategoryParams,
  mockLoadCategoriesParams,
  mockUpdateCategoryParams
} from '@/tests/domain/mocks'

export const mockAddCategoryRepositoryParams = ():
AddCategoryRepository.Params => mockAddCategoryParams()

export const mockCheckCategoryByIdRepositoryParams = ():
CheckCategoryByIdRepository.Params => mockCheckCategoryByIdParams()

export const mockDeleteCategoryRepositoryParams = ():
DeleteCategoryRepository.Params => mockDeleteCategoryParams()

export const mockLoadCategoriesRepositoryParams = ():
LoadCategoriesRepository.Params => mockLoadCategoriesParams()

export const mockUpdateCategoryRepositoryParams = ():
UpdateCategoryRepository.Params => mockUpdateCategoryParams()

export class AddCategoryRepositorySpy implements AddCategoryRepository {
  params: AddCategoryRepository.Params
  model = mockCategoryModel()
  async add (params: AddCategoryRepository.Params): Promise<AddCategoryRepository.Model> {
    this.params = params
    return this.model
  }
}

export class UpdateCategoryRepositorySpy implements UpdateCategoryRepository {
  params: UpdateCategoryRepository.Params
  model = mockCategoryModel()
  async update (category: UpdateCategoryRepository.Params): Promise<UpdateCategoryRepository.Model> {
    this.params = category
    return this.model
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

export class CheckCategoryByIdRepositorySpy implements CheckCategoryByIdRepository {
  params: CheckCategoryByIdRepository.Params
  result = true
  async checkById (params: CheckCategoryByIdRepository.Params): Promise<CheckCategoryByIdRepository.Result> {
    this.params = params
    return this.result
  }
}

export class LoadCategoriesRepositorySpy implements LoadCategoriesRepository {
  params: LoadCategoriesRepository.Params
  models = mockCategoriesModel()

  async loadAll (params: LoadCategoriesRepository.Params): Promise<LoadCategoriesRepository.Model> {
    this.params = params
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
