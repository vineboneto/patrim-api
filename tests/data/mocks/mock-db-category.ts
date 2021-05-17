import {
  AddCategoryRepository,
  CheckCategoryByNameRepository,
  DeleteCategoryRepository,
  LoadCategoriesRepository,
  CheckCategoryByIdRepository,
  UpdateCategoryRepository,
  LoadCategoryNameByIdRepository
} from '@/data/protocols'
import {
  mockCategoriesModel,
  mockCategoryModel,
  mockUpdateCategoryParams
} from '@/tests/domain/mocks'

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

export class LoadCategoryNameByIdRepositorySpy implements LoadCategoryNameByIdRepository {
  id: number
  model = { name: mockUpdateCategoryParams().name }
  async loadNameById (id: number): Promise<LoadCategoryNameByIdRepository.Model> {
    this.id = id
    return this.model
  }
}

export class CheckCategoryByNameRepositorySpy implements CheckCategoryByNameRepository {
  params: CheckCategoryByNameRepository.Params
  result = false
  async checkByName (params: CheckCategoryByNameRepository.Params): Promise<boolean> {
    this.params = params
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
    return {
      count: this.models.length,
      model: this.models
    }
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
